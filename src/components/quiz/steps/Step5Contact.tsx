import React from 'react';
import { useQuiz } from '../../../hooks/useQuiz';

export const Step5Contact = () => {
  const { answers, setContactInfo } = useQuiz();
  const name = answers.name || '';
  const phone = answers.phone || '';

  const formatPhone = (val: string) => {
    const clean = val.replace(/\D/g, '');
    if (clean.length === 0) return '';
    if (clean.length <= 2) return `(${clean}`;
    if (clean.length <= 6) return `(${clean.slice(0, 2)}) ${clean.slice(2)}`;
    if (clean.length <= 10) return `(${clean.slice(0, 2)}) ${clean.slice(2, 6)}-${clean.slice(6)}`;
    return `(${clean.slice(0, 2)}) ${clean.slice(2, 7)}-${clean.slice(7, 11)}`;
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContactInfo(e.target.value, phone);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContactInfo(name, formatPhone(e.target.value));
  };

  return (
    <div>
      <h2 className="font-display font-light text-ink text-2xl md:text-3xl leading-tight mb-3">
        Quase lá, <em className="italic text-cocoa-600 font-light">última etapa</em>.
      </h2>
      <p className="text-ink-soft text-sm md:text-base mb-8 font-body">
        Vou te enviar uma mensagem personalizada pelo WhatsApp para conversarmos sobre o seu caso.
      </p>

      {/* Campo nome */}
      <div className="mb-5">
        <label className="block text-xs tracking-[0.15em] uppercase text-ink-muted font-medium mb-2 font-body">
          Como você prefere ser chamada?
        </label>
        <input
          type="text"
          value={name}
          onChange={handleNameChange}
          placeholder="Seu primeiro nome"
          className="w-full px-5 py-4 bg-ivory border border-gold-400/30 rounded-lg text-ink text-base focus:outline-none focus:border-gold-400 focus:bg-cream transition-all duration-300 font-body"
          autoFocus
        />
      </div>

      {/* Campo telefone */}
      <div className="mb-8">
        <label className="block text-xs tracking-[0.15em] uppercase text-ink-muted font-medium mb-2 font-body">
          WhatsApp para contato
        </label>
        <input
          type="tel"
          value={phone}
          onChange={handlePhoneChange}
          placeholder="(31) 99999-9999"
          className="w-full px-5 py-4 bg-ivory border border-gold-400/30 rounded-lg text-ink text-base focus:outline-none focus:border-gold-400 focus:bg-cream transition-all duration-300 font-body"
          maxLength={15}
        />
      </div>

      <p className="text-xs text-ink-muted italic mb-4 leading-relaxed font-body">
        Seus dados são tratados com confidencialidade total. Nossa equipe entrará em contato em horário comercial (Seg-Sex, 9h-17h).
      </p>
    </div>
  );
};
export default Step5Contact;
