import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { ArchiveProvider } from './auth.jsx'
import './styles.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter><ArchiveProvider><App /></ArchiveProvider></BrowserRouter>
  </React.StrictMode>
)
