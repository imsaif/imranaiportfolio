import { motion } from 'framer-motion';
import { MdSearch, MdBarChart, MdGroups, MdSettings, MdAssessment, MdPhoneAndroid } from 'react-icons/md';

export function ResearchDiscoverySection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="mb-20">
        <div className="bg-gray-50 border-l-4 border-gray-400 p-8 rounded-xl mb-8">
          <h4 className="font-bold text-gray-800 mb-3 text-lg flex items-center gap-2">
            <MdSearch className="text-blue-500" size={24} />
            Research Strategy
          </h4>
          <p className="text-gray-800 leading-relaxed">
            I needed to understand both user behavior and system constraints without being able to conduct
            traditional usability testing due to <strong>healthcare privacy restrictions</strong>. This required
            creative research approaches and multiple data triangulation methods.
          </p>
        </div>
      </div>

      <div className="mb-20">
        <h3 className="text-gray-800 font-bold text-2xl mb-8">Research Methods</h3>
        <p className="text-gray-600 mb-8 leading-relaxed">7-week research phase combining data analysis and user research</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-4 text-lg flex items-center gap-2">
              <MdBarChart className="text-green-500" size={20} />
              Data Analysis
            </h4>
            <ul className="text-base text-gray-800 space-y-2">
              <li>• 6 months of analytics data identifying 12 drop-off points</li>
              <li>• 800+ customer service transcripts categorized by issue type</li>
              <li>• Technical system mapping across 3 backend systems</li>
              <li>• Heuristic evaluation using healthcare UX principles</li>
            </ul>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-4 text-lg flex items-center gap-2">
              <MdGroups className="text-blue-500" size={20} />
              User Research
            </h4>
            <ul className="text-base text-gray-800 space-y-2">
              <li>• 12 internal stakeholder interviews to understand user workflows and pain points</li>
              <li>• Process mapping sessions with customer service representatives</li>
              <li>• Analysis of recorded support call patterns and common issues</li>
              <li>• Cross-functional workshops with product, engineering, and compliance teams</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mb-20">
        <h3 className="text-gray-800 font-bold text-2xl mb-8">Key Research Insights</h3>

        <div className="mb-20">
          <h4 className="font-bold text-gray-900 mb-6 text-xl">User Mental Models vs. System Logic</h4>
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 mb-6">
            <p className="text-gray-800 leading-relaxed mb-8 text-center">
              Users thought of expenses by event ("my dentist visit") while system organized by tax category ("preventive care")
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
                <h5 className="font-bold text-red-900 mb-4 flex items-center gap-2">
                  <span className="flex items-center gap-2">
                    <MdSettings className="text-orange-500" size={24} />
                    System Logic
                  </span>
                </h5>
                <div className="space-y-3">
                  <div>
                    <p className="font-semibold text-gray-800">Organized by:</p>
                    <p className="text-gray-700">Tax categories (e.g., "preventive care")</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Processing:</p>
                    <p className="text-gray-700">24-48 hour validation required</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Documentation:</p>
                    <p className="text-gray-700">Detailed regulatory requirements</p>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
                <h5 className="font-bold text-green-900 mb-4 flex items-center gap-2">
                  <span className="text-2xl">👤</span> User Mental Model
                </h5>
                <div className="space-y-3">
                  <div>
                    <p className="font-semibold text-gray-800">Thinks by:</p>
                    <p className="text-gray-700">Events (e.g., "my dentist visit")</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Expects:</p>
                    <p className="text-gray-700">Immediate feedback and approval</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Wants:</p>
                    <p className="text-gray-700">Simple yes/no answers</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-20">
          <h4 className="font-bold text-gray-900 mb-6 text-xl">Four Primary User Types Emerged</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-center mb-3">
                <MdPhoneAndroid className="text-blue-500" size={48} />
              </div>
              <h5 className="font-bold text-gray-900 mb-2">Digital Natives</h5>
              <div className="text-2xl font-bold text-indigo-600 mb-3">32%</div>
              <p className="text-gray-600 text-base mb-3">Expected instant mobile experience</p>
              <div className="border-t pt-3">
                <p className="text-xs text-gray-500 font-medium">BEHAVIOR</p>
                <p className="text-base text-gray-700 mt-1">Abandoned after first failure, expected app-like experience</p>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-3xl mb-3">💻</div>
              <h5 className="font-bold text-gray-900 mb-2">Traditional Planners</h5>
              <div className="text-2xl font-bold text-indigo-600 mb-3">41%</div>
              <p className="text-gray-600 text-base mb-3">Preferred desktop with detailed forms</p>
              <div className="border-t pt-3">
                <p className="text-xs text-gray-500 font-medium">BEHAVIOR</p>
                <p className="text-base text-gray-700 mt-1">Wanted documentation and thorough review process</p>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-3xl mb-3">🤝</div>
              <h5 className="font-bold text-gray-900 mb-2">Assisted Users</h5>
              <div className="text-2xl font-bold text-indigo-600 mb-3">18%</div>
              <p className="text-gray-600 text-base mb-3">Required customer service help</p>
              <div className="border-t pt-3">
                <p className="text-xs text-gray-500 font-medium">BEHAVIOR</p>
                <p className="text-base text-gray-700 mt-1">Needed simplified workflows and guided assistance</p>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-center mb-3">
                <MdAssessment className="text-blue-500" size={48} />
              </div>
              <h5 className="font-bold text-gray-900 mb-2">Bulk Processors</h5>
              <div className="text-2xl font-bold text-indigo-600 mb-3">9%</div>
              <p className="text-gray-600 text-base mb-3">Business owners with multiple claims</p>
              <div className="border-t pt-3">
                <p className="text-xs text-gray-500 font-medium">BEHAVIOR</p>
                <p className="text-base text-gray-700 mt-1">Needed batch processing and CSV upload capabilities</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-20">
        <h4 className="font-bold text-gray-900 mb-6 text-xl">Cross-Device Behavior Pattern</h4>
        <div className="bg-white border border-gray-200 rounded-xl p-8">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="flex justify-center mb-2">
                <MdPhoneAndroid className="text-blue-500" size={48} />
              </div>
              <div className="text-2xl font-bold text-blue-600">78%</div>
              <p className="text-base text-gray-600">Started on Mobile</p>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-3xl mb-2">❌</div>
              <div className="text-2xl font-bold text-red-600">45%</div>
              <p className="text-base text-gray-600">Switched After Failure</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-3xl mb-2">💻</div>
              <div className="text-2xl font-bold text-green-600">33%</div>
              <p className="text-base text-gray-600">Completed on Desktop</p>
            </div>
          </div>

          {/* Flow Diagram */}
          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <h6 className="font-semibold mb-4 text-gray-800">Typical User Journey</h6>
            <div className="flex items-center justify-center space-x-4 flex-wrap">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                  <MdPhoneAndroid className="text-blue-500" size={24} />
                </div>
                <p className="text-xs text-gray-600">Mobile Start</p>
              </div>
              <span className="text-gray-400 text-2xl">→</span>
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-2">
                  <span className="text-2xl">❌</span>
                </div>
                <p className="text-xs text-gray-600">Upload Fails</p>
              </div>
              <span className="text-gray-400 text-2xl">→</span>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-2">
                  <span className="text-2xl">💻</span>
                </div>
                <p className="text-xs text-gray-600">Desktop Switch</p>
              </div>
            </div>
          </div>

          {/* Context Insights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h6 className="font-semibold mb-2 text-blue-900 flex items-center gap-1">
                <MdPhoneAndroid className="text-blue-500" size={16} />
                Mobile Context
              </h6>
              <ul className="text-base space-y-1 text-gray-700">
                <li>• Quick receipt capture on-the-go</li>
                <li>• Expected instant processing</li>
                <li>• Limited time for complex forms</li>
                <li>• Camera quality and lighting issues</li>
              </ul>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h6 className="font-semibold mb-2 text-green-900">💻 Desktop Switch Reasons</h6>
              <ul className="text-base space-y-1 text-gray-700">
                <li>• Better file management capabilities</li>
                <li>• Easier form completion</li>
                <li>• More reliable upload experience</li>
                <li>• Ability to scan documents properly</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gray-100 rounded-lg">
            <p className="text-base text-gray-700">
              <strong>Key Insight:</strong> Device choice was context-dependent—users needed connected experiences across platforms, not identical interfaces. The system needed to maintain state and progress across devices.
            </p>
          </div>
        </div>
      </div>


      <div className="mb-20">
        <h4 className="font-bold text-gray-900 mb-6 text-xl">Technical Failure Analysis</h4>
        <div className="space-y-8">
          {/* Enhanced Failure Categories */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="text-center mb-4">
                <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-red-600">67%</span>
                </div>
                <h5 className="font-semibold text-gray-900 mb-2">Upload Failures</h5>
              </div>

              <div className="space-y-3">
                <div className="bg-red-50 p-3 rounded">
                  <p className="text-sm font-medium text-red-800">File size limit (40%)</p>
                  <p className="text-sm text-red-600">Files over 10MB rejected</p>
                </div>
                <div className="bg-red-50 p-3 rounded">
                  <p className="text-sm font-medium text-red-800">Network timeout (35%)</p>
                  <p className="text-sm text-red-600">Mobile network interruptions</p>
                </div>
                <div className="bg-red-50 p-3 rounded">
                  <p className="text-sm font-medium text-red-800">Format issues (25%)</p>
                  <p className="text-sm text-red-600">HEIC photos not supported</p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="text-center mb-4">
                <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">23%</span>
                </div>
                <h5 className="font-semibold text-gray-900 mb-2">Validation Errors</h5>
              </div>

              <div className="space-y-3">
                <div className="bg-blue-50 p-3 rounded">
                  <p className="text-sm font-medium text-blue-800">Missing receipt date (45%)</p>
                  <p className="text-sm text-blue-600">OCR couldn't detect date</p>
                </div>
                <div className="bg-blue-50 p-3 rounded">
                  <p className="text-sm font-medium text-blue-800">Amount mismatch (30%)</p>
                  <p className="text-sm text-blue-600">Manual entry vs. receipt</p>
                </div>
                <div className="bg-blue-50 p-3 rounded">
                  <p className="text-sm font-medium text-blue-800">Invalid category (25%)</p>
                  <p className="text-sm text-blue-600">Non-HSA eligible expense</p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="text-center mb-4">
                <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-yellow-600">10%</span>
                </div>
                <h5 className="font-semibold text-gray-900 mb-2">User Confusion</h5>
              </div>

              <div className="space-y-3">
                <div className="bg-yellow-50 p-3 rounded">
                  <p className="text-sm font-medium text-yellow-800">Form complexity (50%)</p>
                  <p className="text-sm text-yellow-600">Too many required fields</p>
                </div>
                <div className="bg-yellow-50 p-3 rounded">
                  <p className="text-sm font-medium text-yellow-800">Process unclear (30%)</p>
                  <p className="text-sm text-yellow-600">No progress indicators</p>
                </div>
                <div className="bg-yellow-50 p-3 rounded">
                  <p className="text-sm font-medium text-yellow-800">Help unavailable (20%)</p>
                  <p className="text-sm text-yellow-600">No contextual guidance</p>
                </div>
              </div>
            </div>
          </div>

          {/* Mock Error Examples */}
          <div className="bg-gray-50 p-6 rounded-xl">
            <h6 className="font-semibold mb-4 text-gray-800">Common Error Messages (Before Redesign)</h6>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded border-l-4 border-red-500">
                <p className="text-sm font-mono text-red-600">"Upload failed. Error code: 413"</p>
                <p className="text-sm text-gray-500 mt-1">❌ User has no idea what this means</p>
                <p className="text-sm text-green-600 mt-1">✅ Should say: "File too large (max 10MB)"</p>
              </div>
              <div className="bg-white p-4 rounded border-l-4 border-red-500">
                <p className="text-sm font-mono text-red-600">"Invalid file format"</p>
                <p className="text-sm text-gray-500 mt-1">❌ No guidance on accepted formats</p>
                <p className="text-sm text-green-600 mt-1">✅ Should say: "Use JPG, PNG, or PDF files"</p>
              </div>
              <div className="bg-white p-4 rounded border-l-4 border-red-500">
                <p className="text-sm font-mono text-red-600">"Validation failed"</p>
                <p className="text-sm text-gray-500 mt-1">❌ Doesn't specify which field</p>
                <p className="text-sm text-green-600 mt-1">✅ Should highlight specific errors</p>
              </div>
              <div className="bg-white p-4 rounded border-l-4 border-red-500">
                <p className="text-sm font-mono text-red-600">"Request timeout"</p>
                <p className="text-sm text-gray-500 mt-1">❌ No recovery suggestion</p>
                <p className="text-sm text-green-600 mt-1">✅ Should offer retry option</p>
              </div>
            </div>
          </div>

          {/* Impact Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-xl font-bold text-red-600">18 min</div>
              <p className="text-base text-gray-600">Avg. time lost per failure</p>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-xl font-bold text-orange-600">3.2</div>
              <p className="text-base text-gray-600">Retry attempts before giving up</p>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="text-xl font-bold text-yellow-600">67%</div>
              <p className="text-base text-gray-600">Called support after failure</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-xl font-bold text-blue-600">$2.3M</div>
              <p className="text-base text-gray-600">Annual cost of failures</p>
            </div>
          </div>
        </div>
      </div>

    </motion.div>
  );
}