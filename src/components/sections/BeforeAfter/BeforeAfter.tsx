import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ImageComparison } from '../../ui/image-comparison-slider';
import { beforeAfterCases } from '../../../lib/beforeAfterCases';

// Animated Counter Component using requestAnimationFrame with easeOutCubic
function AnimatedCounter({ value, duration = 1.8 }: { value: string; duration?: number }) {
  const [displayValue, setDisplayValue] = useState(0);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const numericMatch = value.match(/\d+/);
  const target = numericMatch ? parseInt(numericMatch[0], 10) : 0;
  const isPrefixPlus = value.startsWith('+');
  const isSuffixPlus = value.endsWith('+');
  const isPercent = value.endsWith('%');

  useEffect(() => {
    if (!inView) return;

    const start = 0;
    const end = target;
    const startTime = performance.now();
    let animationFrameId: number;

    const updateCounter = (now: number) => {
      const elapsed = (now - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      
      // easeOutCubic: f(t) = 1 - (1 - t)^3
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(easeProgress * (end - start) + start);
      setDisplayValue(current);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(updateCounter);
      } else {
        setDisplayValue(end);
      }
    };

    animationFrameId = requestAnimationFrame(updateCounter);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [inView, target, duration]);

  const formatValue = () => {
    let result = displayValue.toString();
    if (isPrefixPlus) {
      result = '+' + result;
    } else if (isSuffixPlus) {
      result = result + '+';
    }
    if (isPercent) {
      result = result + '%';
    }
    return result;
  };

  return <span ref={ref}>{formatValue()}</span>;
}

// Framer Motion Animation Variants
const headerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    }
  }
};

const headerItemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1] as const,
    }
  }
};



const footerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 1.0,
      delay: 0.8,
      ease: 'easeOut' as const,
    }
  }
};

export function BeforeAfter() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.15,
  });

  return (
    <section id="resultados" className="bg-cream py-24 md:py-40">
      <div className="max-w-content mx-auto px-6 md:px-16">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="flex flex-col w-full"
        >
          {/* Header da seção */}
          <motion.div
            variants={headerContainerVariants}
            className="text-center max-w-2xl mx-auto mb-20 md:mb-28"
          >
            <motion.span
              variants={headerItemVariants}
              className="block text-[13px] md:text-sm tracking-[0.3em] uppercase text-gold-500 font-medium mb-6 md:mb-8"
            >
              TRANSFORMAÇÕES REAIS
            </motion.span>
            
            <motion.h2
              variants={headerItemVariants}
              className="font-display font-light text-ink text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.05] tracking-[-0.02em] mb-5 md:mb-7"
            >
              Resultados que vão <em className="italic text-cocoa-500 font-light"> além da pele</em>.
            </motion.h2>
            
            <motion.p
              variants={headerItemVariants}
              className="font-display font-normal italic text-[clamp(1.25rem,2vw,1.625rem)] leading-relaxed text-ink-soft max-w-2xl mx-auto mt-4 md:mt-6"
            >
              Mais de 400 mulheres atendidas. Mais de 7 anos especializada em melasma.
            </motion.p>
          </motion.div>

          {/* Grid de cards — sem quebra de linha (scroll horizontal abaixo de lg, 4 colunas em lg+) */}
          <div className="flex flex-row overflow-x-auto lg:grid lg:grid-cols-4 gap-6 lg:gap-8 pb-6 lg:pb-0 scrollbar-none snap-x snap-mandatory max-w-6xl mx-auto w-full">
            {beforeAfterCases.map((caseData, index) => (
              <motion.div
                key={caseData.id}
                className="flex flex-col gap-6 w-[280px] md:w-[320px] lg:w-auto flex-shrink-0 snap-center"
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ 
                  duration: 1.0, 
                  delay: index * 0.15,
                  ease: [0.22, 1, 0.36, 1] 
                }}
              >
                <ImageComparison
                  beforeImage={caseData.beforeImage}
                  afterImage={caseData.afterImage}
                  altBefore={caseData.altBefore}
                  altAfter={caseData.altAfter}
                  enableDemoAnimation={index === 0}
                />
                
                <div className="px-2">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] tracking-[0.3em] uppercase text-gold-500 font-medium">
                      {caseData.caseName}
                    </span>
                    <span className="text-[10px] tracking-[0.25em] uppercase text-ink-muted">
                      {caseData.duration}
                    </span>
                  </div>
                  
                  <div className="h-px w-8 bg-gold-400/40 mb-4" />
                  
                  <p className="font-body text-sm md:text-[0.9375rem] leading-[1.65] text-ink-soft">
                    {caseData.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Disclaimer e Bloco de Números */}
          <motion.div variants={footerVariants} className="w-full">
            {/* Disclaimer */}
            <p className="text-center mt-12 md:mt-16 text-xs italic text-ink-muted max-w-xl mx-auto leading-relaxed">
              Resultados variam conforme cada organismo e fase do tratamento. Todos os atendimentos seguem protocolo individualizado.
            </p>
            
            {/* Bloco de números */}
            <div className="mt-20 md:mt-28 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 max-w-4xl mx-auto w-full">
              <div className="text-center">
                <div className="font-display font-extralight text-ink text-5xl md:text-7xl leading-none mb-3">
                  <AnimatedCounter value="+400" />
                </div>
                <div className="h-px w-12 bg-gold-400/60 mx-auto mb-3" />
                <span className="text-xs tracking-[0.25em] uppercase text-ink-muted">
                  Mulheres atendidas
                </span>
              </div>
              
              <div className="text-center">
                <div className="font-display font-extralight text-ink text-5xl md:text-7xl leading-none mb-3">
                  <AnimatedCounter value="+7" />
                </div>
                <div className="h-px w-12 bg-gold-400/60 mx-auto mb-3" />
                <span className="text-xs tracking-[0.25em] uppercase text-ink-muted">
                  Anos especializada
                </span>
              </div>
              
              <div className="text-center">
                <div className="font-display font-extralight text-ink text-5xl md:text-7xl leading-none mb-3">
                  <AnimatedCounter value="99%" />
                </div>
                <div className="h-px w-12 bg-gold-400/60 mx-auto mb-3" />
                <span className="text-xs tracking-[0.25em] uppercase text-ink-muted">
                  Melhora em 30 dias
                </span>
              </div>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
