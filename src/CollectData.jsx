import React, { useState, useEffect } from 'react';
import { getFocusedData } from './useWebGazer'; // Assuming you have this function implemented
import Stars from './components/Stars';
import './App.css'; // Make sure you have the CSS for highlighting


function CollectData() {
  const [collectingType, setCollectingType] = useState(null); // 'type1', 'type2', or null
  const [data, setData] = useState([]);

  const timeSpent = localStorage.getItem('timeSpentOnPage1');
  const wordsHighlighted = localStorage.getItem('wordsHighlighted');


  useEffect(() => {
    if (collectingType === 'type1') {
      startCollectingType1();
    } else if (collectingType === 'type2') {
      startCollectingType2();
    }
    // Cleanup function to stop collecting when the effect is deactivated
    return () => {
      stopCollecting();
    };
  }, [collectingType]);

  const startCollectingType1 = () => {
    console.log('Collecting Type 1 data');
    // Example: Using WebGazer for data collection (or any other method)
    getFocusedData(100000)  
	.then(data => {
	  console.log('Collection complete. Final data:', data);
	})
	.catch(error => {
	  console.error('Error:', error);
	});
   
    return data;
  };

  const startCollectingType2 = () => {
    console.log('Collecting Type 2 data');
    // Example: Another data collection logic
    const interval = setInterval(() => {
      setData((prevData) => [...prevData, `Type2 data at ${new Date().toLocaleTimeString()}`]);
    }, 1000);
    return interval;
  };

  const stopCollecting = () => {
    console.log('Stopping data collection');
    clearInterval(); // This stops any ongoing intervals
  };

  return (
    <div>
      <Stars />
      <h1 class="ypdf">Data Collection Page</h1>
      <h2>{timeSpent} Total seconds spent reading!</h2>
      <h2>{wordsHighlighted} Words Highlighted in Last Session!</h2>
      <div id="buttons">
        <button
          onClick={() => {
            setCollectingType('type1');
          }}
          disabled={collectingType === 'type1'}
        >
          Collect Focused Data
        </button>
        <button
          onClick={() => {
            setCollectingType('type2');
          }}
          disabled={collectingType === 'type2'}
        >
          Collect Distracted Data
        </button>
        <button onClick={() => setCollectingType(null)}>Stop Collecting</button>
      </div>
      <div>
        <h2>Collected Data</h2>
        <ul>
          {data.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CollectData;
