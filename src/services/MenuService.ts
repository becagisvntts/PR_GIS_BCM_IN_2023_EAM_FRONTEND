import { apiUrl } from './common/CommonService'
import HttpService from './common/HttpService'

class MenuService {
  static menuApi = `${apiUrl}sessions/current/menu/`

  static fetchMenu = async () => {
    const response = await HttpService.getWithAuth({ endpoint: MenuService.menuApi })

    if (response.ok) {
      const res = await response.json()
      return res.data
    }

    return {}
  }
}

export default MenuService
