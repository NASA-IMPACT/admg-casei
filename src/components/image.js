import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

/*
 * This component is built using `gatsby-image` to automatically serve optimized
 * images with lazy loading and reduced file sizes. The image is loaded using a
 * `useStaticQuery`, which allows us to load the image from directly within this
 * component, rather than having to pass the image data down from pages.
 *
 * For more information, see the docs:
 * - `gatsby-image`: https://gatsby.dev/gatsby-image
 * - `useStaticQuery`: https://www.gatsbyjs.org/docs/use-static-query/
 */

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

const Image = props => {
  const data = useStaticQuery(graphql`
    query {
      images: allFile {
        edges {
          node {
            relativePath
            name
            childImageSharp {
              gatsbyImageData(width: 600, layout: CONSTRAINED)
            }
          }
        }
      }
    }
  `)

  const image = data.images.edges.find(n => {
    return n.node.relativePath.includes(props.filename)
  })
  if (!image) {
    return null
  }

  const imageFluid = image.node.childImageSharp.gatsbyImageData
  return <GatsbyImage image={imageFluid} alt={props.alt} />
}

Image.propTypes = {
  filename: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
}

export default Image
