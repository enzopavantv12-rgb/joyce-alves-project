import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Lamp, Sparkles, Coffee, Music } from 'lucide-react';
import { Container } from '../../ui/Container';
import { experienceGallery } from '../../../lib/experienceGallery';
import { GalleryMedia } from '../../ui/gallery-media';

export function Environment() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="bg-[#6E4B3A] relative overflow-hidden py-24 md:py-40">
      {/* Textura sutil opcional */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Cpath d='M30 0L60 30L30 60L0 30Z' fill='none' stroke='%23C6A16E' stroke-width='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: '120px 120px',
        }}
      />
      
      <Container className="relative z-10">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
        >
          {/* Esquerda: Galeria de mídias (Asymmetric Layout) */}
          <div className="lg:col-span-7 order-2 lg:order-1 w-full">
            <div className="flex flex-col gap-4 md:gap-5">
              {/* HERO HORIZONTAL — Item 1 (imagem) */}
              <GalleryMedia
                item={experienceGallery[0]}
                index={0}
                className="aspect-[16/10] md:aspect-[16/9] w-full"
              />
              
              {/* 2 VÍDEOS VERTICAIS LADO A LADO — Itens 2 e 3 */}
              <div className="grid grid-cols-2 gap-4 md:gap-5">
                <GalleryMedia
                  item={experienceGallery[1]}
                  index={1}
                  className="aspect-[9/16]"
                />
                <GalleryMedia
                  item={experienceGallery[2]}
                  index={2}
                  className="aspect-[9/16]"
                />
              </div>
            </div>
          </div>

          {/* Direita: Conteúdo de texto */}
          <div className="lg:col-span-5 order-1 lg:order-2 text-left flex flex-col justify-center">
            <span className="block text-xs tracking-[0.3em] uppercase text-gold-300 font-medium mb-6">
              A EXPERIÊNCIA
            </span>
            
            <h2 className="font-display font-light text-cream text-[clamp(2.25rem,4.5vw,3.5rem)] leading-[1.05] tracking-[-0.02em] mb-8">
              Mais do que um atendimento. Um <em className="italic text-gold-300 font-light">ritual</em>.
            </h2>
            
            <div className="space-y-6 text-cream/85 text-base md:text-lg leading-relaxed mb-10">
              <p>
                O ambiente possui uma atmosfera calma, sofisticada e sensorial, com iluminação suave e aromas aconchegantes. O cheiro predominante é maçã com canela, trazendo conforto e presença.
              </p>
              <p>
                Quando você chega, é recebida com calma — um chá ou café para que se sinta confortável e acolhida desde o primeiro momento. Durante a sessão, músicas suaves criam uma experiência leve e terapêutica.
              </p>
              <p>
                Cada atendimento dura em média 1h30 e acontece sem pressa, respeitando o seu momento emocional e a sua necessidade.
              </p>
            </div>
            
            {/* Lista sensorial */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              {[
                { Icon: Lamp, label: 'Iluminação quente e natural' },
                { Icon: Sparkles, label: 'Aroma de maçã com canela' },
                { Icon: Coffee, label: 'Chá ou café de boas-vindas' },
                { Icon: Music, label: 'Música suave terapêutica' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <item.Icon className="w-4 h-4 stroke-1 text-gold-300" />
                  <span className="text-sm text-cream/80">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
