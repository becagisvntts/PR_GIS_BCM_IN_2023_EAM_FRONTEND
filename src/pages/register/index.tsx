// ** React Imports
import { ReactNode, useState } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Components
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Box, { BoxProps } from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import useMediaQuery from '@mui/material/useMediaQuery'
import OutlinedInput from '@mui/material/OutlinedInput'
import { Card, FormHelperText, Grid } from '@mui/material'
import { styled, useTheme } from '@mui/material/styles'
import InputAdornment from '@mui/material/InputAdornment'
import Icon from 'src/@core/components/icon'
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Third Party Imports
import { useForm, Controller } from 'react-hook-form'
import UserService from 'src/services/UserService'
import { useTranslation } from 'react-i18next'
import IconifyIcon from 'src/@core/components/icon'
import SiteBoxAuth from 'src/views/components/auth/SiteBoxAuth'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import LocalizationService from 'src/services/common/LocalizationService'
import { toastSuccess } from 'src/services/common/NotifyService'

const LinkStyled = styled(Link)(({ theme }) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

interface FormData {
  name: string
  email: string
  username: string
  password1: string
  password2: string
}

const defaultValues = {
  email: '',
  name: '',
  username: '',
  password1: '',
  password2: ''
}

const Register = () => {
  const [showPassword, setShowPassword] = useState({ password1: false, password2: false })

  const handleShowPassword = (prop: string) => {
    if (prop == 'password') {
      setShowPassword({ password1: !showPassword.password1, password2: showPassword.password2 })
    } else {
      setShowPassword({ password1: showPassword.password1, password2: !showPassword.password2 })
    }
  }

  const smallScreen = useMediaQuery(useTheme().breakpoints.down('md'))

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm({
    defaultValues
  })

  const dispatch = useDispatch()
  const router = useRouter()
  const [errorMessage, setErrorMessage] = useState<string | null>()
  const [registerSuccess, setRegisterSuccess] = useState(false)

  const { t } = useTranslation()
  const onSubmit = async (formData: FormData) => {
    setErrorMessage(null)
    const response = await UserService.signup(formData)
    if (response.ok) {
      toastSuccess(
        LocalizationService.translate('msg_action_success', {
          action: LocalizationService.translate('user_register')
        })
      )
      router.push('/login')
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
      <SiteBoxAuth pageTitle={LocalizationService.translate('user_register')} />

      <Box sx={{ p: 8 }}></Box>

      <Box sx={{ width: '100%', maxWidth: 400 }}>
        {registerSuccess && (
          <Card sx={{ border: 'solid 1px', borderColor: 'success.main', backgroundColor: 'success.main', p: 4, mb: 8 }}>
            <Typography color='#fff'>
              {LocalizationService.translate('msg_action_success', {
                action: LocalizationService.translate('user_register')
              })}
            </Typography>
          </Card>
        )}
        <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
          <FormControl fullWidth sx={{ mb: 4 }}>
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
                  label={LocalizationService.translate('user_email')}
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
                  label={LocalizationService.translate('user_username')}
                  value={value}
                  onBlur={onBlur}
                  onChange={onChange}
                  error={Boolean(errors.username)}
                  placeholder=''
                />
              )}
            />
            {errors.username && <FormHelperText sx={{ color: 'error.main' }}>{errors.username.message}</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 4 }}>
            <Controller
              name='name'
              control={control}
              rules={{
                required: {
                  value: true,
                  message: LocalizationService.translate('msg_field_required', {
                    field: LocalizationService.translate('user_full_name')
                  })
                }
              }}
              render={({ field: { value, onChange, onBlur } }) => (
                <TextField
                  label={LocalizationService.translate('user_full_name')}
                  value={value}
                  onBlur={onBlur}
                  onChange={onChange}
                  error={Boolean(errors.name)}
                  placeholder=''
                />
              )}
            />
            {errors.name && <FormHelperText sx={{ color: 'error.main' }}>{errors.name.message}</FormHelperText>}
          </FormControl>

          <FormControl fullWidth sx={{ mb: 4 }}>
            <InputLabel htmlFor='auth-password' error={Boolean(errors.password1)}>
              {LocalizationService.translate('user_password')}
            </InputLabel>
            <Controller
              name='password1'
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
                  error={Boolean(errors.password1)}
                  type={showPassword.password1 ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        edge='end'
                        onMouseDown={e => e.preventDefault()}
                        onClick={() => handleShowPassword('password')}
                      >
                        <Icon icon={showPassword.password1 ? 'tabler:eye' : 'tabler:eye-off'} fontSize={20} />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              )}
            />
            {errors.password1 && (
              <FormHelperText sx={{ color: 'error.main' }} id=''>
                {errors.password1.message}
              </FormHelperText>
            )}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 8 }}>
            <InputLabel htmlFor='auth-password2' error={Boolean(errors.password2)}>
              {LocalizationService.translate('user_confirm_password')}
            </InputLabel>
            <Controller
              name='password2'
              control={control}
              rules={{
                required: {
                  value: true,
                  message: LocalizationService.translate('msg_field_required', {
                    field: LocalizationService.translate('user_confirm_password')
                  })
                }
              }}
              render={({ field: { value, onChange, onBlur } }) => (
                <OutlinedInput
                  value={value}
                  onBlur={onBlur}
                  label={LocalizationService.translate('user_confirm_password')}
                  onChange={onChange}
                  id='auth-password2'
                  error={Boolean(errors.password2)}
                  type={showPassword.password2 ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        edge='end'
                        onMouseDown={e => e.preventDefault()}
                        onClick={() => handleShowPassword('password2')}
                      >
                        <Icon icon={showPassword.password2 ? 'tabler:eye' : 'tabler:eye-off'} fontSize={20} />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              )}
            />
            {errors.password2 && (
              <FormHelperText sx={{ color: 'error.main' }} id=''>
                {errors.password2.message}
              </FormHelperText>
            )}
          </FormControl>

          {errorMessage && <FormHelperText sx={{ color: 'error.main', mb: 4 }}>{errorMessage}</FormHelperText>}

          <Button
            fullWidth
            size='large'
            type='submit'
            variant='contained'
            sx={{ mb: 8 }}
            endIcon={<IconifyIcon icon='material-symbols:add' />}
          >
            {LocalizationService.translate('user_register')}
          </Button>
          <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Typography variant='body2'>
              <LinkStyled href='/login' sx={{ fontSize: '1rem' }}>
                {LocalizationService.translate('user_already_have_account')}
              </LinkStyled>
            </Typography>
          </Box>
        </form>
      </Box>
    </Box>
  )
}

Register.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

Register.guestGuard = true

export default Register
