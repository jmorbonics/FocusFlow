import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import BasicExample from './Nav';
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BasicExample />
    <App />
  </StrictMode>,
)
