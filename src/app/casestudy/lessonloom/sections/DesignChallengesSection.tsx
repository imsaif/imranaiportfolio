import { motion } from 'framer-motion';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const DocumentIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const GridIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
  </svg>
);

const UserIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5m0 0l9 5m-9-5v10l9 5m0 0l9-5m-9 5v-10m0 0l-9-5" />
  </svg>
);

const MapIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.553-.894L9 7.711v12.289zm0 0l6-3.446m0 0l5.447-2.724A1 1 0 0121 7.618v10.764a1 1 0 01-1.553.894L15 16.289m0 0l-6 3.446m0 0v-5.111m0 5.111v-5.111" />
  </svg>
);

export function DesignChallengesSection() {
  const challenges = [
    {
      title: 'Curriculum Alignment',
      description: 'Ensuring AI-generated content adheres to specific curriculum frameworks and learning standards across different regions and education systems.',
      icon: DocumentIcon,
      gradient: 'from-blue-50 to-indigo-50',
      borderColor: 'border-blue-100',
      iconColor: 'text-blue-600'
    },
    {
      title: 'Content Diversity',
      description: 'Generating varied, contextually relevant lesson content that avoids repetition and maintains educational rigor across thousands of lessons.',
      icon: GridIcon,
      gradient: 'from-purple-50 to-pink-50',
      borderColor: 'border-purple-100',
      iconColor: 'text-purple-600'
    },
    {
      title: 'Age-Appropriate Content',
      description: 'Tailoring complexity, language, and examples to suit specific age groups and developmental stages while maintaining pedagogical accuracy.',
      icon: UserIcon,
      gradient: 'from-green-50 to-emerald-50',
      borderColor: 'border-green-100',
      iconColor: 'text-green-600'
    },
    {
      title: 'Localization at Scale',
      description: 'Supporting multiple languages while preserving cultural context, educational nuances, and local curriculum requirements.',
      icon: MapIcon,
      gradient: 'from-orange-50 to-amber-50',
      borderColor: 'border-orange-100',
      iconColor: 'text-orange-600'
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
          {challenges.map((challenge, idx) => {
            const IconComponent = challenge.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`bg-gradient-to-br ${challenge.gradient} rounded-lg p-6 border ${challenge.borderColor}`}
              >
                <div className="flex items-start gap-4">
                  <IconComponent className={`w-6 h-6 ${challenge.iconColor} flex-shrink-0 mt-1`} />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">{challenge.title}</h4>
                    <p className="text-gray-700 text-sm">{challenge.description}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
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
