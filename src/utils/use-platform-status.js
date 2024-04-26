import { useState, useEffect } from "react"

export const usePlatformStatus = (
  platformName,
  platformsWithData,
  activeDeploymentPlatforms
) => {
  const [status, setStatus] = useState("operational")

  useEffect(() => {
    if (
      activeDeploymentPlatforms.length &&
      !activeDeploymentPlatforms.includes(platformName)
    ) {
      setStatus("notOperational")
    } else {
      if (!platformsWithData.includes(platformName)) {
        setStatus("notShown")
      } else {
        setStatus("operational")
      }
    }
  }, [platformName, activeDeploymentPlatforms, platformsWithData])

  return status
}
