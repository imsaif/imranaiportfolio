import { motion } from 'framer-motion';

export function ProjectOverviewSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* Challenge Statement */}
      <div className="mb-8">
        <div className="bg-gray-50 border-l-4 border-gray-400 p-6 rounded-xl mb-8">
          <h4 className="font-bold text-gray-800 mb-3 text-xl">🚨 The Challenge</h4>
          <p className="text-gray-800 text-lg leading-relaxed">
            HSA reimbursement system serving <strong>450K users</strong> had fundamental usability and technical
            issues causing <strong className="text-red-600">98.9% task abandonment</strong> and significant business impact.
          </p>
        </div>
      </div>

      {/* Role and Context */}
      <div className="mb-12">
        <div className="bg-gray-50 p-6 rounded-xl">
          <p className="text-gray-800 leading-relaxed">
            As <strong>Lead UX Designer</strong>, I led a <strong>6-month redesign</strong> working with
            engineering, product, and compliance teams. The primary constraint was maintaining
            healthcare financial regulations while dramatically improving user experience.
          </p>
        </div>
      </div>

      {/* Business Context */}
      <div className="mb-12">
        <h3 className="text-gray-800 font-bold text-xl mb-6">Business Context</h3>
        <p className="text-gray-800 mb-8 leading-relaxed">
          UnitedHealth Group's Optum Bank HSA platform processes <strong>$450M annually</strong> in health
          savings account transactions. The reimbursement feature—where users submit medical receipts
          for approval—was failing dramatically.
        </p>

        {/* Current State Analysis */}
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-8">
          <h4 className="font-bold text-gray-900 mb-6">Current State Analysis: The Failing System</h4>

          <div className="mb-6">
            <h5 className="font-semibold text-gray-800 mb-3">Key Issues Identified in Current Design:</h5>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• Form fields scattered across multiple screens without clear progress indication</li>
              <li>• Upload interface provided no guidance on photo quality or file requirements</li>
              <li>• Error messages were generic ("Upload failed") with no recovery guidance</li>
              <li>• Status updates were buried in account dashboards with unclear timelines</li>
              <li>• Mobile and desktop experiences were inconsistent, causing confusion for cross-device users</li>
            </ul>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h5 className="font-semibold text-gray-800 mb-3">📊 Quantitative Evidence</h5>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• <strong>98.9%</strong> of users abandoned the process</li>
                <li>• <strong>18 minutes</strong> average completion time</li>
                <li>• <strong>22%</strong> of customer service calls were reimbursement-related</li>
                <li>• Only <strong>1 in 90</strong> users who started actually completed it</li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold text-gray-800 mb-3">💬 Qualitative Insights</h5>
              <div className="space-y-2 text-sm text-gray-700 italic">
                <p>"I gave up after the third time it lost my receipt"</p>
                <p>"I don't understand why my doctor visit isn't covered"</p>
                <p>"The app crashed when I tried to upload the photo"</p>
                <p>"I never know if my reimbursement was approved or denied"</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why Complex */}
      <div className="mb-12">
        <h3 className="text-gray-800 font-bold text-xl mb-6">Why This Problem Was Complex</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h4 className="font-bold text-gray-800 mb-4">User & Technical Challenges</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• Four distinct user types with conflicting needs</li>
              <li>• File uploads across 3 different backend systems</li>
              <li>• OCR processing with variable receipt formats</li>
              <li>• Mobile network failures causing frequent abandonment</li>
            </ul>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h4 className="font-bold text-gray-800 mb-4">Regulatory Constraints</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• IRS compliance requirements for all submissions</li>
              <li>• HIPAA data handling restrictions</li>
              <li>• State tax law variations affecting 40% of users</li>
              <li>• Mandatory audit trails for every user action</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Cross-Device Reality */}
      <div className="mb-8">
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
          <h4 className="font-bold text-gray-800 mb-3">📱💻 Cross-Device Usage Pattern</h4>
          <p className="text-gray-800 text-sm leading-relaxed">
            <strong>67% started on mobile, 38% switched to desktop after failures</strong>—revealing
            device choice was context-dependent, requiring connected experiences across platforms.
          </p>
        </div>
      </div>
    </motion.div>
  );
}