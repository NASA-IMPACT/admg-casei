import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import Button from "../button"
import { POSITIVE } from "../../utils/constants"

const ControlBox = styled.div`
  display: inline-block;
  text-align: right;
  position: absolute;
  left: 5px;
  bottom: 0px;
  margin-bottom: 5px;
  font-weight: ${props => (props.checked ? 600 : 400)};
  font-family: "Titillium Web", sans-serif;
`

export const MapViewControl = ({ onClick, is3DViewEnabled }) => (
  <ControlBox>
    <Button action={onClick} mode={POSITIVE} noBorder>
      View in {is3DViewEnabled ? "2D" : "3D"}
    </Button>
  </ControlBox>
)

MapViewControl.propTypes = {
  onClick: PropTypes.func,
  is3DViewEnabled: PropTypes.bool.isRequired,
}
