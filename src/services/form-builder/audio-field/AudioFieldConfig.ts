import LocalizationService from 'src/services/common/LocalizationService'

export default class AudioFieldConfig {
  static audioAllowExtensions = ['.mp3', '.wav', '.ogg', '.m4a']
  static audioMaxSizeB = 10485760 //1048576 * 5
  static audioMaxSizeMB = 5 //1048576 * 5
  static baseSizeB = 1048576

  static validateAudio(file: File) {
    if (file.size > AudioFieldConfig.audioMaxSizeB)
      return LocalizationService.translate('form_file_over_size', {
        file_name: file.name,
        file_max_size: `${this.audioMaxSizeMB}MB`
      })

    const nameArr = file.name.split('.')
    if (nameArr.length == 1 || !this.audioAllowExtensions.includes(`.${nameArr[nameArr.length - 1]}`))
      return LocalizationService.translate('form_file_extensions', {
        file_name: file.name,
        extensions: this.audioAllowExtensions.join(', ')
      })

    return true
  }
}
