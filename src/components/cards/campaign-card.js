import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Card from "./card"
import { CampaignIcon } from "../icons"
import { formatYearRange } from "../../utils/helpers"

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
      placeholder={CampaignIcon}
      height={height}
      tag={campaign.ongoing && "Ongoing"}
      footerList={[
        { count: campaign.deployments.length, title: "Deployment" },
        { count: campaign.countDataProducts, title: "Data Product" },
      ]}
      category="campaigns"
    >
      <big
        style={{ fontWeight: `bold`, marginTop: `0.5rem` }}
        data-cy="shortname"
      >
        {campaign.shortname}
      </big>
      <p data-cy="longname">{campaign.longname}</p>
      <div>
        <small data-cy="daterange">
          {formatYearRange(campaign.startdate, campaign.enddate)}
        </small>
      </div>
      <div>
        <small data-cy="region">{campaign.region}</small>
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
