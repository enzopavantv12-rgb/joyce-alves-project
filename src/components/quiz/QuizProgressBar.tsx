import React from 'react';

interface QuizProgressBarProps {
  currentStep: number;
}

export const QuizProgressBar = ({ currentStep }: QuizProgressBarProps) => {
  return (
    <div className="mb-10">
      {/* Step label indicator */}
      <div className="flex items-center justify-between mb-3 font-body">
        <span className="text-xs tracking-[0.2em] uppercase text-ink-muted font-medium">
          Etapa {currentStep} de 5
        </span>
        <span className="text-xs text-ink-muted">
          {Math.round((currentStep / 5) * 100)}%
        </span>
      </div>
      
      {/* Segments progress bar */}
      <div className="flex gap-1.5">
        {[1, 2, 3, 4, 5].map((step) => (
          <div 
            key={step}
            className={`
              h-px flex-1 transition-all duration-700
              ${step <= currentStep 
                ? 'bg-gold-400 h-[2px]' 
                : 'bg-gold-400/20'
              }
            `}
          />
        ))}
      </div>
    </div>
  );
};
export default QuizProgressBar;
