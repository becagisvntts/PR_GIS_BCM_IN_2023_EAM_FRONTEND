import { Box, CardContent, Typography } from '@mui/material'
import IconifyIcon from 'src/@core/components/icon'
import Translations from 'src/layouts/components/Translations'

export default function CustomCardHeader({
  title,
  icon,
  action,
  titleUrl,
  showDivider = false
}: {
  title: string
  icon?: string
  action?: React.ReactNode
  titleUrl?: string
  showDivider?: boolean
}) {
  return (
    <CardContent
      sx={{
        padding: '16px 20px !important',
        borderBottom: showDivider ? '1px solid #ccc' : '0px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {icon ? <IconifyIcon icon={icon} /> : ''}
        <Typography fontSize={'1.25rem'} fontWeight={'500'} sx={{ ml: icon ? 3 : 0 }}>
          {title}
        </Typography>
      </Box>
      {action}
    </CardContent>
  )
}
