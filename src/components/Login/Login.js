import React, { useState } from 'react'
import axios from 'axios'
import { TextField, Button } from '@mui/material'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'

import './Login.css'

async function loginUser(credentials) {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/users/login`,
      credentials,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    return response.data
  } catch (error) {
    console.log(error)
    toast.error(`Login Error: ${error.message}`)
    return { error: error.message }
  }
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

    if (loginResponse.error) {
      console.error(loginResponse.error)
      return
    }

    setToken({ token: loginResponse.token })
    console.log(loginResponse)
    setUserInfo({ id: loginResponse._id, name: loginResponse.name })
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
  setUserInfo: PropTypes.func.isRequired,
}
