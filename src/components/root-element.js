import React from "react"
import { ButtonProvider } from "./button/button-context"
import { any } from "prop-types"

const RootElement = ({ children }) => {
  return <ButtonProvider>{children}</ButtonProvider>
}

RootElement.propTypes = {
  children: any,
}

export default RootElement
