import React from "react"
import PropTypes from "prop-types"
import { AirborneRemoteSensors } from "./icons"

export default function Timeline({ events, timelineAction, activeMilestone }) {
  console.log("events", activeMilestone)
  return (
    <section
      data-cy="milestone-timeline"
      style={{ whiteSpace: `nowrap`, borderTop: `1px solid gray` }}
    >
      <ol
        style={{
          width: `100vw`,
          paddingTop: `10rem`,
          transition: `all 1s`,
        }}
      >
        {events.map(event => (
          <li
            key={event.id}
            style={{
              position: `relative`,
              display: `inline-block`,
              listStyleType: `none`,
              width: `200px`,
              height: `2px`,
              background: `#fff`,
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
                width: `90%`,
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
                <AirborneRemoteSensors
                  color={activeMilestone === event.id ? "red" : "black"}
                  size="tiny"
                />
                <p>{event.longname}</p>
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
