import { Control } from 'react-hook-form'
import FieldSetting from '../FieldSetting'
import CheckboxGroupFieldOption from './CheckboxGroupFieldOption'
import { IOption, defaultIOptions } from '../FormBuilderService'
import LocalizationService from 'src/services/common/LocalizationService'

export default class CheckboxGroupFieldSetting extends FieldSetting {
  options: IOption[]
  value: any[]

  constructor(
    type: string,
    label: string,
    name: string,
    required = false,
    customName = '',
    options = defaultIOptions,
    value = []
  ) {
    super(type, label, name, required, customName)
    this.options = [...options]
    this.value = value
  }

  toJson() {
    const json = super.toJson()

    return { ...json, options: this.options, value: this.value }
  }
  // eslint-disable-next-line @typescript-eslint/ban-types
  optionsAttributeSettingUI({ control, setValue, errors }: { control: Control; setValue: Function; errors: any }) {
    return (
      <CheckboxGroupFieldOption
        options={this.options}
        value={this.value}
        setValue={setValue}
        control={control}
        errors={errors}
      />
    )
  }

  override copyWith(json: any) {
    return new CheckboxGroupFieldSetting(
      json.type ?? this.type,
      json.label ?? this.label,
      json.name ?? this.name,
      json.required ?? this.required,
      json.customName ?? this.customName,
      json.options ?? this.options,
      json.value ?? this.value
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
