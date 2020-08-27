import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import Image from "gatsby-image"

import Layout, { PageBody } from "../components/layout"
import Hero from "../components/hero"
import DefinitionList from "../components/tables/definitionList"
import SEO from "../components/seo"
import glossary from "../content/glossary.json"
import theme from "../utils/theme"

export default function Glossary({ data }) {
  return (
    <Layout>
      <SEO title="Glossary" />
      <Hero title="Glossary" textToImageRatio={[5, 3]} id="glossary">
        <Image
          alt={data.flowchart.nasaImgAlt}
          fixed={data.flowchart.nasaImg.childImageSharp.fixed}
          style={{ backgroundColor: theme.color.base }}
        />
      </Hero>
      <PageBody id="glossary">
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
      </PageBody>
    </Layout>
  )
}

export const query = graphql`
  query {
    flowchart: nasaImagesJson(shortname: { eq: "Glossary" }) {
      nasaImgAlt
      nasaImg {
        childImageSharp {
          fixed(height: 550) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  }
`

Glossary.propTypes = {
  data: PropTypes.shape({
    flowchart: PropTypes.shape({
      nasaImgAlt: PropTypes.string.isRequired,
      nasaImg: PropTypes.shape({
        childImageSharp: PropTypes.object.isRequired,
      }).isRequired,
    }).isRequired,
  }),
}
