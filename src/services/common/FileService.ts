import generateExcel from 'zipcelx'
import FormBuilderService from '../form-builder/FormBuilderService'
import { formatDateTime } from './convertDate'
import LocalizationService from './LocalizationService'
import * as XLSX from 'xlsx'

export default class FileService {
  static projectRecordsToExcel(fileName: string, fieldSettings: any, records: any) {
    const config = {
      filename: fileName,
      sheet: {
        data: []
      }
    }

    const dataSet = config.sheet.data

    // review with one level nested config
    // HEADERS
    const headerRow: any[] = []

    fieldSettings.forEach((fieldSetting: any) => {
      headerRow.push({
        value: fieldSetting.label,
        type: 'string'
      })
    })

    headerRow.push({ value: LocalizationService.translate('record_author'), type: 'string' })
    headerRow.push({ value: LocalizationService.translate('record_created_time'), type: 'string' })

    dataSet.push(headerRow)

    // FILTERED ROWS
    if (records.length > 0) {
      records.forEach((record: any) => {
        const dataRow: any[] = []

        fieldSettings.forEach((fieldSetting: any) => {
          const fieldBuilder = FormBuilderService.getCopyOfFieldBuilderByFieldSetting(fieldSetting)
          fieldBuilder.syncRecordData(record.record_data)
          dataRow.push({ value: fieldBuilder.getFormattedData(), type: 'string' })
        })
        dataRow.push({ value: record.author_name, type: 'string' })
        dataRow.push({ value: formatDateTime(record.created_time), type: 'string' })

        dataSet.push(dataRow)
      })
    }

    return generateExcel(config)
  }

  static projectStructureToExcel(fileName: string, fieldSettings: any) {
    const dataSet = []
    const headerRow: any[] = []

    fieldSettings.forEach((fieldSetting: any) => {
      headerRow.push(fieldSetting.label)
    })
    dataSet.push(headerRow)

    ///Sample data
    const dataRow: any[] = []
    const dataFormat: any[] = []
    const dataHelpText: any[] = []
    const colWidths: any[] = []
    const colWrapTexts: any[] = []
    fieldSettings.map((fieldSetting: any) => {
      const fieldBuilder = FormBuilderService.getCopyOfFieldBuilderByFieldSetting(fieldSetting)
      const dataFieldSample = fieldBuilder.getSampleData()
      dataRow.push(dataFieldSample.data)
      dataFormat.push(dataFieldSample.type)
      dataHelpText.push(dataFieldSample.help)
      colWidths.push(dataFieldSample.width)
      colWrapTexts.push(dataFieldSample.wrapText)
    })

    dataSet.push(dataRow)
    dataSet.push(dataHelpText)

    const workbook = XLSX.utils.book_new()
    const worksheet = XLSX.utils.aoa_to_sheet(dataSet)

    const colWidthsFormatted = []
    for (let col = 0; col < dataFormat.length; col++) {
      ///Data row
      const dataCellAddress = XLSX.utils.encode_cell({ r: 1, c: col })
      worksheet[dataCellAddress].t = dataFormat[col]
      worksheet[dataCellAddress].s = { alignment: { wrapText: colWrapTexts[col] } }

      ///Help text row
      const helpCellAddress = XLSX.utils.encode_cell({ r: 2, c: col })
      worksheet[helpCellAddress].s = { alignment: { wrapText: colWrapTexts[col] } }

      ///Col width
      colWidthsFormatted.push({ wch: colWidths[col] })
    }
    worksheet['!cols'] = colWidthsFormatted

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')

    // const excelBuffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' })
    XLSX.writeFileXLSX(workbook, `${fileName}.xlsx`)
  }
}
