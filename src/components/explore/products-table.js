import React from "react"
import PropTypes from "prop-types"

import { NEGATIVE } from "../../utils/constants"
import { colors } from "../../theme"
import { ExternalLinkIcon } from "../../icons"

export function ProductsTable({ dois }) {
  return (
    <table
      css={`
        background: rgba(255, 255, 255, 0.06);
        border-spacing: 30px;
      `}
    >
      <thead>
        <tr>
          <th
            css={`
              padding-left: 20px;
            `}
          >
            DATA PRODUCT
          </th>
          <th>PLATFORMS</th>
          <th>INSTRUMENTS</th>
        </tr>
      </thead>
      <tbody>
        {dois
          .filter(doi => doi.doi)
          .map(doi => (
            <tr key={doi.id}>
              <td
                css={`
                  max-width: 30vw;
                `}
              >
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`http://dx.doi.org/${doi.doi}`}
                  css={`
                    color: ${colors[NEGATIVE].linkText};
                    display: block;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow: hidden;
                    padding-left: 30px;
                  `}
                  data-cy={`doi-link`}
                >
                  <ExternalLinkIcon color={colors[NEGATIVE].linkText} />{" "}
                  <span>{doi.doi}</span>
                </a>
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
