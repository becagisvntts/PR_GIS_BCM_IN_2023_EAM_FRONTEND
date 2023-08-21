import { Control } from 'react-hook-form'
import FieldSetting from '../FieldSetting'
import SelectFieldOption from './SelectFieldOption'
import { IOption, defaultIOptions } from '../FormBuilderService'
import SchemaService from 'src/services/SchemaService'
import RecordService from 'src/services/RecordService'
import LocalizationService from 'src/services/common/LocalizationService'

export interface SurveySourceConfig {
  projectSlug: string
  name: string
  label: any[]
}

const defaultSurveySourceConfig = {
  projectSlug: '',
  name: 'id',
  label: ['id']
}

export default class SelectFieldSetting extends FieldSetting {
  optionsSource: string
  optionsSourceConfig: SurveySourceConfig
  options: IOption[]
  value: string

  constructor(
    type: string,
    label: string,
    name: string,
    required = false,
    customName = '',
    options = defaultIOptions,
    value = '',
    optionsSource = 'manual',
    optionsSourceConfig = defaultSurveySourceConfig
  ) {
    super(type, label, name, required, customName)
    this.optionsSource = optionsSource
    this.optionsSourceConfig = optionsSourceConfig
    this.options = [...options]
    this.value = value
  }

  async initOptions() {
    if (this.optionsSource == 'survey' && this.options.length == 0) {
      const response = await RecordService.getRecordListAsSelectOptions(this.optionsSourceConfig)
      let tmpOptions: IOption[] = []
      response.map((el: any) => {
        let labelArr: string[] = []
        this.optionsSourceConfig.label.map(key => {
          labelArr.push(el[key])
        })
        tmpOptions.push({
          name: el[this.optionsSourceConfig.name],
          label: labelArr.join('_')
        })
      })
      this.options = tmpOptions
    }
  }

  toJson() {
    const json = super.toJson()

    return {
      ...json,
      options: this.options,
      value: this.value,
      optionsSource: this.optionsSource,
      optionsSourceConfig: this.optionsSourceConfig
    }
  }
  // eslint-disable-next-line @typescript-eslint/ban-types
  optionsAttributeSettingUI({ control, setValue, errors }: { control: Control; setValue: Function; errors: any }) {
    return (
      <SelectFieldOption
        optionsSource={this.optionsSource}
        optionsSourceConfig={this.optionsSourceConfig}
        value={this.value}
        options={this.options}
        setValue={setValue}
        control={control}
        errors={errors}
      />
    )
  }

  override copyWith(json: any) {
    return new SelectFieldSetting(
      json.type ?? this.type,
      json.label ?? this.label,
      json.name ?? this.name,
      json.required ?? this.required,
      json.customName ?? this.customName,
      json.options ?? this.options,
      json.value ?? this.value,
      json.optionsSource ?? this.optionsSource,
      json.optionsSourceConfig ?? this.optionsSourceConfig
    )
  }

  override syncRecordData(recordData: any) {
    this.value = recordData[this.name]
  }

  override getListAttributeSettingUI({
    control,
    setValue,
    errors
  }: {
    control: Control
    setValue: Function
    errors: any
  }) {
    const attributeSettings = super.getListAttributeSettingUI({ control, setValue, errors })

    return [...attributeSettings, this.optionsAttributeSettingUI({ control, setValue, errors })]
  }
}
