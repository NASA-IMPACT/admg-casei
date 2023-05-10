import React from "react"
import PropTypes from "prop-types"

import ExternalLink from "../external-link"

export function ProductsTable({ dois }) {
  return (
    <table
      css={`
        background: rgba(255, 255, 255, 0.06);
      `}
    >
      <thead>
        <tr>
          <th>Data Product</th>
          <th>Platforms</th>
          <th>Instruments</th>
        </tr>
      </thead>
      <tbody>
        {dois
          .filter(doi => doi.doi)
          .map(doi => (
            <tr key={doi.id}>
              <td>
                <ExternalLink
                  label={doi.doi}
                  url={`http://dx.doi.org/${doi.doi}`}
                  id="doi"
                />
              </td>
              <td>
                <span
                  css={`
                    display: flex;
                    justify-content: space-between;
                  `}
                >
                  <span>
                    {doi.platforms.map((item, idx) => {
                      const spacer = idx < doi.platforms.length - 1 ? ", " : ""
                      return <span key={idx}>{item.short_name + spacer}</span>
                    })}
                  </span>
                </span>
              </td>
              <td>
                <span
                  css={`
                    display: flex;
                    justify-content: space-between;
                  `}
                >
                  <span>
                    {doi.instruments.map((item, idx) => {
                      const spacer =
                        idx < doi.instruments.length - 1 ? ", " : ""
                      return <span key={idx}>{item.short_name + spacer}</span>
                    })}
                  </span>
                </span>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  )
}

ProductsTable.propTypes = {
  dois: PropTypes.arrayOf(
    PropTypes.shape({
      cmrTitle: PropTypes.string,
      doi: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      longname: PropTypes.string,
    })
  ).isRequired,
}
