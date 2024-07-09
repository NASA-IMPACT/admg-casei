import React, { useState } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

import {
  Accordion as ReachAccordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
} from "@reach/accordion"

import Label from "./label"
import { ChevronIcon, ArrowIcon } from "../icons"
import { NEGATIVE } from "../utils/constants"
import { colors } from "../theme"
import GcmdPhenomenon from "./gcmd_phenomenon"

export const RotatingContainer = styled.div`
  transition: transform 240ms ease-in-out;
  transform: ${({ isExpanded }) =>
    isExpanded ? "rotate(180deg)" : "rotate(0deg)"};
`
const LearnMoreLink = styled.label`
  color: ${colors[NEGATIVE].linkText};
  display: flex;
  margin-left: 2rem;
  & a {
    display: flex;
    align-items: center;
    color: ${colors[NEGATIVE].linkText};
    cursor: pointer;
  }
`

export default function Accordion({ folds, id }) {
  const [indices, setIndices] = useState([])
  function toggleAccordionItem(toggledIndex) {
    if (indices.includes(toggledIndex)) {
      setIndices(indices.filter(currentIndex => currentIndex !== toggledIndex))
    } else {
      setIndices([...indices, toggledIndex].sort())
    }
  }
  return (
    <ReachAccordion
      css={`
         {
          max-height: 30rem;
          overflow-y: auto;
        }
      `}
      index={indices}
      onChange={toggleAccordionItem}
      data-cy={`${id}-accordion`}
    >
      {folds.map((fold, index) => (
        <AccordionItem key={fold.id}>
          <AccordionButton
            css={`
               {
                border-width: 0 0 1px 0;
                border-color: ${colors[NEGATIVE].altText};
                background: none;
                color: ${colors[NEGATIVE].text};
                width: 100%;
                text-align: left;
                cursor: pointer;
                padding: 1rem;
                text-transform: none;
                font-weight: bold;
                font-size: 1rem;
                justify-content: space-between;
                display: flex;
              }
            `}
            data-cy="accordion-button"
          >
            <span>
              {fold.longname
                ? `${fold.longname} (${fold.shortname})`
                : fold.shortname}
            </span>
            <RotatingContainer isExpanded={indices.includes(index)}>
              <ChevronIcon role="img" aria-label="chevron-icon" />
            </RotatingContainer>
          </AccordionButton>
          <AccordionPanel
            css={`
               {
                padding: 1.5rem 1rem;
                cursor: default;
                background: rgba(235, 235, 248, 0.05);
              }
            `}
          >
            <div
              css={`
                 {
                  display: grid;
                  grid-template-columns: 1fr 1fr 1fr 1fr;
                }
              `}
              data-cy={`${id}-accordion-content`}
            >
              {fold.image && fold.image.gatsbyImg && (
                <GatsbyImage
                  image={fold.image.gatsbyImg.childImageSharp.gatsbyImageData}
                  css={`
                     {
                      grid-column: 1 / 2;
                    }
                  `}
                  alt={fold.image.description}
                  data-cy={`${id}-accordion-image`}
                />
              )}
              {fold.image ? (
                <div
                  css={`
                     {
                      grid-column: 2 / 4;
                      padding-left: 0.5rem;
                    }
                  `}
                  data-cy={`${id}-accordion-image-description`}
                >
                  {fold.description}
                </div>
              ) : (
                <div
                  css={`
                     {
                      grid-column: 1 / 4;
                    }
                  `}
                  data-cy={`${id}-accordion-image-description`}
                >
                  {fold.description}
                </div>
              )}
            </div>
            {fold.gcmdPhenomena && (
              <div
                css={`
                   {
                    margin: 2rem 0;
                  }
                `}
              >
                <Label id="accordion-measurements">
                  Measurements/Variables
                </Label>
                {fold.gcmdPhenomena.map(x => (
                  <GcmdPhenomenon key={x.id} gcmdPhenomenon={x} />
                ))}
              </div>
            )}
            <LearnMoreLink id="accordion-link">
              <Link
                to={`/instrument/${fold.shortname}`}
                data-cy="accordion-link"
              >
                Learn More
                <ArrowIcon color={colors[NEGATIVE].linkText} />
              </Link>
            </LearnMoreLink>
          </AccordionPanel>
        </AccordionItem>
      ))}
    </ReachAccordion>
  )
}

Accordion.propTypes = {
  folds: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      shortname: PropTypes.string,
      longname: PropTypes.string,
      description: PropTypes.string,
      gcmdPhenomena: PropTypes.arrayOf(
        PropTypes.shape({
          category: PropTypes.string,
          term: PropTypes.string,
          topic: PropTypes.string,
          variable_1: PropTypes.string,
          variable_2: PropTypes.string,
          variable_3: PropTypes.string,
        })
      ),
    })
  ).isRequired,
  id: PropTypes.string,
}
