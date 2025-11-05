import { motion } from 'framer-motion';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

export function ProjectOverviewSection() {
  return (
    <motion.div {...fadeIn} className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
          <h3 className="text-sm font-semibold text-gray-600 mb-2 uppercase tracking-wider">Role</h3>
          <p className="text-gray-900 font-medium">Senior Product Designer</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
          <h3 className="text-sm font-semibold text-gray-600 mb-2 uppercase tracking-wider">Timeline</h3>
          <p className="text-gray-900 font-medium">6 months</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
          <h3 className="text-sm font-semibold text-gray-600 mb-2 uppercase tracking-wider">Organization</h3>
          <p className="text-gray-900 font-medium">NewGlobe</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
          <h3 className="text-sm font-semibold text-gray-600 mb-2 uppercase tracking-wider">Team</h3>
          <div className="space-y-1">
            <p className="text-gray-900 font-medium">1 PM</p>
            <p className="text-gray-700 text-sm">1 Solution Architect</p>
            <p className="text-gray-700 text-sm">1 Backend Engineer</p>
            <p className="text-gray-700 text-sm">1 Frontend Engineer</p>
            <p className="text-gray-700 text-sm">1 AI/ML Engineer</p>
            <p className="text-gray-700 text-sm">2 Product Designers</p>
          </div>
        </div>
      </div>

      <div className="prose max-w-none">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">About LessonLoom</h3>
        <p className="text-gray-700 mb-6 leading-relaxed">
          LessonLoom was built to solve one of the most time-consuming challenges in education: lesson planning. Teachers and instructional designers were spending 3-5 hours creating individual lesson plans, analyzing content, ensuring curriculum alignment, and adapting materials for different age groups.
        </p>
        <p className="text-gray-700 mb-6 leading-relaxed">
          The platform uses AI to analyze curriculum frameworks, generate lesson content, and adapt materials across multiple languages—all while maintaining pedagogical rigor and age-appropriate complexity. What used to take hours now takes minutes.
        </p>
      </div>
    </motion.div>
  );
}
