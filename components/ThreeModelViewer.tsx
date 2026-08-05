'use client'

import { Suspense, Component, ReactNode, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF, Center, Bounds } from '@react-three/drei'
import styles from '@/styles/components/ThreeModelViewer.module.css'

class ViewerErrorBoundary extends Component<
  { children: ReactNode; onError?: (err: Error) => void },
  { hasError: boolean; errorMsg: string }
> {
  constructor(props: { children: ReactNode; onError?: (err: Error) => void }) {
    super(props)
    this.state = { hasError: false, errorMsg: '' }
  }
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, errorMsg: error?.message || '3D load failed' }
  }
  componentDidCatch(error: Error) {
    console.error('3D Viewer Error:', error)
    this.props.onError?.(error)
  }
  reset = () => this.setState({ hasError: false, errorMsg: '' })
  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            width: '100%',
            height: '100%',
            background: 'radial-gradient(ellipse at center, #1a1a1a 0%, #0d0d0d 100%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
            padding: 24,
            textAlign: 'center',
          }}
        >
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#FF3333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
          <span style={{ color: '#fff', fontSize: 15, fontWeight: 700 }}>3D View Unavailable</span>
          <span style={{ color: '#888', fontSize: 12.5, maxWidth: 320, lineHeight: 1.5 }}>
            {this.state.errorMsg
              ? this.state.errorMsg.length > 90
                ? this.state.errorMsg.slice(0, 90) + '…'
                : this.state.errorMsg
              : 'Please check your connection or try another browser.'}
          </span>
          <button
            onClick={this.reset}
            style={{
              marginTop: 6,
              padding: '8px 18px',
              background: '#FF3333',
              color: '#fff',
              border: 'none',
              borderRadius: 6,
              fontSize: 12.5,
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Retry
          </button>
        </div>
      )
    }
    return this.props.children
  }
}

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url)
  return (
    <Center>
      <primitive object={scene} />
    </Center>
  )
}

function Fallback() {
  return (
    <div className={styles.loadingWrapper}>
      <div className={styles.spinner} />
      <span className={styles.loadingText}>Loading 3D Model</span>
    </div>
  )
}

function ViewerInner({ url }: { url: string }) {
  return (
    <Canvas
      className={styles.canvas}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 1.5, 6], fov: 40 }}
      frameloop="always"
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 8, 5]} intensity={1.3} />
      <directionalLight position={[-5, 2, -5]} intensity={0.5} color="#aac4ff" />
      <pointLight position={[-6, 4, 3]} intensity={0.6} color="#ffd0a8" />
      <pointLight position={[6, 3, -4]} intensity={0.5} color="#99bbff" />

      <Suspense fallback={null}>
        <Bounds fit clip observe margin={1.2}>
          <Model url={url} />
        </Bounds>
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
  )
}

export default function ThreeModelViewer({ url }: { url: string }) {
  const [errorBoundaryKey, setErrorBoundaryKey] = useState(0)

  const handleOuterError = () => setErrorBoundaryKey(k => k + 1)

  if (!url) {
    return <Fallback />
  }

  return (
    <div className={styles.container} key={errorBoundaryKey}>
      <ViewerErrorBoundary onError={handleOuterError}>
        <Suspense fallback={<Fallback />}>
          <ViewerInner url={url} />
        </Suspense>
      </ViewerErrorBoundary>
      <div className={styles.hint}>Drag to rotate · Scroll to zoom</div>
    </div>
  )
}
