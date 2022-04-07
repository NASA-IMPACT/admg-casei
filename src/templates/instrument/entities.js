import React from "react"
import PropTypes from "prop-types"
import { graphql, Link } from "gatsby"
import styled from "styled-components"

import { Section, SectionHeader, SectionContent } from "../../components/layout"
import PlatformCard from "../../components/cards/platform-card"
import CampaignCard from "../../components/cards/campaign-card"
import { NEGATIVE } from "../../utils/constants"
import { colors } from "../../theme"

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
    <Section id={id}>
      <SectionHeader headline="Instrument Operation" id={id} />
      <SectionContent>
        <Table data-cy={`instrument-related-entities-table`}>
          <tbody>
            <tr
              css={`
                border-bottom: 2px solid ${colors[NEGATIVE].altText};
              `}
            >
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
                <td
                  css={`
                    vertical-align: top;
                  `}
                >
                  <div data-cy="related-platform">
                    <PlatformCard shortname={platform.shortname} />
                  </div>
                </td>
                <td
                  css={`
                    display: grid;
                    grid-template-columns: repeat(
                      auto-fill,
                      minmax(13rem, 1fr)
                    );
                    gap: 1rem;
                  `}
                >
                  {platform.campaigns
                    .filter(campaign =>
                      campaigns.map(x => x.id).includes(campaign.id)
                    )
                    .map(campaign => (
                      <div key={campaign.id} data-cy="related-campaign">
                        <Link to={`/campaign/${campaign.shortname}`}>
                          <CampaignCard shortname={campaign.shortname} />
                        </Link>
                      </div>
                    ))}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </SectionContent>
    </Section>
  )
}

export const instrumentEntitiesFields = graphql`
  fragment instrumentEntitiesFields on instrument {
    platforms {
      id
      shortname: short_name
      campaigns {
        id
        shortname: short_name
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
      shortname: PropTypes.string,
    })
  ).isRequired,
  platforms: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      shortname: PropTypes.string.isRequired,
      campaigns: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string })),
    })
  ),
}
