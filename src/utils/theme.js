let color = {
  base: "hsla(0,0%,100%,0.9)", // white
  primary: "#0c1520", // dark background
  secondary: "#303641", // dark blue box background
  tertiary: "#294060", // medium blue for gradiant background
  gray: "#9E9E9E",
  link: "#aac9ff",
  background: "#0c1520",
}

const type = {
  base: {
    root: "16px",
    size: "1rem",
    line: "1.5",
    color: color.base,
    family: '"Titillium Web", sans-serif',
    style: "normal",
    weight: 300,
    light: 300,
    regular: 400,
    medium: 400,
    bold: 700,
  },
  heading: {
    family: '"Titillium Web", sans-serif',
    style: "normal",
    weight: 700,
    light: 300,
    regular: 400,
    medium: 400,
    bold: 700,
  },
}
const shape = {
  rounded: "0.2rem",
  ellipsoid: "320rem",
}
const layout = {
  space: "1rem",
  border: "1px",
  min: "960px",
  max: "1280px",
  maxWidth: 1280,
}
const boxShadow = {
  inset: "inset 0px 0px 3px 0px rgba(0,0,0,0.2);",
  input: "0 -1px 1px 0 rgba(0,0,0,0.08), 0 2px 6px 0 rgba(0,0,0,0.16);",
}
export default {
  layout,
  color,
  type,
  shape,
  boxShadow,
}
/**
 * Media query ranges used by the media utility.
 * They're not exported with the main theme because the utility does not
 * build the media functions in runtime, needing the values beforehand.
 */
export const mediaRanges = {
  xsmall: [null, 543],
  small: [544, 767],
  medium: [768, 991],
  large: [992, 1199],
  xlarge: [1200, null],
}
