import { motion } from 'framer-motion';

export function DesignStrategySection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* Design Process Introduction */}
      <div className="mb-20">
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 mb-8">
          <h4 className="font-bold text-gray-800 mb-3 text-lg">🎨 Design Approach</h4>
          <p className="text-gray-800 leading-relaxed">
            I developed an <strong>adaptive system philosophy</strong> with multiple optimized pathways
            rather than one "perfect" solution, responding to diverse user needs and technical constraints.
          </p>
        </div>
      </div>

      {/* Design Principles */}
      <div className="mb-20">
        <h3 className="text-gray-800 font-bold text-2xl mb-8">Design Principles</h3>
        <p className="text-gray-800 mb-8 leading-relaxed">
          Based on research findings, I established four core principles that would guide all design decisions:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white border border-gray-200 p-8 rounded-xl shadow-sm">
            <h4 className="font-bold text-gray-800 mb-3 text-lg">🔒 Progressive Confidence</h4>
            <p className="text-gray-700 text-base leading-relaxed">
              Build trust through transparent feedback, realistic time estimates, and clear recovery paths.
            </p>
          </div>

          <div className="bg-white border border-gray-200 p-8 rounded-xl shadow-sm">
            <h4 className="font-bold text-gray-800 mb-3 text-lg">Context-Aware Guidance</h4>
            <p className="text-gray-700 text-base leading-relaxed">
              Provide intelligent help based on receipt type, user history, and experience level.
            </p>
          </div>

          <div className="bg-white border border-gray-200 p-8 rounded-xl shadow-sm">
            <h4 className="font-bold text-gray-800 mb-3 text-lg">🌐 Graceful Degradation</h4>
            <p className="text-gray-700 text-base leading-relaxed">
              Ensure functionality across varying network speeds, devices, and technical scenarios.
            </p>
          </div>

          <div className="bg-white border border-gray-200 p-8 rounded-xl shadow-sm">
            <h4 className="font-bold text-gray-800 mb-3 text-lg">📋 Regulatory Transparency</h4>
            <p className="text-gray-700 text-base leading-relaxed">
              Make compliance requirements feel helpful by explaining why information is needed.
            </p>
          </div>
        </div>
      </div>

      {/* Smart Receipt Capture Solution */}
      <div className="mb-20">
        <h3 className="text-gray-800 font-bold text-2xl mb-8">Smart Receipt Capture Solution</h3>

        {/* Interactive Prototype Section */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-300 rounded-xl p-8 mb-8">
            <div className="flex items-center mb-4">
              <span className="text-3xl mr-3">🚀</span>
              <h4 className="font-bold text-blue-800 text-xl">Interactive Mobile Prototype</h4>
            </div>
            <p className="text-gray-800 mb-6 leading-relaxed">
              Experience the redesigned Smart Receipt Capture solution through this fully functional prototype
              that demonstrates how we transformed the <strong>98.9% abandonment rate</strong> into a streamlined,
              user-friendly experience.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h5 className="font-semibold text-blue-700 mb-3">This Interactive Prototype Showcases:</h5>
                <ul className="space-y-2 text-base text-gray-700">
                  <li className="flex items-center">
                    <span className="text-blue-500 mr-2">•</span>
                    <span><strong>Guided Receipt Capture:</strong> Real-time camera interface with visual frame overlay</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-blue-500 mr-2">•</span>
                    <span><strong>Smart Form Assistance:</strong> Intelligent categorization and pre-populated fields</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-blue-500 mr-2">•</span>
                    <span><strong>Transparent Status Tracking:</strong> Live timeline showing each approval step</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-blue-500 mr-2">•</span>
                    <span><strong>Optum Bank Design System:</strong> Authentic branding and mobile-first interface</span>
                  </li>
                </ul>
              </div>

              <div>
                <h5 className="font-semibold text-blue-700 mb-3">Try the Complete User Journey:</h5>
                <ol className="space-y-2 text-base text-gray-700">
                  <li className="flex items-start">
                    <span className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">1</span>
                    <span>Start at the HSA Dashboard ($1,671.65 available balance)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">2</span>
                    <span>Tap "Reimburse yourself" to begin</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">3</span>
                    <span>Capture receipt with guided camera interface</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">4</span>
                    <span>Review with automatic quality validation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">5</span>
                    <span>Complete smart form with detected information</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">6</span>
                    <span>Submit and track real-time approval status</span>
                  </li>
                </ol>
              </div>
            </div>

            {/* Embedded Interactive Prototype */}
            <div className="mt-8">
              <div className="flex justify-center">
                <div className="relative bg-gray-900 rounded-[2.5rem] p-4 shadow-2xl" style={{ width: '375px' }}>
                  {/* Phone frame */}
                  <div className="absolute top-[50%] left-0 w-1 h-12 bg-gray-800 rounded-r-lg -translate-y-1/2"></div>
                  <div className="absolute top-[30%] right-0 w-1 h-8 bg-gray-800 rounded-l-lg -translate-y-1/2"></div>
                  <div className="absolute top-[40%] right-0 w-1 h-8 bg-gray-800 rounded-l-lg -translate-y-1/2"></div>

                  {/* Screen */}
                  <div className="relative bg-black rounded-[2rem] overflow-hidden" style={{ height: '812px' }}>
                    {/* Notch */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-gray-900 rounded-b-3xl z-10"></div>

                    {/* Iframe */}
                    <iframe
                      src="/mockups/uhg/smart-receipt-capture/index.html"
                      className="w-full h-full border-0"
                      title="Smart Receipt Capture Prototype"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>

              <p className="text-center text-base text-gray-600 mt-4 italic">
                *Interactive prototype - Click and interact with the interface above*
              </p>

            </div>
          </div>
        </div>

        <div className="mb-8">
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 mb-8">
            <p className="text-gray-800 mb-4">
              <strong>Challenge:</strong> Users struggled with photo quality, file formats, and upload failures.
            </p>
            <p className="text-gray-800 text-base">
              <strong>Solution:</strong> Multi-path capture system with mobile camera guidance,
              document scanner integration, desktop drag-and-drop, and email forwarding options.
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-8 mb-8">
            <h4 className="font-bold text-blue-800 mb-4">🔧 Technical Implementation Strategy</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-base">
              <div>
                <h5 className="font-semibold text-blue-700 mb-3">Mobile Optimization</h5>
                <ul className="space-y-2 text-gray-700">
                  <li>• Progressive image compression pipeline</li>
                  <li>• Client-side validation with immediate feedback</li>
                  <li>• Automatic retry logic for failed uploads</li>
                  <li>• Fallback to smaller image sizes when original fails</li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold text-blue-700 mb-3">Desktop Enhancement</h5>
                <ul className="space-y-2 text-gray-700">
                  <li>• Drag-and-drop upload zone with clear file requirements</li>
                  <li>• Side-by-side layout showing receipt preview and form completion</li>
                  <li>• Detailed help content accessible without leaving the main flow</li>
                  <li>• Batch processing support for bulk users</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-8">
          <h4 className="font-bold text-green-800 mb-3">💡 Receipt Quality Guidance System</h4>
          <p className="text-gray-800 text-sm leading-relaxed">
            Camera interface with real-time overlay showing receipt boundaries, progressive upload with visual feedback
            and error recovery, thumb-friendly touch targets for one-handed mobile use.
          </p>
        </div>
      </div>

      {/* Intelligent Form Assistance */}
      <div className="mb-20">
        <h3 className="text-gray-800 font-bold text-2xl mb-8">Intelligent Form Assistance</h3>

        <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 mb-8">
          <p className="text-gray-800 mb-3">
            <strong>Previous issues:</strong> Long intimidating forms, confusing medical terminology, poor error handling
          </p>
          <p className="text-gray-800 text-base">
            <strong>New approach:</strong> OCR pre-population, smart category suggestions,
            plain-language explanations, and progressive disclosure
          </p>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-8 mb-8">
          <h4 className="font-bold text-yellow-800 mb-4">💡 Example: Smart Recognition in Action</h4>
          <div className="bg-white/60 rounded-lg p-4 border border-white/80">
            <p className="text-gray-800 text-sm leading-relaxed mb-3">
              When user uploads receipt from <strong>"Dr. Smith Family Practice"</strong>:
            </p>
            <div className="space-y-2 text-base text-gray-700">
              <div className="flex items-center">
                <span className="text-blue-600 mr-2">→</span>
                <span>System recognizes provider type and suggests "Office Visit" category</span>
              </div>
              <div className="flex items-center">
                <span className="text-blue-600 mr-2">→</span>
                <span>Shows explanation: "Regular doctor visits are HSA eligible"</span>
              </div>
              <div className="flex items-center">
                <span className="text-blue-600 mr-2">→</span>
                <span>Pre-fills common fields like date and provider name</span>
              </div>
              <div className="flex items-center">
                <span className="text-blue-600 mr-2">→</span>
                <span>Highlights any missing required information</span>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Prototype for Intelligent Form Assistance */}
        <div className="mt-8">
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-300 rounded-xl p-8">
            <div className="flex items-center mb-4">
              <h4 className="font-bold text-purple-800 text-xl">Try the Interactive Form Intelligence</h4>
            </div>

            <p className="text-gray-800 mb-6 leading-relaxed">
              Experience how intelligent form assistance transforms complex medical reimbursement forms
              into a guided experience with <strong>smart categorization</strong>, <strong>OCR pre-population</strong>,
              and <strong>plain language explanations</strong>.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h5 className="font-semibold text-purple-700 mb-3">This Prototype Demonstrates:</h5>
                <ul className="space-y-2 text-base text-gray-700">
                  <li className="flex items-center">
                    <span className="text-purple-500 mr-2">•</span>
                    <span><strong>OCR Detection:</strong> Extracts text from receipt images</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-purple-500 mr-2">•</span>
                    <span><strong>Smart Categories:</strong> Rule-based expense classification</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-purple-500 mr-2">•</span>
                    <span><strong>Plain Language Help:</strong> Medical terms explained simply</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-purple-500 mr-2">•</span>
                    <span><strong>Smart Validation:</strong> Real-time field validation</span>
                  </li>
                </ul>
              </div>

              <div>
                <h5 className="font-semibold text-purple-700 mb-3">Interactive Flow:</h5>
                <ol className="space-y-2 text-base text-gray-700">
                  <li className="flex items-start">
                    <span className="bg-purple-100 text-purple-600 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">1</span>
                    <span>Start with a receipt from "Dr. Smith Family Practice"</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-purple-100 text-purple-600 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">2</span>
                    <span>OCR extracts provider name, date, and amount</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-purple-100 text-purple-600 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">3</span>
                    <span>System suggests category based on provider type</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-purple-100 text-purple-600 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">4</span>
                    <span>Get plain language eligibility confirmation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-purple-100 text-purple-600 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">5</span>
                    <span>Review pre-filled form with validation</span>
                  </li>
                </ol>
              </div>
            </div>

            {/* Embedded Interactive Prototype */}
            <div className="mt-8">
              <div className="flex justify-center">
                <div className="relative bg-gray-900 rounded-[2.5rem] p-4 shadow-2xl" style={{ width: '375px' }}>
                  {/* Phone frame */}
                  <div className="absolute top-[50%] left-0 w-1 h-12 bg-gray-800 rounded-r-lg -translate-y-1/2"></div>
                  <div className="absolute top-[30%] right-0 w-1 h-8 bg-gray-800 rounded-l-lg -translate-y-1/2"></div>
                  <div className="absolute top-[40%] right-0 w-1 h-8 bg-gray-800 rounded-l-lg -translate-y-1/2"></div>

                  {/* Screen */}
                  <div className="relative bg-black rounded-[2rem] overflow-hidden" style={{ height: '812px' }}>
                    {/* Notch */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-gray-900 rounded-b-3xl z-10"></div>

                    {/* Iframe */}
                    <iframe
                      src="/mockups/uhg/intelligent-form-assistance/index.html"
                      className="w-full h-full border-0"
                      title="Intelligent Form Assistance Prototype"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>

              <p className="text-center text-base text-gray-600 mt-4 italic">
                *Interactive prototype - Click to experience intelligent form assistance*
              </p>

            </div>
          </div>
        </div>

      </div>

      {/* Status Communication System */}
      <div className="mb-20">
        <h3 className="text-gray-800 font-bold text-2xl mb-8">Status Communication System</h3>

        <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 mb-8">
          <p className="text-gray-800 mb-3">
            <strong>Previous issues:</strong> Generic "under review" messages buried in dashboard
          </p>
          <p className="text-gray-800 text-base">
            <strong>New system:</strong> Multi-channel updates with progress tracking,
            realistic time estimates, and clear explanations
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-8 mb-8">
          <h4 className="font-bold text-blue-800 mb-4">Innovation: Specific Status Messaging</h4>
          <div className="space-y-3 text-base text-gray-700">
            <div className="bg-white/60 p-3 rounded border-l-4 border-red-400">
              <p><strong>Instead of:</strong> "Under review" → <strong>Now:</strong> "Verifying receipt details (typically 24 hours)"</p>
            </div>
            <div className="bg-white/60 p-3 rounded border-l-4 border-yellow-400">
              <p><strong>Instead of:</strong> "Processing" → <strong>Now:</strong> "Checking HSA eligibility rules (may take 2-3 days for complex cases)"</p>
            </div>
            <div className="bg-white/60 p-3 rounded border-l-4 border-green-400">
              <p><strong>Instead of:</strong> "Complete" → <strong>Now:</strong> "Processing reimbursement to your account (1-2 business days)"</p>
            </div>
          </div>
        </div>

      </div>

      {/* Cross-Device Design Strategy */}
      <div className="mb-12">
        <h3 className="text-gray-800 font-bold text-2xl mb-8">Cross-Device Design Strategy</h3>

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-8 mb-8">
          <h4 className="font-bold text-blue-800 mb-3">🔍 Research Finding</h4>
          <p className="text-gray-800 text-sm leading-relaxed">
            <strong>78% of users started on mobile but 45% switched to desktop after failures.</strong>
            This revealed that device choice was context-dependent, not preference-based.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="bg-white border border-gray-200 rounded-xl p-8 text-center">
            <div className="text-4xl mb-3">🔗</div>
            <h4 className="font-bold text-gray-900 mb-3">Shared Progress</h4>
            <p className="text-base text-gray-700">Submissions started on mobile could be completed on desktop</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-8 text-center">
            <div className="text-4xl mb-3">💾</div>
            <h4 className="font-bold text-gray-900 mb-3">Context Preservation</h4>
            <p className="text-base text-gray-700">Form data, uploaded receipts, and status automatically synced</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-8 text-center">
            <div className="text-4xl mb-3">⚡</div>
            <h4 className="font-bold text-gray-900 mb-3">Platform Optimization</h4>
            <p className="text-base text-gray-700">Each platform leveraged its unique strengths rather than forcing identical experiences</p>
          </div>
        </div>
      </div>

    </motion.div>
  );
}