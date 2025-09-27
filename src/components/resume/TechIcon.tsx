import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TechStackItem } from '@/data/techStack';

interface TechIconProps {
  tech: TechStackItem;
  index: number;
  showTooltip?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animate?: boolean;
  delay?: number;
  onHover?: (isHovered: boolean) => void;
  onClick?: () => void;
}

const sizeMap = {
  sm: 32,
  md: 48,
  lg: 56,
  xl: 64
};

export const TechIcon: React.FC<TechIconProps> = ({
  tech,
  index,
  showTooltip = true,
  size = 'md',
  animate = true,
  delay = 0,
  onHover,
  onClick
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = tech.icon;
  const iconSize = sizeMap[size];

  const handleHover = (hovered: boolean) => {
    setIsHovered(hovered);
    onHover?.(hovered);
  };

  const iconVariants = {
    initial: {
      scale: 0,
      opacity: 0,
      rotate: -180
    },
    animate: {
      scale: 1,
      opacity: 1,
      rotate: 0,
      transition: {
        type: 'spring',
        stiffness: 260,
        damping: 20,
        delay: delay + index * 0.05
      }
    },
    hover: {
      scale: 1.2,
      rotate: 10,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 10
      }
    }
  };

  const floatingAnimation = {
    y: [0, -5, 0],
    transition: {
      duration: 3 + index * 0.2,
      repeat: Infinity,
      ease: 'easeInOut',
      delay: index * 0.1
    }
  };

  const tooltipVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 10
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 500,
        damping: 15
      }
    }
  };

  return (
    <motion.div
      className="tech-icon-wrapper"
      initial="initial"
      animate="animate"
      whileHover="hover"
    >
      <motion.div
        className="relative inline-flex items-center justify-center cursor-pointer"
        variants={iconVariants}
        animate={animate ? floatingAnimation : false}
        onMouseEnter={() => handleHover(true)}
        onMouseLeave={() => handleHover(false)}
        onClick={onClick}
      >
        {/* Background glow effect */}
        <motion.div
          className="absolute inset-0 rounded-full blur-xl"
          style={{
            backgroundColor: tech.color,
            opacity: isHovered ? 0.3 : 0.1
          }}
          animate={{
            scale: isHovered ? 1.5 : 1
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Icon container */}
        <motion.div
          className="relative z-10 p-4 rounded-full shadow-xl transition-all duration-300"
          style={{
            backgroundColor: isHovered ? tech.bgColor : 'rgba(255, 255, 255, 0.9)',
            borderColor: tech.color,
            borderWidth: '2px',
            borderStyle: 'solid'
          }}
          whileHover={{
            boxShadow: `0 0 20px ${tech.color}40`
          }}
        >
          <Icon
            size={iconSize}
            style={{
              color: isHovered ? tech.color : `${tech.color}CC`
            }}
            className="transition-colors duration-300"
          />
        </motion.div>

        {/* Proficiency indicator ring */}
        {isHovered && (
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{
              width: iconSize + 32,
              height: iconSize + 32,
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)'
            }}
          >
            <motion.circle
              cx="50%"
              cy="50%"
              r={(iconSize + 28) / 2}
              fill="none"
              stroke={tech.color}
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: tech.proficiency / 100 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              style={{
                opacity: 0.5,
                strokeDasharray: `${Math.PI * (iconSize + 28)}`,
                transform: 'rotate(-90deg)',
                transformOrigin: 'center'
              }}
            />
          </svg>
        )}

        {/* Tooltip */}
        {showTooltip && (
          <AnimatePresence>
            {isHovered && (
              <motion.div
                className="absolute z-20 pointer-events-none"
                style={{
                  bottom: '100%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  marginBottom: '8px'
                }}
                variants={tooltipVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                <div className="bg-gray-900 text-white px-3 py-2 rounded-lg shadow-xl whitespace-nowrap">
                  <div className="text-xs font-semibold">{tech.name}</div>
                  <div className="text-[10px] opacity-75">{tech.proficiency}% Proficiency</div>
                  {/* Tooltip arrow */}
                  <div
                    className="absolute w-0 h-0"
                    style={{
                      borderLeft: '6px solid transparent',
                      borderRight: '6px solid transparent',
                      borderTop: '6px solid rgb(17 24 39)',
                      bottom: '-6px',
                      left: '50%',
                      transform: 'translateX(-50%)'
                    }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </motion.div>
    </motion.div>
  );
};