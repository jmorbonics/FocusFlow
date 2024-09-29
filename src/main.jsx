import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Calibrate from './Calibrate.jsx';
import BasicExample from './Nav';
import './index.css'
import CollectData from './CollectData.jsx';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BasicExample />
	<CollectData />
  </StrictMode>,
)
