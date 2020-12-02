import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
} from "@reach/accordion"

import theme from "../utils/theme"
import Label from "../components/label"

export default function AccordionComp({ folds }) {
  return (
    <Accordion style={{ maxHeight: `50rem`, overflowY: `scroll` }}>
      {folds.map(instrument => (
        <AccordionItem key={instrument.id}>
          <span>
            <AccordionButton
              style={{
                borderWidth: `0 0 1px 0`,
                borderColor: `white`,
                background: `none`,
                color: `white`,
                width: `100%`,
                textAlign: `left`,
                cursor: `pointer`,
                padding: `1rem`,
                textTransform: `uppercase`,
                fontWeight: `bold`,
              }}
            >
              {instrument.longname} ({instrument.shortname})
            </AccordionButton>
          </span>
          <AccordionPanel style={{ padding: `.5rem 1rem` }}>
            {instrument.description}
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
              <Label color={theme.color.link}>Learn More</Label>
            </Link>
          </AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

AccordionComp.propTypes = {
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
