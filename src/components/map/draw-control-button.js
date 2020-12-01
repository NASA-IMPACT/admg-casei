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

  const handleClick = () => {
    if (isDrawing) {
      saveAndExit()
    } else {
      startDrawing()
    }
  }

  return (
    <div style={{ zIndex: `0` }} className="mapboxgl-ctrl-top-right">
      <div className="mapboxgl-ctrl mapboxgl-ctrl-group">
        <Button
          className={`mapbox-gl-draw_ctrl-draw-btn mapbox-gl-draw_polygon ${
            isDrawing ? "active" : ""
          }`}
          onClick={handleClick}
          isDrawing={isDrawing}
        >
          {isDrawing ? "Save" : "Draw Polygon"}
        </Button>
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
