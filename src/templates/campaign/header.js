import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import NorthAmerica from "../../images/north-america.svg"

const StatNumber = ({ number, label }) => (
  <>
    <dt
      className={!number || number.length === 0 ? "placeholder" : ""}
      style={{ fontSize: `3rem` }}
    >
      {!number || number.length === 0 ? "--" : number}
    </dt>
    <dd style={{ gridRowStart: 2, textTransform: `uppercase` }}>{label}</dd>
  </>
)

StatNumber.propTypes = {
  number: PropTypes.number,
  label: PropTypes.string.isRequired,
}

const Header = ({
  shortname,
  longname,
  focusIds,
  countDeployments,
  countDataproducts,
}) => {
  const data = useStaticQuery(graphql`
    query {
      allFocusArea {
        nodes {
          id
          shortname: short_name
          longname: long_name
        }
      }
    }
  `)
  const focus = data.allFocusArea.nodes
    .filter(x => focusIds.includes(x.id))
    .map(x => x.shortname)
    .join(", ")

  return (
    <header style={{ display: `flex` }}>
      <div style={{ flex: `1.61803398875` }}>
        <div>
          <p>{shortname}</p>
          <h1>{longname}</h1>
          <p>{focus}</p>
        </div>
        <dl style={{ display: `grid` }} data-cy="stats">
          <StatNumber number={countDeployments} label="Deployments" />
          <StatNumber number={null} label="Flights" />
          <StatNumber number={countDataproducts} label="Data Products" />
        </dl>
      </div>
      <div className="placeholder" style={{ flex: `1` }}>
        <img src={NorthAmerica} alt="North America" data-cy="overview-map" />
      </div>
    </header>
  )
}

export const headerFields = graphql`
  fragment headerFields on campaign {
    shortname: short_name
    longname: long_name
    focus: focus_areas
    countCollectionPeriods: number_collection_periods
    countDataproducts: number_data_products
  }
`

Header.propTypes = {
  shortname: PropTypes.string.isRequired,
  longname: PropTypes.string.isRequired,
  focusIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  countDeployments: PropTypes.number.isRequired,
  countDataproducts: PropTypes.number.isRequired,
}

export default Header
