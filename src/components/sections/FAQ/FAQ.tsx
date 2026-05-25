import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Plus, Minus } from 'lucide-react';
import { Container } from '../../ui/Container';
import { Eyebrow } from '../../ui/Eyebrow';
import { SectionTitle } from '../../ui/SectionTitle';
import { FAQ_ITEMS } from '../../../lib/faq';
import { fadeUp, staggerContainer } from '../../../hooks/useReveal';
import { trackEvent } from '../../../lib/analytics';

export function FAQ() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
      trackEvent('faq_open', { question: FAQ_ITEMS[index].question });
    }
  };

  return (
    <section id="faq" className="py-section-y lg:py-section-y-lg bg-ivory">
      <Container width="tight">
        <div className="text-center mb-20 md:mb-28">
          <Eyebrow>DÚVIDAS FREQUENTES</Eyebrow>
          <SectionTitle>
            Antes de você dar o <em className="italic text-gold-500">primeiro passo</em>.
          </SectionTitle>
        </div>

        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="divide-y divide-gold-400/20 border-t border-b border-gold-400/20"
        >
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div key={index} variants={fadeUp} className="py-6">
                <button
                  className="w-full flex items-center justify-between text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-ivory rounded-sm"
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen}
                >
                  <span className="font-display font-normal text-[20px] md:text-[22px] text-ink pr-8">
                    {item.question}
                  </span>
                  <span className="shrink-0 text-gold-500">
                    {isOpen ? <Minus strokeWidth={1.5} /> : <Plus strokeWidth={1.5} />}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pt-4 text-body text-ink-soft md:pl-4 border-l-2 border-gold-400/30 md:border-none mt-2">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
