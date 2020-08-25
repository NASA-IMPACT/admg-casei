const isBrowser = typeof window !== `undefined`

export const login = async (username, password) => {
  if (!isBrowser) return false

  const headers = new Headers()
  headers.append("Content-Type", "application/x-www-form-urlencoded")

  const body = new URLSearchParams()
  body.append("grant_type", "password")
  body.append("username", username)
  body.append("password", password)
  body.append("client_id", process.env.ADMG_CLIENT_ID)
  body.append("client_secret", process.env.ADMG_CLIENT_SECRET)
  try {
    const response = await fetch(
      "https://admg.nasa-impact.net/authenticate/token/",
      {
        method: "POST",
        headers,
        body,
        redirect: "follow",
      }
    )
    const json = await response.json()
    if (json.access_token) {
      console.log(`Credentials match! Setting the active user.`)
      sessionStorage.setItem("token", JSON.stringify(json.access_token))
    }

    return json
  } catch (error) {
    new Error(error)
  }
}

export const logout = () => {
  if (!isBrowser) return
  console.log(`Ok, logged out.`)
  sessionStorage.removeItem("token")
}

export const isTokenAvailable = () => {
  if (!isBrowser) return false

  const token = sessionStorage.getItem("token")
    ? sessionStorage.getItem("token")
    : null

  return !!token
}
