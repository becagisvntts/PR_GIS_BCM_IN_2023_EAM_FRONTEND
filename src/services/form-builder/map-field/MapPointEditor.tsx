import { useEffect, useState } from 'react'
import { Box, Button, FormControl, FormHelperText, Grid, TextField, Typography } from '@mui/material'
import { Control, Controller, useForm } from 'react-hook-form'
import MapService from 'src/services/map/MapService'
import { currentMillisecond } from 'src/services/common/convertDate'
import MapSearching from './MapSearching'
import IconifyIcon from 'src/@core/components/icon'
import { useTranslation } from 'react-i18next'
import LocalizationService from 'src/services/common/LocalizationService'

export default function MapPointEditor({
  mapType,
  geoJSONValue,
  mask,
  label,
  control,
  setValue,
  errors
}: {
  mapType: string
  geoJSONValue: any
  mask?: any
  label: string
  control: Control
  setValue: any
  errors: any
}) {
  const mapID = `${currentMillisecond()}_mapContainer`
  let markerPosition = [MapService.defaultLng, MapService.defaultLat]
  const [mapContainer, setMapContainer] = useState<maplibregl.Map>()
  const [mapCenter, setMapCenter] = useState<any>()
  const [marker, setMarker] = useState<maplibregl.Marker>()
  useEffect(() => {
    initMap()
  }, [])

  useEffect(() => {
    if (mapContainer) {
      initMapCenter()
      initMask()
    }
  }, [mapContainer])

  useEffect(() => {
    if (mapCenter) {
      initMarkerDraggable()
      updateFormFields(mapCenter)
    }
  }, [mapCenter])

  const initMap = async () => {
    let maplibre = MapService.createMap(mapID)
    setMapContainer(maplibre)
  }

  const initMapCenter = async () => {
    await setMapInitialPosition()
  }

  const setMapInitialPosition = async () => {
    const validGeoJSON = MapService.hasGeometry(geoJSONValue, mapType)
    let center
    if (!validGeoJSON) {
      center = await MapService.getGeolocationOrDefault()
    } else {
      if (MapService.matchGeometry(geoJSONValue, mapType)) {
        center = geoJSONValue['geometry']['coordinates']
      } else {
        const geoJSONCenter = MapService.getGeoJSONCenter(geoJSONValue)
        center = geoJSONCenter['geometry']['coordinates']
      }
    }

    MapService.flyTo(mapContainer, center, 1)
    setMapCenter(center)
  }

  const initMarkerDraggable = () => {
    const latLng = { lat: mapCenter[1], lng: mapCenter[0] }
    const mk = MapService.createMarkerDraggable(latLng)
      .addTo(mapContainer!)
      .on('dragend', (event: any) => {
        const ll = event.target.getLngLat()
        updateFormFields([ll.lng, ll.lat])
      })
    setMarker(mk)
  }

  const updateFormFields = (lngLat: number[]) => {
    markerPosition = lngLat
    setValue('lat', lngLat[1])
    setValue('lng', lngLat[0])

    updateGeoJSONValue()
  }

  const updateMarkerOnMap = (lngLat: any) => {
    try {
      markerPosition = lngLat
      marker?.setLngLat(lngLat)
      MapService.flyTo(mapContainer, lngLat, 0.5)

      updateGeoJSONValue()
    } catch (ex) {
      console.log(ex)
    }
  }

  const updateGeoJSONValue = () => {
    const geoJson = {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: markerPosition
      }
    }
    setValue('geoJSONValue', geoJson)
  }

  const initMask = () => {
    if (mask) {
      MapService.addMaskLayer(mapContainer, mask)
    }
  }

  const moveMarkerToMapCenter = () => {
    const center = mapContainer!.getCenter()
    const lngLat = [center.lng, center.lat]
    updateMarkerOnMap(lngLat)
    updateFormFields(lngLat)
  }

  return (
    <Box>
      <Typography sx={{ mb: 2 }}>{label}:</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {mapContainer ? <MapSearching mapContainer={mapContainer} /> : <Box></Box>}
        <Button
          variant='contained'
          sx={{ width: 'fit-content', whiteSpace: 'nowrap', ml: 2 }}
          endIcon={<IconifyIcon icon='carbon:location-filled' />}
          onClick={moveMarkerToMapCenter}
        >
          {LocalizationService.translate('map_center')}
        </Button>
      </Box>
      <Box
        id={mapID}
        sx={{ width: '100%', height: '300px', cursor: 'pointer', marginTop: '12px', borderRadius: '8px' }}
      />
      <Grid container sx={{ marginTop: '12px' }}>
        <Grid item xs={6} sx={{ paddingRight: '4px' }}>
          <FormControl fullWidth>
            <Controller
              name={'lat'}
              control={control}
              render={({ field: { ref, ...field } }) => (
                <TextField
                  {...field}
                  size='small'
                  defaultValue={markerPosition[1]}
                  inputRef={ref}
                  label={`${LocalizationService.translate('map_lat')}`}
                  error={Boolean(errors['lat'])}
                  type='number'
                  onBlur={e => {
                    updateMarkerOnMap([markerPosition[0], parseFloat(e.target.value)])
                  }}
                />
              )}
            />
            {errors['lat'] && <FormHelperText sx={{ color: 'error.main' }}>{errors['lat'].message}</FormHelperText>}
          </FormControl>
        </Grid>
        <Grid item xs={6} sx={{ paddingLeft: '4px' }}>
          <FormControl fullWidth>
            <Controller
              name={'lng'}
              control={control}
              render={({ field: { ref, ...field } }) => (
                <TextField
                  {...field}
                  size='small'
                  defaultValue={markerPosition[0]}
                  inputRef={ref}
                  label={`${LocalizationService.translate('map_lng')}`}
                  error={Boolean(errors['lng'])}
                  type='number'
                  onBlur={e => {
                    updateMarkerOnMap([parseFloat(e.target.value), markerPosition[1]])
                  }}
                />
              )}
            />
            {errors['lng'] && <FormHelperText sx={{ color: 'error.main' }}>{errors['lng'].message}</FormHelperText>}
          </FormControl>
        </Grid>
        <FormControl>
          <Controller
            name='geoJSONValue'
            control={control}
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
