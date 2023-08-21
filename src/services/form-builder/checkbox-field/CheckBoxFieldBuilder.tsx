import { Control } from 'react-hook-form'
import FieldBuilder from '../FieldBuilder'
import FieldSetting from '../FieldSetting'
import { CheckboxFieldGenerator } from '../FieldGenerator'
import CheckBoxFieldSetting from './CheckBoxFiledSetting'
import { Box, Typography } from '@mui/material'
import { CheckboxGeneratorSettings } from './CheckBoxGeneratorSettings'
import IconifyIcon from 'src/@core/components/icon'
import FormBuilderService from '../FormBuilderService'
import LocalizationService from 'src/services/common/LocalizationService'

export default class CheckBoxFieldBuilder extends FieldBuilder {
  constructor() {
    super()
    this.builderLabel = 'form_checkbox'
    this.builderLabelEng = 'Checkbox'
    this.builderType = 'checkbox'
    this.builderIcon = 'octicon:checkbox-24'
    this.fieldSetting = new CheckBoxFieldSetting(this.builderType, this.builderLabel, this.generateUniqueName())
  }

  UIOnForm({ control, errors }: { control: Control; errors: any }) {
    const checkboxFieldSetting = this.fieldSetting as CheckBoxFieldSetting

    return (
      <CheckboxFieldGenerator
        name={checkboxFieldSetting.name}
        label={checkboxFieldSetting.label}
        value={checkboxFieldSetting.value}
        control={control}
        errors={errors}
      />
    )

    ///UI on form appear here
  }
  UIOnFormWithValue({ control, errors }: { control: Control; errors: any }) {
    const checkboxFieldSetting = this.fieldSetting as CheckBoxFieldSetting

    return (
      <CheckboxGeneratorSettings
        name={checkboxFieldSetting.name}
        label={checkboxFieldSetting.label}
        value={checkboxFieldSetting.value}
        control={control}
        errors={errors}
      />
    )

    ///UI on form appear here
  }

  override copyWith(fieldSetting: FieldSetting): CheckBoxFieldBuilder {
    const checkboxFieldBuilder = new CheckBoxFieldBuilder()
    checkboxFieldBuilder.syncFieldSetting(fieldSetting)

    return checkboxFieldBuilder
  }

  override getFormattedData() {
    const checkboxFieldSetting = this.fieldSetting as CheckBoxFieldSetting

    return checkboxFieldSetting.value ? 'X' : ''
  }

  override UIOnList() {
    return this.getFormattedData() == '' ? (
      <Typography></Typography>
    ) : (
      <IconifyIcon icon={'material-symbols:check-small'} color='success.main' />
    )
  }

  override getSampleData() {
    return {
      data: true,
      type: 'b',
      help: 'Nhập vào "TRUE" hoặc "FALSE"',
      width: 15,
      wrapText: true
    }
  }

  override validateData(input: any): any {
    if (typeof input !== 'boolean') {
      return 'Định dạng checkbox không chính xác'
    }
    return true
  }
}
