import { createGlobalStyle, css } from "styled-components"
import { normalize } from "polished"
import theme from "../utils/theme"

const color = theme.color
const type = theme.type

// Global styles for these components are included here for performance reasons.
// This way they're only rendered when absolutely needed.
const baseStyles = css`
  /* insert overrides for global styles from DevseedUiThemeProvider here */

  body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  html {
    font-family: ${type.base.family};
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
  }
  body {
    margin: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: radial-gradient(
      circle at top,
      ${color.tertiary} 0%,
      ${color.primary} 45%
    );
  }

  /* Links
   ========================================================================== */
  a {
    cursor: pointer;
    color: ${color.base};
    text-decoration: none;
    transition: opacity 0.24s ease 0s;
  }
  a:visited {
    color: ${color.base};
  }

  .placeholder {
    box-shadow: 0 0 4px teal;
    border: 1px solid teal;
  }
`
export default createGlobalStyle`
  ${normalize()}
  ${baseStyles}
`
