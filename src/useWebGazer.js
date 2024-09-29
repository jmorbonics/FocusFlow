export const initializeWebGazer = () => {
	const script = document.createElement('script');
	script.src = 'https://webgazer.cs.brown.edu/webgazer.js';
	script.async = true;
	document.body.appendChild(script);
	
	script.onload = () => {
	  window.webgazer.clearData();
	  window.webgazer.showVideo(false);
	  window.webgazer.showPredictionPoints(true);
	  window.webgazer.applyKalmanFilter(true);
	  window.webgazer.setRegression('ridge')
		.setTracker('clmtrackr')
		.setGazeListener((data, clock) => {
		  if (data) {
			console.log(`X: ${data.x}, Y: ${data.y}, Timestamp: ${clock}`);
		  }
		})
		.begin();
	};
  };
  



  export const getFocusedData = (duration = 10000) => {
	return new Promise((resolve, reject) => {
	  const script = document.createElement('script');
	  script.src = 'https://webgazer.cs.brown.edu/webgazer.js';
	  script.async = true;
	  document.body.appendChild(script);
  
	  window.focusData = [];
	  let preTensor = [];

	  script.onload = () => {
		window.webgazer.showPredictionPoints(true);

		window.webgazer.setGazeListener((data, clock) => {
		  if (data) {
			preTensor.push([data.x, data.y]);
		  }
		  console.log("printing");
		  if (preTensor.length() >= 50) {
			console.log("appeneded");
			window.focusData.push(preTensor);
			preTensor = [];
		  }
		})
		.begin();
  
		// Stop collecting data after the specified duration
		setTimeout(() => {
		  window.webgazer.pause();
		  console.log('Focus data:', window.focusData);
		  resolve(window.focusData);
		}, duration);
	  };
  
	  script.onerror = () => {
		reject(new Error('Failed to load WebGazer script'));
	  };
	});
  };
  