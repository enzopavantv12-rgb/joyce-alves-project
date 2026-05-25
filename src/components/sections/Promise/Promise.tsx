import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Flower2, ArrowUpRight } from 'lucide-react';
import { Container } from '../../ui/Container';
import { getWhatsappLink, WHATSAPP_MESSAGES } from '../../../lib/whatsapp';
import { trackEvent } from '../../../lib/analytics';

export function Promise() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const handlePrimaryCTA = () => {
    trackEvent('promise_cta_click', { type: 'primary' });
    window.open(getWhatsappLink(WHATSAPP_MESSAGES.geral), '_blank');
  };

  return (
    <section className="bg-[#6E4B3A] py-40 md:py-64 w-full flex flex-col items-center overflow-hidden">
      <Container className="flex flex-col items-center text-center max-w-[900px]">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center w-full"
        >
          {/* Top Decorative Icon */}
          <Flower2 className="w-[22px] h-[22px] text-gold-300 stroke-[1.5] mb-2" />
          
          {/* Eyebrow */}
          <p className="text-[9px] md:text-[11px] font-semibold tracking-[0.25em] uppercase text-gold-300/80 mb-8 md:mb-12">
            O QUE ESPERA POR VOCÊ
          </p>
          
          {/* Headline */}
          <h2 className="text-[36px] md:text-[56px] lg:text-[64px] font-display font-light text-cream leading-[1.1] tracking-[-0.02em] mb-10">
            Aqui, o tratamento vai <em className="italic text-gold-300 font-light">além da pele.</em>
          </h2>
          
          {/* Manifesto Phrase */}
          <p className="text-2xl md:text-3xl font-display italic text-cream/85 max-w-prose leading-relaxed mb-16">
            "Enquanto o melasma clareia de forma saudável e consciente, você também aprende a se priorizar, equilibrar suas emoções e se reconectar com a mulher que existe em você."
          </p>
          
          {/* Gold Divider */}
          <div className="w-[1px] h-[64px] bg-gold-400 mb-16" />
          
          {/* Pill CTA */}
          <button
            onClick={handlePrimaryCTA}
            aria-label="Agendar Avaliação"
            className="flex items-center gap-3 px-8 py-4 rounded-full border border-gold-300 text-sm md:text-base font-medium text-gold-300 hover:bg-gold-300 hover:text-[#6E4B3A] transition-all duration-300"
          >
            <span>Agendar Avaliação</span>
            <ArrowUpRight className="w-4 h-4 stroke-[1.5]" />
          </button>
        </motion.div>
      </Container>
    </section>
  );
}
