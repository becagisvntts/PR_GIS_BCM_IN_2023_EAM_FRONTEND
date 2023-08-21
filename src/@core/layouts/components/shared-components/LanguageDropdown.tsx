// ** React Import
import { useEffect } from 'react'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Import
import { useTranslation } from 'react-i18next'

// ** Custom Components Imports
import OptionsMenu from 'src/@core/components/option-menu'

// ** Type Import
import { Settings } from 'src/@core/context/settingsContext'
import LocalizationService from 'src/services/common/LocalizationService'

interface Props {
  settings: Settings
  saveSettings: (values: Settings) => void
}

const LanguageDropdown = ({ settings, saveSettings }: Props) => {
  // ** Hook
  const { i18n } = useTranslation()
  const iconLang = localStorage.getItem('i18nextLng') || 'vi'

  const handleLangItemClick = (lang: 'en' | 'vi') => {
    i18n.changeLanguage(lang)
  }

  // ** Change html `lang` attribute when changing locale
  useEffect(() => {
    document.documentElement.setAttribute('lang', i18n.language)
  }, [i18n.language])

  return (
    <OptionsMenu
      iconButtonProps={{ color: 'inherit' }}
      icon={<Icon fontSize='1rem' icon={iconLang == 'vi' ? 'flagpack:vn' : 'flagpack:us'} />}
      menuProps={{ sx: { '& .MuiMenu-paper': { mt: 4.5, minWidth: 130 } } }}
      options={[
        {
          text: LocalizationService.translate('cm_lang_vi'),
          menuItemProps: {
            sx: { py: 2 },
            selected: i18n.language === 'vi',
            onClick: () => {
              handleLangItemClick('vi')
              saveSettings({ ...settings, direction: 'ltr' })
            }
          }
        },
        {
          text: LocalizationService.translate('cm_lang_en'),
          menuItemProps: {
            sx: { py: 2 },
            selected: i18n.language === 'en',
            onClick: () => {
              handleLangItemClick('en')
              saveSettings({ ...settings, direction: 'ltr' })
            }
          }
        }
      ]}
    />
  )
}

export default LanguageDropdown
