import type { DetailedHTMLProps, HTMLAttributes } from 'react'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': DetailedHTMLProps<
        HTMLAttributes<HTMLElement> & {
          src?: string
          alt?: string
          poster?: string
          reveal?: string
          seamlessPoster?: boolean
          'seamless-poster'?: boolean
          exposure?: number | string
          'auto-rotate'?: boolean | ''
          autoRotate?: boolean | ''
          'auto-rotate-delay'?: number | string
          autoRotateDelay?: number | string
          'rotation-per-second'?: string
          rotationPerSecond?: string
          'camera-controls'?: boolean | ''
          cameraControls?: boolean | ''
          'touch-action'?: string
          touchAction?: string
          'disable-zoom'?: boolean | ''
          disableZoom?: boolean | ''
          'interaction-prompt'?: string
          interactionPrompt?: string
          'interaction-prompt-style'?: string
          interactionPromptStyle?: string
          'interaction-prompt-threshold'?: string | number
          interactionPromptThreshold?: string | number
          'shadow-intensity'?: string | number
          shadowIntensity?: string | number
          'shadow-softness'?: string | number
          shadowSoftness?: string | number
          'environment-image'?: string
          environmentImage?: string
          skyboxImage?: string
          'skybox-image'?: string
          'max-camera-orbit'?: string
          maxCameraOrbit?: string
          'min-camera-orbit'?: string
          minCameraOrbit?: string
          'min-field-of-view'?: string
          minFieldOfView?: string
          'max-field-of-view'?: string
          maxFieldOfView?: string
          'min-camera-distance'?: string
          minCameraDistance?: string
          'max-camera-distance'?: string
          maxCameraDistance?: string
          ar?: boolean | ''
          'ar-modes'?: string
          arModes?: string
          'ar-scale'?: string
          arScale?: string
          'ar-placement'?: string
          arPlacement?: string
          autoplay?: boolean | ''
          iosSrc?: string
          'ios-src'?: string
          bounds?: string
          'camera-target'?: string
          cameraTarget?: string
          'camera-orbit'?: string
          cameraOrbit?: string
          'field-of-view'?: string
          fieldOfView?: string
          interpolationDecay?: string | number
          'interpolation-decay'?: string | number
          loading?: 'auto' | 'lazy' | 'eager'
          'orientation'?: string
          orientation?: string
          'scale'?: string
          scale?: string
          'animation-name'?: string
          animationName?: string
          'animation-crossfade-duration'?: string | number
          animationCrossfadeDuration?: string | number
        },
        HTMLElement
      >
    }
  }
}

export {}
