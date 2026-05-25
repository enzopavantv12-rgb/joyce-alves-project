import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Container } from '../../ui/Container';
import { Eyebrow } from '../../ui/Eyebrow';
import { SectionTitle } from '../../ui/SectionTitle';
import { testimonials } from '../../../lib/testimonials';
import { TestimonialCard } from '../../ui/testimonial-card';
import { fadeUp } from '../../../hooks/useReveal';

export function Testimonials() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [playingId, setPlayingId] = useState<string | null>(null);

  return (
    <section className="py-section-y lg:py-section-y-lg bg-cream relative overflow-hidden">
      {/* Textura sutil opcional (mantém o padrão do site) */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Cpath d='M30 0L60 30L30 60L0 30Z' fill='none' stroke='%23C6A16E' stroke-width='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: '120px 120px',
        }} 
      />

      <Container className="relative z-10">
        <div className="text-center mb-20 md:mb-28">
          <Eyebrow>O QUE ELAS DIZEM</Eyebrow>
          <SectionTitle>
            Palavras que <em className="italic text-gold-500">tocam</em>.
          </SectionTitle>
        </div>

        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={fadeUp}
          className="max-w-6xl mx-auto"
        >
          {/* Grid de 4 cards de depoimento */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-7 w-full justify-items-center">
            {testimonials.map((testimonial, index) => (
              <div key={testimonial.id} className="w-full max-w-sm sm:max-w-none">
                <TestimonialCard
                  testimonial={testimonial}
                  index={index}
                  isPlaying={playingId === testimonial.id}
                  onPlay={() => setPlayingId(testimonial.id)}
                  onPause={() => setPlayingId(null)}
                />
              </div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
