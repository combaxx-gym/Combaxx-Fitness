'use client'

import Link from 'next/link'
import { useEffect } from 'react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Global app error boundary caught:', error)
  }, [error])

  const is3DRelated =
    error?.message?.toLowerCase().includes('webgl') ||
    error?.message?.toLowerCase().includes('gltf') ||
    error?.message?.toLowerCase().includes('three') ||
    error?.message?.toLowerCase().includes('canvas') ||
    error?.message?.toLowerCase().includes('3d') ||
    error?.message?.toLowerCase().includes('model')

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'radial-gradient(ellipse at top, #1a1a1a 0%, #0a0a0a 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 24px',
        fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
      }}
    >
      <div
        style={{
          maxWidth: 520,
          width: '100%',
          textAlign: 'center',
          background: 'rgba(20,20,20,0.8)',
          backdropFilter: 'blur(20px)',
          borderRadius: 20,
          border: '1px solid rgba(255,255,255,0.06)',
          padding: '48px 36px',
          boxShadow: '0 30px 80px rgba(0,0,0,0.6)',
        }}
      >
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: '50%',
            background: is3DRelated
              ? 'linear-gradient(135deg, rgba(255,51,51,0.2), rgba(255,51,51,0.05))'
              : 'linear-gradient(135deg, rgba(255,51,51,0.2), rgba(255,51,51,0.05))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px',
            border: '1px solid rgba(255,51,51,0.2)',
          }}
        >
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#FF3333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        </div>

        <h1
          style={{
            margin: 0,
            fontSize: 26,
            fontWeight: 700,
            color: '#fff',
            letterSpacing: '-0.02em',
            marginBottom: 8,
          }}
        >
          {is3DRelated ? '3D View Temporarily Unavailable' : 'Something went wrong'}
        </h1>

        <p
          style={{
            margin: 0,
            color: '#999',
            fontSize: 14.5,
            lineHeight: 1.65,
            marginBottom: 12,
          }}
        >
          {is3DRelated
            ? 'We encountered a problem loading the interactive 3D model. This can happen due to browser WebGL support, network issues, or the 3D file format.'
            : 'We ran into an unexpected issue while loading this page. The error has been logged and our team has been notified.'}
        </p>

        {error?.message && (
          <div
            style={{
              background: 'rgba(255,51,51,0.06)',
              border: '1px solid rgba(255,51,51,0.12)',
              borderRadius: 10,
              padding: '10px 14px',
              marginTop: 4,
              marginBottom: 20,
              textAlign: 'left',
            }}
          >
            <span
              style={{
                fontSize: 12,
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                color: '#e57373',
                wordBreak: 'break-word',
                lineHeight: 1.5,
              }}
            >
              {error.message.length > 180
                ? error.message.slice(0, 180) + '…'
                : error.message}
            </span>
          </div>
        )}

        <div
          style={{
            display: 'flex',
            gap: 12,
            flexWrap: 'wrap',
            justifyContent: 'center',
            marginTop: 24,
          }}
        >
          <button
            onClick={() => {
              if (typeof window !== 'undefined') {
                window.location.reload()
              } else {
                reset()
              }
            }}
            style={{
              padding: '12px 24px',
              background: '#FF3333',
              color: '#fff',
              border: 'none',
              borderRadius: 10,
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
              minWidth: 140,
              boxShadow: '0 8px 20px rgba(255,51,51,0.25)',
              transition: 'transform 0.15s ease',
            }}
            onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.97)')}
            onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            Reload Page
          </button>

          <Link
            href="/shop"
            style={{
              padding: '12px 24px',
              background: 'rgba(255,255,255,0.06)',
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 10,
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
              textDecoration: 'none',
              minWidth: 140,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            Back to Shop
          </Link>
        </div>

        <div
          style={{
            marginTop: 28,
            paddingTop: 20,
            borderTop: '1px solid rgba(255,255,255,0.06)',
            fontSize: 12.5,
            color: '#555',
          }}
        >
          {is3DRelated ? (
            <span>
              💡 Tip: You can still browse product photos, specs, and request a quote in the meantime.
            </span>
          ) : (
            <span>
              If this keeps happening, please{' '}
              <Link
                href="/contact"
                style={{ color: '#FF3333', textDecoration: 'none' }}
              >
                contact support
              </Link>
              .
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
