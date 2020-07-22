import React from "react"
import styled from "styled-components"
import PropTypes from "prop-types"
import { headingAlt } from "@devseed-ui/typography"
import { glsp } from "@devseed-ui/theme-provider"

import theme from "../../utils/theme"

const List = styled.dl`
  display: grid;
  grid-gap: ${glsp(1 / 2)};
  grid-template-columns: min-content 1fr;
  grid-auto-rows: auto;

  dt {
    ${headingAlt}
    font-size: 0.75rem;
    line-height: 1rem;
    width: 12rem;
    font-weight: ${theme.type.base.bold};
    color: ${theme.color.gray};
  }

  dd {
    font-size: 0.875rem;
    line-height: 1rem;
  }
`

export default function DefinitionList({ id, heading, list }) {
  return (
    <section style={{ padding: `1rem` }} data-cy={`${id}-definition-list`}>
      {heading && <h1>{heading}</h1>}
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
  heading: PropTypes.string,
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
