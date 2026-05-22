import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import './styles/global.scss'

function App() {
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<div>Home Page</div>} />
            {/* Add your routes here */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App