import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
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

export default function Entities({ id, collectionPeriods }) {
  const platforms = {}
  const platformCampaigns = {}

  collectionPeriods.map(cdpi => {
    platforms[cdpi.platform.id] = cdpi.platform
    platformCampaigns[cdpi.platform.id] = {}
  })

  for (const cdpi of collectionPeriods) {
    platformCampaigns[cdpi.platform.id][cdpi.deployment.campaign.id] =
      cdpi.deployment.campaign
  }

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
            {Object.keys(platforms).map(key => {
              const platform = platforms[key]
              return (
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
                    {Object.keys(platformCampaigns[platform.id]).map(key => {
                      const campaign = platformCampaigns[platform.id][key]
                      return (
                        <div key={campaign.id} data-cy="related-campaign">
                          <CampaignCard shortname={campaign.shortname} />
                        </div>
                      )
                    })}
                  </td>
                </tr>
              )
            })}
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
  collectionPeriods: PropTypes.array.isRequired,
  // campaigns: PropTypes.arrayOf(
  //   PropTypes.shape({
  //     id: PropTypes.string,
  //     shortname: PropTypes.string,
  //   })
  // ).isRequired,
  // platforms: PropTypes.arrayOf(
  //   PropTypes.shape({
  //     id: PropTypes.string.isRequired,
  //     shortname: PropTypes.string.isRequired,
  //     campaigns: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string })),
  //   })
  // ),
}
