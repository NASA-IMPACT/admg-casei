import React from "react"
import PropTypes from "prop-types"
import { FEEDBACK_FORM_URL, POSITIVE } from "../utils/constants"
import { colors, breakpoints } from "../theme"
import Button from "../components/button"
import StickyBanner from "./sticky-banner"

const InpageLink = props => (
  <li
    css={`
      margin: 0 1rem 0 0;
      width: fit-content;
    `}
  >
    <a
      href={`#${props.id}`}
      css={`
        color: ${colors[POSITIVE].text};
        font-weight: 600;
      `}
      data-cy={`${props.id}-inpage-link`}
    >
      {props.children}
    </a>
  </li>
)

InpageLink.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
}

const InpageNav = ({ shortname, items }) => {
  const offsetCalculator = (
    scrollDirection,
    startingPosition,
    _,
    lastScroll
  ) => {
    const mainHeaderHeight = document.getElementById("main-header").clientHeight
    return scrollDirection === "scroll-up" &&
      lastScroll >= startingPosition - mainHeaderHeight
      ? `${mainHeaderHeight}px`
      : 0
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
              @media screen and (min-width: ${breakpoints["sm"]}) {
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
              <InpageLink key={item.id} id={item.id}>
                {item.label}
              </InpageLink>
            ))}
          </ul>
          {
            <Button
              action={() => {
                window.open(FEEDBACK_FORM_URL, "_blank")
              }}
              mode={POSITIVE}
            >
              Feedback
            </Button>
          }
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
