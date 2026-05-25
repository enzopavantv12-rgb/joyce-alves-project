import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { trackEvent } from "../../../lib/analytics";
import { cn } from "../../../lib/utils";
import { useQuiz } from "../../../hooks/useQuiz";

// Splitting text helper to animate characters like GSAP SplitText
const SplitText = ({ text, delay = 0, isItalic = false }: { text: string; delay?: number, isItalic?: boolean }) => {
  return (
    <span className="inline-block">
      {text.split("").map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          initial={{ opacity: 0, y: 40, rotateX: -45, letterSpacing: "0.08em" }}
          animate={{ opacity: 1, y: 0, rotateX: 0, letterSpacing: "-0.02em" }}
          transition={{
            opacity: { duration: 1.2, ease: "easeOut", delay: delay + i * 0.05 },
            y: { duration: 1.2, ease: "easeOut", delay: delay + i * 0.05 },
            rotateX: { duration: 1.2, ease: "easeOut", delay: delay + i * 0.05 },
            letterSpacing: { duration: 2.2, ease: "easeOut", delay: delay + i * 0.05 },
          }}
          className={cn("inline-block whitespace-pre", isItalic && "italic text-gold-300 font-light")}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
};

export function Hero() {
  const { openQuiz } = useQuiz();

  const handlePrimaryCTA = () => {
    trackEvent("hero_cta_click", { type: "primary" });
    openQuiz("hero_primary");
  };

  return (
    <section className="hero relative min-h-[100svh] bg-cocoa-800 overflow-hidden flex flex-col">
      {/* LAYER 1: Background image */}
      <motion.div
        initial={{ opacity: 0.85, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2.0, delay: 0.6, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <picture>
          <source media="(max-width: 768px)" srcSet="/placeholders/hero-joyce-mobile.jpg" />
          <img
            src="/placeholders/hero-joyce-desktop.jpg"
            alt="Joyce Alves, esteticista integrativa"
            className="absolute inset-0 w-full h-full object-cover object-right"
            fetchPriority="high"
            loading="eager"
          />
        </picture>
      </motion.div>

      {/* LAYER 2: Overlay gradient */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-cocoa-800/30 via-cocoa-800/50 to-cocoa-800/95 md:bg-gradient-to-r md:from-cocoa-800/85 md:via-cocoa-800/40 md:to-transparent pointer-events-none" />

      {/* LAYER 3: Container do conteúdo */}
      <div className="relative z-20 flex-1 flex flex-col justify-center max-w-content mx-auto w-full px-6 md:px-16 lg:px-24">
        <div className="max-w-2xl mt-16 md:mt-0">
          
          {/* [3.1] Eyebrow */}
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.0, ease: "easeOut" }}
            className="block text-xs md:text-sm tracking-[0.3em] uppercase text-cream/90 font-medium mb-8 md:mb-12"
          >
            ESTÉTICA COM ALMA · BH & POMPÉU
          </motion.span>
          
          {/* [3.2] Headline */}
          <h1 className="font-display font-light text-cream text-[clamp(2.75rem,8vw,5.75rem)] leading-[1.02] tracking-[-0.02em] mb-8 md:mb-10">
            <span className="block"><SplitText text="Você chegou " delay={1.4} /></span>
            <span className="block"><SplitText text="pelo melasma." delay={1.4 + 0.6} /></span>
            <span className="block">
              <SplitText text="Vai sair " delay={1.4 + 1.2} />
              <SplitText text="transformada." delay={1.4 + 1.2 + 0.4} isItalic />
            </span>
          </h1>
          
          {/* [3.3] Sublinha */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 3.4, ease: "easeOut" }}
            className="font-body text-cream/85 text-base md:text-lg leading-relaxed max-w-md mb-10 md:mb-12"
          >
            Uma jornada estética que clareia a pele enquanto reconecta você com a mulher que existe em você.
          </motion.p>
          
          {/* [3.4] CTA único */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 3.8, ease: "easeOut" }}
          >
            <button
              onClick={handlePrimaryCTA}
              aria-label="Agendar minha avaliação pelo WhatsApp"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-cream/10 backdrop-blur-md border border-cream/20 text-cream text-base font-medium hover:bg-cream/15 hover:border-cream/40 transition-all duration-500"
            >
              <span>Agendar minha avaliação</span>
              <ArrowUpRight className="w-4 h-4 stroke-1" />
            </button>
          </motion.div>
          
        </div>
      </div>
      
      {/* LAYER 4: Linha divisória horizontal */}
      <div className="relative z-20 max-w-content mx-auto w-full px-6 md:px-16 lg:px-24">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.4, delay: 4.4, ease: [0.76, 0, 0.24, 1] }}
          className="h-px w-full bg-cream/20 origin-left"
        />
      </div>
      
      {/* LAYER 5: Bloco de selos de credibilidade */}
      <div className="relative z-20 max-w-content mx-auto w-full px-6 md:px-16 lg:px-24 py-8 md:py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12">
          
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 4.8, ease: "easeOut" }}
            className="text-center md:text-left"
          >
            <p className="text-xs tracking-[0.25em] uppercase text-cream font-medium mb-2">
              + 400 MULHERES ATENDIDAS
            </p>
            <p className="text-sm text-cream/65 leading-relaxed">
              Transformações reais em pele e autoestima.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 4.95, ease: "easeOut" }}
            className="text-center md:text-left"
          >
            <p className="text-xs tracking-[0.25em] uppercase text-cream font-medium mb-2">
              + 7 ANOS DE ESPECIALIZAÇÃO
            </p>
            <p className="text-sm text-cream/65 leading-relaxed">
              Foco em melasma e equilíbrio integrativo.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 5.1, ease: "easeOut" }}
            className="text-center md:text-left"
          >
            <p className="text-xs tracking-[0.25em] uppercase text-cream font-medium mb-2">
              99% RELATAM MELHORA EM 30 DIAS
            </p>
            <p className="text-sm text-cream/65 leading-relaxed">
              Resultados visíveis nas primeiras sessões.
            </p>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
