import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import Image from "gatsby-image"

import Layout, { PageBody } from "../components/layout"
import DefinitionList from "../components/tables/definitionList"
import SEO from "../components/seo"
import glossary from "../content/glossary.json"

export default function Glossary({ data }) {
  return (
    <Layout>
      <SEO title="Glossary" />
      <PageBody id="glossary">
        <h1>Glossary</h1>
        <DefinitionList
          id="glossary"
          list={glossary.map(x => ({
            title: x.term,
            content: (
              <div>
                <p>{x.definition}</p>
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
                  <p
                    data-cy="glossary-definition-note"
                    style={{ fontStyle: `italic`, marginTop: `1rem` }}
                  >
                    Note: {x.note}
                  </p>
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
