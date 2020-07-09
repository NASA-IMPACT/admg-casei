import React from "react"
import styled from "styled-components"
import PropTypes from "prop-types"
import { headingAlt } from "@devseed-ui/heading"

import theme from "../../utils/theme"

const Table = styled.table`
  th {
    ${headingAlt}
    font-size: 0.75rem;
    line-height: 1.5rem;
    font-weight: ${theme.type.base.bold};
    color: ${theme.color.gray};
  }
  th:first-child {
    max-width: 1.5rem;
  }

  td {
    font-size: 0.875rem;
    line-height: 1.5rem;
  }
  td:first-child {
    max-width: 1.5rem;
  }
`

export default function SimpleTable({ heading, tableHeaders, tableRows }) {
  return (
    <section style={{ padding: `1rem` }}>
      {heading && <h1>{heading}</h1>}
      <Table>
        <tr style={{ borderBottom: `2px solid ${theme.color.gray}` }}>
          {tableHeaders.map((header, i) => (
            <th key={i}>{header}</th>
          ))}
        </tr>
        {tableRows.map((row, i) => (
          <tr key={i}>
            {row.map((col, i) => (
              <td key={i}>{col}</td>
            ))}
          </tr>
        ))}
      </Table>
    </section>
  )
}

SimpleTable.propTypes = {
  heading: PropTypes.string,
  tableHeaders: PropTypes.arrayOf(PropTypes.string),
  tableRows: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
}
