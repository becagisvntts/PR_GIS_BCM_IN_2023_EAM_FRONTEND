import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  Icon,
  Typography
} from '@mui/material'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import IconifyIcon from 'src/@core/components/icon'
import { useAuth } from 'src/hooks/useAuth'
import LocalizationService from 'src/services/common/LocalizationService'
import UserService from 'src/services/UserService'
import { formatDateTime } from 'src/services/common/ConvertHelper'
import ChangePassword from 'src/views/components/auth/ChangePassword'
import CustomCardHeader from 'src/views/components/common/CustomCardHeader'
import CustomPageHeader from 'src/views/components/common/CustomPageHeader'
import { toastSuccess } from 'src/services/common/NotifyService'

export default function Profile() {
  const { logout, user } = useAuth()
  const dispatch = useDispatch()

  const [confirmDeleteAccount, setConfirmDeleteAccount] = useState(false)
  const handleDeleteAccount = async () => {
    if (confirmDeleteAccount) {
      const response = await UserService.selfDelete()
      if (response.ok) {
        toastSuccess(
          LocalizationService.translate('msg_action_success', {
            action: LocalizationService.translate('user_delete_account')
          })
        )
        logout()
      } else {
        const messages = await response.json()
        Object.keys(messages).map((key: any) => {
          if (typeof messages[key] === 'string') {
            toastSuccess(messages[key])
          } else {
            toastSuccess(messages[key][0])
          }
        })
      }
    }
  }

  return (
    <Grid container spacing={6}>
      <CustomPageHeader pageTitle={LocalizationService.translate('user_profile_page_title')} />
      <Grid item xs={12}>
        <Grid container spacing={6}>
          <Grid item xs={12} md={5}>
            <Card>
              <CustomCardHeader
                title={LocalizationService.translate('user_information')}
                icon='tabler:user-check'
                showDivider={true}
              />
              <CardContent sx={{ padding: '20px !important' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
                    <IconifyIcon icon='basil:user-solid'></IconifyIcon>
                    <Typography sx={{ ml: 2 }}>{LocalizationService.translate('user_full_name')}</Typography>
                  </Box>
                  <Typography fontWeight={500}>{user?.username}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
                    <IconifyIcon icon='material-symbols:mail-outline-rounded'></IconifyIcon>
                    <Typography sx={{ ml: 2 }}>{LocalizationService.translate('user_email')}</Typography>
                  </Box>
                  <Typography fontWeight={500}>{user?.username}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
                    <IconifyIcon icon='material-symbols:login-rounded'></IconifyIcon>
                    <Typography sx={{ ml: 2 }}>{LocalizationService.translate('user_last_login')}</Typography>
                  </Box>
                  <Typography fontWeight={500}>{formatDateTime(user?.lastActive)}</Typography>
                </Box>
              </CardContent>
              <Divider></Divider>
              <CardContent sx={{ padding: '20px !important' }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Button
                    variant='contained'
                    endIcon={<IconifyIcon icon='tabler:logout'></IconifyIcon>}
                    onClick={logout}
                  >
                    {LocalizationService.translate('user_logout')}
                  </Button>
                </Box>
              </CardContent>
            </Card>

            <Card sx={{ mt: 8 }}>
              <CustomCardHeader
                title={LocalizationService.translate('user_delete_account')}
                icon='material-symbols:delete-forever-rounded'
                showDivider={true}
              />
              <CardContent sx={{ padding: '20px !important' }}>
                <Typography color='#000000aa'>{LocalizationService.translate('user_delete_account_msg')}</Typography>
                <FormControlLabel
                  control={<Checkbox defaultChecked={false} />}
                  onChange={(event, checked) => setConfirmDeleteAccount(checked)}
                  label={LocalizationService.translate('user_delete_account_confirm')}
                  color='primary.main'
                  sx={{ my: 2 }}
                />
                <Button
                  variant='contained'
                  disabled={!confirmDeleteAccount}
                  endIcon={<IconifyIcon icon='material-symbols:delete-forever-rounded'></IconifyIcon>}
                  onClick={() => handleDeleteAccount()}
                >
                  {LocalizationService.translate('user_delete_account')}
                </Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={7}>
            <Card>
              <CustomCardHeader
                title={LocalizationService.translate('user_change_password')}
                icon='tabler:user-check'
                showDivider={true}
              />
              <CardContent sx={{ padding: '20px !important' }}>
                <ChangePassword></ChangePassword>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
