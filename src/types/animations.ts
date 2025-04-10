/**
 * Types for animations and transitions in the application
 */

import { Target, TargetAndTransition, Transition } from 'framer-motion';

/**
 * Represents common animation variants for elements
 */
export interface AnimationVariants {
  /** Initial state when component mounts */
  initial: Target;
  /** Animated state to transition to */
  animate: TargetAndTransition;
  /** Exit state when component unmounts */
  exit?: TargetAndTransition;
}

/**
 * Animation properties for framer-motion components
 */
export interface AnimationProps {
  /** Initial animation state */
  initial?: Target;
  /** Target animation state */
  animate?: TargetAndTransition;
  /** Exit animation state */
  exit?: TargetAndTransition;
  /** Transition properties */
  transition?: Transition;
  /** Variants for more complex animations */
  variants?: Record<string, Target | TargetAndTransition>;
}

/**
 * Animation variants for page transitions
 */
export const pageTransitionVariants: AnimationVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

/**
 * Animation variants for modal/dialog transitions
 */
export const modalTransitionVariants: AnimationVariants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
};

/**
 * Standard transition properties
 */
export const standardTransition: Transition = {
  duration: 0.4,
  ease: 'easeInOut',
};

/**
 * Faster transition for micro-interactions
 */
export const quickTransition: Transition = {
  duration: 0.2,
  ease: 'easeOut',
};

/**
 * Gradient animation properties
 */
export interface GradientAnimationProps {
  /** Background size for the gradient */
  backgroundSize: string;
  /** Transition properties for the gradient animation */
  transition: string;
  /** Opacity of the gradient text */
  opacity: number;
}

/**
 * Mouse position tracking type
 */
export interface MousePosition {
  /** X coordinate relative to the element */
  x: number;
  /** Y coordinate relative to the element */
  y: number;
}
