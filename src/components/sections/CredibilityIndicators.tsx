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
        title: 'Contributing Author',
        books: [
          { title: 'Observing User Experience', subtitle: 'A practical guide to user research methods' },
          { title: 'Beyond Vibe Coding', subtitle: 'Engineering meets design thinking' }
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
      id: 'companies',
      type: 'companies',
      content: {
        title: 'Trusted By',
        companies: ['Google', 'Optum', 'NewGlobe'],
        industries: ['Healthcare', 'Education', 'Tech']
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
          'Optum Health Portal Redesign',
          'Google AI Ethics Framework',
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
    <section className="pt-16 md:pt-20 lg:pt-24 pb-32 md:pb-40 lg:pb-48 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Side - Sticky Sidebar */}
          <div className="lg:w-2/5 lg:sticky lg:top-32 lg:h-fit space-y-8">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium"
            >
              <span className="w-2 h-2 bg-accent rounded-full"></span>
              Proven Track Record
            </motion.div>

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h2 className="section-title text-3xl md:text-4xl font-bold text-foreground mb-6 tracking-tight leading-tight">
                Building Trust Through Results
              </h2>
              <p className="text-lg text-muted leading-relaxed">
                From reducing abandonment rates to pioneering AI experiences
              </p>
            </motion.div>

            {/* Metrics Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3 gap-6"
            >
              {metrics.map((metric, index) => (
                <div key={index} className="text-center sm:text-left">
                  <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                    {metric.number}
                  </div>
                  <div className="text-sm text-muted">
                    {metric.label}
                  </div>
                </div>
              ))}
            </motion.div>
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
            <div className="h-96"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CredibilityIndicators;