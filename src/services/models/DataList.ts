import DataListMeta from './DataListMeta'

interface Props {
  data?: any[]
  meta?: DataListMeta
}
export default class DataList {
  data: any[]
  meta: DataListMeta

  constructor(props: Props) {
    this.data = props.data ?? []
    this.meta = props.meta ?? new DataListMeta({})
  }
}
