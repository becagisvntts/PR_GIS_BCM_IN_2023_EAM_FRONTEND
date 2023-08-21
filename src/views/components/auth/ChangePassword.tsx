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

const defaultValues = {
  password1: '',
  password2: '',
  oldpassword: ''
}

interface FormData {
  password1: string
  password2: string
  oldpassword: string
}
export default function ChangePassword() {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const [showPassword, setShowPassword] = useState({ oldpassword: false, password1: false, password2: false })

  const handleShowPassword = (prop: string) => {
    if (prop == 'oldpassword') {
      setShowPassword({ ...showPassword, oldpassword: !showPassword.oldpassword })
    } else if (prop == 'password1') {
      setShowPassword({ ...showPassword, password1: !showPassword.password1 })
    } else {
      setShowPassword({ ...showPassword, password2: !showPassword.password2 })
    }
  }

  const {
    control,
    handleSubmit,
    setError,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues
  })

  const [errorMessage, setErrorMessage] = useState()

  const onSubmit = async (formData: FormData) => {
    const response = await UserService.changePassword(formData)
    if (response.ok) {
      reset()
      toastSuccess(
        LocalizationService.translate('msg_action_success', {
          action: LocalizationService.translate('user_change_password')
        })
      )
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
    <Box sx={{ width: '100%' }}>
      <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
        <FormControl fullWidth sx={{ mb: 4 }}>
          <InputLabel htmlFor='auth-oldpassword' error={Boolean(errors.password1)}>
            {LocalizationService.translate('user_old_password')}
          </InputLabel>
          <Controller
            name='oldpassword'
            control={control}
            rules={{
              required: {
                value: true,
                message: LocalizationService.translate('msg_field_required', {
                  field: LocalizationService.translate('user_old_password')
                })
              }
            }}
            render={({ field: { value, onChange, onBlur } }) => (
              <OutlinedInput
                value={value}
                onBlur={onBlur}
                label={LocalizationService.translate('user_old_password')}
                onChange={onChange}
                id='auth-oldpassword'
                error={Boolean(errors.oldpassword)}
                type={showPassword.oldpassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      edge='end'
                      onMouseDown={e => e.preventDefault()}
                      onClick={() => handleShowPassword('oldpassword')}
                    >
                      <Icon icon={showPassword.oldpassword ? 'tabler:eye' : 'tabler:eye-off'} fontSize={20} />
                    </IconButton>
                  </InputAdornment>
                }
              />
            )}
          />
          {errors.oldpassword && (
            <FormHelperText sx={{ color: 'error.main' }} id=''>
              {errors.oldpassword.message}
            </FormHelperText>
          )}
        </FormControl>
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

        <Button type='submit' variant='contained' endIcon={<IconifyIcon icon='material-symbols:done'></IconifyIcon>}>
          {LocalizationService.translate('cm_confirm')}
        </Button>
      </form>
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
