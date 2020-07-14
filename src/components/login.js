import React, { useState } from "react"
import { Button } from "@devseed-ui/button"
import { Modal } from "@devseed-ui/modal"

import { isLoggedIn, handleLogin, logout } from "../utils/auth"

const Login = () => {
  const [buttonText, setButtonText] = useState("Log in")
  const [user, setUser] = useState({ username: "", password: "" })
  const [isModalOpen, setModal] = useState(false)

  const onSubmit = async e => {
    e.preventDefault()
    const response = await handleLogin(user.username, user.password)
    if (response.access_token) {
      setModal(false)
      setButtonText("Log out")
    } else {
      // TODO: indicate error state in form
      console.log(response.error_description || "Did not recieve a response")
    }
  }

  const handleLogout = () => {
    logout()
    setButtonText("Log in")
  }

  return (
    <>
      <Button onClick={() => (isLoggedIn() ? handleLogout() : setModal(true))}>
        {buttonText}
      </Button>
      <Modal
        id="modal"
        size="small"
        revealed={isModalOpen}
        onOverlayClick={() => setModal(false)}
        renderHeader={() => null}
        content={
          <form onSubmit={onSubmit} data-cy="login-form">
            <h3>Log In</h3>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              value={user.username}
              onChange={e =>
                setUser({ ...user, [e.target.name]: e.target.value })
              }
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={e =>
                setUser({ ...user, [e.target.name]: e.target.value })
              }
            />
            <input type="submit" />
          </form>
        }
      />
    </>
  )
}
export default Login
