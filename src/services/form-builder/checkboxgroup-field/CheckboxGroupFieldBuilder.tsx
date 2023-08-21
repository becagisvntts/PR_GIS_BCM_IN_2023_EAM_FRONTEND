import { Control } from 'react-hook-form'
import FieldBuilder from '../FieldBuilder'
import FieldSetting from '../FieldSetting'
import CheckboxGroupFieldSetting from './CheckboxGroupFieldSetting'
import { CheckboxGroupFieldGenerator } from '../FieldGenerator'
import FormBuilderService from '../FormBuilderService'
import LocalizationService from 'src/services/common/LocalizationService'

export default class CheckboxGroupFieldBuilder extends FieldBuilder {
  constructor() {
    super()
    this.builderLabel = 'form_checkbox_group'
    this.builderLabelEng = 'Checkbox Group'
    this.builderType = 'checkboxGroup'
    this.builderIcon = 'mdi:checkbox-multiple-outline'
    this.fieldSetting = new CheckboxGroupFieldSetting(this.builderType, this.builderLabel, this.generateUniqueName())
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  UIOnForm({ control, setValue, errors }: { control: Control; setValue: Function; errors: any }) {
    const checkboxGroupFieldSetting = this.fieldSetting as CheckboxGroupFieldSetting

    return (
      <CheckboxGroupFieldGenerator
        name={checkboxGroupFieldSetting.name}
        label={checkboxGroupFieldSetting.label}
        required={checkboxGroupFieldSetting.required}
        options={checkboxGroupFieldSetting.options}
        value={checkboxGroupFieldSetting.value}
        setValue={setValue}
        control={control}
        errors={errors}
      />
    )

    ///UI on form appear here
  }
  UIOnFormWithValue({ control, setValue, errors }: { control: Control; setValue: Function; errors: any }) {
    const checkboxGroupFieldSetting = this.fieldSetting as CheckboxGroupFieldSetting

    return (
      <CheckboxGroupFieldGenerator
        name={checkboxGroupFieldSetting.name}
        label={checkboxGroupFieldSetting.label}
        required={checkboxGroupFieldSetting.required}
        options={checkboxGroupFieldSetting.options}
        value={checkboxGroupFieldSetting.value}
        setValue={setValue}
        control={control}
        errors={errors}
      />
    )

    ///UI on form appear here
  }

  override copyWith(fieldSetting: FieldSetting): CheckboxGroupFieldBuilder {
    const checkboxGroupFieldBuilder = new CheckboxGroupFieldBuilder()
    checkboxGroupFieldBuilder.syncFieldSetting(fieldSetting)

    return checkboxGroupFieldBuilder
  }

  override getFormattedData() {
    const checkboxFieldSetting = this.fieldSetting as CheckboxGroupFieldSetting

    const checkedLabels = []
    if (checkboxFieldSetting.options && checkboxFieldSetting.value) {
      for (let i = 0; i < checkboxFieldSetting.options.length; i++) {
        const option = checkboxFieldSetting.options[i]
        if (checkboxFieldSetting.value.includes(option.name)) checkedLabels.push(option.label)
      }
    }
    return checkedLabels.join(', ')
  }

  override getSampleData() {
    const checkboxGroupFieldSetting = this.fieldSetting as CheckboxGroupFieldSetting

    const option_label = []
    for (let i = 0; i < checkboxGroupFieldSetting.options.length; i++) {
      const option = checkboxGroupFieldSetting.options[i]
      option_label.push(option.label)
    }

    return {
      data: option_label.join(' | '),
      type: 's',
      help: 'Chọn 1 hoặc nhiều tùy chọn' + '\n\nNgăn cách nhau bằng dấu "|" ',
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

    const inputArr = input.split('|')
    const checkboxGroupFieldSetting = this.fieldSetting as CheckboxGroupFieldSetting
    let containsCounter = 0
    for (let k = 0; k < inputArr.length; k++) {
      for (let i = 0; i < checkboxGroupFieldSetting.options.length; i++) {
        const option = checkboxGroupFieldSetting.options[i]
        if (option.label == inputArr[k].trim()) {
          containsCounter++
          break
        }
      }
    }

    return containsCounter == inputArr.length ? true : 'Dữ liệu nhập vào không tồn tại trong tập kết quả'
  }

  override formatDataFromExcel(input: any): any {
    const inputArr = input.split('|')
    const checkboxGroupFieldSetting = this.fieldSetting as CheckboxGroupFieldSetting
    let valueArr = []
    for (let k = 0; k < inputArr.length; k++) {
      for (let i = 0; i < checkboxGroupFieldSetting.options.length; i++) {
        const option = checkboxGroupFieldSetting.options[i]
        if (option.label == inputArr[k].trim()) {
          valueArr.push(option.name)
        }
      }
    }

    let outputData: any = {}
    outputData[this.fieldSetting.name] = valueArr
    return outputData
  }
}
