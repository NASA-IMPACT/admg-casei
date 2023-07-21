import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql, Slice } from "gatsby"

import Card from "./card"
import CardFooterItem from "./card-footer-item"
import { PlatformIcon } from "../../icons"
import { POSITIVE, NEGATIVE } from "../../utils/constants"

export default function PlatformCard({ shortname, mode }) {
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
      allPlatform {
        nodes {
          image {
            description
            gatsbyImg {
              childImageSharp {
                gatsbyImageData(
                  layout: CONSTRAINED
                  height: 180
                  placeholder: BLURRED
                  transformOptions: { fit: CONTAIN }
                )
              }
            }
          }
          shortname: short_name
          longname: long_name
          description
          collectionPeriodIds: collection_periods {
            id
          }
          campaigns {
            shortname: short_name
          }
          instruments {
            shortname: short_name
          }
          stationary
        }
      }
    }
  `)

  const platform = data.allPlatform.nodes.find(x => x.shortname === shortname)
  return (
    <Card
      image={platform.image}
      cover={true}
      placeholder={PlatformIcon}
      tag={platform.stationary && "Stationary"}
      link={`/platform/${platform.shortname}`}
      footerList={{
        campaign: {
          component: CardFooterItem,
          props: {
            count: platform.campaigns.length,
            title: "Campaign",
          },
        },
        instrument: {
          component: CardFooterItem,
          props: {
            count: platform.instruments.length,
            title: "Instrument",
          },
        },
      }}
      category="platforms"
      mode={mode}
    >
      <big
        css={`
          font-weight: bold;
          margin-top: 0.5rem;
        `}
        data-cy="shortname"
      >
        {platform.shortname}
      </big>
      <p data-cy="longname">{platform.longname}</p>
      {/* <p data-cy="description">{description}</p> */}
    </Card>
  )
}

PlatformCard.propTypes = {
  shortname: PropTypes.string.isRequired,
  mode: PropTypes.oneOf([POSITIVE, NEGATIVE]),
}
