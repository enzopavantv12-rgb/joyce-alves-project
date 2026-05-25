import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Container } from '../../ui/Container';
import { Eyebrow } from '../../ui/Eyebrow';
import { SectionTitle } from '../../ui/SectionTitle';
import { TREATMENTS, type Treatment } from '../../../lib/treatments';
import { getWhatsappLink } from '../../../lib/whatsapp';
import { trackEvent } from '../../../lib/analytics';
import { ImageComparison } from '../../ui/image-comparison-slider';
import { GlowCard } from '../../ui/spotlight-card';
import { useQuiz } from '../../../hooks/useQuiz';

const groups = [
  { id: 'clareamento', title: 'Clareamento & Uniformização', cols: 2 },
  { id: 'rejuvenescimento', title: 'Rejuvenescimento & Vitalidade', cols: 3 },
  { id: 'autocuidado', title: 'Limpeza, Glow & Autocuidado', cols: 3 },
  { id: 'integrativa', title: 'Terapias Integrativas & Saúde Emocional', cols: 4 }
] as const;

// Stagger and reveal animations specific to these rows
const treatmentsContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    }
  }
};

const treatmentCardReveal = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1] as const
    }
  }
};

// Generate layout grid classes dynamically based on column count
const getGridClasses = (cols: number) => {
  if (cols === 2) {
    return "grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto w-full";
  }
  if (cols === 3) {
    return "grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full";
  }
  if (cols === 4) {
    return "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-6 xl:gap-5 max-w-6xl mx-auto w-full";
  }
  return "grid grid-cols-1 gap-6 w-full";
};

function TreatmentCard({ treatment }: { treatment: Treatment }) {
  const { openQuiz } = useQuiz();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    trackEvent('treatment_card_click', { treatment: treatment.name });
    if (treatment.id === 'luminapele') {
      openQuiz('treatment_card_luminapele');
    } else {
      window.open(getWhatsappLink(treatment.whatsappMessage), '_blank');
    }
  };

  const isComparison = treatment.id === 'luminapele' || treatment.id === 'peeling';

  return (
    <motion.div 
      variants={treatmentCardReveal}
      className="h-full"
    >
      <GlowCard
        glowColor="gold"
        radius={12}
        backdrop="rgba(251, 248, 244, 0.95)"
        className="group flex flex-col h-full overflow-hidden hover:-translate-y-1 transition-transform duration-700 ease-out cursor-pointer rounded-[12px]"
        onClick={handleClick}
      >
        {/* Imagem — aspect ratio 3:4 vertical */}
        <div 
          className="aspect-[3/4] overflow-hidden bg-nude-100 relative z-0 rounded-t-[12px]"
          onClick={(e) => {
            if (isComparison) {
              e.stopPropagation();
            }
          }}
        >
          {isComparison ? (
            <ImageComparison
              beforeImage={
                treatment.id === 'luminapele' 
                  ? '/placeholders/before-after-1-antes.png' 
                  : '/placeholders/before-after-2-antes.png'
              }
              afterImage={
                treatment.id === 'luminapele' 
                  ? '/placeholders/before-after-1-depois.png' 
                  : '/placeholders/before-after-2-depois.png'
              }
              className="w-full h-full aspect-auto md:aspect-auto"
              altBefore={`Antes - ${treatment.name}`}
              altAfter={`Depois - ${treatment.name}`}
            />
          ) : (
            <>
              <img 
                src={treatment.imagePlaceholder} 
                alt={treatment.name}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-1000 ease-out"
              />
              <div className="absolute inset-0 flex items-center justify-center text-nude-400 font-body text-xs text-center px-4 -z-10">
                {treatment.name}
              </div>
            </>
          )}
        </div>

        {/* Bloco de texto — preenche espaço restante uniformemente */}
        <div className="flex flex-col flex-grow flex-1 justify-between p-5 md:p-6 bg-ivory rounded-b-[12px]">
          <div>
            {/* Título */}
            <h4 className="font-display font-light text-lg md:text-xl xl:text-[1.125rem] leading-tight text-ink mb-3">
              {treatment.name}
            </h4>
            
            {/* Descrição em italic */}
            <p className="font-display italic text-sm leading-relaxed text-ink-soft mb-6">
              {treatment.benefit}
            </p>
          </div>
          
          {/* CTA "SAIBA MAIS" — sempre alinhado na base */}
          <div className="flex items-center gap-3 text-[10px] tracking-[0.25em] uppercase text-gold-500 font-medium transition-colors duration-500 group-hover:text-cocoa-700">
            <span>SAIBA MAIS</span>
            <div className="h-px w-6 bg-gold-400/60 transition-all duration-500 group-hover:w-10 group-hover:bg-cocoa-700" />
          </div>
        </div>
      </GlowCard>
    </motion.div>
  );
}

export function Treatments() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.05,
  });

  return (
    <section className="py-section-y lg:py-section-y-lg bg-cream">
      <Container>
        <div className="text-center mb-20 md:mb-28">
          <Eyebrow>EXPERIÊNCIAS DE CUIDADO</Eyebrow>
          <SectionTitle>
            Cada tratamento, uma <em className="italic text-gold-500">transformação</em>.
          </SectionTitle>
        </div>

        <div
          ref={ref}
          className="flex flex-col gap-16 w-full"
        >
          {groups.map((group, index) => {
            const groupTreatments = TREATMENTS.filter(t => t.group === group.id);
            return (
              <div key={group.id} className={`flex flex-col w-full ${index > 0 ? 'mt-20 md:mt-32' : ''}`}>
                <div className="flex flex-col items-center">
                  <div className="h-px w-12 bg-gold-400/60 mb-6" />
                  <motion.h3 
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                    variants={treatmentCardReveal}
                    className="font-display font-light text-[clamp(1.625rem,3vw,2.5rem)] leading-[1.15] tracking-[-0.01em] text-ink text-center mb-12 md:mb-16"
                  >
                    {group.title}
                  </motion.h3>
                </div>
                <motion.div 
                  initial="hidden"
                  animate={inView ? 'visible' : 'hidden'}
                  variants={treatmentsContainerVariants}
                  className={getGridClasses(group.cols)}
                >
                  {groupTreatments.map(treatment => (
                    <TreatmentCard key={treatment.id} treatment={treatment} />
                  ))}
                </motion.div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
