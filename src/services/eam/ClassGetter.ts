export default class ClassGetter {
  static typeByKey = 'name'
  static idByKey = '_id'
  static attributeGroupsByKey = 'attributeGroups'
  static descriptionByKey = 'description'

  static getID(classConfig: any) {
    return classConfig[ClassGetter.idByKey]
  }

  static getName(classConfig: any) {
    return classConfig['name']
  }

  static getType(classConfig: any) {
    return classConfig[ClassGetter.typeByKey]
  }

  static getAttributeGroups(classConfig: any) {
    return classConfig[ClassGetter.attributeGroupsByKey]
  }

  static getDescription(classConfig: any) {
    return classConfig[ClassGetter.descriptionByKey]
  }
}
