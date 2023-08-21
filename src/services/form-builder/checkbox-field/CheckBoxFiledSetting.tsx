import { Control } from 'react-hook-form'
import { CheckboxFieldGenerator } from '../FieldGenerator'
import FieldSetting from '../FieldSetting'
import { CheckboxGeneratorSettings } from './CheckBoxGeneratorSettings'
import LocalizationService from 'src/services/common/LocalizationService'

export default class CheckBoxFieldSetting extends FieldSetting {
  value?: boolean

  constructor(type: string, label: string, name: string, required = false, customName = '', value = false) {
    super(type, label, name, required, customName)
    this.value = value
  }

  toJson() {
    const json = super.toJson()

    return { ...json, value: this.value }
  }

  override copyWith(json: any) {
    return new CheckBoxFieldSetting(
      json.type ?? this.type,
      json.label ?? this.label,
      json.name ?? this.name,
      json.required ?? this.required,
      json.customName ?? this.customName,
      json.value ?? this.value
    )
  }

  override syncRecordData(recordData: any) {
    this.value = recordData[this.name]
  }

  valueAttributeSettingUI({ control, errors }: { control: Control; errors: any }) {
    return (
      <CheckboxFieldGenerator
        name='value'
        label={LocalizationService.translate('form_default_value')}
        value={this.value}
        control={control}
        errors={errors}
      />
    )
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

    return [...attributeSettings, this.valueAttributeSettingUI({ control, errors })]
  }
}
