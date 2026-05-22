import { useState, useEffect, useRef } from "react";

interface Props {
  onEnter: () => void;
}

export function IntroScreen({ onEnter }: Props) {
  const [exiting, setExiting] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setButtonVisible(true), 800);
    return () => clearTimeout(timer);
  }, []);

  function handleEnter() {
    setExiting(true);
    setTimeout(onEnter, 900);
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{
        opacity: exiting ? 0 : 1,
        transition: "opacity 0.9s ease",
        pointerEvents: exiting ? "none" : "auto",
      }}
    >
      {/* Full-screen video */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source
          src="/videos/A World Built For Experiences (4).mp4"
          type="video/mp4"
        />
      </video>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[rgba(10,14,26,0.45)]" />

      {/* Enter button */}
      <div
        style={{
          opacity: buttonVisible ? 1 : 0,
          transform: buttonVisible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.8s ease, transform 0.8s ease',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
          position: 'relative',
          zIndex: 10,
        }}
      >
        {/* Label above button */}
        <p style={{
          fontFamily: '"Playfair Display", Georgia, serif',
          fontSize: '13px',
          color: 'rgba(248,246,242,0.6)',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
        }}>
          Mall of America
        </p>

        <button
          onClick={handleEnter}
          className="intro-enter-btn"
          style={{
            position: 'relative',
            overflow: 'hidden',
            cursor: 'pointer',
            padding: '18px 64px',
            fontSize: '13px',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 600,
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            color: '#C9A84C',
            background: 'rgba(10,14,26,0.55)',
            border: '1.5px solid #C9A84C',
            boxShadow: '0 0 24px rgba(201,168,76,0.35), inset 0 0 16px rgba(201,168,76,0.06)',
          }}
        >
          <span style={{ position: 'relative', zIndex: 1 }}>Enter</span>
        </button>

        {/* Scroll hint */}
        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '10px',
          color: 'rgba(248,246,242,0.35)',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          marginTop: '4px',
        }}>
          Click to explore
        </p>
      </div>
    </div>
  );
}
