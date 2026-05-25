import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Flower2, Droplets, HeartHandshake, Leaf, CircleDot } from 'lucide-react';
import { cn } from '../../lib/utils';


interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface ServicesRelaxSectionProps {
  eyebrow?: string;
  title?: string;
  services?: ServiceItem[];
  buttonText?: string;
  onButtonClick?: () => void;
  className?: string;
}

const defaultServices: ServiceItem[] = [
  {
    id: 's1',
    title: 'The thermal bath',
    description: 'Lorem ipsum dolor sit amet, his dicant tritani in. Doctus cetero euripidis in duo.',
    icon: (
      <div className="relative flex items-center justify-center w-full h-full">
        <Droplets className="w-10 h-10 text-cream stroke-[1.5]" />
        <CircleDot className="absolute w-4 h-4 text-gold-300 stroke-[2] -bottom-1 -right-1" />
      </div>
    ),
  },
  {
    id: 's2',
    title: 'Relaxing massage',
    description: 'Lorem ipsum dolor sit amet, his dicant tritani in. Doctus cetero euripidis in duo.',
    icon: (
      <div className="relative flex items-center justify-center w-full h-full">
        <HeartHandshake className="w-10 h-10 text-cream stroke-[1.5]" />
        <Sparkles className="absolute w-4 h-4 text-gold-300 stroke-[2] -top-1 -right-1" />
      </div>
    ),
  },
  {
    id: 's3',
    title: 'Body treatments',
    description: 'Lorem ipsum dolor sit amet, his dicant tritani in. Doctus cetero euripidis in duo.',
    icon: (
      <div className="relative flex items-center justify-center w-full h-full">
        <Sparkles className="w-10 h-10 text-cream stroke-[1.5]" />
        <div className="absolute w-2 h-[2px] bg-gold-300 -bottom-2" />
      </div>
    ),
  },
  {
    id: 's4',
    title: 'Supreme skincare',
    description: 'Lorem ipsum dolor sit amet, his dicant tritani in. Doctus cetero euripidis in duo.',
    icon: (
      <div className="relative flex items-center justify-center w-full h-full">
        <Flower2 className="w-10 h-10 text-cream stroke-[1.5]" />
        <Leaf className="absolute w-4 h-4 text-gold-300 stroke-[2] -bottom-1 -left-1" />
      </div>
    ),
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut' as const,
    },
  },
};

export const ServicesRelaxSection: React.FC<ServicesRelaxSectionProps> = ({
  eyebrow = 'RANGE OF SERVICES',
  title = 'It is time to relax!',
  services = defaultServices,
  buttonText = 'SEE ALL SERVICES',
  onButtonClick,
  className,
}) => {
  return (
    <section className={cn('w-full bg-[#6E4B3A] py-14 md:py-[70px]', className)}>
      <div className="max-w-[1180px] mx-auto px-6 flex flex-col items-center">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={itemVariants}
          className="flex flex-col items-center text-center"
        >
          <Flower2 className="w-[22px] h-[22px] text-gold-300 stroke-[1.5]" />
          <p className="mt-2 text-[9px] md:text-[11px] font-semibold tracking-[0.25em] uppercase text-gold-300/80">
            {eyebrow}
          </p>
          <h2 className="mt-[14px] text-[32px] md:text-[38px] font-semibold font-display text-cream leading-[1.15] mb-[54px]">
            {title}
          </h2>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-[70px] w-full justify-items-center"
        >
          {services.map((service, index) => {
            // Slight variations in border-radius to make blobs look organic and unique
            const borderRadiusVariations = [
              '55% 45% 60% 40% / 45% 60% 40% 55%',
              '45% 55% 40% 60% / 60% 40% 55% 45%',
              '50% 50% 60% 40% / 40% 60% 50% 50%',
              '60% 40% 55% 45% / 55% 45% 60% 40%',
            ];
            const currentRadius = borderRadiusVariations[index % 4];

            return (
              <motion.div
                key={service.id}
                variants={itemVariants}
                className="flex flex-col items-center text-center w-full max-w-[220px]"
              >
                {/* Blob & Icon */}
                <div className="relative flex items-center justify-center w-[90px] h-[92px] mb-[16px]">
                  <div
                    className="absolute inset-0 bg-cream/5"
                    style={{ borderRadius: currentRadius }}
                  />
                  <div className="relative z-10 w-full h-full flex items-center justify-center">
                    {service.icon}
                  </div>
                </div>

                {/* Text Content */}
                <h3 className="text-[14px] md:text-[15px] font-semibold font-display text-cream">
                  {service.title}
                </h3>
                <p className="mt-[12px] text-[10px] md:text-[11px] leading-[1.7] text-cream/70 max-w-[170px]">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Button */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-[48px]"
        >
          <button
            onClick={onButtonClick}
            className="flex items-center justify-center w-[150px] h-[38px] rounded-full border border-gold-300 text-[9px] md:text-[10px] font-bold tracking-[0.15em] uppercase text-gold-300 hover:bg-gold-300 hover:text-[#6E4B3A] transition-colors duration-250"
          >
            {buttonText}
          </button>
        </motion.div>
      </div>
    </section>
  );
};
