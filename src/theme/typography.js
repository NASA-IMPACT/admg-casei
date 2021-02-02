import styled from "styled-components"

import theme from "../utils/theme"

export const baseTypeStyle = `
  font-family: "Titillium Web", sans-serif;
  color: ${theme.color.base};
  font-size: 1.25rem;
  font-weight: 400;
`

export const clickableStyle = `
  text-decoration: none;
  cursor: pointer;
  transition: opacity 0.24s ease 0s;

  &:active {
    transform: translate(0 1px);
  }
  &:hover {
    opacity: 0.64;
  }
  &:visited {
    color: ${theme.color.base};
  }
`

export const Heading1 = styled.h1`
  ${baseTypeStyle};
  font-size: 4rem;
  font-weight: 700;
  line-height: 1.25;

  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
`

export const Heading2 = styled.h2`
  ${baseTypeStyle};
  font-size: 3.5rem;
  font-weight: 600;
  line-height: 1.25;

  margin-top: 0.25rem;
  margin-bottom: 1rem;
`

export const Heading3 = styled.h3`
  ${baseTypeStyle};
  font-size: 2.25rem;
  font-weight: 600;
  line-height: 3.75;

  margin-top: 0.25rem;
  margin-bottom: 1rem;
`

export const BodyText = styled.p`
  ${baseTypeStyle};
  font-size: 1.25rem;
  font-weight: 400;
  line-height: 1.75;

  margin-top: 0;
  margin-bottom: 0;
`

export const SmallBodyText = styled.p`
  ${baseTypeStyle};
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.375;

  margin-top: 0;
  margin-bottom: 0;
`

export const SmallTitle = styled.label`
  ${baseTypeStyle};
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1;

  margin-top: 0;
  margin-bottom: 0;

  text-transform: uppercase;
`

export const Label = styled.label`
  ${baseTypeStyle};
  font-size: 0.75rem;
  font-weight: 600;
  line-height: 1;

  margin-top: 0;
  margin-bottom: 0;
`

export const LinkText = styled.a`
  ${baseTypeStyle};
  font-size: 0.75rem;
  font-weight: 600;
  line-height: 1;

  margin-top: 0;
  margin-bottom: 0;

  ${clickableStyle};
`

export const ButtonText = styled.span`
  ${baseTypeStyle};
  font-size: 0.75rem;
  font-weight: 600;
  line-height: 1;

  margin-top: 0;
  margin-bottom: 0;

  ${clickableStyle};
`

export const Banner = styled.span`
  ${baseTypeStyle};
  font-size: 4rem;
  font-weight: 700;
  line-height: 1.25;

  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
`
