import React, { createContext, useState } from "react"
import PropTypes from "prop-types"

import { isTokenAvailable } from "../utils/auth"

export const AuthContext = createContext({ isLoggedIn: isTokenAvailable() })

function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(isTokenAvailable())

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default AuthProvider
