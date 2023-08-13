import React, { useState } from 'react'
import { TextField, Button } from '@mui/material'
import PropTypes from 'prop-types'

import './Login.css'

async function loginUser(credentials) {
  return fetch(`http://localhost:3000/api/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json())
}

export default function Login({ setToken, setUserInfo }) {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const loginResponse = await loginUser({
      email,
      password,
    })
    setToken({ token: loginResponse.token })
    console.log(loginResponse)
    setUserInfo({id: loginResponse._id, name: loginResponse.name})
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <h2 className="login-title">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">

            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              fullWidth
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <Button variant="contained" color="primary" fullWidth type="submit">
              Login
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
  setUserInfo: PropTypes.func.isRequired
}
