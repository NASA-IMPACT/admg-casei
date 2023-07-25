import React from "react"
import PropTypes from "prop-types"
// import Button from "../button"
import { POSITIVE } from "../../utils/constants"
import { Slice } from "gatsby"

const DrawControlButton = ({
  drawControl,
  isDrawing,
  setIsDrawing,
  setAoi,
}) => {
  const hasDrawing = !!(drawControl.getAll().features.length > 0)

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
    drawControl.trash()
    drawControl.changeMode("simple_select")
    setIsDrawing(false)
  }

  const deleteDrawing = () => {
    drawControl.deleteAll()
    setAoi(null)
  }

  const handlePolygonClick = () => {
    if (isDrawing) {
      saveAndExit()
    } else {
      startDrawing()
    }
  }

  const handleDeleteClick = () => {
    if (isDrawing) {
      cancelAndExit()
    } else {
      deleteDrawing()
    }
  }

  return (
    <div
      css={`
         {
          z-index: 0;
          position: absolute;
          top: 0;
          right: 0;
        }
      `}
    >
      <div
        css={`
           {
            min-width: 9rem;
            margin: 0.5rem;
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
          }
        `}
      >
        <Slice
          alias="button"
          isSecondary={!isDrawing}
          mode={POSITIVE}
          action={handlePolygonClick}
        >
          {isDrawing
            ? "Save"
            : hasDrawing
            ? "Draw new Polygon"
            : "Draw Polygon"}
        </Slice>

        {hasDrawing && (
          <Slice
            alias="button"
            isSecondary
            mode={POSITIVE}
            action={handleDeleteClick}
          >
            {isDrawing ? "Cancel" : "Delete Polygon"}
          </Slice>
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
