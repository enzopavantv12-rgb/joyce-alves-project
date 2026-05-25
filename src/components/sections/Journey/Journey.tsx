import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Container } from '../../ui/Container';
import { Eyebrow } from '../../ui/Eyebrow';
import { SectionTitle } from '../../ui/SectionTitle';
import { Button } from '../../ui/Button';
import { getWhatsappLink, WHATSAPP_MESSAGES } from '../../../lib/whatsapp';
import { fadeUp, staggerContainer } from '../../../hooks/useReveal';
import { trackEvent } from '../../../lib/analytics';

const steps = [
  {
    num: '01',
    title: 'Primeiro contato',
    desc: 'Você entra em contato pelo WhatsApp e me conta um pouco sobre o que está vivendo, sua pele e suas queixas principais.'
  },
  {
    num: '02',
    title: 'Avaliação & Escuta Profunda',
    desc: 'Agendamos sua consulta inicial, onde realizo uma análise completa da sua pele, rotina, hábitos e emoções para entender a origem dos desequilíbrios.'
  },
  {
    num: '03',
    title: 'Protocolo Personalizado',
    desc: 'Monto um tratamento totalmente individualizado, alinhando skincare, procedimentos, autocuidado e equilíbrio emocional.'
  },
  {
    num: '04',
    title: 'Início da sua transformação',
    desc: 'Começamos sua jornada de cuidado integrativo, acompanhando de perto a evolução da sua pele, autoestima e bem-estar.'
  }
];

export function Journey() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleCTA = () => {
    trackEvent('journey_cta_click');
    window.open(getWhatsappLink(WHATSAPP_MESSAGES.geral), '_blank');
  };

  return (
    <section className="py-section-y lg:py-section-y-lg bg-cream">
      <Container>
        <div className="text-center mb-20 md:mb-28">
          <Eyebrow>SUA JORNADA</Eyebrow>
          <SectionTitle>
            Do <em className="italic text-gold-500">primeiro contato</em> à sua transformação.
          </SectionTitle>
        </div>

        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="relative"
        >
          {/* Connector Line */}
          <div className="absolute left-[38px] md:left-0 top-0 bottom-0 w-px md:w-full md:h-px bg-gold-400/30 md:top-[68px]" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 relative z-10">
            {steps.map((step, index) => (
              <motion.div key={index} variants={fadeUp} className="flex md:flex-col gap-6 md:gap-8">
                <div className="bg-cream shrink-0 text-gold-400 font-display font-light text-[64px] md:text-[96px] leading-none py-2 md:py-0 w-[80px] md:w-auto text-center md:text-left">
                  {step.num}
                </div>
                <div>
                  <h3 className="font-display font-normal text-[22px] md:text-[28px] text-ink mb-3 md:mb-4">
                    {step.title}
                  </h3>
                  <p className="text-[15px] leading-relaxed text-ink-soft">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mt-20 md:mt-32 text-center"
        >
          <Button onClick={handleCTA} className="px-10 gap-3">
            <span>Quero começar minha jornada</span>
            <img src="/whatsapp.png" alt="WhatsApp" className="w-5 h-5 object-contain" />
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}
