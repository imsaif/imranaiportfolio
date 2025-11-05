import { motion } from 'framer-motion';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

export function DesignSolutionSection() {
  return (
    <motion.div {...fadeIn} className="max-w-4xl mx-auto">
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Design Solution</h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          The LessonLoom interface was designed around three core principles: simplicity, transparency, and educator control. The solution centered on a two-column interface combining a template/spreadsheet library with an AI generation interface.
        </p>
      </div>

      <div className="space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0 }}
          className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-8 border border-blue-200"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">1. Information Architecture</h3>
          <p className="text-gray-700 mb-6 leading-relaxed">
            The system was organized around three core components that match educator mental models:
          </p>
          <div className="space-y-3">
            <div className="flex gap-4">
              <div className="text-3xl font-bold text-blue-600 flex-shrink-0">📋</div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Templates</h4>
                <p className="text-gray-700 text-sm">Predefined lesson structures (5E method, Inquiry-based, Direct Instruction, etc.) that educators select as the foundation</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-3xl font-bold text-green-600 flex-shrink-0">📊</div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Spreadsheets</h4>
                <p className="text-gray-700 text-sm">Educators upload content data (topics, concepts, materials) that feeds the AI generation—matching existing workflows</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-3xl font-bold text-purple-600 flex-shrink-0">✨</div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">AI Generation Interface</h4>
                <p className="text-gray-700 text-sm">Real-time lesson generation with full transparency on what AI is doing and how to refine output</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-8 border border-purple-200"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">2. System Workflow</h3>
          <p className="text-gray-700 mb-6 leading-relaxed">
            The user journey was deliberately simplified to reduce cognitive load:
          </p>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold flex-shrink-0">1</div>
              <div>
                <h4 className="font-semibold text-gray-900">Select Template</h4>
                <p className="text-sm text-gray-700">Choose pedagogical approach (e.g., "5E Lesson Model")</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold flex-shrink-0">2</div>
              <div>
                <h4 className="font-semibold text-gray-900">Upload Content Spreadsheet</h4>
                <p className="text-sm text-gray-700">Drag in CSV with topics, materials, learning objectives</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold flex-shrink-0">3</div>
              <div>
                <h4 className="font-semibold text-gray-900">Generate</h4>
                <p className="text-sm text-gray-700">AI creates lesson content following the template structure</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold flex-shrink-0">4</div>
              <div>
                <h4 className="font-semibold text-gray-900">Review & Refine</h4>
                <p className="text-sm text-gray-700">Educators make edits, request regenerations, adapt for their students</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-8 border border-green-200"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">3. Visual System & Key Design Patterns</h3>
          <p className="text-gray-700 mb-6 leading-relaxed">
            Design decisions were informed by cognitive load research and educator feedback:
          </p>
          <ul className="space-y-3 text-gray-700">
            <li className="flex gap-3">
              <span className="text-xl">🎨</span>
              <span><strong>Clarity Over Beauty:</strong> Clean hierarchy and clear labeling, no unnecessary visual flourish</span>
            </li>
            <li className="flex gap-3">
              <span className="text-xl">🔍</span>
              <span><strong>Transparency First:</strong> All AI operations are visible and explainable to build educator trust</span>
            </li>
            <li className="flex gap-3">
              <span className="text-xl">⚡</span>
              <span><strong>Progressive Disclosure:</strong> Advanced options hidden until needed; novice users see simple flows</span>
            </li>
            <li className="flex gap-3">
              <span className="text-xl">✅</span>
              <span><strong>Confirmation & Reversibility:</strong> All major actions are reversible; educators never lose their work</span>
            </li>
            <li className="flex gap-3">
              <span className="text-xl">📱</span>
              <span><strong>Mobile-Responsive:</strong> Designed for tablets and laptops so educators could use it in the classroom</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </motion.div>
  );
}
