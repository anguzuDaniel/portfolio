'use client'

import React, { useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import * as THREE from 'three'
import { useTheme } from 'next-themes'
import FloatingParticles from './FloatingParticles'

function SceneContent() {
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  
  const isLight = mounted && (theme === 'light' || resolvedTheme === 'light')

  return (
    <>
      <ambientLight intensity={isLight ? 0.8 : 0.2} />
      <pointLight position={[10, 10, 10]} intensity={isLight ? 2 : 0.5} />
      <Environment preset={isLight ? "warehouse" : "night"} />
      
      <FloatingParticles count={isLight ? 600 : 1200} />

      <EffectComposer enableNormalPass={false}>
        <Bloom 
          luminanceThreshold={isLight ? 1.0 : 0.2} 
          mipmapBlur 
          intensity={isLight ? 0.2 : 1.0} 
          radius={0.4} 
        />
        <Vignette offset={0.1} darkness={isLight ? 0.2 : 0.6} />
      </EffectComposer>
    </>
  )
}

export default function Scene() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
      <Canvas
        shadows
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 2]}
        gl={{ 
          antialias: true, 
          alpha: true, 
          stencil: false, 
          depth: true,
          toneMapping: THREE.ACESFilmicToneMapping
        }}
      >
        <SceneContent />
      </Canvas>
    </div>
  )
}
