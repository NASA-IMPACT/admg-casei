import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Card from "./card"
import { formatYearRange } from "../../utils/helpers"

import { BodyText, SmallBodyText, SmallTitle } from "../../theme/typography"

export default function CampaignCard({ id, height }) {
  /*
   * We can not pass props directly into a static query because it is
   * compiled and doesn't support string interpolation in its template literal.
   * This is a workaround to still build a reuseable component:
   * It first queries all the images with graphql, and then uses javascript to filter
   * them based on the provided props.
   *
   * Read more here on this topic:
   * - https://noahgilmore.com/blog/easy-gatsby-image-components/
   * - https://spectrum.chat/gatsby-js/general/using-variables-in-a-staticquery~abee4d1d-6bc4-4202-afb2-38326d91bd05
   */
  const data = useStaticQuery(graphql`
    query {
      allCampaign {
        nodes {
          id
          logo {
            logoAlt
            logoImg {
              childImageSharp {
                fixed(height: 100) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
          }
          ongoing
          shortname: short_name
          longname: long_name
          startdate: start_date
          enddate: end_date
          region: region_description
          deployments {
            id
          }
          countDataProducts: number_data_products
        }
      }
    }
  `)

  const campaign = data.allCampaign.nodes.find(x => x.id === id)

  return (
    <Card
      image={campaign.logo}
      height={height}
      tag={campaign.ongoing && "Ongoing"}
      footerList={[
        { count: campaign.deployments.length, title: "Deployment" },
        { count: campaign.countDataProducts, title: "Data Product" },
      ]}
      category="campaigns"
    >
      <BodyText
        style={{ fontWeight: `bold`, marginTop: `0.5rem` }}
        data-cy="shortname"
      >
        {campaign.shortname}
      </BodyText>
      <SmallBodyText data-cy="longname">{campaign.longname}</SmallBodyText>
      <div>
        <SmallTitle data-cy="daterange">
          {formatYearRange(campaign.startdate, campaign.enddate)}
        </SmallTitle>
      </div>
      <div>
        <SmallTitle data-cy="region">{campaign.region}</SmallTitle>
      </div>
    </Card>
  )
}

CampaignCard.propTypes = {
  id: PropTypes.string.isRequired,
  height: PropTypes.string,
}

CampaignCard.defaultProps = {
  height: "100%",
}
