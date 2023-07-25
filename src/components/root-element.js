import React from "react"
import { ButtonProvider } from "./button/button-context"

const RootElement = ({ children }) => {
  return <ButtonProvider>{children}</ButtonProvider>
}

export default RootElement
