import { motion } from 'framer-motion';

export function TechnicalImplementationSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="mb-8">
        <h3 className="text-gray-800 font-bold text-xl mb-6">Working with Engineering Constraints</h3>
        <div className="bg-gray-50 border-l-4 border-gray-500 p-6 rounded-xl mb-8">
          <p className="text-gray-800 leading-relaxed">
            Rather than working around existing technical limitations, I collaborated closely with the engineering
            team to <strong>redesign system architecture</strong> that better supported user experience goals while
            maintaining regulatory compliance and system reliability.
          </p>
        </div>
      </div>

      <div className="mb-12">
        <h3 className="text-gray-800 font-bold text-xl mb-6">File Upload Architecture Challenges</h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-red-50 border border-red-200 rounded-xl p-6">
            <h4 className="font-bold text-red-800 mb-4 flex items-center">
              <span className="mr-2">❌</span>
              Previous Monolithic Approach
            </h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• Single API call handled file processing, validation, and approval routing</li>
              <li>• Multiple failure points with no granular feedback</li>
              <li>• Large file uploads caused timeouts</li>
              <li>• No recovery options when uploads failed</li>
            </ul>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-xl p-6">
            <h4 className="font-bold text-green-800 mb-4 flex items-center">
              <span className="mr-2">✅</span>
              New Collaborative Solution
            </h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• Chunked upload system for large files</li>
              <li>• Asynchronous processing with transparent feedback</li>
              <li>• Compression algorithm maintaining OCR readability</li>
              <li>• Offline capability for capturing receipts</li>
              <li>• Transparent retry logic for users</li>
            </ul>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h4 className="font-bold text-blue-800 mb-4">🔧 Technical Implementation Details</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div>
              <h5 className="font-semibold text-blue-700 mb-3">Upload Process Improvements</h5>
              <ul className="space-y-2 text-gray-700">
                <li>• Progressive image compression pipeline</li>
                <li>• Client-side validation with immediate feedback</li>
                <li>• Background retry with exponential backoff</li>
                <li>• Fallback to smaller sizes when original fails</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-blue-700 mb-3">Performance Optimizations</h5>
              <ul className="space-y-2 text-gray-700">
                <li>• Lazy loading based on detected receipt type</li>
                <li>• CDN implementation for static resources</li>
                <li>• Database query optimization (60% improvement)</li>
                <li>• Client-side caching for user preferences</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-12">
        <h3 className="text-gray-800 font-bold text-xl mb-6">API Design Collaboration</h3>

        <div className="mb-8">
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-xl">
            <h4 className="font-bold text-yellow-800 mb-3">🤝 Collaborative Approach</h4>
            <p className="text-gray-800 text-sm leading-relaxed mb-4">
              Instead of designing around existing APIs, I worked with the backend team to create endpoints
              that enabled better user experiences while maintaining system integrity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h5 className="font-bold text-gray-900 mb-3">Error Response Design</h5>
              <div className="space-y-3 text-sm">
                <div className="bg-red-50 p-3 rounded">
                  <p className="font-medium text-red-800">Before:</p>
                  <code className="text-red-700">{`{"error": "Upload failed"}`}</code>
                </div>
                <div className="bg-green-50 p-3 rounded">
                  <p className="font-medium text-green-800">After:</p>
                  <code className="text-green-700 text-xs">{`{
  "error": "file_too_large",
  "message": "Photo is too large for upload",
  "suggestion": "Try taking a closer photo",
  "max_size": "10MB"
}`}</code>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h5 className="font-bold text-gray-900 mb-3">Status Polling System</h5>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Real-time updates without overloading servers</li>
                <li>• Intelligent caching for reference data</li>
                <li>• Progressive loading for slow connections</li>
                <li>• Redundant pathways for critical operations</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-12">
        <h3 className="text-gray-800 font-bold text-xl mb-6">Security and Compliance Integration</h3>

        <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-xl mb-8">
          <h4 className="font-bold text-red-800 mb-3">🔒 Healthcare Financial Data Requirements</h4>
          <p className="text-gray-800 text-sm leading-relaxed">
            Healthcare financial data required special handling beyond typical web application security.
            Every design decision needed to balance user convenience with regulatory compliance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h5 className="font-bold text-blue-800 mb-3">Security Measures</h5>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• End-to-end encryption for all file uploads</li>
              <li>• User-visible security indicators</li>
              <li>• Session management balancing security with convenience</li>
              <li>• Privacy controls giving users data agency</li>
            </ul>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
            <h5 className="font-bold text-purple-800 mb-3">Compliance Features</h5>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• Comprehensive audit trail generation</li>
              <li>• Transparent data retention policies</li>
              <li>• Regulatory requirement explanations</li>
              <li>• User-understandable compliance processes</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mb-12">
        <h3 className="text-gray-800 font-bold text-xl mb-6">Cross-Functional Collaboration</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-green-50 border border-green-200 rounded-xl p-6">
            <h4 className="font-bold text-green-800 mb-3 flex items-center">
              <span className="mr-2">📊</span>
              Product Management
            </h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• Prioritized mobile based on behavior data</li>
              <li>• Defined success metrics balancing satisfaction + efficiency</li>
              <li>• Created rollout plan minimizing user disruption</li>
            </ul>
          </div>

          <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
            <h4 className="font-bold text-orange-800 mb-3 flex items-center">
              <span className="mr-2">⚖️</span>
              Compliance Team
            </h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• Designed comprehensive audit trails</li>
              <li>• Created educational content meeting regulations</li>
              <li>• Implemented transparent data retention policies</li>
            </ul>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h4 className="font-bold text-blue-800 mb-3 flex items-center">
              <span className="mr-2">🎧</span>
              Customer Service
            </h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• Built tools showing exact user experience</li>
              <li>• Created escalation flows for complex cases</li>
              <li>• Designed self-service reducing common requests</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-gray-800 font-bold text-xl mb-6">Performance Impact</h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="text-center bg-white border border-gray-200 rounded-xl p-4">
            <div className="text-2xl font-bold text-green-600 mb-1">94%</div>
            <div className="text-sm text-gray-600">Upload Success Rate</div>
            <div className="text-xs text-gray-500">(from 23%)</div>
          </div>
          <div className="text-center bg-white border border-gray-200 rounded-xl p-4">
            <div className="text-2xl font-bold text-blue-600 mb-1">40%</div>
            <div className="text-sm text-gray-600">Page Load Improvement</div>
            <div className="text-xs text-gray-500">(4.2s → 2.5s)</div>
          </div>
          <div className="text-center bg-white border border-gray-200 rounded-xl p-4">
            <div className="text-2xl font-bold text-purple-600 mb-1">85%</div>
            <div className="text-sm text-gray-600">Fewer Timeout Errors</div>
            <div className="text-xs text-gray-500">Server stability</div>
          </div>
          <div className="text-center bg-white border border-gray-200 rounded-xl p-4">
            <div className="text-2xl font-bold text-orange-600 mb-1">73%</div>
            <div className="text-sm text-gray-600">Crash Rate Reduction</div>
            <div className="text-xs text-gray-500">Mobile app stability</div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-xl p-6">
        <h4 className="font-bold text-blue-800 mb-3 flex items-center">
          <span className="mr-2">🚀</span>
          Technical Innovation Through Constraints
        </h4>
        <p className="text-gray-800 leading-relaxed text-sm">
          Working within significant technical limitations—legacy systems, API constraints, processing delays—forced
          creative solutions that ultimately provided better user experiences than unlimited resources might have enabled.
          <strong> Constraints, when properly understood and designed for, often lead to more robust and
          user-friendly solutions than greenfield development.</strong>
        </p>
      </div>
    </motion.div>
  );
}