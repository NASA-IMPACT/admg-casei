import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Card from "./card"

export default function InstrumentCard(props) {
  /*
   * We can not pass props directly into a static query because it is
   * compiled and doesn't support string interpolation in its template literal.
   * This is a workaround to still build a reuseable Image component using Gatsby's
   * image functionalities:
   * It first queries all the images with graphql, and then uses javascript to filter
   * them based on the provided props.
   *
   * Read more here on this topic:
   * - https://noahgilmore.com/blog/easy-gatsby-image-components/
   * - https://spectrum.chat/gatsby-js/general/using-variables-in-a-staticquery~abee4d1d-6bc4-4202-afb2-38326d91bd05
   */
  const data = useStaticQuery(graphql`
    query {
      allInstrument {
        nodes {
          shortname: short_name
          longname: long_name
          id
          description
          campaigns {
            id
          }
        }
      }
    }
  `)

  const instrument = data.allInstrument.nodes.find(x => x.id === props.id)

  return (
    <Card
      footerList={[{ count: instrument.campaigns.length, title: "Campaign" }]}
    >
      <big
        style={{ fontWeight: `bold`, marginTop: `0.5rem` }}
        data-cy="shortname"
      >
        {instrument.shortname}
      </big>
      <p data-cy="longname">{instrument.longname}</p>
      {/* <p data-cy="description">{description}</p> */}
    </Card>
  )
}

InstrumentCard.propTypes = {
  id: PropTypes.string.isRequired,
}
