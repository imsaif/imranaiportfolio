import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useRef, useState } from 'react';
import Button from './Button';

interface CursorFollowButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export const CursorFollowButton = ({ href, children, className = '' }: CursorFollowButtonProps) => {
  const containerRef = useRef<HTMLSpanElement>(null);
  const [isHover, setIsHover] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Magnetic translation values
  const tx = useSpring(0, { stiffness: 300, damping: 30 });
  const ty = useSpring(0, { stiffness: 300, damping: 30 });

  // For highlight effect (optional)
  const springX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseX.set(x);
    mouseY.set(y);
    // Calculate offset from center, limit to 24px
    const dx = x - rect.width / 2;
    const dy = y - rect.height / 2;
    const maxDist = 24;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const factor = dist > maxDist ? maxDist / dist : 1;
    tx.set(dx * factor);
    ty.set(dy * factor);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
    tx.set(0);
    ty.set(0);
  };

  return (
    <span
      ref={containerRef}
      className="relative inline-block group"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={handleMouseLeave}
      style={{ overflow: 'hidden' }}
    >
      {/* Optional: Animated highlight */}
      <motion.span
        className="absolute left-0 top-0 w-full h-full pointer-events-none z-0"
        style={{
          opacity: isHover ? 1 : 0.8,
          background: 'radial-gradient(circle at var(--x, var(--y)), rgba(99,102,241,0.15) 0%, transparent 70%)',
        }}
        animate={
          {
            '--x': `${springX.get()}px`,
            '--y': `${springY.get()}px`,
          } as any
        }
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      />
      <motion.span
        className="block relative z-10"
        style={{
          x: tx,
          y: ty,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <Button href={href} variant="primary" className={`relative z-10 ${className}`}>
          {children}
        </Button>
      </motion.span>
    </span>
  );
};
