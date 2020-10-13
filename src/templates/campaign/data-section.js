import React from "react"
import PropTypes from "prop-types"
import { graphql, Link } from "gatsby"

import {
  SectionBlock,
  SectionHeader,
  SectionContent,
} from "../../components/section"
import ExternalLink from "../../components/external-link"
import Label from "../../components/label"
import theme from "../../utils/theme"

const Box = ({ children }) => (
  <div
    style={{
      backgroundColor: theme.color.secondary,
      boxShadow: `rgba(68, 63, 63, 0.08) 0px -1px 1px 0px, rgba(68, 63, 63, 0.08) 0px 2px 6px 0px`,
      padding: `1rem`,
      display: `flex`,
      flexDirection: `column`,
      justifyContent: `space-between`,
      height: `100%`,
    }}
  >
    {children}
  </div>
)
Box.propTypes = {
  children: PropTypes.node.isRequired,
}

const DataSection = ({ id, dois }) => {
  return (
    <SectionBlock id={id}>
      <SectionHeader headline="Data Products" id={id} />
      <SectionContent>
        <table>
          <tbody>
            <tr style={{ borderBottom: `2px solid ${theme.color.gray}` }}>
              <th>
                <label>DOI</label>
              </th>
              <th>
                <label>Platforms</label>
              </th>
              <th>
                <label>Instruments</label>
              </th>
            </tr>
            {dois.map(doi => (
              <tr key={doi.id}>
                <th style={{ maxWidth: `10rem` }}>
                  <div
                    style={{
                      display: `flex`,
                      flexDirection: `column`,
                      backgroundColor: theme.color.secondary,
                      padding: `0 1rem 0.71rem 1rem`,
                    }}
                  >
                    <Label id="doi" color={theme.color.base}>
                      {doi.longname}
                    </Label>
                    <ExternalLink
                      label={doi.shortname}
                      url={`http://dx.doi.org/${doi.shortname}`}
                      id="doi"
                    ></ExternalLink>
                  </div>
                </th>
                <th style={{ maxWidth: `5rem` }}>
                  <Link to={`/platform/${doi.platformId}`}>
                    <Box>
                      <big style={{ fontWeight: `bold` }} data-cy="shortname">
                        {doi.platformShortname}
                      </big>
                      <p data-cy="longname">{doi.platformLongname}</p>
                    </Box>
                  </Link>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </SectionContent>
    </SectionBlock>
  )
}

export const dataFields = graphql`
  fragment dataFields on campaign {
    dois {
      shortname: short_name
      longname: long_name
      id
    }
  }
`

DataSection.propTypes = {
  id: PropTypes.string.isRequired,
  dois: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      shortname: PropTypes.string.isRequired,
      longname: PropTypes.string,
    })
  ).isRequired,
}

export default DataSection
