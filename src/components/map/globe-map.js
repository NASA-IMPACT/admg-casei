import React, { useEffect, useState, useMemo } from "react"
import { centroid } from "@turf/centroid"
import DeckGL from "@deck.gl/react"
import {
  COORDINATE_SYSTEM,
  _GlobeView as GlobeView,
  FlyToInterpolator,
} from "@deck.gl/core"
import { GeoJsonLayer } from "@deck.gl/layers"
import { SimpleMeshLayer } from "@deck.gl/mesh-layers"
import { SphereGeometry } from "@luma.gl/engine"
import PropTypes from "prop-types"
import styled from "styled-components"

const INITIAL_VIEW_STATE = {
  longitude: -98,
  latitude: 40,
  zoom: 0,
}

export function GlobeMap({ geojson }) {
  const [initialViewState, setInitialViewState] = useState(INITIAL_VIEW_STATE)

  useEffect(() => {
    const dataCentroid = centroid(geojson)
    const [lon, lat] = dataCentroid.geometry.coordinates
    setInitialViewState({
      longitude: lon,
      latitude: lat,
      zoom: 1,
      transitionInterpolator: new FlyToInterpolator({ speed: 1.5 }),
      transitionDuration: "auto",
    })
  }, [geojson])

  const backgroundLayers = useMemo(
    () => [
      new SimpleMeshLayer({
        id: "earth-sphere",
        data: [0],
        mesh: new SphereGeometry({
          radius: 6.3e6,
          nlat: 18,
          nlong: 36,
        }),
        coordinateSystem: COORDINATE_SYSTEM.CARTESIAN,
        getPosition: [0, 0, 0],
        getColor: [255, 255, 255],
      }),
      new GeoJsonLayer({
        id: "earth-land",
        data: "https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_50m_land.geojson",
        // Styles
        stroked: false,
        filled: true,
        opacity: 0.1,
        getFillColor: [18, 23, 33],
      }),
    ],
    []
  )

  const dataLayers = new GeoJsonLayer({
    id: "flight",
    data: geojson,
    // Styles
    lineWidthMinPixels: 0.5,
    getLineWidth: 1,
    getLineColor: [255, 0, 0],
  })

  return (
    <MapContainer>
      <DeckGL
        views={
          new GlobeView({
            controller: { keyboard: false, inertia: true },
          })
        }
        initialViewState={initialViewState}
        layers={[backgroundLayers, dataLayers]}
      ></DeckGL>
    </MapContainer>
  )
}

GlobeMap.propTypes = {
  geojson: PropTypes.object.required,
}

const MapContainer = styled.div`
  position: relative;
  display: block;
  height: 500px;
  width: 100%;
  overflow: hidden;
  background: #111;
`
