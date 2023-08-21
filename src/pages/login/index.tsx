// ** React Imports
import { useState, ReactNode } from 'react'

// ** Next Imports
import Link from 'next/link'

// ** MUI Components
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Box, { BoxProps } from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import useMediaQuery from '@mui/material/useMediaQuery'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled, useTheme } from '@mui/material/styles'
import FormHelperText from '@mui/material/FormHelperText'
import InputAdornment from '@mui/material/InputAdornment'
import MuiFormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel'
import Icon from 'src/@core/components/icon'
import { useForm, Controller } from 'react-hook-form'
import { useAuth } from 'src/hooks/useAuth'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import Translations from 'src/layouts/components/Translations'
import { useTranslation } from 'react-i18next'
import IconifyIcon from 'src/@core/components/icon'
import SiteBoxAuth from 'src/views/components/auth/SiteBoxAuth'
import { Divider } from '@mui/material'
import dynamic from 'next/dynamic'
import LocalizationService from 'src/services/common/LocalizationService'

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
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const FormControlLabel = styled(MuiFormControlLabel)<FormControlLabelProps>(({ theme }) => ({
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary
  }
}))

interface FormData {
  username: string
  password: string
}
const defaultValues = {
  username: '',
  password: ''
}

const LoginPage = () => {
  const [rememberMe, setRememberMe] = useState<boolean>(true)
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string | null>()

  const auth = useAuth()
  const smallScreen = useMediaQuery(useTheme().breakpoints.down('md'))

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues, mode: 'onChange' })

  const onSubmit = async (formData: FormData) => {
    const { username, password } = formData
    auth.login({ username, password, rememberMe }, errors => {
      Object.keys(errors).map((key: any) => {
        setError(key, { message: errors[key][0] })
        if (!Object.keys(defaultValues).includes(key)) {
          if (typeof errors[key] === 'string') {
            setErrorMessage(errors[key])
          } else {
            setErrorMessage(errors[key][0])
          }
        }
      })
    })
  }

  const handleGoogleLoginSuccess = (data: any) => {
    auth.loginWithGoogle(data, errors => {
      Object.keys(errors).map((key: any) => {
        setError(key, { message: errors[key][0] })
        if (!Object.keys(defaultValues).includes(key)) {
          if (typeof errors[key] === 'string') {
            setErrorMessage(errors[key])
          } else {
            setErrorMessage(errors[key][0])
          }
        }
      })
    })
  }

  const handleGoogleLoginFailure = () => {
    console.log(LocalizationService.translate('user_login_with_google_connect_error'))
  }

  const GoogleLoginButton = dynamic(() => import('src/views/components/auth/GoogleLoginButton'), { ssr: false })

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
      <SiteBoxAuth pageTitle={LocalizationService.translate('user_login')} />

      <Box sx={{ p: 8 }}></Box>
      <Box sx={{ width: '100%', maxWidth: 400 }}>
        <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
          <FormControl fullWidth sx={{ mb: 4 }}>
            <Controller
              name='username'
              control={control}
              rules={{
                required: {
                  value: true,
                  message: LocalizationService.translate('msg_field_required', {
                    field: LocalizationService.translate('user_username')
                  })
                }
              }}
              render={({ field: { value, onChange, onBlur } }) => (
                <TextField
                  autoFocus
                  label={LocalizationService.translate('user_username')}
                  value={value}
                  onBlur={onBlur}
                  onChange={onChange}
                  error={Boolean(errors.username)}
                />
              )}
            />
            {errors.username && <FormHelperText sx={{ color: 'error.main' }}>{errors.username.message}</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 4 }}>
            <InputLabel htmlFor='auth-password' error={Boolean(errors.password)}>
              {LocalizationService.translate('user_password')}
            </InputLabel>
            <Controller
              name='password'
              control={control}
              rules={{
                required: {
                  value: true,
                  message: LocalizationService.translate('msg_field_required', {
                    field: LocalizationService.translate('user_password')
                  })
                }
              }}
              render={({ field: { value, onChange, onBlur } }) => (
                <OutlinedInput
                  value={value}
                  onBlur={onBlur}
                  label={LocalizationService.translate('user_password')}
                  onChange={onChange}
                  id='auth-password'
                  error={Boolean(errors.password)}
                  type={showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        edge='end'
                        onMouseDown={e => e.preventDefault()}
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <Icon icon={showPassword ? 'tabler:eye' : 'tabler:eye-off'} fontSize={20} />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              )}
            />
            {errors.password && (
              <FormHelperText sx={{ color: 'error.main' }} id=''>
                {errors.password.message}
              </FormHelperText>
            )}
          </FormControl>
          <Box
            sx={{
              mb: 8,
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <FormControlLabel
              label={LocalizationService.translate('user_login_remember_me')}
              control={<Checkbox checked={rememberMe} onChange={e => setRememberMe(e.target.checked)} />}
            />
            <LinkStyled href='/forgot-password'>{LocalizationService.translate('user_forgot_password')}?</LinkStyled>
          </Box>

          {errorMessage && <FormHelperText sx={{ color: 'error.main', mb: 4 }}>{errorMessage}</FormHelperText>}

          <Button
            fullWidth
            size='large'
            type='submit'
            variant='contained'
            sx={{ mb: 8 }}
            endIcon={<IconifyIcon icon='material-symbols:login-rounded' />}
          >
            {LocalizationService.translate('user_login')}
          </Button>
          <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Typography variant='body2'>
              <LinkStyled href='/register' sx={{ fontSize: '1rem' }}>
                {LocalizationService.translate('user_have_not_account')}
              </LinkStyled>
            </Typography>
          </Box>
          <Divider sx={{ my: 8 }} />
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <GoogleLoginButton onSuccess={handleGoogleLoginSuccess} onFailure={handleGoogleLoginFailure} />
          </Box>
        </form>
      </Box>
    </Box>
  )
}

LoginPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

LoginPage.guestGuard = true

export default LoginPage
