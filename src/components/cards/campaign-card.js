import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Card from "./card"
import { CampaignIcon } from "../../icons"
import { POSITIVE, NEGATIVE } from "../../utils/constants"
import { formatYearRange } from "../../utils/helpers"
import CardFooterItem from "./card-footer-item"
import DateList from "../../components/date-list-hover"

export default function CampaignCard({ shortname, mode }) {
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
          logo {
            description
            gatsbyImg {
              childImageSharp {
                gatsbyImageData(
                  height: 150
                  layout: CONSTRAINED
                  placeholder: BLURRED
                  transformOptions: { fit: CONTAIN }
                )
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
            startdate: start_date
            enddate: end_date
          }
          countDataProducts: number_data_products
        }
      }
    }
  `)

  const campaign = data.allCampaign.nodes.find(x => x.shortname === shortname)
  return (
    <Card
      image={campaign.logo}
      cover={false}
      placeholder={CampaignIcon}
      tag={campaign.ongoing && "Ongoing"}
      link={`/campaign/${campaign.shortname}`}
      footerList={{
        deployment: {
          component: DateList,
          props: {
            shortname: shortname,
            title: "Deployment",
            dates: campaign.deployments,
            cardMode: mode,
          },
        },
        dataProduct: {
          component: CardFooterItem,
          props: {
            count: campaign.countDataProducts,
            title: "Data Product",
          },
        },
      }}
      category="campaigns"
      mode={mode}
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
  shortname: PropTypes.string.isRequired,
  mode: PropTypes.oneOf([POSITIVE, NEGATIVE]),
}
