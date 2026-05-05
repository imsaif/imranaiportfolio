interface Publication {
  role: string;
  title: string;
  date: string;
}

interface Award {
  title: string;
  issuer: string;
  date: string;
}

interface Certification {
  name: string;
  issuer: string;
  date: string;
}

interface PublicationsAwardsSectionProps {
  publications: Publication[];
  awards: Award[];
  certifications: Certification[];
}

export function PublicationsAwardsSection({
  publications,
  awards,
  certifications,
}: PublicationsAwardsSectionProps) {
  return (
    <div className="space-y-12">
      {publications.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-text-primary mb-4">Publications</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {publications.map((pub, i) => (
              <div
                key={i}
                className="p-5 bg-surface-primary border border-border-primary rounded-2xl shadow-card hover:shadow-card-hover transition-shadow"
              >
                <p className="font-medium text-text-primary leading-snug">{pub.title}</p>
                <p className="text-sm text-text-tertiary mt-1">
                  {pub.role} · {pub.date}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {awards.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-text-primary mb-4">Awards</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {awards.map((award, i) => (
              <div
                key={i}
                className="p-5 bg-surface-primary border border-border-primary rounded-2xl shadow-card hover:shadow-card-hover transition-shadow"
              >
                <p className="font-medium text-text-primary leading-snug">{award.title}</p>
                <p className="text-sm text-text-tertiary mt-1">
                  {award.issuer} · {award.date}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {certifications.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-text-primary mb-4">Certifications</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {certifications.map((cert, i) => (
              <div
                key={i}
                className="p-5 bg-surface-primary border border-border-primary rounded-2xl shadow-card hover:shadow-card-hover transition-shadow"
              >
                <p className="font-medium text-text-primary leading-snug">{cert.name}</p>
                <p className="text-sm text-text-tertiary mt-1">
                  {cert.issuer} · {cert.date}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
