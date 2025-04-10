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

      <div className="container mx-auto px-6 md:px-8">
        <SectionTitle
          title="AI Design Methodology"
          subtitle="My specialized approach to designing AI experiences balances technical possibilities with human needs, ensuring AI solutions that are both powerful and intuitive."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mt-24">
          {frameworks.map((framework, index) => (
            <div key={index} className="relative group">
              <div className="absolute -top-16 opacity-10 text-6xl md:text-8xl font-bold text-accent">
                {framework.number}
              </div>

              <div className="border-t-2 border-accent pt-8 transition-all group-hover:translate-y-[-4px]">
                <h3 className="text-xl font-bold mb-4">{framework.title}</h3>
                <p className="text-muted leading-relaxed">{framework.description}</p>
              </div>

              {/* Only add this line if it's not the last item */}
              {index < frameworks.length - 1 && index % 3 !== 2 && (
                <div className="hidden lg:block absolute top-8 -right-6 w-12 h-[2px] bg-accent/30"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
