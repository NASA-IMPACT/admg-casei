import React from "react"
import PropTypes from "prop-types"

import { Section, SectionHeader, SectionContent } from "../../components/layout"
import CarouselAccordionCombo from "../../components/carousel-accordion-combo"
import CampaignCard from "../../components/cards/campaign-card"

const CampaignsAndInstruments = ({ id, collectionPeriods }) => {
  const campaigns = []
  const campaignInstruments = {}

  for (const cdpi of collectionPeriods) {
    campaigns.push(cdpi.deployment.campaign)
    campaignInstruments[cdpi.deployment.campaign.id] = cdpi.instruments
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
          folds={campaignInstruments}
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
