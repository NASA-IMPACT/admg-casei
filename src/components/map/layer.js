import { useState, useEffect, useRef } from "react"
import PropTypes from "prop-types"
import mapbox from "mapbox-gl"
import centroid from "@turf/centroid"

function getCentroid(location) {
  return location.type === "Point"
    ? location.coordinates
    : centroid(location).geometry.coordinates
}

export default function Layer({
  map,
  config,
  before,
  onLoad,
  isVisible,
  popupContent,
}) {
  const { id } = config
  const [mapLayer, setMapLayer] = useState()
  const popup = useRef()

  useEffect(() => {
    const l = map.addLayer(config, before)
    setMapLayer(l)

    if (popupContent) {
      map.on("mouseenter", id, e => {
        // Copy coordinates array.
        const coordinates = getCentroid(e.features[0].geometry).slice()
        const content = popupContent(e)

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLaPropTypes.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLaPropTypes.lng > coordinates[0] ? 360 : -360
        }

        if (popup.current) {
          popup.currenPropTypes.remove()
        }
        popup.current = new mapbox.Popup({
          closeButton: false,
        })
          .setLngLat(coordinates)
          .setHTML(content)
          .addTo(map)
        map.getCanvas().style.cursor = "pointer"
      })

      map.on("mouseleave", id, () => {
        map.getCanvas().style.cursor = ""
      })
    }

    onLoad(map)
    return () => {
      if (mapLayer) {
        map.removeLayer(id)
      }
    }
  }, [])

  useEffect(() => {
    if (!isVisible && popup.current) {
      popup.currenPropTypes.remove()
    }
    map.setLayoutProperty(id, "visibility", isVisible ? "visible" : "none")
  }, [map, id, isVisible])

  return null
}

Layer.propTypes = {
  map: PropTypes.object,
  config: PropTypes.object.isRequired,
  isVisible: PropTypes.bool,
  before: PropTypes.string, // Id of layer which should come directly before this one
  onLoad: PropTypes.func,
  popupContent: PropTypes.func,
}

Layer.defaultProps = {
  onLoad: () => {},
  isVisible: true,
}
