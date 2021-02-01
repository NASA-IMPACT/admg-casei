import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import Image from "gatsby-image"

import Layout, { PageBody, DefinitionList } from "../components/layout"
import SEO from "../components/seo"
import { Heading1, BodyText } from "../theme/typography"
import glossary from "../content/glossary.json"

export default function Glossary({ data }) {
  return (
    <Layout>
      <SEO title="Glossary" lang="en" />
      <PageBody id="glossary">
        <Heading1>Glossary</Heading1>
        <DefinitionList
          id="glossary"
          list={glossary.map(x => ({
            title: x.term,
            content: (
              <div>
                <BodyText>{x.definition}</BodyText>
                {x.listOptions && (
                  <ul data-cy="glossary-definition-options">
                    {x.listOptions.map(listItem => (
                      <li key={listItem} style={{ listStyleType: `circle` }}>
                        {listItem}
                      </li>
                    ))}
                  </ul>
                )}
                {x.note && (
                  <BodyText
                    data-cy="glossary-definition-note"
                    style={{ fontStyle: `italic`, marginTop: `1rem` }}
                  >
                    Note: {x.note}
                  </BodyText>
                )}
              </div>
            ),
          }))}
        />
        <DefinitionList
          id="glossary-img"
          isCentered
          list={[
            {
              title: "terminology map",
              content: (
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://earthdata.nasa.gov/esds/impact/admg/admg-definitions"
                >
                  <figure>
                    <Image
                      alt="terminology map"
                      fluid={data.image.childImageSharp.fluid}
                    />
                    <figcaption>
                      Source:{" "}
                      https://earthdata.nasa.gov/esds/impact/admg/admg-definitions
                    </figcaption>
                  </figure>
                </a>
              ),
            },
          ]}
        />
      </PageBody>
    </Layout>
  )
}

export const query = graphql`
  query {
    image: file(relativePath: { eq: "glossary-map.png" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`

Glossary.propTypes = {
  data: PropTypes.shape({
    image: PropTypes.shape({
      childImageSharp: PropTypes.object.isRequired,
    }).isRequired,
  }),
}
