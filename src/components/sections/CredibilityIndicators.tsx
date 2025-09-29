'use client';

import { motion } from 'framer-motion';
import StickyCredibilityCard from '../ui/StickyCredibilityCard';
import { ActiveCardProvider } from '../../context/ActiveCardContext';
import HighlightedMetricsTable from '../ui/HighlightedMetricsTable';
import { MdGroup, MdSchool, MdPeople, MdSpeed } from 'react-icons/md';

interface CredibilityCard {
  id: string;
  type: 'testimonial' | 'books' | 'achievement' | 'companies' | 'impact' | 'work' | 'skills' | 'leadership';
  content: any;
}

const CredibilityIndicators = () => {

  const metrics = [
    { id: 'experience', number: '10+', label: 'Years of Experience' },
    { id: 'products', number: '15+', label: 'Products Shipped' },
    { id: 'industries', number: '3', label: 'Industries Transformed' }
  ];

  const leadershipMetrics = [
    { id: 'teams', number: '5+', label: 'Teams Led', icon: MdGroup },
    { id: 'mentored', number: '8', label: 'Designers Mentored', icon: MdSchool },
    { id: 'stakeholders', number: '20+', label: 'Stakeholders Managed', icon: MdPeople },
    { id: 'delivery', number: '30%', label: 'Faster Delivery', icon: MdSpeed }
  ];

  // Define which metrics should highlight for which cards
  const cardMetricMapping = {
    'impact': ['experience', 'products'], // Impact cards highlight experience and products
    'leadership': ['teams', 'mentored', 'stakeholders'], // Leadership highlights team metrics
    'achievement': ['experience', 'products', 'industries'], // Achievements highlight primary metrics
    'work': ['products', 'industries'], // Work highlights products and industries
    'skills': ['industries'], // Skills highlights industries
    'testimonial-1': ['experience'], // Testimonials can highlight experience
    'testimonial-2': ['teams'] // Second testimonial highlights leadership
  };

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
    },
    {
      id: 'books',
      type: 'books',
      content: {
        title: 'Contributor',
        books: [
          {
            title: 'Observing User Experience',
            subtitle: 'A practical guide to user research methods',
            link: 'https://shop.elsevier.com/books/observing-the-user-experience/goodman/978-0-12-384869-7'
          },
          {
            title: 'Beyond Vibe Coding',
            subtitle: 'Engineering meets design thinking',
            link: 'https://www.oreilly.com/library/view/beyond-vibe-coding/9798341634749/'
          }
        ]
      }
    },
    {
      id: 'achievement',
      type: 'achievement',
      content: {
        title: 'Key Achievements',
        achievements: [
          'Led 5+ cross-functional teams of 8-12 people',
          '$2M+ measurable business impact through design',
          'Scaled design team 3x with 95% retention rate'
        ]
      }
    },
    {
      id: 'leadership',
      type: 'leadership',
      content: {
        title: 'Leadership & Growth',
        leadership: [
          'Built design team from 3 to 8 designers',
          'Mentored 8 designers, 3 promoted to senior',
          'Coordinated 5+ cross-functional teams',
          'Presented quarterly to senior leadership'
        ]
      }
    },
    {
      id: 'impact',
      type: 'impact',
      content: {
        title: 'Measurable Results',
        metrics: [
          '98.9% → 3% abandonment rate',
          '3x faster user onboarding',
          '85% reduction in support tickets'
        ]
      }
    },
    {
      id: 'work',
      type: 'work',
      content: {
        title: 'Notable Projects',
        projects: [
          'Google News Quality Design',
          'UHG Healthcare Analytics Platform',
          'NewGlobe Learning Platform'
        ]
      }
    },
    {
      id: 'skills',
      type: 'skills',
      content: {
        title: 'Core Expertise',
        skills: [
          'AI/ML Product Design',
          'Enterprise UX Strategy',
          'Design Systems Architecture',
          'User Research & Testing'
        ]
      }
    }
  ];



  return (
    <ActiveCardProvider>
      <section className="pt-8 md:pt-12 lg:pt-16 pb-16 md:pb-20 lg:pb-24 bg-background">
        <div className="container mx-auto px-4 xs:px-5 sm:px-6 md:px-8">
          <div className="flex flex-col lg:flex-row gap-12 lg:items-start">
            {/* Left Side - Sticky Sidebar */}
            <div className="lg:w-2/5 lg:sticky lg:top-32 lg:h-fit space-y-8">
              {/* Headline */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <h2 className="section-title text-3xl md:text-4xl font-bold text-foreground mb-6 tracking-tight leading-tight">
                  Proven Impact
                </h2>
                <p className="text-lg text-muted leading-relaxed whitespace-nowrap">
                  Building high-performing teams while delivering measurable impact
                </p>
              </motion.div>

              {/* Highlighted Metrics Table */}
              <HighlightedMetricsTable
                metrics={metrics}
                leadershipMetrics={leadershipMetrics}
                cardMetricMapping={cardMetricMapping}
              />
            </div>

            {/* Right Side - Stacking Cards */}
            <div className="lg:w-3/5 lg:mt-[240px]">
              {credibilityCards.map((card, index) => (
                <StickyCredibilityCard
                  key={card.id}
                  card={card}
                  index={index}
                  total={credibilityCards.length}
                />
              ))}
              {/* Spacer to give room for last card to stack properly */}
              <div className="h-24"></div>
            </div>
          </div>
        </div>
      </section>
    </ActiveCardProvider>
  );
};

export default CredibilityIndicators;