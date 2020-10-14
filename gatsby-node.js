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
      deployments: [deployment] @link
      dois: [doi] @link
      focus_areas: [focus_area] @link
      geophysical_concepts: [geophysical_concept] @link
      instruments: [instrument] @link
      partner_orgs: [partner_org] @link
      platform_types: [platform_type] @link
      platforms: [platform] @link
      seasons: [season] @link
      logo: NasaImagesJson @link(by: "shortname", from: "short_name")
    }
    type collection_period implements Node {
      dois: [doi] @link
    }
    type deployment implements Node {
      collection_periods: [collection_period] @link
      geographical_regions: [geographical_region] @link
    }
    type geographical_region implements Node {
      image: NasaImagesJson @link(by: "shortname", from: "short_name")
    }
    type instrument implements Node {
      campaigns: [campaign] @link
      gcmd_phenomenas: [gcmd_phenomena] @link
      image: image @link
      instrument_types: [instrument_type] @link
      measurement_regions: [measurement_region] @link
      platforms: [platform] @link
      repositories: [repository] @link
    }
    type platform implements Node {
      campaigns: [campaign] @link
      image: image @link
      instruments: [instrument] @link
    }
    type NasaImagesJson implements Node {
      nasaImg: File @link(from: "nasaImg___NODE")
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
  if (node.internal.type === "NasaImagesJson" && !!node.nasaImgUrl) {
    let fileNode = await createRemoteFileNode({
      url: node.nasaImgUrl, // string that points to the URL of the image
      parentNodeId: node.id, // id of the parent node of the fileNode you are going to create
      createNode, // helper function in gatsby-node to generate the node
      createNodeId, // helper function in gatsby-node to generate the node id
      cache, // Gatsby's cache
      store, // Gatsby's redux store
    })

    // if the file was created, attach the new node (=File) to the parent node (=NasaImagesJson)
    if (fileNode) {
      node.nasaImg___NODE = fileNode.id
    }
  }

  if (node.internal.type === "image") {
    // TODO: remove when backend team fixes the /image endpoint response

    if (node.image.includes(".gif")) return // .gif format breaks gatsby build
    let fileNode = await createRemoteFileNode({
      url: node.image, // string that points to the URL of the image
      parentNodeId: node.id, // id of the parent node of the fileNode you are going to create
      createNode, // helper function in gatsby-node to generate the node
      createNodeId, // helper function in gatsby-node to generate the node id
      cache, // Gatsby's cache
      store, // Gatsby's redux store
    })

    // if the file was created, attach the new node (=File) to the parent node (=image)
    if (fileNode) {
      node.gatsbyImg___NODE = fileNode.id
    }
  }
}

exports.sourceNodes = async ({ actions, createContentDigest }) => {
  const { createNode } = actions
  try {
    const endpoints = [
      "campaign",
      "collection_period",
      "deployment",
      "doi",
      "focus_area",
      "gcmd_phenomena",
      "geographical_region",
      "geophysical_concept",
      "image",
      "instrument",
      "instrument_type",
      "measurement_region",
      "partner_org",
      "platform",
      "platform_type",
      "repository",
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
      } else if (response.type === "image") {
        Object.values(response).forEach(item => {
          if (typeof item === "string") return
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
  const response = await fetch(`https://admg.nasa-impact.net/api/${endpoint}`, {
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

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === "build-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /mapbox-gl/,
            use: loaders.null(),
          },
        ],
      },
    })
  }
}
