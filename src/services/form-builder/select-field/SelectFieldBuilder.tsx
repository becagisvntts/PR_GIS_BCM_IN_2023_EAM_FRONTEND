import { Control } from 'react-hook-form'
import FieldBuilder from '../FieldBuilder'
import FieldSetting from '../FieldSetting'
import { SelectFieldGenerator } from '../FieldGenerator'
import RadioGroupFieldSetting from '../radiogroup-field/RadioGroupFieldSetting'
import { SelectGeneratorSettings } from './SelectGeneratorSettings'
import LocalizationService from 'src/services/common/LocalizationService'
import SelectFieldSetting from './SelectFieldSetting'
import { apiUrl } from 'src/services/common/CommonService'
import SchemaService, { schemaAPI } from 'src/services/SchemaService'
import SelectFieldComponent from './SelectFieldComponent'
import RecordService from 'src/services/RecordService'
import { IOption } from '../FormBuilderService'

export default class SelectFieldBuilder extends FieldBuilder {
  constructor() {
    super()
    this.builderLabel = 'form_select'
    this.builderLabelEng = 'Select'
    this.builderType = 'select'
    this.builderIcon = 'mdi:form-select'
    this.fieldSetting = new SelectFieldSetting(this.builderType, this.builderLabel, this.generateUniqueName())
  }

  override async preloadData() {
    const selectFieldSetting = this.fieldSetting as SelectFieldSetting
    if (selectFieldSetting.optionsSource == 'survey') {
      const response = await RecordService.getRecordListAsSelectOptions(selectFieldSetting.optionsSourceConfig)
      let tmpOptions: IOption[] = []
      response.map((el: any) => {
        let labelArr: string[] = []
        selectFieldSetting.optionsSourceConfig.label.map(key => {
          labelArr.push(el[key])
        })
        tmpOptions.push({
          name: el[selectFieldSetting.optionsSourceConfig.name],
          label: labelArr.join('_')
        })
      })
      selectFieldSetting.options = tmpOptions
    }
  }

  UIOnForm({ control, errors }: { control: Control; errors: any }) {
    const selectFieldSetting = this.fieldSetting as SelectFieldSetting
    return (
      <SelectFieldGenerator
        // optionsSource={selectFieldSetting.optionsSource}
        // optionsSourceConfig={selectFieldSetting.optionsSourceConfig}
        name={selectFieldSetting.name}
        label={selectFieldSetting.label}
        value={selectFieldSetting.value}
        options={selectFieldSetting.options}
        required={selectFieldSetting.required}
        control={control}
        errors={errors}
      />
    )

    ///UI on form appear here
  }

  UIOnFormWithValue({ control, errors }: { control: Control; errors: any }) {
    const selectFieldSetting = this.fieldSetting as SelectFieldSetting

    return (
      <SelectGeneratorSettings
        name={selectFieldSetting.name}
        label={selectFieldSetting.label}
        value={selectFieldSetting.value}
        options={selectFieldSetting.options}
        required={selectFieldSetting.required}
        control={control}
        errors={errors}
      />
    )

    ///UI on form appear here
  }
  override copyWith(fieldSetting: FieldSetting): SelectFieldBuilder {
    const selectFieldBuilder = new SelectFieldBuilder()
    selectFieldBuilder.syncFieldSetting(fieldSetting)

    return selectFieldBuilder
  }

  override getFormattedData() {
    const selectFieldSetting = this.fieldSetting as SelectFieldSetting

    if (selectFieldSetting.options && selectFieldSetting.value) {
      for (let i = 0; i < selectFieldSetting.options.length; i++) {
        const option = selectFieldSetting.options[i]
        if (option.name == selectFieldSetting.value) return option.label
      }
    }
    return ''
  }

  override getSampleData() {
    const selectFieldSetting = this.fieldSetting as SelectFieldSetting

    const option_label = []
    for (let i = 0; i < selectFieldSetting.options.length; i++) {
      const option = selectFieldSetting.options[i]
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

    const selectFieldSetting = this.fieldSetting as SelectFieldSetting
    for (let i = 0; i < selectFieldSetting.options.length; i++) {
      const option = selectFieldSetting.options[i]
      if (option.label == input.trim()) {
        return true
      }
    }
    return 'Dữ liệu nhập vào không tồn tại trong tập kết quả'
  }

  override formatDataFromExcel(input: any): any {
    let data = ''
    const selectFieldSetting = this.fieldSetting as SelectFieldSetting
    for (let i = 0; i < selectFieldSetting.options.length; i++) {
      const option = selectFieldSetting.options[i]
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
