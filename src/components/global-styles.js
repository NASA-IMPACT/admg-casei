import { createGlobalStyle, css } from "styled-components"
import "@reach/listbox/styles.css"

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

  /* Links
   ========================================================================== */
  a {
    cursor: pointer;
    color: ${theme.color.base};
    text-decoration: none;
    transition: opacity 0.24s ease 0s;
  }
  a:visited {
    color: ${theme.color.base};
  }
`
export default createGlobalStyle`
  ${baseStyles}
`
