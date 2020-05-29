import React from "react"
import { graphql } from "gatsby"

import NorthAmerica from "../../data/north-america.svg"

const Header = ({
  shortname,
  longname,
  focus,
  countDeployments,
  countDataproducts,
}) => {
  const StatNumber = ({ number = "--", label }) => (
    <>
      <dt style={{ fontSize: `3rem` }}>
        {number.length === 0 ? "--" : number}
      </dt>
      <dd style={{ gridRowStart: 2, textTransform: `uppercase` }}>{label}</dd>
    </>
  )

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
          <StatNumber number="--" label="Flights" />
          <StatNumber number={countDataproducts} label="Data Products" />
        </dl>
      </div>
      <div style={{ flex: `1` }}>
        <img src={NorthAmerica} alt="North America" data-cy="overview-map" />
      </div>
    </header>
  )
}

export default Header

export const headerFields = graphql`
  fragment headerFields on CampaignCsv {
    shortname: Campaign_Shortname
    longname: Campaign_Longname
    focus: NASA_Earth_Science_Focus_Areas
    countDeployments: Number_of_Deployments
    countDataproducts: Number_of_Published_Data_Products
  }
`
