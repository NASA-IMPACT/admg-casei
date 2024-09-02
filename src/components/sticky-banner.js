import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"

const StickyBanner = ({ children, offsetCalculator, navRevealed }) => {
  const scrollDown = "scroll-down"
  const scrollUp = "scroll-up"
  const [scrollDirection, setScrollDirection] = useState(null)
  const [lastScroll, setLastScroll] = useState(0)
  const [startingPosition, setStartingPosition] = useState(null)
  const [offset, setOffset] = useState(0)
  const node = React.createRef()

  useEffect(() => {
    if (startingPosition === null) {
      // set position on first load
      windowResized()
    }

    window.addEventListener("scroll", scrollHandler)
    window.addEventListener("resize", windowResized)
    return () => {
      window.removeEventListener("scroll", scrollHandler)
      window.removeEventListener("resize", windowResized)
    }
  })

  const windowResized = () => {
    setStartingPosition(
      node.current?.parentNode?.offsetTop
        ? node.current.parentNode.offsetTop
        : 0
    )
  }

  const scrollHandler = () => {
    const currentScroll = window.scrollY
    if (currentScroll > lastScroll) {
      setScrollDirection(scrollDown)
    } else if (currentScroll < lastScroll) {
      setScrollDirection(scrollUp)
    }
    setLastScroll(currentScroll)
    setOffset(
      offsetCalculator(
        scrollDirection,
        startingPosition,
        currentScroll,
        lastScroll
      )
    )
  }

  return (
    <div
      ref={node}
      css={`
        position: ${navRevealed ? "fixed" : "sticky"};
        top: 0;
        left: 0;
        right: 0;
        z-index: 3;
        transition: top 0.2s;
        top: ${!navRevealed && offset};
      `}
    >
      {children}
    </div>
  )
}

StickyBanner.propTypes = {
  children: PropTypes.element,
  hideAfter: PropTypes.number,
  offsetCalculator: PropTypes.func,
  navRevealed: PropTypes.bool,
}

export default StickyBanner
