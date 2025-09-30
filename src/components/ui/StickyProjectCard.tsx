import { Project } from '@/data/projects';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { RefObject, useRef, useState } from 'react';
import { ProjectMockup } from './ProjectMockup';
import Link from 'next/link';

interface StickyProjectCardProps {
  project: Project;
  index: number;
  total: number;
  containerRef: RefObject<HTMLDivElement>;
}

const StickyProjectCard: React.FC<StickyProjectCardProps> = ({ project, index, total: _total, containerRef }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

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


  return (
    <Link href={`/casestudy/${project.slug}`}>
      <motion.div
        ref={cardRef}
        className={`sticky-project-card sticky top-[96px] min-h-[500px] mb-8 mt-0 bg-white rounded-xl flex flex-col md:flex-row items-center justify-center gap-8 shadow-2xl shadow-indigo-200 group relative overflow-visible cursor-pointer`}
        style={{ zIndex: 10 + index, scale, boxShadow }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
      >
      {/* Left side: Project mockup */}
      <div className="relative w-full md:w-1/2 h-full min-h-[280px] flex items-stretch justify-stretch">
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
          <div className="flex flex-row gap-8 mt-2 mb-6 justify-center md:justify-start">
            {project.stats.slice(0, 2).map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center md:items-start">
                <span className="text-xl font-extrabold text-foreground">{stat.value}</span>
                <span className="text-xs font-medium text-muted uppercase tracking-wide mt-1">{stat.label}</span>
              </div>
            ))}
          </div>
        )}

        {/* Hover overlay circle */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="absolute rounded-full p-0.5 bg-gradient-to-r from-blue-500 to-pink-500 shadow-lg pointer-events-none"
              style={{
                zIndex: 30,
                left: mousePosition.x - 80, // Adjust for chip width
                top: mousePosition.y - 20, // Adjust for chip height
                transform: 'translate(0, 0)' // Reset any default transforms
              }}
            >
              <div className="px-4 py-2 rounded-full bg-white">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold whitespace-nowrap text-gray-600">
                    View Case Study
                  </span>
                  <svg
                    className="w-4 h-4 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      </motion.div>
    </Link>
  );
};

export default StickyProjectCard;
