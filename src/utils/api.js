const fetch = require("node-fetch")

export default {
  async fetchSearchResult(searchstring) {
    try {
      const response = await fetch(
        `http://ec2-3-85-33-46.compute-1.amazonaws.com/api/campaign?search=${searchstring}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      const json = await response.json()
      return { searchstring, ...json }
    } catch (error) {
      return new Error(error)
    }
  },
}
