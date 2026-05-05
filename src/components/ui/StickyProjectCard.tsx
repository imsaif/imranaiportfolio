import { Project } from '@/data/projects';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { RefObject, useRef } from 'react';
import { MdLightbulbOutline, MdTerminal } from 'react-icons/md';
import { ProjectMockup } from './ProjectMockup';

interface StickyProjectCardProps {
  project: Project;
  index: number;
  total: number;
  containerRef: RefObject<HTMLDivElement>;
}

const StickyProjectCard: React.FC<StickyProjectCardProps> = ({ project, index, total: _total, containerRef }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    container: containerRef,
    offset: ['start end', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.96, 1, 0.96]);
  const boxShadow = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [
      '0 4px 16px rgba(22,32,54,0.06), 0 1.5px 8px rgba(0,0,0,0.05)',
      '0 12px 48px rgba(22,32,54,0.14), 0 4px 24px rgba(0,0,0,0.08)',
      '0 4px 16px rgba(22,32,54,0.06), 0 1.5px 8px rgba(0,0,0,0.05)',
    ]
  );

  const ctaHref = project.external ? project.liveUrl : `/casestudy/${project.slug}`;
  const ctaLabel = project.ctaLabel ?? (project.external ? 'Visit site' : 'View Case Study');
  const ExternalLink = ({ children }: { children: React.ReactNode }) => (
    <a href={ctaHref} target="_blank" rel="noopener noreferrer">{children}</a>
  );
  const InternalLink = ({ children }: { children: React.ReactNode }) => (
    <Link href={ctaHref}>{children}</Link>
  );
  const CTAWrapper = project.external ? ExternalLink : InternalLink;

  const renderLeftVisual = () => {
    if (project.logo) {
      return (
        <div className="relative w-full h-full min-h-[280px] flex items-center justify-center bg-grain rounded-t-xl md:rounded-l-xl md:rounded-tr-none overflow-hidden">
          <div className="relative z-10 w-32 h-32 flex items-center justify-center">
            {project.logo.type === 'image' ? (
              <Image
                src={project.logo.src}
                alt={`${project.title} logo`}
                width={128}
                height={128}
                className="object-contain"
              />
            ) : project.logo.name === 'terminal' ? (
              <MdTerminal className="w-24 h-24 text-text-primary" />
            ) : (
              <MdLightbulbOutline className="w-24 h-24 text-text-primary" />
            )}
          </div>
        </div>
      );
    }
    return <ProjectMockup project={project} />;
  };

  return (
    <motion.div
      ref={cardRef}
      className="sticky-project-card sticky top-[96px] min-h-[600px] mb-20 mt-0 bg-surface-primary rounded-xl flex flex-col md:flex-row items-center justify-center gap-8 group relative overflow-visible border border-border-primary"
      style={{ zIndex: 10 + index, scale, boxShadow }}
    >
      {/* Left side: Project visual */}
      <div className="relative w-full md:w-1/2 h-full min-h-[280px] flex items-stretch justify-stretch">
        {renderLeftVisual()}
      </div>
      {/* Right side: Text content */}
      <div className="w-full md:w-1/2 flex flex-col items-center md:items-start justify-center text-center md:text-left pl-0 md:pl-12 z-20 p-8 pt-0">
        <span className="mb-4 inline-block uppercase tracking-wide text-xs font-bold text-text-secondary bg-background-tertiary rounded px-3 py-1">
          {project.tagline}
        </span>
        <h3 className="text-2xl md:text-4xl font-bold mb-4 text-text-primary">{project.title}</h3>
        <p className="text-base md:text-lg text-text-tertiary mb-6 leading-relaxed">{project.description}</p>

        {project.stats && project.stats.length > 0 && (
          <div className="flex flex-row gap-8 mt-2 mb-6 justify-center md:justify-start">
            {project.stats.slice(0, 2).map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center md:items-start">
                <span className="text-xl font-extrabold text-text-primary">{stat.value}</span>
                <span className="text-xs font-medium text-text-tertiary uppercase tracking-wide mt-1">{stat.label}</span>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 w-full flex justify-center md:justify-start">
          <CTAWrapper>
            <div className="px-5 py-2.5 rounded-full bg-accent-primary hover:bg-accent-hover transition-colors">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold whitespace-nowrap text-white">{ctaLabel}</span>
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </div>
          </CTAWrapper>
        </div>
      </div>
    </motion.div>
  );
};

export default StickyProjectCard;
