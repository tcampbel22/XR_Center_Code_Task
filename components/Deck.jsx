import React, { useState, useMemo, useEffect } from 'react'
import { cardCodes } from '../utils/cardList'
import { animateShuffle } from '../src/animations/shuffle'
import Card from './Card'

export default function Deck({ onDeal, onDeckChange, groupRef }) {
  const fullDeck = useMemo(() => [...cardCodes], [])
  const [deck, setDeck] = useState(fullDeck)

  useEffect(() => {
    onDeckChange?.(deck.length)
  }, [deck.length, onDeckChange])

   const shuffleDeck = () => {
    animateShuffle(
      groupRef,
	  () => {
		  const arr = [...deck]
		  for (let i = arr.length - 1; i > 0; i--) {
			  const j = Math.floor(Math.random() * (i + 1));
			  [arr[i], arr[j]] = [arr[j], arr[i]]
		  }
		  console.log("Deck shuffled");
		  setDeck(arr) 
		  }
    )
}


  const handlePointerDown = (e) => {
    e.stopPropagation()
    shuffleDeck()
  }

  useEffect(() => {
    const handler = (e) => {
      const n = e.detail
      setDeck((prev) => {
        const dealt = prev.slice(0, n)
        const remain = prev.slice(n)
        onDeal(dealt)
        return remain
      })
    }
    window.addEventListener('deal-request', handler)
    return () => window.removeEventListener('deal-request', handler)
  }, [onDeal])

  useEffect(() => {
    const handleReset = () => {
      setDeck(fullDeck)
      onDeal([])
      onDeckChange?.(fullDeck.length)
    }
    window.addEventListener('reset-deck', handleReset)
    return () => window.removeEventListener('reset-deck', handleReset)
  },[fullDeck, onDeal, onDeckChange])

  return (
    <group
      ref={groupRef}
      rotation={[-0.6, Math.PI, 0]}
      position={[0, 3.9, -1]}
    >
      {deck.map((code, idx) => (
        <Card
          key={`${code}-${idx}`}
          code={code}
          position={[0, -idx * 0.02, idx * 0.01]}
		  isDeck={true}
        />
      ))}

      {deck.length > 0 && (
        <mesh
          visible={false}
          position={[0, 0, deck.length * 0.001 + 0.01]}
          onPointerDown={handlePointerDown}
        >
          <boxGeometry args={[2.5, 3.5, 0.01]} />
        </mesh>
      )}
    </group>
  )
}
