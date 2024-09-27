import React, { useEffect, useState, useMemo } from "react"
import { centroid } from "@turf/centroid"
import DeckGL from "@deck.gl/react"
import {
  COORDINATE_SYSTEM,
  _GlobeView as GlobeView,
  FlyToInterpolator,
} from "@deck.gl/core"
import { GeoJsonLayer, BitmapLayer } from "@deck.gl/layers"
import { TileLayer } from "@deck.gl/geo-layers"
import { SimpleMeshLayer } from "@deck.gl/mesh-layers"
import { SphereGeometry } from "@luma.gl/engine"
import PropTypes from "prop-types"
import styled from "styled-components"
import { getUniquePlatforms } from "../../utils/get-unique-platforms"
import { getLineColorToDeckGL } from "../../utils/platform-colors"

const INITIAL_VIEW_STATE = {
  longitude: -98,
  latitude: 40,
  zoom: 0,
}
const MAPBOX_TOKEN = process.env.GATSBY_MAPBOX_TOKEN

export function GlobeMap({ geojson, deployments, mapStyleID }) {
  const [initialViewState, setInitialViewState] = useState(INITIAL_VIEW_STATE)
  const platforms = getUniquePlatforms(
    deployments.flatMap(d => d.collectionPeriods)
  ).map(i => ({ name: i.item.shortname, type: i.item.platformType.shortname }))
  const movingPlatforms = platforms
    .filter(platform =>
      ["Jet", "Prop", "UAV", "Ships/Boats"].includes(platform.type)
    )
    .map(platform => platform.name)

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
        getColor: [42, 98, 163, 125],
      }),
      new TileLayer({
        id: "TileLayer",
        data: `https://api.mapbox.com/styles/v1/${mapStyleID}/tiles/256/{z}/{x}/{y}@2x?access_token=${MAPBOX_TOKEN}`,
        maxZoom: 22,
        minZoom: 0,
        zoomOffset: 1,
        tileSize: 256,
        renderSubLayers: props => {
          // eslint-disable-next-line react/prop-types
          const { boundingBox } = props.tile
          return new BitmapLayer(props, {
            data: null,
            // eslint-disable-next-line react/prop-types
            image: props.data,
            bounds: [
              boundingBox[0][0],
              boundingBox[0][1],
              boundingBox[1][0],
              boundingBox[1][1],
            ],
          })
        },
      }),
    ],
    []
  )

  const dataLayers = new GeoJsonLayer({
    id: "flight",
    data: geojson,
    pointType: "circle",
    // Styles
    lineWidthMinPixels: 0.5,
    getLineWidth: 1,
    getLineColor: f =>
      getLineColorToDeckGL(movingPlatforms.indexOf(f.properties.platform_name)),
    getFillColor: [160, 160, 180, 200],
    getPointRadius: 4,
  })

  return (
    <MapContainer>
      <DeckGL
        views={
          new GlobeView({
            controller: { keyboard: false, inertia: true },
          })
        }
        parameters={{ cull: true }}
        initialViewState={initialViewState}
        layers={[backgroundLayers, dataLayers]}
      ></DeckGL>
    </MapContainer>
  )
}

GlobeMap.propTypes = {
  geojson: PropTypes.object,
  deployments: PropTypes.array,
  mapStyleID: PropTypes.string,
}

const MapContainer = styled.div`
  position: relative;
  display: block;
  height: 500px;
  width: 100%;
  overflow: hidden;
  background: #111;
`
