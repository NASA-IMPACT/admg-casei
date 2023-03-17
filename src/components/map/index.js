import React, { useRef, useState, useEffect } from "react"
import PropTypes from "prop-types"
import mapbox from "mapbox-gl"
import * as envelope from "@turf/envelope"

export default function Map({ height, basemap, children }) {
  const containerRef = useRef()

  const [map, setMap] = useState(null)

  useEffect(() => {
    mapbox.accessToken = process.env.GATSBY_MAPBOX_TOKEN
    const m = new mapbox.Map({
      container: containerRef.current,
      style: basemap || "mapbox://styles/mapbox/satellite-streets-v11/",
      zoom: 1,
      center: [0, 0],
    })

    // conditional if logic to check if children exist
    if (children.length > 0) {
      // extract geojson from all objects in children
      const geojsons = children.map(child => child.props.geojson)

      // create a featureCollection from the geojsons
      const fc = {
        type: "FeatureCollection",
        features: geojsons,
      }

      // get width
      const { width } = m.getContainer().getBoundingClientRect()

      // use turf envelope to calculate a bounding box that fits all boxes
      if (fc.features[0]) {
        const envelopBox = envelope.default(fc)

        // map should show bounding boxes in the right area of the map
        m.flyTo(
          m.cameraForBounds(envelopBox.bbox, {
            padding: { top: 200, right: 25, bottom: 25, left: width / 1.5 },
          })
        )
      }


    }

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
  basemap: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
}
