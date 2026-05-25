import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { GalleryItem } from '../../lib/experienceGallery';

interface GalleryMediaProps {
  item: GalleryItem;
  className?: string;
  index?: number;
}

export const GalleryMedia = ({ 
  item, 
  className = '', 
  index = 0 
}: GalleryMediaProps) => {
  const [isInView, setIsInView] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Lazy load: só carrega quando próximo da viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Auto-play do vídeo quando entra na viewport & Pause ao sair
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (item.type === 'video' && videoRef.current) {
          if (entry.isIntersecting && !prefersReducedMotion) {
            videoRef.current.play().catch(() => {});
          } else {
            videoRef.current.pause();
          }
        }
      },
      { threshold: 0.25 }
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [item.type, prefersReducedMotion]);

  const originParam = typeof window !== 'undefined' ? `&origin=${encodeURIComponent(window.location.origin)}` : '';

  return (
    <motion.div
      ref={containerRef}
      className={`
        relative overflow-hidden 
        rounded-[16px]
        bg-cocoa-700
        group
        ${className}
      `}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 1.0,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{
        boxShadow: `
          0 20px 40px -12px rgba(0, 0, 0, 0.3),
          0 8px 16px -4px rgba(58, 37, 25, 0.2)
        `,
      }}
    >
      {/* IMAGEM */}
      {item.type === 'image' && (
        <>
          {isInView && (
            <img
              src={item.src}
              alt={item.alt}
              className={`
                w-full h-full object-cover
                transition-all duration-1000
                ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.02]'}
                group-hover:scale-[1.04]
              `}
              loading="lazy"
              onLoad={() => setIsLoaded(true)}
              draggable={false}
            />
          )}
        </>
      )}

      {/* VÍDEO */}
      {item.type === 'video' && (
        <>
          {/* Poster (fallback enquanto vídeo carrega) */}
          {item.poster && (
            <img
              src={item.poster}
              alt={item.alt}
              className={`
                absolute inset-0 w-full h-full object-cover
                transition-opacity duration-700
                ${isLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'}
              `}
              loading="lazy"
              draggable={false}
            />
          )}
          
          {item.youtubeId ? (
            isInView && (
              <iframe
                src={`https://www.youtube.com/embed/${item.youtubeId}?controls=1&modestbranding=1&rel=0&playsinline=1${originParam}`}
                title={item.alt}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className={`
                  absolute inset-0 w-full h-full object-cover
                  transition-all duration-1000
                  ${isLoaded ? 'opacity-100' : 'opacity-0'}
                `}
                style={{ border: 'none' }}
                onLoad={() => setIsLoaded(true)}
              />
            )
          ) : (
            isInView && (
              <video
                ref={videoRef}
                src={item.src}
                poster={item.poster}
                muted
                loop
                playsInline
                preload="metadata"
                className={`
                  w-full h-full object-cover
                  transition-all duration-1000
                  ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.02]'}
                  group-hover:scale-[1.04]
                `}
                onLoadedData={() => setIsLoaded(true)}
                aria-label={item.alt}
              />
            )
          )}
          
          {/* Indicador discreto de vídeo (canto inferior direito) */}
          <div className="
            absolute bottom-3 right-3 z-10
            w-8 h-8 rounded-full
            bg-cocoa-800/40 backdrop-blur-md
            border border-cream/20
            flex items-center justify-center
            opacity-60 group-hover:opacity-90
            transition-opacity duration-500
          ">
            <div className="w-1.5 h-1.5 rounded-full bg-gold-300 
                          animate-pulse" />
          </div>
        </>
      )}


      {/* Borda dourada finíssima */}
      <div 
        className="absolute inset-0 pointer-events-none rounded-[16px]
                   border border-gold-400/10 
                   group-hover:border-gold-400/25
                   transition-colors duration-700"
      />
    </motion.div>
  );
};
