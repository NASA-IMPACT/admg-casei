import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"

import { Label, Heading3, BodyText } from "../../theme/typography"
import theme from "../../utils/theme"

const Milestone = ({ type, daterange, name, details, region }) => {
  const { deploymentPlaceholder: deploymentImage } = usePlaceholderImageQuery()
  return (
    <div style={{ padding: `3rem`, minHeight: `400px` }} data-cy="milestone">
      <Label
        style={{
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
      </Label>
      <div style={{ display: `flex` }}>
        <div style={{ flex: `1` }}>
          <Image
            alt={deploymentImage.nasaImgAlt}
            fluid={deploymentImage.nasaImg.childImageSharp.fluid}
          />
        </div>
        <div style={{ flex: `1.61803398875`, padding: `1rem` }}>
          <Label id="timeline-milestone-date">{daterange}</Label>
          <Heading3>{name}</Heading3>
          <BodyText>{details}</BodyText>
          <BodyText>{region}</BodyText>
        </div>
      </div>
    </div>
  )
}

export default Milestone

Milestone.propTypes = {
  type: PropTypes.string.isRequired,
  daterange: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  details: PropTypes.string.isRequired,
  region: PropTypes.string.isRequired,
}

const usePlaceholderImageQuery = () =>
  useStaticQuery(graphql`
    query {
      deploymentPlaceholder: nasaImagesJson(
        shortname: { eq: "placeholder-deployment" }
      ) {
        nasaImgAlt
        nasaImg {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  `)
