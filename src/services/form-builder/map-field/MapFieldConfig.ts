import LocalizationService from 'src/services/common/LocalizationService'

export default class MapFieldConfig {
  static MapTypePoint = 'Point'
  static MapTypeLineString = 'LineString'
  static MapTypePolygon = 'Polygon'

  static MapType = [
    { name: MapFieldConfig.MapTypePoint, label: LocalizationService.translate('map_point') },
    { name: MapFieldConfig.MapTypeLineString, label: LocalizationService.translate('map_line') },
    { name: MapFieldConfig.MapTypePolygon, label: LocalizationService.translate('map_polygon') }
  ]
}
