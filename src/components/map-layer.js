import { useEffect } from "react"
import parse from "wellknown"
import * as turf from "@turf/turf"
import theme from "../utils/theme"

export default function MapLayer({ bounds, map }) {
  useEffect(() => {
    const geometry = parse(bounds)

    const source = map.addSource("campaign-bbox", {
      type: "geojson",
      data: {
        type: "Feature",
        geometry: geometry,
      },
    })

    const layer = map.addLayer({
      id: "campaign-bbox",
      type: "line",
      source: "campaign-bbox",
      layout: {},
      paint: {
        "line-color": theme.color.base,
        "line-opacity": 0.8,
        "line-width": 2,
      },
    })

    const bbox = turf.bbox(geometry)
    const { width } = map.getContainer().getBoundingClientRect()
    const newCameraView = map.cameraForBounds(bbox, {
      padding: { top: 200, right: 25, bottom: 25, left: width / 1.5 },
    })

    map.flyTo(newCameraView)

    return () => {
      if (layer) {
        map.removeLayer("campaign-bbox")
      }
      if (source) {
        map.removeSource("campaign-bbox")
      }
    }
  }, [])

  return null
}
