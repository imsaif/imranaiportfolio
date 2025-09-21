import React from 'react';

interface CredibilityCardContent {
  id: string;
  type: 'testimonial' | 'books' | 'achievement' | 'companies' | 'impact' | 'work' | 'skills';
  content: any;
}

interface StickyCredibilityCardProps {
  card: CredibilityCardContent;
  index: number;
  total: number;
}

const StickyCredibilityCard: React.FC<StickyCredibilityCardProps> = ({ card, index }) => {

  const renderCardContent = () => {
    const baseCardClass = "w-full bg-white rounded-xl border border-gray-100 p-6 shadow-lg";

    switch (card.type) {
      case 'testimonial':
        return (
          <div className={baseCardClass}>
            <div className="flex items-start gap-3 mb-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full flex-shrink-0"></div>
              <div>
                <h4 className="font-semibold text-gray-900">{card.content.name}</h4>
                <p className="text-sm text-gray-600">{card.content.title}</p>
                {card.content.company === 'Optum' ? (
                  <div className="mt-1">
                    <img
                      src="/images/logos/optum-logo.png"
                      alt="Optum"
                      width={60}
                      height={20}
                      className="object-contain"
                    />
                  </div>
                ) : card.content.company === 'Google' ? (
                  <div className="mt-1">
                    <img
                      src="/images/logos/google-logo.png"
                      alt="Google"
                      width={60}
                      height={20}
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <p className="text-sm font-medium text-accent">{card.content.company}</p>
                )}
              </div>
            </div>
            <div className="flex mb-3">
              {[...Array(card.content.rating)].map((_, i) => (
                <span key={i} className="text-yellow-400">⭐</span>
              ))}
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">"{card.content.quote}"</p>
          </div>
        );

      case 'books':
        return (
          <div className={baseCardClass}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-6 border-2 border-accent rounded flex items-center justify-center">
                <div className="w-2 h-3 bg-accent rounded-sm"></div>
              </div>
              <h4 className="font-semibold text-gray-900">{card.content.title}</h4>
            </div>
            <div className="space-y-4">
              {card.content.books.map((book: any, index: number) => (
                <div key={index} className="border-l-4 border-accent pl-4">
                  <h5 className="font-medium text-gray-900 mb-1">"{book.title}"</h5>
                  <p className="text-sm text-gray-600">{book.subtitle}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'achievement':
        return (
          <div className={baseCardClass}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-6 border-2 border-accent rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
              </div>
              <h4 className="font-semibold text-gray-900">{card.content.title}</h4>
            </div>
            <ul className="space-y-3">
              {card.content.achievements.map((achievement: string, index: number) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span className="text-gray-700 text-sm">{achievement}</span>
                </li>
              ))}
            </ul>
          </div>
        );

      case 'companies':
        return (
          <div className={baseCardClass}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-6 border-2 border-accent rounded flex items-center justify-center">
                <div className="w-3 h-2 border border-accent rounded-sm"></div>
              </div>
              <h4 className="font-semibold text-gray-900">{card.content.title}</h4>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex flex-wrap gap-2 mb-3">
                  {card.content.companies.map((company: string, index: number) => (
                    <span key={index} className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium">
                      {company}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {card.content.industries.map((industry: string, index: number) => (
                    <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                      {industry}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'impact':
        return (
          <div className={baseCardClass}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-6 border-2 border-accent rounded flex items-center justify-center">
                <div className="flex gap-0.5">
                  <div className="w-1 h-3 bg-accent rounded-sm"></div>
                  <div className="w-1 h-2 bg-accent rounded-sm mt-1"></div>
                  <div className="w-1 h-4 bg-accent rounded-sm"></div>
                </div>
              </div>
              <h4 className="font-semibold text-gray-900">{card.content.title}</h4>
            </div>
            <ul className="space-y-3">
              {card.content.metrics.map((metric: string, index: number) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span className="text-gray-700 text-sm font-medium">{metric}</span>
                </li>
              ))}
            </ul>
          </div>
        );

      case 'work':
        return (
          <div className={baseCardClass}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-6 border-2 border-accent rounded flex items-center justify-center">
                <div className="w-2 h-2 bg-accent rounded-full relative">
                  <div className="absolute -top-0.5 -right-0.5 w-1 h-1 bg-accent rounded-full"></div>
                </div>
              </div>
              <h4 className="font-semibold text-gray-900">{card.content.title}</h4>
            </div>
            <ul className="space-y-3">
              {card.content.projects.map((project: string, index: number) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span className="text-gray-700 text-sm">{project}</span>
                </li>
              ))}
            </ul>
          </div>
        );

      case 'skills':
        return (
          <div className={baseCardClass}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-6 border-2 border-accent rounded-full flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-accent rounded-full relative">
                  <div className="absolute -top-1 -left-1 w-3 h-3 border border-accent rounded-full opacity-50"></div>
                </div>
              </div>
              <h4 className="font-semibold text-gray-900">{card.content.title}</h4>
            </div>
            <ul className="space-y-3">
              {card.content.skills.map((skill: string, index: number) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  <span className="text-gray-700 text-sm">{skill}</span>
                </li>
              ))}
            </ul>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div
      className="sticky top-24 mb-1"
      style={{
        zIndex: index + 1,
        transform: `translateY(${index * 4}px)`
      }}
    >
      {renderCardContent()}
    </div>
  );
};

export default StickyCredibilityCard;