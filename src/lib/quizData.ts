import { 
  Sparkles, 
  Sun, 
  Heart, 
  Shield, 
  HelpCircle, 
  XCircle, 
  Minus, 
  AlertTriangle, 
  Circle, 
  Plus, 
  EyeOff, 
  Cloud, 
  TrendingDown, 
  Sunrise, 
  Search, 
  Zap, 
  Calendar, 
  CalendarDays, 
  Eye 
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface QuizOptionData {
  id: string;
  label: string;
  icon: LucideIcon;
  meta: string;
}

export interface QuizStepData {
  step: number;
  question: string;
  subtitle: string;
  options: QuizOptionData[];
}

export const QUIZ_STEPS: QuizStepData[] = [
  {
    step: 1,
    question: "O que mais te incomoda hoje?",
    subtitle: "Vamos entender exatamente o que está acontecendo com a sua pele.",
    options: [
      {
        id: "melasma_long_term",
        label: "Melasma há muitos anos que sempre volta",
        icon: Sparkles,
        meta: "melasma_crnico"
      },
      {
        id: "dark_spots_recent",
        label: "Manchas escuras no rosto que apareceram recentemente",
        icon: Sun,
        meta: "manchas_recentes"
      },
      {
        id: "spots_emotional_fatigue",
        label: "Pele com manchas + cansaço emocional",
        icon: Heart,
        meta: "manchas_emocional"
      },
      {
        id: "prevention_care",
        label: "Quero prevenir e cuidar antes que piore",
        icon: Shield,
        meta: "prevencao"
      },
      {
        id: "other_aesthetic_issue",
        label: "Outro tipo de questão estética",
        icon: HelpCircle,
        meta: "outros"
      }
    ]
  },
  {
    step: 2,
    question: "Você já tentou outros tratamentos antes?",
    subtitle: "Não tem resposta certa — é só pra eu entender sua história.",
    options: [
      {
        id: "tried_many_failed",
        label: "Sim, vários — e nenhum funcionou de verdade",
        icon: XCircle,
        meta: "highly_qualified"
      },
      {
        id: "tried_some_partial",
        label: "Sim, alguns — com resultados parciais",
        icon: Minus,
        meta: "medium_qualified"
      },
      {
        id: "tried_rebound_sensitive",
        label: "Sim, mas tive efeito rebote ou pele sensibilizada",
        icon: AlertTriangle,
        meta: "highly_qualified"
      },
      {
        id: "no_first_treatment",
        label: "Ainda não — esse é meu primeiro tratamento",
        icon: Circle,
        meta: "newcomer"
      },
      {
        id: "dermato_complementary",
        label: "Faço acompanhamento com dermato e quero algo complementar",
        icon: Plus,
        meta: "medium_qualified"
      }
    ]
  },
  {
    step: 3,
    question: "Como você tem se sentido com a sua pele ultimamente?",
    subtitle: "Sem julgamentos — sua resposta vai me ajudar a personalizar seu cuidado.",
    options: [
      {
        id: "insecure_no_makeup",
        label: "Insegura — evito sair sem maquiagem",
        icon: EyeOff,
        meta: "hot_lead"
      },
      {
        id: "tired_no_selfcare",
        label: "Cansada — sinto que cuido de todos menos de mim",
        icon: Cloud,
        meta: "hot_lead"
      },
      {
        id: "frustrated_no_lasting_results",
        label: "Frustrada — invisto e os resultados não duram",
        icon: TrendingDown,
        meta: "hot_lead"
      },
      {
        id: "hopeful_restart_different",
        label: "Esperançosa — quero recomeçar com algo diferente",
        icon: Sunrise,
        meta: "warm_lead"
      },
      {
        id: "curious_integrative_approach",
        label: "Curiosa — quero entender essa abordagem integrativa",
        icon: Search,
        meta: "warm_lead"
      }
    ]
  },
  {
    step: 4,
    question: "Quando você gostaria de começar?",
    subtitle: "Sua resposta ajuda nossa equipe a organizar a agenda do mês.",
    options: [
      {
        id: "start_this_week",
        label: "Esta semana, se possível",
        icon: Zap,
        meta: "priority_high"
      },
      {
        id: "start_next_two_weeks",
        label: "Nas próximas duas semanas",
        icon: Calendar,
        meta: "priority_high"
      },
      {
        id: "start_this_month",
        label: "Neste mês",
        icon: CalendarDays,
        meta: "priority_medium"
      },
      {
        id: "researching_no_rush",
        label: "Estou pesquisando, sem pressa",
        icon: Eye,
        meta: "priority_low"
      }
    ]
  }
];
