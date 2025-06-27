import { useFrame } from '@react-three/fiber'

export function useHover(meshRef, hover, rotation, basePosition = [0, 0, 0]) {
	useFrame(({ clock }) => {
		if (meshRef.current) {
		  const target = hover ? 1.35 : 1
		  meshRef.current.scale.x += (target - meshRef.current.scale.x) * 0.15
		  meshRef.current.scale.y += (target - meshRef.current.scale.y) * 0.15
		  meshRef.current.scale.z += (target - meshRef.current.scale.z) * 0.45
		 // Ensure card hovered card is above other cards 
		  const targetZ = hover ? (basePosition[2] + 2) : basePosition[2]
      	  meshRef.current.position.z += (targetZ - meshRef.current.position.z) * 0.2
		  if (hover) {
			const t = clock.getElapsedTime()
			meshRef.current.rotation.z = rotation[2] + Math.sin(t * 10) * 0.07
			meshRef.current.rotation.x = rotation[0] + Math.sin(t * 7) * 0.03
		  }
		  else {
			meshRef.current.rotation.z += (rotation[2] - meshRef.current.rotation.z) * 0.2
			meshRef.current.rotation.x += (rotation[0] - meshRef.current.rotation.x) * 0.2
		  }
		}
	  })
	  return meshRef;
}