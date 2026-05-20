import { useEffect, useRef } from 'react'

export function useVideoAutoplay() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const attempt = async () => {
      try {
        await video.play()
      } catch {
        // Autoplay blocked — poster image is the fallback
      }
    }
    attempt()
  }, [])

  return videoRef
}
