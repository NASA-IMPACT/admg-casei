const urlRegex = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,4}/s
const mailtoRegex = /^mailto:(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i

const trailingCommaRegex = /(^,)|(,$)/g
/* 1st Alternative, 1st Capturing Group (^,)
 * ^ asserts position at start of the string
 * , matches the character , literally (case sensitive)
 * 2nd Alternative, 2nd Capturing Group (,$)
 * , matches the character , literally (case sensitive)
 * $ asserts position at the end of the string, or before the line terminator right at the end of the string (if any)
 * Global pattern flags
 * g modifier: global. All matches (don't return after first match)
 */

/**
 * A funtion to parse text input into an array
 * @param {string} input a string to be parsed
 * @return {array} list with separated strings
 */
export function parseTextToList(input) {
  return input
    .split("\n")
    .filter(x => x)
    .map(str => str.trim().replace(trailingCommaRegex, ""))
}

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
