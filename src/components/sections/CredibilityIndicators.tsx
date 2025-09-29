'use client';

import StickyCredibilityCard from '../ui/StickyCredibilityCard';
import HighlightedMetricsTable from '../ui/HighlightedMetricsTable';
import { MdGroup, MdSchool, MdPeople } from 'react-icons/md';

interface CredibilityCard {
  id: string;
  type: 'testimonial' | 'books' | 'achievement' | 'companies' | 'impact' | 'work' | 'skills' | 'leadership';
  content: any;
}

const CredibilityIndicators = () => {

  const metrics = [
    { id: 'experience', number: '10+', label: 'Years of Experience' },
    { id: 'products', number: '15+', label: 'Products Shipped' }
  ];

  const leadershipMetrics = [
    { id: 'teams', number: '5+', label: 'Teams Led', icon: MdGroup },
    { id: 'mentored', number: '8', label: 'Designers Mentored', icon: MdSchool },
    { id: 'stakeholders', number: '20+', label: 'Stakeholders Managed', icon: MdPeople }
  ];


  const credibilityCards: CredibilityCard[] = [
    {
      id: 'testimonial-1',
      type: 'testimonial',
      content: {
        name: 'Sarah Chen',
        title: 'Senior Product Manager',
        company: 'Optum',
        rating: 5,
        quote: 'Transformed our patient experience, reducing abandonment from 98.9% to 3%',
        avatar: '/images/testimonials/sarah-chen.jpg'
      }
    },
    {
      id: 'testimonial-2',
      type: 'testimonial',
      content: {
        name: 'Michael Torres',
        title: 'Engineering Manager',
        company: 'Google',
        rating: 5,
        quote: 'Outstanding leadership and vision. Imran consistently drives teams toward excellence while fostering innovation and collaboration across all disciplines.',
        avatar: '/images/testimonials/michael-torres.jpg'
      }
    }
  ];



  return (
    <section className="pt-8 md:pt-12 lg:pt-16 pb-16 md:pb-20 lg:pb-24 bg-background">
      <div className="container mx-auto px-4 xs:px-5 sm:px-6 md:px-8">
        {/* Title and Description */}
        <div className="text-center mb-12">
          <h2 className="section-title text-3xl md:text-4xl font-bold text-foreground mb-6 tracking-tight leading-tight">
            Proven Impact
          </h2>
          <p className="text-lg text-muted leading-relaxed">
            Building high-performing teams while delivering measurable impact
          </p>
        </div>

        {/* Metrics Table and Cards Row */}
        <div className="flex flex-col lg:flex-row gap-12 lg:items-center">
          {/* Left Side - Metrics Table Only */}
          <div className="lg:w-2/5">
            <HighlightedMetricsTable
              metrics={metrics}
              leadershipMetrics={leadershipMetrics}
            />
          </div>

          {/* Right Side - Cards */}
          <div className="lg:w-3/5">
            <div className="flex gap-4">
              {credibilityCards.map((card) => (
                <StickyCredibilityCard
                  key={card.id}
                  card={card}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CredibilityIndicators;