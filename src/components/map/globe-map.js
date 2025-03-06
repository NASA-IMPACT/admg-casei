import React, { useEffect, useState } from "react"
import { centroid } from "@turf/centroid"
import { Map, useControl, useMap } from "react-map-gl/mapbox"
import { MapboxOverlay } from "@deck.gl/mapbox"
import {
  COORDINATE_SYSTEM,
  _GlobeView as GlobeView,
  FlyToInterpolator,
} from "@deck.gl/core"
import { GeoJsonLayer, BitmapLayer, IconLayer } from "@deck.gl/layers"
import { TileLayer } from "@deck.gl/geo-layers"
import { SimpleMeshLayer } from "@deck.gl/mesh-layers"
import { ZoomWidget, FullscreenWidget } from "@deck.gl/widgets"
import { SphereGeometry } from "@luma.gl/engine"
import PropTypes from "prop-types"
import styled from "styled-components"
import { getUniquePlatforms } from "../../utils/get-unique-platforms"
import {
  getLineColorAsRGB,
  getPlatformIcon,
  isPlatformVisible,
} from "../../utils/platform-colors"
import "./deck-gl.css"
import { colors } from "../../theme"
import { MOVING_PLATFORMS } from "../../utils/constants"
import "maplibre-gl/dist/maplibre-gl.css"

const INITIAL_VIEW_STATE = {
  longitude: -98,
  latitude: 40,
  zoom: 0,
}
const MAPBOX_TOKEN = process.env.GATSBY_MAPBOX_TOKEN

function DeckGLOverlay(props) {
  const overlay = useControl(() => new MapboxOverlay(props))
  const { current: map } = useMap()

  useEffect(() => {
    if (map) {
      map.flyTo({ center: [-90, 20], curve: 0.1, speed: 0.002 })
    }
  }, [map])

  overlay.setProps(props)
  return null
}

export function GlobeMap({
  geojson,
  deployments,
  selectedPlatforms,
  selectedDeployment,
  mapStyleID,
  children,
}) {
  const [initialViewState, setInitialViewState] = useState(INITIAL_VIEW_STATE)
  const [iconMapping, setIconMapping] = useState({})
  const platforms = getUniquePlatforms(
    deployments.flatMap(d => d.collectionPeriods)
  ).map(i => ({ name: i.item.shortname, type: i.item.platformType.shortname }))
  const movingPlatforms = platforms
    .filter(platform => MOVING_PLATFORMS.includes(platform.type))
    .map(platform => platform.name)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // We need to update this variable each time we have a new version of the mapbox map style published
        const mapStyleVersion = "6914ry1z9mxpu0srgeii55c8s"
        const response = await fetch(
          `https://api.mapbox.com/styles/v1/${mapStyleID}/${mapStyleVersion}/sprite@2x.json?access_token=${MAPBOX_TOKEN}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        const mapping = await response.json()
        setIconMapping(mapping)
      } catch (error) {
        console.log("catch error", error)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    const dataCentroid = centroid(geojson)
    const [lon, lat] = dataCentroid.geometry.coordinates
    setInitialViewState({
      longitude: lon,
      latitude: lat,
      zoom: 1,
      transitionDuration: "auto",
    })
  }, [geojson])

  const flights = new GeoJsonLayer({
    id: "flights",
    pickable: true,
    data: {
      ...geojson,
      features: geojson.features
        .filter(f => f.geometry.type !== "Point")
        .filter(f =>
          isPlatformVisible({
            platformProperties: f.properties,
            selectedDeployment,
            selectedPlatforms,
          })
        ),
    },
    lineWidthMinPixels: 0.5,
    getLineWidth: 1.5,
    getLineColor: f =>
      getLineColorAsRGB(
        movingPlatforms
          .filter((i, index) => movingPlatforms.indexOf(i) === index) // remove duplicates
          .indexOf(f.properties.platform_name)
      ),
  })

  const staticLocations = new IconLayer({
    id: "static-platforms",
    data: geojson.features.filter(f => f.geometry.type === "Point"),
    pickable: true,
    iconAtlas: `https://api.mapbox.com/styles/v1/${mapStyleID}/sprite@2x.png?access_token=${MAPBOX_TOKEN}`,
    iconMapping: iconMapping,
    getIcon: f =>
      isPlatformVisible({
        platformProperties: f.properties,
        selectedDeployment,
        selectedPlatforms,
      })
        ? getPlatformIcon(f.properties.platform_name)
        : null,
    getPosition: f => f.geometry.coordinates,
    getSize: 18,
  })

  if (iconMapping && geojson) {
    return (
      <MapContainer>
        <Map
          reuseMaps
          projection="globe"
          id="map"
          // mapStyle="https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"
          mapStyle={`mapbox://styles/${mapStyleID}`}
          mapboxAccessToken={MAPBOX_TOKEN}
          initialViewState={initialViewState}
        >
          <DeckGLOverlay layers={[flights, staticLocations]} />
        </Map>
        {children}
      </MapContainer>
    )
  }
}

GlobeMap.propTypes = {
  geojson: PropTypes.object,
  deployments: PropTypes.array,
  selectedDeployment: PropTypes.array,
  selectedPlatforms: PropTypes.array,
  mapStyleID: PropTypes.string,
  children: PropTypes.node,
}

const MapContainer = styled.div`
  position: relative;
  display: block;
  height: 500px;
  width: 100%;
  overflow: hidden;
  background: #111;
`

const Attribution = styled.div`
  display: inline-block;
  text-align: right;
  position: absolute;
  right: 4px;
  bottom: 2px;
  font-weight: 400;
  font-size: 11px;
  font-family: "Helvetica Neue", Arial, Helvetica, sans-serif;
  color: ${colors.darkTheme.text};
  > a {
    margin-left: 4px;
  }
`
