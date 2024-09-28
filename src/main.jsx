import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import NavbarFlow from './components/Nav.jsx';
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NavbarFlow />
    <App />
  </StrictMode>,
)
