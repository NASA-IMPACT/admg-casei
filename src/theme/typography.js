import Typography from "typography"

/**
 * Titillium Web v9
 * 2 Styles: italic, normal
 * 2 Subsets: latin, latin-ext
 * 6 Weights: 200, 300, 400, 600, 700, 900
 */

import { NEGATIVE } from "../utils/constants"
import { colors } from "../theme"

const typography = new Typography({
  baseFontSize: "16px",
  baseLineHeight: 1.5,
  headerFontFamily: ["Titillium Web", "sans-serif"],
  bodyFontFamily: ["Titillium Web", "sans-serif"],
  headerColor: colors[NEGATIVE].text,
  bodyColor: colors[NEGATIVE].text,
  headerWeight: "600",
  bodyWeight: 400,
  boldWeight: 700,
  overrideStyles: ({ rhythm }) => {
    return {
      a: {
        textDecoration: "none",
        cursor: "pointer",
        color: colors[NEGATIVE].text,
        transition: "opacity 0.24s ease 0s",
      },
      "a:active": {
        transform: "translate(0, 1px)",
      },
      "a:hover": {
        opacity: 0.64,
      },
      h1: {
        fontSize: rhythm(2.5),
        marginTop: rhythm(2),
        marginBottom: rhythm(1),
      },
      h2: {
        fontSize: rhythm(1.5),
        marginTop: rhythm(0.5),
        marginBottom: rhythm(1),
      },
      "h3,h4,h5,h6": {
        fontSize: rhythm(1.2),
        marginTop: rhythm(0.5),
        marginBottom: rhythm(1),
      },
      li: {
        marginBottom: 0,
      },
      p: {
        marginBottom: 0,
      },
      small: {
        fontSize: rhythm(0.65),
      },
      "label, button": {
        fontSize: rhythm(0.6),
        fontWeight: 600,
        textTransform: `uppercase`,
      },
    }
  },
})

export default typography
