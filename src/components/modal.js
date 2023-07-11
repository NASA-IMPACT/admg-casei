import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: ${({ isOpen }) => (isOpen ? `flex` : `none`)};
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  transition: opacity 400ms ease-in;
`

const Component = styled.div`
  width: 80%;
  height: 84vh;
  position: relative;
  overflow: hidden;
  max-height: 720px;
  border-radius: 3px;
  background: #f2f7fb;
  pointer-events: auto;
`

export const Modal = ({ handleClose, isOpen, children, Custom }) => {
  return (
    <Backdrop
      isOpen={isOpen}
      onClick={e => (e.target === e.currentTarget ? handleClose() : null)}
    >
      {Custom ? <Custom /> : <Component>{children}</Component>}
    </Backdrop>
  )
}

Modal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  children: PropTypes.element,
  Custom: PropTypes.element,
}
