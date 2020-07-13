import React from "react"

import Layout from "../components/layout"
import DefinitionList from "../components/tables/definitionList"
import glossary from "../utils/glossary.json"

export default function Glossary() {
  console.log("glossary", glossary)
  const { terms } = glossary
  return (
    <Layout>
      <h1>Glossary</h1>
      <DefinitionList
        id="glossary"
        list={terms.map(x => ({
          title: x.term,
          content: x.definition,
        }))}
      />
    </Layout>
  )
}
