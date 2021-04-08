const fetch = require("node-fetch")

export default {
  async fetchSearchResult(type, searchstring) {
    try {
      const response = await fetch(
        `https://admg.nasa-impact.net/api/${type}?search=${searchstring}`,
        {
          method: "GET",
        }
      )
      const json = await response.json()

      if (json.success) {
        return json.data.map(x => x.uuid)
      }
    } catch (error) {
      new Error(error)
    }
  },
}
