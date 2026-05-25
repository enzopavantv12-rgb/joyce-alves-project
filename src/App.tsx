import React from 'react';
import { FloatingNav } from './components/layout/FloatingNav';
import { FloatingWhatsApp } from './components/layout/FloatingWhatsApp';
import { Hero } from './components/sections/Hero/Hero';
import { PainConnection } from './components/sections/PainConnection/PainConnection';
import { Promise } from './components/sections/Promise/Promise';
import { Method } from './components/sections/Method/Method';
import { Treatments } from './components/sections/Treatments/Treatments';
import { BeforeAfter } from './components/sections/BeforeAfter/BeforeAfter';
import { About } from './components/sections/About/About';
import { Testimonials } from './components/sections/Testimonials/Testimonials';
import { Environment } from './components/sections/Environment/Environment';
import { Journey } from './components/sections/Journey/Journey';
import { FAQ } from './components/sections/FAQ/FAQ';
import { FinalCTA } from './components/sections/FinalCTA/FinalCTA';
import { Footer } from './components/sections/Footer/Footer';
import { LiquidGlassFilter } from './components/ui/LiquidGlassFilter';
import { QuizModal } from './components/quiz/QuizModal';

function App() {
  return (
    <div className="min-h-screen bg-cream selection:bg-gold-400/30 selection:text-ink relative overflow-x-hidden">
      {/* Global Ambient Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Zigzag Lightning - Light Pattern */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              repeating-linear-gradient(0deg, transparent, transparent 20px, rgba(75, 85, 99, 0.08) 20px, rgba(75, 85, 99, 0.08) 21px),
              repeating-linear-gradient(90deg, transparent, transparent 30px, rgba(107, 114, 128, 0.06) 30px, rgba(107, 114, 128, 0.06) 31px),
              repeating-linear-gradient(60deg, transparent, transparent 40px, rgba(55, 65, 81, 0.05) 40px, rgba(55, 65, 81, 0.05) 41px),
              repeating-linear-gradient(150deg, transparent, transparent 35px, rgba(31, 41, 55, 0.04) 35px, rgba(31, 41, 55, 0.04) 36px)
            `,
          }}
        />
      </div>

      <LiquidGlassFilter />
      <FloatingNav />
      <QuizModal />
      
      <main className="relative z-10">
        <Hero />
        <PainConnection />
        <Promise />
        <Method />
        <Treatments />
        <BeforeAfter />
        <About />
        <Testimonials />
        <Environment />
        <Journey />
        <FAQ />
        <FinalCTA />
      </main>

      <Footer />
      
      <FloatingWhatsApp />
    </div>
  );
}

export default App;
