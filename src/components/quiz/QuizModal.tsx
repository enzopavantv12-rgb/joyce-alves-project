import React, { useState, useEffect, useRef, useCallback } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useQuiz } from '../../hooks/useQuiz';
import { trackQuizEvent, QUIZ_EVENTS, calculateLeadScore } from '../../lib/quizAnalytics';

// Step components
import { Step1Identification } from './steps/Step1Identification';
import { Step2History } from './steps/Step2History';
import { Step3Emotional } from './steps/Step3Emotional';
import { Step4Timing } from './steps/Step4Timing';
import { Step5Contact } from './steps/Step5Contact';
import { QuizSuccess } from './steps/QuizSuccess';

import { QuizProgressBar } from './QuizProgressBar';
import { QuizNavigation } from './QuizNavigation';

export const QuizModal = () => {
  const { 
    isOpen, 
    currentStep, 
    answers, 
    source, 
    closeQuiz, 
    goNext, 
    goBack,
    isSubmitted,
    setIsSubmitted
  } = useQuiz();

  const [direction, setDirection] = useState(1);
  const hasTrackedOpenRef = useRef(false);

  // Track quiz opening and abandonment
  useEffect(() => {
    if (isOpen) {
      trackQuizEvent(QUIZ_EVENTS.OPEN, { source: source || 'unknown' });
      hasTrackedOpenRef.current = true;
    } else {
      if (currentStep > 0 && !isSubmitted && hasTrackedOpenRef.current) {
        trackQuizEvent(QUIZ_EVENTS.ABANDONED, { 
          step: currentStep,
          completion_rate: Math.round(((currentStep - 1) / 5) * 100)
        });
      }
      hasTrackedOpenRef.current = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const handleNext = useCallback(() => {
    let stepLabel = '';
    let answerVal = '';
    if (currentStep === 1) {
      answerVal = answers.step1 || '';
      stepLabel = 'identificacao';
    } else if (currentStep === 2) {
      answerVal = answers.step2 || '';
      stepLabel = 'historico';
    } else if (currentStep === 3) {
      answerVal = answers.step3 || '';
      stepLabel = 'emocional';
    } else if (currentStep === 4) {
      answerVal = answers.step4 || '';
      stepLabel = 'timing';
    }
    
    trackQuizEvent(QUIZ_EVENTS.STEP_COMPLETE, {
      step: currentStep,
      answer: answerVal,
      step_label: stepLabel
    });

    setDirection(1);
    goNext();
  }, [currentStep, answers, goNext]);

  const handleBack = () => {
    setDirection(-1);
    goBack();
  };

  const handleSubmit = useCallback(() => {
    trackQuizEvent(QUIZ_EVENTS.STEP_COMPLETE, {
      step: 5,
      answer: 'dados_contato',
      step_label: 'contato'
    });

    const leadScore = calculateLeadScore(answers);
    trackQuizEvent(QUIZ_EVENTS.COMPLETED, {
      ...answers,
      lead_score: leadScore
    });

    trackQuizEvent('Lead', {
      value: 1.0,
      currency: 'BRL',
      lead_score: leadScore
    });

    setIsSubmitted(true);
  }, [answers, setIsSubmitted]);

  const isStepValid = useCallback(() => {
    if (currentStep === 1) return !!answers.step1;
    if (currentStep === 2) return !!answers.step2;
    if (currentStep === 3) return !!answers.step3;
    if (currentStep === 4) return !!answers.step4;
    if (currentStep === 5) {
      const cleanPhone = (answers.phone || '').replace(/\D/g, '');
      return (answers.name || '').trim().length >= 2 && cleanPhone.length >= 10;
    }
    return false;
  }, [currentStep, answers]);

  const renderStep = () => {
    if (currentStep === 1) return <Step1Identification />;
    if (currentStep === 2) return <Step2History />;
    if (currentStep === 3) return <Step3Emotional />;
    if (currentStep === 4) return <Step4Timing />;
    if (currentStep === 5) return <Step5Contact />;
    return null;
  };

  // Keyboard navigation within the modal: Enter keys to move forward
  useEffect(() => {
    if (!isOpen || isSubmitted) return;
    const handleEnter = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && isStepValid()) {
        e.preventDefault();
        if (currentStep === 5) {
          handleSubmit();
        } else {
          handleNext();
        }
      }
    };
    window.addEventListener('keydown', handleEnter);
    return () => window.removeEventListener('keydown', handleEnter);
  }, [isOpen, currentStep, answers, isSubmitted, isStepValid, handleSubmit, handleNext]);

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -80 : 80,
      opacity: 0
    })
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => { if (!open) closeQuiz(); }}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-cocoa-800/85 backdrop-blur-xl transition-opacity duration-300" />
        
        <Dialog.Content 
          className="
            fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50
            w-[calc(100%-2rem)] max-w-2xl max-h-[95vh] md:max-h-[85vh]
            rounded-[24px] bg-cream border border-gold-400/20
            p-6 md:p-12 overflow-y-auto outline-none
            flex flex-col
          "
          style={{
            boxShadow: `
              0 40px 100px -20px rgba(58, 37, 25, 0.4),
              0 16px 40px -8px rgba(58, 37, 25, 0.2)
            `,
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Cpath d='M30 0L60 30L30 60L0 30Z' fill='none' stroke='%23C6A16E' stroke-width='0.2'/%3E%3C/svg%3E")`,
            backgroundSize: '120px 120px',
          }}
        >
          {/* Header block */}
          <div className="flex items-center justify-between mb-8 select-none shrink-0">
            <div className="flex flex-col">
              <span className="text-[10px] tracking-[0.3em] uppercase text-gold-500 font-medium font-body">
                MÉTODO LUMINAPELE 360°
              </span>
              <span className="font-display text-lg text-ink mt-1">
                Avaliação personalizada
              </span>
            </div>
            
            <Dialog.Close className="
              w-10 h-10 rounded-full
              flex items-center justify-center
              text-cocoa-700 hover:bg-cocoa-700/5
              transition-colors duration-300 focus:outline-none
            " aria-label="Fechar avaliação">
              <X className="w-5 h-5 stroke-[1.5]" />
            </Dialog.Close>
          </div>

          {!isSubmitted ? (
            <div className="flex-1 flex flex-col justify-between">
              {/* Progress bar */}
              <QuizProgressBar currentStep={currentStep} />

              {/* Step content transition wrapper */}
              <div className="flex-1 relative overflow-hidden py-2 min-h-[280px]">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={currentStep}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full h-full"
                  >
                    {renderStep()}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Footer navigation */}
              <QuizNavigation
                currentStep={currentStep}
                isStepValid={isStepValid()}
                goBack={handleBack}
                goNext={currentStep === 5 ? handleSubmit : handleNext}
              />
            </div>
          ) : (
            <QuizSuccess answers={answers} />
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
export default QuizModal;
