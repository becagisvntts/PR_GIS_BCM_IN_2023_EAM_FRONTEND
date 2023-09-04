interface Props {
  total?: number
}

export default class DataListMeta {
  total: number

  constructor(props: Props) {
    this.total = props.total ?? 0
  }
}
