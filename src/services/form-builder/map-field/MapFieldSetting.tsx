import { Control } from 'react-hook-form'
import { SelectFieldGenerator } from '../FieldGenerator'
import FieldSetting from '../FieldSetting'
import MapFieldConfig from './MapFieldConfig'
import LocalizationService from 'src/services/common/LocalizationService'

export default class MapFieldSetting extends FieldSetting {
  mapType: string
  value: any

  constructor(
    type: string,
    label: string,
    name: string,
    required = false,
    customName = '',
    mapType = MapFieldConfig.MapTypePoint,
    value = null
  ) {
    super(type, label, name, required, customName)
    this.mapType = mapType
    this.value = value
  }

  toJson() {
    const json = super.toJson()

    return {
      ...json,
      mapType: this.mapType,
      value: this.value
    }
  }

  override copyWith(json: any) {
    return new MapFieldSetting(
      json.type ?? this.type,
      json.label ?? this.label,
      json.name ?? this.name,
      json.required ?? this.required,
      json.customName ?? this.customName,
      json.mapType ?? this.mapType,
      json.value ?? this.value
    )
  }

  override syncRecordData(recordData: any) {
    if (recordData['geoJSONValue'] !== undefined) {
      this.value = recordData['geoJSONValue']
    } else if (recordData[this.name] !== undefined) {
      this.value = recordData[this.name]
    } else {
      this.value = null
    }
  }

  mapTypeAttributeSettingUI({ control, errors }: { control: Control; errors: any }) {
    return (
      <SelectFieldGenerator
        name='mapType'
        label={LocalizationService.translate('map_geometry_type')}
        value={this.mapType}
        options={MapFieldConfig.MapType}
        control={control}
        errors={errors}
      />
    )
  }

  override getListAttributeSettingUI({
    control,
    setValue,
    errors
  }: {
    control: Control
    setValue: Function
    errors: any
  }) {
    const attributeSettings = super.getListAttributeSettingUI({ control, setValue, errors })

    return [...attributeSettings, this.mapTypeAttributeSettingUI({ control, errors })]
  }
}
