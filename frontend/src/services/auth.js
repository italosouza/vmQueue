export const TOKEN_KEY = '@SecretToken:token'
export const USER_KEY = '@SecretToken:userid'

export const isAuthenticated = () => {
  // TODO: improve authentication validation
  return sessionStorage.getItem(TOKEN_KEY) !== null
}

export const getToken = () => {
  return sessionStorage.getItem(TOKEN_KEY)
}
export const getUserID = () => {
  return sessionStorage.getItem(USER_KEY)
}

export const login = data => {
  sessionStorage.setItem(TOKEN_KEY, data.token)
  sessionStorage.setItem(USER_KEY, data.user._id)
}

export const logout = () => {
  sessionStorage.removeItem(TOKEN_KEY)
  sessionStorage.removeItem(USER_KEY)
}
