import React, { useEffect } from "react";
import focusflowLogo from './assets/focusflowtransparent.png'; // Adjust the import path as needed

const generateStars = () => {
  const starContainer = document.querySelector('.stars');
  
  for (let i = 0; i < 100; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    
    // Random position and animation delay
    star.style.top = `${Math.random() * 100}vh`;
    star.style.left = `${Math.random() * 100}vw`;
    star.style.animationDuration = `${Math.random() * 3 + 2}s`;
    star.style.animation = `twinkling ${Math.random() * 3 + 2}s infinite ease-in-out`;
    
    starContainer.appendChild(star);
  }
};

const Home = () => {
  useEffect(() => {
    generateStars();
  }, []);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("Selected file:", file.name);
      // Add your file handling logic here
    }
  };

  return (
    <div className="home-container">
      <div className="stars"></div>
      <div className="about-section">
        <img src={focusflowLogo} alt="FocusFlow Logo" width="200" height="200" />
        <h1>Our Project, FocusFlow</h1>
        <p>
          FocusFlow aims to enhance concentration and comprehension for individuals with trouble concentrating and ADHD
          by integrating AI text extraction from PDFs with eye-tracking technology. 
          The ultimate study/focus application, this tool will highlight text dynamically, giving visual 
          cues to maintain focus and improve a user's reading experience and concentration.
        </p>
        <h2>Features</h2>
        <ul>
          <li>Trained eye tracking AI model hosted on the backend by an Intel AI PC</li>
          <li>Automatic Machine Learning backed highlighting system detecting missed highlights and autocorrecting features</li>
          <li>Custom-made games created using Artificial Intelligence to analyze users' gaming history for trends</li>
          <li>Backed neural research showing increased attentiveness and focus given patterns of light and short times of stimulus activity</li>
        </ul>
        <h2>Contact</h2>
        <p>
          If you have any questions, suggestions, or need further information
          about our project, please don't hesitate to reach out. 
          <br /><br />
          @CS @MechSE @Illinois
        </p> 
        <input
          type="file"
          accept=".pdf"
          style={{ display: 'none' }}
          id="fileInput"
          onChange={handleFileUpload}
        />
        <button onClick={() => document.getElementById('fileInput').click()}>
          Upload PDF
        </button>
      </div>
    </div>
  );
};

export default Home;