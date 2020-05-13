/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require(`path`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  // **Note:** The graphql function call returns a Promise
  // see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise for more info
  const result = await graphql(`
    {
      allCampaignCsv {
        nodes {
          id
          shortname: Campaign_Shortname
          platforms: ADMG_s_Aircraft_Shortames__Camp_Plat_Inst_tab_
        }
      }
    }
  `)

  result.data.allCampaignCsv.nodes.forEach(node => {
    createPage({
      path: `campaign/${node.id}`,
      component: path.resolve(`./src/templates/campaign/index.js`),
      context: {
        slug: node.id,
        shortname: node.shortname,
        platforms: node.platforms.split(", "),
      },
    })
  })
}
