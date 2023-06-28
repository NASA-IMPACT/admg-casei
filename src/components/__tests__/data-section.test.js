import React from "react"
import { create } from "react-test-renderer"

import DataSection from "../data-section"
import { instrumentQuery } from "../../../test/__fixtures__"

describe("Data Section", () => {
  it("matches snapshot", () => {
    const tree = create(
      <DataSection
        id="data"
        dois={instrumentQuery.data.instrument.dois}
        filterBy={["campaigns", "platforms", "formats"]}
        category="instrument"
      />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
