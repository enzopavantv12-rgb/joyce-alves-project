import React from 'react';
import { Container } from '../../ui/Container';
import { Button } from '../../ui/Button';
import { getWhatsappLink, WHATSAPP_MESSAGES } from '../../../lib/whatsapp';

export function Footer() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-cocoa-800 pt-0 pb-8 text-cream/80">
      <div className="w-full h-px bg-gold-400/20 mb-16" />
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-16">
          {/* Marca */}
          <div>
            <div className="font-display text-[32px] text-cream mb-2 leading-none">
              Joyce Alves
            </div>
            <p className="text-[14px] text-cream/60">
              Estética com alma · Belo Horizonte & Pompéu
            </p>
          </div>

          {/* Navegação */}
          <div className="flex flex-col gap-3">
            <h4 className="text-gold-300 text-[13px] uppercase tracking-widest font-medium mb-2">Navegação</h4>
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-left text-[14px] hover:text-gold-300 transition-colors">Início</button>
            <button onClick={() => scrollTo('metodo')} className="text-left text-[14px] hover:text-gold-300 transition-colors">Método</button>
            <button onClick={() => scrollTo('sobre')} className="text-left text-[14px] hover:text-gold-300 transition-colors">Sobre</button>
            <button onClick={() => scrollTo('resultados')} className="text-left text-[14px] hover:text-gold-300 transition-colors">Resultados</button>
            <button onClick={() => scrollTo('faq')} className="text-left text-[14px] hover:text-gold-300 transition-colors">FAQ</button>
          </div>

          {/* Atendimento */}
          <div className="flex flex-col gap-3">
            <h4 className="text-gold-300 text-[13px] uppercase tracking-widest font-medium mb-2">Atendimento</h4>
            <div className="text-[14px] mb-2">
              <strong className="block text-cream font-medium">Belo Horizonte</strong>
              Av. Celso Porfírio Machado, 1933 — Belvedere
            </div>
            <div className="text-[14px] mb-2">
              <strong className="block text-cream font-medium">Pompéu/MG</strong>
              Rua Aurora Alves, 266 — Centro
            </div>
            <div className="text-[14px]">
              WhatsApp: (31) 99427-3473<br />
              Seg. a sex., 9h às 17h<br />
              joycevidatelecom@gmail.com
            </div>
          </div>

          {/* Redes */}
          <div className="flex flex-col gap-3 items-start">
            <h4 className="text-gold-300 text-[13px] uppercase tracking-widest font-medium mb-2">Conecte-se</h4>
            <a href="https://instagram.com/joycealvesora" target="_blank" rel="noopener noreferrer" className="text-[14px] hover:text-gold-300 transition-colors">
              Instagram @joycealvesora
            </a>
            <a href="https://tiktok.com/@joycealvesora" target="_blank" rel="noopener noreferrer" className="text-[14px] hover:text-gold-300 transition-colors mb-4">
              TikTok @joycealvesora
            </a>
            <Button 
              variant="outline" 
              className="text-[13px] px-6 py-2 border-gold-400/50 text-cream hover:bg-gold-400/10 w-full sm:w-auto"
              onClick={() => window.open(getWhatsappLink(WHATSAPP_MESSAGES.geral), '_blank')}
            >
              Agendar avaliação
            </Button>
          </div>
        </div>

        <div className="w-full h-px bg-gold-400/10 mb-8" />

        {/* Legal */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[12px] text-cream/40 text-center md:text-left">
          <p>© 2026 Joyce Alves · Todos os direitos reservados</p>
          <div className="flex gap-4">
            <span className="hover:text-cream/80 cursor-pointer transition-colors">Política de Privacidade</span>
            <span>·</span>
            <span className="hover:text-cream/80 cursor-pointer transition-colors">LGPD</span>
          </div>
          <p>Aviso: Resultados podem variar conforme cada organismo. Atendimentos presenciais e online.</p>
        </div>
      </Container>
    </footer>
  );
}
