import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

import Map from "../map"
import Source from "../map/source"
import Layer from "../map/layer"
import { getUniquePlatforms } from "../../utils/get-unique-platforms"
import { LineIcon, CircleIcon } from "../../icons"
import { mapLayerFilter } from "../../utils/filter-utils"
import { colors } from "../../theme"

export function DeploymentMap({
  geojson,
  deployments,
  bounds,
  selectedDeployment,
}) {
  const [selectedPlatform, setSelectedPlatform] = useState("")
  const platforms = getUniquePlatforms(
    deployments.flatMap(d => d.collectionPeriods)
  ).map(i => ({ name: i.item.shortname, type: i.item.platformType.shortname }))

  return (
    <Map
      height={500}
      basemap="mapbox://styles/mapbox/dark-v10"
      showControls={true}
    >
      {geojson && (
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
                "line-color": "#1B9E77",
                "line-width": 2,
                "line-opacity": 0.9,
              },
              visible: true,
            }}
            onLoad={map => map.fitBounds(bounds, { padding: 20 })}
            selectedPlatform={selectedPlatform}
            selectedDeployment={
              selectedDeployment ? selectedDeployment.longname : ""
            }
          />
          <DeploymentLayer
            config={{
              id: "static-locations",
              type: "circle",
              source: "deployment",
              paint: {
                "circle-color": "#E8E845",
                "circle-opacity": {
                  base: 1.5,
                  stops: [
                    [10, 0.65],
                    [14, 0.85],
                  ],
                },
                "circle-radius": {
                  base: 1.5,
                  stops: [
                    [10, 4],
                    [16, 10],
                    [20, 16],
                  ],
                },
                "circle-stroke-width": 1,
                "circle-stroke-opacity": 0.1,
                "circle-stroke-color": "#E8E845",
              },
              filter: ["all", ["==", "$type", "Point"]],
            }}
            selectedPlatform={selectedPlatform}
            selectedDeployment={
              selectedDeployment ? selectedDeployment.longname : ""
            }
          />
        </Source>
      )}
      <MapLegend
        platforms={platforms}
        selectedPlatform={selectedPlatform}
        setSelectedPlatform={setSelectedPlatform}
      />
    </Map>
  )
}

DeploymentMap.propTypes = {
  geojson: PropTypes.object,
  deployments: PropTypes.array,
  bounds: PropTypes.array,
  selectedDeployment: PropTypes.object,
}

const DeploymentLayer = ({
  map,
  config,
  selectedDeployment,
  selectedPlatform,
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
        selectedPlatform
      )
      map.setFilter(config.id, newFilter)
    }
  }, [selectedPlatform, mapHasStarted])

  return <Layer config={config} onLoad={onLoad} map={map} />
}

DeploymentLayer.propTypes = {
  map: PropTypes.object,
  config: PropTypes.object,
  selectedDeployment: PropTypes.string,
  selectedPlatform: PropTypes.string,
  onLoad: PropTypes.func,
}

export const MapLegend = ({
  platforms = [],
  setSelectedPlatform,
  selectedPlatform,
}) => {
  return (
    <LegendBox>
      <h3>Platforms</h3>
      {platforms.map(platform => (
        <button
          key={platform.name}
          onClick={() =>
            platform.name === selectedPlatform
              ? setSelectedPlatform("")
              : setSelectedPlatform(platform.name)
          }
        >
          <LegendText selected={platform.name === selectedPlatform}>
            {platform.type === "Jet" ? (
              <LineIcon color="#1B9E77" size="text" />
            ) : (
              <CircleIcon color="#E8E845" size="extra-tiny" />
            )}
            {platform.name}
          </LegendText>
        </button>
      ))}
    </LegendBox>
  )
}

MapLegend.propTypes = {
  platforms: PropTypes.array,
  setSelectedPlatform: PropTypes.func,
  selectedPlatform: PropTypes.string,
}

const LegendText = styled.span`
  font-weight: ${props => (props.selected ? 600 : 400)};
  &:hover {
    font-weight: 600;
    text-decoration: underline;
  }
  > svg {
    margin-right: 10px;
  }
`

const LegendBox = styled.div`
  display: inline-block;
  text-align: left;
  min-width: 10rem;
  position: absolute;
  right: 5px;
  margin-top: 5px;
  margin-right: 5px;
  padding: 8px;
  color: ${colors.lightTheme.text};
  background-color: rgba(255, 255, 255, 0.6);
  > button {
    font-family: "Titillium Web", sans-serif;
    display: block;
    cursor: pointer;
    background: transparent;
    border: none;
  }
  > h3 {
    margin: 0 0 8px;
    color: ${colors.lightTheme.text};
    font-size: 1.1rem;
    font-weight: 600;
  }
`
