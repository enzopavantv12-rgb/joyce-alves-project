import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { getWhatsappLink, WHATSAPP_MESSAGES } from '../../lib/whatsapp';
import { trackEvent } from '../../lib/analytics';

export function FloatingWhatsApp() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      setIsVisible(scrollY > vh * 0.6);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    trackEvent('whatsapp_floating_click');
    window.open(getWhatsappLink(WHATSAPP_MESSAGES.geral), '_blank');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          onClick={handleClick}
          className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[40] flex items-center gap-3 bg-cocoa-700 hover:bg-cocoa-600 text-cream px-6 py-4 rounded-full shadow-custom hover:-translate-y-1 transition-all duration-300 group"
        >
          <MessageCircle className="w-5 h-5 text-gold-400 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
          <span className="font-medium text-[14px] tracking-wide">Falar com Joyce</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
