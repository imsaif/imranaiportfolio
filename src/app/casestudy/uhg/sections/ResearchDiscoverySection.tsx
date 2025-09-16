import { motion } from 'framer-motion';

export function ResearchDiscoverySection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="mb-12">
        <div className="bg-gray-50 border-l-4 border-gray-400 p-6 rounded-xl mb-8">
          <h4 className="font-bold text-gray-800 mb-3 text-lg">🔍 Research Strategy</h4>
          <p className="text-gray-800 leading-relaxed">
            I needed to understand both user behavior and system constraints without being able to conduct
            traditional usability testing due to <strong>healthcare privacy restrictions</strong>. This required
            creative research approaches and multiple data triangulation methods.
          </p>
        </div>
      </div>

      <div className="mb-16">
        <h3 className="text-gray-800 font-bold text-2xl mb-8">Research Methods</h3>
        <p className="text-gray-600 mb-8 leading-relaxed">7-week research phase combining data analysis and user research</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-4 text-lg">📊 Data Analysis</h4>
            <ul className="text-sm text-gray-800 space-y-2">
              <li>• 6 months of analytics data identifying 12 drop-off points</li>
              <li>• 800+ customer service transcripts categorized by issue type</li>
              <li>• Technical system mapping across 3 backend systems</li>
              <li>• Heuristic evaluation using healthcare UX principles</li>
            </ul>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-4 text-lg">👥 User Research</h4>
            <ul className="text-sm text-gray-800 space-y-2">
              <li>• 12 remote interviews across demographics and tech levels</li>
              <li>• 8-participant diary study over 3 weeks</li>
              <li>• Task analysis with successful "power users" (1.1%)</li>
              <li>• Stakeholder interviews across all affected teams</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mb-16">
        <h3 className="text-gray-800 font-bold text-2xl mb-8">Key Research Insights</h3>

        <div className="mb-12">
          <h4 className="font-bold text-gray-900 mb-6 text-xl">User Mental Models vs. System Logic</h4>
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-6">
            <p className="text-gray-800 leading-relaxed mb-6">
              Users thought of expenses by event ("my dentist visit") while system organized by tax category ("preventive care")
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl">
                <h5 className="font-semibold text-red-800 mb-2">❌ System Logic</h5>
                <p className="text-sm text-gray-700">Organized by tax category ("preventive care")</p>
                <p className="text-xs text-gray-600 mt-2">Required immediate feedback but system needed 24-48 hour processing</p>
              </div>
              <div className="flex items-center justify-center">
                <span className="text-3xl font-bold text-gray-400">vs</span>
              </div>
              <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-xl">
                <h5 className="font-semibold text-green-800 mb-2">✅ User Mental Model</h5>
                <p className="text-sm text-gray-700">Thought by event ("my dentist visit")</p>
                <p className="text-xs text-gray-600 mt-2">Wanted simple yes/no but regulations required detailed documentation</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h4 className="font-bold text-gray-900 mb-6 text-xl">Four Primary User Types Emerged</h4>
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div>
                <p className="mb-2"><strong>📱 Digital Natives (32%)</strong>: Expected instant mobile experience, abandoned after first failure</p>
                <p className="mb-2"><strong>💻 Traditional Planners (41%)</strong>: Preferred desktop with detailed forms and documentation</p>
              </div>
              <div>
                <p className="mb-2"><strong>🤝 Assisted Users (18%)</strong>: Required customer service help and simplified workflows</p>
                <p><strong>📊 Bulk Processors (9%)</strong>: Business owners needing batch processing capabilities</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-12">
        <h4 className="font-bold text-gray-900 mb-6 text-xl">Cross-Device Behavior Pattern</h4>
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
          <p className="text-gray-800 text-sm leading-relaxed">
            <strong>78% started on mobile, 45% switched to desktop after failures.</strong> Device choice was
            context-dependent—users needed connected experiences across platforms, not identical interfaces.
          </p>
        </div>
      </div>

      <div className="mb-12">
        <h4 className="font-bold text-gray-900 mb-6 text-xl">Competitive Analysis Insights</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h5 className="font-semibold text-gray-800 mb-3">🏦 Key Competitors</h5>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• <strong>HSA Bank</strong>: Simpler upload but lacked intelligent categorization</li>
              <li>• <strong>Fidelity HSA</strong>: Better error handling but more complex navigation</li>
              <li>• <strong>Bank of America</strong>: Faster but provided less transparency about approval process</li>
            </ul>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
            <h5 className="font-semibold text-yellow-800 mb-3">🎯 Market Gap</h5>
            <p className="text-sm text-gray-700 leading-relaxed">
              <strong>None of the competitors effectively handled cross-device continuity</strong>. This represented a significant competitive advantage opportunity.
            </p>
          </div>
        </div>
      </div>

      <div className="mb-12">
        <h4 className="font-bold text-gray-900 mb-6 text-xl">Technical Failure Analysis</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-red-600">67%</span>
            </div>
            <h5 className="font-semibold text-gray-900 mb-2">Upload Failures</h5>
            <p className="text-sm text-gray-600">Timeout, size limits, format issues</p>
            <p className="text-xs text-gray-500 mt-2">Most common technical barrier</p>
          </div>
          <div className="text-center">
            <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-orange-600">23%</span>
            </div>
            <h5 className="font-semibold text-gray-900 mb-2">Validation Errors</h5>
            <p className="text-sm text-gray-600">Form errors after upload</p>
            <p className="text-xs text-gray-500 mt-2">Occurred after successful upload</p>
          </div>
          <div className="text-center">
            <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-yellow-600">10%</span>
            </div>
            <h5 className="font-semibold text-gray-900 mb-2">User Confusion</h5>
            <p className="text-sm text-gray-600">Required information unclear</p>
            <p className="text-xs text-gray-500 mt-2">Process understanding gaps</p>
          </div>
        </div>
      </div>

    </motion.div>
  );
}