'use client';

import React from 'react';

import Button from '../ui/Button';
import { SectionTitle } from '../ui/SectionTitle';

type Framework = {
  title: string;
  description: string;
  number: string;
};

const Process = () => {
  const frameworks: Framework[] = [
    {
      title: 'Research & Problem Definition',
      description:
        'I conduct comprehensive user research specifically focused on AI interaction patterns and mental models, identifying opportunities where AI can genuinely enhance the user experience.',
      number: '01',
    },
    {
      title: 'AI Capability Mapping',
      description:
        'Working closely with data scientists and engineers to understand AI capabilities and limitations, translating technical possibilities into human-centered design opportunities.',
      number: '02',
    },
    {
      title: 'Experience Prototyping',
      description:
        'Creating interactive prototypes that simulate AI behavior, allowing stakeholders to experience how the system will respond to various inputs and scenarios before development.',
      number: '03',
    },
    {
      title: 'Ethical Evaluation',
      description:
        'Conducting thorough assessments of potential biases, ethical implications, and accessibility considerations to ensure the AI solution is fair, inclusive, and responsible.',
      number: '04',
    },
    {
      title: 'Iterative Testing',
      description:
        'Testing with real users to understand how they interpret, trust, and interact with AI features, continuously refining the experience based on feedback and usage metrics.',
      number: '05',
    },
  ];

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Decorative element */}
      <div className="absolute top-40 right-0 w-64 h-64 rounded-full bg-accent/5 -z-10"></div>
      <div className="absolute bottom-20 left-0 w-96 h-96 rounded-full bg-secondary/5 -z-10"></div>

      <div className="container mx-auto px-4 xs:px-5 sm:px-6 md:px-8">
        <SectionTitle
          title="AI Design Methodology"
          subtitle="My specialized approach to designing AI experiences balances technical possibilities with human needs, ensuring AI solutions that are both powerful and intuitive."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xs:gap-12 mt-16 xs:mt-24">
          {frameworks.map((framework, index) => (
            <div key={index} className="relative group">
              <div className="absolute -top-12 xs:-top-16 opacity-10 text-5xl xs:text-6xl md:text-8xl font-bold text-accent">
                {framework.number}
              </div>

              <div className="border-t-2 border-accent pt-6 xs:pt-8 transition-all group-hover:translate-y-[-4px]">
                <h3 className="text-lg xs:text-xl font-bold mb-3 xs:mb-4">{framework.title}</h3>
                <p className="text-sm xs:text-base text-muted leading-relaxed">{framework.description}</p>
              </div>

              {/* Only add this line if it's not the last item */}
              {index < frameworks.length - 1 && index % 3 !== 2 && (
                <div className="hidden lg:block absolute top-8 -right-6 w-12 h-[2px] bg-accent/30"></div>
              )}
            </div>
          ))}
        </div>

        {/* AI Experience Design Pattern Guide Section */}
        <div className="mt-32">
          <div className="mb-8">
            <h2 className="section-title text-3xl md:text-4xl font-bold mb-4">Hey, check out my AI Pattern Library!</h2>
            <p className="text-lg text-muted">
              I've been collecting practical patterns for AI experience design as a side project and put them all
              together at{' '}
              <a
                href="https://www.aiexd.dev/"
                className="text-accent font-medium"
                target="_blank"
                rel="noopener noreferrer"
              >
                aiexd.dev
              </a>
              . It's completely free — a resource you can use in your own AI designs. Here's a sneak peek of what you'll
              find:
            </p>
          </div>

          {/* Pattern Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-6">
            {/* Contextual Assistance Card */}
            <a
              href="https://www.aiexd.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white rounded-md overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent"
              tabIndex={0}
              aria-label="Explore AI Pattern Library: Contextual Assistance"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden group">
                <img
                  src="/images/patterns/contextual-assistance.png"
                  alt="Contextual Assistance Pattern"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-20"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/60 to-pink-500/50 group-hover:from-purple-600/70 group-hover:to-pink-500/60 transition-all duration-300"></div>
              </div>
              <div className="p-2">
                <div className="mb-1">
                  <h3 className="text-base font-bold text-gray-900">Contextual Assistance</h3>
                </div>
                <p className="text-gray-600 text-xs">
                  Provide timely help when users need it, without overwhelming the main task.
                </p>
              </div>
            </a>

            {/* Progressive Disclosure Card */}
            <a
              href="https://www.aiexd.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white rounded-md overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent"
              tabIndex={0}
              aria-label="Explore AI Pattern Library: Progressive Disclosure"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden group">
                <img
                  src="/images/patterns/progressive-disclosure.png"
                  alt="Progressive Disclosure Pattern"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-20"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600/60 to-purple-500/50 group-hover:from-indigo-600/70 group-hover:to-purple-500/60 transition-all duration-300"></div>
              </div>
              <div className="p-2">
                <div className="mb-1">
                  <h3 className="text-base font-bold text-gray-900">Progressive Disclosure</h3>
                </div>
                <p className="text-gray-600 text-xs">
                  Reveal information gradually to reduce cognitive load for users.
                </p>
              </div>
            </a>

            {/* Human-in-the-Loop Card */}
            <a
              href="https://www.aiexd.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white rounded-md overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent"
              tabIndex={0}
              aria-label="Explore AI Pattern Library: Human-in-the-Loop"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden group">
                <img
                  src="/images/patterns/human-in-the-loop.png"
                  alt="Human-in-the-Loop Pattern"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-20"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/60 to-cyan-500/50 group-hover:from-blue-600/70 group-hover:to-cyan-500/60 transition-all duration-300"></div>
              </div>
              <div className="p-2">
                <div className="mb-1">
                  <h3 className="text-base font-bold text-gray-900">Human-in-the-Loop</h3>
                </div>
                <p className="text-gray-600 text-xs">
                  Balance automation with human oversight for critical AI decisions.
                </p>
              </div>
            </a>

            {/* Transparent Feedback Card */}
            <a
              href="https://www.aiexd.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white rounded-md overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent"
              tabIndex={0}
              aria-label="Explore AI Pattern Library: Transparent Feedback"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden group">
                <img
                  src="/images/patterns/transparent-feedback.png"
                  alt="Transparent Feedback Pattern"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-20"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-rose-600/60 to-orange-500/50 group-hover:from-rose-600/70 group-hover:to-orange-500/60 transition-all duration-300"></div>
              </div>
              <div className="p-2">
                <div className="mb-1">
                  <h3 className="text-base font-bold text-gray-900">Transparent Feedback</h3>
                </div>
                <p className="text-gray-600 text-xs">
                  Communicate AI capabilities and limitations clearly to build trust.
                </p>
              </div>
            </a>
          </div>

          <Button
            href="https://www.aiexd.dev/"
            variant="primary"
            className="mt-2 w-full md:w-auto"
            target="_blank"
            rel="noopener noreferrer"
          >
            Explore aiexd by Imran
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Process;
