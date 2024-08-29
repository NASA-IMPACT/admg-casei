import { useEffect } from "react"
import { navigate } from "gatsby"

// Navigate used as a redirect to enable the "partiallyActive" styles to apply in the navigation to all /explore/* links
export default () => {
  useEffect(() => {
    navigate("/explore/campaigns")
  }, [])
  return null
}
