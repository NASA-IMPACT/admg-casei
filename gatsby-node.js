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
      aliases: [alias] @link
      deployments: [deployment] @link
      dois: [doi] @link
      focus_areas: [focus_area] @link
      geophysical_concepts: [geophysical_concept] @link
      instruments: [instrument] @link
      iops: [iop] @link
      partner_orgs: [partner_org] @link
      platform_types: [platform_type] @link
      platforms: [platform] @link
      repositories: [repository] @link
      seasons: [season] @link
      significant_events: [significant_event] @link
      websites: [campaign_website]
      logo: LogosJson @link(by: "shortname", from: "short_name")
    }
    type campaign_website implements Node {
      priority: String
      campaign: campaign @link
      website: website @link
    }
    type collection_period implements Node {
      dois: [doi] @link
    }
    type deployment implements Node {
      collection_periods: [collection_period] @link
      geographical_regions: [geographical_region] @link
      iops: [iop] @link
      significant_events: [significant_event] @link
    }
    type doi implements Node {
      campaigns: [campaign] @link
      instruments: [instrument] @link
      platforms: [platform] @link
    }
    type focus_area implements Node {
      campaigns: [campaign] @link
    }
    type geographical_region implements Node {
      image: NasaImagesJson @link(by: "shortname", from: "short_name")
    }
    type instrument implements Node {
      campaigns: [campaign] @link
      gcmd_phenomenas: [gcmd_phenomena] @link
      image: image @link
      measurement_type: measurement_type @link
      measurement_regions: [measurement_region] @link
      platforms: [platform] @link
      repositories: [repository] @link
      dois: [doi] @link
    }
    type platform implements Node {
      campaigns: [campaign] @link
      image: image @link
      instruments: [instrument] @link
      dois: [doi] @link
    }
    type website implements Node {
      title: String
      url: String
      description: String
      notes_public: String
      website_type: website_type @link
    }
    type website_type implements Node {
      websites: [website] @link
      long_name: String
      description: String
    }
    type NasaImagesJson implements Node {
      nasaImg: File @link(from: "nasaImg___NODE")
    }
    type LogosJson implements Node {
      logoImg: File!
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
    try {
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
    } catch (error) {
      console.log(error)
    }
  }

  if (node.internal.type === "image") {
    if (node.image.includes(".gif")) return // .gif format breaks gatsby build

    try {
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
    } catch (error) {
      console.log(error)
    }
  }
}

exports.sourceNodes = async ({ actions, createContentDigest }) => {
  const { createNode } = actions
  try {
    const endpoints = [
      "alias",
      "campaign",
      "campaign_website",
      "collection_period",
      "deployment",
      "doi",
      "focus_area",
      "gcmd_phenomena",
      "geographical_region",
      "geophysical_concept",
      "image",
      "instrument",
      "iop",
      "measurement_type",
      "measurement_region",
      "partner_org",
      "platform",
      "platform_type",
      "repository",
      "season",
      "significant_event",
      "website",
      "website_type",
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
          short_name
        }
      }
      allInstrument {
        nodes {
          id
          short_name
        }
      }
      allPlatform {
        nodes {
          id
          short_name
        }
      }
      allFocusArea {
        nodes {
          id
          short_name
        }
      }
    }
  `)

  result.data.allCampaign.nodes.forEach(node => {
    createPage({
      path: `campaign/${node.short_name}`,
      component: path.resolve(`./src/templates/campaign/index.js`),
      context: {
        slug: node.id,
      },
    })
  })
  result.data.allInstrument.nodes.forEach(node => {
    createPage({
      path: `instrument/${node.short_name}`,
      component: path.resolve(`./src/templates/instrument/index.js`),
      context: {
        slug: node.id,
      },
    })
  })
  result.data.allPlatform.nodes.forEach(node => {
    createPage({
      path: `platform/${node.short_name}`,
      component: path.resolve(`./src/templates/platform/index.js`),
      context: {
        slug: node.id,
      },
    })
  })
  result.data.allFocusArea.nodes.forEach(node => {
    createPage({
      path: `focus/${node.short_name}`,
      component: path.resolve(`./src/templates/focus/index.js`),
      context: {
        slug: node.id,
      },
    })
  })
}

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  actions.setWebpackConfig({
    node: { fs: "empty" },
  })
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
