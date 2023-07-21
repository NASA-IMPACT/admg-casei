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
       websites: [website] @link
       logo: image @link
       bounds: String
       spatial_bounds: String
     }
     type collection_period implements Node {
       dois: [doi] @link
       platform: platform @link
       deployment: deployment @link
       instruments: [instrument] @link
     }
     type deployment implements Node {
      aliases: [alias] @link
      campaign: campaign @link
      collection_periods: [collection_period] @link
      geographical_regions: [geographical_region] @link
      iops: [iop] @link
      significant_events: [significant_event] @link
    }
     type doi implements Node {
       cmr_entry_title: String
       doi: String
       long_name: String
       cmr_science_keywords: String
       campaigns: [campaign] @link
       instruments: [instrument] @link
       platforms: [platform] @link
     }
     type focus_area implements Node {
       campaigns: [campaign] @link
     }
     type geographical_region implements Node {
       order_priority: String
       image: NasaImagesJson @link(by: "shortname", from: "short_name")
     }
     type instrument implements Node {
       campaigns: [campaign] @link
       collection_periods: [collection_period] @link
       gcmd_phenomena: [gcmd_phenomenon] @link
       image: image @link
       measurement_type: measurement_type @link
       measurement_style: measurement_style @link
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
       platform_type: platform_type @link
       collection_periods: [collection_period] @link
     }
     type website implements Node {
       website_type: website_type @link
     }
     type NasaImagesJson implements Node {
      gatsbyImg: File @link(from: "fields.gatsbyImg")
     }
     type image implements Node {
      gatsbyImg: File @link(from: "fields.gatsbyImg")
     }
  `

  createTypes(typeDefs)
}

exports.onCreateNode = async ({
  node,
  actions: { createNode, createNodeField },
  createNodeId,
  getCache,
}) => {
  if (
    node.internal.type === "image" ||
    (node.internal.type === "NasaImagesJson" && node.image !== null)
  ) {
    if (node.image.includes(".gif")) return // .gif format breaks gatsby build

    try {
      const fileNode = await createRemoteFileNode({
        url: node.image, // string that points to the URL of the image
        parentNodeId: node.id, // id of the parent node of the fileNode you are going to create
        createNode, // helper function in gatsby-node to generate the node
        createNodeId, // helper function in gatsby-node to generate the node id
        getCache,
      })
      // if the file was created, extend the node with "localFile"
      if (fileNode) {
        createNodeField({ node, name: "gatsbyImg", value: fileNode.id })
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
      "collection_period",
      "deployment",
      "doi",
      "focus_area",
      "gcmd_phenomenon",
      "geographical_region",
      "geophysical_concept",
      "image",
      "instrument",
      "iop",
      "measurement_type",
      "measurement_style",
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

    const countProps = {
      campaign_count: "campaigns",
    }

    let responses = await Promise.all(endpoints.map(key => fetchData(key)))

    responses.forEach(response => {
      if (response.success) {
        response.data.forEach(item => {
          let additionalProps = {}

          for (const countProp in countProps) {
            const arrayProp = countProps[countProp]
            if (item[arrayProp]) {
              additionalProps[countProp] = item[arrayProp].length
            }
          }

          createNode({
            // Data for the node.
            ...item,
            ...additionalProps,

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

  actions.createSlice({
    id: `accordion`,
    component: require.resolve(`./src/components/accordion.js`),
  })
  actions.createSlice({
    id: `button`,
    component: require.resolve(`./src/components/button.js`),
  })
  actions.createSlice({
    id: `footer`,
    component: require.resolve(`./src/components/footer.js`)
  })
  actions.createSlice({
    id: `hero`,
    component: require.resolve(`./src/components/hero.js`)
  })
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
