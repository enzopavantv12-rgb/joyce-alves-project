import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Container } from '../../ui/Container';
import { Eyebrow } from '../../ui/Eyebrow';
import { Button } from '../../ui/Button';
import { fadeUp } from '../../../hooks/useReveal';
import { trackEvent } from '../../../lib/analytics';
import { useQuiz } from '../../../hooks/useQuiz';

export function FinalCTA() {
  const { openQuiz } = useQuiz();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const handleCTA = () => {
    trackEvent('final_cta_click');
    openQuiz('final_cta');
  };

  return (
    <section className="py-32 md:py-48 bg-cocoa-800 relative overflow-hidden">
      {/* Ornamental detail floating */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none text-gold-400">
        <svg width="400" height="400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/>
          <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
        </svg>
      </div>

      <Container width="tight" className="relative z-10 text-center">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={fadeUp}
          className="flex flex-col items-center"
        >
          <Eyebrow className="text-gold-300 mb-6">VAGAS LIMITADAS POR MÊS</Eyebrow>
          
          <h2 className="text-[48px] leading-[1.1] md:text-[80px] md:leading-[1.05] font-display font-light text-cream mb-8">
            Pronta para restaurar sua pele <br className="hidden md:block" /> e <em className="italic text-gold-300">reencontrar você mesma?</em>
          </h2>
          
          <p className="text-[17px] text-cream/80 max-w-2xl mx-auto mb-12">
            Cada atendimento é realizado com tempo, escuta e cuidado individual. Por isso, as vagas mensais são limitadas.
          </p>
          
          <Button 
            onClick={handleCTA}
            className="bg-gold-400 text-cocoa-800 hover:bg-gold-300 border-none text-[16px] px-10 py-5 mb-6 gap-3"
          >
            <span>Agendar minha avaliação</span>
            <img src="/whatsapp.png" alt="WhatsApp" className="w-5 h-5 object-contain" />
          </Button>

          <p className="text-[13px] text-cream/60">
            Atendimento de seg. a sex., 9h às 17h · Resposta em até 2h úteis
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
