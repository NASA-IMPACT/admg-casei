/* eslint-disable no-unused-vars */
const React = require("react")
const gatsbyImage = jest.requireActual("gatsby-image")

module.exports = {
  ...gatsbyImage,
  default: function Image(props) {
    return <img alt="test-image" src="test-image.png" {...props} />
  },
}
