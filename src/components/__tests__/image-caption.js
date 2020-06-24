import React from "react"
import renderer from "react-test-renderer"
import ImageCaption from "../image-caption"

describe("ImageCaption", () => {
  it("renders caption on image", () => {
    const tree = renderer
      .create(
        <div style={{ position: `relative` }}>
          <img
            src="https://picsum.photos/300/300"
            alt="test-image"
            data-cy="test-image"
          />
          <ImageCaption id="test-image">caption</ImageCaption>
        </div>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
