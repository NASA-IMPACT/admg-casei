import React from "react"
import PropTypes from "prop-types"

import { Section, SectionHeader, SectionContent } from "../../components/layout"
import CarouselAccordionCombo from "../../components/carousel-accordion-combo"
import CampaignCard from "../../components/cards/campaign-card"

const CampaignsAndInstruments = ({ id, collectionPeriods }) => {
  // We want to display one carousel item per combination of Platform and
  // Instrument Set. For example, if the HS3 Campaign has 5 Deployments for this
  // Platform, but only 2 unique sets of Instruments across those Deployments,
  // HS3 should appear in the carousel twice, with each carousel item displaying
  // one of those unique sets of Instruments.
  let uniqueSets = []
  let campaigns = []

  for (const cdpi of collectionPeriods) {
    const campaignId = cdpi.deployment.campaign.id
    const instrumentIds = cdpi.instruments.map(instrument => instrument.id)
    const combinedId = `${campaignId}${instrumentIds.sort().join()}`

    if (!uniqueSets.includes(combinedId)) {
      uniqueSets.push(combinedId)
      campaigns.push({
        item: cdpi.deployment.campaign,
        folds: cdpi.instruments,
      })
    }
  }

  return (
    <Section id={id}>
      <SectionHeader
        headline="Related Campaigns & Instruments"
        id={id}
        description="Review the instruments operated on this platform for each of these
          field campaigns"
      />
      <SectionContent>
        <CarouselAccordionCombo
          id="campaign"
          emptyMessage="No available related campaigns"
          carouselList={campaigns}
          card={CampaignCard}
        />
      </SectionContent>
    </Section>
  )
}

CampaignsAndInstruments.propTypes = {
  id: PropTypes.string.isRequired,
  collectionPeriods: PropTypes.array.isRequired,
}

export default CampaignsAndInstruments
