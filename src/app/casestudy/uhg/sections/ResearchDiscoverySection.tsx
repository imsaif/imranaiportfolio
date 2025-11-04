import { motion } from 'framer-motion';
import {
  MdSearch, MdBarChart, MdGroups, MdSettings, MdAssessment, MdPhoneAndroid,
  MdFavoriteBorder, MdVisibility, MdBuild, MdGesture
} from 'react-icons/md';

export function ResearchDiscoverySection() {
  return (
    <motion.div
      id="research"
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

          {/* Visual Mental Model Diagram */}
          <div className="bg-white border border-gray-200 rounded-xl p-8 mb-6 overflow-x-auto">
            <p className="text-gray-700 text-center mb-8 leading-relaxed">
              <strong>The Fundamental Mismatch:</strong> Users think about reimbursement by life events, while the system processes by tax categories. This mismatch created confusion and 98.9% abandonment.
            </p>

            <div className="min-w-full inline-flex gap-4 md:gap-6 justify-center items-start">
              {/* User's Mental Model */}
              <div className="flex-shrink-0 w-full md:w-80">
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h5 className="font-bold text-gray-900 mb-4 text-center flex items-center justify-center gap-2">
                    <span className="text-2xl">👤</span>
                    <span>User's Mental Model</span>
                  </h5>
                  <div className="space-y-4">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-gray-500 font-medium mb-1">THINKS BY</p>
                      <p className="text-sm font-semibold text-gray-800">Events</p>
                      <p className="text-xs text-gray-600 mt-1">"I went to the dentist"</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-gray-500 font-medium mb-1">EXPECTS</p>
                      <p className="text-sm font-semibold text-gray-800">Instant Approval</p>
                      <p className="text-xs text-gray-600 mt-1">Take photo → Get money back</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-gray-500 font-medium mb-1">WANTS</p>
                      <p className="text-sm font-semibold text-gray-800">Simplicity</p>
                      <p className="text-xs text-gray-600 mt-1">Simple yes/no answers</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* The Gap */}
              <div className="flex-shrink-0 flex flex-col items-center justify-center w-16 h-auto">
                <div className="text-3xl text-red-500 mb-2">⚡</div>
                <div className="text-xs text-red-600 font-semibold text-center">THE<br/>GAP</div>
                <div className="text-xs text-gray-500 mt-2">Where users<br/>get lost</div>
              </div>

              {/* System's Mental Model */}
              <div className="flex-shrink-0 w-full md:w-80">
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h5 className="font-bold text-gray-900 mb-4 text-center flex items-center justify-center gap-2">
                    <MdSettings className="text-gray-600" size={20} />
                    <span>System Logic</span>
                  </h5>
                  <div className="space-y-4">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-gray-500 font-medium mb-1">PROCESSES BY</p>
                      <p className="text-sm font-semibold text-gray-800">Tax Categories</p>
                      <p className="text-xs text-gray-600 mt-1">"Preventive care code 02"</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-gray-500 font-medium mb-1">REQUIRES</p>
                      <p className="text-sm font-semibold text-gray-800">Validation (24-48h)</p>
                      <p className="text-xs text-gray-600 mt-1">Compliance & regulatory checks</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-gray-500 font-medium mb-1">NEEDS</p>
                      <p className="text-sm font-semibold text-gray-800">Documentation</p>
                      <p className="text-xs text-gray-600 mt-1">Proof, receipts, eligibility</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Original comparison for context */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
            <p className="text-gray-700 text-sm mb-4">
              <strong className="text-gray-900">Impact:</strong> Users don't understand why "instant" isn't possible. They're confused by medical terminology and frustrated by validation delays. The design solution bridges this gap with smart categorization, OCR auto-detection, and transparent timelines.
            </p>
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

        {/* Persona Empathy Map - Digital Native */}
        <div className="mb-20">
          <h4 className="font-bold text-gray-900 mb-6 text-xl">Deep Dive: Digital Native Persona</h4>
          <div className="bg-white border border-gray-200 rounded-xl p-8">
            {/* Persona Header */}
            <div className="mb-8 pb-8 border-b border-gray-200">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">👩‍💼</span>
                </div>
                <div>
                  <h5 className="text-lg font-bold text-gray-900">Sarah, 28</h5>
                  <p className="text-gray-600">Marketing Manager, Mobile-first, Tech-savvy</p>
                  <p className="text-sm text-gray-500 mt-1"><strong>32% of users</strong> - Highest abandonment rate</p>
                </div>
              </div>
            </div>

            {/* Empathy Map Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* What She Thinks */}
              <div className="bg-white border-l-4 border-blue-500 rounded-lg p-6">
                <h6 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <MdBuild size={20} className="text-blue-600" />
                  <span>What She THINKS</span>
                </h6>
                <ul className="space-y-2 text-sm text-gray-800">
                  <li>✓ "This should be as easy as Venmo"</li>
                  <li>✓ "Why do I need to know tax categories?"</li>
                  <li>✓ "Did my photo even upload?"</li>
                  <li>✓ "This is taking too long"</li>
                  <li>✓ "I should be able to do this one-handed"</li>
                </ul>
              </div>

              {/* What She Sees */}
              <div className="bg-white border-l-4 border-red-500 rounded-lg p-6">
                <h6 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <MdVisibility size={20} className="text-red-600" />
                  <span>What She SEES</span>
                </h6>
                <ul className="space-y-2 text-sm text-gray-800">
                  <li>✓ Long confusing form with medical jargon</li>
                  <li>✓ "Error code 413" with no explanation</li>
                  <li>✓ Spinning loader with no progress indication</li>
                  <li>✓ Generic "under review" status message</li>
                  <li>✓ No confirmation after upload</li>
                </ul>
              </div>

              {/* What She Feels */}
              <div className="bg-white border-l-4 border-amber-500 rounded-lg p-6">
                <h6 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <MdFavoriteBorder size={20} className="text-amber-600" />
                  <span>What She FEELS</span>
                </h6>
                <ul className="space-y-2 text-sm text-gray-800">
                  <li>😤 <strong>Frustrated:</strong> "This is unnecessarily complex"</li>
                  <li>😰 <strong>Anxious:</strong> "Will I get my $125 back?"</li>
                  <li>😕 <strong>Confused:</strong> "What am I doing wrong?"</li>
                  <li>⏰ <strong>Impatient:</strong> "I need to get back to work"</li>
                  <li>😠 <strong>Annoyed:</strong> "Why is this so hard?"</li>
                </ul>
              </div>

              {/* What She Does */}
              <div className="bg-white border-l-4 border-green-500 rounded-lg p-6">
                <h6 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <MdGesture size={20} className="text-green-600" />
                  <span>What She DOES</span>
                </h6>
                <ul className="space-y-2 text-sm text-gray-800">
                  <li>✓ Takes quick photo at pharmacy (in a hurry)</li>
                  <li>✓ Abandons after first error</li>
                  <li>✓ Doesn't read long error messages</li>
                  <li>✓ Won't retry on mobile (switches to desktop)</li>
                  <li>✓ Considers just giving up (not worth the effort)</li>
                </ul>
              </div>
            </div>

            {/* Pain Points & Goals */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 pt-6 border-t border-gray-200">
              <div>
                <h6 className="font-semibold text-gray-900 mb-3">🚫 Pain Points</h6>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• App doesn't match her expectations of simplicity</li>
                  <li>• No clear feedback on upload status</li>
                  <li>• Complex terminology she doesn't understand</li>
                  <li>• Long wait times with no progress visibility</li>
                  <li>• One-handed use not considered</li>
                </ul>
              </div>
              <div>
                <h6 className="font-semibold text-gray-900 mb-3">✨ Goals & Needs</h6>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Get reimbursed quickly (same day ideally)</li>
                  <li>• Minimal effort required</li>
                  <li>• Mobile-native experience (not responsive)</li>
                  <li>• Clear progress & confirmation feedback</li>
                  <li>• Feels like a consumer app, not enterprise software</li>
                </ul>
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

      {/* Cross-Device User Journey Map */}
      <div className="mb-20">
        <h4 className="font-bold text-gray-900 mb-6 text-xl">Complete User Journey: Cross-Device Experience</h4>
        <div className="bg-white border border-gray-200 rounded-xl p-8 overflow-x-auto">
          <p className="text-gray-700 text-center mb-8">
            Following a typical user through their complete journey reveals the emotional impact of friction points and device switching.
          </p>

          {/* Journey Timeline */}
          <div className="min-w-full space-y-6">
            {/* Phase 1: Discovery */}
            <div className="flex gap-4 items-start">
              <div className="w-32 flex-shrink-0">
                <div className="bg-gray-100 rounded-lg p-3 text-center border-l-4 border-blue-500">
                  <p className="text-xs font-semibold text-gray-600">PHASE 1</p>
                  <p className="text-sm font-bold text-blue-600">Discovery</p>
                </div>
              </div>
              <div className="flex-1">
                <div className="bg-white border-l-4 border-blue-500 rounded-lg p-4">
                  <p className="font-semibold text-gray-900 mb-2">📱 Mobile App - At Pharmacy</p>
                  <p className="text-sm text-gray-700 mb-2">User opens HSA app after paying for prescription. First time using reimbursement feature.</p>
                  <div className="text-2xl">😊 Optimistic</div>
                  <p className="text-xs text-gray-600 mt-2">Time spent: 2 min | Expected outcome: Quick reimbursement</p>
                </div>
              </div>
            </div>

            {/* Phase 2: Capture */}
            <div className="flex gap-4 items-start">
              <div className="w-32 flex-shrink-0">
                <div className="bg-gray-100 rounded-lg p-3 text-center border-l-4 border-green-500">
                  <p className="text-xs font-semibold text-gray-600">PHASE 2</p>
                  <p className="text-sm font-bold text-green-600">Capture</p>
                </div>
              </div>
              <div className="flex-1">
                <div className="bg-white border-l-4 border-green-500 rounded-lg p-4">
                  <p className="font-semibold text-gray-900 mb-2">📸 Takes Receipt Photo</p>
                  <p className="text-sm text-gray-700 mb-2">Quickly takes photo with phone camera. Poor lighting in pharmacy bathroom. File size: 15MB</p>
                  <div className="text-2xl">😐 Proceeding</div>
                  <p className="text-xs text-gray-600 mt-2">Time spent: 3 min | Status: Photo captured, ready to upload</p>
                </div>
              </div>
            </div>

            {/* Phase 3: Upload Attempt - FAILURE */}
            <div className="flex gap-4 items-start">
              <div className="w-32 flex-shrink-0">
                <div className="bg-gray-100 rounded-lg p-3 text-center border-l-4 border-red-500">
                  <p className="text-xs font-semibold text-gray-600">PHASE 3</p>
                  <p className="text-sm font-bold text-red-600">Upload Fail</p>
                </div>
              </div>
              <div className="flex-1">
                <div className="bg-white border-l-4 border-red-500 rounded-lg p-4">
                  <p className="font-semibold text-gray-900 mb-2">❌ Upload Error</p>
                  <p className="text-sm text-gray-700 mb-2">File size exceeds 10MB limit. Error message: "Error code 413 - Payload too large"</p>
                  <p className="text-xs bg-white p-2 rounded border border-red-200 my-2 font-mono text-red-700">Error code 413</p>
                  <div className="text-2xl">😕 Confused</div>
                  <p className="text-xs text-gray-600 mt-2">Time spent: 8 min | Status: Upload failed, no guidance</p>
                </div>
              </div>
            </div>

            {/* Phase 4: Retry & Frustration */}
            <div className="flex gap-4 items-start">
              <div className="w-32 flex-shrink-0">
                <div className="bg-gray-100 rounded-lg p-3 text-center border-l-4 border-amber-500">
                  <p className="text-xs font-semibold text-gray-600">PHASE 4</p>
                  <p className="text-sm font-bold text-amber-600">Retry (3x)</p>
                </div>
              </div>
              <div className="flex-1">
                <div className="bg-white border-l-4 border-amber-500 rounded-lg p-4">
                  <p className="font-semibold text-gray-900 mb-2">🔄 Multiple Retry Attempts</p>
                  <p className="text-sm text-gray-700 mb-2">Retries 3-4 times on mobile. Gets same error or network timeout. Different error message each time.</p>
                  <div className="text-2xl">😤 Frustrated</div>
                  <p className="text-xs text-gray-600 mt-2">Time spent: 12 min | Status: Still failing, considering giving up</p>
                </div>
              </div>
            </div>

            {/* Phase 5: Device Switch */}
            <div className="flex gap-4 items-start">
              <div className="w-32 flex-shrink-0">
                <div className="bg-gray-100 rounded-lg p-3 text-center border-l-4 border-purple-500">
                  <p className="text-xs font-semibold text-gray-600">PHASE 5</p>
                  <p className="text-sm font-bold text-purple-600">Switch</p>
                </div>
              </div>
              <div className="flex-1">
                <div className="bg-white border-l-4 border-purple-500 rounded-lg p-4">
                  <p className="font-semibold text-gray-900 mb-2">💻 Switches to Desktop</p>
                  <p className="text-sm text-gray-700 mb-2">Walks home, opens laptop. Wants better file management. Lost progress - no draft saved.</p>
                  <div className="text-2xl">😰 Anxious</div>
                  <p className="text-xs text-gray-600 mt-2">Time spent: 15 min | Status: Starting over on new device</p>
                </div>
              </div>
            </div>

            {/* Phase 6: Re-entry & Recovery */}
            <div className="flex gap-4 items-start">
              <div className="w-32 flex-shrink-0">
                <div className="bg-gray-100 rounded-lg p-3 text-center border-l-4 border-amber-400">
                  <p className="text-xs font-semibold text-gray-600">PHASE 6</p>
                  <p className="text-sm font-bold text-amber-600">Re-entry</p>
                </div>
              </div>
              <div className="flex-1">
                <div className="bg-white border-l-4 border-amber-400 rounded-lg p-4">
                  <p className="font-semibold text-gray-900 mb-2">🔐 Re-authenticate & Re-enter</p>
                  <p className="text-sm text-gray-700 mb-2">Logs back in. Must re-take photo or find original file. Re-enters all information manually.</p>
                  <div className="text-2xl">😔 Resigned</div>
                  <p className="text-xs text-gray-600 mt-2">Time spent: 18 min | Status: Duplicate effort required</p>
                </div>
              </div>
            </div>

            {/* Phase 7: Success or Abandon */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex gap-4 items-start">
                <div className="w-32 flex-shrink-0">
                  <div className="bg-gray-100 rounded-lg p-3 text-center border-l-4 border-green-500">
                    <p className="text-xs font-semibold text-gray-600">PHASE 7A</p>
                    <p className="text-sm font-bold text-green-600">Success</p>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="bg-white border-l-4 border-green-500 rounded-lg p-4">
                    <p className="font-semibold text-gray-900 mb-2">✅ Finally Uploaded</p>
                    <p className="text-sm text-gray-700 mb-2">Desktop upload succeeds. Photo quality better. Form easier on larger screen.</p>
                    <div className="text-2xl">😌 Relief</div>
                    <p className="text-xs text-gray-600 mt-2">Total time: 22 min | Exhausted but done</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-32 flex-shrink-0">
                  <div className="bg-gray-100 rounded-lg p-3 text-center border-l-4 border-red-500">
                    <p className="text-xs font-semibold text-gray-600">PHASE 7B</p>
                    <p className="text-sm font-bold text-red-600">Abandon</p>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="bg-white border-l-4 border-red-500 rounded-lg p-4">
                    <p className="font-semibold text-gray-900 mb-2">🚫 Gives Up</p>
                    <p className="text-sm text-gray-700 mb-2">Too much effort. Closes laptop. Waits for paper reimbursement form instead.</p>
                    <div className="text-2xl">😠 Annoyed</div>
                    <p className="text-xs text-gray-600 mt-2">Total time: 18 min wasted | Feature abandoned</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Summary Stats */}
          <div className="mt-8 pt-8 border-t border-gray-200 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <p className="text-xs text-gray-600 mb-1">Total Time</p>
              <p className="text-2xl font-bold text-gray-900">18-22 min</p>
              <p className="text-xs text-gray-600 mt-1">vs 4.5 min desired</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <p className="text-xs text-gray-600 mb-1">Pain Points</p>
              <p className="text-2xl font-bold text-gray-900">6</p>
              <p className="text-xs text-gray-600 mt-1">File size, errors, no state</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <p className="text-xs text-gray-600 mb-1">Device Switches</p>
              <p className="text-2xl font-bold text-gray-900">1</p>
              <p className="text-xs text-gray-600 mt-1">45% of users do this</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <p className="text-xs text-gray-600 mb-1">Abandonment</p>
              <p className="text-2xl font-bold text-gray-900">50%</p>
              <p className="text-xs text-gray-600 mt-1">Give up before success</p>
            </div>
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
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-gray-900">67%</span>
                </div>
                <h5 className="font-semibold text-gray-900 mb-2">Upload Failures</h5>
              </div>

              <div className="space-y-3">
                <div className="bg-gray-50 p-3 rounded">
                  <p className="text-sm font-medium text-gray-900">File size limit (40%)</p>
                  <p className="text-sm text-gray-600">Files over 10MB rejected</p>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <p className="text-sm font-medium text-gray-900">Network timeout (35%)</p>
                  <p className="text-sm text-gray-600">Mobile network interruptions</p>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <p className="text-sm font-medium text-gray-900">Format issues (25%)</p>
                  <p className="text-sm text-gray-600">HEIC photos not supported</p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="text-center mb-4">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-gray-900">23%</span>
                </div>
                <h5 className="font-semibold text-gray-900 mb-2">Validation Errors</h5>
              </div>

              <div className="space-y-3">
                <div className="bg-gray-50 p-3 rounded">
                  <p className="text-sm font-medium text-gray-900">Missing receipt date (45%)</p>
                  <p className="text-sm text-gray-600">OCR couldn't detect date</p>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <p className="text-sm font-medium text-gray-900">Amount mismatch (30%)</p>
                  <p className="text-sm text-gray-600">Manual entry vs. receipt</p>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <p className="text-sm font-medium text-gray-900">Invalid category (25%)</p>
                  <p className="text-sm text-gray-600">Non-HSA eligible expense</p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="text-center mb-4">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-gray-900">10%</span>
                </div>
                <h5 className="font-semibold text-gray-900 mb-2">User Confusion</h5>
              </div>

              <div className="space-y-3">
                <div className="bg-gray-50 p-3 rounded">
                  <p className="text-sm font-medium text-gray-900">Form complexity (50%)</p>
                  <p className="text-sm text-gray-600">Too many required fields</p>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <p className="text-sm font-medium text-gray-900">Process unclear (30%)</p>
                  <p className="text-sm text-gray-600">No progress indicators</p>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <p className="text-sm font-medium text-gray-900">Help unavailable (20%)</p>
                  <p className="text-sm text-gray-600">No contextual guidance</p>
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
            <div className="text-center p-4 bg-gray-50 rounded-lg border-t-4 border-t-red-500">
              <div className="text-xl font-bold text-gray-900">18 min</div>
              <p className="text-base text-gray-600">Avg. time lost per failure</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg border-t-4 border-t-amber-500">
              <div className="text-xl font-bold text-gray-900">3.2</div>
              <p className="text-base text-gray-600">Retry attempts before giving up</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg border-t-4 border-t-amber-400">
              <div className="text-xl font-bold text-gray-900">67%</div>
              <p className="text-base text-gray-600">Called support after failure</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg border-t-4 border-t-blue-500">
              <div className="text-xl font-bold text-gray-900">$2.3M</div>
              <p className="text-base text-gray-600">Annual cost of failures</p>
            </div>
          </div>
        </div>
      </div>

    </motion.div>
  );
}