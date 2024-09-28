import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

import Home from './Home'; // Ensure components are properly imported
import Parse from './Parse';


function App() {
  return (
      <div className="webpage">
        <BrowserRouter>
          {/* <NavBar brandName="ClearChat" imageSrcPath={imagePath} /> */}
            <Routes>
              <Route path="/parse" element={<Parse />} />
              <Route path="/" element={<Home />} />
              {/* <Route path="/home" element={<Home/>} />
              <Route path="/gpt" element={<GPT />} />
              <Route path="/llama" element={<Llama />} />
              <Route path="/filesearch" element={<FileSearch />} />
              <Route path="/rag" element={<RAG />} />
              <Route path="/about" element={<About />} />
              <Route path="/pricing" element={<Pricing />} /> */}
            </Routes>
          </BrowserRouter>
      </div>
  );
}

export default App
