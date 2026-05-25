import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface QuizAnswers {
  step1?: string;
  step2?: string;
  step3?: string;
  step4?: string;
  name?: string;
  phone?: string;
}

interface QuizState {
  isOpen: boolean;
  currentStep: number;
  answers: QuizAnswers;
  source?: string;
  lastActive?: number;
  isSubmitted: boolean;
  
  openQuiz: (source?: string) => void;
  closeQuiz: () => void;
  setAnswer: (step: number, value: string) => void;
  setContactInfo: (name: string, phone: string) => void;
  goNext: () => void;
  goBack: () => void;
  reset: () => void;
  updateActivity: () => void;
  setIsSubmitted: (isSubmitted: boolean) => void;
}

export const useQuiz = create<QuizState>()(
  persist(
    (set, get) => ({
      isOpen: false,
      currentStep: 1,
      answers: {},
      source: undefined,
      lastActive: undefined,
      isSubmitted: false,
      
      openQuiz: (source) => {
        const { lastActive, reset } = get();
        // Reset if inactive for more than 30 minutes (30 * 60 * 1000 ms)
        if (lastActive && Date.now() - lastActive > 30 * 60 * 1000) {
          reset();
        }
        set({ 
          isOpen: true, 
          source,
          isSubmitted: false,
          lastActive: Date.now()
        });
      },
      
      closeQuiz: () => set({ isOpen: false }),
      
      setAnswer: (step, value) => {
        set((state) => ({
          answers: { ...state.answers, [`step${step}`]: value },
          lastActive: Date.now()
        }));
      },
      
      setContactInfo: (name, phone) => {
        set((state) => ({
          answers: { ...state.answers, name, phone },
          lastActive: Date.now()
        }));
      },
      
      goNext: () => set((state) => ({
        currentStep: Math.min(state.currentStep + 1, 5),
        lastActive: Date.now()
      })),
      
      goBack: () => set((state) => ({
        currentStep: Math.max(state.currentStep - 1, 1),
        lastActive: Date.now()
      })),
      
      reset: () => set({
        currentStep: 1,
        answers: {},
        source: undefined,
        lastActive: undefined,
        isSubmitted: false,
      }),

      updateActivity: () => set({
        lastActive: Date.now()
      }),

      setIsSubmitted: (isSubmitted) => set({
        isSubmitted,
        lastActive: Date.now()
      })
    }),
    {
      name: 'joyce-quiz-storage',
    }
  )
);
