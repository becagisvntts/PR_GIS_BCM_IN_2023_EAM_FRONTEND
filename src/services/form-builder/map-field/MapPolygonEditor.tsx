import { useEffect, useState } from 'react'
import { Box, FormControl, FormHelperText, Grid, TextField, Typography } from '@mui/material'
import { Control, Controller } from 'react-hook-form'
import MapService from 'src/services/map/MapService'
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'
import MapboxDraw from '@mapbox/mapbox-gl-draw'
import MapFieldConfig from './MapFieldConfig'
import MapSearching from './MapSearching'
import { useTranslation } from 'react-i18next'
import LocalizationService from 'src/services/common/LocalizationService'
import { currentMillisecond } from 'src/services/common/convertDate'

export default function MapPolygonEditor({
  mapType,
  geoJSONValue,
  required = false,
  mask,
  label,
  control,
  setValue,
  errors
}: {
  mapType: string
  geoJSONValue: any
  required?: boolean
  mask?: any
  label: string
  control: Control
  setValue: any
  errors: any
}) {
  const mapID = `${currentMillisecond()}_mapContainer`
  const markerPosition = [MapService.defaultLng, MapService.defaultLat]
  const [mapContainer, setMapContainer] = useState<maplibregl.Map>()
  const [mapCenter, setMapCenter] = useState<any>()
  useEffect(() => {
    initMap()
  }, [])

  useEffect(() => {
    if (mapContainer) {
      setMapInitialPosition()
      initDrawTool(mapContainer)
      initMask()
    }
  }, [mapContainer])

  const initMap = async () => {
    const maplibre = MapService.createMap(mapID)
    setMapContainer(maplibre)
  }

  const setMapInitialPosition = async () => {
    const validGeoJSON = MapService.hasGeometry(geoJSONValue, mapType)
    if (!validGeoJSON) {
      const center = await MapService.getGeolocationOrDefault()
      MapService.flyTo(mapContainer, center, 1)
    } else {
      setValue('geoJSONValue', geoJSONValue)
      MapService.fitBounds(mapContainer, [geoJSONValue])
    }
  }

  const initDrawTool = (maplibre: any) => {
    const drawTool = new MapboxDraw({
      displayControlsDefault: false,
      defaultMode: mapType == MapFieldConfig.MapTypePolygon ? 'draw_polygon' : 'draw_line_string',
      controls: {
        polygon: mapType == MapFieldConfig.MapTypePolygon,
        line_string: mapType == MapFieldConfig.MapTypeLineString,
        trash: true
      }
    })
    maplibre.addControl(drawTool)

    if (MapService.matchGeometry(geoJSONValue, mapType)) {
      const featureId = drawTool.add(geoJSONValue)
      drawTool.changeMode('direct_select' as any, { featureId: featureId })
    }

    const updateArea = (event: any) => {
      const data = drawTool.getAll()
      if (data.features.length > 0) {
        setValue('geoJSONValue', data['features'][0])
      } else {
        setValue('geoJSONValue', '')
      }
    }

    maplibre.on('draw.create', updateArea)
    maplibre.on('draw.delete', updateArea)
    maplibre.on('draw.update', updateArea)

    maplibre.on('draw.modechange', (event: any) => {
      const data = drawTool.getAll()
      const ids: any[] = []
      if (data.features.length > 0) {
        const lid = data.features[data.features.length - 1].id

        data.features.forEach(f => {
          if (f.id !== lid) {
            ids.push(f.id)
          }
        })
        drawTool.delete(ids)
      }
    })
  }

  const initMask = () => {
    if (mask) {
      MapService.addMaskLayer(mapContainer, mask)
    }
  }

  return (
    <Box>
      <Typography sx={{ mb: 2 }}>{label}:</Typography>
      {mapContainer && <MapSearching mapContainer={mapContainer} />}
      <Box
        id={mapID}
        sx={{ width: '100%', height: '300px', cursor: 'pointer', marginTop: '12px', borderRadius: '8px' }}
      />
      <Grid container sx={{ marginTop: '12px' }}>
        <FormControl>
          <Controller
            name='geoJSONValue'
            control={control}
            rules={{
              required: {
                value: required,
                message: LocalizationService.translate('msg_field_required', { field: label })
              }
            }}
            render={({ field: { ref, ...field } }) => (
              <TextField
                {...field}
                inputRef={ref}
                error={Boolean(errors['geoJSONValue'])}
                type='hidden'
                sx={{ display: 'none' }}
              />
            )}
          />
          {errors['geoJSONValue'] && (
            <FormHelperText sx={{ color: 'error.main' }}>{errors['geoJSONValue'].message}</FormHelperText>
          )}
        </FormControl>
      </Grid>
    </Box>
  )
}
