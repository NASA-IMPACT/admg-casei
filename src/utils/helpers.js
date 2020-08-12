import { useState, useEffect } from "react"
import debounce from "lodash.debounce"

const urlRegex = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,4}/s

/**
 * A funtion to validate that a prop contains a link to an external page
 * @param {string} url a string to be validated
 * @return {bool} true, if url matches the regex
 */
export function isUrl(url) {
  if (urlRegex.test(url)) {
    return true
  }
  return false
}

/**
 * A function to validate that a prop contains a link to an external page
 * @param {object} props the object with all the props
 * @param {string} propName the name of the prop to be validated
 * @param {string} componentName the name of the component, to be logged in Error message
 */
export function PropTypeIsUrl(props, propName, componentName) {
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

/**
 * A function to format two dates into a year-only range.
 * @param {string} start - a date-like value
 * @param {string} end - a date-like value
 * @return {string} A string representing the time range as year-only, e.g. `2018` (if start and end within the same year), or `2012-2014`.
 */
export function formatYearRange(start, end) {
  const startdate = new Date(start)
  const enddate = new Date(end)
  const startyear = startdate.getFullYear()
  const endyear = enddate.getFullYear()

  return startyear === endyear ? `${startyear}` : `${startyear}—${endyear}`
}

/**
 * A function to format two dates into a mm/dd/yyyy -- mm/dd/yyyy format.
 * @param {string} start - a date-like value
 * @param {string} end - a date-like value
 * @return {string} A string representing the date range.
 */
export function formatDateRange(start, end) {
  const startdate = new Date(start)
  const enddate = new Date(end)
  function formatDateString(date) {
    return `${date.getMonth() + 1} / ${date.getDate()} / ${date.getFullYear()}`
  }

  return `${formatDateString(startdate)} — ${formatDateString(enddate)}`
}

/**
 * A custom hook the calculate the width and height of a reference element.
 * @param {element} containerRef - the reference element, for example created with useRef()
 * @return {object} An object containing width and height properties, for example `{ width: 800, height: 600 }`.
 */
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

/**
 * A method to extract the image name referenced in `sharp image` from the image url.
 * @param {string} imgUrl - image url
 * @return {string} image name
 */
export function getOriginalImgName(imgUrl) {
  return imgUrl.split("/").pop()
}
