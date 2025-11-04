'use client';

import { motion } from 'framer-motion';
import { MdTrendingUp, MdFolderSpecial, MdGroupWork, MdCheckCircle } from 'react-icons/md';

export function StrategicBusinessContextSection() {
  return (
    <motion.div
      id="strategic-business-context"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Strategic Business Context</h2>

        {/* Market Position */}
        <div className="bg-white border border-gray-200 rounded-xl p-8 mb-8 shadow-sm">
          <div className="flex items-start gap-4 mb-6">
            <MdTrendingUp className="text-blue-600 flex-shrink-0" size={28} />
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Market Position & Competitive Landscape</h3>
              <p className="text-gray-700 mb-6">
                UnitedHealth Group's Optum Bank was facing significant customer satisfaction challenges. With 450K active HSA users and the reimbursement feature being the lowest-performing part of the platform, it was becoming a risk for retention.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-2">User Base Impact</p>
                  <p className="text-lg font-bold text-blue-600">450K users</p>
                  <p className="text-xs text-gray-500">At risk of churn</p>
                </div>
                <div className="bg-red-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-2">Support Cost</p>
                  <p className="text-lg font-bold text-red-600">High</p>
                  <p className="text-xs text-gray-500">Disproportionate support load</p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-2">Competitive Risk</p>
                  <p className="text-lg font-bold text-yellow-600">Moderate</p>
                  <p className="text-xs text-gray-500">Fintech competitors improving</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Why Strategic */}
        <div className="bg-white border border-gray-200 rounded-xl p-8 mb-8 shadow-sm">
          <div className="flex items-start gap-4 mb-6">
            <MdFolderSpecial className="text-purple-600 flex-shrink-0" size={28} />
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Why This Project Was Board-Level Priority</h3>
              <p className="text-gray-700 mb-6">
                This wasn't just a UX improvement—it was a strategic business initiative with C-suite sponsorship driven by key OKRs and fiscal pressures.
              </p>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <CheckIcon />
                  <div>
                    <p className="font-medium text-gray-900">Customer retention was a key OKR</p>
                    <p className="text-sm text-gray-600">Core metric for investor relations</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckIcon />
                  <div>
                    <p className="font-medium text-gray-900">Operational costs were 3x industry benchmark</p>
                    <p className="text-sm text-gray-600">$8.4M annually in support overhead</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckIcon />
                  <div>
                    <p className="font-medium text-gray-900">Regulatory compliance audit was imminent</p>
                    <p className="text-sm text-gray-600">8-month window to address systemic issues</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckIcon />
                  <div>
                    <p className="font-medium text-gray-900">Competitive differentiation opportunity</p>
                    <p className="text-sm text-gray-600">Commoditized HSA market needed innovation</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Investment Case */}
        <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
          <div className="flex items-start gap-4 mb-6">
            <MdGroupWork className="text-green-600 flex-shrink-0" size={28} />
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Investment Case I Built</h3>
              <p className="text-gray-700 mb-6">
                The business case required demonstrating clear ROI and risk mitigation to secure executive commitment and resources.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                  <h4 className="font-bold text-green-900 mb-3">Financial Impact</h4>
                  <ul className="space-y-2 text-sm text-green-800">
                    <li className="flex gap-2">
                      <span className="font-semibold min-w-fit">Team Investment:</span>
                      <span>6-month design effort + engineering</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-semibold min-w-fit">Annual Savings:</span>
                      <span>~$800K in support costs</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-semibold min-w-fit">Retention Value:</span>
                      <span>Reduced customer churn risk</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                  <h4 className="font-bold text-blue-900 mb-3">Success Metrics</h4>
                  <ul className="space-y-2 text-sm text-blue-800">
                    <li className="flex gap-2">
                      <span className="font-semibold min-w-fit">Completion Rate:</span>
                      <span>1.1% → 30% (27x improvement)</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-semibold min-w-fit">Support Reduction:</span>
                      <span>30% fewer calls</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-semibold min-w-fit">Mobile Gains:</span>
                      <span>0.3% → 18% completion</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Gradient divider */}
        <div className="w-full h-px my-8 bg-gray-200" />
      </div>
    </motion.div>
  );
}

function CheckIcon() {
  return (
    <div className="flex-shrink-0 mt-1">
      <MdCheckCircle className="text-green-600" size={20} />
    </div>
  );
}
