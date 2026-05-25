import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronsLeftRight } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

interface ImageComparisonProps {
  beforeImage: string;
  afterImage: string;
  altBefore?: string;
  altAfter?: string;
  className?: string;
  enableDemoAnimation?: boolean;
}

export function ImageComparison({
  beforeImage,
  afterImage,
  altBefore = 'Antes',
  altAfter = 'Depois',
  className = '',
  enableDemoAnimation = true,
}: ImageComparisonProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [isAutoAnimating, setIsAutoAnimating] = useState(false);
  const hasAnimatedRef = useRef(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutsRef = useRef<number[]>([]);

  const { ref: inViewRef, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  // Combine refs for container
  const setRefs = useCallback(
    (node: HTMLDivElement | null) => {
      containerRef.current = node;
      inViewRef(node);
    },
    [inViewRef]
  );

  // Cancel the onboarding animation if user interacts
  const cancelAutoAnimation = useCallback(() => {
    if (isAutoAnimating) {
      setIsAutoAnimating(false);
      timeoutsRef.current.forEach((t) => clearTimeout(t));
      timeoutsRef.current = [];
    }
  }, [isAutoAnimating]);

  // Handle onboarding animation sequence
  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !enableDemoAnimation) {
      hasAnimatedRef.current = true;
      return;
    }

    if (inView && !hasAnimatedRef.current) {
      hasAnimatedRef.current = true;
      setIsAutoAnimating(true);

      const t1 = window.setTimeout(() => {
        setSliderPosition(25);
      }, 600);

      const t2 = window.setTimeout(() => {
        setSliderPosition(75);
      }, 2600); // 600ms + 1200ms duration + 800ms wait = 2600ms

      const t3 = window.setTimeout(() => {
        setSliderPosition(50);
      }, 4600); // 2600ms + 1200ms duration + 800ms wait = 4600ms

      const t4 = window.setTimeout(() => {
        setIsAutoAnimating(false);
      }, 5800); // 4600ms + 1200ms duration = 5800ms

      timeoutsRef.current = [t1, t2, t3, t4];
    }

    return () => {
      timeoutsRef.current.forEach((t) => clearTimeout(t));
    };
  }, [inView, enableDemoAnimation]);

  // Update slider position from clientX coordinate
  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Only drag with left click or touch/pointer
    if (e.button !== 0 && e.pointerType === 'mouse') return;
    cancelAutoAnimation();
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    updatePosition(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    updatePosition(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    cancelAutoAnimation();
    if (e.key === 'ArrowLeft') {
      setSliderPosition((prev) => Math.max(0, prev - 2));
      e.preventDefault();
    } else if (e.key === 'ArrowRight') {
      setSliderPosition((prev) => Math.min(100, prev + 2));
      e.preventDefault();
    }
  };

  // Dragging states or auto-animating get CSS transition
  const transitionStyle = isAutoAnimating ? 'all 1.2s ease-in-out' : 'none';

  return (
    <div
      ref={setRefs}
      className={`
        relative w-full 
        aspect-[4/5] md:aspect-[4/5]
        overflow-hidden
        select-none
        bg-cocoa-800
        border border-[rgba(198,161,110,0.15)]
        cursor-ew-resize
        group
        rounded-[14px]
        transform-gpu
        shadow-[0_24px_60px_-20px_rgba(58,37,25,0.35),0_8px_24px_-8px_rgba(58,37,25,0.15)]
        liquid-glass-container
        ${isDragging ? 'is-dragging' : ''}
        ${className}
      `}
      style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
    >
      {/* Imagem DEPOIS — camada de baixo */}
      <img
        src={afterImage}
        alt={altAfter}
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
        loading="lazy"
      />

      {/* Imagem ANTES — camada de cima, recortada por clip-path */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
          transition: transitionStyle,
        }}
      >
        <img
          src={beforeImage}
          alt={altBefore}
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
          loading="lazy"
        />
      </div>

      {/* Badge ANTES — Liquid Glass High-Fidelity */}
      <div 
        className="
          absolute top-5 left-5 z-20
          rounded-full
          overflow-hidden
        "
        style={{
          isolation: 'isolate',
        }}
      >
        {/* Camada 1 — Glass com refração */}
        <div
          className="absolute inset-0 rounded-full liquid-glass-badge"
          style={{
            backdropFilter: 'blur(24px) saturate(180%) brightness(96%)',
            WebkitBackdropFilter: 'blur(24px) saturate(180%) brightness(96%)',
            filter: 'url(#liquid-glass)',
            background: 'rgba(58, 37, 25, 0.25)',
          }}
        />
        
        {/* Camada 2 — Highlight de luz (Light -90° 62%) */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: `linear-gradient(270deg, 
              rgba(247, 243, 239, 0.62) 0%, 
              rgba(247, 243, 239, 0.08) 35%,
              transparent 50%,
              rgba(247, 243, 239, 0.04) 65%,
              rgba(247, 243, 239, 0.15) 100%
            )`,
            mixBlendMode: 'overlay',
          }}
        />
        
        {/* Camada 3 — Borda interna (Depth) */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            boxShadow: `
              inset 0 1px 0 0 rgba(247, 243, 239, 0.4),
              inset 0 -1px 0 0 rgba(58, 37, 25, 0.25),
              inset 1px 0 0 0 rgba(247, 243, 239, 0.15),
              inset -1px 0 0 0 rgba(58, 37, 25, 0.15)
            `,
            border: '1px solid rgba(247, 243, 239, 0.30)',
          }}
        />
        
        {/* Camada 4 — Conteúdo (texto) */}
        <div className="relative px-4 py-2">
          <span className="
            text-[10px] tracking-[0.3em] uppercase 
            text-cream font-medium
            drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]
          ">
            Antes
          </span>
        </div>
        
        {/* Sombra externa */}
        <div 
          className="absolute inset-0 rounded-full pointer-events-none -z-10"
          style={{
            boxShadow: `
              0 8px 24px -4px rgba(0, 0, 0, 0.25),
              0 4px 12px -2px rgba(58, 37, 25, 0.20)
            `,
          }}
        />
      </div>

      {/* Badge DEPOIS — Liquid Glass Gold High-Fidelity */}
      <div 
        className="
          absolute top-5 right-5 z-20
          rounded-full
          overflow-hidden
        "
        style={{
          isolation: 'isolate',
        }}
      >
        {/* Camada 1 — Glass com refração + tint gold */}
        <div
          className="absolute inset-0 rounded-full liquid-glass-badge"
          style={{
            backdropFilter: 'blur(24px) saturate(200%) brightness(105%)',
            WebkitBackdropFilter: 'blur(24px) saturate(200%) brightness(105%)',
            filter: 'url(#liquid-glass)',
            background: `linear-gradient(135deg, 
              rgba(198, 161, 110, 0.30) 0%, 
              rgba(247, 243, 239, 0.18) 50%,
              rgba(216, 186, 138, 0.25) 100%
            )`,
          }}
        />
        
        {/* Camada 2 — Highlight de luz */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: `linear-gradient(270deg, 
              rgba(216, 186, 138, 0.62) 0%, 
              rgba(247, 243, 239, 0.10) 35%,
              transparent 50%,
              rgba(247, 243, 239, 0.06) 65%,
              rgba(216, 186, 138, 0.18) 100%
            )`,
            mixBlendMode: 'overlay',
          }}
        />
        
        {/* Camada 3 — Depth */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            boxShadow: `
              inset 0 1px 0 0 rgba(216, 186, 138, 0.50),
              inset 0 -1px 0 0 rgba(110, 75, 58, 0.20),
              inset 1px 0 0 0 rgba(216, 186, 138, 0.20),
              inset -1px 0 0 0 rgba(110, 75, 58, 0.15)
            `,
            border: '1px solid rgba(216, 186, 138, 0.45)',
          }}
        />
        
        {/* Conteúdo */}
        <div className="relative px-4 py-2">
          <span className="
            text-[10px] tracking-[0.3em] uppercase 
            text-gold-200 font-medium
            drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]
          ">
            Depois
          </span>
        </div>
        
        {/* Sombra externa com tint gold */}
        <div 
          className="absolute inset-0 rounded-full pointer-events-none -z-10"
          style={{
            boxShadow: `
              0 8px 24px -4px rgba(198, 161, 110, 0.30),
              0 4px 12px -2px rgba(58, 37, 25, 0.20)
            `,
          }}
        />
      </div>

      {/* Divisor vertical com leve refração */}
      <div 
        className="
          absolute top-0 bottom-0 
          w-[3px]
          pointer-events-none
          z-10
          liquid-glass-divider
        "
        style={{ 
          left: `${sliderPosition}%`,
          transform: 'translateX(-1.5px)',
          transition: transitionStyle,
          filter: 'url(#liquid-glass-subtle)',
          background: `linear-gradient(
            to bottom,
            rgba(216, 186, 138, 0.5) 0%,
            rgba(247, 243, 239, 0.95) 15%,
            rgba(247, 243, 239, 1) 50%,
            rgba(247, 243, 239, 0.95) 85%,
            rgba(216, 186, 138, 0.5) 100%
          )`,
          boxShadow: `
            0 0 16px rgba(247, 243, 239, 0.7),
            0 0 32px rgba(216, 186, 138, 0.5),
            0 0 64px rgba(216, 186, 138, 0.2)
          `,
        }}
      />

      {/* Handle do slider — Refração Máxima */}
      <div
        className="
          absolute top-1/2 -translate-y-1/2
          w-14 h-14
          -translate-x-1/2
          z-20
          cursor-ew-resize
          transition-transform duration-300 ease-out
        "
        style={{ 
          left: `${sliderPosition}%`,
          transform: `translate(-50%, -50%) ${isDragging ? 'scale(1.1)' : 'scale(1)'}`,
          transition: isAutoAnimating ? 'left 1.2s ease-in-out, transform 0.3s' : 'transform 0.3s',
          willChange: isDragging ? 'transform' : 'auto',
          isolation: 'isolate',
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        role="slider"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(sliderPosition)}
        aria-label="Arraste para comparar antes e depois"
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        {/* Glow externo */}
        <div 
          className="absolute -inset-2 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(247,243,239,0.25) 0%, transparent 70%)',
            filter: 'blur(8px)',
          }}
        />
        
        {/* Container do glass com overflow hidden para refração ficar dentro */}
        <div 
          className="absolute inset-0 rounded-full overflow-hidden"
          style={{
            isolation: 'isolate',
          }}
        >
          {/* Camada 1 — Glass core com refração FORTE */}
          <div
            className="absolute inset-0 rounded-full liquid-glass-handle"
            style={{
              backdropFilter: 'blur(28px) saturate(200%) brightness(102%)',
              WebkitBackdropFilter: 'blur(28px) saturate(200%) brightness(102%)',
              filter: 'url(#liquid-glass-strong)',
              background: `linear-gradient(135deg, 
                rgba(247, 243, 239, 0.30) 0%, 
                rgba(216, 186, 138, 0.18) 50%,
                rgba(247, 243, 239, 0.25) 100%
              )`,
            }}
          />
          
          {/* Camada 2 — Highlight de luz (Light -90° 62%) */}
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background: `linear-gradient(270deg,
                rgba(247, 243, 239, 0.62) 0%,
                rgba(247, 243, 239, 0.20) 30%,
                transparent 50%,
                rgba(58, 37, 25, 0.05) 70%,
                rgba(247, 243, 239, 0.12) 100%
              )`,
              mixBlendMode: 'overlay',
            }}
          />
          
          {/* Camada 3 — Highlight pill no topo (reflexo de luz) */}
          <div
            className="absolute top-[3px] left-[8px] right-[8px] h-[8px] rounded-full pointer-events-none"
            style={{
              background: 'linear-gradient(to bottom, rgba(247,243,239,0.7), transparent)',
              opacity: 0.8,
            }}
          />
          
          {/* Camada 4 — Depth (espessura do vidro) */}
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              boxShadow: `
                inset 0 2px 0 0 rgba(247, 243, 239, 0.50),
                inset 0 -2px 0 0 rgba(58, 37, 25, 0.18),
                inset 2px 0 0 0 rgba(247, 243, 239, 0.20),
                inset -2px 0 0 0 rgba(58, 37, 25, 0.15)
              `,
              border: '1px solid rgba(247, 243, 239, 0.45)',
            }}
          />
        </div>
        
        {/* Ícone — fora do overflow:hidden para ficar nítido */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <ChevronsLeftRight 
            className="
              w-5 h-5 stroke-[1.5] 
              text-cream
              drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]
            " 
          />
        </div>
        
        {/* Sombra externa */}
        <div 
          className="absolute inset-0 rounded-full pointer-events-none -z-10"
          style={{
            boxShadow: `
              0 12px 40px -4px rgba(0, 0, 0, 0.35),
              0 6px 20px -2px rgba(198, 161, 110, 0.25),
              0 2px 8px -1px rgba(58, 37, 25, 0.20)
            `,
          }}
        />
      </div>
    </div>
  );
}
