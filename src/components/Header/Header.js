import React from 'react'
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import './Header.css' // Import the new CSS file

export default function Header({ toggleSidebar, loggedInUser }) {
  return (
    <AppBar className="header" position="sticky">
      <Toolbar className="toolbar-flex">
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleSidebar}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className="header-title">
          Estates Dashboard
        </Typography>
        <Typography variant="body2" className="header-welcome">
          Welcome, {loggedInUser.name}
        </Typography>
      </Toolbar>
    </AppBar>
  )
}
