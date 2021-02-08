import React from "react"
import renderer from "react-test-renderer"
import Card from "../cards/card"
import { CampaignIcon } from "../../icons"

const CardContent = () => (
  <div>
    <big
      style={{ fontWeight: `bold`, marginTop: `0.5rem` }}
      data-cy="shortname"
    >
      GCPEx
    </big>
    <p data-cy="longname">GPM Cold Season Precipitation Experiment</p>
    <p data-cy="description">description....</p>
  </div>
)
const testTag = "Stationary"
const testFooterList = [
  { count: 1, title: "Collection Periods" },
  { count: 0, title: "Data Products" },
]

describe("Card", () => {
  it("renders plain card", () => {
    const tree = renderer
      .create(
        <Card placeholder={CampaignIcon} category="campaigns">
          <CardContent />
        </Card>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("renders card with tag", () => {
    const tree = renderer
      .create(
        <Card placeholder={CampaignIcon} category="campaigns" tag={testTag}>
          <CardContent />
        </Card>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("renders with footer list", () => {
    const tree = renderer
      .create(
        <Card
          placeholder={CampaignIcon}
          category="campaigns"
          testFooterList={testFooterList}
        >
          <CardContent />
        </Card>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
