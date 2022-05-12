import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@reach/disclosure"
import { v4 as uuidv4 } from "uuid"

import { NoResultsMessage } from "../../components/no-results-message"
import { ArrowIcon } from "../../icons"
import { NEGATIVE } from "../../utils/constants"
import { colors } from "../../theme"

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
  gap: 1.75rem;
  margin: 1.75rem 0;
`

const List = ({ list, card }) => {
  const [isOpen, setOpen] = React.useState(false)
  const disclosureId = uuidv4()

  return (
    <>
      <Grid>
        {list.slice(0, 20).map(campaign => {
          return (
            <card.component shortname={campaign.shortname} key={campaign.id} />
          )
        })}
      </Grid>

      {list.length > 20 && (
        <Disclosure
          id={disclosureId}
          open={isOpen}
          onChange={() => setOpen(!isOpen)}
        >
          {!isOpen && (
            <DisclosureButton
              css={`
                background-color: transparent;
                color: ${colors[NEGATIVE].text};
                border: 1px solid ${colors[NEGATIVE].text};
                padding: 1rem 5rem;
                text-transform: uppercase;
              `}
            >
              Show all
            </DisclosureButton>
          )}

          <DisclosurePanel>
            <Grid>
              {list.slice(20).map(campaign => {
                return (
                  <card.component
                    shortname={campaign.shortname}
                    key={campaign.id}
                  />
                )
              })}
            </Grid>
          </DisclosurePanel>
        </Disclosure>
      )}
    </>
  )
}

List.propTypes = {
  list: PropTypes.array,
  card: PropTypes.object,
}

const GroupedList = ({ groups, card }) => {
  return groups.map(([type, items]) => (
    <React.Fragment key={type}>
      <div
        css={`
          grid-column: 1 / -1;
          display: flex;
          justify-content: space-between;
          align-items: baseline;
        `}
      >
        <h2
          id={type}
          css={`
            grid-column: 1/-1;
            font-size: 2.25rem; /* match h3 */
          `}
        >
          {type} <small>({items.length})</small>
        </h2>
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
      </div>

      <List list={items} card={card} />
    </React.Fragment>
  ))
}

GroupedList.propTypes = {
  groups: PropTypes.array,
  card: PropTypes.object,
}

const ExploreSection = ({ list, groups, card }) => {
  return (
    <section>
      {list?.length ? (
        groups ? (
          <GroupedList groups={groups} card={card} />
        ) : (
          <List list={list} card={card} />
        )
      ) : (
        <NoResultsMessage />
      )}
    </section>
  )
}

ExploreSection.propTypes = {
  list: PropTypes.array,
  groups: PropTypes.array,
  card: PropTypes.object,
}

export default ExploreSection
