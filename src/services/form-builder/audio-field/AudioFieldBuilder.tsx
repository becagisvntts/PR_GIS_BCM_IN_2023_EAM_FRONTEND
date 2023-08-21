import { Control } from 'react-hook-form'
import FieldBuilder from '../FieldBuilder'
import FieldSetting from '../FieldSetting'
import AudioFileSetting from './AudioFieldSetting'
import AudioFileUpload from './AudioFileUpload'
import store from 'src/store'
import { Typography } from '@mui/material'
import { serverUrl } from 'src/services/common/CommonService'
import { height } from '@mui/system'
import FormBuilderService from '../FormBuilderService'
import LocalizationService from 'src/services/common/LocalizationService'

export default class AudioFieldBuilder extends FieldBuilder {
  constructor() {
    super()
    this.builderLabel = 'form_audio'
    this.builderLabelEng = 'Audio'
    this.builderType = 'file-audio'
    this.builderIcon = 'system-uicons:audio-wave'
    this.fieldSetting = new AudioFileSetting(this.builderType, this.builderLabel, this.generateUniqueName())
  }

  UIOnForm({ control, setValue, errors }: { control: Control; setValue: Function; errors: any }) {
    const audioFieldSetting = this.fieldSetting as AudioFileSetting
    const projectSlug = store.getState().project.activeSlug
    return (
      <AudioFileUpload
        projectSlug={projectSlug}
        name={audioFieldSetting.name}
        label={audioFieldSetting.label}
        value={audioFieldSetting.value}
        required={audioFieldSetting.required}
        allowMultiple={audioFieldSetting.allowMultiple}
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
    const audioFieldBuider = new AudioFieldBuilder()
    audioFieldBuider.syncFieldSetting(fieldSetting)

    return audioFieldBuider
  }

  override UIOnList(): any {
    const audioFieldSetting = this.fieldSetting as AudioFileSetting
    if (audioFieldSetting.value) {
      return audioFieldSetting.value.map((el, index) => (
        <Typography>
          {/* <audio controls>
            <source src={`${serverUrl}${el.path}`} />- {el.name}
          </audio> */}
          <a href={`${serverUrl}${el.path}`} target='_blank'>
            {LocalizationService.translate('form_audio_index', { index: index + 1 })}
          </a>
        </Typography>
      ))
    }
    return ''
  }

  override getFormattedData() {
    const audioFieldSetting = this.fieldSetting as AudioFileSetting
    if (audioFieldSetting.value) {
      const pathList: any[] = []
      audioFieldSetting.value.map(el => pathList.push(`${serverUrl}${el.path}`))
      return pathList.join(', ')
    }
    return ''
  }

  override UIOnMapPopup() {
    const audioFieldSetting = this.fieldSetting as AudioFileSetting
    return LocalizationService.translate('form_files_counter', {
      counter: audioFieldSetting.value ? audioFieldSetting.value.length : 0
    })
  }

  override getSampleData(): any {
    return {
      data: LocalizationService.translate(this.builderLabel).toLocaleLowerCase(),
      type: 's',
      help: 'Nhập vào đường dẫn âm thanh (chỉ hỗ trợ online)',
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
          return 'Đường dẫn âm thanh không chính xác'
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
