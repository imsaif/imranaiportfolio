import React, { useEffect, useRef } from 'react';
import { MdMenuBook, MdStar, MdTrendingUp, MdWork, MdPsychology, MdGroup } from 'react-icons/md';
import { useActiveCard } from '../../context/ActiveCardContext';

interface CredibilityCardContent {
  id: string;
  type: 'testimonial' | 'books' | 'achievement' | 'companies' | 'impact' | 'work' | 'skills' | 'leadership';
  content: any;
}

interface StickyCredibilityCardProps {
  card: CredibilityCardContent;
  index: number;
  total: number;
}

const StickyCredibilityCard: React.FC<StickyCredibilityCardProps> = ({ card, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { setActiveCardId } = useActiveCard();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            // Card is more than 50% visible
            setActiveCardId(card.id);
          } else if (!entry.isIntersecting) {
            // Card is not visible, clear if it was the active card
            setActiveCardId(null);
          }
        });
      },
      {
        threshold: [0, 0.5, 1], // Trigger at different visibility levels
        rootMargin: '-100px 0px -100px 0px' // Adjust when card is considered "in view"
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [card.id, setActiveCardId]);

  const renderCardContent = () => {
    const baseCardClass = "w-full bg-white rounded-xl border border-gray-100 p-6 shadow-lg";

    switch (card.type) {
      case 'testimonial': {
        return (
          <div className={baseCardClass}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-20 h-20 bg-white rounded-xl border border-gray-100 flex items-center justify-center flex-shrink-0 p-4">
                {card.content.company === 'Optum' ? (
                  <img
                    src="/images/logos/optum-logo.png"
                    alt="Optum"
                    className="object-contain w-full h-full"
                  />
                ) : card.content.company === 'Google' ? (
                  <img
                    src="/images/logos/google-logo.png"
                    alt="Google"
                    className="object-contain w-full h-full"
                  />
                ) : (
                  <div className="w-full h-full bg-accent/10 rounded-lg flex items-center justify-center">
                    <span className="text-accent font-semibold text-xs">{card.content.company.charAt(0)}</span>
                  </div>
                )}
              </div>
              <div className="flex-1 flex flex-col justify-center">
                <h4 className="font-semibold text-gray-900 text-lg">{card.content.name}</h4>
                <p className="text-base text-gray-600">{card.content.title}</p>
              </div>
            </div>
            <div className="border-t border-gray-100 pt-6 mt-6">
              <div className="flex mb-3">
                {[...Array(card.content.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400">⭐</span>
                ))}
              </div>
              <p className="text-gray-700 text-base leading-relaxed">"{card.content.quote}"</p>
            </div>
          </div>
        );
      }

      case 'books': {
        return (
          <div className={baseCardClass}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-20 h-20 bg-white rounded-xl border border-gray-100 flex items-center justify-center flex-shrink-0 p-4">
                <MdMenuBook className="w-8 h-8 text-gray-600" />
              </div>
              <div className="flex-1 flex flex-col justify-center">
                <h4 className="font-semibold text-gray-900 text-lg">{card.content.title}</h4>
              </div>
            </div>
            <div className="border-t border-gray-100 pt-6 mt-6">
              <div className="space-y-4">
                {card.content.books.map((book: any, index: number) => (
                  <div key={index} className="border-l-4 border-accent pl-4">
                    <a
                      href={book.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block group"
                    >
                      <h5 className="font-semibold text-gray-900 mb-2 text-lg group-hover:text-accent transition-colors cursor-pointer">
                        "{book.title}"
                      </h5>
                    </a>
                    <p className="text-base text-gray-600 leading-relaxed">{book.subtitle}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      }

      case 'achievement': {
        return (
          <div className={baseCardClass}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-20 h-20 bg-white rounded-xl border border-gray-100 flex items-center justify-center flex-shrink-0 p-4">
                <MdStar className="w-8 h-8 text-gray-600" />
              </div>
              <div className="flex-1 flex flex-col justify-center">
                <h4 className="font-semibold text-gray-900 text-lg">{card.content.title}</h4>
              </div>
            </div>
            <div className="border-t border-gray-100 pt-6 mt-6">
              <ul className="space-y-3">
                {card.content.achievements.map((achievement: string, index: number) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span className="text-gray-700 text-base font-medium leading-relaxed">{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      }

      case 'companies': {
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
      }

      case 'impact': {
        return (
          <div className={baseCardClass}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-20 h-20 bg-white rounded-xl border border-gray-100 flex items-center justify-center flex-shrink-0 p-4">
                <MdTrendingUp className="w-8 h-8 text-gray-600" />
              </div>
              <div className="flex-1 flex flex-col justify-center">
                <h4 className="font-semibold text-gray-900 text-lg">{card.content.title}</h4>
              </div>
            </div>
            <div className="border-t border-gray-100 pt-6 mt-6">
              <ul className="space-y-3">
                {card.content.metrics.map((metric: string, index: number) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span className="text-gray-700 text-base font-medium leading-relaxed">{metric}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      }

      case 'work': {
        return (
          <div className={baseCardClass}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-20 h-20 bg-white rounded-xl border border-gray-100 flex items-center justify-center flex-shrink-0 p-4">
                <MdWork className="w-8 h-8 text-gray-600" />
              </div>
              <div className="flex-1 flex flex-col justify-center">
                <h4 className="font-semibold text-gray-900 text-lg">{card.content.title}</h4>
              </div>
            </div>
            <div className="border-t border-gray-100 pt-6 mt-6">
              <ul className="space-y-3">
                {card.content.projects.map((project: string, index: number) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span className="text-gray-700 text-base font-medium leading-relaxed">{project}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      }

      case 'skills': {
        return (
          <div className={baseCardClass}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-20 h-20 bg-white rounded-xl border border-gray-100 flex items-center justify-center flex-shrink-0 p-4">
                <MdPsychology className="w-8 h-8 text-gray-600" />
              </div>
              <div className="flex-1 flex flex-col justify-center">
                <h4 className="font-semibold text-gray-900 text-lg">{card.content.title}</h4>
              </div>
            </div>
            <div className="border-t border-gray-100 pt-6 mt-6">
              <ul className="space-y-3">
                {card.content.skills.map((skill: string, index: number) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span className="text-gray-700 text-base font-medium leading-relaxed">{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      }

      case 'leadership': {
        return (
          <div className={baseCardClass}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-20 h-20 bg-white rounded-xl border border-gray-100 flex items-center justify-center flex-shrink-0 p-4">
                <MdGroup className="w-8 h-8 text-gray-600" />
              </div>
              <div className="flex-1 flex flex-col justify-center">
                <h4 className="font-semibold text-gray-900 text-lg">{card.content.title}</h4>
              </div>
            </div>
            <div className="border-t border-gray-100 pt-6 mt-6">
              <ul className="space-y-3">
                {card.content.leadership.map((item: string, index: number) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span className="text-gray-700 text-base font-medium leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      }

      default:
        return null;
    }
  };

  return (
    <div
      ref={cardRef}
      className="sticky top-24 lg:top-32 mb-1"
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