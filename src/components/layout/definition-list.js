import React from "react"
import styled from "styled-components"
import PropTypes from "prop-types"

import { POSITIVE, NEGATIVE } from "../../utils/constants"
import { colors } from "../../theme"

const List = styled.dl`
  display: grid;
  grid-gap: 0.5rem;
  grid-template-columns: 100%;
  grid-auto-rows: auto;

  dt {
    width: 12rem;
    color: ${colors[NEGATIVE].altText};
  }
`

export default function DefinitionList({
  id,
  list,
  isCentered,
  mode = NEGATIVE,
}) {
  return (
    <section style={{ padding: `1rem` }} data-cy={`${id}-definition-list`}>
      <List>
        {list.map(row => (
          <React.Fragment key={row.title}>
            <dt>
              <label
                style={{
                  color: colors[mode].altText,
                }}
              >
                {row.title}
              </label>
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
  mode: PropTypes.oneOf([POSITIVE, NEGATIVE]),
}

DefinitionList.defaultProps = {
  isCentered: false,
}
