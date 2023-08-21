import { Control } from 'react-hook-form'
import { CheckboxFieldGenerator } from '../FieldGenerator'
import FieldSetting from '../FieldSetting'
import LocalizationService from 'src/services/common/LocalizationService'

export default class VideoFieldSetting extends FieldSetting {
  value: any[]
  allowMultiple: boolean

  constructor(
    type: string,
    label: string,
    name: string,
    required = false,
    customName = '',
    value = [],
    allowMultiple = false
  ) {
    super(type, label, name, required, customName)
    this.value = value
    this.allowMultiple = allowMultiple
  }

  toJson() {
    const json = super.toJson()

    return { ...json, value: this.value, allowMultiple: this.allowMultiple }
  }

  override copyWith(json: any) {
    return new VideoFieldSetting(
      json.type ?? this.type,
      json.label ?? this.label,
      json.name ?? this.name,
      json.required ?? this.required,
      json.customName ?? this.customName,
      json.value ?? this.value,
      json.allowMultiple ?? this.allowMultiple
    )
  }

  override syncRecordData(recordData: any) {
    this.value = typeof recordData[this.name] === 'string' ? JSON.parse(recordData[this.name]) : recordData[this.name]
  }

  allowMultipleAttributeSettingUI({ control, errors }: { control: Control; errors: any }) {
    return (
      <CheckboxFieldGenerator
        name='allowMultiple'
        label={LocalizationService.translate('form_allow_multiple_file')}
        value={this.allowMultiple}
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

    return [...attributeSettings, this.allowMultipleAttributeSettingUI({ control, errors })]
  }
}
