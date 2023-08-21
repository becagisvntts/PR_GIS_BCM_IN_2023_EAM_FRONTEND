import LocalizationService from 'src/services/common/LocalizationService'

export default class VideoFieldConfig {
  static videoAllowExtensions = ['.mp4', '.mov']
  static videoMaxSizeB = 104857600 //1048576 * 100
  static videoMaxSizeMB = 100 //1048576 * 100
  static baseSizeB = 1048576

  static validateImage(file: File) {
    if (file.size > VideoFieldConfig.videoMaxSizeB)
      return LocalizationService.translate('form_file_over_size', {
        file_name: file.name,
        file_max_size: `${this.videoMaxSizeMB}MB`
      })

    const nameArr = file.name.split('.')
    if (nameArr.length == 1 || !this.videoAllowExtensions.includes(`.${nameArr[nameArr.length - 1]}`))
      return LocalizationService.translate('form_file_extensions', {
        file_name: file.name,
        extensions: this.videoAllowExtensions.join(', ')
      })

    return true
  }
}
