import React from "react"
import styled from "styled-components"
import PropTypes from "prop-types"

import { colors } from "../../utils/theme"

const List = styled.dl`
  display: grid;
  grid-gap: 0.5rem;
  grid-template-columns: min-content 1fr;
  grid-auto-rows: auto;

  dt {
    width: 12rem;
    color: ${colors.darkTheme.altText};
  }
`

export default function DefinitionList({ id, list, isCentered, isLight }) {
  return (
    <section style={{ padding: `1rem` }} data-cy={`${id}-definition-list`}>
      <List>
        {list.map(row => (
          <React.Fragment key={row.title}>
            <dt>
              <label
                style={{
                  color: isLight
                    ? colors.lightTheme.altText
                    : colors.darkTheme.altText,
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
  isLight: PropTypes.bool,
}

DefinitionList.defaultProps = {
  isCentered: false,
}
