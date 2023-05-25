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
      explore: file(relativePath: { eq: "guide-explore.png" }) {
        childImageSharp {
          gatsbyImageData(layout: CONSTRAINED, width: 600, placeholder: BLURRED)
        }
      }
      filter1: file(relativePath: { eq: "guide-filter1.png" }) {
        childImageSharp {
          gatsbyImageData(layout: CONSTRAINED, width: 600, placeholder: BLURRED)
        }
      }
      filter2: file(relativePath: { eq: "guide-filter2.png" }) {
        childImageSharp {
          gatsbyImageData(layout: CONSTRAINED, width: 600, placeholder: BLURRED)
        }
      }
      filtermap: file(relativePath: { eq: "guide-filtermap.png" }) {
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
        <Link
          to={link.url}
          css={`
            text-decoration: underline;
            text-underline-offset: 2px;
          `}
        >
          {link.text}
        </Link>
      ) : (
        <ExternalLink
          label={link.text}
          url={link.url}
          id={link.id}
        ></ExternalLink>
      )
    }

    const image = replacements.images?.find(image => image.id === part)
    if (image && images[part]) {
      return (
        <GatsbyImage
          key={image.id}
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
