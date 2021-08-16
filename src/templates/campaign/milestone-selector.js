import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

import { AirborneRemoteSensors } from "../../icons"
import { NEGATIVE } from "../../utils/constants"
import { colors } from "../../theme"

const CardContent = styled.div`
  display: grid;
  grid-template-columns: 30px 120px;
  grid-template-areas:
    "icon title"
    "icon subTitle"
    "icon flights";
`

const CardTitle = styled.p`
  margin: 0;
  font-size: small;
  text-align: start;
`
const CardSubTitle = styled.p`
  margin: 0;
  font-size: x-small;
  text-align: start;
`

export default function MilestoneSelector({
  events,
  timelineAction,
  activeMilestone,
}) {
  return (
    <section
      data-cy="milestone-timeline"
      css={`
        white-space: nowrap;
        border-top: 1px solid gray;
      `}
    >
      <ol
        css={`
          max-width: 100%;
          padding: 8rem 0 2rem 0;
          height: 200px;
          margin: 0;
          display: flex;
          overflow-x: scroll;
        `}
      >
        {events.map(event => (
          <li
            key={event.id}
            css={`
              position: relative;
              display: flex;
              list-style-type: none;
              height: 2px;
              background: ${colors[NEGATIVE].text};
              flex: 1 0 25%;
            `}
          >
            <div
              css={`
                position: absolute;
                bottom: 0rem;
                height: 2rem;
                width: 1px;
                background: ${colors[NEGATIVE].text};
              `}
            ></div>
            <button
              css={`
                position: absolute;
                bottom: 2rem;
                width: 12rem;
                padding: 0.5rem;
                color: black;
                background: ${colors[NEGATIVE].text};
                opacity: ${activeMilestone === event.id ? 1 : 0.7};
                border: none;
              `}
              onClick={() => timelineAction(event.id)}
              data-cy="milestone-timeline-card"
            >
              <CardContent data-cy="milestone-timeline-card-content">
                {/* TODO: replace with the correct icon */}
                <div
                  css={`
                    grid-area: icon;
                  `}
                >
                  <AirborneRemoteSensors
                    color={
                      activeMilestone === event.id
                        ? colors[NEGATIVE].highlight
                        : colors[NEGATIVE].altBackground
                    }
                    size="tiny"
                  />
                </div>
                <CardTitle
                  css={`
                    grid-area: title;
                  `}
                >
                  {event.longname || event.shortname || "missing region"}
                </CardTitle>
                <CardSubTitle
                  css={`
                    grid-area: subTitle;
                  `}
                >
                  {event.name || "missing details"}
                </CardSubTitle>
                <CardSubTitle
                  css={`
                    grid-area: flights;
                  `}
                >
                  {`${event.collectionPeriods.length} CDCPs` || "missing CDCPs"}
                </CardSubTitle>
              </CardContent>
            </button>
            <p
              css={`
                position: absolute;
                width: 100%;
                height: 40px;
                top: 1rem;
                color: ${colors[NEGATIVE].text};
              `}
            >
              {event.end}
            </p>
          </li>
        ))}
      </ol>
    </section>
  )
}

MilestoneSelector.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      campaign: PropTypes.string,
      end: PropTypes.string,
      flights: PropTypes.arrayOf(PropTypes.string),
      id: PropTypes.string,
      longname: PropTypes.string,
      region: PropTypes.arrayOf(PropTypes.string),
      shortname: PropTypes.string,
      start: PropTypes.string,
    })
  ).isRequired,
  timelineAction: PropTypes.func,
  activeMilestone: PropTypes.string,
}
