import { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { navigate } from "gatsby"

import theme from "../../utils/theme"

export default function HoverLayer({ id, map, sourceId }) {
  const [layer, setLayer] = useState(null)
  // const [hoveredId, hoveredId = ] = useState(null)

  useEffect(() => {
    const l = map.addLayer({
      id: `${id}-hover-layer`,
      type: "fill",
      source: sourceId,
      layout: {},
      paint: {
        "fill-color": theme.color.secondary,
        "fill-opacity": [
          "case",
          ["boolean", ["feature-state", "hover"], false],
          0.75,
          0,
        ],
      },
    })

    setLayer(l)

    let hoveredId // TODO: why does this not work with setState?

    map.on("mousemove", `${id}-hover-layer`, function (e) {
      if (e.features.length > 0) {
        if (hoveredId) {
          map.setFeatureState(
            { source: sourceId, id: hoveredId },
            { hover: false }
          )
        }

        hoveredId = e.features[0].id

        map.setFeatureState(
          { source: sourceId, id: hoveredId },
          { hover: true }
        )
      }
    })

    map.on("mouseleave", `${id}-hover-layer`, function () {
      if (hoveredId) {
        map.setFeatureState(
          { source: sourceId, id: hoveredId },
          { hover: false }
        )
      }
      hoveredId = null
    })

    map.on("click", `${id}-hover-layer`, function (e) {
      navigate(`/campaign/${e.features[0].properties.id}`)
    })

    return () => {
      if (layer) map.removeLayer(`${id}-hover-layer`)
    }
  }, [])

  return null
}

HoverLayer.propTypes = {
  id: PropTypes.string.isRequired,
  sourceId: PropTypes.string,
  map: PropTypes.object,
}
