import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

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
import { useFetch } from "@custom-react-hooks/use-fetch"
import { CaseiLogoIcon } from "../../icons"
import { GlobeMap } from "../map/globe-map"
import { MapLegend } from "./map-legend"
import { MapViewControl } from "./map-view-control"
import bbox from "@turf/bbox"

const MapErrorMsg = styled.div`
  background: rgba(255, 255, 255, 0.1);
  padding: 1rem;
  margin-bottom: 2rem;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  > h4 {
    font-size: 1.2rem;
    margin: 0;
  }
`

const MapLoading = styled.div`
  background-color: #111;
  height: 500px;
  text-align: center;
  align-content: center;
`

export const DeploymentMap = ({
  campaignName,
  deployments,
  bounds,
  selectedDeployment,
}) => {
  const {
    data: geojson,
    error: geojsonError,
    loading: geojsonLoading,
  } = useFetch(`/casei/flight-tracks/${replaceSlashes(campaignName)}.geojson`)
  const geojsonBbox = !!geojson && bbox(geojson)
  const [enable3DView, setEnable3DView] = useState(
    // if the geojson crosses the 80º or -80º latitude, enables 3D view by default
    geojsonBbox[1] < -80 || geojsonBbox[3] > 80
  )
  const platforms = getUniquePlatforms(
    deployments.flatMap(d => d.collectionPeriods)
  ).map(i => ({ name: i.item.shortname, type: i.item.platformType.shortname }))
  const names = platforms.map(i => i.name)
  const platformsWithData = geojson?.features.map(
    f => f.properties.platform_name
  )
  const [selectedPlatforms, setSelectedPlatforms] = useState(
    names
      .filter((name, index) => names.indexOf(name) === index)
      .filter(name => platformsWithData?.includes(name))
  )
  useEffect(() => {
    if (!geojsonLoading && !selectedPlatforms.length) {
      setSelectedPlatforms(
        names
          .filter((name, index) => names.indexOf(name) === index)
          .filter(name => platformsWithData?.includes(name))
      )
    }
  }, [selectedPlatforms, geojsonLoading])

  const MAP_STYLE_ID = "devseed/clx25ggbv076o01ql8k8m03k8"
  const activeDeploymentPlatforms = getUniquePlatforms(
    deployments
      .filter(d =>
        selectedDeployment ? d.longname === selectedDeployment.longname : false
      )
      .flatMap(d => d.collectionPeriods)
  )
    .map(i => ({ name: i.item.shortname, type: i.item.platformType.shortname }))
    .map(i => i.name)
  let movingPlatforms = platforms
    .filter(platform =>
      ["Jet", "Prop", "UAV", "Ships/Boats"].includes(platform.type)
    )
    .map(platform => platform.name)

  const lineColorsPaint = getLineColors(
    movingPlatforms.filter((i, index) => movingPlatforms.indexOf(i) === index)
  )

  if (geojsonError) {
    return (
      <MapErrorMsg>
        <CaseiLogoIcon size="tiny" />
        <h4>Flight path data is not yet available for this campaign.</h4>
      </MapErrorMsg>
    )
  }

  if (geojsonLoading) {
    return (
      <MapLoading>
        <span className="loader"></span>
      </MapLoading>
    )
  }

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
          <MapViewControl
            onClick={() => setEnable3DView(!enable3DView)}
            is3DViewEnabled={enable3DView}
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
          <>
            <MapLegend
              platforms={platforms}
              platformsWithData={platformsWithData}
              activeDeploymentPlatforms={activeDeploymentPlatforms}
              selectedPlatforms={selectedPlatforms}
              setSelectedPlatforms={setSelectedPlatforms}
            />
            <MapViewControl
              onClick={() => setEnable3DView(!enable3DView)}
              is3DViewEnabled={enable3DView}
            />
          </>
        </MapboxMap>
      )}
    </>
  )
}

DeploymentMap.propTypes = {
  campaignName: PropTypes.string,
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
