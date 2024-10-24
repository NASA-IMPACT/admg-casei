import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { Tooltip } from "react-tooltip"

import { LineIcon } from "../../icons"
import { colors } from "../../theme"
import { usePlatformStatus } from "../../utils/use-platform-status"
import {
  FALLBACK_COLOR,
  MOVING_PLATFORMS_COLORS,
  STATIC_PLATFORMS,
} from "../../utils/platform-colors"

export const LegendItem = ({
  name,
  type,
  color,
  icon,
  checked,
  disabled,
  onClick,
  activeDeploymentPlatforms,
  platformsWithData,
}) => (
  <div key={name}>
    <input
      type="checkbox"
      checked={checked}
      disabled={disabled}
      onClick={() => onClick()}
    />
    <LegendText checked={checked}>
      {type === "moving" ? (
        <LineIcon color={color} size="text" />
      ) : (
        <IconSpan color={color}>{icon}</IconSpan>
      )}
      {name}
      <PlatformStatus
        platformName={name}
        activeDeploymentPlatforms={activeDeploymentPlatforms}
        platformsWithData={platformsWithData}
      />
    </LegendText>
  </div>
)

LegendItem.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  color: PropTypes.string,
  icon: PropTypes.node,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  platformsWithData: PropTypes.array,
  activeDeploymentPlatforms: PropTypes.array,
  onClick: PropTypes.func,
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
  const movingPlatforms = uniquePlatforms.filter(platform =>
    ["Jet", "Prop", "UAV", "Ships/Boats"].includes(platform.type)
  )
  const staticPlatforms = uniquePlatforms.filter(
    platform => !["Jet", "Prop", "UAV", "Ships/Boats"].includes(platform.type)
  )

  return (
    <LegendBox>
      <fieldset>
        <legend>Platforms</legend>
        {movingPlatforms.length > 0 && <h4>Moving</h4>}
        {movingPlatforms.map((platform, index) => (
          <LegendItem
            key={platform.name}
            type="moving"
            name={platform.name}
            color={
              index <= MOVING_PLATFORMS_COLORS.length
                ? MOVING_PLATFORMS_COLORS[index]
                : FALLBACK_COLOR
            }
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
            activeDeploymentPlatforms={activeDeploymentPlatforms}
            platformsWithData={platformsWithData}
          />
        ))}
        {staticPlatforms.length > 0 && <h4>Stationary</h4>}
        {staticPlatforms.map(platform => (
          <LegendItem
            key={platform.name}
            type="static"
            name={platform.name}
            color={STATIC_PLATFORMS?.find(i => i.name === platform.name)?.color}
            icon={STATIC_PLATFORMS?.find(i => i.name === platform.name)?.icon}
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
            activeDeploymentPlatforms={activeDeploymentPlatforms}
            platformsWithData={platformsWithData}
          />
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
  display: inline-flex;
  gap: 0.25rem;
  margin-left: 0.5rem;
  background: transparent;
  border: none;
  & svg {
    vertical-align: middle;
  }
`

const IconSpan = styled.span`
  color: ${props => props.color};
  background: #294060;
  border: 0.5px solid;
  border-color: ${props => props.color};
  display: inline-flex;
  height: 1.25rem;
  width: 1.25rem;
  justify-content: center;
  align-items: center;
  border-radius: 512px;
  & svg {
    vertical-align: unset;
    font-weight: 600;
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
  background-color: rgba(255, 255, 255, 0.75);
  transition: all 0.24s ease-out;
  > fieldset {
    border: 0px;
  }
  > fieldset > legend {
    padding: 0 0 4px;
    font-family: "Titillium Web", sans-serif;
    color: ${colors.lightTheme.text};
    font-size: 1.1rem;
    font-weight: 600;
  }
  & input {
    cursor: pointer;
  }
  & h4 {
    font-weight: 600;
    color: ${colors.lightTheme.text};
    font-size: 0.8rem;
    margin: 4px 0 2px;
  }
  &:hover {
    background-color: rgba(255, 255, 255, 0.95);
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
