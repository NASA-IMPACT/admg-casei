import React from "react"
import { graphql, useStaticQuery, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import ExternalLink from "./external-link"

export const StringTemplateParser = ({ expression, replacements }) => {
  const templatePattern = /{{\s?([^{}\s]*)\s?}}/g

  const parts = expression.split(templatePattern)

  const images = useStaticQuery(graphql`
    {
      concepts: file(relativePath: { eq: "geophysical-concepts.png" }) {
        childImageSharp {
          gatsbyImageData(layout: CONSTRAINED, width: 600, placeholder: BLURRED)
        }
      }
    }
  `)

  return parts.map(part => {
    if (part === "linebreak") return <br />

    const link = replacements.links?.find(link => link.id === part)
    if (link) {
      return link.url.startsWith("/") ? (
        <Link to={link.url}>{link.text}</Link>
      ) : (
        <ExternalLink label={link.text} url={link.url}></ExternalLink>
      )
    }

    const image = replacements.images?.find(image => image.id === part)
    if (image && images[part]) {
      return (
        <GatsbyImage
          image={images[part].childImageSharp.gatsbyImageData}
          alt={image.alt}
          css={`
            margin: 2rem 0;
          `}
        />
      )
    }

    return part
  })
}
