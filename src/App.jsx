import React, { useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import Deck from '../components/Deck'
import Card from '../components/Card'
import { animateDeal } from './animations/dealcards'
import './App.css'

export default function App() {
  const [dealtCards, setDealtCards] = useState([]);
  const [deckCount, setDeckCount] = useState(0);
  const [cardPositions, setCardPositions] = useState([]);

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
        const positions = animateDeal(dealtRefs.current, deckGroupRef);
		setCardPositions(positions);
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
	<div className="flex flex-col w-full h-full bg-cover overflow-auto">
      <div className="flex w-screen h-screen">
        <Canvas
          shadows
          dpr={[1, 2]}
          camera={{ position: [0, 2, 12], fov: 50 }}
		  >
          <ambientLight intensity={1.2} />
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
		<Html position={[16, 0.8, -100]} style={{
   				 transform: 'translateX(-50%)'}}>
			<h1 className="text-[20px]">{deckCount}/78 </h1>
			</Html>

          {dealtCards.map((code, idx) => {
			  const origin = deckGroupRef.current.position
			  return (
						<Card
							key={`${code}-${idx}`}
							ref={dealtRefs.current[idx]}
							code={code}
							dealt={true}
							rotation={[0, 0, 0]}
							position={[origin.x, origin.y, origin.z]}
							finalPos={cardPositions[idx]}
						/>

						
					)
				})}
        </Canvas>
		</div>
      	<div className="flex flex-col justify-center items-center mb-[5vh] mx-[5vh]">
        	<h1 className="text-center">Draw cards (1-7)</h1>
			<div className="grid grid-cols-3 grid-rows-3 gap-x-[10px] gap-y-[10px]">
				{[1, 2, 3, 4, 5, 6, 7].map((n) => (
					<button 
						className='col-span-1 transform hover:scale-120 transition-all duration-300 ease-in-out relative hover:shadow-xl hover:rotate-1' 
						key={n} 
						onClick={() => requestDeal(n)}>
						{n}
					</button>
				))}
         	  		<button 
						className='col-span-2 text-[#575555] bg-[#e0d18c] transform hover:scale-120 transition-all duration-300 ease-in-out relative hover:shadow-xl hover:bg-[] hover:rotate-1' 
						onClick={resetDeck}>
						Reset
              		</button>
			</div>
		</div>
    </div>
  )
}
