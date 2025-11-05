import { motion } from 'framer-motion';
import { MdLightbulb } from 'react-icons/md';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

export function KeyLearningsSection() {
  const learnings = [
    {
      title: 'Humans + AI > AI alone',
      description: 'The most effective educational content comes from AI-generated drafts reviewed and refined by expert educators. Trying to make AI-only content work was a dead end. Building trust through transparency about AI involvement was critical.',
      icon: '🤝'
    },
    {
      title: 'Constraints drive better design',
      description: 'Limitations around AI capabilities (hallucination, context limits, consistency) actually led to better UX. Instead of fighting these constraints, we designed workflows that leveraged them—creating a better teacher experience.'
    },
    {
      title: 'Educational rigor > Speed',
      description: 'Teachers would rather spend 30 minutes refining AI-generated content than use low-quality automated content immediately. We optimized for quality first, speed second. This shifted how we designed the system.'
    },
    {
      title: 'Localization requires deep domain knowledge',
      description: 'Generating content in Swahili or Amharic wasn\'t just about translation. It required understanding local pedagogy, cultural context, and curriculum frameworks. This humbled my assumptions about "universal design."'
    },
    {
      title: 'Change management matters as much as technology',
      description: 'The tool was ready months before adoption happened. Helping educators build confidence in AI-assisted workflows took as much effort as building the product itself.'
    },
    {
      title: 'Ethical considerations must be designed in from the start',
      description: 'Thinking about AI bias, transparency, and educator agency early shaped every decision. These weren\'t afterthoughts—they were core to the product vision.'
    }
  ];

  return (
    <motion.div {...fadeIn} className="max-w-4xl mx-auto">
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Key Learnings & Reflections</h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          Building LessonLoom taught me fundamental lessons about designing for AI, education, global teams, and the gap between innovation and adoption. These insights guide how I approach AI design today.
        </p>
      </div>

      <div className="space-y-6">
        {learnings.map((learning, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="bg-gradient-to-r from-slate-50 to-gray-50 rounded-lg p-6 border border-gray-200"
          >
            <div className="flex gap-4">
              <div className="text-3xl flex-shrink-0">{learning.icon || '💡'}</div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{learning.title}</h3>
                <p className="text-gray-700 leading-relaxed">{learning.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-12 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg p-8 border border-indigo-100"
      >
        <h3 className="text-xl font-bold text-gray-900 mb-4">How This Shaped My Design Philosophy</h3>
        <p className="text-gray-700 leading-relaxed mb-4">
          LessonLoom showed me that great design in the AI era isn't about making AI disappear or pretending it doesn't exist. It's about designing with transparency, building systems that respect human expertise, and creating products that empower rather than replace.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Every product I work on now asks: "Where is the human judgment critical?" and "How do we design to amplify human potential, not reduce the need for it?"
        </p>
      </motion.div>
    </motion.div>
  );
}
