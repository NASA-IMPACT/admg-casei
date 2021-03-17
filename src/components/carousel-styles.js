import { NEGATIVE } from "../utils/constants"
import { colors } from "../theme"

// nuka carousel expects inline styles
const controlButtonLRStyle = {
  padding: 0,
  borderRadius: `100%`,
  width: 42,
  height: 42,
  backgroundColor: colors[NEGATIVE].text,
  color: `hsla(0,0%,0%,0.73)`,
  fontWeight: `bold`,
  fontSize: `large`,
}

export { controlButtonLRStyle }
