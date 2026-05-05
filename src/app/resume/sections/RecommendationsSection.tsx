interface Recommendation {
  author: string;
  title: string;
  date: string;
  context: string;
  text: string;
}

interface RecommendationsSectionProps {
  recommendations: Recommendation[];
}

export function RecommendationsSection({ recommendations }: RecommendationsSectionProps) {
  return (
    <div className="space-y-6">
      {recommendations.map((rec, i) => (
        <blockquote key={i} className="border-l-2 border-border-secondary pl-6 py-1">
          <p className="text-text-secondary leading-relaxed">{rec.text}</p>
          <footer className="mt-3 text-sm text-text-tertiary">
            <span className="font-medium text-text-primary">{rec.author}</span>
            {' · '}
            {rec.title}
          </footer>
        </blockquote>
      ))}
    </div>
  );
}
