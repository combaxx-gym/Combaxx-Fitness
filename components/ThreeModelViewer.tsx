'use client'

import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF, Environment, Center, Bounds } from '@react-three/drei'
import styles from '@/styles/components/ThreeModelViewer.module.css'

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url)
  return (
    <Center>
      <primitive object={scene} />
    </Center>
  )
}

function LoadingFallback() {
  return (
    <div className={styles.loadingWrapper}>
      <div className={styles.spinner} />
      <span className={styles.loadingText}>Loading 3D Model</span>
    </div>
  )
}

export default function ThreeModelViewer({ url }: { url: string }) {
  return (
    <div className={styles.container}>
      <Suspense fallback={<LoadingFallback />}>
        <Canvas
          className={styles.canvas}
          gl={{ antialias: true, alpha: true }}
          camera={{ position: [0, 1.5, 6], fov: 40 }}
        >
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 8, 5]} intensity={1.2} />
          <directionalLight position={[-5, -3, -5]} intensity={0.35} />

          <Suspense fallback={null}>
            <Bounds fit clip observe margin={1.25}>
              <Model url={url} />
            </Bounds>
            <Environment preset="city" />
          </Suspense>

          <OrbitControls
            makeDefault
            autoRotate
            autoRotateSpeed={1.2}
            enableZoom
            enablePan={false}
            minDistance={1}
            maxDistance={20}
          />
        </Canvas>
      </Suspense>
      <div className={styles.hint}>Drag to rotate · Scroll to zoom</div>
    </div>
  )
}
