import { motion } from 'framer-motion';
import {
  MdPalette, MdSecurity, MdLanguage, MdPolicy, MdRocket, MdBuild,
  MdLightbulb, MdSearch, MdLink, MdCloud, MdSpeed, MdArrowForward,
  MdAutoAwesome, MdInsights, MdPhoneIphone, MdCamera, MdTouchApp,
  MdOfflinePin, MdDesktopMac, MdCloudUpload, MdViewSidebar, MdHistory,
  MdPersonPin, MdSync, MdCheckCircle, MdCloudSync, MdDeviceHub,
  MdAnalytics
} from 'react-icons/md';

export function DesignStrategySection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* Design Process */}
      <div className="mb-20">
        <h3 className="text-gray-800 font-bold text-2xl mb-8">Design Process: From Research to Solution</h3>

        <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 mb-8">
          <h4 className="font-bold text-gray-800 mb-3 text-lg flex items-center gap-2">
            <MdPalette className="text-purple-500" size={24} />
            Design Methodology
          </h4>
          <p className="text-gray-800 leading-relaxed">
            <strong>Research → Ideation → Prototyping → Testing → Iteration</strong>
          </p>
        </div>

        {/* Design Approaches Comparison Table */}
        <div className="mb-8">
          <h4 className="font-bold text-gray-800 mb-4 text-lg">Three Design Approaches Evaluated</h4>
          <div className="overflow-x-auto">
            <table className="w-full bg-white border border-gray-200 rounded-xl shadow-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left p-4 font-semibold text-gray-800">Approach</th>
                  <th className="text-left p-4 font-semibold text-gray-800">Decision</th>
                  <th className="text-left p-4 font-semibold text-gray-800">Timeline</th>
                  <th className="text-left p-4 font-semibold text-gray-800">Rationale</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-gray-100">
                  <td className="p-4 font-medium text-gray-800">Complete Rebuild</td>
                  <td className="p-4">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      ❌ Rejected
                    </span>
                  </td>
                  <td className="p-4 text-gray-600">18 months</td>
                  <td className="p-4 text-gray-600">Too risky for critical healthcare system</td>
                </tr>
                <tr className="border-t border-gray-100">
                  <td className="p-4 font-medium text-gray-800">Progressive Enhancement</td>
                  <td className="p-4">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      ✅ Selected
                    </span>
                  </td>
                  <td className="p-4 text-gray-600">6 months</td>
                  <td className="p-4 text-gray-600">Balanced risk with faster delivery</td>
                </tr>
                <tr className="border-t border-gray-100">
                  <td className="p-4 font-medium text-gray-800">Parallel Systems</td>
                  <td className="p-4">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      🔄 Pilot only
                    </span>
                  </td>
                  <td className="p-4 text-gray-600">12 months</td>
                  <td className="p-4 text-gray-600">Good for A/B testing, high maintenance</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Interactive Design Evolution */}
        <div className="mb-8">
          <h4 className="font-bold text-gray-800 mb-6 text-lg">Interactive Design Evolution</h4>
          <p className="text-gray-600 mb-8">Progression from existing design to V3 through interactive prototypes.</p>

          <div className="space-y-8">
            {/* Mobile Evolution */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <MdBuild className="text-blue-500" size={24} />
                <h5 className="font-bold text-gray-800">Mobile Design Evolution</h5>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                98.9% abandonment to 76% completion rate progression
              </p>

              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <iframe
                  src="/mockups/uhg/design-evolution-mobile/index.html"
                  className="w-full h-[1400px] border-0 rounded-lg"
                  title="Mobile Design Evolution"
                  loading="lazy"
                />
              </div>

              <div className="text-xs text-gray-500 space-y-1">
                <div className="flex justify-between">
                  <span>Existing → V3:</span>
                  <span>1.1% → 76% completion</span>
                </div>
                <div className="flex justify-between">
                  <span>Time reduction:</span>
                  <span>18 min → 4.5 min</span>
                </div>
              </div>
            </div>

            {/* Desktop Evolution */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <MdLightbulb className="text-purple-500" size={24} />
                <h5 className="font-bold text-gray-800">Desktop Design Evolution</h5>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                Traditional multi-column forms to intelligent progressive disclosure
              </p>

              <div className="bg-gray-50 rounded-lg p-4 mb-4 flex justify-center">
                <iframe
                  src="/mockups/uhg/design-evolution-desktop/index.html"
                  className="w-[1200px] h-[1200px] border-0 rounded-lg max-w-full"
                  title="Desktop Design Evolution"
                  loading="lazy"
                />
              </div>

              <div className="text-xs text-gray-500 space-y-1">
                <div className="flex justify-between">
                  <span>Existing → V3:</span>
                  <span>12% → 78%</span>
                </div>
                <div className="flex justify-between">
                  <span>Error reduction:</span>
                  <span>85% → 8%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mt-6">
            <h4 className="font-bold text-blue-800 mb-3 flex items-center gap-2">
              <MdInsights className="text-blue-600" size={20} />
              Key Evolution Insights
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div>
                <strong className="text-blue-700">Existing Problems:</strong>
                <ul className="text-gray-700 mt-2 space-y-1">
                  <li>• 8+ overwhelming fields</li>
                  <li>• Confusing medical codes</li>
                  <li>• Generic errors</li>
                  <li>• No upload guidance</li>
                  <li>• No cross-device sync</li>
                </ul>
              </div>
              <div>
                <strong className="text-blue-700">V3 Solutions:</strong>
                <ul className="text-gray-700 mt-2 space-y-1">
                  <li>• 3-step guided process</li>
                  <li>• Smart auto-detection</li>
                  <li>• Real-time eligibility</li>
                  <li>• Progressive disclosure</li>
                  <li>• Cross-device sync</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Key Design Decisions */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
          <h4 className="font-bold text-blue-800 mb-4">Key Design Decisions</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
            <div className="flex items-center gap-2">
              <span className="text-blue-500">•</span>
              <span>Mobile-first with desktop optimization</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-blue-500">•</span>
              <span>Adaptive UI by user persona</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-blue-500">•</span>
              <span>Cross-device state preservation</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-blue-500">•</span>
              <span>Smart assistance over manual entry</span>
            </div>
          </div>
        </div>

        {/* Prototyping Timeline */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h4 className="font-bold text-gray-800 mb-4">Prototyping Timeline</h4>
          <div className="space-y-3">
            <div className="flex items-center gap-4">
              <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium min-w-[80px]">Week 1-2</span>
              <span className="text-sm text-gray-700">Paper sketches and concept validation</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium min-w-[80px]">Week 3-4</span>
              <span className="text-sm text-gray-700">Interactive Figma prototypes for stakeholder review</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium min-w-[80px]">Week 5-6</span>
              <span className="text-sm text-gray-700">HTML prototype for technical validation</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium min-w-[80px]">Week 7-8</span>
              <span className="text-sm text-gray-700">Production-ready design system implementation</span>
            </div>
          </div>
        </div>
      </div>

      {/* Design Principles */}
      <div className="mb-20">
        <h3 className="text-gray-800 font-bold text-2xl mb-8">Design Principles</h3>
        <p className="text-gray-800 mb-8">
          Four core principles guiding all design decisions:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white border border-gray-200 p-8 rounded-xl shadow-sm">
            <h4 className="font-bold text-gray-800 mb-3 text-lg flex items-center gap-2">
              <MdSecurity className="text-green-500" size={20} />
              Progressive Confidence
            </h4>
            <p className="text-gray-700 text-base">
              Build trust through transparent feedback, time estimates, and recovery paths.
            </p>
          </div>

          <div className="bg-white border border-gray-200 p-8 rounded-xl shadow-sm">
            <h4 className="font-bold text-gray-800 mb-3 text-lg flex items-center gap-2">
              <MdAutoAwesome className="text-blue-500" size={20} />
              Context-Aware Guidance
            </h4>
            <p className="text-gray-700 text-base">
              Intelligent help based on receipt type, user history, and experience level.
            </p>
          </div>

          <div className="bg-white border border-gray-200 p-8 rounded-xl shadow-sm">
            <h4 className="font-bold text-gray-800 mb-3 text-lg flex items-center gap-2">
              <MdLanguage className="text-indigo-500" size={20} />
              Graceful Degradation
            </h4>
            <p className="text-gray-700 text-base">
              Functionality across varying network speeds, devices, and scenarios.
            </p>
          </div>

          <div className="bg-white border border-gray-200 p-8 rounded-xl shadow-sm">
            <h4 className="font-bold text-gray-800 mb-3 text-lg flex items-center gap-2">
              <MdPolicy className="text-purple-500" size={20} />
              Regulatory Transparency
            </h4>
            <p className="text-gray-700 text-base">
              Make compliance requirements helpful by explaining why information is needed.
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
              <MdRocket className="text-blue-600 mr-3" size={32} />
              <h4 className="font-bold text-blue-800 text-xl">Interactive Mobile Prototype</h4>
            </div>
            <p className="text-gray-800 mb-6">
              Redesigned Smart Receipt Capture solution demonstrating the transformation from
              <strong>98.9% abandonment rate</strong> to streamlined, user-friendly experience.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h5 className="font-semibold text-blue-700 mb-3">Interactive Prototype Features:</h5>
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
                <h5 className="font-semibold text-blue-700 mb-3">User Journey:</h5>
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
              <strong>Challenge:</strong> Photo quality, file formats, upload failures.
            </p>
            <p className="text-gray-800 text-base">
              <strong>Solution:</strong> Multi-path capture: mobile camera guidance, document scanner,
              desktop drag-and-drop, email forwarding.
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-8 mb-8">
            <h4 className="font-bold text-blue-800 mb-4 flex items-center gap-2">
              <MdBuild className="text-blue-600" size={24} />
              Technical Implementation Strategy
            </h4>
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
          <h4 className="font-bold text-green-800 mb-3 flex items-center gap-2">
            <MdLightbulb className="text-green-600" size={24} />
            Receipt Quality Guidance System
          </h4>
          <p className="text-gray-800 text-sm">
            Real-time camera overlay with receipt boundaries, progressive upload with visual feedback,
            thumb-friendly targets for one-handed use.
          </p>
        </div>
      </div>

      {/* Intelligent Form Assistance */}
      <div className="mb-20">
        <h3 className="text-gray-800 font-bold text-2xl mb-8">Intelligent Form Assistance</h3>

        <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 mb-8">
          <p className="text-gray-800 mb-3">
            <strong>Previous issues:</strong> Long intimidating forms, confusing terminology, poor error handling
          </p>
          <p className="text-gray-800 text-base">
            <strong>New approach:</strong> OCR pre-population, smart suggestions, plain-language explanations, progressive disclosure
          </p>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-8 mb-8">
          <h4 className="font-bold text-yellow-800 mb-4 flex items-center gap-2">
            <MdAutoAwesome className="text-yellow-600" size={24} />
            Example: Smart Recognition in Action
          </h4>
          <div className="bg-white/60 rounded-lg p-4 border border-white/80">
            <p className="text-gray-800 text-sm mb-3">
              When user uploads receipt from <strong>"Dr. Smith Family Practice"</strong>:
            </p>
            <div className="space-y-2 text-base text-gray-700">
              <div className="flex items-center">
                <MdArrowForward className="text-blue-600 mr-2" size={16} />
                <span>System recognizes provider type and suggests "Office Visit" category</span>
              </div>
              <div className="flex items-center">
                <MdArrowForward className="text-blue-600 mr-2" size={16} />
                <span>Shows explanation: "Regular doctor visits are HSA eligible"</span>
              </div>
              <div className="flex items-center">
                <MdArrowForward className="text-blue-600 mr-2" size={16} />
                <span>Pre-fills common fields like date and provider name</span>
              </div>
              <div className="flex items-center">
                <MdArrowForward className="text-blue-600 mr-2" size={16} />
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

            <p className="text-gray-800 mb-6">
              Intelligent form assistance transforms complex medical forms into guided experience with
              <strong>smart categorization</strong>, <strong>OCR pre-population</strong>, and <strong>plain language explanations</strong>.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h5 className="font-semibold text-purple-700 mb-3">Prototype Features:</h5>
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
                <h5 className="font-semibold text-purple-700 mb-3">Flow:</h5>
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
            <strong>New system:</strong> Multi-channel updates with progress tracking, time estimates, clear explanations
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-8 mb-8">
          <h4 className="font-bold text-blue-800 mb-4">Specific Status Messaging</h4>
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
          <h4 className="font-bold text-blue-800 mb-3 flex items-center gap-2">
            <MdInsights className="text-blue-600" size={24} />
            Research Finding
          </h4>
          <p className="text-gray-800 text-sm">
            <strong>78% of users started on mobile but 45% switched to desktop after failures.</strong>
            Device choice was context-dependent, not preference-based.
          </p>
        </div>

        {/* Visual Cross-Device Comparison */}
        <div className="mb-12">
          <h4 className="font-bold text-gray-800 mb-6 text-xl">Platform-Specific Design Adaptations</h4>
          <p className="text-gray-700 mb-8">
            Each platform leverages its unique strengths while maintaining seamless continuity for device switching.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Mobile Design Focus */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <MdPhoneIphone className="text-blue-600" size={32} />
                <h5 className="font-bold text-blue-800 text-lg">Mobile-First Approach</h5>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <MdCamera className="text-blue-500 mt-1" size={20} />
                  <div>
                    <h6 className="font-semibold text-gray-800 mb-1">Camera-Native Receipt Capture</h6>
                    <p className="text-sm text-gray-600">Real-time receipt boundary detection with guided photo assistance</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MdTouchApp className="text-blue-500 mt-1" size={20} />
                  <div>
                    <h6 className="font-semibold text-gray-800 mb-1">Touch-Optimized Interactions</h6>
                    <p className="text-sm text-gray-600">Large touch targets, swipe gestures, and thumb-friendly navigation</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MdOfflinePin className="text-blue-500 mt-1" size={20} />
                  <div>
                    <h6 className="font-semibold text-gray-800 mb-1">Offline-First Design</h6>
                    <p className="text-sm text-gray-600">Works without connectivity, syncs when reconnected</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/80 rounded-lg p-4 border border-blue-200">
                <p className="text-xs text-blue-700 font-medium mb-2">Optimized For:</p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">Quick Capture</span>
                  <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">On-the-Go</span>
                  <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">Simple Forms</span>
                </div>
              </div>
            </div>

            {/* Desktop Design Focus */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <MdDesktopMac className="text-purple-600" size={32} />
                <h5 className="font-bold text-purple-800 text-lg">Desktop Enhancement</h5>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <MdCloudUpload className="text-purple-500 mt-1" size={20} />
                  <div>
                    <h6 className="font-semibold text-gray-800 mb-1">Bulk Upload & Processing</h6>
                    <p className="text-sm text-gray-600">Drag-and-drop multiple receipts with batch validation</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MdViewSidebar className="text-purple-500 mt-1" size={20} />
                  <div>
                    <h6 className="font-semibold text-gray-800 mb-1">Side-by-Side Layout</h6>
                    <p className="text-sm text-gray-600">Receipt preview alongside form completion for efficiency</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MdHistory className="text-purple-500 mt-1" size={20} />
                  <div>
                    <h6 className="font-semibold text-gray-800 mb-1">Advanced History & Search</h6>
                    <p className="text-sm text-gray-600">Detailed filtering, sorting, and transaction management</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/80 rounded-lg p-4 border border-purple-200">
                <p className="text-xs text-purple-700 font-medium mb-2">Optimized For:</p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs">Bulk Processing</span>
                  <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs">Complex Forms</span>
                  <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs">Data Analysis</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Desktop Prototype */}
        <div className="mb-12">
          <h4 className="font-bold text-gray-800 mb-6 text-xl">Desktop Cross-Device Experience</h4>
          <p className="text-gray-700 mb-8">
            Desktop interface supports cross-device workflows with draft detection, mobile upload integration, state restoration.
          </p>

          <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-xl p-8">
            <div className="flex items-center mb-6">
              <h5 className="font-bold text-purple-800 text-xl">Before vs After: Desktop Cross-Device Transformation</h5>
            </div>

            <p className="text-gray-800 mb-6">
              Compare original desktop experience with V3 cross-device solution.
              Prototype shows <strong>existing fragmented interface</strong> vs <strong>new integrated design</strong>.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h6 className="font-semibold text-purple-700 mb-3">Cross-Device Features:</h6>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-center">
                    <span className="text-purple-500 mr-2">•</span>
                    <span><strong>Mobile Receipt Integration:</strong> Photos taken on mobile appear automatically</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-purple-500 mr-2">•</span>
                    <span><strong>Draft Restoration:</strong> Incomplete mobile submissions resume seamlessly</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-purple-500 mr-2">•</span>
                    <span><strong>Desktop Enhancements:</strong> Drag-and-drop, side-by-side preview</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-purple-500 mr-2">•</span>
                    <span><strong>Smart Form Fields:</strong> OCR data from mobile auto-populates desktop form</span>
                  </li>
                </ul>
              </div>

              <div>
                <h6 className="font-semibold text-purple-700 mb-3">Comparison Guide:</h6>
                <ol className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start">
                    <span className="bg-purple-100 text-purple-600 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">1</span>
                    <span>Toggle between "Existing" and "V3" to see the transformation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-purple-100 text-purple-600 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">2</span>
                    <span>Notice how V3 shows mobile drafts and cross-device continuity</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-purple-100 text-purple-600 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">3</span>
                    <span>Compare the cluttered existing form vs streamlined V3 layout</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-purple-100 text-purple-600 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">4</span>
                    <span>Test the V3 drag-and-drop and smart form pre-population</span>
                  </li>
                </ol>
              </div>
            </div>

            {/* Embedded Desktop Prototype */}
            <div className="bg-gray-50 rounded-lg p-4 mb-4 flex justify-center">
              <iframe
                src="/mockups/uhg/cross-device-desktop/index.html"
                className="w-[1200px] h-[1100px] border-0 rounded-lg max-w-full"
                title="Cross-Device Desktop Experience - Existing vs V3"
                loading="lazy"
              />
            </div>

            <div className="bg-white/80 rounded-lg p-4 border border-purple-300">
              <p className="text-sm text-purple-800">
                <strong>Impact:</strong> V3 cross-device desktop increased completion rates from 12% to 78%,
                demonstrating how seamless handoffs improve user success.
              </p>
            </div>
          </div>
        </div>

        {/* Cross-Device User Journey */}
        <div className="mb-12">
          <h4 className="font-bold text-gray-800 mb-6 text-xl">Cross-Device User Scenarios</h4>

          <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-8 mb-8">
            <h5 className="font-bold text-green-800 mb-4 flex items-center gap-2">
              <MdPersonPin className="text-green-600" size={24} />
              Real User Journey: Sarah's Prescription Reimbursement
            </h5>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                  <MdPhoneIphone className="text-green-600" size={24} />
                </div>
                <h6 className="font-semibold text-gray-800 mb-2">1. Mobile Capture</h6>
                <p className="text-sm text-gray-600">At pharmacy: Quick photo of $127 prescription receipt</p>
              </div>

              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                  <MdSync className="text-blue-600" size={24} />
                </div>
                <h6 className="font-semibold text-gray-800 mb-2">2. Auto-Sync</h6>
                <p className="text-sm text-gray-600">Receipt and OCR data automatically saved to cloud</p>
              </div>

              <div className="text-center">
                <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                  <MdDesktopMac className="text-purple-600" size={24} />
                </div>
                <h6 className="font-semibold text-gray-800 mb-2">3. Desktop Completion</h6>
                <p className="text-sm text-gray-600">Opens laptop, finds draft, completes medical details</p>
              </div>

              <div className="text-center">
                <div className="bg-yellow-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                  <MdCheckCircle className="text-yellow-600" size={24} />
                </div>
                <h6 className="font-semibold text-gray-800 mb-2">4. Submission</h6>
                <p className="text-sm text-gray-600">Form auto-populated, validated, and submitted successfully</p>
              </div>
            </div>

            <div className="mt-6 bg-white/80 rounded-lg p-4 border border-green-300">
              <p className="text-sm text-green-800">
                <strong>Result:</strong> 4-minute total time (vs. 18 minutes), no errors, $127 reimbursement in 2 days.
              </p>
            </div>
          </div>
        </div>

        {/* Technical Implementation */}
        <div className="mb-12">
          <h4 className="font-bold text-gray-800 mb-6 text-xl">Technical Cross-Device Architecture</h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h5 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <MdCloudSync className="text-blue-500" size={20} />
                State Management & Sync
              </h5>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span><strong>Real-time synchronization:</strong> Redux-persist with WebSocket updates</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span><strong>Conflict resolution:</strong> Last-write-wins with user confirmation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span><strong>Offline support:</strong> Local storage with queue-based sync</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span><strong>Session management:</strong> JWT tokens with device fingerprinting</span>
                </li>
              </ul>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h5 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <MdDeviceHub className="text-purple-500" size={20} />
                Responsive Design Strategy
              </h5>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">•</span>
                  <span><strong>Adaptive breakpoints:</strong> 320px, 768px, 1024px, 1440px</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">•</span>
                  <span><strong>Progressive enhancement:</strong> Core functionality first, enhanced features layer up</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">•</span>
                  <span><strong>Touch detection:</strong> Automatically adjusts UI density and interactions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">•</span>
                  <span><strong>Network awareness:</strong> Reduces image quality on slow connections</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Core Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white border border-gray-200 rounded-xl p-8 text-center">
            <div className="flex justify-center mb-3">
              <MdLink className="text-blue-500" size={48} />
            </div>
            <h4 className="font-bold text-gray-900 mb-3">Shared Progress</h4>
            <p className="text-base text-gray-700">Mobile submissions completed on desktop</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-8 text-center">
            <div className="flex justify-center mb-3">
              <MdCloud className="text-green-500" size={48} />
            </div>
            <h4 className="font-bold text-gray-900 mb-3">Context Preservation</h4>
            <p className="text-base text-gray-700">Form data, receipts, status auto-synced</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-8 text-center">
            <div className="flex justify-center mb-3">
              <MdSpeed className="text-purple-500" size={48} />
            </div>
            <h4 className="font-bold text-gray-900 mb-3">Platform Optimization</h4>
            <p className="text-base text-gray-700">Each platform leverages unique strengths vs identical experiences</p>
          </div>
        </div>

        {/* Impact Metrics */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-8">
          <h4 className="font-bold text-blue-800 mb-6 flex items-center gap-2">
            <MdAnalytics className="text-blue-600" size={24} />
            Cross-Device Impact Metrics
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-800 mb-2">67%</div>
              <div className="text-sm text-blue-700 font-medium mb-1">Cross-Device Sessions</div>
              <div className="text-xs text-gray-600">Users actively switching between mobile and desktop</div>
            </div>

            <div className="text-center">
              <div className="text-3xl font-bold text-green-800 mb-2">89%</div>
              <div className="text-sm text-green-700 font-medium mb-1">Successful Handoffs</div>
              <div className="text-xs text-gray-600">Device switches that led to completed submissions</div>
            </div>

            <div className="text-center">
              <div className="text-3xl font-bold text-purple-800 mb-2">3.2x</div>
              <div className="text-sm text-purple-700 font-medium mb-1">Efficiency Gain</div>
              <div className="text-xs text-gray-600">Faster completion vs. single-device workflows</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div className="bg-white/80 rounded-lg p-4 border border-blue-200">
              <h6 className="font-semibold text-blue-800 mb-2">Device-Specific Completion Rates</h6>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-700">Mobile-only sessions:</span>
                  <span className="font-medium text-gray-800">23%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Desktop-only sessions:</span>
                  <span className="font-medium text-gray-800">54%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Cross-device sessions:</span>
                  <span className="font-medium text-green-700">78%</span>
                </div>
              </div>
            </div>

            <div className="bg-white/80 rounded-lg p-4 border border-blue-200">
              <h6 className="font-semibold text-blue-800 mb-2">User Satisfaction by Platform</h6>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-700">Mobile experience:</span>
                  <span className="font-medium text-gray-800">4.2/5</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Desktop experience:</span>
                  <span className="font-medium text-gray-800">4.6/5</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Cross-device continuity:</span>
                  <span className="font-medium text-green-700">4.8/5</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </motion.div>
  );
}