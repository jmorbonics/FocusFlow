import React, { useEffect } from "react";
import focusflowLogo from './assets/focusflowtransparent.png'; // Adjust the import path as needed
import Stars from "./components/Stars.jsx";


const Home = () => {

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("Selected file:", file.name);
      // Create a FormData object to send the file
      const formData = new FormData();
      formData.append('file', file);

      try {
        console.log("uploading file")
        const response = await fetch('http://localhost:3005/upload', {
          method: 'POST',
          body: formData
        });

        if (response.ok) {
          console.log('File uploaded successfully');
        } else {
          console.error('File upload failed');
        }
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  };

  return (
    <div className="home-container">
      <Stars /> 
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
        <button className="file-button" onClick={() => document.getElementById('fileInput').click()}>
          Upload PDF
        </button>
      </div>
    </div>
  );
};

export default Home;