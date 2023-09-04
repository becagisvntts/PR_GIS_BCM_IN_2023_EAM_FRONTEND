// ** React Imports
import { ElementType } from 'react'

// ** Next Imports
import Link from 'next/link'
import { useRouter } from 'next/router'

// ** MUI Imports
import Chip from '@mui/material/Chip'
import ListItem from '@mui/material/ListItem'
import { styled, useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemButton, { ListItemButtonProps } from '@mui/material/ListItemButton'

// ** Configs Import
import themeConfig from 'src/configs/themeConfig'

// ** Types
import { NavLink, NavGroup } from 'src/@core/layouts/types'
import { Settings } from 'src/@core/context/settingsContext'

// ** Custom Components Imports
import UserIcon from 'src/layouts/components/UserIcon'
import Translations from 'src/layouts/components/Translations'
import CanViewNavLink from 'src/layouts/components/acl/CanViewNavLink'

// ** Util Imports
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'
import { handleURLQueries } from 'src/@core/layouts/utils'
import { useDispatch } from 'react-redux'
import { changeActiveItem } from 'src/store/MenuSlice'
import { useSelector } from 'react-redux'
import { RootState } from 'src/store'
import IconifyIcon from 'src/@core/components/icon'

interface Props {
  parent?: boolean
  item: NavLink
  navHover?: boolean
  settings: Settings
  navVisible?: boolean
  collapsedNavWidth: number
  navigationBorderWidth: number
  toggleNavVisibility: () => void
  isSubToSub?: NavGroup | undefined
  level: number
}

// ** Styled Components
const MenuNavLink = styled(ListItemButton)<
  ListItemButtonProps & { component?: ElementType; href: string; target?: '_blank' | undefined }
>(({ theme }) => ({
  width: '100%',
  marginLeft: theme.spacing(3.5),
  marginRight: theme.spacing(3.5),
  borderRadius: theme.shape.borderRadius,
  transition: 'padding-left .25s ease-in-out, padding-right .25s ease-in-out',
  '&.active': {
    '&, &:hover': {
      // boxShadow: `0px 2px 6px ${hexToRGBA(theme.palette.primary.main, 0.48)}`,
      background: theme.palette.transparent.primary,
      '&.Mui-focusVisible': {
        background: `linear-gradient(72.47deg, ${theme.palette.primary.dark} 22.16%, ${hexToRGBA(
          theme.palette.primary.main,
          0.7
        )} 76.47%)`
      }
    },
    '& .MuiTypography-root, & svg': {
      color: `${theme.palette.primary.main} !important`,
      fontWeight: 'bold'
    }
  }
}))

const MenuItemTextMetaWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  justifyContent: 'space-between',
  transition: 'opacity .25s ease-in-out',
  ...(themeConfig.menuTextTruncate && { overflow: 'hidden' })
}))

const VerticalNavLink = ({
  item,
  parent,
  navHover,
  settings,
  navVisible,
  isSubToSub,
  collapsedNavWidth,
  toggleNavVisibility,
  navigationBorderWidth,
  level
}: Props) => {
  // ** Hooks
  const router = useRouter()
  const dispatch = useDispatch()

  const activeItem = useSelector((state: RootState) => state.menu.activeItem)

  // ** Vars
  const { navCollapsed } = settings

  const icon = parent && !item.icon ? themeConfig.navSubItemIcon : item.icon

  const isNavLinkActive = () => {
    const _handle = handleURLQueries(router, item.path)

    if (router.pathname === item.path || router.asPath.endsWith(item.path!) || _handle) {
      return true
    } else {
      return false
    }
  }

  const theme = useTheme()

  return (
    <CanViewNavLink navLink={item}>
      <ListItem
        disablePadding
        className='nav-link'
        // disabled={item.disabled || false}
        sx={{ mt: 1, px: '0 !important' }}
      >
        <MenuNavLink
          component={Link}
          {...(item.disabled && { tabIndex: -1 })}
          className={isNavLinkActive() ? 'active' : ''}
          href={''} //{item.path === undefined ? '/' : `${item.path}`}
          {...(item.openInNewTab ? { target: '_blank' } : null)}
          onClick={e => {
            // if (item.path === undefined) {
            //   e.preventDefault()
            //   e.stopPropagation()
            // }
            e.preventDefault()
            e.stopPropagation()
            dispatch(changeActiveItem(item.path))
            router.push(`${item.path}`)
            // if (navVisible) {
            //   toggleNavVisibility()
            // }
          }}
          sx={{
            py: 2,
            ...(item.disabled ? { pointerEvents: 'none' } : { cursor: 'pointer' }),
            px: navCollapsed && !navHover ? (collapsedNavWidth - navigationBorderWidth - 22 - 28) / 8 : 4,
            '& .MuiTypography-root, & svg': {
              color: `${theme.palette.text.primary} !important`
            },
            fontWeight: 'bold'
          }}
        >
          <ListItemIcon
            sx={{
              transition: 'margin .25s ease-in-out',
              ...(navCollapsed && !navHover ? { mr: 0 } : { mr: 2 }),
              // ...(parent ? { ml: 1.5 } : {}), // This line should be after (navCollapsed && !navHover) condition for proper styling
              ...{ ml: 1.5 + level * 1.5 },
              '& svg': {
                fontSize: '1.125rem'
                // ...(!parent ? { fontSize: '1.125rem' } : {}),
                // ...(parent && item.icon ? { fontSize: '0.875rem' } : {})
              }
            }}
          >
            <IconifyIcon icon={icon as string} color='#fff' />
          </ListItemIcon>

          <MenuItemTextMetaWrapper
            sx={{
              ...(navCollapsed && !navHover ? { opacity: 0 } : { opacity: 1 })
            }}
          >
            <Typography
              {...((themeConfig.menuTextTruncate || (!themeConfig.menuTextTruncate && navCollapsed && !navHover)) && {
                noWrap: true
              })}
              sx={{ color: '#fff !important' }}
            >
              {item.title}
            </Typography>
            {item.badgeContent ? (
              <Chip
                label={item.badgeContent}
                color={item.badgeColor || 'primary'}
                sx={{
                  height: 20,
                  fontWeight: 500,
                  '& .MuiChip-label': { px: 1.5, textTransform: 'capitalize' }
                }}
              />
            ) : null}
          </MenuItemTextMetaWrapper>
        </MenuNavLink>
      </ListItem>
    </CanViewNavLink>
  )
}

export default VerticalNavLink
