import React from 'react';

export const LiquidGlassFilter = () => {
  return (
    <svg 
      style={{ 
        position: 'absolute', 
        width: 0, 
        height: 0, 
        pointerEvents: 'none' 
      }}
      aria-hidden="true"
    >
      <defs>
        {/* Refração intensa + dispersão cromática */}
        <filter 
          id="liquid-glass" 
          x="-20%" 
          y="-20%" 
          width="140%" 
          height="140%"
        >
          {/* Turbulência sutil para criar variação orgânica */}
          <feTurbulence 
            type="fractalNoise" 
            baseFrequency="0.008 0.012" 
            numOctaves="2" 
            seed="3"
            result="turbulence"
          />
          
          {/* Refração — desloca pixels do background atrás do glass */}
          <feDisplacementMap 
            in="SourceGraphic" 
            in2="turbulence" 
            scale="18" 
            xChannelSelector="R" 
            yChannelSelector="G"
            result="displaced"
          />
          
          {/* Dispersão cromática — aberração leve nas bordas */}
          <feColorMatrix 
            in="displaced"
            type="matrix" 
            values="
              1.05 0    0    0 0
              0    1    0    0 0
              0    0    1.05 0 0
              0    0    0    1 0
            "
            result="dispersed"
          />
          
          {/* Composição final */}
          <feComposite 
            in="dispersed" 
            in2="SourceGraphic" 
            operator="atop"
          />
        </filter>
        
        {/* Versão mais intensa — para o handle central */}
        <filter 
          id="liquid-glass-strong" 
          x="-30%" 
          y="-30%" 
          width="160%" 
          height="160%"
        >
          <feTurbulence 
            type="fractalNoise" 
            baseFrequency="0.012 0.018" 
            numOctaves="3" 
            seed="5"
            result="turbulence"
          />
          
          <feDisplacementMap 
            in="SourceGraphic" 
            in2="turbulence" 
            scale="28"
            xChannelSelector="R" 
            yChannelSelector="G"
            result="displaced"
          />
          
          <feColorMatrix 
            in="displaced"
            type="matrix" 
            values="
              1.08 0    0    0 0
              0    1    0    0 0
              0    0    1.08 0 0
              0    0    0    1 0
            "
          />
        </filter>
        
        {/* Versão sutil — para o divisor vertical */}
        <filter 
          id="liquid-glass-subtle" 
          x="-10%" 
          y="-10%" 
          width="120%" 
          height="120%"
        >
          <feTurbulence 
            type="fractalNoise" 
            baseFrequency="0.020 0.025" 
            numOctaves="2" 
            seed="2"
            result="turbulence"
          />
          
          <feDisplacementMap 
            in="SourceGraphic" 
            in2="turbulence" 
            scale="6"
            xChannelSelector="R" 
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  );
};
