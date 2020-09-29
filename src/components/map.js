import React, { useRef, useEffect } from "react"
import mapbox from "mapbox-gl"
import PropTypes from "prop-types"

export default function Map({ style, map, setMap, children }) {
  const containerRef = useRef()

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
    })

    return () => {
      if (map) {
        map.remove()
      }
    }
  }, [])

  return (
    <div style={style} ref={containerRef}>
      {map && children}
    </div>
  )
}

Map.propTypes = {
  style: PropTypes.object,
  map: PropTypes.object,
  setMap: PropTypes.func.isRequired,
  children: PropTypes.element,
}
