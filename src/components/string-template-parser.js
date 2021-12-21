import React from "react"
import { Link } from "gatsby"

export const StringTemplateParser = ({ expression, replacements }) => {
  const templatePattern = /{{\s?([^{}\s]*)\s?}}/g

  const parts = expression.split(templatePattern)

  return parts.map(part => {
    if (part === "linebreak") return <br />

    const link = replacements.links?.find(link => link.id === part)
    if (link) {
      return <Link to={link.url}>{link.text}</Link>
    }

    const image = replacements.images?.find(image => image.id === part)
    if (image) {
      return image.alt
    }

    return part
  })
}
