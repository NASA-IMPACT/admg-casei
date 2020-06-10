const fetch = require("node-fetch")

export default {
  async fetchSearchResult(searchstring) {
    try {
      const response = await fetch(
        `http://ec2-3-85-33-46.compute-1.amazonaws.com/api/campaign?search=${searchstring}`,
        {
          method: "GET",
        }
      )
      const json = await response.json()

      if (json.success) {
        return json.data.map(c => c.short_name)
      }
    } catch (error) {
      new Error(error)
    }
  },
}
