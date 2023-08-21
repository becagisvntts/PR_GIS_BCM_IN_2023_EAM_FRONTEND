import maplibregl from 'maplibre-gl'
import * as turf from '@turf/turf'
import MapFieldConfig from '../form-builder/map-field/MapFieldConfig'

export default class MapService {
  static defaultLat = 10.762622
  static defaultLng = 106.660172
  static maptilerKey = '8s7N1s7p0hZn5qqdHS2m'
  static maptilerStyles = {
    Outdoor: 'https://api.maptiler.com/maps/outdoor-v2/style.json',
    Street: 'https://api.maptiler.com/maps/streets-v2/style.json',
    // OpenStreetMap: 'https://api.maptiler.com/maps/openstreetmap/style.json',
    SatelliteHybird: 'https://api.maptiler.com/maps/hybrid/style.json'
  }

  static hereKey = 'hPtC4kp3SDaqlFsNbcT_zPpyknvCfWEdcxejzcUk8zI'

  static getGeolocation(): Promise<GeolocationPosition> {
    return new Promise((resolve, reject) => navigator.geolocation.getCurrentPosition(resolve, reject))
  }

  static createMap(uiContainer: string) {
    const maplibre = new maplibregl.Map({
      container: uiContainer,
      style: '/map/tilejson.json',
      // style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${MapService.maptilerKey}`,
      center: [MapService.defaultLng, MapService.defaultLat],
      zoom: 18
    })

    maplibre.addControl(new maplibregl.NavigationControl({}), 'top-left')
    maplibre.addControl(
      new maplibregl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true
      })
    )

    return maplibre
  }

  static async getGeolocationOrDefault() {
    try {
      const geolocation = await MapService.getGeolocation()

      return [geolocation.coords.longitude, geolocation.coords.latitude]
    } catch (err) {
      return [MapService.defaultLng, MapService.defaultLat]
    }
  }

  static createMarkerDraggable(lngLat: any) {
    const marker = new maplibregl.Marker({
      draggable: true
    }).setLngLat(lngLat)

    return marker
  }

  static flyTo(mapContainer: any, center: any, duration: number) {
    mapContainer.flyTo({
      center: center,
      duration: duration
    })
  }

  static fitBounds(mapContainer: any, featureCollection: any) {
    if (featureCollection.length > 0) {
      const turlFeatures = turf.featureCollection(featureCollection)
      const bounds = turf.bbox(turlFeatures)
      mapContainer.fitBounds(bounds, { padding: 100, maxZoom: 20, duration: 0 })
    }
  }

  static getGeoJSONCenter(geoJSON: any) {
    return turf.center(geoJSON)
  }

  static addRecordLayer(
    mapContainer: any,
    sourceId: string,
    layerId: string,
    mapType: string,
    getPopupContent?: Function
  ) {
    MapService.addPolygonRecordLayer(
      mapContainer,
      sourceId,
      layerId,
      getPopupContent,
      mapType == MapFieldConfig.MapTypePolygon
    )
    MapService.addLineRecordLayer(
      mapContainer,
      sourceId,
      layerId,
      getPopupContent,
      mapType == MapFieldConfig.MapTypeLineString
    )
    MapService.addPointRecordLayer(
      mapContainer,
      sourceId,
      layerId,
      getPopupContent,
      mapType == MapFieldConfig.MapTypePoint
    )

    // if (mapType == MapFieldConfig.MapTypePolygon) {
    //   MapService.addPolygonRecordLayer(mapContainer, sourceId, layerId)
    // } else if (mapType == MapFieldConfig.MapTypeLineString) {
    //   MapService.addLineRecordLayer(mapContainer, sourceId, layerId)
    // } else {
    //   MapService.addPointRecordLayer(mapContainer, sourceId, layerId)
    // }
  }

  static addPointRecordLayer(
    mapContainer: any,
    sourceId: string,
    layerId: string,
    getPopupContent?: Function,
    matchWithMainType = true
  ) {
    const pointLayerId = `${layerId}_point`
    const color = matchWithMainType ? '#2196f3' : '#FF9F43'
    mapContainer.addLayer({
      id: pointLayerId,
      type: 'circle',
      source: sourceId,
      paint: {
        'circle-color': color,
        'circle-radius': 8,
        'circle-stroke-width': 3,
        'circle-stroke-color': color,
        'circle-stroke-opacity': 0.5
      },
      filter: ['==', '$type', 'Point']
    })

    MapService.showPopupOnClick(mapContainer, pointLayerId, getPopupContent)
  }

  static addLineRecordLayer(
    mapContainer: any,
    sourceId: string,
    layerId: string,
    getPopupContent?: Function,
    matchWithMainType = true
  ) {
    const lineLayerId = `${layerId}_line`
    const color = matchWithMainType ? '#2196f3' : '#FF9F43'
    mapContainer.addLayer({
      id: lineLayerId,
      type: 'line',
      source: sourceId,
      layout: {
        'line-join': 'round',
        'line-cap': 'round'
      },
      paint: {
        'line-color': color,
        'line-width': 8
      },
      filter: ['==', '$type', 'LineString']
    })

    MapService.showPopupOnClick(mapContainer, lineLayerId, getPopupContent)
  }

  static addPolygonRecordLayer(
    mapContainer: any,
    sourceId: string,
    layerId: string,
    getPopupContent?: Function,
    matchWithMainType = true
  ) {
    const polygonLayerId = `${layerId}_polygon`
    const color = matchWithMainType ? '#2196f3' : '#FF9F43'
    mapContainer.addLayer({
      id: polygonLayerId,
      type: 'fill',
      source: sourceId,
      paint: {
        'fill-color': color,
        'fill-opacity': 0.8
      },
      filter: ['==', '$type', 'Polygon']
    })

    MapService.showPopupOnClick(mapContainer, polygonLayerId, getPopupContent)
  }

  static showPopupOnClick(mapContainer: any, layerId: string, getPopupContent?: Function) {
    if (getPopupContent) {
      mapContainer.on('click', layerId, (e: any) => {
        const coordinates = e.lngLat
        const properties = e.features[0].properties

        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360
        }

        new maplibregl.Popup().setLngLat(coordinates).setHTML(getPopupContent(properties)).addTo(mapContainer)
      })

      // Change the cursor to a pointer when the mouse is over the places layer.
      mapContainer.on('mouseenter', layerId, function () {
        mapContainer.getCanvas().style.cursor = 'pointer'
      })

      // Change it back to a pointer when it leaves.
      mapContainer.on('mouseleave', layerId, function () {
        mapContainer.getCanvas().style.cursor = ''
      })
    }
  }

  static addMaskLayer(mapContainer: any, mask: any, layerId?: any, color?: any) {
    const masked = turf.mask(mask)
    mapContainer.addLayer({
      id: layerId ?? 'mask_layer',
      type: 'fill',
      source: {
        type: 'geojson',
        data: masked
      },
      layout: {},
      paint: {
        'fill-color': color ?? 'rgba(0, 0, 0, 0.2)'
      }
    })
  }

  static hasGeometry = (geoJSONValue: any, mapType: string) => {
    try {
      // return geoJSONValue['geometry']['type'] == mapType
      return geoJSONValue['geometry']['coordinates'].length > 0
    } catch (ex) {
      return false
    }
  }

  static matchGeometry = (geoJSONValue: any, mapType: string) => {
    try {
      return geoJSONValue['geometry']['type'] == mapType
    } catch (ex) {
      return false
    }
  }

  static fetchAddressFromAPI = async ({
    keyword,
    center,
    callback
  }: {
    keyword: string
    center?: { lat: any; lng: any }
    callback: (results: any[]) => void
  }) => {
    // let fullApi = `https://geocode.search.hereapi.com/v1/geocode?q=${keyword}&apiKey=${MapService.hereKey}`
    let fullApi = `https://discover.search.hereapi.com/v1/discover?q=${keyword}&apiKey=${MapService.hereKey}&limit=5&in=countryCode:VNM&lang=vi`
    if (center) fullApi += `&at=${center.lat},${center.lng}`
    const response = await fetch(fullApi, { method: 'GET' })

    if (response.ok) {
      const items = await response.json()
      const results = items.items.map((item: any) => {
        return {
          title: item.title,
          address: item.address.label,
          position: item.position
        }
      })

      callback(results)
    } else {
      callback([])
    }
  }

  static getSampleFeature = (mapType: string) => {
    if (mapType == MapFieldConfig.MapTypePolygon) {
      return {
        type: 'Feature',
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [106.70345834719978, 10.784467260162415],
              [106.70362825091684, 10.784618245834352],
              [106.7036811333449, 10.784560244786519],
              [106.70345834719978, 10.784467260162415]
            ]
          ]
        }
      }
    } else if (mapType == MapFieldConfig.MapTypeLineString) {
      return {
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates: [
            [106.70345834719978, 10.784467260162415],
            [106.70362825091684, 10.784618245834352],
            [106.7036811333449, 10.784560244786519]
          ]
        }
      }
    } else {
      return {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [106.70345834719978, 10.784467260162415]
        }
      }
    }
  }
}
