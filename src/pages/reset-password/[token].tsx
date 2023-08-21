// ** React Imports
import { ReactNode, useState } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Components
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { FormControl, FormHelperText } from '@mui/material'
import Box, { BoxProps } from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled, useTheme } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports

// ** Third Party Imports
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import UserService from 'src/services/UserService'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import IconifyIcon from 'src/@core/components/icon'
import SiteBoxAuth from 'src/views/components/auth/SiteBoxAuth'
import LocalizationService from 'src/services/common/LocalizationService'
import { toastSuccess } from 'src/services/common/NotifyService'

const LinkStyled = styled(Link)(({ theme }) => ({
  display: 'flex',
  fontSize: '1rem',
  alignItems: 'center',
  textDecoration: 'none',
  justifyContent: 'center',
  color: theme.palette.primary.main
}))

const schema = yup.object().shape({})

const defaultValues = {
  password1: '',
  password2: '',
  token: ''
}

interface FormData {
  password1: string
  password2: string
  token: string
}
const ResetPassword = ({ token }: { token: string }) => {
  const theme = useTheme()
  const router = useRouter()
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const [showPassword, setShowPassword] = useState({ password1: false, password2: false })

  const handleShowPassword = (prop: string) => {
    if (prop == 'password1') {
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

  const [errorMessage, setErrorMessage] = useState()

  const onSubmit = async (formData: FormData) => {
    formData.token = token
    const response = await UserService.resetPassword(formData)
    if (response.ok) {
      toastSuccess(
        LocalizationService.translate('msg_action_success', {
          action: LocalizationService.translate('user_reset_password')
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
      <SiteBoxAuth pageTitle={LocalizationService.translate('user_reset_password')} />

      <Box sx={{ p: 8 }}></Box>
      <Box sx={{ width: '100%', maxWidth: 400 }}>
        <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
          <FormControl fullWidth sx={{ mb: 4 }}>
            <InputLabel htmlFor='auth-password1' error={Boolean(errors.password1)}>
              {LocalizationService.translate('user_new_password')}
            </InputLabel>
            <Controller
              name='password1'
              control={control}
              rules={{
                required: {
                  value: true,
                  message: LocalizationService.translate('msg_field_required', {
                    field: LocalizationService.translate('user_new_password')
                  })
                }
              }}
              render={({ field: { value, onChange, onBlur } }) => (
                <OutlinedInput
                  value={value}
                  onBlur={onBlur}
                  label={LocalizationService.translate('user_new_password')}
                  onChange={onChange}
                  id='auth-password1'
                  error={Boolean(errors.password1)}
                  type={showPassword.password1 ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        edge='end'
                        onMouseDown={e => e.preventDefault()}
                        onClick={() => handleShowPassword('password1')}
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
              {LocalizationService.translate('user_confirm_new_password')}
            </InputLabel>
            <Controller
              name='password2'
              control={control}
              rules={{
                required: {
                  value: true,
                  message: LocalizationService.translate('msg_field_required', {
                    field: LocalizationService.translate('user_confirm_new_password')
                  })
                }
              }}
              render={({ field: { value, onChange, onBlur } }) => (
                <OutlinedInput
                  value={value}
                  onBlur={onBlur}
                  label={LocalizationService.translate('user_confirm_new_password')}
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

export async function getServerSideProps(context: any) {
  let { token } = context.query

  return {
    props: {
      token
    }
  }
}

ResetPassword.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

ResetPassword.guestGuard = true

export default ResetPassword
