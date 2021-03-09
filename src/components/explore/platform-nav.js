import React from "react"
import PropTypes from "prop-types"

const InpageLink = props => (
  <li
    css={`
      margin: 0 1rem 0 0;
    `}
  >
    <a
      href={`#${props.id}`}
      css={`
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

const PlatformNav = ({ items }) => (
  <div
    css={`
      position: sticky;
      top: 0;
      z-index: 1000;
    `}
    data-cy="inpage-nav"
  >
    <div
      css={`
        margin: 0 -6rem;
        padding: 0 6rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
      `}
    >
      <nav aria-label="inpage-scroll">
        <ul
          css={`
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
            margin: 0;
            padding: 0.25rem 0;
            list-style: none;
          `}
        >
          {items.map(item => (
            <InpageLink key={item} id={item}>
              {item}
            </InpageLink>
          ))}
        </ul>
      </nav>
    </div>
  </div>
)

PlatformNav.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
}

export default PlatformNav
