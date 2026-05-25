import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface QuizNavigationProps {
  currentStep: number;
  isStepValid: boolean;
  goBack: () => void;
  goNext: () => void;
}

export const QuizNavigation = ({
  currentStep,
  isStepValid,
  goBack,
  goNext
}: QuizNavigationProps) => {
  return (
    <div className="flex items-center justify-between mt-10 pt-6 border-t border-gold-400/15">
      {/* Back button (hidden on step 1) */}
      {currentStep > 1 && (
        <button
          onClick={goBack}
          className="inline-flex items-center gap-2 text-sm text-ink-soft hover:text-ink transition-colors duration-300 font-body focus:outline-none"
        >
          <ArrowLeft className="w-4 h-4 stroke-1" />
          <span>Voltar</span>
        </button>
      )}
      
      <div className="flex-1" />
      
      {/* Continue / Submit Button */}
      <button
        onClick={goNext}
        disabled={!isStepValid}
        className={`
          inline-flex items-center gap-3
          px-8 py-4
          text-sm tracking-[0.15em] uppercase font-medium
          transition-all duration-300 font-body focus:outline-none
          ${isStepValid 
            ? 'bg-cocoa-700 text-cream hover:bg-cocoa-800' 
            : 'bg-cocoa-700/30 text-cream/50 cursor-not-allowed'
          }
        `}
      >
        <span>
          {currentStep === 5 ? 'Iniciar minha jornada' : 'Continuar'}
        </span>
        <ArrowRight className="w-4 h-4 stroke-1" />
      </button>
    </div>
  );
};
export default QuizNavigation;
