import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"

import Map from "../map"
import Source from "../map/source"
import Layer from "../map/layer"
import { getUniquePlatforms } from "../../utils/get-unique-platforms"
import { mapLayerFilter } from "../../utils/filter-utils"
import { replaceSlashes } from "../../utils/helpers"
import {
  getLineColors,
  getStaticIcons,
  getIconColors,
} from "../../utils/platform-colors"
import Button from "../button"
import { GlobeMap } from "../map/globe-map"
import { POSITIVE } from "../../utils/constants"
import { MapLegend } from "./map-legend"

export function DeploymentMap({
  geojson,
  deployments,
  bounds,
  selectedDeployment,
}) {
  const MAP_STYLE_ID = "devseed/clx25ggbv076o01ql8k8m03k8"
  const [enable3DView, setEnable3DView] = useState(false)
  const platforms = getUniquePlatforms(
    deployments.flatMap(d => d.collectionPeriods)
  ).map(i => ({ name: i.item.shortname, type: i.item.platformType.shortname }))
  const names = platforms.map(i => i.name)
  const activeDeploymentPlatforms = getUniquePlatforms(
    deployments
      .filter(d =>
        selectedDeployment ? d.longname === selectedDeployment.longname : false
      )
      .flatMap(d => d.collectionPeriods)
  )
    .map(i => ({ name: i.item.shortname, type: i.item.platformType.shortname }))
    .map(i => i.name)
  const platformsWithData = geojson.features.map(
    f => f.properties.platform_name
  )
  let movingPlatforms = platforms
    .filter(platform =>
      ["Jet", "Prop", "UAV", "Ships/Boats"].includes(platform.type)
    )
    .map(platform => platform.name)

  const lineColorsPaint = getLineColors(
    movingPlatforms.filter((i, index) => movingPlatforms.indexOf(i) === index)
  )

  const [selectedPlatforms, setSelectedPlatforms] = useState(
    names
      .filter((name, index) => names.indexOf(name) === index)
      .filter(name => platformsWithData.includes(name))
  )

  return (
    <>
      {enable3DView ? (
        <GlobeMap
          geojson={geojson}
          deployments={deployments}
          selectedPlatforms={selectedPlatforms}
          selectedDeployment={selectedDeployment}
          mapStyleID={MAP_STYLE_ID}
        >
          <MapLegend
            platforms={platforms}
            platformsWithData={platformsWithData}
            activeDeploymentPlatforms={activeDeploymentPlatforms}
            selectedPlatforms={selectedPlatforms}
            setSelectedPlatforms={setSelectedPlatforms}
          />
        </GlobeMap>
      ) : (
        <MapboxMap
          geojson={geojson}
          mapStyleID={MAP_STYLE_ID}
          lineColorsPaint={lineColorsPaint}
          selectedDeployment={selectedDeployment}
          selectedPlatforms={selectedPlatforms}
          setSelectedPlatforms={setSelectedPlatforms}
          bounds={bounds}
        >
          <MapLegend
            platforms={platforms}
            platformsWithData={platformsWithData}
            activeDeploymentPlatforms={activeDeploymentPlatforms}
            selectedPlatforms={selectedPlatforms}
            setSelectedPlatforms={setSelectedPlatforms}
          />
        </MapboxMap>
      )}
      <div css={{ marginTop: "5px" }}>
        <Button
          action={() => setEnable3DView(!enable3DView)}
          mode={POSITIVE}
          noBorder
        >
          Switch to {enable3DView ? "2D" : "3D"} map view
        </Button>
      </div>
    </>
  )
}

DeploymentMap.propTypes = {
  geojson: PropTypes.object,
  deployments: PropTypes.array,
  bounds: PropTypes.array,
  selectedDeployment: PropTypes.object,
}

const MapboxMap = ({
  geojson,
  mapStyleID,
  bounds,
  lineColorsPaint,
  selectedDeployment,
  selectedPlatforms,
  children,
}) => {
  const iconImage = getStaticIcons()
  const iconColors = getIconColors()
  return (
    <Map
      height={500}
      basemap={`mapbox://styles/${mapStyleID}`}
      showControls={true}
    >
      <Source
        id="deployment"
        config={{
          type: "geojson",
          data: geojson,
        }}
      >
        <DeploymentLayer
          config={{
            id: "flights",
            type: "line",
            source: "deployment",
            paint: {
              "line-color": lineColorsPaint,
              "line-width": [
                "interpolate",
                ["linear"],
                ["zoom"],
                0,
                1,
                10,
                2,
                22,
                6,
              ],
              "line-opacity": [
                "interpolate",
                ["linear"],
                ["zoom"],
                0,
                0.25,
                10,
                0.5,
                22,
                1,
              ],
            },
            visible: true,
          }}
          onLoad={map => map.fitBounds(bounds, { padding: 50 })}
          selectedPlatforms={selectedPlatforms}
          selectedDeployment={
            selectedDeployment
              ? replaceSlashes(selectedDeployment.longname)
              : ""
          }
        />
        <DeploymentLayer
          config={{
            id: "bg-static-locations",
            type: "circle",
            source: "deployment",
            paint: {
              "circle-color": "#294060",
              "circle-radius": [
                "interpolate",
                ["exponential", 0.5],
                ["zoom"],
                0,
                4,
                10,
                14,
                22,
                20,
              ],
              "circle-stroke-width": 1,
              "circle-stroke-color": iconColors,
            },
            filter: ["all", ["==", "$type", "Point"]],
          }}
          selectedPlatforms={selectedPlatforms}
          selectedDeployment={
            selectedDeployment
              ? replaceSlashes(selectedDeployment.longname)
              : ""
          }
        />
        <DeploymentLayer
          config={{
            id: "static-locations",
            type: "symbol",
            source: "deployment",
            layout: {
              "icon-image": iconImage,
              "icon-allow-overlap": true,
              "icon-size": [
                "interpolate",
                ["exponential", 0.5],
                ["zoom"],
                0,
                0.25,
                10,
                0.75,
                16,
                1,
                20,
                1.125,
              ],
            },
            filter: ["all", ["==", "$type", "Point"]],
          }}
          selectedPlatforms={selectedPlatforms}
          selectedDeployment={
            selectedDeployment
              ? replaceSlashes(selectedDeployment.longname)
              : ""
          }
        />
      </Source>
      {children}
    </Map>
  )
}

MapboxMap.propTypes = {
  geojson: PropTypes.object,
  children: PropTypes.node,
  selectedDeployment: PropTypes.object,
  selectedPlatforms: PropTypes.array,
  setSelectedPlatforms: PropTypes.func,
  lineColorsPaint: PropTypes.array,
  bounds: PropTypes.array,
  mapStyleID: PropTypes.string.isRequired,
}

const DeploymentLayer = ({
  map,
  config,
  selectedDeployment,
  selectedPlatforms,
  onLoad,
}) => {
  const mapHasStarted = map !== undefined

  useEffect(() => {
    if (mapHasStarted) {
      const newFilter = mapLayerFilter(
        map.getFilter(config.id),
        "deployment",
        selectedDeployment
      )
      map.setFilter(config.id, newFilter)
    }
  }, [selectedDeployment, mapHasStarted])

  useEffect(() => {
    if (mapHasStarted) {
      const newFilter = mapLayerFilter(
        map.getFilter(config.id),
        "platform_name",
        selectedPlatforms
      )
      map.setFilter(config.id, newFilter)
    }
  }, [JSON.stringify(selectedPlatforms), mapHasStarted])

  return <Layer config={config} onLoad={onLoad} map={map} />
}

DeploymentLayer.propTypes = {
  map: PropTypes.object,
  config: PropTypes.object,
  selectedDeployment: PropTypes.string,
  selectedPlatforms: PropTypes.array,
  onLoad: PropTypes.func,
}
