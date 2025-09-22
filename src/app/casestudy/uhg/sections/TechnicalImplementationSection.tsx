import { motion } from 'framer-motion';
import { MdBuild, MdSecurity, MdAssessment, MdBalance, MdRocket } from 'react-icons/md';

export function TechnicalImplementationSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="mb-20">
        <h3 className="text-gray-800 font-bold text-xl mb-6">Working with Engineering Constraints</h3>
        <div className="bg-gray-50 border-l-4 border-gray-500 p-8 rounded-xl mb-20">
          <p className="text-gray-800">
            Collaborated with engineering to <strong>redesign system architecture</strong> supporting UX goals
            while maintaining regulatory compliance and reliability.
          </p>
        </div>
      </div>

      <div className="mb-12">
        <h3 className="text-gray-800 font-bold text-xl mb-6">File Upload Architecture Challenges</h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8">
            <h4 className="font-bold text-gray-800 mb-4 flex items-center">
              <span className="mr-2">❌</span>
              Previous Monolithic Approach
            </h4>
            <ul className="space-y-2 text-base text-gray-700">
              <li>• Single API handled processing, validation, approval routing</li>
              <li>• Multiple failures, no granular feedback</li>
              <li>• Large file uploads caused timeouts</li>
              <li>• No recovery options for failures</li>
            </ul>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-xl p-8">
            <h4 className="font-bold text-green-800 mb-4 flex items-center">
              <span className="mr-2">✅</span>
              New Collaborative Solution
            </h4>
            <ul className="space-y-2 text-base text-gray-700">
              <li>• Chunked upload system for large files</li>
              <li>• Async processing with transparent feedback</li>
              <li>• Compression maintaining OCR readability</li>
              <li>• Offline receipt capture</li>
              <li>• Transparent retry logic</li>
            </ul>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-8">
          <h4 className="font-bold text-blue-800 mb-4 flex items-center gap-2">
            <MdBuild className="text-blue-600" size={24} />
            Technical Implementation Details
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-base">
            <div>
              <h5 className="font-semibold text-blue-700 mb-3">Upload Process Improvements</h5>
              <ul className="space-y-2 text-gray-700">
                <li>• Progressive image compression</li>
                <li>• Client-side validation with feedback</li>
                <li>• Background retry with backoff</li>
                <li>• Size fallback on failure</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-blue-700 mb-3">Performance Optimizations</h5>
              <ul className="space-y-2 text-gray-700">
                <li>• Lazy loading by receipt type</li>
                <li>• CDN implementation for static resources</li>
                <li>• Database optimization (60% improvement)</li>
                <li>• Client-side preference caching</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-12">
        <h3 className="text-gray-800 font-bold text-xl mb-6">API Design Collaboration</h3>

        <div className="mb-12">
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-8 rounded-xl mb-8">
            <h4 className="font-bold text-yellow-800 mb-3">🤝 Collaborative Design Philosophy</h4>
            <p className="text-gray-800 text-base mb-4">
              Worked with backend team to create endpoints enabling better UX while maintaining system integrity.
              Weekly technical sessions balanced UX goals with system constraints.
            </p>
            <div className="bg-white/80 rounded-lg p-4 border border-yellow-200">
              <p className="text-sm text-yellow-800">
                <strong>Key insight:</strong> Best UX emerges when design and engineering collaborate early in architecture phase.
              </p>
            </div>
          </div>

          {/* API Architecture Evolution */}
          <div className="mb-12">
            <h4 className="font-bold text-gray-800 mb-6 text-lg">API Architecture Evolution</h4>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Legacy Architecture */}
              <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                <h5 className="font-bold text-red-800 mb-4 flex items-center gap-2">
                  <span>❌</span>
                  Legacy Monolithic API
                </h5>

                <div className="space-y-4">
                  <div className="bg-white/80 rounded-lg p-4 border border-red-200">
                    <div className="text-center space-y-3">
                      <div className="bg-red-100 rounded-lg p-3">
                        <span className="text-sm font-medium text-red-800">📱 Mobile App</span>
                      </div>
                      <div className="text-red-600">↓</div>
                      <div className="bg-red-200 rounded-lg p-4">
                        <div className="text-xs font-medium text-red-900 mb-2">Single API Endpoint</div>
                        <div className="text-xs text-red-700 space-y-1">
                          <div>POST /api/claims/submit</div>
                          <div>• File upload</div>
                          <div>• OCR, validation, routing</div>
                        </div>
                      </div>
                      <div className="text-red-600">↓</div>
                      <div className="bg-red-100 rounded-lg p-3">
                        <span className="text-sm font-medium text-red-800">💾 Database</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm text-red-700">
                    <div className="flex items-center gap-2">
                      <span>⚠️</span>
                      <span>30-45 second processing time</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>⚠️</span>
                      <span>No granular error feedback</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>⚠️</span>
                      <span>77% timeout failure rate</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* New Microservices Architecture */}
              <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                <h5 className="font-bold text-green-800 mb-4 flex items-center gap-2">
                  <span>✅</span>
                  New Microservices API
                </h5>

                <div className="space-y-4">
                  <div className="bg-white/80 rounded-lg p-4 border border-green-200">
                    <div className="space-y-3">
                      <div className="bg-green-100 rounded-lg p-3 text-center">
                        <span className="text-sm font-medium text-green-800">📱 Mobile App</span>
                      </div>

                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div className="bg-blue-100 rounded p-2 text-center">
                          <div className="font-medium text-blue-800">Upload</div>
                          <div className="text-blue-600">POST /upload</div>
                        </div>
                        <div className="bg-purple-100 rounded p-2 text-center">
                          <div className="font-medium text-purple-800">Process</div>
                          <div className="text-purple-600">POST /ocr</div>
                        </div>
                        <div className="bg-orange-100 rounded p-2 text-center">
                          <div className="font-medium text-orange-800">Submit</div>
                          <div className="text-orange-600">POST /claims</div>
                        </div>
                      </div>

                      <div className="bg-green-100 rounded-lg p-3 text-center">
                        <span className="text-sm font-medium text-green-800">💾 Distributed Storage</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm text-green-700">
                    <div className="flex items-center gap-2">
                      <span>✅</span>
                      <span>2-5 second response time</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>✅</span>
                      <span>Real-time progress feedback</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>✅</span>
                      <span>94% success rate</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Cross-Device API Strategy */}
          <div className="mb-12">
            <h4 className="font-bold text-gray-800 mb-6 text-lg">Cross-Device API Strategy</h4>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-8 mb-8">
              <h5 className="font-bold text-blue-800 mb-4 flex items-center gap-2">
                <span>🔄</span>
                Device State Synchronization
              </h5>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-white/80 rounded-lg p-4 border border-blue-200">
                  <div className="text-center space-y-3">
                    <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto">
                      <span className="text-blue-600">📱</span>
                    </div>
                    <div className="text-sm font-medium text-blue-800">Mobile Capture</div>
                    <div className="text-xs text-blue-600 space-y-1">
                      <div>POST /api/drafts</div>
                      <div>PUT /api/files/upload</div>
                      <div>GET /api/ocr/status</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/80 rounded-lg p-4 border border-purple-200">
                  <div className="text-center space-y-3">
                    <div className="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto">
                      <span className="text-purple-600">☁️</span>
                    </div>
                    <div className="text-sm font-medium text-purple-800">Cloud Sync</div>
                    <div className="text-xs text-purple-600 space-y-1">
                      <div>WebSocket events</div>
                      <div>Redis cache</div>
                      <div>State validation</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/80 rounded-lg p-4 border border-green-200">
                  <div className="text-center space-y-3">
                    <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto">
                      <span className="text-green-600">💻</span>
                    </div>
                    <div className="text-sm font-medium text-green-800">Desktop Completion</div>
                    <div className="text-xs text-green-600 space-y-1">
                      <div>GET /api/drafts/:id</div>
                      <div>PUT /api/drafts/:id</div>
                      <div>POST /api/claims/submit</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/80 rounded-lg p-4 border border-blue-200">
                <h6 className="font-semibold text-blue-800 mb-2">Technical Implementation Details:</h6>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• <strong>Session Management:</strong> JWT tokens with device fingerprinting</li>
                  <li>• <strong>Conflict Resolution:</strong> Last-write-wins with user confirmation</li>
                  <li>• <strong>Offline Support:</strong> Local storage with queue-based sync</li>
                  <li>• <strong>Real-time Updates:</strong> WebSocket for instant synchronization</li>
                </ul>
              </div>
            </div>
          </div>

          {/* API Response Design */}
          <div className="mb-12">
            <h4 className="font-bold text-gray-800 mb-6 text-lg">Human-Centered API Response Design</h4>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h5 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span>📝</span>
                  Error Response Evolution
                </h5>
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="font-medium text-gray-800 mb-2">Legacy Response:</p>
                    <code className="text-xs text-gray-700 bg-white p-2 rounded block">
{`{
  "error": "Upload failed",
  "status": 500
}`}
                    </code>
                    <p className="text-xs text-red-600 mt-2">❌ No actionable information for users</p>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="font-medium text-green-800 mb-2">New UX-Informed Response:</p>
                    <code className="text-xs text-green-700 bg-white p-2 rounded block">
{`{
  "error": "file_too_large",
  "user_message": "Photo is too large for upload",
  "action_suggestion": "Try taking a closer photo of just the receipt",
  "technical_details": {
    "max_size": "10MB",
    "received_size": "15.2MB",
    "alternative_formats": ["JPEG", "PNG"]
  },
  "retry_options": {
    "auto_compress": true,
    "manual_crop": "/help/crop-receipt"
  }
}`}
                    </code>
                    <p className="text-xs text-green-600 mt-2">✅ Clear guidance and recovery options</p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h5 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span>📊</span>
                  Progress Tracking API
                </h5>
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="font-medium text-blue-800 mb-2">Real-time Status Updates:</p>
                    <code className="text-xs text-blue-700 bg-white p-2 rounded block">
{`{
  "status": "processing",
  "progress": 65,
  "stage": "ocr_extraction",
  "stage_description": "Reading receipt details...",
  "estimated_completion": "15 seconds",
  "extracted_data": {
    "provider": "Dr. Smith Family Practice",
    "amount": "$125.00",
    "confidence": 0.94
  }
}`}
                    </code>
                    <p className="text-xs text-blue-600 mt-2">✅ Transparent progress with extracted data preview</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Collaborative Design Process */}
          <div className="mb-12">
            <h4 className="font-bold text-gray-800 mb-6 text-lg">Collaborative Design Process</h4>

            <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 mb-8">
              <h5 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span>👥</span>
                Weekly Design-Engineering Sessions
              </h5>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white rounded-lg p-4 border border-gray-200 text-center">
                  <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                    <span className="text-blue-600 text-lg">1</span>
                  </div>
                  <div className="text-sm font-medium text-gray-800">UX Requirements</div>
                  <div className="text-xs text-gray-600 mt-1">Journey mapping & pain points</div>
                </div>

                <div className="bg-white rounded-lg p-4 border border-gray-200 text-center">
                  <div className="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                    <span className="text-purple-600 text-lg">2</span>
                  </div>
                  <div className="text-sm font-medium text-gray-800">Technical Constraints</div>
                  <div className="text-xs text-gray-600 mt-1">Limitations & security requirements</div>
                </div>

                <div className="bg-white rounded-lg p-4 border border-gray-200 text-center">
                  <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                    <span className="text-green-600 text-lg">3</span>
                  </div>
                  <div className="text-sm font-medium text-gray-800">API Co-Design</div>
                  <div className="text-xs text-gray-600 mt-1">Joint spec & prototyping</div>
                </div>

                <div className="bg-white rounded-lg p-4 border border-gray-200 text-center">
                  <div className="bg-orange-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                    <span className="text-orange-600 text-lg">4</span>
                  </div>
                  <div className="text-sm font-medium text-gray-800">User Testing</div>
                  <div className="text-xs text-gray-600 mt-1">Validation & iteration</div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <h6 className="font-semibold text-gray-800 mb-2">Key Collaboration Outcomes:</h6>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• <strong>Error Classification System:</strong> 23 specific error types with user-friendly messages</li>
                  <li>• <strong>Progressive Enhancement:</strong> Core functionality works on slow connections</li>
                  <li>• <strong>Intelligent Retry Logic:</strong> Automatic recovery for 80% of temporary failures</li>
                  <li>• <strong>Performance Budgets:</strong> 2-second response time SLA for critical operations</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Technical Trade-offs */}
          <div className="mb-12">
            <h4 className="font-bold text-gray-800 mb-6 text-lg">Technical Trade-offs & Decisions</h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <h5 className="font-bold text-blue-800 mb-4 flex items-center gap-2">
                  <span>⚖️</span>
                  Performance vs. Security
                </h5>
                <div className="space-y-4">
                  <div className="bg-white/80 rounded-lg p-4">
                    <div className="text-sm text-blue-800 font-medium mb-2">Challenge:</div>
                    <div className="text-sm text-blue-700">
                      File encryption required 3-5s overhead, causing abandonment.
                    </div>
                  </div>
                  <div className="bg-white/80 rounded-lg p-4">
                    <div className="text-sm text-blue-800 font-medium mb-2">Solution:</div>
                    <div className="text-sm text-blue-700">
                      Progressive encryption: show preview while encrypting in background.
                    </div>
                  </div>
                  <div className="bg-green-100 rounded-lg p-3">
                    <div className="text-sm text-green-800 font-medium">
                      Result: 0.8s perceived upload time, full security compliance
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
                <h5 className="font-bold text-purple-800 mb-4 flex items-center gap-2">
                  <span>🔄</span>
                  Real-time vs. Battery Life
                </h5>
                <div className="space-y-4">
                  <div className="bg-white/80 rounded-lg p-4">
                    <div className="text-sm text-purple-800 font-medium mb-2">Challenge:</div>
                    <div className="text-sm text-purple-700">
                      Real-time sync required persistent connections, draining 40% battery.
                    </div>
                  </div>
                  <div className="bg-white/80 rounded-lg p-4">
                    <div className="text-sm text-purple-800 font-medium mb-2">Solution:</div>
                    <div className="text-sm text-purple-700">
                      Smart polling: frequent updates when active, backoff when idle.
                    </div>
                  </div>
                  <div className="bg-green-100 rounded-lg p-3">
                    <div className="text-sm text-green-800 font-medium">
                      Result: 90% battery impact reduction, sub-second sync when needed
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Success Metrics */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-8">
            <h4 className="font-bold text-green-800 mb-6 flex items-center gap-2">
              <span>📈</span>
              API Performance Impact
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-800 mb-2">94%</div>
                <div className="text-sm text-green-700 font-medium mb-1">API Success Rate</div>
                <div className="text-xs text-gray-600">Up from 23%</div>
              </div>

              <div className="text-center">
                <div className="text-3xl font-bold text-blue-800 mb-2">2.1s</div>
                <div className="text-sm text-blue-700 font-medium mb-1">Average Response Time</div>
                <div className="text-xs text-gray-600">Down from 34s</div>
              </div>

              <div className="text-center">
                <div className="text-3xl font-bold text-purple-800 mb-2">89%</div>
                <div className="text-sm text-purple-700 font-medium mb-1">Cross-Device Sync Success</div>
                <div className="text-xs text-gray-600">New capability</div>
              </div>

              <div className="text-center">
                <div className="text-3xl font-bold text-orange-800 mb-2">52%</div>
                <div className="text-sm text-orange-700 font-medium mb-1">Support Call Reduction</div>
                <div className="text-xs text-gray-600">Better error messages</div>
              </div>
            </div>

            <div className="bg-white/80 rounded-lg p-4 border border-green-200">
              <p className="text-sm text-green-800">
                <strong>Key Learning:</strong> Design and engineering collaboration on API architecture from start improves
                both UX and system performance. Collaborative sessions reduced development time and improved outcomes.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-12">
        <h3 className="text-gray-800 font-bold text-xl mb-6">Security and Compliance Integration</h3>

        <div className="bg-gray-50 border-l-4 border-gray-500 p-8 rounded-xl mb-20">
          <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
            <MdSecurity className="text-green-500" size={24} />
            Healthcare Financial Data Requirements
          </h4>
          <p className="text-gray-800 text-base">
            Healthcare financial data required special handling beyond typical web security.
            Design decisions balanced user convenience with regulatory compliance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-8">
            <h5 className="font-bold text-blue-800 mb-3">Security Measures</h5>
            <ul className="space-y-2 text-base text-gray-700">
              <li>• End-to-end encryption for uploads</li>
              <li>• User-visible security indicators</li>
              <li>• Session management balancing security/convenience</li>
              <li>• Privacy controls for user data agency</li>
            </ul>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-xl p-8">
            <h5 className="font-bold text-purple-800 mb-3">Compliance Features</h5>
            <ul className="space-y-2 text-base text-gray-700">
              <li>• Comprehensive audit trails</li>
              <li>• Transparent retention policies</li>
              <li>• Regulatory explanations</li>
              <li>• Understandable compliance processes</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mb-12">
        <h3 className="text-gray-800 font-bold text-xl mb-6">Cross-Functional Collaboration</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="bg-green-50 border border-green-200 rounded-xl p-8">
            <h4 className="font-bold text-green-800 mb-3 flex items-center">
              <MdAssessment className="mr-2 text-blue-500" size={16} />
              Product Management
            </h4>
            <ul className="space-y-2 text-base text-gray-700">
              <li>• Prioritized mobile based on data</li>
              <li>• Defined metrics balancing satisfaction + efficiency</li>
              <li>• Created rollout minimizing disruption</li>
            </ul>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-8">
            <h4 className="font-bold text-blue-800 mb-3 flex items-center">
              <MdBalance className="mr-2 text-purple-500" size={16} />
              Compliance Team
            </h4>
            <ul className="space-y-2 text-base text-gray-700">
              <li>• Designed audit trails</li>
              <li>• Created educational content for regulations</li>
              <li>• Implemented transparent retention policies</li>
            </ul>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-8">
            <h4 className="font-bold text-blue-800 mb-3 flex items-center">
              <span className="mr-2">🎧</span>
              Customer Service
            </h4>
            <ul className="space-y-2 text-base text-gray-700">
              <li>• Built tools showing user experience</li>
              <li>• Created escalation for complex cases</li>
              <li>• Designed self-service reducing requests</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mb-20">
        <h3 className="text-gray-800 font-bold text-xl mb-6">Performance Impact</h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
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
            <div className="text-2xl font-bold text-blue-600 mb-1">73%</div>
            <div className="text-sm text-gray-600">Crash Rate Reduction</div>
            <div className="text-xs text-gray-500">Mobile app stability</div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-xl p-8">
        <h4 className="font-bold text-blue-800 mb-3 flex items-center">
          <MdRocket className="mr-2 text-orange-500" size={16} />
          Technical Innovation Through Constraints
        </h4>
        <p className="text-gray-800 text-base">
          Working within technical limitations—legacy systems, API constraints, processing delays—forced
          creative solutions providing better UX than unlimited resources might have enabled.
          <strong> Constraints, when properly understood, often lead to more robust and
          user-friendly solutions than greenfield development.</strong>
        </p>
      </div>
    </motion.div>
  );
}