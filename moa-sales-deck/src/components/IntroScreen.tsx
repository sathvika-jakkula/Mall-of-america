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
      <button
        onClick={handleEnter}
        className="intro-enter-btn relative z-10 cursor-pointer px-12 py-4 text-sm uppercase font-sans text-[#C9A84C] border border-[#C9A84C] overflow-hidden"
        style={{
          opacity: buttonVisible ? 1 : 0,
          transform: buttonVisible ? "translateY(0)" : "translateY(16px)",
          transition: "opacity 0.8s ease, transform 0.8s ease",
          letterSpacing: "0.25em",
        }}
      >
        <span className="relative z-10">Enter</span>
      </button>
    </div>
  );
}
