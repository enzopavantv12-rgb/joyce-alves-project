import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { CheckCircle2 } from 'lucide-react';
import { fadeUp } from '../../../hooks/useReveal';
import { JoyceVisualCard } from './JoyceVisualCard';

export function About() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section 
      id="sobre" 
      className="bg-cocoa-500 relative overflow-hidden py-24 md:py-40"
    >
      {/* Textura sutil de papel artesanal */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Cpath d='M30 0L60 30L30 60L0 30Z' fill='none' stroke='%23C6A16E' stroke-width='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: '120px 120px',
        }}
      />
      
      <div className="max-w-content mx-auto px-6 md:px-12 lg:px-16 relative z-10">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-16 items-center"
        >
          {/* Coluna esquerda — Card visual */}
          <motion.div 
            variants={fadeUp} 
            className="md:col-span-2 flex justify-center md:justify-end"
          >
            <JoyceVisualCard />
          </motion.div>

          {/* Coluna direita — Texto */}
          <motion.div 
            variants={fadeUp} 
            className="md:col-span-3 max-w-2xl"
          >
            <span className="block text-xs tracking-[0.3em] uppercase text-gold-300 font-medium mb-6">
              QUEM CUIDA DE VOCÊ
            </span>
            
            <h2 className="font-display font-light text-cream text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.05] tracking-[-0.02em] mb-3">
              Joyce Alves
            </h2>
            
            <p className="font-display italic font-normal text-xl md:text-2xl text-cream/80 mb-10">
              Esteticista integrativa & terapeuta holística
            </p>

            <div className="space-y-6 text-cream/85 text-base leading-relaxed mb-10">
              <p>
                Comecei na estética porque sempre enxerguei a beleza como algo muito além da aparência. Ao longo da minha trajetória, percebi que muitas mulheres chegavam até mim tratando manchas e melasma, mas carregavam também cansaço emocional, inseguranças e dores que já não conseguiam mais esconder.
              </p>
              <p>
                Foi isso que me levou a aprofundar meus estudos em terapias integrativas, Reiki e Psicanálise, entendendo que a pele muitas vezes revela aquilo que a alma sente em silêncio. Passei então a criar atendimentos mais humanos, acolhedores e profundos, onde cada mulher pudesse se sentir verdadeiramente vista e cuidada.
              </p>
              <p>
                Hoje, meu trabalho é ajudar mulheres a restaurarem não apenas a saúde da pele, mas também a autoestima, o equilíbrio emocional e a conexão consigo mesmas.
              </p>
            </div>

            {/* Assinatura cursiva */}
            <div className="mt-10 mb-12">
              <span className="font-['Allura'] text-gold-300 text-[48px] leading-none">
                Joyce Alves
              </span>
            </div>

            {/* Selos de formação */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full border border-gold-400/40 shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-gold-300" strokeWidth={1.5} />
                </div>
                <span className="text-small text-cream/85 leading-snug">Formação técnica em Estética</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full border border-gold-400/40 shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-gold-300" strokeWidth={1.5} />
                </div>
                <span className="text-small text-cream/85 leading-snug">Formação em Reiki</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full border border-gold-400/40 shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-gold-300" strokeWidth={1.5} />
                </div>
                <span className="text-small text-cream/85 leading-snug">Em formação em Psicanálise</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
