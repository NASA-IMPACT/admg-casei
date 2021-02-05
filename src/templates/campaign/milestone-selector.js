import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

import { AirborneRemoteSensors } from "../../icons"
import theme from "../../utils/theme"

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
      style={{ whiteSpace: `nowrap`, borderTop: `1px solid gray` }}
    >
      <ol
        style={{
          maxWidth: `100%`,
          padding: `8rem 0 2rem 0`,
          height: `200px`,
          margin: `0`,
          display: `flex`,
          overflowX: `scroll`,
        }}
      >
        {events.map(event => (
          <li
            key={event.id}
            style={{
              position: `relative`,
              display: `flex`,
              listStyleType: `none`,
              height: `2px`,
              background: `#fff`,
              flex: `1 0 25%`,
            }}
          >
            <div
              style={{
                position: `absolute`,
                bottom: `0rem`,
                height: `2rem`,
                width: `1px`,
                background: theme.color.base,
              }}
            ></div>
            <button
              style={{
                position: `absolute`,
                bottom: `2rem`,
                width: `12rem`,
                padding: `.5rem`,
                color: `black`,
                background: theme.color.base,
                opacity: activeMilestone === event.id ? 1 : 0.7,
                border: `none`,
              }}
              onClick={() => timelineAction(event.id)}
              data-cy="milestone-timeline-card"
            >
              <CardContent data-cy="milestone-timeline-card-content">
                {/* TODO: replace with the correct icon */}
                <div style={{ gridArea: `icon` }}>
                  <AirborneRemoteSensors
                    color={
                      activeMilestone === event.id
                        ? theme.color.highlight
                        : theme.color.primary
                    }
                    size="tiny"
                  />
                </div>
                <CardTitle style={{ gridArea: `title` }}>
                  {event.longname || event.shortname || "missing region"}
                </CardTitle>
                <CardSubTitle style={{ gridArea: `subTitle` }}>
                  {event.name || "missing details"}
                </CardSubTitle>
                <CardSubTitle style={{ gridArea: `flights` }}>
                  {`${event.collectionPeriods.length} CDCPs` || "missing CDCPs"}
                </CardSubTitle>
              </CardContent>
            </button>
            <p
              style={{
                position: `absolute`,
                width: `100%`,
                height: `40px`,
                top: `1rem`,
                color: theme.color.base,
              }}
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
