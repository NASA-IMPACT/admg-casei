import React from "react"
import PropTypes from "prop-types"
import { graphql, Link } from "gatsby"
import styled from "styled-components"

import {
  SectionBlock,
  SectionHeader,
  SectionContent,
} from "../../components/layout"
import PlatformCard from "../../components/cards/platform-card"
import CampaignCard from "../../components/cards/campaign-card"
import theme from "../../utils/theme"

const Table = styled.table`
  th:first-child {
    max-width: 9rem;
  }
  td:first-child {
    max-width: 9rem;
  }
`

export default function Entities({ id, campaigns, platforms }) {
  return (
    <SectionBlock id={id}>
      <SectionHeader headline="Instrument Operation" id={id} />
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
            {platforms.map(platform => (
              <tr key={platform.id}>
                <td style={{ verticalAlign: `top` }}>
                  <div data-cy="related-platform">
                    <Link to={`/platform/${platform.id}`}>
                      <PlatformCard id={platform.id} />
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
                    .filter(campaign =>
                      campaigns.map(x => x.id).includes(campaign.id)
                    )
                    .map(campaign => (
                      <div key={campaign.id} data-cy="related-campaign">
                        <Link to={`/campaign/${campaign.id}`}>
                          <CampaignCard id={campaign.id} />
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
      id
      campaigns {
        id
      }
    }
    campaigns {
      id
    }
  }
`

Entities.propTypes = {
  id: PropTypes.string.isRequired,
  campaigns: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
    })
  ).isRequired,
  platforms: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      campaigns: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string })),
    })
  ),
}
