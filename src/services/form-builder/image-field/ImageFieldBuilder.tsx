import { Control } from 'react-hook-form'
import FieldBuilder from '../FieldBuilder'
import FieldSetting from '../FieldSetting'
import ImageFieldSetting from './ImageFieldSetting'
import ImageFileUpload from './ImageFileUpload'
import store from 'src/store'
import { Typography } from '@mui/material'
import { serverUrl } from 'src/services/common/CommonService'
import { height } from '@mui/system'
import LocalizationService from 'src/services/common/LocalizationService'

export default class ImageFieldBuilder extends FieldBuilder {
  constructor() {
    super()
    this.builderLabel = 'form_image'
    this.builderLabelEng = 'Image'
    this.builderType = 'file-image'
    this.builderIcon = 'material-symbols:imagesmode-outline-rounded'
    this.fieldSetting = new ImageFieldSetting(this.builderType, this.builderLabel, this.generateUniqueName())
  }

  UIOnForm({ control, setValue, errors }: { control: Control; setValue: Function; errors: any }) {
    const imageFieldSetting = this.fieldSetting as ImageFieldSetting
    const projectSlug = store.getState().project.activeSlug
    return (
      <ImageFileUpload
        projectSlug={projectSlug}
        name={imageFieldSetting.name}
        label={imageFieldSetting.label}
        value={imageFieldSetting.value}
        required={imageFieldSetting.required}
        allowMultiple={imageFieldSetting.allowMultiple}
        control={control}
        setValue={setValue}
        errors={errors}
      />
    )
  }

  override UIOnFormWithValue({ control, setValue, errors }: { control: Control; setValue: Function; errors: any }) {
    return this.UIOnForm({ control: control, setValue: setValue, errors: errors })
    ///UI on form appear here
  }

  override copyWith(fieldSetting: FieldSetting): any {
    const imageFieldBuider = new ImageFieldBuilder()
    imageFieldBuider.syncFieldSetting(fieldSetting)

    return imageFieldBuider
  }

  override UIOnList(): any {
    const imageFieldSetting = this.fieldSetting as ImageFieldSetting
    if (imageFieldSetting.value) {
      return imageFieldSetting.value.map((el, index) => (
        <Typography>
          <a href={`${serverUrl}${el.path}`} target='_blank'>
            {LocalizationService.translate('form_image_index', { index: index + 1 })}
          </a>
        </Typography>
      ))
    }
    return ''
  }

  override getFormattedData() {
    const imageFieldSetting = this.fieldSetting as ImageFieldSetting
    if (imageFieldSetting.value) {
      const pathList: string[] = []
      imageFieldSetting.value.forEach(element => pathList.push(`${serverUrl}${element.path}`))
      return pathList.join(', ')
    }
    return ''
  }

  override UIOnMapPopup() {
    const imageFieldSetting = this.fieldSetting as ImageFieldSetting
    return LocalizationService.translate('form_files_counter', {
      counter: imageFieldSetting.value ? imageFieldSetting.value.length : 0
    })
  }

  override getSampleData(): any {
    return {
      data: LocalizationService.translate(this.builderLabel).toLocaleLowerCase(),
      type: 's',
      help: 'Nhập vào đường dẫn hình ảnh (chỉ hỗ trợ online)',
      width: 20,
      wrapText: true
    }
  }

  override validateData(input: any): any {
    const validate = super.validateData(input)
    if (validate !== true) {
      return validate
    }

    if (input == '') return true
    try {
      const paths = input.split(',')
      paths.map((path: string) => path.trim())
      for (let i = 0; i < paths.length; i++) {
        if (!paths[i].startsWith('http')) {
          return 'Đường dẫn hình ảnh không chính xác'
        }
      }
      return true
    } catch (ex) {
      return `Không thể xử lý dữ liệu ${this.fieldSetting.label} nhập vào`
    }
  }

  override formatDataFromExcel(input: any): any {
    let data = []
    if (input != '') {
      try {
        const paths = input.split(',')
        paths.map((path: string) => path.trim())
        data = paths
      } catch (ex) {
        data = []
      }
    }

    let outputData: any = {}
    outputData[this.fieldSetting.name] = data
    return outputData
  }
}
