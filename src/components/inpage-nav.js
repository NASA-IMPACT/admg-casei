import React, { useEffect, useState, useCallback } from "react"
import PropTypes from "prop-types"
import { FEEDBACK_FORM_URL, POSITIVE } from "../utils/constants"
import { colors, breakpoints } from "../theme"
import Button from "../components/button"
import StickyBanner from "./sticky-banner"

const InpageLink = ({ id, children, onClick, active }) => (
  <li
    css={`
      margin: 0 1rem 0 0;
      width: fit-content;
      display: none;
      white-space: pre;
      @media screen and (min-width: ${breakpoints["xs"]}) {
        display: list-item;
      }
    `}
  >
    <a
      href={`#${id}`}
      onClick={onClick}
      css={`
        color: ${active ? colors[POSITIVE].linkText : colors[POSITIVE].text};
        font-weight: 500;
        border-radius: 0.25em;
        padding: 0.1em 0.4em;
        transition: all 0.2s;
        text-decoration: "none";
        cursor: pointer;
      `}
      data-cy={`${id}-inpage-link`}
      aria-current={active ? "true" : undefined}
    >
      {children}
    </a>
  </li>
)

InpageLink.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  active: PropTypes.bool,
}

const InpageNav = ({ shortname, items }) => {
  const [activeId, setActiveId] = useState(items[0]?.id || "")

  const handleLinkClick = useCallback(
    id => e => {
      e.preventDefault()
      const el = document.getElementById(id)
      if (el) {
        const header = document.getElementById("main-header")
        const headerHeight = header ? header.clientHeight : 0
        const y =
          el.getBoundingClientRect().top + window.scrollY - headerHeight - 8
        window.scrollTo({ top: y, behavior: "smooth" })
      }
    },
    []
  )

  useEffect(() => {
    const handleScroll = () => {
      const header = document.getElementById("main-header")
      const headerHeight = header ? header.clientHeight : 0
      let current = items[0]?.id
      for (const item of items) {
        const el = document.getElementById(item.id)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top - headerHeight <= 8) {
            current = item.id
          }
        }
      }
      setActiveId(current)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [items])

  const offsetCalculator = (
    scrollDirection,
    startingPosition,
    currentScroll,
    lastScroll
  ) => {
    const mainHeader = document.getElementById("main-header")
    const mainHeaderHeight = mainHeader ? mainHeader.clientHeight : 0
    if (
      scrollDirection === "scroll-up" &&
      lastScroll >= startingPosition - mainHeaderHeight
    ) {
      return `${mainHeaderHeight}px`
    }
    if (scrollDirection === "scroll-down" && currentScroll > 250) {
      return `-${mainHeaderHeight}px`
    }
    return `${mainHeaderHeight}px`
  }

  return (
    <StickyBanner offsetCalculator={offsetCalculator}>
      <div
        css={`
          z-index: 1000;
        `}
      >
        <nav
          aria-label="inpage-scroll"
          css={`
            margin: 0 -6rem;
            padding: 0 6rem;
            @media screen and (max-width: ${breakpoints["sm"]}) {
              margin: 0 -2rem;
              padding: 0 2rem;
            }
            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color: ${colors[POSITIVE].background};
            color: ${colors[POSITIVE].text};
          `}
          data-cy="inpage-nav"
        >
          <ul
            css={`
              display: flex;
              flex-direction: column;
              justify-content: flex-start;
              align-items: flex-start;
              margin: 0;
              padding: 0.25rem 0;
              list-style: none;
              overflow: auto;
              @media screen and (min-width: ${breakpoints["xs"]}) {
                flex-direction: row;
                align-items: center;
              }
            `}
          >
            <li
              css={`
                margin: 0 1rem 0 0;
              `}
            >
              <a
                href="#top"
                onClick={e => {
                  e.preventDefault()
                  window.scrollTo({ top: 0, behavior: "smooth" })
                }}
                css={`
                  padding-right: 0;
                  font-size: 1.25rem;
                  @media screen and (min-width: ${breakpoints["sm"]}) {
                    padding-right: 1rem;
                    font-size: 2rem;
                  }
                  color: ${colors[POSITIVE].text};
                `}
                data-cy={`top-inpage-link`}
              >
                {shortname}
              </a>
            </li>
            {items.map(item => (
              <InpageLink
                key={item.id}
                id={item.id}
                onClick={handleLinkClick(item.id)}
                active={activeId === item.id}
              >
                {item.label}
              </InpageLink>
            ))}
          </ul>
          <Button
            action={() => {
              window.open(FEEDBACK_FORM_URL, "_blank")
            }}
            mode={POSITIVE}
          >
            Feedback
          </Button>
        </nav>
      </div>
    </StickyBanner>
  )
}

InpageNav.propTypes = {
  shortname: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  path: PropTypes.string.isRequired,
}

export default InpageNav
