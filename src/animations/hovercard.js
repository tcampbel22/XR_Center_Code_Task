import { useFrame } from '@react-three/fiber'

export function useHover(meshRef, hover, rotation, basePosition = [0, 0, 0]) {
	useFrame(({ clock }) => {
		if (meshRef.current) {
		  const fade = 0.1;
		  const target = hover ? 1.3 : 1
		  meshRef.current.scale.x += (target - meshRef.current.scale.x) * 0.15
		  meshRef.current.scale.y += (target - meshRef.current.scale.y) * 0.15
		  meshRef.current.scale.z += (target - meshRef.current.scale.z) * 0.45
		 
		  const targetY = hover && basePosition[1] < -1.5 ? (basePosition[1] + 2) : basePosition[1]
          meshRef.current.position.y += (targetY - meshRef.current.position.y) * fade;
		  
		  const targetX = hover && basePosition[0] < 1 ? (basePosition[0] + 0.3) : basePosition[0]
		  meshRef.current.position.x += (targetX - meshRef.current.position.x) * fade
		    // console.log(meshRef.current.position.x)
		  const targetZ = hover ? (basePosition[2] + 2) : basePosition[2]
      	  meshRef.current.position.z += (targetZ - meshRef.current.position.z) * fade
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