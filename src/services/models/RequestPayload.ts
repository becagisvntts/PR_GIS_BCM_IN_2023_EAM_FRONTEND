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
export default class RequestPayload {
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
}

const copyPayload = (oldPayload: RequestPayload, props: Props): RequestPayload => {
  return new RequestPayload({
    page: props.page ?? oldPayload.page,
    limit: props.limit ?? oldPayload.limit,
    queryKeyword: props.queryKeyword ?? oldPayload.queryKeyword,
    propertySorting: props.propertySorting ?? oldPayload.propertySorting,
    directionSorting: props.directionSorting ?? oldPayload.directionSorting,
    attrs: props.attrs ?? oldPayload.attrs,
    forDomainName: props.forDomainName ?? oldPayload.forDomainName,
    forDomainDirection: props.forDomainDirection ?? oldPayload.forDomainDirection,
    forDomainOriginId: props.forDomainOriginId ?? oldPayload.forDomainOriginId
  })
}

const payloadToPath = (payload: RequestPayload, additionalFilter?: any) => {
  let filter: any = { query: payload.queryKeyword }
  filter = { ...filter, ...additionalFilter }

  const sort: any[] = [{ property: payload.propertySorting, direction: payload.directionSorting }]

  let payloadToPath: string = `page=${payload.page}&start=${payload.start}&limit=${
    payload.limit
  }&filter=${JSON.stringify(filter)}&sort=${JSON.stringify(sort)}`

  if (payload.attrs.length > 0) {
    //payload.attrs != undefined &&
    payloadToPath += `&attrs=${payload.attrs.join(',')}`
  }

  if (payload.forDomainName != '') {
    payloadToPath += `&forDomain_name=${payload.forDomainName}`
  }

  if (payload.forDomainDirection != '') {
    payloadToPath += `&forDomain_direction=${payload.forDomainDirection}`
  }

  if (payload.forDomainOriginId > 0) {
    payloadToPath += `&forDomain_originId=${payload.forDomainOriginId}`
  }

  return encodeURIComponent(payloadToPath)
}

export { payloadToPath, copyPayload }
