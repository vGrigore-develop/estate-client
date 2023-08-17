import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Divider } from '@mui/material'

import {
  CardListContainer,
  CardContainer,
  CardContentContainer,
  TitleContainer,
  Title,
  Price,
  Details,
  ShowDetails,
} from './EstateCardStyles'
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
    <CardListContainer>
      <CardContainer>
        <CardContentContainer onClick={toggleDetails}>
          <TitleContainer>
            <Title variant="h6">{title}</Title>
            <Price variant="subtitle1">{price} euro</Price>
          </TitleContainer>
        </CardContentContainer>
      </CardContainer>
      {showDetails && (
        <CardContainer active="true">
          <CardContentContainer>
            <Title variant="h6">{title}</Title>
            <Price variant="subtitle1">{price} euro</Price>
            <Divider style={{ margin: '8px 0' }} />
            <ShowDetails>
              <strong>Phone:</strong> {phone}
              <br />
              <strong>Rooms:</strong> {rooms}
              <br />
              <strong>Location:</strong> {location}
              <br />
              <strong>City:</strong> {city}
            </ShowDetails>
            <Divider style={{ margin: '8px 0' }} />
            <HeartIcon isFavorited={isFavorited} onToggle={toggleFavorite} />
          </CardContentContainer>
        </CardContainer>
      )}
    </CardListContainer>
  )
}
