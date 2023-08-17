import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  Container,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material'
import { toast } from 'react-toastify'

import isTokenExpired from '../App/useToken'

import EstateCard from './EstateCard'
import StyledCustomPagination from './Pagination'
import './ClientDashboard.css'

export default function ClientDashboard() {
  const [estates, setEstates] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageCount, setPageCount] = useState(0)

  useEffect(() => {
    setIsLoading(true)
    const URL = `${process.env.REACT_APP_API_URL}/estates/get?pageSize=10&pageNo=${currentPage}`

    const tokenString = sessionStorage.getItem('token')
    const userToken = JSON.parse(tokenString)
    axios
      .get(URL, {
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': userToken.token,
        },
      })
      .then((response) => {
        const body = response.data
        setEstates([...body.estates])
        setPageCount(body.pagination.totalPages)
        setIsLoaded(true)
        setIsLoading(false)
      })
      .catch((error) => {
        if (isTokenExpired(userToken.token)) {
          sessionStorage.removeItem('token')
          window.location.reload()
        } else {
          toast.error(`Error: ${error.message}`)
        }
        setIsLoading(false)
      })
  }, [currentPage])

  const handlePageChange = (event, selectedPage) => {
    setCurrentPage(selectedPage)
  }

  return (
    <Container>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '20px',
        }}
      >
        <FormControl variant="outlined" style={{ width: '45%' }}>
          <InputLabel>Sort by Price</InputLabel>
          <Select
            // value={sortOrder}
            // onChange={(e) => setSortOrder(e.target.value)}
            label="Sort by Price"
          >
            <MenuItem value="asc">Ascending</MenuItem>
            <MenuItem value="desc">Descending</MenuItem>
          </Select>
        </FormControl>
      </div>
      {isLoading ? (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
        </div>
      ) : (
        <div className="card-list">
          {isLoaded &&
            estates.map((item) => (
              <EstateCard
                id={item._id}
                title={item.title}
                price={item.price}
                phone={item.phone}
                rooms={item.rooms}
                location={item.location}
                city={item.city}
                favorites={item.favorites}
              />
            ))}
        </div>
      )}
      {isLoaded && (
        <StyledCustomPagination
          pageCount={pageCount}
          handlePageChange={handlePageChange}
        />
      )}
    </Container>
  )
}
