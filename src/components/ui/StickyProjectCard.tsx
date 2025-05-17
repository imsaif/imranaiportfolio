import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useRef, RefObject } from 'react';
import { ProjectMockup } from './ProjectMockup';
import { Project } from '@/data/projects';

interface StickyProjectCardProps {
  project: Project;
  index: number;
  total: number;
  containerRef: RefObject<HTMLDivElement>;
}

const StickyProjectCard: React.FC<StickyProjectCardProps> = ({ project, index, total, containerRef }) => {
  const cardRef = useRef<HTMLDivElement>(null);

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
    <motion.div
      ref={cardRef}
      className={`sticky top-[96px] min-h-[400px] ${index !== total - 1 ? 'mb-12' : 'mb-0'} ${index === 0 ? 'mt-0' : 'mt-12'} bg-white rounded-xl flex flex-col md:flex-row items-center justify-center gap-8 shadow-2xl shadow-indigo-200`}
      style={{ zIndex: 10 + index, scale, boxShadow }}
    >
      {/* Left side: Project mockup */}
      <div className="flex items-center justify-center px-8 pb-0 md:pb-0">
        <ProjectMockup project={project} />
      </div>
      {/* Right side: Text content */}
      <div className="w-full md:w-1/2 flex flex-col items-start justify-center text-left pl-0 md:pl-12 z-20 p-8 pt-0">
        {project.slug === 'scheduler' ? (
          <>
            <h3 className="text-2xl md:text-4xl font-bold mb-1 text-black drop-shadow-lg">EduScheduler</h3>
          </>
        ) : project.slug === 'lessonloom' ? (
          <>
            <h3 className="text-2xl md:text-4xl font-bold mb-1 text-black drop-shadow-lg">LessonLoom</h3>
          </>
        ) : (
          <h3 className="text-2xl md:text-4xl font-bold mb-4 text-black drop-shadow-lg">{project.title}</h3>
        )}
        <p className="text-base md:text-lg text-black mb-8 leading-relaxed drop-shadow-lg">{project.description}</p>
        <Link
          href={
            project.slug === 'scheduler' || project.slug === 'lessonloom'
              ? `/casestudy/${project.slug}`
              : `/projects/${project.slug}`
          }
          className="inline-flex items-center font-medium cursor-pointer group"
        >
          <span className="inline-flex font-semibold relative z-10 bg-gradient-to-r from-indigo-500 via-pink-600 to-red-600 bg-clip-text text-transparent drop-shadow-sm group-hover:drop-shadow-md">
            View case study
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 ml-1 text-pink-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </Link>
        <span className="mt-8 inline-block uppercase tracking-wide text-xs font-bold text-indigo-700 bg-indigo-50 rounded px-3 py-1">
          {project.tagline}
        </span>
      </div>
    </motion.div>
  );
};

export default StickyProjectCard;
