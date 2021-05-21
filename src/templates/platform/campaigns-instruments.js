import React from "react"
import PropTypes from "prop-types"

import { Section, SectionHeader, SectionContent } from "../../components/layout"
import CarouselAccordionCombo from "../../components/carousel-accordion-combo"
import CampaignCard from "../../components/cards/campaign-card"

const CampaignsAndInstruments = ({ id, campaigns, instruments }) => {
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
          folds={campaigns.reduce(
            (acc, campaign) =>
              Object.assign(acc, {
                [campaign.id]: campaign.instruments.filter(instrument =>
                  instruments.map(x => x.id).includes(instrument.id)
                ),
              }),
            {}
          )}
        />
      </SectionContent>
    </Section>
  )
}

CampaignsAndInstruments.propTypes = {
  id: PropTypes.string.isRequired,
  campaigns: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      instruments: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          shortname: PropTypes.string.isRequired,
          longname: PropTypes.string.isRequired,
          description: PropTypes.string.isRequired,
          gcmdPhenomenas: PropTypes.arrayOf(
            PropTypes.shape({
              term: PropTypes.string.isRequired,
              topic: PropTypes.string.isRequired,
              variable_1: PropTypes.string.isRequired,
              variable_2: PropTypes.string.isRequired,
              variable_3: PropTypes.string.isRequired,
            })
          ),
        })
      ).isRequired,
    }).isRequired
  ).isRequired,
  instruments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      dois: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
        }).isRequired
      ),
    })
  ),
}

export default CampaignsAndInstruments
