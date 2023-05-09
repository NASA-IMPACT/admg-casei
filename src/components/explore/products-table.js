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
        {dois.map(doi => (
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
                    const limit = 2
                    const spacer =
                      idx < Math.min(doi.platforms.length, limit) - 1
                        ? ", "
                        : ""
                    if (idx < limit) {
                      return <span key={idx}>{item.short_name + spacer}</span>
                    }
                  })}
                </span>
                {doi.platforms.length > 1 && (
                  <span
                    css={`
                      background: #efc100;
                      color: #fc3d21;
                      border-radius: 16px;
                      height: 24px;
                      width: 24px;
                      padding: 0px 8px;
                      text-align: center;
                      display: inline-block;
                      font-weight: bold;
                    `}
                  >
                    {doi.platforms.length}
                  </span>
                )}
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
                    const limit = 2
                    const spacer =
                      idx < Math.min(doi.instruments.length, limit) - 1
                        ? ", "
                        : ""
                    if (idx < limit) {
                      return <span key={idx}>{item.short_name + spacer}</span>
                    }
                  })}
                </span>
                {doi.instruments.length > 1 && (
                  <span
                    css={`
                      background: #efc100;
                      color: #fc3d21;
                      border-radius: 16px;
                      height: 24px;
                      width: 24px;
                      padding: 0px 8px;
                      text-align: center;
                      display: inline-block;
                      font-weight: bold;
                    `}
                  >
                    {doi.instruments.length}
                  </span>
                )}
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
