import StateHelper from '../StateHelper'
import DataList from '../models/DataList'
import ClassGetter from './ClassGetter'

export default class CardGetter {
  static classTypeByKey = '_type'
  static idByKey = '_id'
  static descriptionByKey = 'Description'
  static codeByKey = 'Code'

  static getID(card: any) {
    if (card['_id'] != undefined) return card['_id']
    if (card['Id'] != undefined) return card['Id'] as number
    return 0
  }

  static getClassType(card: any) {
    if (card['_type'] != undefined) return card['_type']
    if (card['IdClass'] != undefined) {
      let idClass = card['IdClass']
      if (idClass.startsWith('public.')) {
        let arr = idClass.split('.')
        return arr.last.replaceAll('"', '')
      }
      return idClass
    }
    return ''
  }

  static getDescription(card: any) {
    return card[CardGetter.descriptionByKey]
  }

  static getCode(card: any) {
    return card[CardGetter.codeByKey]
  }

  ///Use only at detail card screen
  static getAttributes(card: any) {
    return card['_model']['attributes']
  }

  static getClassTypeName(classes: DataList, card: any) {
    const cardClassType = CardGetter.getClassType(card)
    for (let cls in classes.data) {
      if (ClassGetter.getID(cls) == cardClassType) {
        return ClassGetter.getDescription(cls)
      }
    }
    return cardClassType
  }
}
