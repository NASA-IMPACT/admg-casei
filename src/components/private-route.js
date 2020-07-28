import React, { useContext } from "react"
import PropTypes from "prop-types"
import { navigate } from "gatsby"
import { AuthContext } from "../components/auth-provider"

const PrivateRoute = ({ component: Component, location }) => {
  const { isLoggedIn } = useContext(AuthContext)

  if (!isLoggedIn) {
    navigate("/404")
    return null
  }

  // location state data comes from Link state that opens this route
  return <Component data={location.state.data} />
}

PrivateRoute.propTypes = {
  component: PropTypes.node.isRequired,
  location: PropTypes.object,
}

export default PrivateRoute
