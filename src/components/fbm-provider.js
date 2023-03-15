import React, { createContext, useState } from "react"
import PropTypes from "prop-types"

export const FBMContext = createContext({ isFBMLoaded: false })

function FBMProvider({ children }) {
  const [isFBMLoaded, setIsFBMLoaded] = useState(
    typeof window !== "undefined" && window.feedback && window.feedback.showForm
  )

  return (
    <FBMContext.Provider value={{ isFBMLoaded, setIsFBMLoaded }}>
      {children}
    </FBMContext.Provider>
  )
}

FBMProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default FBMProvider
