import theme from "../utils/theme"
import styled from "styled-components"

// nuka carousel expects inline styles
const controlButtonLRStyle = {
  padding: 0,
  borderRadius: `100%`,
  width: 42,
  height: 42,
  backgroundColor: theme.color.base,
  color: `hsla(0,0%,0%,0.73)`,
  fontWeight: `bold`,
  fontSize: `large`,
}

const ControlTextButton = styled.button`
  margin: 0.2rem 0.5rem;
  padding: 0;
  font-weight: 600;
  color: rgba(255, 255, 255, 1);
  opacity: ${({ selected }) => (selected ? 1 : 0.6)};
  border: 0;
  background: rgba(255, 255, 255, 0);
  text-transform: uppercase;
  text-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
`

export { controlButtonLRStyle, ControlTextButton }
