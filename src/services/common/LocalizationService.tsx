import i18n from 'i18next'

class LocalizationService {
  static langVi: string = 'vi'
  static langEn: string = 'en'

  static langCodes: any[] = [LocalizationService.langVi, LocalizationService.langEn]

  static translate = i18n.t
}

export default LocalizationService
