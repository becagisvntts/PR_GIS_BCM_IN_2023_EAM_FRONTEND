import { Control } from 'react-hook-form'
import { NumberFieldGenerator } from '../FieldGenerator'
import FieldSetting from '../FieldSetting'
import { NumberGeneratorSettings } from './NumberGeneratorSettings'
import LocalizationService from 'src/services/common/LocalizationService'

export default class NumberFieldSetting extends FieldSetting {
  minValue?: number
  maxValue?: number
  value?: number | string

  constructor(
    type: string,
    label: string,
    name: string,
    required = false,
    customName = '',
    minValue?: number,
    maxValue?: number,
    value = ''
  ) {
    super(type, label, name, required, customName)
    ;(this.minValue = minValue), (this.maxValue = maxValue), (this.value = value)
  }

  toJson() {
    const json = super.toJson()

    return { ...json, minValue: this.minValue, maxValue: this.maxValue, value: this.value }
  }

  override copyWith(json: any) {
    return new NumberFieldSetting(
      json.type ?? this.type,
      json.label ?? this.label,
      json.name ?? this.name,
      json.required ?? this.required,
      json.customName ?? this.customName,
      json.minValue ?? this.minValue,
      json.maxValue ?? this.maxValue,
      json.value ?? this.value
    )
  }

  override syncRecordData(recordData: any) {
    this.value = recordData[this.name]
  }

  maxValueAttributeSettingUI({ control, errors }: { control: Control; errors: any }) {
    return (
      <NumberFieldGenerator
        name='maxValue'
        label={LocalizationService.translate('form_max_value')}
        value={this.maxValue}
        control={control}
        errors={errors}
      />
    )
  }
  minValueAttributeSettingUI({ control, errors }: { control: Control; errors: any }) {
    return (
      <NumberFieldGenerator
        name='minValue'
        label={LocalizationService.translate('form_min_value')}
        value={this.minValue}
        control={control}
        errors={errors}
      />
    )
  }
  valueAttributeSettingUI({ control, errors }: { control: Control; errors: any }) {
    return (
      <NumberFieldGenerator
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

    return [
      ...attributeSettings,
      this.minValueAttributeSettingUI({ control, errors }),
      this.maxValueAttributeSettingUI({ control, errors }),
      this.valueAttributeSettingUI({ control, errors })
    ]
  }
}
