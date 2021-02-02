import React from "react"
import styled from "styled-components"
import PropTypes from "prop-types"

import theme from "../../utils/theme"
import { Label } from "../../theme/typography"
const List = styled.dl`
  display: grid;
  grid-gap: 0.5rem;
  grid-template-columns: min-content 1fr;
  grid-auto-rows: auto;

  dt {
    width: 12rem;
    color: ${theme.color.gray};
  }
`

export default function DefinitionList({ id, list, isCentered }) {
  return (
    <section style={{ padding: `1rem` }} data-cy={`${id}-definition-list`}>
      <List>
        {list.map(row => (
          <React.Fragment key={row.title}>
            <dt>
              <Label>{row.title}</Label>
            </dt>
            <dd
              style={
                isCentered ? { display: `flex`, justifyContent: `center` } : {}
              }
            >
              {row.content}
            </dd>
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
  isCentered: PropTypes.bool,
}

DefinitionList.defaultProps = {
  isCentered: false,
}
