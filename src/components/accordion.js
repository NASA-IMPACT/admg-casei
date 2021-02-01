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
import Label from "../components/label"
import { ChevronIcon, ArrowIcon } from "../components/icons"

const RotatingContainer = styled.div`
  transition: transform 240ms ease-in-out;
  transform: ${({ isExpanded }) =>
    isExpanded ? "rotate(180deg)" : "rotate(0deg)"};
`

export default function Accordion({ folds }) {
  // TODO: add logic to allow for all drawers to be closed. A controlled accordion by default does not work with 'collapsible' prop
  const [index, setIndex] = useState(0)
  return (
    <ReachAccordion
      style={{ maxHeight: `30rem`, overflowY: `scroll` }}
      index={index}
      onChange={value => setIndex(value)}
    >
      {folds.map((instrument, itemIndex) => (
        <AccordionItem key={instrument.id}>
          <span>
            <AccordionButton
              style={{
                borderWidth: `0 0 1px 0`,
                borderColor: `white`,
                background: `none`,
                color: itemIndex === index ? theme.color.link : `white`,
                width: `100%`,
                textAlign: `left`,
                cursor: `pointer`,
                padding: `1rem`,
                textTransform: `uppercase`,
                fontWeight: `bold`,
                justifyContent: `space-between`,
                display: `flex`,
              }}
            >
              <div>
                {instrument.longname} ({instrument.shortname})
              </div>
              <RotatingContainer isExpanded={itemIndex === index}>
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
            >
              {instrument.image && (
                <Image
                  style={{ gridColumn: `1 / 2` }}
                  alt={instrument.image.description}
                  fixed={instrument.image.gatsbyImg.childImageSharp.fixed}
                />
              )}
              <div
                style={
                  instrument.image
                    ? { gridColumn: `2 / 4`, paddingLeft: `.5rem` }
                    : { gridColumn: `1 / 4` }
                }
              >
                {instrument.description}
              </div>
            </div>

            <div style={{ margin: `3rem 0` }}>
              <Label>Measurements/Variables</Label>
              {instrument.gcmdPhenomenas
                .map(x =>
                  Object.values(x)
                    .filter(x => x)
                    .join(" > ")
                )
                .join(" > ") || "N/A"}
            </div>
            <Link
              to={`/instrument/${instrument.id}`}
              style={{ color: theme.color.link }}
            >
              <Label display="flex" color={theme.color.link}>
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
      shortname: PropTypes.string.isRequired,
      longname: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      gcmdPhenomenas: PropTypes.arrayOf(
        PropTypes.shape({
          term: PropTypes.string.isRequired,
          topic: PropTypes.string.isRequired,
          variable_1: PropTypes.string.isRequired,
          variable_2: PropTypes.string.isRequired,
          variable_3: PropTypes.string.isRequired,
        })
      ),
    })
  ).isRequired,
}
