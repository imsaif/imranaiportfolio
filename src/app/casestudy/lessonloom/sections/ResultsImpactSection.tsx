import { motion } from 'framer-motion';
import { MdShowChart, MdTrendingUp } from 'react-icons/md';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

export function ResultsImpactSection() {
  return (
    <motion.div {...fadeIn} className="max-w-4xl mx-auto">
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Results & Impact</h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          LessonLoom delivered measurable impact on educator productivity, student learning, and organizational scale. The platform has been adopted across NewGlobe's network and continues to improve.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0 }}
          className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-8 border border-blue-200 text-center"
        >
          <div className="text-4xl font-bold text-blue-600 mb-3 flex items-center justify-center gap-2">
            <MdTrendingUp className="w-10 h-10" />
            ~50%
          </div>
          <p className="text-gray-900 font-semibold mb-2">Time Saved in Drafting</p>
          <p className="text-gray-700 text-sm">Reduced initial lesson creation time from 3-5 hours to roughly 2-3 hours with AI assistance</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-8 border border-green-200 text-center"
        >
          <div className="text-4xl font-bold text-green-600 mb-3 flex items-center justify-center gap-2">
            <MdShowChart className="w-10 h-10" />
            2K+
          </div>
          <p className="text-gray-900 font-semibold mb-2">Lessons Generated</p>
          <p className="text-gray-700 text-sm">Successfully generated and deployed across NewGlobe's network in pilot phase</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-8 border border-purple-200 text-center"
        >
          <div className="text-4xl font-bold text-purple-600 mb-3 flex items-center justify-center gap-2">
            <MdShowChart className="w-10 h-10" />
            Positive
          </div>
          <p className="text-gray-900 font-semibold mb-2">Educator Feedback</p>
          <p className="text-gray-700 text-sm">Teachers found the tool helpful for speeding up initial drafts while maintaining full control over quality</p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-lg p-8 border border-indigo-200"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Measurable Outcomes</h3>
          <ul className="space-y-4 text-gray-700">
            <li className="flex gap-4">
              <span className="text-2xl flex-shrink-0">⏱️</span>
              <div>
                <p className="font-semibold text-gray-900">~50% Time Savings on Drafting</p>
                <p className="text-sm text-gray-600">Reduced initial creation phase from 3-5 hours to roughly 2-3 hours</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="text-2xl flex-shrink-0">🌍</span>
              <div>
                <p className="font-semibold text-gray-900">Multiple Language Support</p>
                <p className="text-sm text-gray-600">Built foundation for curriculum-aware generation across different regions</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="text-2xl flex-shrink-0">📚</span>
              <div>
                <p className="font-semibold text-gray-900">Successful Pilot Adoption</p>
                <p className="text-sm text-gray-600">Teams actively using the tool reported it as helpful to their workflow</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="text-2xl flex-shrink-0">🔍</span>
              <div>
                <p className="font-semibold text-gray-900">Quality Control Maintained</p>
                <p className="text-sm text-gray-600">All AI-generated content required educator review before deployment</p>
              </div>
            </li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg p-8 border border-amber-200"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Design Learnings</h3>
          <div className="space-y-4 text-gray-700">
            <div>
              <p className="font-semibold text-gray-900 mb-2">Educator Agency Matters</p>
              <p className="text-sm">The most important feature wasn't speed—it was giving teachers full control over AI-generated content and the ability to refine or reject outputs.</p>
            </div>
            <div>
              <p className="font-semibold text-gray-900 mb-2">Trust Required Transparency</p>
              <p className="text-sm">Showing exactly what the AI was doing (prompts, parameters, limitations) was critical for educator trust and adoption.</p>
            </div>
            <div>
              <p className="font-semibold text-gray-900 mb-2">Workflow Alignment is Key</p>
              <p className="text-sm">The tool succeeded when it fit into existing educator workflows rather than forcing new processes.</p>
            </div>
            <div>
              <p className="font-semibold text-gray-900 mb-2">AI + Human = Better</p>
              <p className="text-sm">AI-assisted first drafts reviewed by expert educators produced better lessons than either AI alone or purely manual creation.</p>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gradient-to-r from-slate-50 to-gray-50 rounded-lg p-8 border border-gray-200"
      >
        <h3 className="text-xl font-bold text-gray-900 mb-4">What This Project Revealed</h3>
        <p className="text-gray-700 leading-relaxed mb-4">
          LessonLoom showed me that designing for AI isn't about building perfectly automated systems—it's about designing the partnership between humans and AI. The best outcome wasn't speed at all costs; it was shifting educator time from administrative work to high-value design decisions.
        </p>
        <p className="text-gray-700 leading-relaxed">
          This experience fundamentally shaped how I approach AI product design. It reinforced that transparent, controllable AI systems that respect user expertise build trust faster than "magic" AI that makes decisions opaquely. That principle guides my work today.
        </p>
      </motion.div>
    </motion.div>
  );
}
