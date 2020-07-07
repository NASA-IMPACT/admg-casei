import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

import Layout from "../../components/layout"
import InpageNav from "./inpage-nav"
import Header from "./header"
import SectionBlock from "../../components/section/section-block"

const InstrumentTemplate = ({ data: { instrument } }) => {
  console.log("data", data, instrument)
  return (
    <Layout>
      <InpageNav />
      <Header shortname={instrument.shortname} longname={instrument.longname} />
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    instrument: instrument(id: { eq: $slug }) {
      ...instrumentHeaderFields
    }
  }
`

export default InstrumentTemplate
