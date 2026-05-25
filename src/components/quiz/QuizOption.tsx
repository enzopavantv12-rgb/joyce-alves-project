import { Check } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface QuizOptionProps {
  label: string;
  icon: LucideIcon;
  selected: boolean;
  onClick: () => void;
}

export const QuizOption = ({ label, icon: Icon, selected, onClick }: QuizOptionProps) => {
  return (
    <button
      onClick={onClick}
      className={`
        w-full text-left
        flex items-center gap-4
        px-5 py-4
        rounded-lg
        border transition-all duration-300
        focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400
        ${selected 
          ? 'border-gold-400 bg-gold-400/10 text-ink' 
          : 'border-gold-400/20 bg-ivory text-ink-soft hover:border-gold-400/40 hover:bg-cream'
        }
      `}
    >
      {/* Icon on left */}
      <div className={`
        flex-shrink-0
        w-10 h-10 rounded-full
        flex items-center justify-center
        transition-colors duration-300
        ${selected 
          ? 'bg-gold-400/20 text-gold-500' 
          : 'bg-cocoa-700/5 text-cocoa-600/60'
        }
      `}>
        <Icon className="w-5 h-5 stroke-[1.25]" />
      </div>
      
      {/* Label text */}
      <span className="flex-1 text-sm md:text-base leading-snug font-body">
        {label}
      </span>
      
      {/* Check indicator */}
      <div className={`
        w-5 h-5 rounded-full border-2 
        flex items-center justify-center
        transition-all duration-300
        ${selected 
          ? 'border-gold-400 bg-gold-400' 
          : 'border-gold-400/30 bg-transparent'
        }
      `}>
        {selected && <Check className="w-3 h-3 stroke-[3] text-cream" />}
      </div>
    </button>
  );
};
