'use client'

import Link from 'next/link'
import { useEffect } from 'react'

export default function ProductError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Product route error boundary caught:', error)
  }, [error])

  const is3DRelated =
    error?.message?.toLowerCase().includes('webgl') ||
    error?.message?.toLowerCase().includes('gltf') ||
    error?.message?.toLowerCase().includes('three') ||
    error?.message?.toLowerCase().includes('canvas') ||
    error?.message?.toLowerCase().includes('3d') ||
    error?.message?.toLowerCase().includes('model') ||
    error?.message?.toLowerCase().includes('glb')

  return (
    <div
      style={{
        minHeight: 'calc(100vh - 180px)',
        background: '#0a0a0a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px',
        fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
      }}
    >
      <div
        style={{
          maxWidth: 640,
          width: '100%',
          background: 'rgba(18,18,18,0.9)',
          border: '1px solid rgba(255,255,255,0.05)',
          borderRadius: 16,
          padding: '40px 32px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            fontSize: 12,
            color: '#FF3333',
            fontWeight: 600,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            marginBottom: 14,
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: '#FF3333',
              display: 'inline-block',
              boxShadow: '0 0 12px rgba(255,51,51,0.6)',
            }}
          />
          {is3DRelated ? '3D Viewer Issue' : 'Product Page Error'}
        </div>

        <h1
          style={{
            margin: 0,
            fontSize: 28,
            fontWeight: 800,
            color: '#fff',
            letterSpacing: '-0.03em',
            marginBottom: 10,
            lineHeight: 1.15,
          }}
        >
          {is3DRelated
            ? 'The 3D model couldn’t load right now'
            : 'We couldn’t load this product page'}
        </h1>

        <p
          style={{
            margin: 0,
            color: '#999',
            fontSize: 15,
            lineHeight: 1.6,
            marginBottom: 20,
          }}
        >
          {is3DRelated
            ? 'The interactive 3D view hit a snag. This is usually caused by a temporary network issue, WebGL browser limits, or the 3D file itself. The rest of the product info (photos, specs, quote) still works.'
            : 'This could be due to a recent update, cached data, or an issue loading content from our database. Refreshing usually fixes it.'}
        </p>

        {error?.message && (
          <div
            style={{
              background: 'rgba(0,0,0,0.4)',
              border: '1px solid rgba(255,51,51,0.15)',
              borderRadius: 8,
              padding: '10px 14px',
              marginBottom: 24,
              overflowX: 'auto',
            }}
          >
            <span
              style={{
                fontSize: 12,
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                color: '#c26b6b',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
              }}
            >
              {error.message.slice(0, 220)}
              {error.message.length > 220 ? '…' : ''}
            </span>
          </div>
        )}

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 10,
            marginBottom: 24,
          }}
        >
          <button
            onClick={() => {
              if (typeof window !== 'undefined') window.location.reload()
              else reset()
            }}
            style={{
              padding: '13px 22px',
              background: '#FF3333',
              color: '#fff',
              border: 'none',
              borderRadius: 10,
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 10px 24px rgba(255,51,51,0.2)',
            }}
          >
            ⟳ Reload Page
          </button>

          <Link
            href="/shop"
            style={{
              padding: '13px 22px',
              background: 'transparent',
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: 10,
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            Browse All Products
          </Link>

          <Link
            href="/contact"
            style={{
              padding: '13px 22px',
              background: 'transparent',
              color: '#aaa',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 10,
              fontSize: 14,
              fontWeight: 500,
              cursor: 'pointer',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            Contact Support
          </Link>
        </div>

        {is3DRelated && (
          <div
            style={{
              padding: '14px 16px',
              background: 'rgba(255, 176, 59, 0.06)',
              border: '1px solid rgba(255, 176, 59, 0.15)',
              borderRadius: 10,
              display: 'flex',
              gap: 12,
              alignItems: 'flex-start',
            }}
          >
            <span style={{ fontSize: 18 }}>ℹ️</span>
            <div>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: '#ffb03b',
                  marginBottom: 2,
                }}
              >
                Quick Fixes to try
              </div>
              <div style={{ fontSize: 12.5, color: '#c0a67a', lineHeight: 1.55 }}>
                1. <strong>Reload</strong> the page (button above).<br />
                2. Try a different browser (Chrome/Edge work best for WebGL).<br />
                3. Disable hardware-accelerated VPNs temporarily.<br />
                4. If using Safari, ensure WebGL is enabled in Settings.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
