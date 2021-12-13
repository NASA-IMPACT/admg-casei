import React from "react"
import PropTypes from "prop-types"
import { graphql, Link } from "gatsby"
import styled from "styled-components"
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@reach/disclosure"

import Layout, {
  PageBody,
  Section,
  SectionHeader,
  SectionContent,
} from "../components/layout"
import SEO from "../components/seo"
import { ChevronIcon } from "../icons"
import { colors } from "../theme"
import { NEGATIVE } from "../utils/constants"

const Question = styled(DisclosureButton)`
  background-color: transparent;
  border: 0;
  text-transform: none;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Answer = styled(DisclosurePanel)`
  padding-bottom: 1rem;
`

export default function FAQ({ data }) {
  return (
    <Layout>
      <SEO title="FAQs" lang="en" />
      <PageBody id="faq">
        <h1>FAQs</h1>

        <Section id="intro">
          <SectionContent columns={[1, 4]}>
            <p>
              These are the most frequently asked questions. If you have any
              other questions, please{" "}
              <Link
                to="/contact"
                css={`
                  text-decoration: underline;
                  text-underline-offset: 2px;
                `}
              >
                contact us
              </Link>
              .
            </p>
          </SectionContent>
        </Section>

        {data.allFaqJson.group.map(({ nodes, section }) => {
          return (
            <Section id={section} key={section}>
              <SectionHeader id={section} headline={section} />

              <SectionContent
                columns={[1, 8]}
                css={`
                  border-top: 1px solid ${colors[NEGATIVE].altText};
                  border-bottom: 1px solid ${colors[NEGATIVE].altText};
                `}
              >
                {nodes.map(x => (
                  <Disclosure key={x.question}>
                    <Question>
                      <h3>{x.question}</h3>

                      <ChevronIcon role="img" aria-label="chevron-icon" />
                    </Question>
                    <Answer>
                      <p>{x.answer}</p>
                    </Answer>
                  </Disclosure>
                ))}
              </SectionContent>
            </Section>
          )
        })}
      </PageBody>
    </Layout>
  )
}

export const query = graphql`
  {
    allFaqJson {
      group(field: section) {
        nodes {
          question
          answer
        }
        section: fieldValue
      }
    }
  }
`

FAQ.propTypes = {
  data: PropTypes.shape({
    allFaqJson: PropTypes.shape({
      group: PropTypes.arrayOf(
        PropTypes.shape({
          nodes: PropTypes.arrayOf(
            PropTypes.shape({
              term: PropTypes.string.isRequired,
              definition: PropTypes.string.isRequired,
              note: PropTypes.string,
            })
          ),
          section: PropTypes.string.isRequired,
        })
      ),
    }).isRequired,
  }),
  // location: PropTypes.object.isRequired,
}
