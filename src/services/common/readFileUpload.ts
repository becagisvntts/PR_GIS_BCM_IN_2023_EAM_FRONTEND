import * as XLSX from 'xlsx'

export function readFileUpload(e: any) {
  const promise = new Promise<any>((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsBinaryString(e.target.files[0])
    reader.onload = (e: any) => {
      const data = e.target.result
      const workbook = XLSX.read(data, { type: 'binary' })
      const sheetName = workbook.SheetNames[0]
      const sheet = workbook.Sheets[sheetName]
      const parsedData = XLSX.utils.sheet_to_json(sheet, { blankrows: true, raw: false, defval: '' })
      resolve(parsedData)
    }
    reader.onerror = error => {
      reject(error)
    }
  })
  promise.then(item => {
    return item
  })
  return promise
}

export function readJsonFile(e: any) {
  const promise = new Promise<any>((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsText(e.target.files[0])
    reader.onload = (e: any) => {
      const data = e.target.result
      const geoJSONData = JSON.parse(data)
      resolve(geoJSONData['features'])
    }
    reader.onerror = error => {
      reject(error)
    }
  })
  promise.then(item => {
    return item
  })
  return promise
}
