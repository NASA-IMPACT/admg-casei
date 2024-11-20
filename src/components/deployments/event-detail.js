import React from "react"
import PropTypes from "prop-types"
import { colors } from "../../theme"
import { NEGATIVE } from "../../utils/constants"
import { reformatDate } from "../../utils/helpers"
import { ChevronIcon } from "../../icons"
import { MainHeader, SectionContent, SubHeader } from "./iop-detail"

export const BackButton = ({ setSelectedEvent }) => {
  return (
    <div
      css={`
        &:hover {
          opacity: 0.64;
        }
        &:active {
          transform: translate(0, 1px);
        }
        background: none;
        border: ${colors[NEGATIVE].text} 1px solid;
        display: flex;
        width: fit-content;
        cursor: pointer;
        color: ${colors[NEGATIVE].text};
        vertical-align: middle;
        padding: 4px;
        margin-bottom: 12px;
      `}
      onClick={setSelectedEvent}
    >
      <span
        role="img"
        css={`
          transform: rotate(90deg);
        `}
      >
        {<ChevronIcon color={colors[NEGATIVE].text} />}
      </span>
      <span
        css={`
          margin: 0px 8px;
        `}
      >
        Back to Deployment
      </span>
    </div>
  )
}

export const EventDetail = ({ event, setSelectedEvent }) => {
  if (!event) {
    return <div>No event data available</div>
  }
  return (
    <div
      css={`
        padding: 12px;
      `}
    >
      <BackButton setSelectedEvent={setSelectedEvent} />
      <MainHeader>Significant Event</MainHeader>
      <SectionContent>{event.shortname}</SectionContent>
      <SubHeader>Date</SubHeader>
      <SectionContent>{`${reformatDate(event.start)} - ${reformatDate(
        event.end
      )}`}</SectionContent>
      <SubHeader>Description</SubHeader>
      <SectionContent>{`${event.description}`}</SectionContent>
    </div>
  )
}

EventDetail.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.string.isRequired,
    shortname: PropTypes.string.isRequired,
    end: PropTypes.string.isRequired,
    start: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  setSelectedEvent: PropTypes.func,
}

BackButton.propTypes = {
  setSelectedEvent: PropTypes.func,
}
