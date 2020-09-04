import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import Layout, { PageBody } from "../components/layout"
import DefinitionList from "../components/tables/definitionList"
import SEO from "../components/seo"
import glossary from "../content/glossary.json"

export default function Glossary() {
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
          list={[
            {
              title: "terminology map",
              content: (
                <Image filename="glossary-map.png" alt="terminology map" />
              ),
            },
          ]}
        />
      </PageBody>
    </Layout>
  )
}

const Image = props => {
  const data = useStaticQuery(graphql`
    query {
      images: allFile {
        edges {
          node {
            relativePath
            name
            childImageSharp {
              fixed(width: 400) {
                ...GatsbyImageSharpFixed
              }
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

  const imageFixed = image.node.childImageSharp.fixed
  return <Img alt={props.alt} fixed={imageFixed} />
}

Image.propTypes = {
  filename: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
}
