import React, { forwardRef, useRef, useImperativeHandle, useState, useEffect } from 'react'
import { useLoader } from '@react-three/fiber'
import * as THREE from 'three'
import { cardMap } from '../utils/cardList'
import { useHover } from '../src/animations/hovercard'

const Card = forwardRef(({
	code,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  isDeck = false,
  finalPos = null,
}, ref) => {
  const [hover, setHover] = useState(false);
  const [basePos, setBasePos] = useState(position);
  const meshRef = useRef()

  useImperativeHandle(ref, () => meshRef.current, [])
  
  useEffect(() => {
	if (finalPos) {
		setBasePos(finalPos);
	}});

  	useHover(meshRef, !isDeck && finalPos ? hover : false, rotation, basePos);

  const frontUrl = cardMap[code]
  const backUrl = cardMap['CardBacks']
  const [frontTex, backTex] = useLoader(
    THREE.TextureLoader,
    [frontUrl, backUrl]
  )

  const materials = [
    new THREE.MeshStandardMaterial({ color: '#fca4fc' }),
    new THREE.MeshStandardMaterial({ color: '#fca4fc' }),
    new THREE.MeshStandardMaterial({ color: '#fca4fc' }),
    new THREE.MeshStandardMaterial({ color: '#fca4fc' }),
    new THREE.MeshStandardMaterial({ map: frontTex }),
    new THREE.MeshStandardMaterial({ map: backTex }),
  ]

  return (
    <mesh
      ref={meshRef}
      position={position}
      rotation={rotation}
      material={materials}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      castShadow
      receiveShadow
    >
      <boxGeometry args={[2.1, 3.1, 0.01]} />
    </mesh>
  )
})

export default Card