// ** React Imports
import { createContext, useEffect, useState, ReactNode } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Config
import authConfig from 'src/configs/auth'

// ** Types
import { AuthValuesType, LoginParams, ErrCallbackType, UserDataType } from './types'
import HttpService from 'src/services/common/HttpService'
import { useGoogleLogout } from 'react-google-login'
import MenuService from 'src/services/MenuService'

// ** Defaults
const defaultProvider: AuthValuesType = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  loginWithGoogle: () => Promise.resolve(),
  logout: () => Promise.resolve()
}

const AuthContext = createContext(defaultProvider)

type Props = {
  children: ReactNode
}

const AuthProvider = ({ children }: Props) => {
  // ** States
  const [user, setUser] = useState<UserDataType | null>(defaultProvider.user)
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading)

  // ** Hooks
  const router = useRouter()
  // const { signOut } = useGoogleLogout({
  //   clientId: '443827459636-nht1ha1os0gt70b2qab7h9mg6jjl69il.apps.googleusercontent.com',
  //   onLogoutSuccess: () => {
  //     console.log('LogoutGoogleSuccess')
  //   },
  //   onFailure: () => {
  //     console.log('LogoutGoogleFailure')
  //   }
  // })

  useEffect(() => {
    const verifyAccessToken = async () => {
      const sessionId = window.localStorage.getItem(authConfig.sessionIdKey)
      if (sessionId) {
        setLoading(true)
        getUser(sessionId)
      } else {
        setLoading(false)
      }
    }

    const getUser = async (sessionId: string) => {
      const response = await HttpService.getWithAuth({
        endpoint: authConfig.meEndpoint
      })

      if (response.ok) {
        const resData = await response.json()
        const userData = resData.data

        setLoading(false)
        setUser(userData)
      } else {
        clearUserDataAndRedirectToLogin()
      }
    }

    const clearUserDataAndRedirectToLogin = () => {
      clearUserData()
      setLoading(false)
      if (!router.pathname.includes('login')) {
        router.replace('/login')
      }
    }

    verifyAccessToken()
  }, [])

  const handleLogin = async (params: LoginParams, errorCallback?: ErrCallbackType) => {
    const response = await HttpService.post({
      endpoint: authConfig.loginEndpoint,
      body: params,
      sessionId: null
    })

    if (response.status == 200) {
      const resData = await response.json()
      handleDataOnAccessSuccess(resData)
    } else {
      const errors = await response.json()
      if (errorCallback) errorCallback(errors)
    }
  }

  const handleLoginWithGoogle = async (params: any, errorCallback?: ErrCallbackType) => {
    const response = await HttpService.post({
      endpoint: authConfig.loginWithGoogleEndpoint,
      body: params,
      sessionId: null
    })

    if (response.status == 200) {
      const resData = await response.json()
      handleDataOnAccessSuccess(resData)
    } else {
      const errors = await response.json()
      if (errorCallback) errorCallback(errors)
    }
  }

  const handleDataOnAccessSuccess = async (data: any) => {
    const userDataType = data.data

    setUser({ ...userDataType })
    window.localStorage.setItem(authConfig.sessionIdKey, userDataType._id)
    window.localStorage.setItem(authConfig.userDataKey, JSON.stringify(userDataType))

    const returnUrl = router.query.returnUrl
    const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'
    router.replace(redirectURL as string)
  }

  const handleLogout = () => {
    // signOut()
    clearUserData()
    router.push('/login')
  }

  const clearUserData = () => {
    setUser(null)
    window.localStorage.removeItem(authConfig.userDataKey)
    window.localStorage.removeItem(authConfig.sessionIdKey)
  }

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    loginWithGoogle: handleLoginWithGoogle,
    logout: handleLogout
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
