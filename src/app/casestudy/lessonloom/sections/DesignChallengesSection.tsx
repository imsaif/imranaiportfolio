import { motion } from 'framer-motion';
import { MdWarning } from 'react-icons/md';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

export function DesignChallengesSection() {
  const challenges = [
    {
      title: 'Curriculum Alignment',
      description: 'Ensuring AI-generated content adheres to specific curriculum frameworks and learning standards across different regions and education systems.'
    },
    {
      title: 'Content Diversity',
      description: 'Generating varied, contextually relevant lesson content that avoids repetition and maintains educational rigor across thousands of lessons.'
    },
    {
      title: 'Age-Appropriate Content',
      description: 'Tailoring complexity, language, and examples to suit specific age groups and developmental stages while maintaining pedagogical accuracy.'
    },
    {
      title: 'Localization at Scale',
      description: 'Supporting multiple languages while preserving cultural context, educational nuances, and local curriculum requirements.'
    }
  ];

  return (
    <motion.div {...fadeIn} className="max-w-4xl mx-auto">
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">The Strategic Context</h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          NewGlobe operates in 12 countries, serving over 200 schools with diverse student populations. The organization's growth created an urgent need for faster lesson creation without sacrificing quality. LessonLoom was positioned as a strategic initiative to unlock educational scale.
        </p>
      </div>

      <div className="mb-12">
        <h3 className="text-2xl font-bold text-gray-900 mb-8">Key Challenges to Solve</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {challenges.map((challenge, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-gradient-to-br from-red-50 to-orange-50 rounded-lg p-6 border border-red-100"
            >
              <div className="flex items-start gap-4">
                <MdWarning className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">{challenge.title}</h4>
                  <p className="text-gray-700 text-sm">{challenge.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-8">
        <h3 className="font-semibold text-gray-900 mb-4">Why This Mattered</h3>
        <p className="text-gray-700 leading-relaxed">
          Instructional designers and teachers were experiencing genuine time pressure. Manual lesson creation involved: analyzing curriculum documents, crafting learning objectives, writing content, creating assessments, and adapting materials for different grades. Most lessons took 3-5 hours to produce well.
        </p>
        <p className="text-gray-700 leading-relaxed mt-4">
          The goal wasn't to replace designers—it was to shift their time from repetitive content generation to higher-value design work: pedagogy refinement, assessment design, and customization for specific learner needs. If we could automate the initial draft, designers could spend more time on quality and less on typing.
        </p>
      </div>
    </motion.div>
  );
}
