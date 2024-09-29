import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { initializeWebGazer } from './useWebGazer';

function Calibrate() {
  const [count, setCount] = useState(0)
	initializeWebGazer();
  return (
  <div>
    <h1 class="ypdf">Calibration Screen!</h1>
    <h2>Look and Click at different points across the screen to calibrate our eye tracking system</h2>
  </div>
  )
}

export default Calibrate
