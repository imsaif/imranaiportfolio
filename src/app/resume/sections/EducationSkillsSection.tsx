interface Education {
  institution: string;
  degree: string;
  field?: string;
  duration: string;
}

interface EducationSkillsSectionProps {
  education: Education[];
  skills: string[];
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
        <ul className="flex flex-wrap gap-2">
          {skills.map((skill, i) => (
            <li
              key={i}
              className="bg-accent-subtle text-text-secondary text-sm px-3 py-1.5 rounded-full"
            >
              {skill}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
