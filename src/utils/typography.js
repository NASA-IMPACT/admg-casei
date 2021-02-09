import Typography from "typography"

import theme from "./theme"

const typography = new Typography({
  baseFontSize: "16px",
  baseLineHeight: 1.15,
  googleFonts: [
    {
      name: "Titillium Web",
      styles: ["400", "600", "700"],
    },
  ],
  headerFontFamily: ["Titillium Web", "sans-serif"],
  bodyFontFamily: ["Titillium Web", "sans-serif"],
  headerColor: theme.color.base,
  bodyColor: theme.color.base,
  headerWeight: "600",
  bodyWeight: 400,
  boldWeight: 700,
  overrideStyles: ({ rhythm }) => {
    return {
      a: {
        textDecoration: "none",
        cursor: "pointer",
        color: theme.color.base,
        transition: "opacity 0.24s ease 0s",
      },
      "a:active": {
        transform: "translate(0, 1px)",
      },
      "a:hover": {
        opacity: 0.64,
      },
      "a:visited": {
        color: theme.color.base,
      },
      h1: {
        fontSize: rhythm(4),
        marginTop: rhythm(1),
        marginBottom: rhythm(1),
      },
      h2: {
        fontSize: rhythm(3),
        marginTop: rhythm(0.5),
        marginBottom: rhythm(2.5),
      },
      h3: {
        fontSize: rhythm(2.25),
        marginTop: rhythm(0.5),
        marginBottom: rhythm(0.5),
      },
      "h4,h5,h6": {
        fontSize: rhythm(1.5),
        marginTop: rhythm(0.5),
        marginBottom: rhythm(1),
      },
      // children ol, ul
      "li>ol,li>ul": {
        marginLeft: "20px",
        marginBottom: 0,
      },
      p: {
        marginBottom: 0,
      },
      "label, button": {
        fontSize: rhythm(0.75),
        fontWeight: 600,
        textTransform: `uppercase`,
        marginTop: rhythm(0.5),
      },
    }
  },
})

export default typography
