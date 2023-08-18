import React, { useState } from 'react'
import { IconButton } from '@mui/material'
import { Favorite, FavoriteBorder } from '@mui/icons-material'

const HeartIcon = ({ isFavorited, onToggle }) => {
  return (
    <IconButton onClick={onToggle} color="primary">
      {isFavorited ? <Favorite /> : <FavoriteBorder />}
    </IconButton>
  )
}

export default HeartIcon
