import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Applications from './pages/Applications'

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
      <Applications />
        </div>
      </div>
    </div>
  )
}

export default App
