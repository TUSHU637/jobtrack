import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Applications from './pages/Applications'
import ApplicationDetails from './pages/ApplicationDetails'
import Dashboard from './pages/Dashboard'
import { Route,Routes } from 'react-router-dom'

function App() {

  return (
    <div className="App">
      <div className="navbar">
      <Navbar />
      </div>
      <div className="container">
        <div className="sidebar">
      <Sidebar />
        </div>
        <div className="main-content">
        <Routes>
          <Route path="/" element={<Dashboard />} /> 
          <Route path="/applications" element={<Applications />} />
          <Route path="/applications/details/:id" element={<ApplicationDetails />} />
        </Routes>
        </div>
      </div>
        </div>
  )
}

export default App
