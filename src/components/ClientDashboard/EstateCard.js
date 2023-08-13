import React, { useState } from 'react'
import { Card, CardContent, Typography, Divider } from '@mui/material'
import styled from 'styled-components'

import HeartIcon from './HeartIcon'

const CardListContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`

const CardContainer = styled(Card)`
  margin: 10px;
  width: 100%; /* Set the cards to full width */
  background-color: #ffffff;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.02);
  }
`

const CardContentContainer = styled(CardContent)`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`

const Title = styled(Typography)`
  font-size: 1.25rem;
  font-weight: 600;
  color: #333;
`

const Price = styled(Typography)`
  font-size: 1rem;
  font-weight: 600;
  color: #2196f3; /* Blue color */
`

const Details = styled.div`
  display: none;
`

const ShowDetails = styled(Details)`
  display: block;
  margin-top: 16px;
  color: #777;
`

export default function EstateCard({
  title,
  price,
  phone,
  rooms,
  location,
  city,
}) {
  const [showDetails, setShowDetails] = useState(false)
  const [isFavorited, setIsFavorited] = useState(false)

  const toggleDetails = () => {
    setShowDetails(!showDetails)
  }

  const toggleFavorite = () => {
    setIsFavorited(!isFavorited)

    // TODO: Call API to favorite/unfavorite estate
    // You can add your API call here
    // Example:
    // fetch('your-api-endpoint', {
    //   method: 'POST',
    //   body: JSON.stringify({ estateId: id }),
    //   headers: {
    //     'Content-Type': 'application/json',
    //     // Include authentication headers if needed
    //   },
    // })
    // .then(response => response.json())
    // .then(data => console.log(data))
    // .catch(error => console.error('Error', error));
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
        <CardContainer active>
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
