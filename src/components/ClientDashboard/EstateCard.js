import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Card, CardContent, Typography, Divider } from '@mui/material'

import './EstateCard.css'
import HeartIcon from './HeartIcon'

export default function EstateCard({
  id,
  title,
  price,
  phone,
  rooms,
  location,
  city,
  favorites,
}) {
  const [showDetails, setShowDetails] = useState(false)
  const [isFavorited, setIsFavorited] = useState(false)

  useEffect(() => {
    const userInfoString = sessionStorage.getItem('userInfo')
    const userInfo = JSON.parse(userInfoString)
    if (favorites.includes(userInfo.id)) {
      setIsFavorited(true)
    }
  }, [favorites])

  const toggleDetails = () => {
    setShowDetails(!showDetails)
  }

  const toggleFavorite = () => {
    setIsFavorited(!isFavorited)

    const URL = `${process.env.REACT_APP_API_URL}/estates/favorite/${id}`
    const tokenString = sessionStorage.getItem('token')
    const userToken = JSON.parse(tokenString)

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': userToken.token,
      },
    }

    if (isFavorited === false) {
      axios.post(URL, {}, config).catch((error) => {
        console.error(
          'There was a problem with the axios request:',
          error.message
        )
      })
    } else {
      axios.delete(URL, config).catch((error) => {
        console.error(
          'There was a problem with the axios request:',
          error.message
        )
      })
    }
  }

  return (
    <div className="card-list-container">
      <Card className="card-container">
        <CardContent className="card-content-container" onClick={toggleDetails}>
          <div className="title-container">
            <Typography variant="h6" className="title">
              {title}
            </Typography>
            <Typography variant="subtitle1" className="price">
              {price} euro
            </Typography>
          </div>
        </CardContent>
      </Card>
      {showDetails && (
        <Card className="card-container active">
          <CardContent className="card-content-container">
            <Typography variant="h6" className="title">
              {title}
            </Typography>
            <Typography variant="subtitle1" className="price">
              {price} euro
            </Typography>
            <Divider style={{ margin: '8px 0' }} />
            <div className="show-details">
              <strong>Phone:</strong> {phone}
              <br />
              <strong>Rooms:</strong> {rooms}
              <br />
              <strong>Location:</strong> {location}
              <br />
              <strong>City:</strong> {city}
            </div>
            <Divider style={{ margin: '8px 0' }} />
            <HeartIcon isFavorited={isFavorited} onToggle={toggleFavorite} />
          </CardContent>
        </Card>
      )}
    </div>
  )
}
