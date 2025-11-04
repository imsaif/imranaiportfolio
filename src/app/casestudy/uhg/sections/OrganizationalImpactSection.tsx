'use client';

import { motion } from 'framer-motion';
import { MdAutoAwesome, MdGroup, MdHandshake, MdLightbulb } from 'react-icons/md';

export function OrganizationalImpactSection() {
  return (
    <motion.div
      id="organizational-impact"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Collaborative Influence & Team Approach</h2>

        {/* Design Patterns */}
        <div className="bg-white border border-gray-200 rounded-xl p-8 mb-8 shadow-sm">
          <div className="flex items-start gap-4 mb-6">
            <MdAutoAwesome className="text-blue-600 flex-shrink-0" size={28} />
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Patterns That Became Our Standard</h3>
              <p className="text-gray-700 mb-6">
                The approaches I developed for this project became how our team solved similar problems going forward. Other designers on the team and across the product line adopted these patterns.
              </p>
              <div className="space-y-4">
                <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                  <p className="font-bold text-blue-900 mb-3">Progressive Disclosure Pattern</p>
                  <p className="text-sm text-blue-800 mb-2">
                    How we balanced compliance requirements with usability—showing information contextually rather than overwhelming users upfront. This became the team's go-to approach for regulated features.
                  </p>
                  <p className="text-xs text-gray-600">Adopted by: Product design team (adopted in 3+ projects)</p>
                </div>

                <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
                  <p className="font-bold text-purple-900 mb-3">User Segmentation for Design</p>
                  <p className="text-sm text-purple-800 mb-2">
                    Instead of trying to serve everyone with one design, create fundamentally different experiences optimized for each user segment. The UI designer on the team found this approach valuable and has used it since.
                  </p>
                  <p className="text-xs text-gray-600">Impact: Improved outcomes on 2 subsequent projects</p>
                </div>

                <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                  <p className="font-bold text-green-900 mb-3">Research Without Traditional Testing</p>
                  <p className="text-sm text-green-800 mb-2">
                    Due to healthcare privacy constraints, we developed a research approach using analytics, customer service transcripts, and stakeholder interviews. The researcher on the team expanded this into a toolkit for other projects.
                  </p>
                  <p className="text-xs text-gray-600">Now standard: For all healthcare projects requiring privacy compliance</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* How We Worked Together */}
        <div className="bg-white border border-gray-200 rounded-xl p-8 mb-8 shadow-sm">
          <div className="flex items-start gap-4 mb-6">
            <MdHandshake className="text-green-600 flex-shrink-0" size={28} />
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-4">How Our Collaboration Worked</h3>
              <p className="text-gray-700 mb-6">
                This project showed what becomes possible when design, research, product, and engineering work together from day one with real alignment on goals.
              </p>
              <div className="space-y-4">
                <div className="border-l-4 border-green-400 pl-4">
                  <p className="font-bold text-gray-900 mb-2">Design-Research Partnership</p>
                  <p className="text-sm text-gray-700">
                    Instead of research being separate from design, the researcher and I worked together throughout. She helped me understand user needs more deeply, and I could test approaches in real-time.
                  </p>
                </div>
                <div className="border-l-4 border-blue-400 pl-4">
                  <p className="font-bold text-gray-900 mb-2">Early Engineering Involvement</p>
                  <p className="text-sm text-gray-700">
                    The engineering lead was involved in design decisions from the start. When I proposed OCR for receipt capture, he knew immediately if it was feasible and what the trade-offs were. This prevented wasted effort.
                  </p>
                </div>
                <div className="border-l-4 border-purple-400 pl-4">
                  <p className="font-bold text-gray-900 mb-2">Product Manager as Translator</p>
                  <p className="text-sm text-gray-700">
                    The product manager helped us navigate competing priorities and communicate decisions to stakeholders. When we pivoted to multi-path design, they built the business case that secured buy-in.
                  </p>
                </div>
                <div className="border-l-4 border-pink-400 pl-4">
                  <p className="font-bold text-gray-900 mb-2">Compliance as Partner, Not Gate</p>
                  <p className="text-sm text-gray-700">
                    Rather than compliance reviewing designs at the end, we invited them into the process. This prevented costly late discoveries and led to better solutions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Knowledge & Growth */}
        <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
          <div className="flex items-start gap-4 mb-6">
            <MdLightbulb className="text-yellow-600 flex-shrink-0" size={28} />
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Shared Learning & Development</h3>
              <p className="text-gray-700 mb-6">
                This project was a learning opportunity for everyone involved. We documented what we learned and shared it with our immediate team and cross-functional partners.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
                  <p className="font-bold text-yellow-900 mb-3">Within Our Team</p>
                  <ul className="space-y-2 text-sm text-yellow-800">
                    <li>✓ Weekly design critique sessions</li>
                    <li>✓ Documented design decisions & rationale</li>
                    <li>✓ Case study walkthrough for new designers</li>
                    <li>✓ Shared research methodology playbook</li>
                  </ul>
                </div>

                <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                  <p className="font-bold text-blue-900 mb-3">Cross-Functional Sharing</p>
                  <ul className="space-y-2 text-sm text-blue-800">
                    <li>✓ Presented approach to design community (team meetup)</li>
                    <li>✓ Shared progressive disclosure pattern with other teams</li>
                    <li>✓ Consulted on 2 similar healthcare redesign projects</li>
                    <li>✓ Mentored designer on another product line</li>
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
