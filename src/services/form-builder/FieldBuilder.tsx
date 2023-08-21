import { Control } from 'react-hook-form'
import { currentMillisecond } from '../common/convertDate'
import { toSlug } from '../common/toSlug'
import FieldSetting from './FieldSetting'
import { Typography } from '@mui/material'
import LocalizationService from '../LocalizationService'

export default class FieldBuilder {
  builderType: string
  builderLabel: string
  builderLabelEng: string
  builderIcon: string
  fieldSetting: FieldSetting

  constructor() {
    this.builderLabel = 'Field'
    this.builderLabelEng = 'Field'
    this.builderType = 'Type'
    this.builderIcon = 'Icon'
    this.fieldSetting = new FieldSetting(this.builderType, this.builderLabel, this.generateUniqueName())
  }

  generateUniqueName() {
    return toSlug(`${this.builderLabelEng}-${currentMillisecond()}`)
  }

  getBuilderLabel() {
    return LocalizationService.translate(this.builderLabel)
  }

  updateName() {
    this.fieldSetting.name = this.generateUniqueName()
  }

  onAddToForm(callback: (json: any) => void) {
    this.fieldSetting.updateName(this.generateUniqueName())
    callback(this.fieldSetting.toJson())
  }

  async preloadData() {}

  UIOnForm({ control, setValue, errors }: { control: Control; setValue: Function; errors: any }) {
    ///UI on form appear here
  }

  UIOnFormWithValue({ control, setValue, errors }: { control: Control; setValue: Function; errors: any }) {
    ///UI on form appear here
  }

  copyWith(fieldSetting: FieldSetting) {
    const fieldBuilder = new FieldBuilder()
    fieldBuilder.syncFieldSetting(fieldSetting)

    return fieldBuilder
  }

  syncFieldSetting(fieldSetting: any) {
    this.fieldSetting = this.fieldSetting.copyWith(fieldSetting)
  }

  syncRecordData(recordData: any) {
    this.fieldSetting.syncRecordData(recordData)
  }

  UIOnList() {
    return <Typography>{this.getFormattedData()}</Typography>
  }

  getFormattedData() {
    return this.builderLabelEng
  }

  UIOnMapPopup() {
    return this.getFormattedData()
  }

  getSampleData(): any {
    return {
      data: LocalizationService.translate(this.builderLabel).toLocaleLowerCase(),
      type: 's',
      help: '',
      width: 10,
      wrapText: true
    }
  }

  validateData(input: any): any {
    if (this.fieldSetting.required && !input) {
      return LocalizationService.translate('msg_field_required', { field: this.fieldSetting.label })
    }
    return true
  }

  formatDataFromExcel(input: any): any {
    let outputData: any = {}
    outputData[this.fieldSetting.name] = input
    return outputData
  }
}
