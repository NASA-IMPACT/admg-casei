import React from "react"

import Layout from "../components/layout"
import DefinitionList from "../components/tables/definitionList"
import glossary from "../utils/glossary.json"

export default function Glossary() {
  const { terms } = glossary
  return (
    <Layout>
      <h1>Glossary</h1>
      <DefinitionList
        id="glossary"
        list={terms.map(x => ({
          title: x.term,
          content: (
            <div>
              <p>{x.definition}</p>
              {x.listOptions && (
                <ul>
                  {x.listOptions.map(listItem => (
                    <li key={listItem} style={{ listStyleType: `circle` }}>
                      {listItem}
                    </li>
                  ))}
                </ul>
              )}
              {x.note && (
                <p style={{ fontStyle: `italic`, marginTop: `1rem` }}>
                  Note: {x.note}
                </p>
              )}
            </div>
          ),
        }))}
      />
    </Layout>
  )
}
