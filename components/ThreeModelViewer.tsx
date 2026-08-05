'use client'

import { Suspense, Component, ReactNode, useState, useCallback } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF, Center, Bounds, useProgress } from '@react-three/drei'
import styles from '@/styles/components/ThreeModelViewer.module.css'

class ErrorBoundary extends Component<
  { children: ReactNode; fallback: (error: string) => ReactNode },
  { hasError: boolean; errorMsg: string }
> {
  constructor(props: { children: ReactNode; fallback: (error: string) => ReactNode }) {
    super(props)
    this.state = { hasError: false, errorMsg: '' }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, errorMsg: error?.message || 'Unknown error' }
  }

  componentDidCatch(error: Error) {
    console.error('3D Viewer Error Boundary caught:', error)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback(this.state.errorMsg)
    }
    return this.props.children
  }
}

function LoaderProgress() {
  const { progress, loaded, total } = useProgress()
  return (
    <div className={styles.loadingWrapper}>
      <div className={styles.spinner} />
      <span className={styles.loadingText}>
        Loading 3D Model{total > 0 ? ` ${Math.round(progress)}%` : ''}
      </span>
      {loaded > 0 && total > 0 && (
        <span style={{ fontSize: 11, color: '#666', marginTop: 4 }}>
          {(loaded / 1024 / 1024).toFixed(1)} MB / {(total / 1024 / 1024).toFixed(1)} MB
        </span>
      )}
    </div>
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

function ErrorFallback({ message, onRetry }: { message?: string; onRetry?: () => void }) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: 'linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        textAlign: 'center',
        gap: 12,
      }}
    >
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: '50%',
          background: 'rgba(255, 51, 51, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FF3333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <span style={{ color: '#fff', fontSize: 16, fontWeight: 600 }}>3D Model Unavailable</span>
        <span style={{ color: '#999', fontSize: 13, maxWidth: 360, lineHeight: 1.5 }}>
          {message
            ? `Could not load the 3D model (${message.length > 80 ? message.slice(0, 80) + '...' : message}).`
            : 'There was a problem loading the interactive 3D view.'}
          <br />Please check your connection or try again later.
        </span>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          style={{
            marginTop: 8,
            padding: '10px 22px',
            background: '#FF3333',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            fontSize: 13,
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Retry
        </button>
      )}
    </div>
  )
}

function ModelNode({ url }: { url: string }) {
  const { scene } = useGLTF(url)
  return (
    <Center>
      <primitive object={scene} />
    </Center>
  )
}

function SafeBounds({ url }: { url: string }) {
  return (
    <ErrorBoundary
      fallback={() => {
        console.warn('Bounds failed, rendering plain model')
        return <ModelNode url={url} />
      }}
    >
      <Bounds fit clip observe margin={1.25}>
        <ModelNode url={url} />
      </Bounds>
    </ErrorBoundary>
  )
}

function SceneContent({ url }: { url: string }) {
  return (
    <ErrorBoundary
      fallback={(err) => {
        console.error('Scene content error:', err)
        return null
      }}
    >
      <Suspense fallback={<LoaderProgress />}>
        <SafeBounds url={url} />
      </Suspense>
    </ErrorBoundary>
  )
}

function ViewerCanvas({ url }: { url: string }) {
  return (
    <Canvas
      className={styles.canvas}
      gl={{ antialias: true, alpha: true, failIfMajorPerformanceCaveat: false }}
      camera={{ position: [0, 1.5, 6], fov: 40 }}
      dpr={[1, 2]}
      onCreated={({ gl }) => {
        gl.setClearAlpha(0)
      }}
    >
      <color attach="background" args={['#111111']} />
      <fog attach="fog" args={['#111111', 10, 50]} />

      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 8, 5]} intensity={1.4} castShadow />
      <directionalLight position={[-5, -3, -5]} intensity={0.4} />
      <directionalLight position={[0, 5, -8]} intensity={0.6} color="#88aaff" />
      <pointLight position={[-8, 4, -4]} intensity={0.4} color="#ffddaa" />
      <pointLight position={[8, 4, 4]} intensity={0.3} color="#aaccff" />

      <SceneContent url={url} />

      <OrbitControls
        makeDefault
        autoRotate
        autoRotateSpeed={1.2}
        enableZoom
        enablePan={false}
        minDistance={1}
        maxDistance={20}
        enableDamping
        dampingFactor={0.08}
      />
    </Canvas>
  )
}

function detectWebGL(): boolean {
  if (typeof document === 'undefined') return false
  try {
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl')
    return !!gl
  } catch {
    return false
  }
}

export default function ThreeModelViewer({ url }: { url: string }) {
  const [retryKey, setRetryKey] = useState(0)
  const webGLAvailable = useState<boolean>(detectWebGL)[0]

  const handleRetry = useCallback(() => {
    setRetryKey(k => k + 1)
  }, [])

  if (!url) {
    return <ErrorFallback message="No 3D model URL provided." />
  }

  if (!webGLAvailable) {
    return (
      <ErrorFallback
        message="WebGL is not available or disabled in this browser."
        onRetry={handleRetry}
      />
    )
  }

  return (
    <div className={styles.container} key={retryKey}>
      <ErrorBoundary
        fallback={(errorMsg) => (
          <ErrorFallback message={errorMsg} onRetry={handleRetry} />
        )}
      >
        <Suspense fallback={<LoadingFallback />}>
          <ViewerCanvas url={url} />
        </Suspense>
      </ErrorBoundary>

      <div className={styles.hint}>Drag to rotate · Scroll to zoom</div>
    </div>
  )
}
