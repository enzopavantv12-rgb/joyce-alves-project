import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause } from 'lucide-react';
import type { Testimonial } from '../../lib/testimonials';

interface TestimonialCardProps {
  testimonial: Testimonial;
  index?: number;
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
}

export const TestimonialCard = ({ 
  testimonial, 
  index = 0,
  isPlaying,
  onPlay,
  onPause
}: TestimonialCardProps) => {
  const originParam = typeof window !== 'undefined' ? `&origin=${encodeURIComponent(window.location.origin)}` : '';
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Escuta tecla Escape para fechar lightbox
  useEffect(() => {
    if (!isLightboxOpen) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsLightboxOpen(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isLightboxOpen]);

  // Sincroniza reprodução com o estado gerenciado pelo pai
  useEffect(() => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.play().catch(() => {});
    } else {
      videoRef.current.pause();
    }
  }, [isPlaying]);

  const handlePlayToggle = () => {
    if (isPlaying) {
      onPause();
    } else {
      onPlay();
    }
  };

  const handleVideoEnded = () => {
    onPause();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      handlePlayToggle();
    }
  };

  return (
    <motion.div
      onClick={testimonial.type === 'text' ? () => setIsLightboxOpen(true) : undefined}
      className={`
        relative
        rounded-[20px]
        overflow-hidden
        bg-cream
        border border-gold-400/15
        group
        h-full
        transition-all duration-300
        ${testimonial.type === 'text' ? 'cursor-pointer hover:shadow-gold-400/5' : ''}
      `}
      style={{
        boxShadow: `
          0 20px 50px -20px rgba(58, 37, 25, 0.3),
          0 8px 20px -8px rgba(58, 37, 25, 0.15)
        `,
      }}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 1.0,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {/* CARD DE VÍDEO */}
      {testimonial.type === 'video' && (
        <div className="relative aspect-[3/4] bg-cocoa-700 h-full w-full">
          {testimonial.youtubeId ? (
            <>
              {isPlaying ? (
                <iframe
                  src={`https://www.youtube.com/embed/${testimonial.youtubeId}?autoplay=1&modestbranding=1&rel=0&playsinline=1${originParam}`}
                  title={`Depoimento de ${testimonial.authorName}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <>
                  <img
                    src={testimonial.posterSrc || `https://img.youtube.com/vi/${testimonial.youtubeId}/hqdefault.jpg`}
                    alt={`Depoimento de ${testimonial.authorName}`}
                    className="absolute inset-0 w-full h-full object-cover"
                    draggable={false}
                    loading="lazy"
                  />
                  
                  {/* Overlay quando vídeo não está tocando */}
                  <div className="
                    absolute inset-0 
                    bg-gradient-to-b from-cocoa-800/20 via-transparent to-cocoa-800/70
                    transition-opacity duration-500
                    pointer-events-none
                  " />
                  
                  {/* Botão de Play central */}
                  <button
                    onClick={handlePlayToggle}
                    onKeyDown={handleKeyDown}
                    className="
                      absolute top-1/2 left-1/2
                      -translate-x-1/2 -translate-y-1/2
                      w-16 h-16 md:w-20 md:h-20
                      rounded-full
                      flex items-center justify-center
                      transition-all duration-500
                      group-hover:scale-110
                      focus:outline-none
                      focus-visible:ring-2 focus-visible:ring-gold-400
                      focus-visible:ring-offset-2
                    "
                    style={{
                      background: 'rgba(247, 243, 239, 0.20)',
                      backdropFilter: 'blur(20px) saturate(180%)',
                      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                      border: '1px solid rgba(247, 243, 239, 0.40)',
                      boxShadow: `
                        inset 0 1px 0 0 rgba(247, 243, 239, 0.3),
                        inset 0 -1px 0 0 rgba(58, 37, 25, 0.15),
                        0 8px 32px -4px rgba(0, 0, 0, 0.3)
                      `,
                    }}
                    aria-label={`Reproduzir depoimento de ${testimonial.authorName}`}
                  >
                    <Play className="w-6 h-6 text-cream fill-cream stroke-[1] ml-1" />
                  </button>
                  
                  {/* Info do autor — overlay inferior */}
                  <div className="
                    absolute bottom-0 left-0 right-0
                    p-5 md:p-6
                    pointer-events-none
                  ">
                    <div className="
                      inline-flex flex-col gap-1
                      p-3 rounded-lg
                    "
                    style={{
                      background: 'rgba(58, 37, 25, 0.35)',
                      backdropFilter: 'blur(16px) saturate(180%)',
                      WebkitBackdropFilter: 'blur(16px) saturate(180%)',
                      border: '1px solid rgba(247, 243, 239, 0.15)',
                    }}>
                      <span className="
                        text-cream text-sm font-medium
                        drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]
                      ">
                        {testimonial.authorName}
                      </span>
                      <span className="
                        text-cream/75 text-xs tracking-[0.15em] uppercase
                      ">
                        {testimonial.authorLocation}
                      </span>
                    </div>
                  </div>
                </>
              )}
            </>
          ) : (
            <>
              {/* Vídeo Local */}
              <video
                ref={videoRef}
                src={testimonial.videoSrc}
                poster={testimonial.posterSrc}
                className="absolute inset-0 w-full h-full object-cover"
                preload="metadata"
                playsInline
                onEnded={handleVideoEnded}
                aria-label={`Depoimento de ${testimonial.authorName}`}
              />
              
              {/* Overlay quando vídeo não está tocando */}
              {!isPlaying && (
                <div className="
                  absolute inset-0 
                  bg-gradient-to-b from-cocoa-800/20 via-transparent to-cocoa-800/70
                  transition-opacity duration-500
                  pointer-events-none
                " />
              )}
              
              {/* Botão de Play/Pause central */}
              <button
                onClick={handlePlayToggle}
                onKeyDown={handleKeyDown}
                className="
                  absolute top-1/2 left-1/2
                  -translate-x-1/2 -translate-y-1/2
                  w-16 h-16 md:w-20 md:h-20
                  rounded-full
                  flex items-center justify-center
                  transition-all duration-500
                  group-hover:scale-110
                  focus:outline-none
                  focus-visible:ring-2 focus-visible:ring-gold-400
                  focus-visible:ring-offset-2
                "
                style={{
                  background: 'rgba(247, 243, 239, 0.20)',
                  backdropFilter: 'blur(20px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                  border: '1px solid rgba(247, 243, 239, 0.40)',
                  boxShadow: `
                    inset 0 1px 0 0 rgba(247, 243, 239, 0.3),
                    inset 0 -1px 0 0 rgba(58, 37, 25, 0.15),
                    0 8px 32px -4px rgba(0, 0, 0, 0.3)
                  `,
                  opacity: isPlaying ? 0 : 1,
                  pointerEvents: isPlaying ? 'none' : 'auto',
                }}
                aria-label={isPlaying ? 'Pausar vídeo' : 'Reproduzir depoimento'}
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6 text-cream fill-cream stroke-[1]" />
                ) : (
                  <Play className="w-6 h-6 text-cream fill-cream stroke-[1] ml-1" />
                )}
              </button>
              
              {/* Pause invisível clicável quando vídeo está tocando */}
              {isPlaying && (
                <button
                  onClick={handlePlayToggle}
                  className="absolute inset-0 w-full h-full opacity-0 focus:outline-none"
                  aria-label="Pausar vídeo"
                />
              )}
              
              {/* Info do autor — overlay inferior */}
              {!isPlaying && (
                <div className="
                  absolute bottom-0 left-0 right-0
                  p-5 md:p-6
                  pointer-events-none
                ">
                  <div className="
                    inline-flex flex-col gap-1
                    p-3 rounded-lg
                  "
                  style={{
                    background: 'rgba(58, 37, 25, 0.35)',
                    backdropFilter: 'blur(16px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(16px) saturate(180%)',
                    border: '1px solid rgba(247, 243, 239, 0.15)',
                  }}>
                    <span className="
                      text-cream text-sm font-medium
                      drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]
                    ">
                      {testimonial.authorName}
                    </span>
                    <span className="
                      text-cream/75 text-xs tracking-[0.15em] uppercase
                    ">
                      {testimonial.authorLocation}
                    </span>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}
      
      {/* CARD DE TEXTO COM FOTO */}
      {testimonial.type === 'text' && (
        <div className="relative aspect-[3/4] bg-cream flex flex-col p-6 md:p-7 h-full w-full">
          {/* Aspas decorativas no topo */}
          <div className="
            text-gold-400/40 
            font-display font-extralight 
            text-7xl md:text-8xl 
            leading-none
            select-none
            mb-2
          ">
            "
          </div>
          
          {/* Citação */}
          <p className="
            font-display italic font-normal
            text-base md:text-lg
            leading-[1.5]
            text-ink
            flex-1
          ">
            {testimonial.quote}
          </p>
          
          {/* Divisor dourado */}
          <div className="h-px w-12 bg-gold-400/50 mt-6 mb-4" />
          
          {/* Info do autor */}
          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-center gap-3">
              {testimonial.photoSrc && (
                <img 
                  src={testimonial.photoSrc}
                  alt={testimonial.authorName}
                  className="w-10 h-10 rounded-full object-cover border border-gold-400/30"
                />
              )}
              <div className="flex flex-col">
                <span className="text-ink text-sm font-medium">
                  {testimonial.authorName}
                </span>
                <span className="text-ink-muted text-xs tracking-[0.15em] uppercase">
                  {testimonial.authorLocation}
                </span>
              </div>
            </div>
            
            <div className="
              text-[10px] text-gold-500 font-medium tracking-wider uppercase
              border border-gold-400/20 rounded-full px-2.5 py-1
              bg-gold-400/5 group-hover:bg-gold-400/15 transition-all duration-300
            ">
              Ver conversa
            </div>
          </div>
        </div>
      )}
      
      {/* Borda dourada externa (hover state) */}
      <div className="
        absolute inset-0 pointer-events-none rounded-[20px]
        border border-gold-400/15
        group-hover:border-gold-400/30
        transition-colors duration-500
      " />

      {/* Lightbox Modal para ver print da conversa */}
      {isLightboxOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-cocoa-950/80 backdrop-blur-sm p-4 cursor-zoom-out"
          onClick={() => setIsLightboxOpen(false)}
        >
          <div 
            className="relative max-w-[340px] xs:max-w-[380px] sm:max-w-md w-full flex flex-col items-center justify-center cursor-default" 
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setIsLightboxOpen(false)}
              className="
                absolute -top-12 right-0 
                text-cream hover:text-gold-300 
                text-xs font-medium tracking-wider uppercase
                focus:outline-none 
                bg-cocoa-900/60 px-3.5 py-1.5 rounded-full 
                backdrop-blur-sm border border-cream/10
                transition-all duration-300
              "
            >
              Fechar [X]
            </button>
            <img 
              src="/depoimentos/depoimento-insta-3-imagem.png" 
              alt="Conversa real no Instagram" 
              className="max-h-[80vh] w-auto rounded-[20px] object-contain shadow-2xl border border-gold-400/20"
            />
          </div>
        </div>
      )}
    </motion.div>
  );
};
