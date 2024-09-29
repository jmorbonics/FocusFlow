import React, { useEffect, useState } from 'react';
import './App.css'; // Make sure you have the CSS for highlighting

const Parse = () => {
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });

  // The paragraph text to display
  const paragraphText = `In the modern world, technology plays a critical role in shaping the way we communicate, work, and live our lives. Over the past few decades, advancements in computing, mobile devices, and the internet have connected people from all corners of the globe, making the exchange of information instantaneous and accessible. As society becomes increasingly dependent on digital platforms, issues such as cybersecurity, data privacy, and artificial intelligence ethics have become central concerns. The rapid pace of technological innovation has also transformed industries, automating tasks, and revolutionizing fields like healthcare, education, and entertainment. Despite these advances, there are still many challenges to be addressed, including the digital divide that leaves certain populations without access to essential technologies and the environmental impact of electronic waste. As we look to the future, it is crucial to develop sustainable practices that ensure technology continues to benefit society as a whole while mitigating its negative effects. Innovations such as renewable energy, quantum computing, and biotechnology hold promise for addressing global challenges like climate change, disease eradication, and food security. However, with these opportunities come responsibilities, and it is the duty of technologists, policymakers, and individuals alike to ensure that progress is made in an equitable and ethical manner. In doing so, we can create a world where technology serves as a force for good, improving the quality of life for all while preserving the planet for future generations.`;

  useEffect(() => {
    const paragraph = document.getElementById('paragraph');
    const words = paragraphText.split(' '); // Split the paragraph into words
    paragraph.innerHTML = ''; // Clear the paragraph content

    // Wrap each word in a span and append to the paragraph
    words.forEach((word, index) => {
      const span = document.createElement('span');
      span.id = `word-${index + 1}`; // Assign a unique ID to each word
      span.innerHTML = word + ' '; // Add a space after each word
      paragraph.appendChild(span);
    });
  }, []); // This runs only once on mount

  // Function to highlight the word at the given x and y coordinates
  const highlightAtCoordinates = (x, y) => {
    const words = document.querySelectorAll('#paragraph span');
    if (!words.length) return;

    const lineHeight = parseFloat(window.getComputedStyle(words[0]).lineHeight);
    const rect = document.getElementById('paragraph').getBoundingClientRect();
    const lineNumber = Math.floor((y - rect.top) / lineHeight);
    const wordsInLine = [];

    // Clear previous highlights
    // clearHighlight();

    words.forEach((word) => {
      const wordRect = word.getBoundingClientRect();
      if (lineNumber === Math.floor((wordRect.top - rect.top) / lineHeight)) {
        wordsInLine.push(word);
      }
    });

    // Check if the entire line above the current line is highlighted
    for (let i = 0; i < lineNumber; i++) {
      const lineWords = Array.from(words).filter(
        (word) => Math.floor((word.getBoundingClientRect().top - rect.top) / lineHeight) === i
      );
      if (lineWords.some((word) => !word.classList.contains('highlight'))) {
        return; // Prevent highlighting if the previous line isn't fully highlighted
      }
    }

    // Now check the current line for the word to highlight
    wordsInLine.forEach((word) => {
      const wordRect = word.getBoundingClientRect();
      if (x >= wordRect.left && x <= wordRect.right && y >= wordRect.top && y <= wordRect.bottom) {
        word.classList.add('highlight'); // Apply highlight style
        checkAndHighlightInBetween(2);
      }
    });
  };

  const checkAndHighlightInBetween = (n) => {
    const words = document.querySelectorAll('#paragraph span');
    let toHighlight = [];
    let gap = 0;

    words.forEach((word) => {
      if (word.classList.contains('highlight')) {
        if (gap > 0) {
          toHighlight.forEach((w) => {
            w.classList.add('highlight');
          });
        }
        toHighlight = [];
        gap = n + 1;
      } else {
        gap -= 1;
        if (gap) toHighlight.push(word);
      }
    });
  };

  // Function to clear all bold styles
  const clearHighlight = () => {
    const words = document.querySelectorAll('#paragraph span');
    words.forEach((word) => {
      word.classList.remove('highlight');
    });
  };

  // Trigger the highlight function whenever the coordinates are updated
  useEffect(() => {
    highlightAtCoordinates(coordinates.x, coordinates.y);
  }, [coordinates]); // Re-run when coordinates change

  useEffect(() => {
    // Mousemove event handler to update coordinates state
    const handleMouseMove = (e) => {
      setCoordinates({ x: e.clientX, y: e.clientY });
    };

    // Add the event listener to track mouse movement
    document.addEventListener('mousemove', handleMouseMove);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []); // Empty dependency array ensures this only runs once on mount

  const handleHighlightClick = () => {
    const x = parseInt(document.getElementById('x-coord').value);
    const y = parseInt(document.getElementById('y-coord').value);

    if (!isNaN(x) && !isNaN(y)) {
      highlightAtCoordinates(x, y); // Call the function to highlight the word
    } else {
      alert('Please enter valid X and Y coordinates.');
    }
  };

  return (
    <div>
      <h1>Big Paragraph typ shi</h1>
      <p id="paragraph"></p>

      {/* Inputs for X and Y coordinates */}
      <div className="mb-3">
        <label htmlFor="x-coord" className="form-label">X Coordinate:</label>
        <input type="number" id="x-coord" className="form-control" placeholder="Enter X coordinate" />
      </div>
      <div className="mb-3">
        <label htmlFor="y-coord" className="form-label">Y Coordinate:</label>
        <input type="number" id="y-coord" className="form-control" placeholder="Enter Y coordinate" />
      </div>

      <button id="highlight-btn" className="btn btn-primary" onClick={handleHighlightClick}>
        Highlight Word at Coordinates
      </button>
      <button className="btn btn-secondary" onClick={clearHighlight}>
        Clear Bold
      </button>
    </div>
  );
};

export default Parse;
