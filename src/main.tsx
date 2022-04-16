import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './pages/home/Index'
import { BrowserRouter } from 'react-router-dom'
import './styles/index.css'

const root = document.getElementById('root')!

createRoot(root).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
