'use client'

import React, { useCallback, useEffect, useRef, useState, Component, ReactNode } from 'react'
import styles from '@/styles/components/ThreeModelViewer.module.css'

type LoadState =
  | { stage: 'idle' }
  | { stage: 'script-loading' }
  | { stage: 'ready' }
  | { stage: 'loaded' }
  | { stage: 'error'; error: string; usingProxy: boolean }

class ViewerErrorBoundary extends Component<
  { children: ReactNode; fallback: (retry: () => void, msg?: string) => ReactNode },
  { hasError: boolean; errorMsg: string }
> {
  constructor(props: any) {
    super(props)
    this.state = { hasError: false, errorMsg: '' }
  }
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, errorMsg: error?.message || '' }
  }
  componentDidCatch(err: Error) {
    console.error('[MV] ViewerErrorBoundary caught:', err)
  }
  reset = () => this.setState({ hasError: false, errorMsg: '' })
  render() {
    if (this.state.hasError) {
      return this.props.fallback(this.reset, this.state.errorMsg) as any
    }
    return this.props.children
  }
}

const MODEL_VIEWER_CDN =
  'https://cdn.jsdelivr.net/npm/@google/model-viewer@3.5.0/dist/model-viewer.min.js'

function getProxyUrl(src: string) {
  const u = new URL('/api/proxy-model', typeof window === 'undefined' ? 'http://localhost' : window.location.origin)
  u.searchParams.set('src', src)
  return u.toString()
}

function Fallback() {
  return (
    <div className={styles.loadingWrapper}>
      <div className={styles.spinner} />
      <span className={styles.loadingText}>Loading 3D Model</span>
    </div>
  )
}

function ErrorBox({
  msg,
  retry,
  title = '3D View Unavailable',
}: {
  msg?: string
  retry: () => void
  title?: string
}) {
  return (
    <div className={styles.errorBox}>
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#FF3333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
      <span className={styles.errorTitle}>{title}</span>
      {msg && (
        <span className={styles.errorMsg}>
          {msg.length > 110 ? msg.slice(0, 110) + '…' : msg}
        </span>
      )}
      <button onClick={retry} className={styles.retryBtn}>Retry</button>
    </div>
  )
}

export default function ThreeModelViewer({ url }: { url: string }) {
  const [loadState, setLoadState] = useState<LoadState>({ stage: 'idle' })
  const [useProxy, setUseProxy] = useState(false)
  const mountRef = useRef<HTMLDivElement>(null)
  const mvReadyPromise = useRef<Promise<any> | null>(null)

  useEffect(() => {
    let cancelled = false
    if (!url) return

    const loadScript = async () => {
      if (typeof window === 'undefined') return

      if (window.customElements && window.customElements.get('model-viewer')) {
        if (!cancelled) setLoadState(s => s.stage === 'script-loading' ? { stage: 'ready' } : s)
        return
      }

      const existing = document.querySelector<HTMLScriptElement>(
        `script[data-model-viewer-src]`
      )

      if (existing) {
        existing.addEventListener(
          'load',
          () => {
            if (!cancelled) setLoadState({ stage: 'ready' })
          },
          { once: true }
        )
        existing.addEventListener(
          'error',
          () => {
            if (!cancelled) {
              setLoadState({
                stage: 'error',
                error: 'Could not load 3D viewer engine.',
                usingProxy: useProxy,
              })
            }
          },
          { once: true }
        )
        setLoadState({ stage: 'script-loading' })
        return
      }

      if (!mvReadyPromise.current) {
        mvReadyPromise.current = new Promise((resolve, reject) => {
          const s = document.createElement('script')
          s.type = 'module'
          s.src = MODEL_VIEWER_CDN
          s.dataset.modelViewerSrc = MODEL_VIEWER_CDN
          s.onerror = () => reject(new Error('model-viewer script failed'))
          s.onload = () => resolve(true)
          document.head.appendChild(s)
        })
      }

      setLoadState({ stage: 'script-loading' })
      try {
        await mvReadyPromise.current
        if (!cancelled) setLoadState({ stage: 'ready' })
      } catch (e: any) {
        if (!cancelled) {
          setLoadState({
            stage: 'error',
            error: e?.message || 'Failed to load 3D viewer engine.',
            usingProxy: useProxy,
          })
        }
      }
    }

    loadScript()

    return () => {
      cancelled = true
    }
  }, [url, useProxy])

  if (!url) return <Fallback />

  const showError = loadState.stage === 'error'
  const isScriptLoading = loadState.stage === 'idle' || loadState.stage === 'script-loading'
  const isModelLoading = loadState.stage === 'ready'

  const effectiveSrc = useProxy ? getProxyUrl(url) : url

  const handleLoad = useCallback(() => setLoadState({ stage: 'loaded' }), [])

  const handleError = useCallback((event: any) => {
    console.warn('[MV] load error', event)
    const detail = (event?.detail?.type as string) || ''
    let msg: string

    if (detail.includes('fetch')) {
      msg =
        'Could not download the 3D file. Click Retry to route through our secure server.'
      if (!useProxy) {
        console.info('[MV] Auto-falling back to same-origin proxy')
        setUseProxy(true)
        setLoadState({ stage: 'ready' })
        return
      }
    } else if (detail.includes('format') || detail.includes('parser')) {
      msg =
        'The 3D file format could not be read. Please re-upload as a single .glb file.'
    } else if (detail.includes('webgl')) {
      msg =
        'WebGL is not available or disabled in your browser. Please try Chrome/Safari desktop.'
    } else {
      msg = '3D model failed to load. Please try again or contact support.'
    }

    setLoadState({
      stage: 'error',
      error: msg,
      usingProxy: useProxy,
    })
  }, [useProxy])

  const resetAll = useCallback(() => {
    setUseProxy(false)
    setLoadState({ stage: 'idle' })
  }, [])

  const retryDirect = useCallback(() => {
    setUseProxy(false)
    setLoadState({ stage: 'idle' })
  }, [])

  const tryProxy = useCallback(() => {
    setUseProxy(true)
    setLoadState({ stage: 'idle' })
  }, [])

  return (
    <ViewerErrorBoundary
      key={`boundary-${useProxy ? 'proxy' : 'direct'}`}
      fallback={(retry, bMsg) => (
        <div className={styles.container}>
          <ErrorBox
            msg={bMsg || '3D viewer crashed unexpectedly.'}
            retry={() => {
              retry()
              resetAll()
            }}
          />
        </div>
      )}
    >
      <div className={styles.container} ref={mountRef}>
        {isScriptLoading && <Fallback />}

        {(loadState.stage === 'ready' || loadState.stage === 'loaded' || showError) && (
          <>
            {React.createElement(
              'model-viewer' as any,
              {
                key: `mv-${useProxy ? 'proxy' : 'direct'}`,
                class: styles.modelViewer,
                src: effectiveSrc,
                alt: '3D product model',
                'camera-controls': true,
                'auto-rotate': true,
                'auto-rotate-delay': 300,
                'rotation-per-second': '30deg',
                'disable-zoom': false,
                'min-camera-orbit': 'auto auto 1m',
                'max-camera-orbit': 'auto auto 40m',
                'shadow-intensity': '0.9',
                'shadow-softness': '1',
                exposure: '1',
                'environment-image': 'neutral',
                'interaction-prompt': 'none',
                'interaction-prompt-style': 'basic',
                loading: 'eager',
                crossorigin: '',
                onLoad: handleLoad,
                onError: handleError,
                style: isModelLoading
                  ? {
                      width: '100%',
                      height: '100%',
                      opacity: 0.0001,
                      position: 'absolute',
                      inset: 0,
                    }
                  : { width: '100%', height: '100%' },
              } as any
            )}
            {isModelLoading && !showError && <Fallback />}
          </>
        )}

        {showError && (
          <ErrorBox
            msg={(loadState as any).error}
            retry={useProxy ? retryDirect : tryProxy}
          />
        )}

        <div className={styles.hint}>Drag to rotate · Scroll to zoom</div>
      </div>
    </ViewerErrorBoundary>
  )
}
