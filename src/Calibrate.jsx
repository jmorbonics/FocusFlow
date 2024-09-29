import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { initializeWebGazer } from './useWebGazer';

function Calibrate() {
  const [count, setCount] = useState(0)
	initializeWebGazer();
  return (
	<h1>calibrate this shit</h1>
  )
}

export default Calibrate
