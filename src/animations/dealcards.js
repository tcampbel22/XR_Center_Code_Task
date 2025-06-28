/**
 * @param cardRefs
 * @param groupRef
 */
export function animateDeal(cardRefs, groupRef) {
  const origin = groupRef.current.position
  const finalPos = [];

  const spacingX    = 2.3
  const separationZ = 0
  const yEndBase    = -1
  const duration    = 400
  const delayEach   = 100
  const rowSpacing = -0.8

  function tween(from, to, dur, onUpdate) {
    const start = performance.now()
    function frame(now) {
      const t = Math.min((now - start) / dur, 1)
      onUpdate(from + (to - from) * t)
      if (t < 1) requestAnimationFrame(frame)
    }
    requestAnimationFrame(frame)
  }

  cardRefs.forEach((ref, i) => {
    const m = ref.current
    if (!m) return
	
    m.position.set(origin.x, origin.y - 2, origin.z)
    m.rotation.set(Math.PI, Math.PI, Math.PI)
	
	const row = Math.floor(i / 4);
	const col = i % 4;
    const xEnd = -((4 - 1) / 2) * spacingX + col * spacingX
	const yEnd = row === 1 ? yEndBase + row * rowSpacing - 2.5 : yEndBase + row * rowSpacing;
    const zEnd = 0.5 + i * separationZ
    const rotY = 0

	finalPos.push([xEnd, yEnd, zEnd]);

    setTimeout(() => {
	  tween(m.position.x, xEnd,    duration, v => (m.position.x = v))
      tween(m.position.y, yEnd,    duration, v => (m.position.y = v))
      tween(m.position.z, zEnd,    duration, v => (m.position.z = v))
      tween(m.rotation.y, rotY,    duration, r => (m.rotation.y = r))
    }, i * delayEach)
  })
  return finalPos;
}
