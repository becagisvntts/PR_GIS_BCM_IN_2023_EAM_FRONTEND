import { Box, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import CardGetter from 'src/services/eam/CardGetter'
import ClassGetter from 'src/services/eam/ClassGetter'
import ClassService from 'src/services/eam/ClassService'
import AppPayload from 'src/services/models/AppPayload'
import DataList from 'src/services/models/DataList'
import RequestPayload from 'src/services/models/RequestPayload'
import { useAppDispatch, useAppSelector } from 'src/store'
import { fetchClasses, updateActiveClass, updateClasses } from 'src/store/ClassSlice'
import Loading from 'src/views/components/common/Loading'
import CardGrid from 'src/views/components/eam/CardGrid'

interface Props {
  type: string
  cardId?: number
  action?: string
}

const ClassPage = (props: Props) => {
  const dispatch = useAppDispatch()
  const classes: DataList = useAppSelector(state => state.class.classes)
  const requestPayload: RequestPayload = useAppSelector(state => state.class.requestPayload)
  const [classConfig, setClassConfig] = useState({})
  const [cards, setCards] = useState<DataList>(new DataList({}))
  const [loadingCards, setLoadingCards] = useState(true)

  useEffect(() => {
    fetchClassCards()
  }, [])

  useEffect(() => {}, [classConfig])

  const fetchClassCards = async () => {
    setLoadingCards(true)
    ///Fetch classes config if not yet
    let _classes = classes
    if (classes.data.length == 0) {
      _classes = await ClassService.fetchClasses()
      dispatch(updateClasses(_classes))
    }

    ///Get classConfig
    const _classConfig: any = ClassService.findActiveClassConfig(_classes, props.type)
    dispatch(updateActiveClass(_classConfig))
    setClassConfig(_classConfig)

    ///Fetch class cards
    const _cards = await ClassService.fetchClassCards(ClassGetter.getType(_classConfig), requestPayload)
    setCards(_cards)
    setLoadingCards(false)
  }

  return loadingCards ? <Loading /> : <CardGrid cards={cards} classConfig={classConfig} attributes={new DataList({})} />
}

export default ClassPage

export async function getServerSideProps(context: any) {
  const { type } = context.query

  return {
    props: {
      type: type
    }
  }
}
