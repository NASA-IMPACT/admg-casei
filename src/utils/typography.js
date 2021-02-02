import Typography from "typography"

import theme from "./theme"

const typography = new Typography({
  baseFontSize: "12px",
  baseLineHeight: 1,
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
  overrideStyles: () => {
    return {
      a: {
        textDecoration: "none",
      },
    }
  },
})

export default typography
