import { Control } from 'react-hook-form'
import FieldBuilder from '../FieldBuilder'
import FieldSetting from '../FieldSetting'
import { NumberFieldGenerator } from '../FieldGenerator'
import NumberFieldSetting from './NumberFieldSetting'
import { Typography } from '@mui/material'
import { NumberGeneratorSettings } from './NumberGeneratorSettings'
import LocalizationService from 'src/services/common/LocalizationService'

export default class NumberFieldBuilder extends FieldBuilder {
  constructor() {
    super()
    this.builderLabel = 'form_number'
    this.builderLabelEng = 'Number'
    this.builderType = 'number'
    this.builderIcon = 'material-symbols:123'
    this.fieldSetting = new NumberFieldSetting(this.builderType, this.builderLabel, this.generateUniqueName())
  }

  UIOnForm({ control, errors }: { control: Control; errors: any }) {
    const numberFieldSetting = this.fieldSetting as NumberFieldSetting

    return (
      <NumberFieldGenerator
        name={numberFieldSetting.name}
        label={numberFieldSetting.label}
        required={numberFieldSetting.required}
        minValue={numberFieldSetting.minValue}
        maxValue={numberFieldSetting.maxValue}
        value={numberFieldSetting.value}
        control={control}
        errors={errors}
      />
    )

    ///UI on form appear here
  }
  UIOnFormWithValue({ control, errors }: { control: Control; errors: any }) {
    const numberFieldSetting = this.fieldSetting as NumberFieldSetting

    return (
      <NumberGeneratorSettings
        name={numberFieldSetting.name}
        label={numberFieldSetting.label}
        required={numberFieldSetting.required}
        minValue={numberFieldSetting.minValue}
        maxValue={numberFieldSetting.maxValue}
        value={numberFieldSetting.value}
        control={control}
        errors={errors}
      />
    )

    ///UI on form appear here
  }

  override copyWith(fieldSetting: FieldSetting): NumberFieldBuilder {
    const numberFieldBuilder = new NumberFieldBuilder()
    numberFieldBuilder.syncFieldSetting(fieldSetting)

    return numberFieldBuilder
  }

  override getFormattedData(): any {
    const numberFieldSetting = this.fieldSetting as NumberFieldSetting
    return numberFieldSetting.value ?? ''
  }

  override getSampleData() {
    return {
      data: 1,
      type: 'n',
      help: 'Nhập vào số',
      width: 10,
      wrapText: true
    }
  }

  override validateData(input: any): any {
    const validate = super.validateData(input)
    if (validate !== true) {
      return validate
    }

    const numberFieldSetting = this.fieldSetting as NumberFieldSetting
    if (input && typeof input !== 'number' && typeof parseFloat(input) !== 'number') {
      return 'Invalidate type number'
    }

    if (numberFieldSetting.minValue && input < numberFieldSetting.minValue) {
      return LocalizationService.translate('msg_field_min_value', {
        field: numberFieldSetting.label,
        value: numberFieldSetting.minValue
      })
    }

    if (numberFieldSetting.maxValue && input > numberFieldSetting.maxValue) {
      return LocalizationService.translate('msg_field_max_value', {
        field: numberFieldSetting.label,
        value: numberFieldSetting.maxValue
      })
    }

    return true
  }

  override formatDataFromExcel(input: any) {
    let outputData: any = {}
    outputData[this.fieldSetting.name] = input ?? ''
    return outputData
  }
}
