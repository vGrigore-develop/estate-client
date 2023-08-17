import styled from 'styled-components'
import { Card, CardContent, Typography } from '@mui/material'

export const CardListContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`

export const CardContainer = styled(Card)`
  margin: 10px;
  width: 100%;
  background-color: #ffffff;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.02);
  }
`

export const CardContentContainer = styled(CardContent)`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`

export const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`

export const Title = styled(Typography)`
  font-size: 1.25rem;
  font-weight: 600;
  color: #333;
`

export const Price = styled(Typography)`
  font-size: 1rem;
  font-weight: 600;
  color: #2196f3; /* Blue color */
`

export const Details = styled.div`
  display: none;
`

export const ShowDetails = styled(Details)`
  display: block;
  margin-top: 16px;
  color: #777;
`
