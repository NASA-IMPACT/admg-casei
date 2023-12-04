import React, { useState } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

import Map from "../map"
import Source from "../map/source"
import Layer from "../map/layer"
import { getUniquePlatforms } from "../../utils/get-unique-platforms"
import { LineIcon, CircleIcon } from "../../icons"

export default function DeploymentMap({ geojson, deployments, bounds }) {
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
          <Layer
            config={{
              id: "flights",
              type: "line",
              source: "deployment",
              paint: {
                "line-color": "#1B9E77",
                "line-width": 2,
                "line-opacity": 0.6,
              },
              visible: true,
            }}
            onLoad={map => map.fitBounds(bounds, { padding: 20 })}
          />
          <Layer
            config={{
              id: "highlighted-platform",
              type: "line",
              source: "deployment",
              paint: {
                "line-color": "#1B9E77",
                "line-width": 2,
                "line-opacity": 1,
              },
              filter: ["==", "platform_name", ""],
            }}
          />
          <Layer
            config={{
              id: "static-locations",
              type: "circle",
              source: "deployment",
              paint: {
                "circle-color": "#E8E845",
                "circle-opacity": {
                  base: 1.5,
                  stops: [
                    [10, 0.45],
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
                "circle-stroke-opacity": 0.9,
                "circle-stroke-color": "#E8E845",
              },
              filter: ["==", "$type", "Point"],
            }}
          />
          <Layer
            config={{
              id: "highlighted-static-locations",
              type: "circle",
              source: "deployment",
              paint: {
                "circle-color": "#E8E845",
                "circle-opacity": 1,
                "circle-radius": {
                  base: 3,
                  stops: [
                    [10, 8],
                    [16, 16],
                    [20, 20],
                  ],
                },
                "circle-stroke-width": 1,
                "circle-stroke-opacity": 0.9,
                "circle-stroke-color": "#E8E845",
              },
              filter: [
                "all",
                ["==", "$type", "Point"],
                ["==", "platform_name", ""],
              ],
            }}
          />
        </Source>
      )}
      <MapLegend platforms={platforms} />
    </Map>
  )
}

const MapLegend = ({ map, platforms = [] }) => {
  const [highlightedPlatform, setHighlightedPlatform] = useState("")
  const highlight = platform => {
    if (highlightedPlatform !== platform) {
      setHighlightedPlatform(platform)
      map.setFilter("highlighted-platform", ["==", "platform_name", platform])
      map.setPaintProperty("flights", "line-opacity", 0.1)
      map.setFilter("highlighted-static-locations", [
        "all",
        ["==", "$type", "Point"],
        ["==", "platform_name", platform],
      ])
    } else {
      setHighlightedPlatform("")
      map.setFilter("highlighted-platform", ["==", "platform_name", ""])
      map.setPaintProperty("flights", "line-opacity", 0.6)
      map.setFilter("highlighted-static-locations", [
        "all",
        ["==", "$type", "Point"],
        ["==", "platform_name", ""],
      ])
    }
  }

  return (
    <LegendBox>
      {platforms.map(platform => (
        <button key={platform.name} onClick={() => highlight(platform.name)}>
          <LegendText selected={platform.name === highlightedPlatform}>
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
  map: PropTypes.object,
  platforms: PropTypes.array,
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
  position: absolute;
  right: 5px;
  margin-top: 5px;
  margin-right: 5px;
  padding: 8px;
  color: #000;
  background-color: rgba(255, 255, 255, 0.6);
  > button {
    display: block;
    cursor: pointer;
    background: transparent;
    border: none;
  }
`

DeploymentMap.propTypes = {
  geojson: PropTypes.object,
  deployments: PropTypes.array,
  bounds: PropTypes.array,
}
