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
      marginBottom: `4px`,
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
        <div
          style={{
            display: `grid`,
            gridTemplateColumns: `repeat(auto-fit, minmax(300px, 1fr) )`,
            gap: `1rem`,
          }}
        >
          {dois.length < 1
            ? "No data products available."
            : dois.map(doi => (
                <div
                  key={doi.id}
                  style={{
                    display: `flex`,
                    flexDirection: `column`,
                    // border: `1px solid ${theme.color.base}`,
                    backgroundColor: theme.color.secondary,
                    padding: `0 1rem 0.71rem 1rem`,
                  }}
                  data-cy="data-product"
                >
                  <Label id="doi" color={theme.color.base}>
                    {doi.longname}
                  </Label>
                  <ExternalLink
                    label={doi.shortname}
                    url={`http://dx.doi.org/${doi.shortname}`}
                    id="doi"
                  ></ExternalLink>

                  <div
                    style={{
                      flex: `2.618`,
                      display: `grid`,
                      gap: `1rem`,
                      gridTemplateColumns: `1fr 1fr`,
                      padding: `.5rem`,
                    }}
                  >
                    <div>
                      <Label id="doi-platform" showBorder>
                        Platforms
                      </Label>
                      {doi.platforms.map(platform => (
                        <Link key={platform.id} to={`/platform/${platform.id}`}>
                          <small>{platform.longname}</small>
                        </Link>
                      ))}
                    </div>
                    <div>
                      <Label showBorder>Instruments</Label>
                      {doi.instruments.map(instrument => (
                        <Link
                          key={instrument.id}
                          to={`/instrument/${instrument.id}`}
                        >
                          <small style={{ display: `inline-block` }}>
                            {instrument.longname}
                          </small>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
        </div>
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
