import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import Image from "gatsby-image"

import Layout, {
  PageBody,
  Section,
  SectionHeader,
  SectionContent,
} from "../components/layout"
import SEO from "../components/seo"

const alphabet = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
]

export default function Glossary({ data }) {
  return (
    <Layout>
      <SEO title="Glossary" lang="en" />
      <PageBody id="glossary">
        <h1>Glossary</h1>

        {alphabet.map(letter => {
          const entriesOfLetter = data.allGlossaryJson.nodes.filter(x =>
            x.term.startsWith(letter)
          )

          if (!entriesOfLetter.length) return null

          return (
            <Section id={letter} key={letter}>
              <SectionHeader id={letter} headline={letter} />
              {entriesOfLetter.map(x => (
                <SectionContent
                  key={x.term}
                  withBackground
                  mode="lightTheme"
                  withPadding
                >
                  <h3>{x.term}</h3>
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
                </SectionContent>
              ))}
            </Section>
          )
        })}

        <Section id="glossary-img">
          <SectionHeader id="glossary-img" headline="Terminology map" />

          <SectionContent withPadding>
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
          </SectionContent>
        </Section>
      </PageBody>
    </Layout>
  )
}

export const query = graphql`
  query {
    allGlossaryJson {
      nodes {
        term
        definition
        note
        listOptions
      }
    }
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
    allGlossaryJson: PropTypes.shape({
      nodes: PropTypes.arrayOf(
        PropTypes.shape({
          term: PropTypes.string.isRequired,
          definition: PropTypes.string.isRequired,
          note: PropTypes.string,
          listOptions: PropTypes.arrayOf(PropTypes.string),
        })
      ),
    }).isRequired,
    image: PropTypes.shape({
      childImageSharp: PropTypes.object.isRequired,
    }).isRequired,
  }),
}
