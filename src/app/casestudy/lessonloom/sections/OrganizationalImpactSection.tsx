import { motion } from 'framer-motion';
import { MdTrendingUp } from 'react-icons/md';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

export function OrganizationalImpactSection() {
  return (
    <motion.div {...fadeIn} className="max-w-4xl mx-auto">
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Organizational Impact</h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          LessonLoom didn't just create lessons faster—it fundamentally changed how NewGlobe approached content creation, establishing new workflows that became standard across the organization.
        </p>
      </div>

      <div className="space-y-8 mb-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0 }}
          className="border-l-4 border-blue-500 pl-6"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-3">
            <MdTrendingUp className="w-6 h-6 text-blue-600" />
            Scale & Efficiency
          </h3>
          <p className="text-gray-700">
            What used to require 6 instructional designers working for 3 months can now be accomplished by 2 designers in 2 weeks. Content creation bottlenecks were eliminated, enabling NewGlobe to expand from 200 to 500 schools within 12 months.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="border-l-4 border-green-500 pl-6"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-3">
            <MdTrendingUp className="w-6 h-6 text-green-600" />
            Pattern & Best Practices
          </h3>
          <p className="text-gray-700">
            LessonLoom established the template for "AI-assisted content creation" within NewGlobe. Teams across curriculum, assessment, and materials development adopted similar workflows, creating consistency in how the organization approaches AI integration.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="border-l-4 border-purple-500 pl-6"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-3">
            <MdTrendingUp className="w-6 h-6 text-purple-600" />
            Team Development
          </h3>
          <p className="text-gray-700">
            The project upskilled NewGlobe's team in AI design patterns, prompt engineering for education, and how to effectively collaborate with AI systems. Knowledge sharing sessions reached 50+ team members across departments.
          </p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-6 border border-blue-100 text-center">
          <div className="text-3xl font-bold text-blue-600 mb-2">3-4x</div>
          <p className="text-gray-700 text-sm">Productivity increase in content drafting</p>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6 border border-green-100 text-center">
          <div className="text-3xl font-bold text-green-600 mb-2">50+</div>
          <p className="text-gray-700 text-sm">Additional schools served in first year</p>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-6 border border-purple-100 text-center">
          <div className="text-3xl font-bold text-purple-600 mb-2">~50%</div>
          <p className="text-gray-700 text-sm">Time reduction in initial draft stage</p>
        </div>
      </div>
    </motion.div>
  );
}
