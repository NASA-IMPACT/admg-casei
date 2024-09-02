import { navigate } from "gatsby"
import { useEffect } from "react"

export default function ExploreRedirect() {
  useEffect(() => navigate("/explore/campaigns"))

  return false
}
