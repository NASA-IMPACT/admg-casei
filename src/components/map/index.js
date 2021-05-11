import React, { useRef, useState, useEffect } from "react"
import PropTypes from "prop-types"
import mapbox from "mapbox-gl"

export default function Map({ height, children }) {
  const containerRef = useRef()

  const [map, setMap] = useState(null)

  useEffect(() => {
    mapbox.accessToken = process.env.GATSBY_MAPBOX_TOKEN
    const m = new mapbox.Map({
      container: containerRef.current,
      style: `mapbox://styles/mapbox/satellite-streets-v11/`,
      zoom: 1,
      center: [0, 0],
    })

    m.on("load", () => {
      setMap(m)

      if (process.env.NODE_ENV === "development") {
        // makes map accessible in console for debugging
        window.map = m
      }
    })

    return () => {
      if (map) {
        map.remove()
      }
    }
  }, [])

  useEffect(() => {
    if (map) {
      map.resize()
    }
    return () => {
      if (map) {
        map.remove()
      }
    }
  }, [height])

  return (
    <div
      css={`
        z-index: -1;
        grid-area: 1 / 1 / 1 / 4;
        height: ${height}px;
        position: relative;
      `}
      ref={containerRef}
      data-cy="mapboxgl-map"
    >
      {map &&
        children &&
        React.Children.map(children, child =>
          React.cloneElement(child, {
            map,
          })
        )}
    </div>
  )
}

Map.propTypes = {
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
}
