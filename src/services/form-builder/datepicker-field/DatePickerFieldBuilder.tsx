import { Control } from 'react-hook-form'
import FieldBuilder from '../FieldBuilder'
import FieldSetting from '../FieldSetting'
import { DatePickerGenerator } from '../FieldGenerator'
import DatePickerFieldSetting from './DatePickerFieldSetting'
import { formatDate } from 'src/services/common/convertDate'
import { DatePickerGeneratorSettings } from './DatePickerGeneratorSettings'
import LocalizationService from 'src/services/common/LocalizationService'
import dayjs from 'dayjs'

export default class DatePickerFieldBuilder extends FieldBuilder {
  constructor() {
    super()
    this.builderLabel = 'form_date_picker'
    this.builderLabelEng = 'Date Picker'
    this.builderType = 'date-picker'
    this.builderIcon = 'fontisto:date'
    this.fieldSetting = new DatePickerFieldSetting(this.builderType, this.builderLabel, this.generateUniqueName())
  }

  UIOnForm({ control, setValue, errors }: { control: Control; setValue: any; errors: any }) {
    const datePickerFieldSetting = this.fieldSetting as DatePickerFieldSetting

    return (
      <DatePickerGenerator
        name={datePickerFieldSetting.name}
        label={datePickerFieldSetting.label}
        value={datePickerFieldSetting.value}
        useCurrentDate={datePickerFieldSetting.useCurrentDate}
        setValue={setValue}
        control={control}
        errors={errors}
      />
    )

    ///UI on form appear here
  }
  UIOnFormWithValue({ control, setValue, errors }: { control: Control; setValue: any; errors: any }) {
    const datePickerFieldSetting = this.fieldSetting as DatePickerFieldSetting

    return (
      <DatePickerGeneratorSettings
        name={datePickerFieldSetting.name}
        label={datePickerFieldSetting.label}
        value={datePickerFieldSetting.value}
        useCurrentDate={datePickerFieldSetting.useCurrentDate}
        setValue={setValue}
        control={control}
        errors={errors}
      />
    )

    ///UI on form appear here
  }

  override copyWith(fieldSetting: FieldSetting): DatePickerFieldBuilder {
    const datePickerFieldBuilder = new DatePickerFieldBuilder()
    datePickerFieldBuilder.syncFieldSetting(fieldSetting)

    return datePickerFieldBuilder
  }

  override getFormattedData() {
    const datePickerFieldSetting = this.fieldSetting as DatePickerFieldSetting

    return datePickerFieldSetting.value ? formatDate(datePickerFieldSetting.value) : ''
  }

  override getSampleData(): any {
    return {
      data: dayjs().format('DD/MM/YYYY'),
      type: 's',
      help: 'Nhập vào ngày tháng theo định dạng "DD/MM/YYYY"',
      width: 15,
      wrapText: true
    }
  }

  override validateData(input: any): any {
    const validate = super.validateData(input)
    if (validate !== true) {
      return validate
    }

    if (!input.trim()) return true

    try {
      //TH datetime từ excel bị parse thành number

      //TH datetime là string
      if (!dayjs(input.trim()).isValid()) {
        return `Ngày tháng không hợp lệ: ${input}`
      }
      return true
    } catch (ex) {
      return 'Không thể kiểm tra ngày tháng từ định dạng hiện tại, xem file mẫu'
    }
  }

  override formatDataFromExcel(input: any): any {
    let outputData: any = {}
    outputData[this.fieldSetting.name] = dayjs(input.trim())
    return outputData
  }
}
