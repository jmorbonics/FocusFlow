import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Added missing imports


import './App.css'

import Home from './Home'; // Ensure components are properly imported
import Parse from './Parse';


import Home from './Home'; // Ensure components are properly imported
import Parse from './Parse';
import Calibrate from './Calibrate';
import CollectData from './CollectData';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/parse" element={<Parse />} />
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
