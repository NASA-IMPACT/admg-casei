import Typography from "typography"

const typography = new Typography({
  baseFontSize: "16px",
  baseLineHeight: 1.666,
  googleFonts: [
    {
      name: "Varela Round",
      styles: ["400"],
    },
    {
      name: "Roboto",
      styles: ["400", "400i", "700"],
    },
  ],
  headerFontFamily: ["Varela Round", "sans-serif"],
  bodyFontFamily: ["Roboto", "sans-serif"],
  headerColor: "hsla(0,0%,100%,0.9)",
  bodyColor: "hsla(0,0%,100%,0.73)",
  headerWeight: "400",
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
        marginTop: rhythm(1.5),
        marginBottom: rhythm(0.5),
      },
      // children ol, ul
      "li>ol,li>ul": {
        marginLeft: "20px",
        marginBottom: 0,
      },
    }
  },
})

export default typography
