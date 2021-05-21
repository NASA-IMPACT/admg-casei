import parse from "wellknown"

const urlRegex = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,4}/s
const mailtoRegex = /^mailto:(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i

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
  if (!urlRegex.test(props[propName]) && !mailtoRegex.test(props[propName])) {
    return new Error(
      "Invalid url `" +
        props[propName] +
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

  return startyear === endyear
    ? `${startyear}`
    : !end
    ? `${startyear} — Ongoing`
    : `${startyear}—${endyear}`
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

export function convertBoundsToNSWE(bounds) {
  // gets coordinates from WKT string
  const coords = parse(bounds).coordinates[0]
  // transforms coordinates to readable bounds
  const stringified = (coord, latlong) => {
    const pos = latlong === "long" ? "N" : "E"
    const neg = latlong === "long" ? "S" : "W"
    return coord < 0
      ? Math.abs(coord).toString() + "\u00b0" + neg
      : coord.toString() + "\u00b0" + pos
  }
  return {
    N: stringified(coords[0][1], "long"),
    S: stringified(coords[2][1], "long"),
    W: stringified(coords[0][0], "lat"),
    E: stringified(coords[1][0], "lat"),
  }
}
