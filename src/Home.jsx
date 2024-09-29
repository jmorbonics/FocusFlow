import React, { useEffect } from "react";

const generateStars = () => {
  const starContainer = document.querySelector('.stars');
  
  for (let i = 0; i < 100; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    
    // Random position and animation delay
    star.style.top = `${Math.random() * 100}vh`;
    star.style.left = `${Math.random() * 100}vw`;
    star.style.animation = `twinkling ${Math.random() * 3 + 2}s infinite ease-in-out`;
    
    starContainer.appendChild(star);
  }
};

const Home = () => {
  useEffect(() => {
    generateStars();
  }, []);

  return (
    <div className="home-container">
      <div className="stars"></div>
      <div className="about-section">
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
      </div>
    </div>
  );
};

export default Home;