import { Control } from 'react-hook-form'
import { CheckboxFieldGenerator, DatePickerGenerator } from '../FieldGenerator'
import FieldSetting from '../FieldSetting'
import { DatePickerGeneratorSettings } from './DatePickerGeneratorSettings'
import { CheckboxGeneratorSettings } from '../checkbox-field/CheckBoxGeneratorSettings'
import LocalizationService from 'src/services/common/LocalizationService'

export default class DatePickerFieldSetting extends FieldSetting {
  value?: any
  useCurrentDate: boolean

  constructor(
    type: string,
    label: string,
    name: string,
    required = false,
    customName = '',
    value?: any,
    useCurrentDate = false
  ) {
    super(type, label, name, required, customName)
    this.value = value
    this.useCurrentDate = useCurrentDate
  }

  toJson() {
    const json = super.toJson()

    return { ...json, value: this.value, useCurrentDate: this.useCurrentDate }
  }

  override copyWith(json: any) {
    return new DatePickerFieldSetting(
      json.type ?? this.type,
      json.label ?? this.label,
      json.name ?? this.name,
      json.required ?? this.required,
      json.customName ?? this.customName,
      json.value ?? this.value,
      json.useCurrentDate ?? this.useCurrentDate
    )
  }

  override syncRecordData(recordData: any) {
    this.value = recordData[this.name]
  }

  valueAttributeSettingUI({ control, setValue, errors }: { control: Control; setValue: any; errors: any }) {
    return (
      <DatePickerGenerator
        name='value'
        label={LocalizationService.translate('form_default_value')}
        value={this.value ?? undefined}
        useCurrentDate={this.useCurrentDate}
        setValue={setValue}
        control={control}
        errors={errors}
      />
    )
  }
  useCurrentDateAttributeSettingUI({ control, errors }: { control: Control; errors: any }) {
    return (
      <CheckboxFieldGenerator
        name='useCurrentDate'
        label={LocalizationService.translate('form_use_current_date')}
        value={this.useCurrentDate}
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

    return [
      ...attributeSettings,
      this.valueAttributeSettingUI({ control, setValue, errors }),
      this.useCurrentDateAttributeSettingUI({ control, errors })
    ]
  }
}
