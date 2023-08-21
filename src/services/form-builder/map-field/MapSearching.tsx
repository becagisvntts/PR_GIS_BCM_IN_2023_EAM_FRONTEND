import * as React from 'react'
import MapService from 'src/services/map/MapService'
import { Autocomplete, Box, Grid, TextField, Typography, debounce } from '@mui/material'
import IconifyIcon from 'src/@core/components/icon'
import maplibregl from 'maplibre-gl'
import { useTranslation } from 'react-i18next'
import LocalizationService from 'src/services/common/LocalizationService'

interface PlaceType {
  title: string
  address: string
  position: { lat: string | number; lng: string | number }
}
export default function MapSearching({ mapContainer }: { mapContainer: any }) {
  const [value, setValue] = React.useState<PlaceType | null>(null)
  const [inputValue, setInputValue] = React.useState('')
  const [options, setOptions] = React.useState<readonly PlaceType[]>([])
  const [marker, setMarker] = React.useState<maplibregl.Marker>()

  const fetchFromAPI = React.useMemo(
    () =>
      debounce((input: string, center: any, callback: (results: PlaceType[]) => void) => {
        MapService.fetchAddressFromAPI({ keyword: input, center: center, callback: callback })
      }, 400),
    []
  )

  React.useEffect(() => {
    let active = true

    if (inputValue === '') {
      setOptions(value ? [value] : [])
      return undefined
    }

    fetchFromAPI(inputValue, mapContainer.getCenter(), results => {
      if (active) {
        let newOptions: readonly PlaceType[] = []

        if (value) {
          newOptions = [value]
        }

        if (results) {
          newOptions = [...newOptions, ...results]
        }

        setOptions(newOptions)
      }
    })

    return () => {
      active = false
    }
  }, [value, inputValue, fetchFromAPI])

  const initMarkerSearching = (value: any) => {
    const lngLat: any = [value.position.lng, value.position.lat]
    if (value) {
      if (!marker) {
        const el = document.createElement('div')
        el.className = 'searching-layer-pin'
        const mk = new maplibregl.Marker(el)
          .setLngLat(lngLat)
          .setOffset([0, -16])
          // .setPopup(new maplibregl.Popup({ offset: 5 }).setHTML(`<p style='margin: 0 !important'>${value.address}</p>`))
          .addTo(mapContainer)
        setMarker(mk)
      } else {
        marker?.setLngLat(lngLat)
      }

      MapService.flyTo(mapContainer, lngLat, 0.5)
    }
  }

  return (
    <Autocomplete
      id='map-searching'
      size='small'
      sx={{ width: '100%' }}
      getOptionLabel={option => (typeof option === 'string' ? option : option.address)}
      filterOptions={x => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={value}
      noOptionsText={`${LocalizationService.translate('msg_empty_search_result')}`}
      onChange={(event: any, newValue: PlaceType | null) => {
        initMarkerSearching(newValue)
        setOptions(newValue ? [newValue, ...options] : options)
        setValue(newValue)
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue)
      }}
      renderInput={params => (
        <TextField {...params} label={`${LocalizationService.translate('map_search')}`} fullWidth />
      )}
      renderOption={(props, option) => {
        return (
          <li {...props}>
            <Grid container alignItems='center'>
              <Grid item sx={{ display: 'flex', width: 44 }}>
                <IconifyIcon icon='ion:location-outline' />
              </Grid>
              <Grid item sx={{ width: 'calc(100% - 44px)', wordWrap: 'break-word' }}>
                <Typography>{option.title}</Typography>
                <Typography variant='body2' color='text.secondary'>
                  {option.address}
                </Typography>
              </Grid>
            </Grid>
          </li>
        )
      }}
    />
  )
}
