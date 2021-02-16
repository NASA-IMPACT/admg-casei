import { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { navigate } from "gatsby"

import { colors } from "../../utils/theme"

export default function HoverLayer({ id, map, sourceId, isDrawing }) {
  const [layer, setLayer] = useState(null)

  // TODO: why does this not work with setState?
  // const [hoveredId, hoveredId = ] = useState(null)

  useEffect(() => {
    const l = map.addLayer({
      id: `${id}-hover-layer`,
      type: "fill",
      source: sourceId,
      layout: {},
      paint: {
        "fill-color": colors.darkTheme.background,
        "fill-opacity": [
          "case",
          ["boolean", ["feature-state", "hover"], false],
          0.75,
          0,
        ],
      },
    })

    setLayer(l)

    return () => {
      if (layer) map.removeLayer(`${id}-hover-layer`)
    }
  }, [])

  useEffect(() => {
    let hoveredId // why does this not work with setState?

    const onClick = e => {
      // only make features clickable when not drawing
      if (!isDrawing) {
        navigate(`/campaign/${e.features[0].properties.id}`)
      }
    }

    const onMouseMove = e => {
      // only show hover effect when not drawing
      if (!isDrawing && e.features.length > 0) {
        if (hoveredId) {
          map.setFeatureState(
            { source: sourceId, id: hoveredId },
            { hover: false }
          )
        }

        hoveredId = e.features[0].id // why does this not work with setState?

        map.setFeatureState(
          { source: sourceId, id: hoveredId },
          { hover: true }
        )
      }
    }

    const onMouseLeave = () => {
      if (hoveredId) {
        map.setFeatureState(
          { source: sourceId, id: hoveredId },
          { hover: false }
        )
      }
      hoveredId = null
    }

    map.on("mousemove", `${id}-hover-layer`, onMouseMove)
    map.on("mouseleave", `${id}-hover-layer`, onMouseLeave)
    map.on("click", `${id}-hover-layer`, onClick)

    return () => {
      map.off("mousemove", `${id}-hover-layer`, onMouseMove)
      map.off("mouseleave", `${id}-hover-layer`, onMouseLeave)
      map.off("click", `${id}-hover-layer`, onClick)
    }
  }, [isDrawing])

  return null
}

HoverLayer.propTypes = {
  id: PropTypes.string.isRequired,
  map: PropTypes.object,
  sourceId: PropTypes.string,
  isDrawing: PropTypes.bool.isRequired,
}
