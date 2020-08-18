/* eslint-disable no-unused-vars */
const React = require("react")
const gatsbyImage = jest.requireActual("gatsby-image")

module.exports = {
  ...gatsbyImage,
  default: props => <img alt="test-image" src="test-image.png" {...props} />,
}
