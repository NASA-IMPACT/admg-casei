/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const fetch = require("node-fetch")
const path = require("path")
const { createRemoteFileNode } = require("gatsby-source-filesystem")

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
    type campaign implements Node {
      focus_areas: [focus_area] @link
      geophysical_concepts: [geophysical_concept] @link
      partner_orgs: [partner_org] @link
      platforms: [platform] @link
      seasons: [season] @link
      instruments: [instrument] @link
    }
    type instrument implements Node {
      platforms: [platform] @link
    }
    type platform implements Node {
      campaigns: [campaign] @link
    }
    type contentJson implements Node {
      platformJson: imageJson
      platformImg: File @link(from: "platformImg___NODE")
    }
    type imageJson {
      title: String!
      platformImgUrl: String
      platformImgAlt: String
    }
  `

  createTypes(typeDefs)
}

exports.onCreateNode = async ({
  node,
  actions: { createNode },
  store,
  cache,
  createNodeId,
}) => {
  if (
    node.internal.type === "PlatformImagesJson" &&
    node.platformImgUrl !== null
  ) {
    let fileNode = await createRemoteFileNode({
      url: node.platformImgUrl, // string that points to the URL of the image
      parentNodeId: node.id, // id of the parent node of the fileNode you are going to create
      createNode, // helper function in gatsby-node to generate the node
      createNodeId, // helper function in gatsby-node to generate the node id
      cache, // Gatsby's cache
      store, // Gatsby's redux store
    })

    // if the file was created, attach the new node to the parent node
    if (fileNode) {
      node.platformImg___NODE = fileNode.id
    }
  }
}

exports.sourceNodes = async ({ actions, createContentDigest }) => {
  const { createNode } = actions
  try {
    const endpoints = [
      "campaign",
      "deployment",
      "focus_area",
      "geographical_region",
      "geophysical_concept",
      "instrument",
      "instrument_type",
      "partner_org",
      "platform",
      "season",
    ]

    let responses = await Promise.all(endpoints.map(key => fetchData(key)))

    responses.forEach(response => {
      if (response.success) {
        response.data.forEach(item => {
          createNode({
            // Data for the node.
            ...item,

            // Required fields.
            id: item.uuid,
            parent: null,
            children: [],
            internal: {
              type: response.type,
              contentDigest: createContentDigest(item),
              description: `Creating nodes from ${response.type} endpoint`,
            },
          })
        })
      } else {
        console.log("request failed for ", response.type, response.message)
      }
    })
  } catch (error) {
    console.log("catch error", error)
  }

  // You're done, return.
  return
}

const fetchData = async endpoint => {
  const response = await fetch(`http://admg.nasa-impact.net/api/${endpoint}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.ADMG_ACCESS_TOKEN}`,
    },
  })
  const json = await response.json()
  return { type: endpoint, ...json }
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
        }
      }
      allInstrument {
        nodes {
          id
        }
      }
      allPlatform {
        nodes {
          id
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
      },
    })
  })
  result.data.allInstrument.nodes.forEach(node => {
    createPage({
      path: `instrument/${node.id}`,
      component: path.resolve(`./src/templates/instrument/index.js`),
      context: {
        slug: node.id,
      },
    })
  })
  result.data.allPlatform.nodes.forEach(node => {
    createPage({
      path: `platform/${node.id}`,
      component: path.resolve(`./src/templates/platform/index.js`),
      context: {
        slug: node.id,
      },
    })
  })
}
