export default class DomainGetter {
  static directionDirect = 'direct'
  static directionInverse = 'inverse'

  static getID(domainConfig: any) {
    return domainConfig['_id']
  }

  static getName(domainConfig: any) {
    return domainConfig['name']
  }

  static getSource(domainConfig: any) {
    return domainConfig['source']
  }

  static getDestination(domainConfig: any) {
    return domainConfig['destination']
  }

  static getDescription(domainConfig: any) {
    return domainConfig['description']
  }

  static isDirect(domainConfig: any) {
    return domainConfig['sourceInline']
  }

  static isInverse(domainConfig: any) {
    return domainConfig['destinationInline']
  }

  static getRelatedDescription(domainConfig: any) {
    return DomainGetter.isDirect(domainConfig) ? domainConfig['descriptionDirect'] : domainConfig['descriptionInverse']
  }

  static getRelatedTargetClass(domainConfig: any) {
    return DomainGetter.isDirect(domainConfig) ? domainConfig['destination'] : domainConfig['source']
  }

  static getCollapseState(domainConfig: any) {
    return DomainGetter.isDirect(domainConfig)
      ? domainConfig['sourceDefaultClosed']
      : domainConfig['destinationDefaultClosed']
  }

  static getDirectionAsNumber(domainConfig: any) {
    return DomainGetter.isDirect(domainConfig) ? '_2' : '_1'
  }

  static getDirectionAsString(domainConfig: any) {
    return DomainGetter.isDirect(domainConfig) ? DomainGetter.directionDirect : DomainGetter.directionInverse
  }

  static haveMultipleDestinationTypes(domainConfig: any) {
    ///Is direction direct
    return (
      DomainGetter.isDirect(domainConfig) &&
      ///Have multiples destinations
      domainConfig['destinations'].length > 1
    )
  }
}
