/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const fetch = require("node-fetch")
const path = require(`path`)

exports.sourceNodes = async ({ actions, createContentDigest }) => {
  const { createNode } = actions

  const response = await fetchData("http://admg.nasa-impact.net/api/campaign", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer <token>",
    },
  })

  if (response.success) {
    response.data.forEach(campaign => {
      createNode({
        // Data for the node.
        ...campaign,

        // Required fields.
        id: campaign.uuid,
        parent: null,
        children: [],
        internal: {
          type: `campaign`,
          contentDigest: createContentDigest(campaign),
          description: `Creating nodes from /campaign endpoint`,
        },
      })
    })
  } else {
    console.log("request failed", response.message)
  }
  // You're done, return.
  return
}

const fetchData = async (url, options = {}) => {
  const response = await fetch(`${url}`, options)
  return await response.json()
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  // **Note:** The graphql function call returns a Promise
  // see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise for more info
  const result = await graphql(`
    {
      allCampaign {
        nodes {
          id
          shortname: short_name
          platforms: platform_types
        }
      }
    }
  `)

  result.data.allCampaign.nodes.forEach(node => {
    createPage({
      path: `campaign/${node.id}`,
      component: path.resolve(`./src/templates/campaign/index.js`),
      context: {
        slug: node.id,
        shortname: node.shortname,
        platforms: node.platforms,
      },
    })
  })
}
