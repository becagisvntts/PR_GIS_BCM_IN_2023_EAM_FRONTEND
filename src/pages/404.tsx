// ** React Imports
import { ReactNode } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Components
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrations from 'src/views/pages/misc/FooterIllustrations'
import IconifyIcon from 'src/@core/components/icon'
import LocalizationService from 'src/services/common/LocalizationService'

// ** Styled Components
const BoxWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    width: '90vw'
  }
}))

const Img = styled('img')(({ theme }) => ({
  [theme.breakpoints.down('lg')]: {
    height: 450,
    marginTop: theme.spacing(10)
  },
  [theme.breakpoints.down('md')]: {
    height: 400
  },
  [theme.breakpoints.up('lg')]: {
    marginTop: theme.spacing(20)
  }
}))

const Error404 = () => {
  return (
    <Box className='content-center'>
      <Box sx={{ p: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <BoxWrapper>
          <Typography sx={{ mb: 1.5, fontSize: '200px' }}>404</Typography>
          <Typography sx={{ mb: 6, color: 'text.secondary' }}>
            {LocalizationService.translate('cm_page_not_found')}
          </Typography>
          <Button
            href='/'
            component={Link}
            variant='contained'
            endIcon={<IconifyIcon icon='material-symbols:arrow-right-alt-rounded'></IconifyIcon>}
          >
            {LocalizationService.translate('cm_back_to_home')}
          </Button>
        </BoxWrapper>
      </Box>
      <FooterIllustrations />
    </Box>
  )
}

Error404.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default Error404
