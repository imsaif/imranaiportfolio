import { motion } from 'framer-motion';

export function ResultsImpactSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="mb-12">
        <h3 className="text-gray-800 font-bold text-xl mb-6">User Experience Improvements</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">23%</div>
            <div className="text-sm font-medium text-gray-900 mb-1">Task Completion</div>
            <div className="text-xs text-gray-600">From 1.1%</div>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">12min</div>
            <div className="text-sm font-medium text-gray-900 mb-1">Avg Completion Time</div>
            <div className="text-xs text-gray-600">From 18 minutes</div>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">15%</div>
            <div className="text-sm font-medium text-gray-900 mb-1">Mobile Completion</div>
            <div className="text-xs text-gray-600">From 0.3%</div>
          </div>
        </div>

      </div>

      <div className="mb-12">
        <h3 className="text-gray-800 font-bold text-xl mb-6">Business Impact</h3>

        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-8">
          <h4 className="font-bold text-gray-800 mb-4">💰 Key Business Metrics</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Customer service cost reduction</span>
                <span className="font-bold">$1.8M</span>
              </div>
              <div className="flex justify-between">
                <span>Additional reimbursement volume</span>
                <span className="font-bold">$3.2M</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Customer service call reduction</span>
                <span className="font-bold">52%</span>
              </div>
              <div className="flex justify-between">
                <span>Processing time improvement</span>
                <span className="font-bold">30%</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div className="mb-12">
        <h3 className="text-gray-800 font-bold text-xl mb-6">Key Learnings and Design Insights</h3>

        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
          <div className="space-y-4 text-sm">
            <div>
              <strong className="text-gray-900">🏥 Regulation as Feature:</strong>
              <span className="text-gray-700 ml-2">Reframed compliance requirements as trust-building opportunities</span>
            </div>
            <div>
              <strong className="text-gray-900">🛤️ Multi-Path Solutions:</strong>
              <span className="text-gray-700 ml-2">Diverse user needs required fundamentally different approaches</span>
            </div>
            <div>
              <strong className="text-gray-900">⚙️ Constraints Drive Innovation:</strong>
              <span className="text-gray-700 ml-2">Technical limitations forced creative solutions that improved performance</span>
            </div>
            <div>
              <strong className="text-gray-900">📱 System-Level Design:</strong>
              <span className="text-gray-700 ml-2">Cross-device completion required experience orchestration, not just screen optimization</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-gray-800 font-bold text-xl mb-6">Long-term Impact & Future Directions</h3>

      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
        <div className="flex items-start">
          <div className="text-3xl mr-4">💬</div>
          <div className="flex-1">
            <blockquote className="text-gray-800 italic leading-relaxed mb-3">
              "The HSA reimbursement redesign saved millions in support costs and became our model
              for tackling complex regulated experiences."
            </blockquote>
            <div className="flex items-center justify-between text-sm">
              <div className="text-gray-600">Director of Product, Optum Bank</div>
              <div className="font-bold text-green-600">$5M+ Annual Impact</div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}