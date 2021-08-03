import React, { useState } from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import VisuallyHidden from "@reach/visually-hidden"

import Layout, {
  PageBody,
  Section,
  SectionHeader,
  SectionContent,
} from "../components/layout"
import SEO from "../components/seo"
import ExternalLink from "../components/external-link"
import { ArrowIcon } from "../icons"
import { colors } from "../theme"
import { ALPHABET, POSITIVE, NEGATIVE } from "../utils/constants"

export default function Glossary({ data }) {
  // const { hash } = location

  // eslint-disable-next-line no-unused-vars
  const [alphabeticalGlossary, setAlphabeticalGlossary] = useState(() =>
    ALPHABET.reduce(
      (glossary, letter) => ({
        ...glossary,
        [letter]: data.allGlossaryJson.nodes.filter(x =>
          x.term.startsWith(letter)
        ),
      }),
      {}
    )
  )

  /* In case we want to filter by letter, we can use these lines: */

  // const [selectedLetter, setSelectedLetter] = useState(null)

  // useEffect(() => {
  //   setSelectedLetter(hash.replace("#", ""))
  //   return () => {
  //     setSelectedLetter(null)
  //   }
  // }, [hash])

  return (
    <Layout>
      <SEO title="Glossary" lang="en" />
      <PageBody id="glossary">
        <h1>Glossary</h1>

        <Section id="intro">
          <SectionContent columns={[1, 8]}>
            <p>
              We use the formalized definitions below for building NASA’s
              Catalog of Archived Suborbital Earth Science Investigations.
              Consistent use of vocabulary is required for clear organization of
              the variety of airborne and field investigation metadata. Where
              possible, we aim to align terminology with conventions in use
              among the communities served by ADMG. Feedback on these
              definitions are welcome.
            </p>
          </SectionContent>
        </Section>

        <Section id="glossary-img">
          <SectionHeader id="glossary-img" headline="Terminology map" />

          <SectionContent withPadding>
            <figure
              css={`
                text-align: center;
              `}
            >
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://earthdata.nasa.gov/esds/impact/admg/admg-definitions"
              >
                <GatsbyImage
                  image={data.image.childImageSharp.gatsbyImageData}
                  alt="terminology map"
                />
              </a>
              <figcaption>
                Source:{" "}
                <ExternalLink
                  label="https://earthdata.nasa.gov/esds/impact/admg/admg-definitions"
                  url="https://earthdata.nasa.gov/esds/impact/admg/admg-definitions"
                />
              </figcaption>
            </figure>
          </SectionContent>
        </Section>

        <Section id="letter-navigation">
          <VisuallyHidden>
            <SectionHeader id="letter-navigation" headline="Jump to letter" />
          </VisuallyHidden>

          <SectionContent columns={[1, 12]}>
            <nav
              aria-label="letter selection"
              css={`
                color: ${colors[NEGATIVE].altText};
                text-align: center;
              `}
            >
              {ALPHABET.map((letter, i) =>
                alphabeticalGlossary[letter].length ? (
                  <React.Fragment key={letter}>
                    <a
                      href={`#${letter}`}
                      css={`
                        font-weight: 600;
                        font-size: x-large;
                      `}
                      data-cy={`${letter}-inpage-link`}
                    >
                      {letter}
                    </a>{" "}
                    {i !== ALPHABET.length - 1 && <span>&mdash; </span>}
                  </React.Fragment>
                ) : (
                  <React.Fragment key={letter}>
                    <span
                      css={`
                        font-weight: 600;
                      `}
                    >
                      {letter}
                    </span>{" "}
                    {i !== ALPHABET.length - 1 && <span>&mdash; </span>}
                  </React.Fragment>
                )
              )}
            </nav>
          </SectionContent>
        </Section>

        {Object.entries(alphabeticalGlossary)
          // eslint-disable-next-line no-unused-vars
          .filter(([a, x]) => x.length)
          // eslint-disable-next-line no-unused-vars
          // .filter(([letter, x]) =>
          //   selectedLetter ? letter === selectedLetter : true
          // )
          .map(([letter, entries]) => {
            return (
              <Section id={letter} key={letter}>
                <SectionHeader id={letter} headline={letter} />
                <a
                  href="#top"
                  css={`
                    grid-column: -2;
                    align-self: center;
                  `}
                  data-cy={`top-inpage-link`}
                >
                  to top <ArrowIcon direction="up" />
                </a>
                {entries.map(x => (
                  <SectionContent
                    key={x.term}
                    columns={[2, 10]}
                    withBackground
                    mode={POSITIVE}
                    withPadding
                  >
                    <h3>{x.term}</h3>
                    <p>{x.definition}</p>
                    {x.note && (
                      <p
                        data-cy="glossary-definition-note"
                        css={`
                          font-style: italic;
                          margin-top: 1rem;
                        `}
                      >
                        Note: {x.note}
                      </p>
                    )}
                  </SectionContent>
                ))}
              </Section>
            )
          })}
      </PageBody>
    </Layout>
  )
}

export const query = graphql`
  {
    allGlossaryJson {
      nodes {
        term
        definition
        note
      }
    }
    image: file(relativePath: { eq: "glossary-map.png" }) {
      childImageSharp {
        gatsbyImageData(layout: CONSTRAINED, width: 600, placeholder: BLURRED)
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
        })
      ),
    }).isRequired,
    image: PropTypes.shape({
      childImageSharp: PropTypes.object.isRequired,
    }).isRequired,
  }),
  // location: PropTypes.object.isRequired,
}
