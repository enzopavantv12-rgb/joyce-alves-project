import { trackEvent } from './analytics';
import type { QuizAnswers } from '../hooks/useQuiz';

export const trackQuizEvent = (
  eventName: string, 
  params: Record<string, unknown> = {}
) => {
  // Log to standard console logger
  trackEvent(eventName, params);

  // Google Analytics 4
  if (typeof window !== 'undefined') {
    const customWindow = window as unknown as {
      gtag?: (command: string, eventName: string, params?: Record<string, unknown>) => void;
      fbq?: (command: string, eventName: string, params?: Record<string, unknown>) => void;
    };
    if (customWindow.gtag) {
      customWindow.gtag('event', eventName, params);
    }
    
    // Meta Pixel
    if (customWindow.fbq) {
      if (eventName === 'Lead') {
        customWindow.fbq('track', 'Lead', params);
      } else {
        customWindow.fbq('trackCustom', eventName, params);
      }
    }
  }
};

export const QUIZ_EVENTS = {
  OPEN: 'quiz_opened',
  STEP_COMPLETE: 'quiz_step_completed',
  ABANDONED: 'quiz_abandoned',
  COMPLETED: 'quiz_completed',
  WHATSAPP_REDIRECT: 'quiz_whatsapp_redirect',
};

export const calculateLeadScore = (answers: QuizAnswers): number => {
  let score = 0;
  
  // Step 2
  if (answers.step2 === 'tried_many_failed' || answers.step2 === 'tried_rebound_sensitive') {
    score += 30;
  } else if (answers.step2 === 'tried_some_partial' || answers.step2 === 'dermato_complementary') {
    score += 20;
  } else if (answers.step2 === 'no_first_treatment') {
    score += 10;
  }
  
  // Step 3
  if (
    answers.step3 === 'insecure_no_makeup' || 
    answers.step3 === 'tired_no_selfcare' || 
    answers.step3 === 'frustrated_no_lasting_results'
  ) {
    score += 35;
  } else if (answers.step3 === 'hopeful_restart_different' || answers.step3 === 'curious_integrative_approach') {
    score += 20;
  }
  
  // Step 4
  if (answers.step4 === 'start_this_week' || answers.step4 === 'start_next_two_weeks') {
    score += 25;
  } else if (answers.step4 === 'start_this_month') {
    score += 15;
  } else if (answers.step4 === 'researching_no_rush') {
    score += 5;
  }
  
  return Math.min(score, 100);
};
