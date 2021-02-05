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

import theme from "../utils/theme"
import Label from "./label"
import { ChevronIcon, ArrowIcon } from "./icons"

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
      style={{
        maxHeight: `30rem`,
        overflowY: `auto`,
      }}
      index={indices}
      onChange={toggleAccordionItem}
      data-cy={`${id}-accordion`}
    >
      {folds.map((fold, index) => (
        <AccordionItem key={fold.id}>
          <span>
            <AccordionButton
              style={{
                borderWidth: `0 0 1px 0`,
                borderColor: `#FFF`,
                background: `none`,
                color: indices.includes(index) ? theme.color.link : `#FFF`,
                width: `100%`,
                textAlign: `left`,
                cursor: `pointer`,
                padding: `1rem`,
                textTransform: `uppercase`,
                fontWeight: `bold`,
                justifyContent: `space-between`,
                display: `flex`,
              }}
              data-cy="accordion-button"
            >
              <div>
                {fold.longname} ({fold.shortname})
              </div>
              <RotatingContainer isExpanded={indices.includes(index)}>
                <ChevronIcon role="img" aria-label="chevron-icon" />
              </RotatingContainer>
            </AccordionButton>
          </span>
          <AccordionPanel style={{ padding: `.5rem 1rem` }}>
            <div
              style={{
                display: `grid`,
                gridTemplateColumns: `1fr 1f 1fr 1fr`,
              }}
              data-cy={`${id}-accordion-content`}
            >
              {fold.image && (
                <Image
                  style={{ gridColumn: `1 / 2` }}
                  alt={fold.image.description}
                  fixed={fold.image.gatsbyImg.childImageSharp.fixed}
                  data-cy={`${id}-accordion-image`}
                />
              )}
              <div
                style={
                  fold.image
                    ? { gridColumn: `2 / 4`, paddingLeft: `.5rem` }
                    : { gridColumn: `1 / 4` }
                }
                data-cy={`${id}-accordion-image-description`}
              >
                {fold.description}
              </div>
            </div>
            {fold.gcmdPhenomenas && (
              <div style={{ margin: `3rem 0` }}>
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
              style={{ color: theme.color.link }}
              data-cy="accordion-link"
            >
              <Label
                id="accordion-link"
                display="flex"
                color={theme.color.link}
              >
                Learn More
                <ArrowIcon color={theme.color.link} />
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
