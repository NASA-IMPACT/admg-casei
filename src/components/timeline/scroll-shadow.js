import React from "react"
import PropTypes from "prop-types"
import styled, { css } from "styled-components"

const beforeScroll = css`
  &::before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 20px;
    background: linear-gradient(
      to left,
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 0.15)
    );
  }
`

const afterScroll = css`
  &::after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    width: 20px;
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 0.15)
    );
  }
`

const HorizontalShadow = styled.div`
  width: 100%;
  position: absolute;
  z-index: 3; /* placed above chart and background */

  ${props => props.showStart && beforeScroll};

  ${props => props.showEnd && afterScroll};
`

export const ScrollShadow = ({ children, scrollRef }) => {
  const [showStart, setShowStart] = React.useState(false)
  const [showEnd, setShowEnd] = React.useState(false)

  React.useEffect(() => {
    const onScroll = () => {
      const {
        scrollWidth = 0,
        scrollLeft = 0,
        offsetWidth = 0,
      } = scrollRef.current || {}
      setShowStart(scrollLeft > 0)
      setShowEnd(scrollLeft + offsetWidth < scrollWidth)
    }
    onScroll()
    const node = scrollRef.current

    node.addEventListener("scroll", onScroll)
    return () => {
      node.removeEventListener("scroll", onScroll)
    }
  }, [scrollRef])

  return (
    <HorizontalShadow showEnd={showEnd} showStart={showStart}>
      {children}
    </HorizontalShadow>
  )
}

ScrollShadow.propTypes = {
  children: PropTypes.element,
  scrollRef: PropTypes.oneOfType([
    // Either a function
    PropTypes.func,
    // Or the instance of a DOM native element (see the note about SSR)
    PropTypes.shape({ current: PropTypes.any }),
  ]),
}
