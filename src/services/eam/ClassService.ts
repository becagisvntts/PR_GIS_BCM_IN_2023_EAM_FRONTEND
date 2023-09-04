import { apiUrl } from 'src/services/common/CommonService'
import HttpService from 'src/services/common/HttpService'
import DataList from 'src/services/models/DataList'
import StateHelper from 'src/services/StateHelper'
import RequestPayload, { copyPayload, payloadToPath } from '../models/RequestPayload'
import { updateActiveClass, updateClassCards, updateRequestPayload } from 'src/store/ClassSlice'
import CardGetter from './CardGetter'
import ClassGetter from './ClassGetter'
import DomainGetter from './DomainGetter'
import store from 'src/store'

class ClassService {
  static classApi = `${apiUrl}classes/`

  static fetchClasses = async () => {
    const response = await HttpService.getWithAuth({ endpoint: `${ClassService.classApi}?detailed=true` })

    if (response.ok) {
      const res = await response.json()
      return new DataList(res)
    }

    return new DataList({})
  }

  static fetchClassAttributes = async (className: string) => {
    const api = `${ClassService.classApi}${className}/attributes`
    const response = await HttpService.getWithAuth({ endpoint: api })

    if (response.ok) {
      const res = await response.json()
      return new DataList(res)
    }

    return new DataList({})
  }

  static fetchClassDomains = async (className: string) => {
    let classDomains = store.getState().class.classDomains
    const activeClass = store.getState().class.activeClass

    if (className != ClassGetter.getType(activeClass) || classDomains.data.length == 0) {
      const api = `${ClassService.classApi}${className}/domains?detailed=true`
      const response = await HttpService.getWithAuth({ endpoint: api })
      if (response.ok) {
        const res = await response.json()
        classDomains = new DataList(res)
        ///Filter displayed domains
        const displayedDomains: any[] = classDomains.data.map((domainConfig: any) => {
          if (ClassService.isShowDomainOnClassDetail(domainConfig, className)) {
            return domainConfig
          }
        })

        classDomains = new DataList({ data: displayedDomains, meta: { total: displayedDomains.length } })
        return classDomains
      }
      return new DataList({})
    }
    return classDomains
  }

  static fetchAttributesOfDomains = async (domainsConfig: DataList) => {
    let domainsAttributes = store.getState().class.domainsAttributes
    if (domainsAttributes.length == 0) {
      const requestList: any[] = []
      domainsConfig.data.map(domainConfig => {
        requestList.push(ClassService.fetchClassAttributes(DomainGetter.getRelatedTargetClass(domainConfig)))
      })

      domainsAttributes = await Promise.all(requestList)
    }
    return domainsAttributes
  }

  static fetchClassCardsByPage = async (page: number) => {
    const requestPayload = copyPayload(store.getState().class.requestPayload, { page: page })
    store.dispatch(updateRequestPayload(requestPayload))

    const classCards = await ClassService.fetchClassCards()
    store.dispatch(updateClassCards(classCards))
    return classCards
  }

  static fetchClassCards = async (classType?: string, requestPayload?: RequestPayload) => {
    classType = classType ?? ClassGetter.getType(store.getState().class.activeClass)
    requestPayload = store.getState().class.requestPayload

    const api = `${ClassService.classApi}${classType}/cards?${payloadToPath(requestPayload)}`
    const response = await HttpService.getWithAuth({ endpoint: api })
    if (response.ok) {
      const res = await response.json()
      return new DataList(res)
    }
    return new DataList({})
  }

  static fetchDomainCards = async (domainConfig: any, card: any, requestPayload: RequestPayload) => {
    const api = `${ClassService.classApi}${DomainGetter.getRelatedTargetClass(domainConfig)}/cards?${payloadToPath(
      requestPayload
    )}`
    const response = await HttpService.getWithAuth({ endpoint: api })
    if (response.ok) {
      const res = await response.json()
      return new DataList(res)
    }
    return new DataList({})
  }

  static fetchRelationCards = async (domainConfig: any, card: any, requestPayload?: RequestPayload) => {
    const additionalFilter = {
      relation: [
        {
          domain: DomainGetter.getName(domainConfig),
          source: DomainGetter.getSource(domainConfig),
          destination: DomainGetter.getDestination(domainConfig),
          direction: DomainGetter.getDirectionAsNumber(domainConfig),
          type: 'oneof',
          cards: [
            {
              className: CardGetter.getClassType(card),
              id: '${CardGetter.getID(card)}'
            }
          ]
        }
      ]
    }

    let payloadStr = 'include_tasklist=true'

    if (requestPayload != null) {
      payloadStr += `&${payloadToPath(requestPayload, additionalFilter)}`
    } else {
      payloadStr += `&filter=${JSON.stringify(additionalFilter)}`
    }

    const api = `${ClassService.classApi}${DomainGetter.getRelatedTargetClass(domainConfig)}/cards?${payloadStr}`
    const response = await HttpService.getWithAuth({ endpoint: api })

    if (response.ok) {
      const res = await response.json()
      return new DataList(res)
    }
    return new DataList({})
  }

  static getClassCardDetail = async (classType: string, cardId: string) => {
    const api = `${ClassService.classApi}${classType}/cards/${cardId}?includeModel=true&includeWidgets=true&includeStats=true`

    const response = await HttpService.getWithAuth({ endpoint: api })
    if (response.ok) {
      const res = await response.json()
      return res.data
    }
    return {}
  }

  ///LOGIC
  static findActiveClassConfig = (classes: DataList, classType: string) => {
    for (let i = 0; i < classes.data.length; i++) {
      if (ClassGetter.getType(classes.data[i]) == classType) {
        return classes.data[i]
      }
    }
    return {}
  }
  static getClassConfigOfCard = (card?: any) => {
    const activeClass = store.getState().class.activeClass
    if (card) {
      if (CardGetter.getClassType(card) != ClassGetter.getType(activeClass)) {
        const classes = store.getState().class.classes
        for (let classConfig in classes.data) {
          if (ClassGetter.getType(classConfig) == CardGetter.getClassType(card)) {
            return classConfig
          }
        }
      }
    }
    return activeClass
  }
  static isShowDomainOnClassDetail(domainConfig: any, className: string) {
    return (
      (domainConfig['sourceInline'] &&
        ['1:N', '1:1', 'N:N'].includes(domainConfig['cardinality']) &&
        domainConfig['sources'].contains(className)) ||
      (domainConfig['destinationInline'] &&
        ['N:1', '1:1', 'N:N'].includes(domainConfig['cardinality']) &&
        domainConfig['destinations'].contains(className))
    )
  }
}

export default ClassService
