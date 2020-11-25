import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import MapboxDraw from "@mapbox/mapbox-gl-draw"

import DrawControlButton from "./draw-control-button"
import { drawStyles } from "./mapbox-gl-draw-styles"

export default function AoiControl({
  isDrawing,
  setIsDrawing,
  aoi,
  setAoi,
  map,
}) {
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

  useEffect(() => {
    if (drawControl && !aoi) {
      drawControl.deleteAll()
    }
  }, [aoi])

  return (
    drawControl && (
      <DrawControlButton
        drawControl={drawControl}
        isDrawing={isDrawing}
        setIsDrawing={setIsDrawing}
        setAoi={setAoi}
      />
    )
  )
}

AoiControl.propTypes = {
  map: PropTypes.object,
  isDrawing: PropTypes.bool.isRequired,
  setIsDrawing: PropTypes.func.isRequired,
  aoi: PropTypes.shape({
    type: PropTypes.oneOf(["Feature"]),
    id: PropTypes.string.isRequired,
    geometry: PropTypes.object.isRequired,
    properties: PropTypes.object.isRequired,
  }),
  setAoi: PropTypes.func.isRequired,
}
