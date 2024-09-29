import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { initializeWebGazer } from './useWebGazer';
import Stars from './components/Stars';

function Calibrate() {
  const [count, setCount] = useState(0)
	initializeWebGazer();
  return (
  <div>
  <Stars /> 
	<h1>calibrate this shit</h1>
  </div>
  )
}

export default Calibrate
