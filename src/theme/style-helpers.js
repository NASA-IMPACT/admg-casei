import { css } from "styled-components"

import { colors } from "../theme"

export const scrollFade = css`
  overflow-y: scroll;
  max-height: 10rem;
  display: block;
  margin: 0.5rem;
  background: ${props => `linear-gradient(${
    colors[props.mode].background
  } 33%, rgba(247, 155, 184, 0)),
    linear-gradient(rgba(247, 155, 184, 0), ${
      colors[props.mode].background
    } 66%) 0 100%,
    radial-gradient(
      farthest-side at 50% 0,
      rgba(34, 34, 34, 0.5),
      rgba(0, 0, 0, 0)
    ),
    radial-gradient(
        farthest-side at 50% 100%,
        rgba(34, 34, 34, 0.5),
        rgba(0, 0, 0, 0)
      )
      0 100%`};
  background-color: ${props => colors[props.mode].background};
  background-repeat: no-repeat;
  background-attachment: local, local, scroll, scroll;
  background-size: 100% 45px, 100% 45px, 100% 15px, 100% 15px;
`
export const breakpoints = {
  sm: "800px",
  md: "1280px",
  lg: "1400px",
}
