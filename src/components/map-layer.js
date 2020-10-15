import { useState, useEffect } from "react"
import PropTypes from "prop-types"
import theme from "../utils/theme"

export default function MapLayer({ id, bbox, map, sourceId }) {
  const [layer, setLayer] = useState(null)

  useEffect(() => {
    const l = map.addLayer({
      id: `${id}-layer`,
      type: "line",
      source: sourceId,
      layout: {},
      paint: {
        "line-color": theme.color.base,
        "line-opacity": 0.8,
        "line-width": 2,
      },
    })

    setLayer(l)

    return () => {
      if (layer) map.removeLayer(`${id}-layer`)
    }
  }, [])

  useEffect(() => {
    if (-180 > bbox[0] || bbox[0] > 180) {
      // in case we do not have a valid bbox (no data?)
      // show whole world
      map.flyTo(map.cameraForBounds([-180, -75, 180, 75]))
    } else {
      const { width } = map.getContainer().getBoundingClientRect()

      switch (id) {
        case "campaign":
          // map should show campaign in the right area of the map
          map.flyTo(
            map.cameraForBounds(bbox, {
              padding: { top: 200, right: 25, bottom: 25, left: width / 1.5 },
            })
          )
          break

        case "explore":
          // map should show all objects centered
          map.flyTo(
            map.cameraForBounds(bbox, {
              padding: { top: 25, right: 25, bottom: 25, left: 25 },
            })
          )
          break
        default:
          break
      }
    }
  }, [bbox])

  return null
}

MapLayer.propTypes = {
  id: PropTypes.string.isRequired,
  sourceId: PropTypes.string,
  bbox: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  map: PropTypes.object,
}
