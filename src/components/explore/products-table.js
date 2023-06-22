import React from "react"
import PropTypes from "prop-types"

import { NEGATIVE } from "../../utils/constants"
import { colors } from "../../theme"
import { ExternalLinkIcon } from "../../icons"
import { Link } from "gatsby"
import { Tooltip } from "@reach/tooltip"
import "@reach/tooltip/styles.css"

export function ProductsTable({ dois }) {
  const linkLimit = 3

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
                  <span>{doi.shortname}</span>
                </a>
              </td>
              <td>
                <span>
                  <span>
                    {doi.platforms.length ? (
                      doi.platforms.map((item, idx) => {
                        if (idx < linkLimit) {
                          const spacer =
                            idx < Math.min(doi.platforms.length, linkLimit) - 1
                              ? ", "
                              : ""
                          return (
                            <span key={idx}>
                              <Link
                                to={`/platform/${item.shortname}`}
                                css={`
                                  font-weight: 600;
                                `}
                                data-cy={`${item.id}-inpage-link`}
                              >
                                {item.shortname + spacer}
                              </Link>
                            </span>
                          )
                        }
                      })
                    ) : (
                      <Tooltip
                        label="Please visit product page"
                        style={{
                          background: "hsla(0, 0%, 0%, 0.85)",
                          color: "white",
                          border: "none",
                          borderRadius: "4px",
                          padding: "0.5em 1em",
                          marginTop: "-43px",
                        }}
                      >
                        <span style={{ fontSize: 25 }}>{"---"}</span>
                      </Tooltip>
                    )}
                  </span>
                  {doi.platforms.length > linkLimit ? (
                    <>{`, +${doi.platforms.length - linkLimit}`}</>
                  ) : (
                    <></>
                  )}
                </span>
              </td>
              <td>
                <span>
                  <span>
                    {doi.instruments.length ? (
                      doi.instruments.map((item, idx) => {
                        if (idx < linkLimit) {
                          const spacer =
                            idx <
                            Math.min(doi.instruments.length, linkLimit) - 1
                              ? ", "
                              : ""
                          return (
                            <span key={idx}>
                              <Link
                                to={`/instrument/${item.shortname}`}
                                css={`
                                  font-weight: 600;
                                `}
                                data-cy={`${item.id}-inpage-link`}
                              >
                                {item.shortname + spacer}
                              </Link>
                            </span>
                          )
                        }
                      })
                    ) : (
                      <Tooltip
                        label="Please visit product page"
                        style={{
                          background: "hsla(0, 0%, 0%, 0.85)",
                          color: "white",
                          border: "none",
                          borderRadius: "4px",
                          padding: "0.5em 1em",
                          marginTop: "-43px",
                        }}
                      >
                        <span style={{ fontSize: 25 }}>{"---"}</span>
                      </Tooltip>
                    )}
                  </span>
                  {doi.instruments.length > linkLimit ? (
                    <>{`, +${doi.instruments.length - linkLimit}`}</>
                  ) : (
                    <></>
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
