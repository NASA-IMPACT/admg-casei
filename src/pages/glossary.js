import React, { useState } from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { VisuallyHidden } from "@reach/visually-hidden"
import { PageBody, SectionHeader, SectionContent } from "../components/layout"
import SEO from "../components/seo"
import ExternalLink from "../components/external-link"
import { ArrowIcon } from "../icons"
import { colors, breakpoints } from "../theme"
import { ALPHABET, POSITIVE, NEGATIVE } from "../utils/constants"

export default function Glossary({ data }) {
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

  return (
    <>
      <SEO title="Glossary" lang="en" />
      <PageBody id="glossary">
        <h1>Glossary</h1>

        <SectionContent columns={[1, 8]}>
          <h2
            css={`
              margin-top: 2rem;
            `}
          >
            Introduction
          </h2>
          <p>
            The Airborne Data Management Group (ADMG) uses the following
            formalized definitions to build the NASA Airborne and Field
            Investigation Inventory, also called the Catalog of Archived
            Suborbital Earth science Investigations, or CASEI.<br></br>
            Consistent terminology is required to organize the wide variety of
            airborne and field investigation metadata; therefore, these
            definitions are used to communicate the ADMG terminology to
            inventory users. Where possible, definitions are made to agree with
            those in standard use in the communities served by ADMG and some are
            similar to those in the EOSDIS{" "}
            <a href="https://www.earthdata.nasa.gov/learn/glossary">Glossary</a>
            . Note, however, that ADMG definitions may or may not match similar
            terms used by other entities within or external to NASA. These ADMG
            definitions of inventory-specific terms are provided below.
          </p>
          <p>
            A technical note documenting ADMG CASEI Inventory Terms Definitions
            was approved by NASA Earth Science Data Systems (ESDS) and is
            available{" "}
            <a href="https://www.earthdata.nasa.gov/esdis/esco/standards-and-practices/admg-casei">
              via their website.
            </a>
          </p>
          <h2
            css={`
              margin-top: 2rem;
            `}
          >
            Structure of Airborne and Field Investigation Components
          </h2>
          <p>
            Many terms are related and represent the hierarchical organization
            of investigation information structure as outlined below:
          </p>
          <p>NASA Project, Program, Mission</p>
          <ul>
            <li>
              Field Investigation (also called campaign) — supports NASA goals
              <ul>
                <li>
                  Deployment — occurs within a Field Investigation (one or more
                  per investigation)
                  <ul>
                    <li>
                      Significant Event — within a Deployment (may/may not
                      occur, can be outside IOP)
                    </li>
                    <li>
                      IOP (Intensive Operation Period) — one or more per
                      deployment, must be within a deployment
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
          <p>
            This relationship is shown in the following figure representing the
            information model used in inventory development. The goal of this
            ADMG effort is to identify the terms used for inventory construction
            and identify the correct level within this set of definitions.
            Synonyms for a given term that we have found to be used by various
            communities are listed. It is important to note that these synonyms
            are only words we hear used. ADMG uses the contextual information
            from authoritative sources to translate used terms to inventory
            terms. The various words used do not always relate to the same word
            in this ADMG term list. For example, the synonym mission for a
            flight is in no way connected to the term mission as defined by
            ADMG. To aid with translation between existing words and these
            inventory terms, decision trees are utilized to ensure consistent
            decision making by the curation team members.<br></br>Note: ADMG
            uses the terms “instrument” and “sensor” interchangeably.
          </p>
        </SectionContent>

        <div
          css={`
            margin-bottom: 6rem;
          `}
          data-cy="glossary-img-section"
        >
          <h2
            id="glossary-img"
            css={`
              margin-top: 2rem;
            `}
          >
            Terminology map
          </h2>

          <SectionContent>
            <figure
              css={`
                text-align: center;
              `}
            >
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://earthdata.nasa.gov/esds/impact/admg/admg-definitions"
                aria-label="Visit the admg page with the terminology map (opens in a new window)"
              >
                <GatsbyImage
                  image={data.image.childImageSharp.gatsbyImageData}
                  alt="terminology map"
                />
              </a>
              <figcaption>
                Source:{" "}
                <ExternalLink
                  id="ADMG Definitions"
                  label="https://earthdata.nasa.gov/esds/impact/admg/admg-definitions"
                  url="https://earthdata.nasa.gov/esds/impact/admg/admg-definitions"
                />
              </figcaption>
            </figure>
          </SectionContent>
        </div>

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

        {Object.entries(alphabeticalGlossary)
          // eslint-disable-next-line no-unused-vars
          .filter(([a, x]) => x.length)
          // eslint-disable-next-line no-unused-vars
          // .filter(([letter, x]) =>
          //   selectedLetter ? letter === selectedLetter : true
          // )
          .map(([letter, entries]) => {
            return (
              <div
                css={`
                  margin: 0 -2rem;
                  padding: 0rem 2rem;
                  @media screen and (min-width: ${breakpoints["sm"]}) {
                    margin: 0 -6rem;
                    padding: 0rem 6rem;
                  }
                  display: grid;
                  grid-template-columns: repeat(12, 1fr);
                  column-gap: 1rem;

                  position: relative;
                `}
                id={letter}
                key={letter}
              >
                <div
                  css={`
                    position: absolute;
                    top: -76px;
                  `}
                />
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
                    slimPadding
                  >
                    <h3>{x.term}</h3>
                    <div>
                      {x.links ? <LinkSection node={x} /> : x.definition}
                    </div>
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
              </div>
            )
          })}
      </PageBody>
    </>
  )
}

const LinkSection = ({ node }) => {
  const templatePattern = /{{\s?([^{}\s]*)\s?}}/g
  // split definition text by the template pattern
  const parts = node.definition.split(templatePattern)
  // map over parts and perform replacement
  return (
    <div>
      {parts.map((part, index) => {
        // return first element of parts array which matches node.id
        // eslint-disable-next-line
        const link = node.links?.find(link => link.id === part)

        // if a part matches link.id, replace that part with an ExternalLink, and reconcat as node.definition
        if (link) {
          return (
            // eslint-disable-next-line
            <span key={index}>
              <ExternalLink
                label={link.text}
                url={link.url}
                id={link.id}
              ></ExternalLink>
            </span>
          )
        }
        // Otherwise, return the part as is
        return part
      })}
    </div>
  )
}

LinkSection.propTypes = {
  node: PropTypes.shape({
    definition: PropTypes.string.isRequired,
    links: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
      })
    ),
  }).isRequired,
}

export const query = graphql`
  {
    allGlossaryJson {
      nodes {
        term
        definition
        note
        links {
          id
          text
          url
        }
      }
    }
    image: file(relativePath: { eq: "glossary-map.jpeg" }) {
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
          links: PropTypes.PropTypes.arrayOf(
            PropTypes.shape({
              id: PropTypes.string,
              text: PropTypes.string,
              url: PropTypes.string,
            })
          ),
        })
      ),
    }).isRequired,
    image: PropTypes.shape({
      childImageSharp: PropTypes.object.isRequired,
    }).isRequired,
  }),
}
