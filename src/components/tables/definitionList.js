import React from "react"
import styled from "styled-components"
import PropTypes from "prop-types"

import theme from "../../utils/theme"

const List = styled.dl`
  display: grid;
  grid-gap: 0.5rem;
  grid-template-columns: min-content 1fr;
  grid-auto-rows: auto;

  dt {
    font-feature-settings: "pnum" 0; /* Use proportional numbers */
    text-transform: uppercase;
    font-size: 0.75rem;
    line-height: 1rem;
    width: 12rem;
    color: ${theme.color.gray};
  }

  dd {
    font-size: 0.875rem;
    line-height: 1rem;
  }
`

export default function DefinitionList({ id, list }) {
  return (
    <section style={{ padding: `1rem` }} data-cy={`${id}-definition-list`}>
      <List>
        {list.map(row => (
          <React.Fragment key={row.title}>
            <dt>{row.title}</dt>
            <dd>{row.content}</dd>
          </React.Fragment>
        ))}
      </List>
    </section>
  )
}

DefinitionList.propTypes = {
  id: PropTypes.string,
  list: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      content: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.node,
      ]),
    })
  ),
}
