import React from "react"
import PropTypes from "prop-types"

const InpageLink = props => (
  <li
    css={`
      margin: 0 1rem 1rem 0;
      white-space: nowrap;
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
  <nav aria-label="inpage-scroll" data-cy="inpage-nav">
    <ul
      css={`
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        margin: 2rem 0;
        padding: 0.25rem 0;
        list-style: none;
        /* flex-direction: row; */
        flex-wrap: wrap;
      `}
    >
      {items.map(item => (
        <InpageLink key={item.id} id={item.id}>
          {item.label}
        </InpageLink>
      ))}
    </ul>
  </nav>
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
