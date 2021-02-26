import React, { useState } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { Link } from "gatsby"
import Image from "gatsby-image"

import {
  Accordion as ReachAccordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
} from "@reach/accordion"

import Label from "./label"
import { ChevronIcon, ArrowIcon } from "../icons"
import { NEGATIVE } from "../utils/constants"
import { colors } from "../utils/theme"

const RotatingContainer = styled.div`
  transition: transform 240ms ease-in-out;
  transform: ${({ isExpanded }) =>
    isExpanded ? "rotate(180deg)" : "rotate(0deg)"};
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
                padding: 0.5rem 1rem;
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
              {fold.image && (
                <Image
                  css={`
                     {
                      grid-column: 1 / 2;
                    }
                  `}
                  alt={fold.image.description}
                  fixed={fold.image.gatsbyImg.childImageSharp.fixed}
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
            {fold.gcmdPhenomenas && (
              <div
                css={`
                   {
                    margin: 3rem 0;
                  }
                `}
              >
                <Label id="accordion-measurements">
                  Measurements/Variables
                </Label>
                {fold.gcmdPhenomenas
                  .map(x =>
                    Object.values(x)
                      .filter(x => x)
                      .join(" > ")
                  )
                  .join(" > ") || "N/A"}
              </div>
            )}
            <Link
              to={`/instrument/${fold.id}`}
              css={`
                 {
                  color: ${colors[NEGATIVE].linkText};
                }
              `}
              data-cy="accordion-link"
            >
              <Label
                id="accordion-link"
                display="flex"
                color={colors[NEGATIVE].linkText}
              >
                Learn More
                <ArrowIcon color={colors[NEGATIVE].linkText} />
              </Label>
            </Link>
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
      gcmdPhenomenas: PropTypes.arrayOf(
        PropTypes.shape({
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
