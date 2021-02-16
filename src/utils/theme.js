const palette = {
  white: "#ffffff",
  gunmetal: "#262a31",
  "davys grey": "#5f5f5f",
  "dark cornflower blue": "#15418c",
  "rich black fogra 29": "#0c1520",
  "gunmetal 2": "#303641",
  platinum: "#e9eaec",
  "spanish gray": "#9e9e9e",
  "baby blue eyes": "#aac9ff",
  "red ryb": "#f93c21",
}

const colors = {
  lightTheme: {
    background: palette.white,
    text: palette.gunmetal,
    altText: palette["davys grey"],
    linkText: palette["dark cornflower blue"],
  },

  darkTheme: {
    background: palette["gunmetal 2"],
    altBackground: palette["rich black fogra 29"],
    text: palette.platinum,
    altText: palette["spanish gray"],
    linkText: palette["baby blue eyes"],
    highlight: palette["red ryb"],
  },
}

const shape = {
  rounded: "0.2rem",
}

const layout = {
  pageMargin: "5rem",
  maxWidth: "1280px",
}

export { colors, shape, layout }
