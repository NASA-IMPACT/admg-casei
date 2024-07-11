const palette = {
  white: "#ffffff",
  gunmetal: "#262a31",
  "davys grey": "#5f5f5f",
  "dark cornflower blue": "#15418c",
  "rich black fogra 29": "#0c1520",
  "gunmetal 2": "#303641",
  platinum: "#e9eaec",
  "spanish gray": "#9e9e9e",
  lightBlue: "#aac9ff",
  "red ryb": "#f93c21",
  "caribbean green": "#3AD6AB",
  "medium slate blue": "#6F5FE9",
  "orange blossom": "#cb6528",
}

const colors = {
  lightTheme: {
    background: palette.white,
    altBackground: palette.platinum,
    border: "hsla(0, 0%, 0%, 0.2)",
    text: palette.gunmetal,
    altText: palette["davys grey"],
    linkText: palette["dark cornflower blue"],
  },

  darkTheme: {
    background: palette["gunmetal 2"],
    altBackground: palette["rich black fogra 29"],
    text: palette.platinum,
    altText: palette["spanish gray"],
    linkText: palette.lightBlue,
    highlight: palette["red ryb"],
    division: palette["davys grey"],
    dataVizOne: "#1B9E77", // palette["caribbean green"],
    dataVizTwo: "#7570B3", //palette["medium slate blue"],
    dataVizThree: "#D95F02", // palette["orange blossom"],
  },
}

const shape = {
  rounded: "0.2rem",
}

const layout = {
  pageMargin: "5%", //"4rem",
  smallPageMargin: "2rem",
  maxWidth: "1280px",
}

const breakpoints = {
  sm: "800px",
  md: "1280px",
  lg: "1400px",
}

export { colors, shape, layout, breakpoints }
