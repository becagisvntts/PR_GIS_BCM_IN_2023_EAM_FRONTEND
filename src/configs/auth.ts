import { apiUrl } from 'src/services/common/CommonService'

export default {
  loginEndpoint: `${apiUrl}sessions?scope=service&returnId=true`,
  meEndpoint: `${apiUrl}sessions/current?ext=true&if_exists=true`,
  loginWithGoogleEndpoint: `${apiUrl}users/login-google/`,
  registerEndpoint: `${apiUrl}users/signup`,
  verifyTokenEndpoint: `${apiUrl}token/verify/`,
  refreshTokenEndpoint: `${apiUrl}token/refresh/`,
  forgotPasswordEndpoint: `${apiUrl}users/forgot-password/`,
  sessionIdKey: 'sessionId',
  userDataKey: 'userData'
}
