import { useEffect } from "react"
import PropTypes from "prop-types"
import * as turf from "@turf/turf"
import theme from "../utils/theme"

export default function MapLayer({ id, map, sourceId, geojson }) {
  useEffect(() => {
    const layer = map.addLayer({
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

    return () => {
      if (layer) map.removeLayer(`${id}-layer`)
    }
  }, [])

  useEffect(() => {
    const bbox = turf.bbox(geojson)
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
  }, [geojson])

  return null
}

MapLayer.propTypes = {
  id: PropTypes.string.isRequired,
  sourceId: PropTypes.string,
  geojson: PropTypes.object,
  map: PropTypes.object,
}
