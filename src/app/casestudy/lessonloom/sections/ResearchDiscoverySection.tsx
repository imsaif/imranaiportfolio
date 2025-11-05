import { motion } from 'framer-motion';
import { MdSearch } from 'react-icons/md';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

export function ResearchDiscoverySection() {
  return (
    <motion.div {...fadeIn} className="max-w-4xl mx-auto">
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Research & Discovery</h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          Understanding educator workflows, pain points, and mental models shaped every design decision. We invested heavily in research before a single mockup was created.
        </p>
      </div>

      <div className="space-y-8 mb-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0 }}
          className="bg-blue-50 rounded-lg p-6 border border-blue-200"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-3">
            <MdSearch className="w-6 h-6 text-blue-600" />
            User Interviews (8 Instructional Designers)
          </h3>
          <p className="text-gray-700 mb-4">
            We conducted in-depth interviews with 8 instructional designers at NewGlobe to understand their day-to-day workflows. Key findings:
          </p>
          <ul className="space-y-2 text-gray-700">
            <li>• Lesson creation averaged 3-5 hours per lesson plan</li>
            <li>• 40% of time spent on curriculum research and validation</li>
            <li>• Manual adaptation for different age groups was tedious and error-prone</li>
            <li>• Localization into 5+ languages was a significant bottleneck</li>
            <li>• Biggest concern: maintaining pedagogical rigor and accuracy</li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-green-50 rounded-lg p-6 border border-green-200"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-3">
            <MdSearch className="w-6 h-6 text-green-600" />
            Content Analysis (150+ Lesson Guides)
          </h3>
          <p className="text-gray-700 mb-4">
            We analyzed 150+ existing lesson guides from NewGlobe's content library to understand:
          </p>
          <ul className="space-y-2 text-gray-700">
            <li>• Common lesson structures and patterns</li>
            <li>• Typical learning objectives for different grades</li>
            <li>• How assessments are designed and sequenced</li>
            <li>• Variation in instructional approaches across subject areas</li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-purple-50 rounded-lg p-6 border border-purple-200"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-3">
            <MdSearch className="w-6 h-6 text-purple-600" />
            Pain Point Analysis & Journey Mapping
          </h3>
          <p className="text-gray-700 mb-4">
            We created detailed journey maps showing the lesson creation process from curriculum alignment through teacher approval:
          </p>
          <ul className="space-y-2 text-gray-700">
            <li>• Identified 12+ decision points where designers needed to verify accuracy</li>
            <li>• Found that 30% of time was spent in "quality assurance" activities</li>
            <li>• Discovered that localization created a 2-week delay in publishing timelines</li>
            <li>• Recognized that designer burnout was a hidden cost</li>
          </ul>
        </motion.div>
      </div>

      <div className="bg-gradient-to-r from-slate-50 to-gray-50 rounded-lg p-8 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Key Research Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Educators Want AI, But...</h4>
            <p className="text-gray-700 text-sm">
              Teachers and designers were eager to use AI to boost productivity—but only if it didn't compromise educational quality. Trust in the output was paramount.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Templates, Not Blank Slates</h4>
            <p className="text-gray-700 text-sm">
              Rather than "generate anything," educators wanted the AI to fill in content for predefined lesson templates that matched their pedagogical approach.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Spreadsheet-Driven Workflows</h4>
            <p className="text-gray-700 text-sm">
              Content organization happened in spreadsheets. If we could make the AI understand and ingest spreadsheet structures, adoption would be seamless.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Review Always Required</h4>
            <p className="text-gray-700 text-sm">
              100% of research participants said they would review every AI-generated lesson before publishing. Design needed to support quality review workflows.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
