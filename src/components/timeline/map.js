import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { Tooltip } from "react-tooltip"

import Map from "../map"
import Source from "../map/source"
import Layer from "../map/layer"
import { getUniquePlatforms } from "../../utils/get-unique-platforms"
import { LineIcon, CircleIcon } from "../../icons"
import { mapLayerFilter } from "../../utils/filter-utils"
import { colors } from "../../theme"
import { replaceSlashes } from "../../utils/helpers"
import { usePlatformStatus } from "../../utils/use-platform-status"

export function DeploymentMap({
  geojson,
  deployments,
  bounds,
  selectedDeployment,
}) {
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
  const [selectedPlatforms, setSelectedPlatforms] = useState(
    names
      .filter((name, index) => names.indexOf(name) === index)
      .filter(name => platformsWithData.includes(name))
  )

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
            selectedPlatforms={selectedPlatforms}
            selectedDeployment={
              selectedDeployment
                ? replaceSlashes(selectedDeployment.longname)
                : ""
            }
          />
        </Source>
      )}
      <MapLegend
        platforms={platforms}
        platformsWithData={platformsWithData}
        activeDeploymentPlatforms={activeDeploymentPlatforms}
        selectedPlatforms={selectedPlatforms}
        setSelectedPlatforms={setSelectedPlatforms}
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
  selectedPlatforms: PropTypes.string,
  onLoad: PropTypes.func,
}

export const MapLegend = ({
  platforms = [],
  platformsWithData = [],
  activeDeploymentPlatforms = [],
  setSelectedPlatforms,
  selectedPlatforms,
}) => {
  const names = platforms.map(i => i.name)
  const uniquePlatforms = platforms.filter(
    (i, index) => names.indexOf(i.name) === index
  )
  return (
    <LegendBox>
      <fieldset>
        <legend>Platforms</legend>
        {uniquePlatforms.map(platform => (
          <div key={platform.name}>
            <input
              type="checkbox"
              checked={selectedPlatforms.includes(platform.name)}
              disabled={
                (selectedPlatforms.length === 1 &&
                  selectedPlatforms.includes(platform.name)) ||
                !platformsWithData.includes(platform.name)
              }
              onClick={() =>
                selectedPlatforms.includes(platform.name)
                  ? setSelectedPlatforms(
                      selectedPlatforms.filter(i => i !== platform.name)
                    )
                  : setSelectedPlatforms([...selectedPlatforms, platform.name])
              }
            />
            <LegendText checked={selectedPlatforms.includes(platform.name)}>
              {["Jet", "Prop", "UAV", "Ships/Boats"].includes(platform.type) ? (
                <LineIcon color="#1B9E77" size="text" />
              ) : (
                <CircleIcon color="#E8E845" size="extra-tiny" />
              )}
              {platform.name}
              <PlatformStatus
                platformName={platform.name}
                activeDeploymentPlatforms={activeDeploymentPlatforms}
                platformsWithData={platformsWithData}
              />
            </LegendText>
          </div>
        ))}
      </fieldset>
    </LegendBox>
  )
}

MapLegend.propTypes = {
  platforms: PropTypes.array,
  platformsWithData: PropTypes.array,
  activeDeploymentPlatforms: PropTypes.array,
  setSelectedPlatforms: PropTypes.func,
  selectedPlatforms: PropTypes.array,
}

export const PlatformStatus = ({
  platformName,
  platformsWithData,
  activeDeploymentPlatforms,
}) => {
  const status = usePlatformStatus(
    platformName,
    platformsWithData,
    activeDeploymentPlatforms
  )

  if (status !== "operational") {
    return (
      <Tag>
        <u data-tooltip-id={`tooltip-${platformName}`}>
          {status === "notShown" ? "(Not Shown)" : "(Not Operating)"}
        </u>
        <Tooltip
          id={`tooltip-${platformName}`}
          content={
            status === "notShown"
              ? "The data for this platform is not available for visualization."
              : "This platform is not operating in the selected deployment."
          }
          place="bottom-end"
          style={{
            backgroundColor: "#fff",
            color: "#000",
            textTransform: "none",
            fontSize: "1em",
          }}
        />
      </Tag>
    )
  }
  return <></>
}

PlatformStatus.propTypes = {
  platformName: PropTypes.string,
  platformsWithData: PropTypes.array,
  activeDeploymentPlatforms: PropTypes.array,
}

const LegendText = styled.label`
  font-weight: ${props => (props.checked ? 600 : 400)};
  font-family: "Titillium Web", sans-serif;
  display: inline-block;
  background: transparent;
  border: none;
  > svg {
    margin: 0 8px;
  }
`

const LegendBox = styled.div`
  display: inline-block;
  text-align: left;
  min-width: 14rem;
  position: absolute;
  right: 5px;
  margin-top: 5px;
  margin-right: 5px;
  padding: 8px;
  color: ${colors.lightTheme.text};
  background-color: rgba(255, 255, 255, 0.6);
  > fieldset {
    border: 0px;
    margin-bottom: 4px;
  }
  > fieldset > legend {
    padding: 0 0 8px;
    font-family: "Titillium Web", sans-serif;
    color: ${colors.lightTheme.text};
    font-size: 1.1rem;
    font-weight: 600;
  }
  & input {
    cursor: pointer;
  }
`

const Tag = styled.div`
  display: inline;
  > u {
    text-decoration-line: underline;
    text-decoration-style: dotted;
    text-decoration-color: #4d4d4d;
    color: #333;
    text-decoration-thickness: 2px;
    padding-left: 7px;
    &:hover {
      cursor: pointer;
    }
  }
`
