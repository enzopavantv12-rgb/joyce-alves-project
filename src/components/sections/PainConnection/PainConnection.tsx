import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Container } from '../../ui/Container';
import { Eyebrow } from '../../ui/Eyebrow';
import { SectionTitle } from '../../ui/SectionTitle';
import { fadeUp, staggerContainer } from '../../../hooks/useReveal';
import { CircularTestimonials } from '../../ui/circular-testimonials';

const painPoints = [
  {
    quote: "Já tentei inúmeros tratamentos para o melasma, e ainda sim as manchas sempre encontram um jeito de voltar.",
    name: "A Frustração do Melasma",
    designation: "O ciclo sem fim",
    src: "https://images.unsplash.com/photo-1542458548-b75815e027f6?q=80&w=1368&auto=format&fit=crop"
  },
  {
    quote: "A vergonha da própria pele faz com que a maquiagem se torne um escudo inseparável antes de sair de casa.",
    name: "Refém da Maquiagem",
    designation: "Escondendo a verdadeira face",
    src: "https://images.unsplash.com/photo-1512413914421-2a67e5bb684f?q=80&w=1368&auto=format&fit=crop"
  },
  {
    quote: "Ao me olhar no espelho, sinto que a imagem refletida já não parece ser a mesma mulher que eu era antes.",
    name: "Desconexão no Espelho",
    designation: "Cadê a minha essência?",
    src: "https://images.unsplash.com/photo-1516724562728-afc824a36e84?q=80&w=1368&auto=format&fit=crop"
  },
  {
    quote: "Dedico meu tempo cuidando de todos ao meu redor, mas sinto que nunca sobra um momento para cuidar de mim mesma.",
    name: "O Peso da Rotina",
    designation: "Sempre em segundo plano",
    src: "https://images.unsplash.com/photo-1498551172505-8ee7ad69f235?q=80&w=1368&auto=format&fit=crop"
  },
  {
    quote: "O cansaço emocional se acumula dia após dia, e percebo esses sinais estampados diretamente no meu rosto.",
    name: "Esgotamento Visível",
    designation: "Sua pele reflete o interior",
    src: "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?q=80&w=1368&auto=format&fit=crop"
  },
  {
    quote: "Meu desejo vai muito além de clarear manchas: o que eu mais quero é resgatar a minha beleza, leveza e confiança.",
    name: "O Verdadeiro Desejo",
    designation: "O resgate da autoestima",
    src: "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?q=80&w=1368&auto=format&fit=crop"
  }
];

export function PainConnection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-section-y lg:py-section-y-lg bg-cream" id="onde-voce-esta">
      <Container>
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="flex flex-col items-center"
        >
          <motion.div variants={fadeUp} className="text-center mb-20 md:mb-28">
            <Eyebrow>ONDE VOCÊ ESTÁ AGORA</Eyebrow>
            <SectionTitle>
              Talvez você se reconheça <em className="font-display italic text-gold-500">aqui</em>.
            </SectionTitle>
          </motion.div>

          <motion.div variants={fadeUp} className="w-full flex items-center justify-center">
            <CircularTestimonials
              testimonials={painPoints}
              autoplay={true}
              colors={{
                name: "#1e1e1e",
                designation: "#8a7b66", // gold-600 ish
                testimony: "#4a4a4a",
                arrowBackground: "#efece7", // cream slightly darker
                arrowForeground: "#1e1e1e",
                arrowHoverBackground: "#d8ba8a", // gold-300
              }}
              fontSizes={{
                name: "28px",
                designation: "14px",
                quote: "22px",
              }}
            />
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
