import React from "react"
import PropTypes from "prop-types"

import { AirborneRemoteSensors } from "./icons"
import theme from "../utils/theme"

export default function Timeline({ events, timelineAction, activeMilestone }) {
  console.log("events", events)
  return (
    <section
      data-cy="milestone-timeline"
      style={{ whiteSpace: `nowrap`, borderTop: `1px solid gray` }}
    >
      <ol
        style={{
          width: `100%`,
          padding: `8rem 0 2rem 0`,
          transition: `all 1s`,
          margin: `0`,
          display: `flex`,
          flexWrap: `nowrap`,
        }}
      >
        {events.map(event => (
          <li
            key={event.id}
            style={{
              position: `relative`,
              display: `flex`,
              listStyleType: `none`,
              width: `200px`,
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
                background: `white`,
              }}
            ></div>
            <a
              style={{
                position: `absolute`,
                bottom: `2rem`,
                width: `200px`,
                padding: `.5rem`,
                fontSize: `1rem`,
                whiteSpace: `normal`,
                color: `black`,
                background: `white`,
                opacity: activeMilestone === event.id ? 1 : 0.7,
              }}
              onClick={() => timelineAction(event.id)}
            >
              <div
                style={{
                  display: `grid`,
                  gap: `.5rem`,
                  gridTemplateColumns: `30px 1fr`,
                }}
              >
                {/* TODO: replace with the correct icon */}
                <AirborneRemoteSensors
                  color={
                    activeMilestone === event.id ? "red" : theme.color.primary
                  }
                  size="tiny"
                />
                <p>{event.longname || event.shortname}</p>
              </div>
            </a>
            <p
              style={{
                position: `absolute`,
                width: `100%`,
                height: `40px`,
                top: `1rem`,
                color: `white`,
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

Timeline.propTypes = {
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
