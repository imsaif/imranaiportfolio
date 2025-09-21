'use client';

import { motion } from 'framer-motion';
import StickyCredibilityCard from '../ui/StickyCredibilityCard';

interface CredibilityCard {
  id: string;
  type: 'testimonial' | 'books' | 'achievement' | 'companies' | 'impact' | 'work' | 'skills';
  content: any;
}

const CredibilityIndicators = () => {

  const metrics = [
    { number: '8+', label: 'Years of Experience' },
    { number: '15+', label: 'Products Shipped' },
    { number: '3', label: 'Industries Transformed' }
  ];

  const credibilityCards: CredibilityCard[] = [
    {
      id: 'testimonial-1',
      type: 'testimonial',
      content: {
        name: 'Sarah Chen',
        title: 'Product Lead',
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
        title: 'Engineering Lead',
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
          'Led 10+ cross-functional teams',
          '$2M+ measurable business impact',
          'Pioneered AI-first methodologies'
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
    <section className="pt-8 md:pt-12 lg:pt-16 pb-16 md:pb-20 lg:pb-24 bg-background">
      <div className="container mx-auto px-4 xs:px-5 sm:px-6 md:px-8">
        <div className="flex flex-col lg:flex-row gap-12">
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
              <p className="text-lg text-muted leading-relaxed">
                From reducing abandonment rates to pioneering AI experiences
              </p>
            </motion.div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3 gap-4">
              {metrics.map((metric, index) => (
                <div key={index} className="bg-white rounded-xl border border-gray-100 p-4 shadow-lg text-center">
                  <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                    {metric.number}
                  </div>
                  <div className="text-base text-muted font-medium">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Stacking Cards */}
          <div className="lg:w-3/5">
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
  );
};

export default CredibilityIndicators;