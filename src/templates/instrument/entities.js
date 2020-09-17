import React from "react"
import PropTypes from "prop-types"
import { graphql, Link } from "gatsby"
import styled from "styled-components"

import {
  SectionBlock,
  SectionHeader,
  SectionContent,
} from "../../components/section"
import PlatformCard from "../../components/cards/platform-card"
import CampaignCard from "../../components/cards/campaign-card"
import { formatYearRange } from "../../utils/helpers"
import theme from "../../utils/theme"

const Table = styled.table`
  th:first-child {
    max-width: 9rem;
  }
  td:first-child {
    max-width: 9rem;
  }
`

export default function Entities({ id, campaignIds, platforms }) {
  return (
    <SectionBlock id={id}>
      <SectionHeader headline="Related Entities" id={id} />
      <SectionContent>
        <Table data-cy={`instrument-related-entities-table`}>
          <tbody>
            <tr style={{ borderBottom: `2px solid ${theme.color.gray}` }}>
              <th>
                <label>Platform</label>
              </th>
              <th>
                <label>
                  Campaigns, where the platform was used with this instrument
                </label>
              </th>
            </tr>
            {platforms.map((platform, i) => (
              <tr key={i}>
                <td key={platform.id} style={{ verticalAlign: `top` }}>
                  <div key={platform.id} data-cy="related-platform">
                    <Link to={`/platform/${platform.id}`} key={platform.id}>
                      <PlatformCard
                        shortname={platform.shortname}
                        longname={platform.longname}
                        key={platform.id}
                        description={platform.description}
                        campaigns={platform.campaigns}
                        collectionPeriodIds={platform.collectionPeriodIds}
                        instruments={platform.instruments}
                        stationary={platform.stationary}
                      />
                    </Link>
                  </div>
                </td>
                <td
                  style={{
                    display: `grid`,
                    gridTemplateColumns: `repeat(auto-fill, minmax(13rem, 1fr))`,
                    gap: `1rem`,
                  }}
                >
                  {platform.campaigns
                    .filter(x => campaignIds.includes(x.id))
                    .map(campaign => (
                      <div key={campaign.id} data-cy="related-campaign">
                        <Link to={`/campaign/${campaign.id}`}>
                          <CampaignCard
                            logo={campaign.logo}
                            ongoing={campaign.ongoing}
                            shortname={campaign.shortname}
                            longname={campaign.longname}
                            daterange={formatYearRange(
                              campaign.startdate,
                              campaign.enddate
                            )}
                            region={campaign.region}
                            countCollectionPeriods={
                              campaign.countCollectionPeriods
                            }
                            countDataProducts={campaign.countDataProducts}
                          />
                        </Link>
                      </div>
                    ))}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </SectionContent>
    </SectionBlock>
  )
}

export const instrumentEntitiesFields = graphql`
  fragment instrumentEntitiesFields on instrument {
    platforms {
      shortname: short_name
      longname: long_name
      id
      description
      collectionPeriodIds: collection_periods
      campaigns {
        logo {
          nasaImgAlt
          nasaImg {
            childImageSharp {
              fixed(height: 85) {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
        ongoing
        shortname: short_name
        longname: long_name
        id
        startdate: start_date
        enddate: end_date
        region: region_description
        countCollectionPeriods: number_collection_periods
        countDataProducts: number_data_products
      }
      instruments {
        id
      }
      stationary
    }
    campaignIds: campaigns
  }
`

Entities.propTypes = {
  id: PropTypes.string.isRequired,
  campaignIds: PropTypes.arrayOf(PropTypes.string),
  platforms: PropTypes.arrayOf(
    PropTypes.shape({
      shortname: PropTypes.string.isRequired,
      campaigns: PropTypes.arrayOf(
        PropTypes.shape({ shortname: PropTypes.string })
      ),
    })
  ),
}
