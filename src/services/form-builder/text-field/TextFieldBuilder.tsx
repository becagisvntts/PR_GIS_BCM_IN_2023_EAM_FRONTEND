import { Control } from 'react-hook-form'
import { currentMillisecond } from '../../common/convertDate'
import FieldBuilder from '../FieldBuilder'
import FieldSetting from '../FieldSetting'
import TextFieldSetting from './TextFieldSetting'
import { TextFieldGenerator } from '../FieldGenerator'
import { Typography } from '@mui/material'
import { TextGeneratorSettings } from './TextGeneratorSettings'
import LocalizationService from 'src/services/common/LocalizationService'

export default class TextFieldBuilder extends FieldBuilder {
  constructor() {
    super()

    this.builderLabel = 'form_text'
    this.builderLabelEng = 'TextField'
    this.builderType = 'text'
    this.builderIcon = 'material-symbols:text-fields-rounded'
    this.fieldSetting = new TextFieldSetting(this.builderType, this.builderLabel, this.generateUniqueName())
  }

  UIOnForm({ control, setValue, errors }: { control: Control; setValue: Function; errors: any }) {
    const textFieldSetting = this.fieldSetting as TextFieldSetting

    return (
      <TextFieldGenerator
        name={textFieldSetting.name}
        label={textFieldSetting.label}
        value={textFieldSetting.value}
        required={textFieldSetting.required}
        maxLength={textFieldSetting.maxLength}
        subType={textFieldSetting.subType}
        control={control}
        errors={errors}
      />
    )

    ///UI on form appear here
  }
  UIOnFormWithValue({ control, setValue, errors }: { control: Control; setValue: Function; errors: any }) {
    const textFieldSetting = this.fieldSetting as TextFieldSetting

    return (
      <TextGeneratorSettings
        name={textFieldSetting.name}
        label={textFieldSetting.label}
        value={textFieldSetting.value}
        required={textFieldSetting.required}
        maxLength={textFieldSetting.maxLength}
        subType={textFieldSetting.subType}
        control={control}
        errors={errors}
      />
    )

    ///UI on form appear here
  }
  override copyWith(fieldSetting: FieldSetting): TextFieldBuilder {
    const textFieldBuilder = new TextFieldBuilder()
    textFieldBuilder.syncFieldSetting(fieldSetting)

    return textFieldBuilder
  }

  override getFormattedData() {
    const textFieldSetting = this.fieldSetting as TextFieldSetting

    return textFieldSetting.value ?? ''
  }

  override validateData(input: any): any {
    const validate = super.validateData(input)
    if (validate !== true) {
      return validate
    }

    const textFieldSetting = this.fieldSetting as TextFieldSetting
    if (textFieldSetting.maxLength && input.length > textFieldSetting.maxLength) {
      return LocalizationService.translate('msg_field_max_length', {
        field: textFieldSetting.label,
        value: textFieldSetting.maxLength
      })
    }

    let emailPattern = /^[^s@]+@[^s@]+.[^s@]+$/
    if (textFieldSetting.subType == 'email' && !emailPattern.test(input)) {
      return LocalizationService.translate('msg_field_wrong_format', { field: textFieldSetting.label })
    }

    let phonePattern = /^[0-9]{9,}$/
    if (textFieldSetting.subType == 'phone' && !phonePattern.test(input)) {
      return LocalizationService.translate('msg_field_wrong_format', { field: textFieldSetting.label })
    }

    return true
  }
}
