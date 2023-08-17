import React from 'react'
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'

export default function Header({ toggleSidebar, loggedInUser }) {
  return (
    <AppBar position="static">
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleSidebar}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          variant="h6"
          style={{ color: '#fff', textDecoration: 'none' }}
        >
          Estates Dashboard
        </Typography>
        <Typography
          variant="body2"
          style={{ color: '#fff', marginLeft: '16px' }}
        >
          Welcome, {loggedInUser.name}
        </Typography>
      </Toolbar>
    </AppBar>
  )
}
