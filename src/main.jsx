import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { ArchiveProvider } from './auth.jsx'
import { ContentProvider } from './content.jsx'
import './styles.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter><ContentProvider><ArchiveProvider><App /></ArchiveProvider></ContentProvider></BrowserRouter>
  </React.StrictMode>
)
