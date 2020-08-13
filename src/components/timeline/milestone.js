import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import Label from "../../components/label"
import theme from "../../utils/theme"
import Image from "gatsby-image"

export default function Milestone({ type, daterange, name, details, region }) {
  const deploylmentImage = usePlaceholderImageQuery().deploymentPlaceholderImage.nodes.shift()
  console.log(
    "why is this called twice and why is this empty the second time?",
    deploylmentImage
  )

  return (
    <div style={{ padding: `3rem`, minHeight: `400px` }} data-cy="milestone">
      <label
        style={{
          textTransform: `uppercase`,
          fontSize: `small`,
          color: theme.color.primary,
          backgroundColor: theme.color.highlight,
          position: `absolute`,
          top: `4rem`,
          left: `4rem`,
          padding: `.25rem`,
          zIndex: `1`,
        }}
      >
        {type}
      </label>
      <div style={{ display: `flex` }}>
        <div style={{ flex: `1` }}>
          <Image
            alt={deploylmentImage.placeholderImgAlt}
            fluid={deploylmentImage.placeholderImg.childImageSharp.fluid}
          />
        </div>
        <div style={{ flex: `1.61803398875`, padding: `1rem` }}>
          <Label id="timeline-milestone-date">{daterange}</Label>
          <h3>{name}</h3>
          <p>{details}</p>
          <p>{region}</p>
        </div>
      </div>
    </div>
  )
}

Milestone.propTypes = {
  type: PropTypes.string.isRequired,
  daterange: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  details: PropTypes.string.isRequired,
  region: PropTypes.string.isRequired,
  placeholderImageUrl: PropTypes.string,
  placeholderImageAlt: PropTypes.string,
}

const usePlaceholderImageQuery = () => {
  const placeholderImage = useStaticQuery(graphql`
    query {
      deploymentPlaceholderImage: allPlaceholderImagesJson(
        filter: { category: { eq: "deployment" } }
      ) {
        nodes {
          placeholderImgAlt
          placeholderImg {
            childImageSharp {
              fluid(maxWidth: 600) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  `)
  return placeholderImage
}
