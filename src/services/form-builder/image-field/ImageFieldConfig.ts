import LocalizationService from 'src/services/common/LocalizationService'

export default class ImageFieldConfig {
  static imageAllowExtensions = ['.jpg', '.png', '.jpeg']
  static imageMaxSizeB = 10485760 //1048576 * 5
  static imageMaxSizeMB = 5 //1048576 * 5
  static baseSizeB = 1048576

  static validateImage(file: File) {
    if (file.size > ImageFieldConfig.imageMaxSizeB)
      return LocalizationService.translate('form_file_over_size', {
        file_name: file.name,
        file_max_size: `${this.imageMaxSizeMB}MB`
      })

    const nameArr = file.name.split('.')
    if (nameArr.length == 1 || !this.imageAllowExtensions.includes(`.${nameArr[nameArr.length - 1]}`))
      return LocalizationService.translate('form_file_extensions', {
        file_name: file.name,
        extensions: this.imageAllowExtensions.join(', ')
      })

    return true
  }
}
