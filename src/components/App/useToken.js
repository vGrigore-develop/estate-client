import { useState } from 'react'

function isTokenExpired(token) {
  const payload = JSON.parse(atob(token.split('.')[1]))
  const expiry = payload.exp
  console.log(payload)
  if (!expiry) return false
  const currentTimestamp = Math.floor(Date.now() / 1000)
  return expiry < currentTimestamp
}

export default function useToken() {
  const getToken = () => {
    const tokenString = sessionStorage.getItem('token')
    const userToken = JSON.parse(tokenString)
    const token = userToken?.token
    if (token && isTokenExpired(token)) {
      return null
    }
    return token
  }

  const [token, setToken] = useState(getToken())

  const saveToken = (userToken) => {
    sessionStorage.setItem('token', JSON.stringify(userToken))
    setToken(userToken.token)
  }

  return {
    setToken: saveToken,
    token,
  }
}
