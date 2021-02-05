import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

const Button = styled.button`
  width: 100%;
  background-position: left 5.5px bottom 50%;
  padding-left: 29px;
  padding-right: 9px;
`

const DrawControlButton = ({
  drawControl,
  isDrawing,
  setIsDrawing,
  setAoi,
}) => {
  const startDrawing = () => {
    drawControl.changeMode("draw_polygon")
    setIsDrawing(true)
  }

  const saveAndExit = () => {
    drawControl.changeMode("simple_select")
    setIsDrawing(false)
    setAoi(drawControl.getAll().features[0])
  }

  const cancelAndExit = () => {
    drawControl.deleteAll()
    drawControl.changeMode("simple_select")
    setIsDrawing(false)
    setAoi(null)
  }

  const handlePolygonClick = () => {
    if (isDrawing) {
      saveAndExit()
    } else {
      startDrawing()
    }
  }

  const hasDrawing = !!(drawControl.getAll().features.length > 0)

  return (
    <div style={{ zIndex: `0` }} className="mapboxgl-ctrl-top-right">
      <div
        style={{ minWidth: `9rem` }}
        className="mapboxgl-ctrl mapboxgl-ctrl-group"
      >
        <Button
          className={`mapbox-gl-draw_ctrl-draw-btn mapbox-gl-draw_polygon ${
            isDrawing ? "active" : ""
          }`}
          onClick={handlePolygonClick}
          isDrawing={isDrawing}
        >
          {isDrawing
            ? "Save"
            : hasDrawing
            ? "Draw new Polygon"
            : "Draw Polygon"}
        </Button>

        {hasDrawing && (
          <Button
            className={`mapbox-gl-draw_ctrl-draw-btn mapbox-gl-draw_trash ${
              isDrawing ? "active" : ""
            }`}
            onClick={cancelAndExit}
            isDrawing={isDrawing}
          >
            {isDrawing ? "Cancel" : "Delete Polygon"}
          </Button>
        )}
      </div>
    </div>
  )
}

DrawControlButton.propTypes = {
  drawControl: PropTypes.object.isRequired,
  isDrawing: PropTypes.bool.isRequired,
  setIsDrawing: PropTypes.func.isRequired,
  setAoi: PropTypes.func.isRequired,
}

export default DrawControlButton
