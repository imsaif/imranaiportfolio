import { motion } from 'framer-motion';
import { MdWarning, MdGroups, MdEngineering, MdPolicy } from 'react-icons/md';

export function ProjectOverviewSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* Overview Section */}
      <div className="mb-20">
        <div className="flex flex-col md:flex-row gap-10 items-stretch">
          {/* Left column - Role, Organization, Technologies */}
          <div className="bg-white rounded-xl p-6 space-y-3 md:w-1/3 w-full border border-gray-200">
            <div className="border border-gray-200 rounded-lg p-3 bg-white">
              <div className="text-xs text-gray-500">Role</div>
              <div className="text-base font-semibold text-gray-900">Lead UX Designer</div>
            </div>
            <div className="border border-gray-200 rounded-lg p-3 bg-white">
              <div className="text-xs text-gray-500">Organization</div>
              <div className="text-base font-semibold text-gray-900">United Health Group/Optum Bank</div>
            </div>
            <div className="border border-gray-200 rounded-lg p-3 bg-white">
              <div className="text-xs text-gray-500">Technologies</div>
              <div className="text-base font-semibold text-gray-900">React Native, Node.js, AWS OCR, PostgreSQL</div>
            </div>
          </div>

          {/* Right column - Context */}
          <div className="flex-1 bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-sm p-8 flex items-center border border-gray-200">
            <p className="text-gray-700 text-lg">
              Before the redesign, users struggled with a complex reimbursement process that was manual, error-prone, and inflexible.
              As Lead UX Designer, I worked with cross-functional teams to design an automated, intelligent system that reduced abandonment by 75% and support calls by 52%.
            </p>
          </div>
        </div>
      </div>

      {/* Gradient divider */}
      <div className="w-full h-px my-4 bg-gray-200" />

      {/* Problem Statement */}
      <div className="mb-12">
        <div className="bg-gray-50 border-l-4 border-gray-400 p-8 rounded-xl">
          <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <MdWarning className="text-red-500" size={24} />
            The Challenge
          </h4>
          <p className="text-gray-800 text-lg leading-relaxed mb-4">
            The HSA platform serves <strong>450K users</strong> managing their healthcare reimbursements, but the feature had a <strong className="text-slate-700">98.9% abandonment rate</strong> with only a <strong>1.1% completion rate</strong>—the lowest performing feature in the platform.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-base">
            <div>
              <p className="font-medium text-gray-700 mb-2">Key Problems:</p>
              <ul className="text-gray-600 space-y-1">
                <li>• Scattered forms across multiple screens</li>
                <li>• Generic error messages with no guidance</li>
                <li>• Inconsistent mobile/desktop experiences</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-gray-700 mb-2">User Impact:</p>
              <ul className="text-gray-600 space-y-1">
                <li>• 18-minute average completion time</li>
                <li>• 22% of support calls were reimbursement-related</li>
                <li>• "I gave up after it lost my receipt again"</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Gradient divider */}
      <div className="w-full h-px my-4 bg-gray-200" />

      {/* Complexity & Constraints */}
      <div className="mb-12">
        <h3 className="text-gray-800 font-bold text-xl mb-6">Complexity & Constraints</h3>
        <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-base">
            <div>
              <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <MdGroups className="text-blue-500" size={20} />
                Multi-User Challenge
              </h4>
              <p className="text-gray-600">Four distinct user types with conflicting needs—from digital natives to assisted users</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <MdEngineering className="text-orange-500" size={20} />
                Technical Constraints
              </h4>
              <p className="text-gray-600">Legacy systems, OCR processing, and mobile network reliability issues</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <MdPolicy className="text-green-500" size={20} />
                Regulatory Requirements
              </h4>
              <p className="text-gray-600">IRS compliance, HIPAA restrictions, and mandatory audit trails</p>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-gray-700 text-base">
              <strong>Cross-device reality:</strong> 67% started on mobile, 38% switched to desktop after failures—revealing device choice was context-dependent.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}