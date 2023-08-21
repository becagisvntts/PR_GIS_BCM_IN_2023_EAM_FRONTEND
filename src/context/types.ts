export type ErrCallbackType = (err: { [key: string]: string }) => void

export type LoginParams = {
  username: string
  password: string
  rememberMe?: boolean
}

export type UserDataType = {
  _id: string
  username: string
  userId: number
  userDescription: string
  role: string
  availableRoles: string[]
  multigroup: boolean
  rolePrivileges: string[]
  beginDate: string
  lastActive: string
  device: string
  sessionType: string
}

export type AuthValuesType = {
  loading: boolean
  logout: () => void
  user: UserDataType | null
  setLoading: (value: boolean) => void
  setUser: (value: UserDataType | null) => void
  login: (params: LoginParams, errorCallback?: ErrCallbackType) => void,
  loginWithGoogle: (params: any, errorCallback?: ErrCallbackType) => void
}
