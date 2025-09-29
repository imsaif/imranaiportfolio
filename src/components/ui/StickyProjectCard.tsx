import { Project } from '@/data/projects';
import { motion, useScroll, useTransform } from 'framer-motion';
import { RefObject, useRef, useState } from 'react';
import Button from './Button';
import { ProjectMockup } from './ProjectMockup';

interface StickyProjectCardProps {
  project: Project;
  index: number;
  total: number;
  containerRef: RefObject<HTMLDivElement>;
  onProjectClick?: (project: Project) => void;
}

const StickyProjectCard: React.FC<StickyProjectCardProps> = ({ project, index, total: _total, containerRef, onProjectClick }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [buttonPos, setButtonPos] = useState<{ x: number; y: number } | null>(null);

  const BUTTON_SIZE = 64; // px, should match the button's width/height
  const BUTTON_RADIUS = BUTTON_SIZE / 2;

  // Set up scroll progress for this card
  const { scrollYProgress } = useScroll({
    target: cardRef,
    container: containerRef,
    offset: ['start end', 'end start'],
  });

  // Animate scale and shadow as the card becomes active
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.96, 1, 0.96]);
  const boxShadow = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [
      '0 4px 16px rgba(99,102,241,0.08), 0 1.5px 8px rgba(0,0,0,0.08)',
      '0 12px 48px rgba(99,102,241,0.18), 0 4px 24px rgba(0,0,0,0.12)',
      '0 4px 16px rgba(99,102,241,0.08), 0 1.5px 8px rgba(0,0,0,0.08)',
    ]
  );

  // Handler to update button position on mouse move
  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;
    // Clamp so the button stays fully inside the card
    x = Math.max(BUTTON_RADIUS, Math.min(rect.width - BUTTON_RADIUS, x));
    y = Math.max(BUTTON_RADIUS, Math.min(rect.height - BUTTON_RADIUS, y));
    setButtonPos({ x, y });
  };

  const handleMouseLeave = () => {
    setButtonPos(null);
  };

  return (
    <motion.div
      ref={cardRef}
      className={`sticky-project-card sticky top-[96px] min-h-[400px] mb-8 mt-0 bg-white rounded-xl flex flex-col md:flex-row items-center justify-center gap-8 shadow-2xl shadow-indigo-200 group relative overflow-visible`}
      style={{ zIndex: 10 + index, scale, boxShadow }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Floating magnetic button that follows the cursor */}
      {buttonPos && (
        <motion.div
          className="absolute z-30"
          style={{
            left: buttonPos.x,
            top: buttonPos.y,
            transform: 'translate(-50%, -50%)',
          }}
          animate={{ left: buttonPos.x, top: buttonPos.y }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          <Button
            onClick={() => onProjectClick?.(project)}
            variant="outline"
            className="w-40 h-12 flex items-center justify-center text-base font-semibold"
          >
            View Project
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Button>
        </motion.div>
      )}
      {/* Left side: Project mockup */}
      <div className="relative w-full md:w-1/2 h-full min-h-[220px] flex items-stretch justify-stretch">
        <ProjectMockup project={project} />
      </div>
      {/* Right side: Text content */}
      <div className="w-full md:w-1/2 flex flex-col items-center md:items-start justify-center text-center md:text-left pl-0 md:pl-12 z-20 p-8 pt-0">
        <span className="mb-4 inline-block uppercase tracking-wide text-xs font-bold text-indigo-700 bg-indigo-50 rounded px-3 py-1">
          {project.tagline}
        </span>
        {project.slug === 'scheduler' ? (
          <>
            <h3 className="text-2xl md:text-4xl font-bold mb-1 text-foreground">EduScheduler</h3>
          </>
        ) : project.slug === 'lessonloom' ? (
          <>
            <h3 className="text-2xl md:text-4xl font-bold mb-1 text-foreground">LessonLoom</h3>
          </>
        ) : (
          <h3 className="text-2xl md:text-4xl font-bold mb-4 text-foreground">{project.title}</h3>
        )}
        <p className="text-base md:text-lg text-muted mb-6 leading-relaxed">{project.description}</p>
        
        
        {project.stats && project.stats.length > 0 && (
          <div className="flex flex-row gap-8 mt-2 mb-2 justify-center md:justify-start">
            {project.stats.slice(0, 2).map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center md:items-start">
                <span className="text-xl font-extrabold text-foreground">{stat.value}</span>
                <span className="text-xs font-medium text-muted uppercase tracking-wide mt-1">{stat.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default StickyProjectCard;
