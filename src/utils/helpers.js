import { useState, useEffect } from "react"
import debounce from "lodash.debounce"

const urlRegex = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,4}/s

export function isUrl(url) {
  // validate that prop contains link to an external page
  if (urlRegex.test(url)) {
    return true
  }
  return false
}

export function PropTypeIsUrl(props, propName, componentName) {
  // validate that prop contains link to an external page
  if (!urlRegex.test(props[propName])) {
    return new Error(
      "Invalid url `" +
        propName +
        "` supplied to" +
        " `" +
        componentName +
        "`. Validation failed."
    )
  }
}

export function formatDateRange(start, end) {
  const startdate = new Date(start)
  const enddate = new Date(end)
  const startyear = startdate.getFullYear()
  const endyear = enddate.getFullYear()

  return startyear === endyear ? `${startyear}` : `${startyear}—${endyear}`
}

export const useContainerDimensions = containerRef => {
  const getDimensions = () => ({
    width: containerRef.current.offsetWidth,
    height: containerRef.current.offsetHeight,
  })

  const [dimensions, setDimensions] = useState({ width: null, height: null })

  useEffect(() => {
    const handleResize = () => {
      setDimensions(getDimensions())
    }

    if (containerRef.current) {
      setDimensions(getDimensions())
    }

    const debouncedResize = debounce(handleResize, 250)

    window.addEventListener("resize", debouncedResize)

    return () => {
      window.removeEventListener("resize", debouncedResize)
    }
  }, [containerRef])

  return dimensions
}
