import { useRef, useEffect } from 'react'

interface Props {
  src: string
  srcWebm?: string
  poster?: string
  className?: string
  overlay?: boolean
}

export function VideoBackground({ src, srcWebm, poster, className = '', overlay = true }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.play().catch(() => {})
  }, [])

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <video
        ref={videoRef}
        className="video-fill"
        autoPlay
        muted
        loop
        playsInline
        poster={poster}
      >
        {srcWebm && <source src={srcWebm} type="video/webm" />}
        <source src={src} type="video/mp4" />
      </video>
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(10,14,26,0.3)] via-transparent to-[rgba(10,14,26,0.7)]" />
      )}
    </div>
  )
}
