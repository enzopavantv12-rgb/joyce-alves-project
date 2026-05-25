import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export const JoyceVisualCard = () => {
  const [showVideo, setShowVideo] = useState(false);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // IntersectionObserver to lazy load video
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoadVideo(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  // Visual cycling: image (5s) -> video (8s) -> repeat
  useEffect(() => {
    if (!shouldLoadVideo) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const cycleVisuals = () => {
      // Show image
      setShowVideo(false);
      
      const toVideoTimeout = setTimeout(() => {
        setShowVideo(true);
        
        // Restart and play video
        if (videoRef.current) {
          videoRef.current.currentTime = 0;
          const playPromise = videoRef.current.play();
          if (playPromise !== undefined) {
            playPromise.catch((error) => {
              console.log('Video autoplay prevented:', error);
            });
          }
        }
      }, 5000);
      
      // Go back to image after video duration (8s)
      const toImageTimeout = setTimeout(() => {
        setShowVideo(false);
      }, 5000 + 8000);
      
      return () => {
        clearTimeout(toVideoTimeout);
        clearTimeout(toImageTimeout);
      };
    };

    const cleanup = cycleVisuals();
    
    // Repeat cycle every 13 seconds (5s image + 8s video)
    const interval = setInterval(cycleVisuals, 13000);

    return () => {
      cleanup();
      clearInterval(interval);
    };
  }, [shouldLoadVideo]);

  return (
    <div 
      ref={containerRef}
      role="img" 
      aria-label="Joyce Alves, esteticista integrativa"
      className="
        relative 
        aspect-[4/5]
        w-full max-w-[480px]
        rounded-[20px]
        overflow-hidden
        shadow-[0_30px_80px_-20px_rgba(0,0,0,0.4),
                0_12px_32px_-8px_rgba(58,37,25,0.3)]
      "
    >
      {/* Camada 1 — Imagem (sempre presente) */}
      <motion.img
        src="/placeholders/joyce-portrait-still.jpg"
        alt="Joyce Alves"
        className="
          absolute inset-0 w-full h-full 
          object-cover
        "
        initial={{ opacity: 1 }}
        animate={{ opacity: showVideo ? 0 : 1 }}
        transition={{ 
          duration: 1.2, 
          ease: [0.22, 1, 0.36, 1] 
        }}
        loading="eager"
        draggable={false}
      />
      
      {/* Camada 2 — Vídeo (sobreposto, fade in/out) */}
      <motion.video
        ref={videoRef}
        src={shouldLoadVideo ? "/placeholders/joyce-portrait-motion.mp4" : undefined}
        preload={shouldLoadVideo ? "auto" : "none"}
        className="
          absolute inset-0 w-full h-full 
          object-cover
        "
        muted
        playsInline
        loop={false}
        initial={{ opacity: 0 }}
        animate={{ opacity: showVideo ? 1 : 0 }}
        transition={{ 
          duration: 1.2, 
          ease: [0.22, 1, 0.36, 1] 
        }}
        aria-hidden="true"
      />
      
      {/* Camada 3 — Vinheta sutil nas bordas para integração */}
      <div 
        className="
          absolute inset-0 pointer-events-none
          rounded-[20px]
        "
        style={{
          boxShadow: 'inset 0 0 80px rgba(58, 37, 25, 0.25)',
        }}
      />
      
      {/* Camada 4 — Borda interna dourada finíssima */}
      <div 
        className="
          absolute inset-0 pointer-events-none
          rounded-[20px]
          border border-gold-400/15
        "
      />
    </div>
  );
};
