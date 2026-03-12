'use client'

import { useEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useTheme } from 'next-themes'
import { useHasMounted } from '@/lib/useHasMounted'

function createParticleData(count: number) {
  const positions = new Float32Array(count * 3)
  const speeds = new Float32Array(count)

  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 10
    positions[i * 3 + 1] = (Math.random() - 0.5) * 10
    positions[i * 3 + 2] = (Math.random() - 0.5) * 5
    speeds[i] = 0.002 + Math.random() * 0.005
  }

  return { positions, speeds }
}

export default function FloatingParticles({ count = 1000 }: { count?: number }) {
  const points = useRef<THREE.Points>(null)
  const materialRef = useRef<THREE.PointsMaterial>(null)
  const positionsRef = useRef(new Float32Array(0))
  const speedsRef = useRef(new Float32Array(0))
  const { theme, resolvedTheme } = useTheme()
  const mounted = useHasMounted()

  const themeColor = useMemo(() => {
    const isLight = mounted && (theme === 'light' || resolvedTheme === 'light')
    return isLight ? new THREE.Color('#a1a1aa') : new THREE.Color('#60a5fa')
  }, [theme, resolvedTheme, mounted])

  useEffect(() => {
    const { positions, speeds } = createParticleData(count)
    positionsRef.current = positions
    speedsRef.current = speeds

    const geometry = points.current?.geometry
    if (!geometry) return

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.attributes.position.needsUpdate = true
  }, [count])

  useFrame((state) => {
    if (!points.current || !materialRef.current) return
    
    const positions = positionsRef.current
    const speeds = speedsRef.current
    if (positions.length === 0 || speeds.length === 0) return

    const time = state.clock.getElapsedTime()
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      positions[i3 + 1] += Math.sin(time * 0.5 + positions[i3]) * 0.001 + speeds[i]
      if (positions[i3 + 1] > 5) positions[i3 + 1] = -5
    }
    
    points.current.geometry.attributes.position.needsUpdate = true
    
    // Subtle rotation based on mouse
    points.current.rotation.y = THREE.MathUtils.lerp(points.current.rotation.y, state.mouse.x * 0.1, 0.05)
    points.current.rotation.x = THREE.MathUtils.lerp(points.current.rotation.x, -state.mouse.y * 0.1, 0.05)

    // Smooth color transition
    materialRef.current.color.lerp(themeColor, 0.05)
  })

  return (
    <points ref={points}>
      <bufferGeometry />
      <pointsMaterial
        ref={materialRef}
        size={0.025}
        transparent
        opacity={0.5}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
