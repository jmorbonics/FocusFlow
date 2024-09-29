import React, { useEffect, useState } from 'react';
import './App.css'; // Make sure you have the CSS for highlighting
import { initializeWebGazer } from './useWebGazer';
import { use } from 'marked';
import * as marked from "marked";
import axios from "axios";
import Stars from './components/Stars';


const Parse = () => {
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
  const [gazePosition, setGazePosition] = useState({ x: null, y: null });
  const [focusTime, setFocusTime] = useState({ focused: 0, unfocused: 0 })
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [paragraphText, setParagraphText] = useState('');

  const handleSubmit = async () => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    console.log("Initializing GPT startup sequence")

    console.log("GPT initiated -> sending PDF 2 Txt request");
    const response = await axios.post("http://localhost:3005/pdf2txt", {
      question: "Tell me a summary of the uploaded pdf",
    });
    const html = await marked.marked(response.data);
    setResponse(html);
    setParagraphText(html);
    // setIsLoading(false);
    console.log("GPT response received")

    console.log(html)
    const paragraph = document.getElementById('paragraph');
    const words = html.split(' '); // Split the paragraph into words
    paragraph.innerHTML = ''; // Clear the paragraph content
    words.forEach((word, index) => {
      const span = document.createElement('span');
      span.id = `word-${index + 1}`; // Assign a unique ID to each word
      span.innerHTML = word + ' '; // Add a space after each word
      paragraph.appendChild(span);
    });



  };

  useEffect(() => {
    const startTime = Date.now();

    const fetchData = async () => {
      console.log("starting fetching data");
      await handleSubmit();
      console.log("finished fetching data");

      // const paragraph = document.getElementById('paragraph');
      // const words = paragraphText.split(' '); // Split the paragraph into words
      // paragraph.innerHTML = ''; // Clear the paragraph content

      // // Wrap each word in a span and append to the paragraph
      // words.forEach((word, index) => {
      //   const span = document.createElement('span');
      //   span.id = `word-${index + 1}`; // Assign a unique ID to each word
      //   span.innerHTML = word + ' '; // Add a space after each word
      //   paragraph.appendChild(span);
      // });
    };

    fetchData();
  
    return () => {
      const endTime = performance.now();
      const elapsed = (endTime - startTime) / 1000; // Convert to seconds
      const totalTime = (parseFloat(localStorage.getItem('timeSpentOnPage1')) || 0) + elapsed;
      localStorage.setItem('timeSpentOnPage1', totalTime.toFixed(2));
      setTimeSpent(totalTime);

      // Remove visibilitychange event listener
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [startTime]);



  // initializeWebGazer();
  // The paragraph text to display
  // const paragraphText = `In the modern world, technology plays a critical role in shaping the way we communicate, work, and live our lives. Over the past few decades, advancements in computing, mobile devices, and the internet have connected people from all corners of the globe, making the exchange of information instantaneous and accessible. As society becomes increasingly dependent on digital platforms, issues such as cybersecurity, data privacy, and artificial intelligence ethics have become central concerns. The rapid pace of technological innovation has also transformed industries, automating tasks, and revolutionizing fields like healthcare, education, and entertainment. Despite these advances, there are still many challenges to be addressed, including the digital divide that leaves certain populations without access to essential technologies and the environmental impact of electronic waste. As we look to the future, it is crucial to develop sustainable practices that ensure technology continues to benefit society as a whole while mitigating its negative effects. Innovations such as renewable energy, quantum computing, and biotechnology hold promise for addressing global challenges like climate change, disease eradication, and food security. However, with these opportunities come responsibilities, and it is the duty of technologists, policymakers, and individuals alike to ensure that progress is made in an equitable and ethical manner. In doing so, we can create a world where technology serves as a force for good, improving the quality of life for all while preserving the planet for future generations.`;
  // const paragraphText = response;
  // console.log(paragraphText)

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://webgazer.cs.brown.edu/webgazer.js';
    script.async = true;
    document.body.appendChild(script);
  
    script.onload = () => {
      window.webgazer.clearData();
      window.webgazer.showVideo(false);
      window.webgazer.showPredictionPoints(true);
      window.webgazer.applyKalmanFilter(true);
  
      window.webgazer
        .setRegression('ridge')
        .setTracker('clmtrackr')
        .setGazeListener((data) => {
          if (data) {
            setGazePosition({ x: data.x, y: data.y });
          }
        })
        .begin();
    };
  
    return () => {
      if (window.webgazer) {
        window.webgazer.end();
      }
    };
  }, []);
  

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
      if (x >= wordRect.left-105 && x <= wordRect.right+105 && y >= wordRect.top-105 && y <= wordRect.bottom+105) {
        if (!word.classList.contains('highlight')) {
          word.classList.add('highlight'); // Apply highlight style
          setWordsHighlighted(wordsHighlighted+1);
        }
        checkAndHighlightInBetween(5);
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
            if (!w.classList.contains('highlight')) {
              w.classList.add('highlight');
              setWordsHighlighted(wordsHighlighted+1);
            }
            // w.classList.add('highlight');
            // setWordsHighlighted(wordsHighlighted+1);
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
    highlightAtCoordinates(gazePosition.x, gazePosition.y);
  }, [gazePosition]); // Re-run when coordinates change

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
      <Stars /> 
      <h1 class="ypdf">Your PDF</h1>
      <p id="paragraph"></p>
      <a href=""></a>

      {/* Inputs for X and Y coordinates */}
      {/* <div className="mb-3">
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
      </button> */}
    </div>
  );
};

export default Parse;
