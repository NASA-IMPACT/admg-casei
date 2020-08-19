import Typography from "typography"
import theme from "./theme"

const typography = new Typography({
  baseFontSize: "16px",
  baseLineHeight: 1.42,
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
        color: "inherit",
        textDecoration: "none",
      },
      "a:hover,a:active": {
        textShadow: "none",
        backgroundImage: "none",
      },
      "h1,h2,h3,h4,h5,h6": {
        fontSize: rhythm(1.5),
        marginTop: rhythm(0.5),
        marginBottom: rhythm(0.5),
      },
      // children ol, ul
      "li>ol,li>ul": {
        marginLeft: "20px",
        marginBottom: 0,
      },
      p: {
        marginBottom: 0,
      },
    }
  },
})

export default typography
