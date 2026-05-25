import React from 'react';
import { useQuiz } from '../../../hooks/useQuiz';
import { QUIZ_STEPS } from '../../../lib/quizData';
import { QuizOption } from '../QuizOption';

export const Step1Identification = () => {
  const { answers, setAnswer } = useQuiz();
  const stepData = QUIZ_STEPS[0];
  const selected = answers.step1;

  return (
    <div>
      <h2 className="font-display font-light text-ink text-2xl md:text-3xl leading-tight mb-3">
        O que mais te incomoda <em className="italic text-cocoa-600 font-light">hoje</em>?
      </h2>
      <p className="text-ink-soft text-sm md:text-base mb-8 font-body">
        {stepData.subtitle}
      </p>
      <div className="flex flex-col gap-3">
        {stepData.options.map((option) => (
          <QuizOption
            key={option.id}
            label={option.label}
            icon={option.icon}
            selected={selected === option.id}
            onClick={() => setAnswer(1, option.id)}
          />
        ))}
      </div>
    </div>
  );
};
export default Step1Identification;
