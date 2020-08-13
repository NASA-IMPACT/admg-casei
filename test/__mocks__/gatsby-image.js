/* eslint-disable no-unused-vars */
const React = require("react")
const gatsbyImage = jest.requireActual("gatsby-image")

// TODO: understand how to properly mock gatsby-image
// Warning: Failed prop type: Invalid prop `fluid` supplied to `Image`.
module.exports = {
  ...gatsbyImage,
  deafult: {
    ...gatsbyImage.default,
    Image: jest.fn().mockImplementation(() => React.createElement("div", {})),
    propTypes: {
      fluid: "test",
    },
  },
}
