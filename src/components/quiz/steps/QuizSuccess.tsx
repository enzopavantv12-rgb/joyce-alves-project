import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowUpRight } from 'lucide-react';
import type { QuizAnswers } from '../../../hooks/useQuiz';
import { QUIZ_STEPS } from '../../../lib/quizData';

interface QuizSuccessProps {
  answers: QuizAnswers;
}

export const QuizSuccess = ({ answers }: QuizSuccessProps) => {
  const name = answers.name || '';

  const getOptionLabel = (stepIndex: number, optionId?: string) => {
    if (!optionId) return '';
    const option = QUIZ_STEPS[stepIndex].options.find(opt => opt.id === optionId);
    return option ? option.label : optionId;
  };

  const buildWhatsappUrl = () => {
    const step1Label = getOptionLabel(0, answers.step1);
    const step2Label = getOptionLabel(1, answers.step2);
    const step3Label = getOptionLabel(2, answers.step3);
    const step4Label = getOptionLabel(3, answers.step4);

    const message = `Olá! Vim pelo site e gostaria de saber mais sobre o Método Luminapele.

Meu nome é ${name}.

Sobre meu caso:

- Principal queixa: ${step1Label}
- Histórico: ${step2Label}
- Como me sinto: ${step3Label}
- Quando quero começar: ${step4Label}

Aguardo seu retorno!`;

    const encoded = encodeURIComponent(message);
    return `https://wa.me/5531994273473?text=${encoded}`;
  };

  const handleWhatsappRedirect = () => {
    window.open(buildWhatsappUrl(), '_blank');
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = buildWhatsappUrl();
    }, 1500);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-12"
    >
      {/* Success checkmark */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring' }}
        className="w-20 h-20 mx-auto mb-8 rounded-full bg-gold-400/15 border border-gold-400/40 flex items-center justify-center"
      >
        <Check className="w-10 h-10 stroke-1 text-gold-500" />
      </motion.div>
      
      <h2 className="font-display font-light text-ink text-3xl mb-4">
        Pronto, {name}!
      </h2>
      
      <p className="text-ink-soft text-base mb-8 max-w-md mx-auto leading-relaxed font-body">
        Estamos te redirecionando para o WhatsApp para que possamos conversar com mais profundidade sobre seu caso.
      </p>
      
      <p className="text-xs text-ink-muted italic mb-6 font-body">
        Caso não abra automaticamente, clique no botão abaixo.
      </p>
      
      <button
        onClick={handleWhatsappRedirect}
        className="inline-flex items-center gap-3 px-8 py-4 bg-cocoa-700 text-cream text-sm tracking-[0.15em] uppercase font-medium hover:bg-cocoa-800 transition-all duration-300 font-body"
      >
        <span>Abrir WhatsApp</span>
        <ArrowUpRight className="w-4 h-4 stroke-1" />
      </button>
    </motion.div>
  );
};
export default QuizSuccess;
