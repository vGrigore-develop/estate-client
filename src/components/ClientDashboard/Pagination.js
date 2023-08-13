import React from 'react'
// import ReactPaginate from 'react-paginate';
import { Pagination, Stack } from '@mui/material'
import styled from 'styled-components'

import './Pagination.css'

const StyledPaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`

export default function StyledCustomPagination({
  pageCount,
  handlePageChange,
}) {
  return (
    <StyledPaginationWrapper>
      <Pagination
        count={pageCount}
        variant="outlined"
        color="primary"
        onChange={handlePageChange}
      />
    </StyledPaginationWrapper>
  )
}
