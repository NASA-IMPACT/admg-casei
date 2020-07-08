import React from "react"
import styled from "styled-components"
import PropTypes from "prop-types"
import { headingAlt } from "@devseed-ui/heading"
import { glsp } from "@devseed-ui/base"

import theme from "../utils/theme"

const SimpleTable = styled.dl`
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

export default function FieldInfo({ heading, tableData }) {
  return (
    <section style={{ padding: `1rem` }}>
      <h1>{heading}</h1>
      <SimpleTable>
        {tableData.map(row => (
          <React.Fragment key={row.title}>
            <dt>{row.title}</dt>
            <dd>{row.content}</dd>
          </React.Fragment>
        ))}
      </SimpleTable>
    </section>
  )
}

FieldInfo.propTypes = {
  heading: PropTypes.string,
  tableData: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      content: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })
  ),
}
