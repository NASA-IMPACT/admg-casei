import React, { useState, useEffect } from "react"
import ReactDOM from "react-dom"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import mapbox from "mapbox-gl"

import { POSITIVE } from "../../utils/constants"
import { colors } from "../../theme"
import PopupCard from "../cards/popup-card"

export default function HoverLayer({ id, map, sourceId, isDrawing }) {
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
                  layout: CONSTRAINED
                  height: 60
                  placeholder: BLURRED
                  transformOptions: { fit: CONTAIN }
                )
              }
            }
          }
          shortname: short_name
          longname: long_name
        }
      }
    }
  `)

  const [layer, setLayer] = useState(null)

  // TODO: why does this not work with setState?
  // const [hoveredId, hoveredId = ] = useState(null)

  useEffect(() => {
    const l = map.addLayer({
      id: `${id}-hover-layer`,
      type: "fill",
      source: sourceId,
      layout: { 'visibility': isDrawing ? 'visible' : 'none' },  // control visibility here},
      paint: {
        "fill-color": colors[POSITIVE].linkText,
        "fill-opacity": [
          "case",
          ["boolean", ["feature-state", "hover"], false],
          0.75,
          0,
        ],
      },
    })

    setLayer(l)

    return () => {
      if (layer) map.removeLayer(`${id}-hover-layer`)
    }
  }, [])

  useEffect(() => {
    let hoveredId // why does this not work with setState?

    const onClick = e => {
      const campaign = data.allCampaign.nodes.find(
        x => x.shortname === e.features[0].properties.shortname
      )

      // only make features clickable when not drawing
      if (campaign && !isDrawing) {
        const placeholder = document.createElement("div")
        ReactDOM.render(
          <PopupCard
            shortname={campaign.shortname}
            longname={campaign.longname}
            logo={campaign.logo}
            mode={POSITIVE}
          />,
          placeholder
        )

        new mapbox.Popup({ closeOnMove: true })
          .setLngLat(e.lngLat)
          // .setHTML(description)
          .setDOMContent(placeholder)
          .addTo(map)
      }
    }

    const onMouseMove = e => {
      // only show hover effect when not drawing
      if (!isDrawing && e.features.length > 0) {
        if (hoveredId) {
          map.setFeatureState(
            { source: sourceId, id: hoveredId },
            { hover: false }
          )
        }

        hoveredId = e.features[0].id // why does this not work with setState?

        map.setFeatureState(
          { source: sourceId, id: hoveredId },
          { hover: true }
        )
      }
    }

    const onMouseLeave = () => {
      if (hoveredId) {
        map.setFeatureState(
          { source: sourceId, id: hoveredId },
          { hover: false }
        )
      }
      hoveredId = null
    }

    map.on("mousemove", `${id}-hover-layer`, onMouseMove)
    map.on("mouseleave", `${id}-hover-layer`, onMouseLeave)
    map.on("click", `${id}-hover-layer`, onClick)

    return () => {
      map.off("mousemove", `${id}-hover-layer`, onMouseMove)
      map.off("mouseleave", `${id}-hover-layer`, onMouseLeave)
      map.off("click", `${id}-hover-layer`, onClick)
    }
  }, [isDrawing])

  return null
}

HoverLayer.propTypes = {
  id: PropTypes.string.isRequired,
  map: PropTypes.object,
  sourceId: PropTypes.string,
  isDrawing: PropTypes.bool.isRequired,
}
