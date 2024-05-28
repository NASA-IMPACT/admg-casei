/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const fetch = require("node-fetch")
const path = require("path")
const fs = require("fs")

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
    type cmr_science_keyword implements Node {
      Term: String
      Topic: String
      Category: String
      VariableLevel1: String
      VariableLevel2: String
      VariableLevel3: String
    }
     type doi implements Node {
       cmr_entry_title: String
       doi: String
       long_name: String
       cmr_data_formats: [String]
       cmr_science_keywords: [cmr_science_keyword]
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
  if (endpoint === "instrument") {
    return {
      type: endpoint,
      ...JSON.parse(fs.readFileSync("instrument_response.json", "utf8")),
    }
  } else if (endpoint === "doi") {
    return {
      type: endpoint,
      ...JSON.parse(fs.readFileSync("doi_response.json", "utf8")),
    }
  }
  try {
    const response = await fetch(
      `https://admg.nasa-impact.net/api/${endpoint}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.ADMG_ACCESS_TOKEN}`,
        },
      }
    )

    // Check if the response is not OK (status code outside the range 200-299)
    if (!response.ok) {
      throw new Error(`Failed to get response from: ${response.statusText}`)
    }

    const json = await response.json()
    return { type: endpoint, ...json }
  } catch (error) {
    console.error(`Fetch data failed for endpoint "${endpoint}":`, error)
    return { type: endpoint, error: error.message }
  }
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

exports.createResolvers = ({ createResolvers }) => {
  const resolvers = {
    doi: {
      cmr_data_formats: {
        resolve: source => {
          // parse strings and log errors for arrays in string format
          return typeof source.cmr_data_formats === "string"
            ? source.cmr_data_formats &&
              !source.cmr_data_formats.includes("null") &&
              source.cmr_data_formats.split("[")[1]
              ? source.cmr_data_formats
                  ?.split("[")[1]
                  .split("]")[0]
                  .split(",")
                  .map(s =>
                    s
                      .replace(/[^a-zA-Z ]/g, "")
                      .replace(/^\s+|\s+$|\s+(?=\s)/g, "")
                  )
                  .filter(f => f !== "")
              : []
            : source.cmr_data_formats.filter(f => f !== "")
        },
      },
      cmr_science_keywords: {
        resolve: source => {
          if (
            source.cmr_science_keywords &&
            typeof source.cmr_science_keywords === "string"
          ) {
            // The doi keywords are stored as a JSON string in the database
            // parsing them here into an object
            let keywords = []
            try {
              keywords = JSON.parse(source.cmr_science_keywords).filter(
                keyword => keyword.term && keyword.term !== "Not provided"
              )
            } catch (e) {
              if (source.cmr_science_keywords !== null) {
                console.error(
                  `ERROR: Could not parse ${source.cmr_science_keywords}`
                )
              }
            }
            return keywords
          }
          return source.cmr_science_keywords
        },
      },
    },
  }
  createResolvers(resolvers)
}
