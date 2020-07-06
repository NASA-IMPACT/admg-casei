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
