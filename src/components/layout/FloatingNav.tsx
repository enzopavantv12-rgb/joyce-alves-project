import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from '../ui/Button';
import { getWhatsappLink, WHATSAPP_MESSAGES } from '../../lib/whatsapp';

export function FloatingNav() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      
      // Calculate reading progress
      const docHeight = document.documentElement.scrollHeight - vh;
      const scrollPercent = docHeight > 0 ? scrollY / docHeight : 0;
      setProgress(scrollPercent);

      // Show nav after 80vh
      setIsVisible(scrollY > vh * 0.8);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setIsMobileOpen(false);
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const navLinks = [
    { label: 'Método', id: 'metodo' },
    { label: 'Sobre', id: 'sobre' },
    { label: 'Resultados', id: 'resultados' },
    { label: 'FAQ', id: 'faq' },
  ];

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 left-0 right-0 z-50 bg-cocoa-800/80 backdrop-blur-md border-b border-gold-400/10"
          >
            {/* Reading progress bar */}
            <div 
              className="absolute top-0 left-0 h-[2px] bg-gold-400 transition-all duration-150 ease-out z-50"
              style={{ width: `${progress * 100}%` }}
            />

            <div className="max-w-content mx-auto px-6 md:px-10 lg:px-16 h-20 flex items-center justify-between">
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="font-display font-normal text-[24px] text-cream hover:text-cream/80 transition-colors"
              >
                Joyce Alves
              </button>

              {/* Desktop Nav */}
              <div className="hidden md:flex items-center gap-8">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => scrollTo(link.id)}
                    className="text-[14px] text-cream/90 hover:text-gold-300 transition-colors"
                  >
                    {link.label}
                  </button>
                ))}
                <Button 
                  onClick={() => window.open(getWhatsappLink(WHATSAPP_MESSAGES.geral), '_blank')}
                  className="px-6 py-2.5 text-[14px]"
                >
                  Agendar avaliação
                </Button>
              </div>

              {/* Mobile Toggle */}
              <button 
                className="md:hidden p-2 text-cream"
                onClick={() => setIsMobileOpen(true)}
              >
                <Menu strokeWidth={1} size={32} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Fullscreen Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[100] bg-cream flex flex-col"
          >
            <div className="h-20 px-6 flex items-center justify-between border-b border-gold-400/10">
              <span className="font-display text-[24px] text-ink">Joyce Alves</span>
              <button 
                className="p-2 text-ink"
                onClick={() => setIsMobileOpen(false)}
              >
                <X strokeWidth={1} size={32} />
              </button>
            </div>
            
            <div className="flex-1 flex flex-col items-center justify-center gap-8 p-6">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className="font-display text-[36px] text-ink"
                >
                  {link.label}
                </button>
              ))}
              <div className="w-16 h-px bg-gold-400 my-4" />
              <Button 
                onClick={() => window.open(getWhatsappLink(WHATSAPP_MESSAGES.geral), '_blank')}
                className="w-full max-w-[280px]"
              >
                Agendar avaliação
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
