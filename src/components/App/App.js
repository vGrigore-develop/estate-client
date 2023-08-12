import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ClientDashboard from "../ClientDashboard/ClientDashboard";
import Login from "../Login/Login";
import useToken from './useToken';

function App() {
  const { token, setToken } = useToken();

  if (!token) {
    return <Login setToken={setToken} />;
  }

  return (
    <div className="wrapper">
      <h1>Application</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element={<ClientDashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
