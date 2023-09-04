import ClassConfig from '../config/ClassConfig'

interface Props {
  page?: number
  limit?: number
  queryKeyword?: string
  propertySorting?: string
  directionSorting?: string
  attrs?: string[]
  forDomainName?: string
  forDomainDirection?: string
  forDomainOriginId?: number
}
export default class AppPayload {
  page: number
  start: number
  limit: number
  queryKeyword: string
  propertySorting: string
  directionSorting: string
  attrs: string[]
  forDomainName: string
  forDomainDirection: string
  forDomainOriginId: number

  constructor(props: Props) {
    this.page = props.page ?? 1
    this.limit = props.limit ?? 500
    this.start = (this.page - 1) * this.limit
    this.queryKeyword = props.queryKeyword ?? ''
    this.propertySorting = props.propertySorting ?? ''
    this.directionSorting = props.directionSorting ?? ''
    this.attrs = props.attrs ?? []
    this.forDomainName = props.forDomainName ?? ''
    this.forDomainDirection = props.forDomainDirection ?? ''
    this.forDomainOriginId = props.forDomainOriginId ?? -1
  }

  toPath({ additionalFilter }: { additionalFilter?: any }) {
    let filter: any = { query: this.queryKeyword }
    filter = { ...filter, ...additionalFilter }

    const sort: any[] = [{ property: this.propertySorting, direction: this.directionSorting }]

    let payloadToPath: string = `page=${this.page}&start=${this.start}&limit=${this.limit}&filter=${JSON.stringify(
      filter
    )}&sort=${JSON.stringify(sort)}`

    if (this.attrs.length > 0) {
      payloadToPath += `&attrs=${this.attrs.join(',')}`
    }

    if (this.forDomainName != '') {
      payloadToPath += `&forDomain_name=${this.forDomainName}`
    }

    if (this.forDomainDirection != '') {
      payloadToPath += `&forDomain_direction=${this.forDomainDirection}`
    }

    if (this.forDomainOriginId > 0) {
      payloadToPath += `&forDomain_originId=${this.forDomainOriginId}`
    }

    return payloadToPath
  }

  test() {
    return this.queryKeyword
  }
}
