import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Card from "./card"
import { PlatformIcon } from "../../icons"

export default function PlatformCard(props) {
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
          shortname: short_name
          longname: long_name
          id
          description
          collectionPeriodIds: collection_periods
          campaigns {
            id
          }
          instruments {
            id
          }
          stationary
        }
      }
    }
  `)

  const platform = data.allPlatform.nodes.find(x => x.id === props.id)

  return (
    <Card
      placeholder={PlatformIcon}
      tag={platform.stationary && "Stationary"}
      footerList={[
        { count: platform.campaigns.length, title: "Campaign" },
        {
          count: platform.collectionPeriodIds.length,
          title: "Collection Period",
        },
        { count: platform.instruments.length, title: "Instrument" },
      ]}
      category="platforms"
    >
      <big
        style={{ fontWeight: `bold`, marginTop: `0.5rem` }}
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
  id: PropTypes.string.isRequired,
}
