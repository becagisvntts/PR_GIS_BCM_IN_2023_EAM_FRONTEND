import { RootState } from 'src/store'
import { useSelector } from 'react-redux'
import HttpService from './common/HttpService'

const tokenAPI = `${HttpService.apiUrl}token/`
const usersAPI = `${HttpService.apiUrl}users/`
export default class UserService {
  static getSessionId = () => {
    const sessionId = useSelector((state: RootState) => state.user.sessionId)
    return sessionId
  }

  static signup = async (data: any) => {
    return await HttpService.post({ endpoint: `${usersAPI}signup/`, body: data, sessionId: null })
  }

  static forgotPassword = async (data: any) => {
    return await HttpService.post({ endpoint: `${usersAPI}forgot-password/`, body: data, sessionId: null })
  }

  static resetPassword = async (data: any) => {
    return await HttpService.post({ endpoint: `${usersAPI}reset-password/`, body: data, sessionId: null })
  }

  static changePassword = async (data: any) => {
    return await HttpService.postWithAuth({ endpoint: `${usersAPI}change-password/`, body: data })
  }

  static selfDelete = async () => {
    return await HttpService.postWithAuth({ endpoint: `${usersAPI}self-delete/` })
  }
}
