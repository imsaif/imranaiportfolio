'use client';

import { motion } from 'framer-motion';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

export function AIImplementationSection() {
  const implementations = [
    {
      title: 'Prompt Engineering',
      description: 'We developed a sophisticated prompt architecture that guides Claude to generate pedagogically sound lesson plans. The prompt templates incorporate curriculum frameworks, learning objectives, and age-appropriate complexity levels directly into the instruction set. Each prompt includes structured examples showing desired output format, tone, and pedagogical approach, with iterative refinement based on output quality metrics.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      color: 'text-violet-600',
      bgColor: 'bg-violet-50',
      borderColor: 'border-violet-200',
      tags: ['Multi-step instructions', 'Few-shot examples', 'Constraint definitions']
    },
    {
      title: 'Model Selection',
      description: 'We evaluated multiple language models against key criteria: content quality, consistency, cost efficiency, and latency. Claude emerged as the optimal choice due to its superior reasoning abilities and nuanced understanding of educational content. The selection process involved testing with diverse curriculum inputs and comparing quality scores from educator reviews.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      tags: ['Quality benchmarks', 'Cost analysis', 'Latency requirements']
    },
    {
      title: 'Context Management',
      description: 'Educational content generation requires rich contextual information. We engineered a context pipeline that passes curriculum documents, learning standards, student demographics, and existing lesson data to Claude within optimized prompts. The system maintains a compressed representation of curriculum frameworks, allowing educators to customize lessons based on their region\'s standards.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
      ),
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      tags: ['Curriculum data injection', 'Token optimization', 'Dynamic context loading']
    },
    {
      title: 'Output Validation',
      description: 'AI-generated content requires rigorous validation before delivery to educators. We implemented a multi-stage quality assurance pipeline that checks curriculum alignment, verifies age-appropriateness, confirms structured format compliance, and detects errors. The validation pipeline combines rule-based checks with semantic analysis, ensuring consistent high-quality output.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
      tags: ['Format validation', 'Quality scoring', 'Alignment checks']
    }
  ];

  return (
    <motion.div {...fadeIn} className="max-w-4xl mx-auto">
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">AI Implementation Strategy</h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-4">
          The technical foundation of LessonLoom rests on a carefully architected AI strategy that balances content quality, educational integrity, and scalability. Here's how we approached the core technical challenges:
        </p>
      </div>

      <div className="space-y-6">
        {implementations.map((impl, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={`bg-gradient-to-br ${impl.bgColor} rounded-lg p-6 border ${impl.borderColor}`}
          >
            <div className="flex items-start gap-4">
              <div className={`flex-shrink-0 ${impl.color} mt-1`}>
                {impl.icon}
              </div>
              <div className="flex-grow">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{impl.title}</h3>
                <p className="text-gray-700 leading-relaxed mb-4">{impl.description}</p>
                <div className="flex flex-wrap gap-2">
                  {impl.tags.map((tag, tagIdx) => (
                    <span
                      key={tagIdx}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${impl.color} border ${impl.borderColor} bg-white`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-8"
      >
        <h3 className="font-semibold text-gray-900 mb-4">Why This Mattered</h3>
        <p className="text-gray-700 leading-relaxed">
          These technical decisions weren't made in isolation. Each choice—from prompt architecture to model selection—was validated against real educator feedback and output quality metrics. The result is a system that doesn't just generate lessons faster; it generates lessons that maintain the pedagogical rigor educators demand while saving them hours of work each week.
        </p>
      </motion.div>
    </motion.div>
  );
}
