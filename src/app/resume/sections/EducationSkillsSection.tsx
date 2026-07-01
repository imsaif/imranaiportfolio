interface Education {
  institution: string;
  degree: string;
  field?: string;
  duration: string;
}

interface SkillGroup {
  category: string;
  items: string[];
}

interface EducationSkillsSectionProps {
  education: Education[];
  skills: SkillGroup[];
}

export function EducationSkillsSection({ education, skills }: EducationSkillsSectionProps) {
  return (
    <div className="space-y-12">
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-4">Education</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {education.map((edu, i) => (
            <div
              key={i}
              className="p-5 bg-surface-primary border border-border-primary rounded-2xl shadow-card hover:shadow-card-hover transition-shadow"
            >
              <p className="font-medium text-text-primary leading-snug">{edu.institution}</p>
              <p className="text-sm text-text-secondary mt-1">
                {edu.degree}
                {edu.field ? `, ${edu.field}` : ''}
              </p>
              <p className="text-xs text-text-tertiary mt-2">{edu.duration}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-4">Skills</h3>
        <div className="space-y-5">
          {skills.map((group, i) => (
            <div key={i} className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4">
              <p className="text-xs uppercase tracking-wide text-text-tertiary font-medium sm:w-28 sm:shrink-0 sm:pt-1.5">
                {group.category}
              </p>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((item, j) => (
                  <li
                    key={j}
                    className="bg-accent-subtle text-text-secondary text-sm px-3 py-1.5 rounded-full"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
