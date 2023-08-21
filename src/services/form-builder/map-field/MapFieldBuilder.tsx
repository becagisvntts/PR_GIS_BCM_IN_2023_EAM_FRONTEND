import { Control } from 'react-hook-form'
import FieldBuilder from '../FieldBuilder'
import FieldSetting from '../FieldSetting'
import MapFieldSetting from './MapFieldSetting'
import MapPointEditor from './MapPointEditor'
import MapFieldConfig from './MapFieldConfig'
import { Box, Button, Typography } from '@mui/material'
import MapPolygonEditor from './MapPolygonEditor'
import LocalizationService from 'src/services/common/LocalizationService'
import MapService from 'src/services/map/MapService'
const gjv = require('geojson-validation')

export default class MapFieldBuilder extends FieldBuilder {
  constructor() {
    super()
    this.builderLabel = 'form_map'
    this.builderLabelEng = 'MapField'
    this.builderType = 'map'
    this.builderIcon = 'material-symbols:text-fields-rounded'
    this.fieldSetting = new MapFieldSetting(this.builderType, this.builderLabel, this.generateUniqueName())
  }

  UIOnForm({ control, setValue, errors }: { control: Control; setValue: any; errors: any }) {
    const mapFieldSetting = this.fieldSetting as MapFieldSetting

    return (
      <Box>
        {mapFieldSetting.mapType == MapFieldConfig.MapTypePoint ? (
          <MapPointEditor
            mapType={mapFieldSetting.mapType}
            geoJSONValue={mapFieldSetting.value}
            label={mapFieldSetting.label}
            control={control}
            errors={errors}
            setValue={setValue}
          />
        ) : (
          <MapPolygonEditor
            mapType={mapFieldSetting.mapType}
            geoJSONValue={mapFieldSetting.value}
            label={mapFieldSetting.label}
            control={control}
            setValue={setValue}
            errors={errors}
          />
        )}
      </Box>
    )
  }
  UIOnFormWithValue({ control, setValue, errors }: { control: Control; setValue: any; errors: any }) {
    const mapFieldSetting = this.fieldSetting as MapFieldSetting

    return (
      <Box>
        {mapFieldSetting.mapType == MapFieldConfig.MapTypePoint ? (
          <MapPointEditor
            mapType={mapFieldSetting.mapType}
            geoJSONValue={mapFieldSetting.value}
            label={mapFieldSetting.label}
            control={control}
            errors={errors}
            setValue={setValue}
          />
        ) : (
          <MapPolygonEditor
            mapType={mapFieldSetting.mapType}
            geoJSONValue={mapFieldSetting.value}
            label={mapFieldSetting.label}
            control={control}
            setValue={setValue}
            errors={errors}
          />
        )}
      </Box>
    )
  }

  override copyWith(fieldSetting: FieldSetting): MapFieldBuilder {
    const mapFieldBuilder = new MapFieldBuilder()
    mapFieldBuilder.syncFieldSetting(fieldSetting)

    return mapFieldBuilder
  }

  override UIOnList() {
    return <Button onClick={() => {}}>Xem bản đồ</Button>
  }

  override getFormattedData() {
    const mapFieldSetting = this.fieldSetting as MapFieldSetting

    return mapFieldSetting.value
      ? JSON.stringify(mapFieldSetting.value)
      : LocalizationService.translate('map_geometry_empty')
  }

  override getSampleData() {
    const mapFieldSetting = this.fieldSetting as MapFieldSetting
    return {
      data: JSON.stringify(MapService.getSampleFeature(mapFieldSetting.mapType)),
      type: 's',
      help: 'Nhập vào GeoJson',
      width: 20,
      wrapText: true
    }
  }

  override validateData(input: any): any {
    const validate = super.validateData(input)
    if (validate !== true) {
      return validate
    }
    if (!input) return true
    const geoJson = JSON.parse(input)
    let validateFeature = gjv.isFeature(geoJson, true)
    if (validateFeature) {
      return true
    }

    return gjv.isFeatureCollection(geoJson, true)
  }

  override formatDataFromExcel(input: any) {
    let outputData: any = {}
    outputData['geoJSONValue'] = input ? JSON.parse(input) : null
    return outputData
  }
}
