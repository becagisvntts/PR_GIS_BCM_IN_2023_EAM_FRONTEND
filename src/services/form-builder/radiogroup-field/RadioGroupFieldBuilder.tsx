import { Control } from 'react-hook-form'
import FieldBuilder from '../FieldBuilder'
import FieldSetting from '../FieldSetting'
import { RadioGroupFieldGenerator } from '../FieldGenerator'
import RadioGroupFieldSetting from './RadioGroupFieldSetting'
import { RadioGroupGeneratorSettings } from './RadioGroupGeneratorSettings'
import LocalizationService from 'src/services/common/LocalizationService'

export default class RadioGroupFieldBuilder extends FieldBuilder {
  constructor() {
    super()
    this.builderLabel = 'form_radio_group'
    this.builderLabelEng = 'Radio Group'
    this.builderType = 'radioGroup'
    this.builderIcon = 'ri:radio-button-line'
    this.fieldSetting = new RadioGroupFieldSetting(this.builderType, this.builderLabel, this.generateUniqueName())
  }

  override UIOnForm({ control, setValue, errors }: { control: Control; setValue: Function; errors: any }) {
    const radioGroupFieldSetting = this.fieldSetting as RadioGroupFieldSetting

    return (
      <RadioGroupFieldGenerator
        name={radioGroupFieldSetting.name}
        label={radioGroupFieldSetting.label}
        value={radioGroupFieldSetting.value}
        options={radioGroupFieldSetting.options}
        required={radioGroupFieldSetting.required}
        setValue={setValue}
        control={control}
        errors={errors}
      />
    )

    ///UI on form appear here
  }
  override UIOnFormWithValue({ control, setValue, errors }: { control: Control; setValue: Function; errors: any }) {
    const radioGroupFieldSetting = this.fieldSetting as RadioGroupFieldSetting

    return (
      <RadioGroupGeneratorSettings
        name={radioGroupFieldSetting.name}
        label={radioGroupFieldSetting.label}
        value={radioGroupFieldSetting.value}
        options={radioGroupFieldSetting.options}
        required={radioGroupFieldSetting.required}
        setValue={setValue}
        control={control}
        errors={errors}
      />
    )

    ///UI on form appear here
  }
  override copyWith(fieldSetting: FieldSetting): RadioGroupFieldBuilder {
    const radioGroupFieldBuilder = new RadioGroupFieldBuilder()
    radioGroupFieldBuilder.syncFieldSetting(fieldSetting)

    return radioGroupFieldBuilder
  }

  override getFormattedData() {
    const radioGroupFieldSetting = this.fieldSetting as RadioGroupFieldSetting

    if (radioGroupFieldSetting.options && radioGroupFieldSetting.value) {
      for (let i = 0; i < radioGroupFieldSetting.options.length; i++) {
        const option = radioGroupFieldSetting.options[i]
        if (option.name == radioGroupFieldSetting.value) return option.label
      }
    }
    return ''
  }

  override getSampleData() {
    const radioGroupFieldSetting = this.fieldSetting as RadioGroupFieldSetting

    const option_label = []
    for (let i = 0; i < radioGroupFieldSetting.options.length; i++) {
      const option = radioGroupFieldSetting.options[i]
      option_label.push(option.label)
    }

    return {
      data: option_label.join(' | '),
      type: 's',
      help: 'Chọn 1 trong các tùy chọn ở trên',
      width: 25,
      wrapText: true
    }
  }

  override validateData(input: any): any {
    const validate = super.validateData(input)
    if (validate !== true) {
      return validate
    }

    if (!input.trim()) return true

    const radioGroupFieldSetting = this.fieldSetting as RadioGroupFieldSetting
    for (let i = 0; i < radioGroupFieldSetting.options.length; i++) {
      const option = radioGroupFieldSetting.options[i]
      if (option.label == input.trim()) {
        return true
      }
    }
    return 'Dữ liệu nhập vào không tồn tại trong tập kết quả'
  }

  override formatDataFromExcel(input: any): any {
    let data = ''
    const radioGroupFieldSetting = this.fieldSetting as RadioGroupFieldSetting
    for (let i = 0; i < radioGroupFieldSetting.options.length; i++) {
      const option = radioGroupFieldSetting.options[i]
      if (option.label == input.trim()) {
        data = option.name
        break
      }
    }

    let outputData: any = {}
    outputData[this.fieldSetting.name] = data
    return outputData
  }
}
