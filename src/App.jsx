import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Added missing imports


import './App.css'

import Home from './Home'; // Ensure components are properly imported
import Parse from './Parse';
import Calibrate from './Calibrate';
import CollectData from './CollectData';
import GPT from './components/GPT';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/parse" element={<Parse />} />
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/calibrate" element={<Calibrate />} />
        <Route path="/mldata" element={<CollectData />} />
        <Route path="/gpt" element={<GPT />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
