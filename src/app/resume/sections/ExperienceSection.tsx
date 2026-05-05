interface Experience {
  title: string;
  company: string;
  duration: string;
  location: string;
  description: string;
}

interface ExperienceSectionProps {
  experience: Experience[];
}

export function ExperienceSection({ experience }: ExperienceSectionProps) {
  return (
    <div className="border border-border-primary rounded-2xl bg-surface-primary overflow-hidden">
      {experience.map((job, i) => (
        <div
          key={i}
          className={`px-6 md:px-8 py-6 ${i < experience.length - 1 ? 'border-b border-border-primary' : ''}`}
        >
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-2">
            <div>
              <h3 className="text-base md:text-lg font-semibold text-text-primary">{job.title}</h3>
              <p className="text-sm text-text-secondary">{job.company}</p>
            </div>
            <p className="text-xs text-text-tertiary whitespace-nowrap">{job.duration}</p>
          </div>
          <p className="text-sm text-text-secondary leading-relaxed">{job.description}</p>
        </div>
      ))}
    </div>
  );
}
