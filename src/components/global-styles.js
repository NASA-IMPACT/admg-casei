import { createGlobalStyle, css } from "styled-components"
import "@reach/listbox/styles.css"
import "mapbox-gl/dist/mapbox-gl.css"

import theme from "../utils/theme"

const baseStyles = css`
  body {
    margin: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: radial-gradient(
      circle at top,
      ${theme.color.tertiary} 0%,
      ${theme.color.primary} 45%
    );
  }

  /* TODO: replace all placeholder elements */
  .placeholder {
    box-shadow: 0 0 4px teal;
    border: 1px solid teal;
  }
`
export default createGlobalStyle`
  ${baseStyles}
`
