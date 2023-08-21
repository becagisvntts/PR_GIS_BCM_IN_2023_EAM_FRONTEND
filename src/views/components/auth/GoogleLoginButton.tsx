import { Box } from '@mui/material'
import React, { useEffect } from 'react'
import { GoogleLogin, GoogleLogout } from 'react-google-login'
import { gapi } from 'gapi-script'
import LocalizationService from 'src/services/common/LocalizationService'

export default function GoogleLoginButton({ onSuccess, onFailure }: { onSuccess: any; onFailure: any }) {
  useEffect(() => {
    // function start() {
    //   gapi.client.init({
    //     clientId: '443827459636-nht1ha1os0gt70b2qab7h9mg6jjl69il.apps.googleusercontent.com',
    //     scope: 'email'
    //   })
    // }

    gapi.load('client:auth2')
  }, [])

  const responseGoogleOnSuccess = (response: any) => {
    if (response && response.accessToken) {
      onSuccess({
        provider: 'google',
        email: response.profileObj.email,
        name: response.profileObj.name,
        uid: response.profileObj.googleId,
        avatar_url: response.profileObj.imageUrl
      })
    }
  }

  const responseGoogleOnFailure = (response: any) => {
    onFailure()
  }

  return (
    <Box>
      <GoogleLogin
        clientId='443827459636-nht1ha1os0gt70b2qab7h9mg6jjl69il.apps.googleusercontent.com'
        buttonText={LocalizationService.translate('user_login_with_google')!}
        onSuccess={responseGoogleOnSuccess}
        onFailure={responseGoogleOnFailure}
        cookiePolicy={'single_host_origin'}
      />
    </Box>
  )
}
