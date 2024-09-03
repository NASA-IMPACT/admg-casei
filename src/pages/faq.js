import React from "react"
import PropTypes from "prop-types"
import { graphql, Link } from "gatsby"
import styled from "styled-components"
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@reach/disclosure"

import {
  PageBody,
  Section,
  SectionHeader,
  SectionContent,
} from "../components/layout"
import SEO from "../components/seo"
import { ChevronIcon } from "../icons"
import { colors } from "../theme"
import { NEGATIVE } from "../utils/constants"
import { RotatingContainer } from "../components/accordion"
import { StringTemplateParser } from "../components/string-template-parser"

const Border = styled.div`
  border-top: 1px solid ${colors[NEGATIVE].altText};
  border-bottom: 1px solid ${colors[NEGATIVE].altText};

  & + div {
    border-top: 0; /* prevent doubled border between 2 neighboring components*/
  }
`

const Question = styled(DisclosureButton)`
  background-color: transparent;
  border: 0;
  text-transform: none;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: left;
  cursor: pointer;
  padding: 1.25rem 0;
`

const Answer = styled(DisclosurePanel)`
  padding-bottom: 3rem;
`

export default function FAQ({ data }) {
  return (
    <>
      <SEO title="FAQs" lang="en" />
      <PageBody id="faq">
        <h1>FAQs</h1>

        <Section id="intro">
          <SectionContent columns={[1, 8]}>
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

        {data.allFaqJson.group.map(({ nodes, section }, sectionIdx) => {
          return (
            <Section id={section} key={section}>
              <SectionHeader
                id={section}
                headline={section.slice(2)}
                spanWidth={7}
              />

              <SectionContent>
                {nodes.map((x, idx) => (
                  <QandA id={`${sectionIdx}-${idx}`} key={x.question} {...x} />
                ))}
              </SectionContent>
            </Section>
          )
        })}
      </PageBody>
    </>
  )
}

export const query = graphql`
  {
    allFaqJson {
      group(field: section) {
        nodes {
          question
          answer
          links {
            id
            text
            url
          }
          images {
            id
            alt
          }
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
              question: PropTypes.string.isRequired,
              answer: PropTypes.string.isRequired,
              links: PropTypes.PropTypes.arrayOf(
                PropTypes.shape({
                  id: PropTypes.string.isRequired,
                  text: PropTypes.string.isRequired,
                  url: PropTypes.string.isRequired,
                })
              ),
              images: PropTypes.PropTypes.arrayOf(
                PropTypes.shape({
                  id: PropTypes.string.isRequired,
                  alt: PropTypes.string.isRequired,
                })
              ),
            })
          ),
          section: PropTypes.string.isRequired,
        })
      ),
    }).isRequired,
  }),
  // location: PropTypes.object.isRequired,
}

const QandA = ({ id, question, answer, links, images }) => {
  const [isOpen, setOpen] = React.useState(false)

  return (
    <Disclosure
      id={id}
      key={question}
      open={isOpen}
      onChange={() => setOpen(!isOpen)}
    >
      <Border>
        <Question>
          <h3
            css={`
              margin: 0;
              max-width: 80%;
            `}
          >
            {question}
          </h3>

          <RotatingContainer isExpanded={isOpen}>
            <ChevronIcon role="img" aria-label="chevron-icon" />
          </RotatingContainer>
        </Question>
        <Answer>
          <div
            css={`
              display: grid;
              grid-template-columns: repeat(12, 1fr);
              column-gap: 1rem;
            `}
          >
            <p
              css={`
                grid-column: 1 / span 8;
              `}
            >
              <StringTemplateParser
                expression={answer}
                replacements={{ links, images }}
              />
            </p>
          </div>
        </Answer>
      </Border>
    </Disclosure>
  )
}

QandA.propTypes = {
  id: PropTypes.string.isRequired,
  question: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
  links: PropTypes.PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ),
  images: PropTypes.PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired,
    })
  ),
}
