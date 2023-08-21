import { Box, Button, Menu, MenuItem, MenuProps } from '@mui/material'
import { alpha, styled } from '@mui/system'
import { ReactNode, useState } from 'react'
import IconifyIcon from 'src/@core/components/icon'

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right'
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right'
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: '8px',
    marginTop: theme.spacing(1),
    minWidth: 180,
    color: theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0'
    },
    '& .MuiMenuItem-root': {
      '&:active': {
        backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity)
      }
    }
  }
}))

const ButtonStyled = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.success.main,
  color: theme.palette.text.white,
  marginLeft: '1rem',
  marginBottom: '4px',
  marginTop: '4px',
  height: '38px',
  '&:hover': {
    backgroundColor: theme.palette.success.light
  }
}))

export default function CustomDropdown({ name, items }: { name: string; items: ReactNode[] }) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Box>
      <ButtonStyled
        id='btn-manage'
        aria-controls={open ? 'manage' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        variant='contained'
        disableElevation
        onClick={handleClick}
        endIcon={<IconifyIcon icon='material-symbols:keyboard-arrow-down-rounded' />}
      >
        {name}
      </ButtonStyled>
      <StyledMenu
        id='manage'
        MenuListProps={{
          'aria-labelledby': 'btn-manage'
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {items}
      </StyledMenu>
    </Box>
  )
}
