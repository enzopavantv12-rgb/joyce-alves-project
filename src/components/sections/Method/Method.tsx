import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Search, Sparkles, Leaf, HeartHandshake } from 'lucide-react';
import Balancer from 'react-wrap-balancer';
import { useQuiz } from '../../../hooks/useQuiz';

const phases = [
  {
    numeral: 'I',
    fase: 'FASE I',
    title: 'Escuta & Diagnóstico Profundo',
    desc: 'Acolhimento e análise completa da pele, hábitos, emoções e rotina. Aqui começa a identificação das possíveis causas que estão refletindo na pele.',
    icon: Search
  },
  {
    numeral: 'II',
    fase: 'FASE II',
    title: 'Clareamento & Renovação Celular',
    desc: 'Sessão clínica personalizada com ativos clareadores, peelings e protocolos regenerativos, promovendo clareamento saudável sem sensibilização excessiva.',
    icon: Sparkles
  },
  {
    numeral: 'III',
    fase: 'FASE III',
    title: 'Ritual de Autocuidado & Reequilíbrio',
    desc: 'Orientações individualizadas para cuidados em casa, alimentação, rotina e equilíbrio emocional. A cliente aprende a cuidar da pele de forma consciente.',
    icon: Leaf
  },
  {
    numeral: 'IV',
    fase: 'FASE IV',
    title: 'Acompanhamento & Transformação',
    desc: 'Suporte e acompanhamento da evolução da pele e da autoestima, reforçando constância e conexão consigo mesma.',
    icon: HeartHandshake
  }
];

// Stagger and reveal animations
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
      ease: [0.22, 1, 0.36, 1] as const
    }
  }
};

const gridContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.0,
      ease: [0.22, 1, 0.36, 1] as const
    }
  }
};

const ctaVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1] as const,
      delay: 0.2
    }
  }
};

export function Method() {
  const { openQuiz } = useQuiz();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section 
      id="metodo" 
      className="bg-cream py-24 md:py-40 border-b border-[rgba(198,161,110,0.15)]"
    >
      <div className="max-w-content mx-auto px-6 md:px-12 lg:px-16">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex flex-col w-full"
        >
          {/* Header */}
          <motion.div 
            variants={headerContainerVariants} 
            className="text-center max-w-2xl mx-auto mb-20 md:mb-28"
          >
            {/* Eyebrow */}
            <motion.p 
              variants={headerItemVariants}
              className="font-body font-medium text-[13px] md:text-sm tracking-[0.3em] uppercase text-gold-500 mb-6 md:mb-8"
            >
              MÉTODO EXCLUSIVO
            </motion.p>
            
            {/* Headline */}
            <motion.h2 
              variants={headerItemVariants}
              className="font-display font-light text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.05] tracking-[-0.02em] text-ink mb-5 md:mb-7"
            >
              <Balancer>
                Método <em className="italic font-light text-cocoa-500">Luminapele 360°</em>
              </Balancer>
            </motion.h2>
            
            {/* Subhead */}
            <motion.p 
              variants={headerItemVariants}
              className="font-display italic font-normal text-[clamp(1.25rem,2vw,1.625rem)] leading-relaxed text-ink-soft max-w-2xl mx-auto mt-4 md:mt-6"
            >
              <Balancer>
                O tratamento integrativo que clareia o melasma enquanto reconecta você consigo mesma.
              </Balancer>
            </motion.p>
          </motion.div>

          {/* Grid of 4 Cards */}
          <motion.div 
            variants={gridContainerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6 w-full"
          >
            {phases.map((phase) => {
              const Icon = phase.icon;
              return (
                <motion.div
                  key={phase.numeral}
                  variants={cardVariants}
                  className="
                    group
                    flex flex-col gap-6
                    p-8 lg:p-10
                    rounded-sm
                    border border-[rgba(198,161,110,0.15)]
                    bg-cream
                    transition-all duration-700 ease-out
                    hover:border-[rgba(198,161,110,0.40)]
                    hover:bg-ivory
                    cursor-default
                    w-full max-w-md mx-auto md:max-w-none
                  "
                >
                  {/* CARD HEADER — Numeração romana + ícone discreto */}
                  <div className="flex items-baseline justify-between">
                    {/* Numeração romana grande, marca d'água sutil */}
                    <span className="
                      font-display font-extralight 
                      text-5xl lg:text-6xl 
                      leading-none 
                      text-[rgba(198,161,110,0.40)]
                      transition-colors duration-700
                      group-hover:text-[rgba(198,161,110,0.60)]
                      select-none
                    ">
                      {phase.numeral}
                    </span>
                    
                    {/* Ícone Lucide pequeno, stroke 1, alinhado à direita */}
                    <Icon 
                      className="
                        w-5 h-5 stroke-[1] 
                        text-cocoa-500/50 
                        transition-colors duration-700
                        group-hover:text-cocoa-600
                      " 
                    />
                  </div>
                  
                  {/* Linha divisória sutil entre header e conteúdo */}
                  <div className="h-px w-8 bg-[rgba(198,161,110,0.30)] 
                                  transition-all duration-700
                                  group-hover:w-12 group-hover:bg-[rgba(198,161,110,0.60)]" />
                  
                  {/* Eyebrow da fase — pequeno label */}
                  <span className="
                    text-[10px] tracking-[0.3em] uppercase 
                    text-gold-500 font-medium
                  ">
                    {phase.fase}
                  </span>
                  
                  {/* Título da fase */}
                  <h4 className="
                    font-display font-light 
                    text-xl md:text-[1.375rem]
                    leading-tight 
                    text-ink
                  ">
                    {phase.title}
                  </h4>
                  
                  {/* Descrição */}
                  <p className="
                    font-body 
                    text-sm md:text-[0.9375rem]
                    leading-[1.65] 
                    text-ink-soft
                  ">
                    {phase.desc}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>

          {/* CTA */}
          <motion.div 
            variants={ctaVariants}
            className="flex justify-center mt-20 md:mt-28"
          >
            <button
              onClick={() => openQuiz('metodo')}
              className="
                inline-flex items-center gap-3
                px-10 py-4
                border border-cocoa-700
                text-cocoa-700 
                text-xs tracking-[0.25em] uppercase font-medium
                transition-all duration-500
                hover:bg-cocoa-700 hover:text-cream
                focus:outline-none
              "
            >
              <span>Conhecer minha jornada</span>
              <img src="/whatsapp.png" alt="WhatsApp" className="w-5 h-5 object-contain" />
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
