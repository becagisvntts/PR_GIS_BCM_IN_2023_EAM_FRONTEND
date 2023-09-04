import { apiUrl } from 'src/services/common/CommonService'
import HttpService from 'src/services/common/HttpService'

class MenuService {
  static menuApi = `${apiUrl}sessions/current/menu/`

  static fetchMenu = async () => {
    const response = await HttpService.getWithAuth({ endpoint: MenuService.menuApi })

    if (response.ok) {
      const res = await response.json()
      return res.data.children
    }

    return []
  }
}

export default MenuService
