// ** React Imports
import { ReactNode, useState } from 'react'

// ** Next Import
import Link from 'next/link'
import { useRouter } from 'next/router'

// ** MUI Components
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { Card, FormControl, FormHelperText } from '@mui/material'
import Box, { BoxProps } from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled, useTheme } from '@mui/material/styles'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports

// ** Third Party Imports
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useAuth } from 'src/hooks/useAuth'
import { useTranslation } from 'react-i18next'
import IconifyIcon from 'src/@core/components/icon'
import SiteBoxAuth from 'src/views/components/auth/SiteBoxAuth'
import LocalizationService from 'src/services/common/LocalizationService'
import UserService from 'src/services/UserService'

const RightWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.up('md')]: {
    maxWidth: 450
  },
  [theme.breakpoints.up('lg')]: {
    maxWidth: 600
  },
  [theme.breakpoints.up('xl')]: {
    maxWidth: 750
  }
}))

const LinkStyled = styled(Link)(({ theme }) => ({
  display: 'flex',
  fontSize: '1rem',
  alignItems: 'center',
  textDecoration: 'none',
  justifyContent: 'center',
  color: theme.palette.primary.main
}))

const defaultValues = {
  email: ''
}

interface FormData {
  email: string
}
const ForgotPassword = () => {
  const smallScreen = useMediaQuery(useTheme().breakpoints.down('md'))
  const [successMessage, setSuccessMessage] = useState<string | null>()
  const [errorMessage, setErrorMessage] = useState<string | null>()

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm({
    defaultValues
  })

  const onSubmit = async (formData: FormData) => {
    setErrorMessage(null)
    setSuccessMessage(null)
    const response = await UserService.forgotPassword(formData)
    if (response.ok) {
      setSuccessMessage(LocalizationService.translate('user_forgot_password_success_msg'))
    } else {
      const messages = await response.json()
      Object.keys(messages).map((key: any) => {
        setError(key, { message: messages[key][0] })
        if (!Object.keys(defaultValues).includes(key)) {
          if (typeof messages[key] === 'string') {
            setErrorMessage(messages[key])
          } else {
            setErrorMessage(messages[key][0])
          }
        }
      })
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        flexDirection: smallScreen ? 'column' : 'row',
        p: 4
      }}
    >
      <SiteBoxAuth pageTitle={LocalizationService.translate('user_forgot_password')} />

      <Box sx={{ p: 8 }}></Box>
      <Box sx={{ width: '100%', maxWidth: 400 }}>
        {successMessage && (
          <Card sx={{ border: 'solid 1px', borderColor: 'success.main', backgroundColor: 'success.main', p: 4, mb: 8 }}>
            <Typography color='#fff'>{successMessage}</Typography>
          </Card>
        )}

        <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
          <Typography sx={{ mb: 4 }}>{LocalizationService.translate('user_forgot_password_cta')}</Typography>
          <FormControl fullWidth sx={{ display: 'flex', mb: 8 }}>
            <Controller
              name='email'
              control={control}
              rules={{
                required: {
                  value: true,
                  message: LocalizationService.translate('msg_field_required', {
                    field: LocalizationService.translate('user_email')
                  })
                }
              }}
              render={({ field: { value, onChange, onBlur } }) => (
                <TextField
                  autoFocus
                  label='Email'
                  value={value}
                  onBlur={onBlur}
                  onChange={onChange}
                  error={Boolean(errors.email)}
                  placeholder=''
                />
              )}
            />
            {errors.email && <FormHelperText sx={{ color: 'error.main' }}>{errors.email.message}</FormHelperText>}
          </FormControl>

          {errorMessage && <FormHelperText sx={{ color: 'error.main', mb: 4 }}>{errorMessage}</FormHelperText>}
          <Button
            fullWidth
            size='large'
            type='submit'
            variant='contained'
            sx={{ mb: 8 }}
            endIcon={<IconifyIcon icon='material-symbols:done'></IconifyIcon>}
          >
            {LocalizationService.translate('cm_confirm')}
          </Button>

          <Typography sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', '& svg': { mr: 1 } }}>
            <LinkStyled href='/login'>
              <Icon fontSize='1.25rem' icon='tabler:chevron-left' />
              <span>{LocalizationService.translate('user_redirect_to_login')}</span>
            </LinkStyled>
          </Typography>
        </form>
      </Box>
    </Box>
  )
}

ForgotPassword.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

ForgotPassword.guestGuard = true

export default ForgotPassword
