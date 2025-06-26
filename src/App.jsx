import React, { useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import Deck from '../components/Deck'
import Card from '../components/Card'
import { animateDeal } from './animations/dealcards'
import './App.css'

export default function App() {
  const [dealtCards, setDealtCards] = useState([])
  const [deckCount, setDeckCount] = useState(0)

  const dealtRefs = useRef([])
  const deckGroupRef = useRef()
  const handleDeckChange = (count) => setDeckCount(count)
  const handleDeal = (cards) => {
    dealtRefs.current = cards.map(() => React.createRef())
    setDealtCards(cards)
  }
  
  useEffect(() => {
    if(!dealtRefs.current || !Array.isArray(dealtRefs.current)) return
    if (dealtRefs.current.length === 0 || !deckGroupRef.current) return
    
    const tryAnimate = () => {
      const ready = dealtRefs.current.every(ref => ref?.current)

      if(ready) {
        animateDeal(dealtRefs.current, deckGroupRef)
      } else {
        requestAnimationFrame(tryAnimate)
      }
    }

    tryAnimate()
  },[dealtCards])

  const requestDeal = (n) =>
    window.dispatchEvent(new CustomEvent('deal-request', { detail: n }))
  
  const resetDeck = () => window.dispatchEvent(new Event('reset-deck'))

  return (
	<div className="flex flex-col w-full h-full bg-[#4e0d4e] bg-cover overflow-auto">

      <div className="flex flex-col justify-center items-center relative top-[5vh]">
        <h1 className="text-center text-3xl">Choose how many cards to draw</h1>
		<div className="justify-center space-x-[10px] space-y-[10px]">
          {[1, 2, 3, 4, 5, 6, 7].map((n) => (
			  <button key={n} onClick={() => requestDeal(n)}>
              {n}
            </button>
          ))}
        </div>
		<div className="justify-center space-x-[10px] space-y-[10px]">
          <button className='bg-[#ed5151]' onClick={resetDeck}>
            Reset Deck
          </button>
		</div>
		<h1 className="text-center text-3xl">{deckCount} cards left</h1>
		  </div>
      <div className="flex w-[1000px] h-[500px] overflow-auto">
        <Canvas
          className=""
          shadows
          dpr={[1, 2]}
          camera={{ position: [0, 2, 12], fov: 60 }}
		  >
          <ambientLight intensity={0.6} />
          <directionalLight
            castShadow
            position={[5, 5, 5]}
            intensity={1}
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
			/>
				<Deck 
					onDeal={handleDeal}
					onDeckChange={handleDeckChange}
					groupRef={deckGroupRef}
					/>

          {dealtCards.map((code, idx) => {
			  const count = dealtCards.length
			  const xOffset = -((count - 1) / 2) + idx * 1.2
			  const rotY = (idx - (count - 1) / 2) * 0.2
			  const origin = deckGroupRef.current.position
			  return (
					  <Card
					key={`${code}-${idx}`}
					ref={dealtRefs.current[idx]}
					code={code}
					dealt={true}
					rotation={[0, rotY, 0]}
					position={[origin.x - xOffset, origin.y, origin.z]}
					/>

            )
		})}
        </Canvas>
      </div>
    </div>
  )
}
