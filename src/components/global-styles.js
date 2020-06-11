import { createGlobalStyle, css } from "styled-components"
import { normalize } from "polished"
import theme from "../utils/theme"

const color = theme.main.color
const type = theme.main.type

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
      ${color.primary} 0%,
      ${color.surface} 45%
    );
  }

  section.inpage-nav {
    position: relative;
    border-top: 55px solid transparent;
    margin: -55px 0 0;
    -webkit-background-clip: padding-box;
    -moz-background-clip: padding;
    background-clip: padding-box;
  }

  /* In case you really need a border, use :before:
section:before {
  content: "";
  position: absolute;
  top: -2px;
  left: 0;
  right: 0;
  border-top: 2px solid #ccc;
}
*/

  .placeholder {
    box-shadow: 0 0 4px teal;
    border: 1px solid teal;
  }
`
export default createGlobalStyle`
  ${normalize()}
  ${baseStyles}
`
