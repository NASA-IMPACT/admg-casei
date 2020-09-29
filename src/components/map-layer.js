import { useEffect } from "react"
import parse from "wellknown"

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

    const { width } = map.getContainer().getBoundingClientRect()

    map.fitBounds(geometry.coordinates.flat(), {
      padding: { top: 200, bottom: 50, left: 50, right: 50 },
      offset: [width / 5, 0],
    })

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
