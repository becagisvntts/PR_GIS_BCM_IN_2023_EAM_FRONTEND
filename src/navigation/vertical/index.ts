// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'
import LocalizationService from 'src/services/common/LocalizationService'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      sectionTitle: LocalizationService.translate('project_project')
    },
    {
      title: LocalizationService.translate('Demo'),
      path: '#',
      icon: 'material-symbols:home-outline'
    },
    {
      sectionTitle: LocalizationService.translate('user_user')
    },
    {
      title: LocalizationService.translate('user_profile_page_title'),
      path: '#profile',
      icon: 'tabler:user-check'
    }
  ]
}

export default navigation
