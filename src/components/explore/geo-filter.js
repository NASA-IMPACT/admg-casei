import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import MapboxDraw from "@mapbox/mapbox-gl-draw"

import DrawControlButton from "../map/draw-control-button"
import { drawStyles } from "../map/mapbox-gl-draw-styles"

export default function GeoFilter({ isDrawing, setIsDrawing, map }) {
  const [drawControl, setDrawControl] = useState(null)

  useEffect(() => {
    const Draw = new MapboxDraw({
      modes: {
        ...MapboxDraw.modes,
      },
      displayControlsDefault: false,
      styles: drawStyles,
    })

    map.addControl(Draw, "top-left")
    setDrawControl(Draw)

    map.on("draw.modechange", () => {
      if (Draw.getMode() == "simple_select") {
        const data = Draw.getAll()
        const lastId = data.features[data.features.length - 1].id
        const previousIds = data.features
          .filter(f => f.geometry.type === "Polygon" && f.id !== lastId)
          .map(f => f.id)

        // keep only the last drawing, delete all previous
        Draw.delete(previousIds)
      }
    })
    return () => {}
  }, [])

  return (
    drawControl && (
      <DrawControlButton
        drawControl={drawControl}
        isDrawing={isDrawing}
        setIsDrawing={setIsDrawing}
      />
    )
  )
}

GeoFilter.propTypes = {
  map: PropTypes.object,
  isDrawing: PropTypes.bool.isRequired,
  setIsDrawing: PropTypes.func.isRequired,
}
