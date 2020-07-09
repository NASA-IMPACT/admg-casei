import React from "react"
import renderer from "react-test-renderer"
import Hero from "../hero"

const testTagTitle = "Instrument"
const testTitle = "2D-C/P"
const testSubTitle = "2D-C/P Hydrometeor Imaging Probe"
const testDescription = "The 2DC probe records images of hydrometeors..."
const testTextToImageRatio = [5, 3]
const testId = "test"

describe("Header", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(
        <Hero
          tagTitle={testTagTitle}
          title={testTitle}
          subTitle={testSubTitle}
          description={testDescription}
          id={testId}
        >
          <div>children</div>
        </Hero>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("renders with adjust ratios", () => {
    const tree = renderer
      .create(
        <Hero
          tagTitle={testTagTitle}
          title={testTitle}
          subTitle={testSubTitle}
          description={testDescription}
          textToImageRatio={testTextToImageRatio}
        >
          <div>children</div>
        </Hero>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
