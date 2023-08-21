import { Box, Grid, IconButton, Typography } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import IconifyIcon from 'src/@core/components/icon'

export default function CustomPageHeader({ pageTitle }: { pageTitle: string }) {
  const router = useRouter()
  const homeRoute = '/'
  const isHome = router.asPath == '/'

  const redirectToBack = () => {
    //Xử lý khi người dùng vào từ 1 link khác
    //////////////
    if (window?.history?.state?.idx == 0) {
      router.push(homeRoute)
    } else {
      router.back()
    }
  }

  return (
    <Grid item sx={{ display: 'flex', alignItems: 'center' }}>
      {isHome ? (
        <IconButton>
          <IconifyIcon icon='material-symbols:home' fontSize={'1.75rem'} />
        </IconButton>
      ) : (
        <IconButton onClick={redirectToBack}>
          <IconifyIcon icon='material-symbols:arrow-back-rounded' />
        </IconButton>
      )}

      <Typography sx={{ ml: 1, fontSize: '1.5rem', fontWeight: '500' }}>{pageTitle}</Typography>
    </Grid>
  )
}
