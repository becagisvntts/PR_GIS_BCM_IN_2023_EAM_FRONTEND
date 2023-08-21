import { Control } from 'react-hook-form'
import FieldBuilder from '../FieldBuilder'
import FieldSetting from '../FieldSetting'
import VideoFieldSetting from './VideoFieldSetting'
import VideoFileUpload from './VideoFileUpload'
import store from 'src/store'
import { Typography } from '@mui/material'
import { serverUrl } from 'src/services/common/CommonService'
import { height } from '@mui/system'
import FormBuilderService from '../FormBuilderService'
import LocalizationService from 'src/services/common/LocalizationService'

export default class VideoFieldBuilder extends FieldBuilder {
  constructor() {
    super()
    this.builderLabel = 'form_video'
    this.builderLabelEng = 'Video'
    this.builderType = 'file-video'
    this.builderIcon = 'akar-icons:video'
    this.fieldSetting = new VideoFieldSetting(this.builderType, this.builderLabel, this.generateUniqueName())
  }

  UIOnForm({ control, setValue, errors }: { control: Control; setValue: Function; errors: any }) {
    const videoFieldSetting = this.fieldSetting as VideoFieldSetting
    const projectSlug = store.getState().project.activeSlug
    return (
      <VideoFileUpload
        projectSlug={projectSlug}
        name={videoFieldSetting.name}
        label={videoFieldSetting.label}
        value={videoFieldSetting.value}
        required={videoFieldSetting.required}
        allowMultiple={videoFieldSetting.allowMultiple}
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
    const videoFieldBuider = new VideoFieldBuilder()
    videoFieldBuider.syncFieldSetting(fieldSetting)

    return videoFieldBuider
  }

  override UIOnList(): any {
    const videoFieldSetting = this.fieldSetting as VideoFieldSetting
    if (videoFieldSetting.value) {
      return videoFieldSetting.value.map((el, index) => (
        <Typography>
          <a href={`${serverUrl}${el.path}`} target='_blank'>
            {LocalizationService.translate('form_video_index', { index: index + 1 })}
          </a>
        </Typography>
      ))
    }
    return ''
  }

  override getFormattedData() {
    const videoFieldSetting = this.fieldSetting as VideoFieldSetting
    if (videoFieldSetting.value) {
      const pathList: string[] = []
      videoFieldSetting.value.forEach(element => pathList.push(`${serverUrl}${element.path}`))
      return pathList.join(', ')
    }
    return ''
  }

  override UIOnMapPopup() {
    const videoFieldSetting = this.fieldSetting as VideoFieldSetting
    return LocalizationService.translate('form_files_counter', {
      counter: videoFieldSetting.value ? videoFieldSetting.value.length : 0
    })
  }

  override getSampleData(): any {
    return {
      data: LocalizationService.translate(this.builderLabel).toLocaleLowerCase(),
      type: 's',
      help: 'Nhập vào url video \nNgăn cách nhau bằng dấu,',
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
          return 'Đường dẫn video không chính xác'
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
