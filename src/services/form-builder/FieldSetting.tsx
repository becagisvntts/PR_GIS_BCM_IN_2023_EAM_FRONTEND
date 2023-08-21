import { Control } from 'react-hook-form'
import { CheckboxFieldGenerator, TextFieldGenerator } from './FieldGenerator'
import LocalizationService from '../LocalizationService'

export default class FieldSetting {
  type: string
  name: string
  customName: string
  label: string
  required: boolean

  constructor(type: string, label: string, name: string, required = false, customName = '') {
    this.type = type
    this.label = label
    this.name = LocalizationService.translate(name)
    this.customName = customName == '' ? LocalizationService.translate(name) : customName
    this.required = required
  }

  updateName(name: string) {
    this.name = name
    this.customName = name
  }

  toJson() {
    return {
      type: this.type,
      name: this.name,
      customName: this.customName,
      label: this.label,
      required: this.required
    }
  }

  copyWith(json: any) {
    return new FieldSetting(json.type, json.label, json.name, json.required, json.customName)
  }

  syncRecordData(recordData: any) {}

  labelAttributeSettingUI({ control, errors }: { control: Control; errors: any }) {
    return (
      <TextFieldGenerator
        name='label'
        label={LocalizationService.translate('form_field_label')}
        value={LocalizationService.translate(this.label)!}
        required={true}
        control={control}
        errors={errors}
      />
    )
  }

  requiredAttributeSettingUI({ control, errors }: { control: Control; errors: any }) {
    return (
      <CheckboxFieldGenerator
        name='required'
        label={LocalizationService.translate('form_field_required')}
        value={this.required}
        control={control}
        errors={errors}
      />
    )
  }

  customNameAttributeSettingUI({ control, errors }: { control: Control; errors: any }) {
    return (
      <TextFieldGenerator
        name='customName'
        label={LocalizationService.translate('form_field_name')}
        value={this.customName}
        control={control}
        errors={errors}
      />
    )
  }

  getListAttributeSettingUI({ control, setValue, errors }: { control: Control; setValue: Function; errors: any }) {
    return [
      this.requiredAttributeSettingUI({ control, errors }),
      this.labelAttributeSettingUI({ control, errors }),
      this.customNameAttributeSettingUI({ control, errors })
    ]
  }
}
