import React, { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import ClientDashboard from '../ClientDashboard/ClientDashboard'
import Login from '../Login/Login'
import useToken from './useToken'
import useUserInfo from './useUserInfo'
import Header from '../Header/Header'
import Sidebar from '../Sidebar/Sidebar'

import 'react-toastify/dist/ReactToastify.css'
import './App.css'

function App() {
  const { token, setToken } = useToken()
  const { userInfo, setUserInfo } = useUserInfo()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const loggedInUser = {
    name: userInfo?.name,
  }

  if (!token) {
    return (
      <>
        <div className="wrapper" />
        <ToastContainer />
        <Login setToken={setToken} setUserInfo={setUserInfo} />
      </>
    )
  }

  const handleLogout = () => {
    setToken('')
    setUserInfo('')
  }

  return (
    <div className="wrapper">
      <ToastContainer />
      <Header toggleSidebar={toggleSidebar} loggedInUser={loggedInUser} />
      <Sidebar
        open={sidebarOpen}
        onClose={toggleSidebar}
        onLogout={handleLogout}
      />
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element={<ClientDashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
