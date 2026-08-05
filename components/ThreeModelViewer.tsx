import React, { useCallback, useEffect, useRef, useState, Component, ReactNode } from 'react'
import styles from '../styles/components/ThreeModelViewer.module.css'

const MODEL_VIEWER_SCRIPT_ID = 'mv-script-cb3b82'
const MODEL_VIEWER_SRC =
  'https://cdn.jsdelivr.net/npm/@google/model-viewer@3.5.0/dist/model-viewer.min.js'
const PROXY_ENDPOINT = '/api/proxy-model'
const LOAD_TIMEOUT_MS = 40000

type LoadState =
  | { stage: 'idle' }
  | { stage: 'script-loading' }
  | { stage: 'ready' }
  | { stage: 'loaded' }
  | { stage: 'error'; error: string; usingProxy: boolean }

function getProxyUrl(src: string) {
  const sep = PROXY_ENDPOINT.includes('?') ? '&' : '?'
  return `${PROXY_ENDPOINT}${sep}src=${encodeURIComponent(src)}`
}

function Fallback() {
  return (
    <div className={styles.fallback}>
      <div className={styles.fallbackBox}>
        <div className={styles.fallbackIcon}>📦</div>
        <div className={styles.fallbackTitle}>3D model not available</div>
        <div className={styles.fallbackText}>
          Check the product images or contact us for high-resolution visuals.
        </div>
      </div>
    </div>
  )
}

function ErrorBox({
  error,
  usingProxy,
  onRetryDirect,
  onTryProxy,
  onReset,
}: {
  error: string
  usingProxy: boolean
  onRetryDirect: () => void
  onTryProxy: () => void
  onReset: () => void
}) {
  return (
    <div className={styles.errorBox}>
      <div className={styles.errorIcon}>⚠️</div>
      <div className={styles.errorTitle}>3D View Unavailable</div>
      <div className={styles.errorText}>{error}</div>
      <div className={styles.errorActions}>
        <button
          type="button"
          className={styles.retryBtn}
          onClick={usingProxy ? onRetryDirect : onTryProxy}
        >
          🔄 {usingProxy ? 'Retry (Direct CDN)' : 'Retry via Secure Proxy'}
        </button>
        <button type="button" className={styles.retryBtnAlt} onClick={onReset}>
          Reset
        </button>
      </div>
      {usingProxy && (
        <div className={styles.errorHint}>
          💡 If proxy also fails, please re-upload the 3D file in Sanity as a single
          bundled <code>.glb</code> file with embedded textures.
        </div>
      )}
    </div>
  )
}

class ViewerErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean; error: Error | null }
> {
  state = { hasError: false, error: null as Error | null }
  static getDerivedStateFromError(err: Error) {
    return { hasError: true, error: err }
  }
  componentDidCatch(error: Error, info: any) {
    console.error('[MV] ErrorBoundary caught:', error, info)
  }
  reset = () => this.setState({ hasError: false, error: null })
  render() {
    if (this.state.hasError) {
      const msg =
        this.state.error?.message ||
        'Unexpected error while rendering the 3D view.'
      return (
        <div className={styles.container}>
          <ErrorBox
            error={msg}
            usingProxy={false}
            onRetryDirect={this.reset}
            onTryProxy={this.reset}
            onReset={this.reset}
          />
        </div>
      )
    }
    return this.props.children
  }
}

function ensureModelViewerScript(): Promise<void> {
  // Window-level promise dedup
  const w = globalThis as unknown as {
    __mvReady?: Promise<void>
  }
  if (w.__mvReady) return w.__mvReady
  if (customElements.get('model-viewer')) {
    w.__mvReady = Promise.resolve()
    return w.__mvReady
  }
  const existing = document.getElementById(MODEL_VIEWER_SCRIPT_ID) as
    | HTMLScriptElement
    | null
  if (existing) {
    w.__mvReady = new Promise<void>((resolve, reject) => {
      existing.addEventListener('load', () => resolve())
      existing.addEventListener('error', () =>
        reject(new Error('model-viewer script failed to load'))
      )
    })
    return w.__mvReady
  }
  const s = document.createElement('script')
  s.id = MODEL_VIEWER_SCRIPT_ID
  s.type = 'module'
  s.src = MODEL_VIEWER_SRC
  s.async = true
  s.crossOrigin = 'anonymous'
  document.head.appendChild(s)
  w.__mvReady = new Promise<void>((resolve, reject) => {
    s.addEventListener('load', () => resolve())
    s.addEventListener('error', () =>
      reject(new Error('Could not load 3D viewer library. Please try again.'))
    )
  })
  return w.__mvReady
}

export default function ThreeModelViewer({ url }: { url: string }) {
  const [loadState, setLoadState] = useState<LoadState>({ stage: 'idle' })
  const [useProxy, setUseProxy] = useState(true)
  const mvRef = useRef<HTMLElement | null>(null)
  const watchdogTimer = useRef<number | null>(null)
  const listenersAttached = useRef(false)
  const currentSrcRef = useRef<string>('')
  const errorFiredOnceForSrc = useRef(false)

  const clearWatchdog = useCallback(() => {
    if (watchdogTimer.current !== null) {
      clearTimeout(watchdogTimer.current)
      watchdogTimer.current = null
    }
  }, [])

  const armWatchdog = useCallback(() => {
    clearWatchdog()
    errorFiredOnceForSrc.current = false
    watchdogTimer.current = window.setTimeout(() => {
      console.warn('[MV] Watchdog fired — model did not load within timeout')
      setLoadState((prev) => {
        if (prev.stage === 'loaded' || prev.stage === 'error') return prev
        return {
          stage: 'error',
          error:
            '3D model is taking too long to load. The file may be too large or the network is slow. Try again.',
          usingProxy: useProxy,
        }
      })
    }, LOAD_TIMEOUT_MS)
  }, [clearWatchdog, useProxy])

  // Ensure script loads and ready
  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        setLoadState({ stage: 'script-loading' })
        await ensureModelViewerScript()
        if (cancelled) return
        setLoadState({ stage: 'ready' })
      } catch (err: any) {
        if (cancelled) return
        setLoadState({
          stage: 'error',
          error: err?.message || 'Failed to load 3D viewer library.',
          usingProxy: useProxy,
        })
      }
    })()
    return () => {
      cancelled = true
    }
  }, [url, useProxy])

  // Mount element refs + attach native DOM listeners (not React props)
  useEffect(() => {
    if (loadState.stage !== 'ready') return
    const el = mvRef.current
    if (!el) return
    if (listenersAttached.current) return

    listenersAttached.current = true

    const onProgress = (e: Event) => {
      const detail = (e as CustomEvent).detail || {
        totalTime: 0,
        loaded: 0,
        total: 0,
      }
      if (detail.total && detail.loaded && detail.total > 0) {
        const pct = Math.min(99, Math.round((detail.loaded / detail.total) * 100))
        setLoadState((prev) =>
          prev.stage === 'ready' ? { stage: 'ready' } : prev
        )
      }
    }

    const onLoad = () => {
      clearWatchdog()
      errorFiredOnceForSrc.current = false
      setLoadState({ stage: 'loaded' })
    }

    const onError = (e: Event) => {
      clearWatchdog()
      // Avoid double-fire: model-viewer sometimes dispatches multiple error events
      const thisSrc = currentSrcRef.current
      if (errorFiredOnceForSrc.current) return
      errorFiredOnceForSrc.current = true

      const detail = (e as CustomEvent)?.detail
      console.warn('[MV] error event:', detail)
      const raw = String(detail?.type || detail?.statusText || detail?.message || '')

      let msg: string
      const failedDirectFirst = raw.includes('fetch') || raw.includes('network')

      if (failedDirectFirst) {
        msg =
          'Could not download the 3D file. Try switching between Direct and Proxy mode.'
      } else if (
        raw.includes('format') ||
        raw.includes('parser') ||
        raw.includes('decode') ||
        raw.includes('invalid')
      ) {
        msg =
          'The 3D file could not be read. Please re-upload as a single .glb with embedded textures.'
      } else if (raw.includes('webgl')) {
        msg =
          'WebGL is unavailable in your browser. Please use Chrome, Edge or Safari desktop.'
      } else {
        msg = '3D model failed to load. Please try again or contact support.'
      }

      setLoadState({
        stage: 'error',
        error: msg,
        usingProxy: useProxy,
      })
    }

    el.addEventListener('progress', onProgress as EventListener)
    el.addEventListener('load', onLoad as EventListener)
    el.addEventListener('error', onError as EventListener)

    // Kick off watchdog when listeners are ready
    armWatchdog()

    return () => {
      listenersAttached.current = false
      el.removeEventListener('progress', onProgress as EventListener)
      el.removeEventListener('load', onLoad as EventListener)
      el.removeEventListener('error', onError as EventListener)
      clearWatchdog()
    }
  }, [loadState.stage, clearWatchdog, armWatchdog, useProxy])

  // When URL or proxy mode changes -> update src ref + re-arm watchdog
  useEffect(() => {
    if (loadState.stage !== 'ready') return
    const el = mvRef.current
    if (!el) return
    const effectiveSrc = useProxy ? getProxyUrl(url) : url
    currentSrcRef.current = effectiveSrc
    errorFiredOnceForSrc.current = false

    // Force model-viewer to re-evaluate src even if equal via attribute set
    el.setAttribute('src', effectiveSrc)
    // Some versions of model-viewer need an explicit reset when switching src dynamically
    try {
      ;(el as any).dismissPoster?.()
    } catch {
      /* ignore */
    }

    armWatchdog()
  }, [url, useProxy, loadState.stage, armWatchdog])

  if (!url) return <Fallback />

  const showError = loadState.stage === 'error'
  const isScriptLoading = loadState.stage === 'idle' || loadState.stage === 'script-loading'
  const isModelLoading = loadState.stage === 'ready'

  const effectiveSrc = useProxy ? getProxyUrl(url) : url

  const resetAll = useCallback(() => {
    clearWatchdog()
    setUseProxy(true)
    setLoadState({ stage: 'idle' })
    errorFiredOnceForSrc.current = false
  }, [clearWatchdog])

  const retryDirect = useCallback(() => {
    clearWatchdog()
    setUseProxy(false)
    setLoadState({ stage: 'idle' })
    errorFiredOnceForSrc.current = false
  }, [clearWatchdog])

  const tryProxy = useCallback(() => {
    clearWatchdog()
    setUseProxy(true)
    setLoadState({ stage: 'idle' })
    errorFiredOnceForSrc.current = false
  }, [clearWatchdog])

  return (
    <ViewerErrorBoundary key={`${useProxy ? 'p' : 'd'}-${url}`}>
      <div className={styles.container}>
        {(isScriptLoading || isModelLoading) && !showError && (
          <div className={styles.loadingOverlay} aria-live="polite">
            <div className={styles.spinner} role="status" />
            <div className={styles.loadingText}>
              {isScriptLoading
                ? 'Preparing 3D Viewer…'
                : 'Loading 3D Model…'}
            </div>
            <div className={styles.loadingHint}>
              Drag to rotate · Scroll to zoom
            </div>
            <div className={styles.loadingSub}>
              Mode: {useProxy ? 'Secure Proxy (Recommended)' : 'Direct CDN'}
            </div>
          </div>
        )}

        {showError && (
          <ErrorBox
            error={(loadState as Extract<LoadState, { stage: 'error' }>).error}
            usingProxy={
              (loadState as Extract<LoadState, { stage: 'error' }>).usingProxy
            }
            onRetryDirect={retryDirect}
            onTryProxy={tryProxy}
            onReset={resetAll}
          />
        )}

        {loadState.stage === 'loaded' && (
          <div className={styles.hintBar}>
            <span className={styles.hintDot} />
            <span className={styles.hintText}>
              Drag to rotate · Scroll to zoom · Right-click to pan
            </span>
            <span className={styles.hintBadge}>
              {useProxy ? 'Secure Proxy' : 'Direct CDN'}
            </span>
          </div>
        )}

        {/*
          CRITICAL: We DO NOT use React onError / onLoad props here.
          Web Components (custom elements) do not reliably fire through React's
          synthetic event system. Instead we attach via addEventListener in useEffect
          above using `mvRef`.
        */}
        {/* eslint-disable @next/next/no-img-element, react/no-unknown-property */}
        {React.createElement('model-viewer' as any, {
          ref: mvRef,
          src: effectiveSrc,
          alt: '3D product model',
          'auto-rotate': true,
          'auto-rotate-delay': 600,
          'rotation-per-second': '30deg',
          'camera-controls': true,
          'touch-action': 'pan-y',
          'disable-zoom': false,
          'interaction-prompt': 'none',
          'shadow-intensity': '0.9',
          'shadow-softness': '0.6',
          exposure: '1.0',
          'environment-image': 'neutral',
          'max-camera-orbit': 'auto 90deg auto',
          'min-camera-orbit': 'auto -90deg auto',
          'min-camera-distance': '1m',
          'max-camera-distance': '40m',
          ar: false,
          class: styles.modelViewer,
          style: { display: 'block', width: '100%', height: '100%' },
        })}
      </div>
    </ViewerErrorBoundary>
  )
}
