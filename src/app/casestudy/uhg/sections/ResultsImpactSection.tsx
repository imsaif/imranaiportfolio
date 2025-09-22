import { motion } from 'framer-motion';
import { MdTrendingUp, MdPolicy, MdAltRoute, MdSettings, MdLocalHospital, MdPhoneAndroid } from 'react-icons/md';

export function ResultsImpactSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="mb-20">
        <h3 className="text-gray-800 font-bold text-xl mb-6">User Experience Improvements</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">23%</div>
            <div className="text-base font-medium text-gray-900 mb-1">Task Completion</div>
            <div className="text-xs text-gray-600">From 1.1%</div>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">12min</div>
            <div className="text-base font-medium text-gray-900 mb-1">Avg Completion Time</div>
            <div className="text-xs text-gray-600">From 18 minutes</div>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">15%</div>
            <div className="text-base font-medium text-gray-900 mb-1">Mobile Completion</div>
            <div className="text-xs text-gray-600">From 0.3%</div>
          </div>
        </div>

      </div>

      <div className="mb-20">
        <h3 className="text-gray-800 font-bold text-xl mb-6">Business Impact</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8">
            <h4 className="font-bold text-gray-800 mb-3">🏢 Operational Efficiency</h4>
            <p className="text-gray-700 text-base leading-relaxed">
              Automated workflows dramatically reduced manual processing and support burden, allowing teams to focus on higher-value activities.
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8">
            <h4 className="font-bold text-gray-800 mb-3">😊 Customer Satisfaction</h4>
            <p className="text-gray-700 text-base leading-relaxed">
              Improved self-service capabilities led to higher platform engagement and reduced customer frustration.
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8">
            <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
              <MdTrendingUp className="text-green-500" size={20} />
              Scalability
            </h4>
            <p className="text-gray-700 text-base leading-relaxed">
              The redesigned system now handles increased transaction volume without requiring additional support resources.
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8">
            <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
              <MdPolicy className="text-blue-500" size={20} />
              Compliance
            </h4>
            <p className="text-gray-700 text-base leading-relaxed">
              Enhanced documentation and audit trails improved regulatory adherence and reduced compliance risks.
            </p>
          </div>
        </div>

      </div>

      <div className="mb-20">
        <h3 className="text-gray-800 font-bold text-xl mb-6">Key Learnings and Design Insights</h3>

        <div className="bg-gray-50 border border-gray-200 rounded-xl p-8">
          <div className="space-y-4 text-base">
            <div>
              <strong className="text-gray-900 flex items-center gap-1">
                <MdLocalHospital className="text-green-500" size={16} />
                Regulation as Feature:
              </strong>
              <span className="text-gray-700 ml-2">Reframed compliance requirements as trust-building opportunities</span>
            </div>
            <div>
              <strong className="text-gray-900 flex items-center gap-1">
                <MdAltRoute className="text-blue-500" size={16} />
                Multi-Path Solutions:
              </strong>
              <span className="text-gray-700 ml-2">Diverse user needs required fundamentally different approaches</span>
            </div>
            <div>
              <strong className="text-gray-900 flex items-center gap-1">
                <MdSettings className="text-orange-500" size={16} />
                Constraints Drive Innovation:
              </strong>
              <span className="text-gray-700 ml-2">Technical limitations forced creative solutions that improved performance</span>
            </div>
            <div>
              <strong className="text-gray-900 flex items-center gap-1">
                <MdPhoneAndroid className="text-blue-500" size={16} />
                System-Level Design:
              </strong>
              <span className="text-gray-700 ml-2">Cross-device completion required experience orchestration, not just screen optimization</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-gray-800 font-bold text-xl mb-6">Long-term Impact & Future Directions</h3>

      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-xl p-8">
        <div className="flex items-start">
          <div className="text-3xl mr-4">💬</div>
          <div className="flex-1">
            <blockquote className="text-gray-800 italic leading-relaxed mb-3">
              "The redesign transformed our support model and became our blueprint for improving other complex workflows."
            </blockquote>
            <div className="text-sm">
              <div className="text-gray-600">Director of Product</div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}