import { Control } from 'react-hook-form'
import { NumberFieldGenerator, SelectFieldGenerator, TextFieldGenerator } from '../FieldGenerator'
import FieldSetting from '../FieldSetting'
import { IOption } from '../FormBuilderService'
import { TextGeneratorSettings } from './TextGeneratorSettings'
import { NumberGeneratorSettings } from '../number-field/NumberGeneratorSettings'
import { SelectGeneratorSettings } from '../select-field/SelectGeneratorSettings'
import LocalizationService from 'src/services/common/LocalizationService'

export default class TextFieldSetting extends FieldSetting {
  maxLength?: number
  value?: string
  subType: string

  // subTypeList: {
  //   text: 'Văn bản'
  //   email: 'Email'
  //   phone: 'Điện thoại'
  // }

  constructor(
    type: string,
    label: string,
    name: string,
    required = false,
    customName = '',
    value = '',
    subType = 'text',
    maxLength?: number
  ) {
    super(type, label, name, required, customName)
    this.value = value
    this.subType = subType
    this.maxLength = maxLength
  }

  toJson() {
    const json = super.toJson()

    return { ...json, maxLength: this.maxLength, value: this.value, subType: this.subType }
  }

  override copyWith(json: any) {
    return new TextFieldSetting(
      json.type ?? this.type,
      json.label ?? this.label,
      json.name ?? this.name,
      json.required ?? this.required,
      json.customName ?? this.customName,
      json.value ?? this.value,
      json.subType ?? this.subType,
      json.maxLength ?? this.maxLength
    )
  }

  override syncRecordData(recordData: any) {
    this.value = recordData[this.name]
  }

  valueAttributeSettingUI({ control, errors }: { control: Control; errors: any }) {
    return (
      <TextFieldGenerator
        name='value'
        label={LocalizationService.translate('form_default_value')}
        value={this.value}
        control={control}
        errors={errors}
      />
    )
  }

  maxLengthAttributeSettingUI({ control, errors }: { control: Control; errors: any }) {
    return (
      <NumberFieldGenerator
        name='maxLength'
        label={LocalizationService.translate('form_max_length')}
        minValue={1}
        value={this.maxLength}
        control={control}
        errors={errors}
      />
    )
  }

  subTypeAttributeSettingUI({ control, errors }: { control: Control; errors: any }) {
    const options: IOption[] = [
      { label: LocalizationService.translate('form_type_text'), name: 'text' },
      { label: LocalizationService.translate('form_type_email'), name: 'email' },
      { label: LocalizationService.translate('form_type_phone'), name: 'phone' }
    ]
    return (
      <SelectFieldGenerator
        name='subType'
        label={LocalizationService.translate('form_text_sub_type')}
        value={this.subType}
        options={options}
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
      this.subTypeAttributeSettingUI({ control, errors }),
      this.valueAttributeSettingUI({ control, errors }),
      this.maxLengthAttributeSettingUI({ control, errors })
    ]
  }
}
