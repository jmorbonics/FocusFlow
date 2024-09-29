import React, { useEffect } from 'react';
import './Stars.css'; 

const Stars = () => {
  useEffect(() => {
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
  }, []);

  return <div className="stars"></div>;
};

export default Stars;