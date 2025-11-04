'use client';

import { motion } from 'framer-motion';
import { MdPerson, MdGroups, MdHandshake, MdCheckCircle } from 'react-icons/md';

export function LeadershipTeamSection() {
  return (
    <motion.div
      id="leadership-team"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">My Role & Collaborative Approach</h2>

        {/* Role as Senior Designer */}
        <div className="bg-white border border-gray-200 rounded-xl p-8 mb-8 shadow-sm">
          <div className="flex items-start gap-4 mb-6">
            <MdPerson className="text-blue-600 flex-shrink-0" size={28} />
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Lead UX Designer</h3>
              <p className="text-gray-700 mb-6">
                I worked as a Lead UX Designer on this project, responsible for defining the end-to-end UX strategy, research approach, and design execution. While I didn't manage direct reports, I collaborated closely with peers across design, research, product, and engineering to drive the initiative forward.
              </p>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <CheckIcon />
                  <div>
                    <p className="font-medium text-gray-900">Owned the design vision</p>
                    <p className="text-sm text-gray-600">Defined the strategic approach to solving the reimbursement problem</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckIcon />
                  <div>
                    <p className="font-medium text-gray-900">Led research discovery</p>
                    <p className="text-sm text-gray-600">Directed 7-week research phase, analyzing data and synthesizing insights</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckIcon />
                  <div>
                    <p className="font-medium text-gray-900">Made design decisions</p>
                    <p className="text-sm text-gray-600">Drove solutions through multiple iterations based on evidence</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Core Collaborators */}
        <div className="bg-white border border-gray-200 rounded-xl p-8 mb-8 shadow-sm">
          <div className="flex items-start gap-4 mb-6">
            <MdGroups className="text-purple-600 flex-shrink-0" size={28} />
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Core Collaborators</h3>
              <p className="text-gray-700 mb-6">
                I worked closely with a lean, focused team of peers. Each brought critical expertise that was essential to the project's success.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                  <h4 className="font-bold text-blue-900 mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold">1</span>
                    UX Researcher
                  </h4>
                  <p className="text-sm text-blue-800 mb-3">
                    Partner who helped design and conduct the research phase, analyzed customer service data, and synthesized user insights.
                  </p>
                  <p className="text-xs text-gray-600">Critical for: Understanding true user needs despite privacy constraints</p>
                </div>

                <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
                  <h4 className="font-bold text-purple-900 mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white text-sm font-bold">1</span>
                    Product Manager
                  </h4>
                  <p className="text-sm text-purple-800 mb-3">
                    Aligned on priorities, managed stakeholder expectations, and helped shape the business case for the project.
                  </p>
                  <p className="text-xs text-gray-600">Critical for: Translating design into business value</p>
                </div>

                <div className="bg-pink-50 p-6 rounded-lg border border-pink-200">
                  <h4 className="font-bold text-pink-900 mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-pink-600 flex items-center justify-center text-white text-sm font-bold">1</span>
                    Engineering Lead
                  </h4>
                  <p className="text-sm text-pink-800 mb-3">
                    Partner who evaluated technical feasibility, owned implementation, and helped identify innovative solutions like OCR.
                  </p>
                  <p className="text-xs text-gray-600">Critical for: Bridging design vision with technical reality</p>
                </div>

                <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                  <h4 className="font-bold text-green-900 mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white text-sm font-bold">1</span>
                    Additional UI Designer
                  </h4>
                  <p className="text-sm text-green-800 mb-3">
                    Collaborative partner who helped with detailed design execution and design system consistency.
                  </p>
                  <p className="text-xs text-gray-600">Critical for: Shipping quality at scale</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Key Working Relationships */}
        <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
          <div className="flex items-start gap-4 mb-6">
            <MdHandshake className="text-green-600 flex-shrink-0" size={28} />
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Navigating Cross-Functional Relationships</h3>
              <p className="text-gray-700 mb-6">
                Beyond the core team, I worked with stakeholders who had different priorities and constraints. Success meant understanding their needs and finding solutions that worked across disciplines.
              </p>
              <div className="space-y-4">
                <div className="border-l-4 border-green-400 pl-4">
                  <p className="font-medium text-gray-900">Engineering Team</p>
                  <p className="text-sm text-gray-600">Collaborated on technical feasibility, prioritization, and implementation of complex features like OCR and progressive workflows</p>
                </div>
                <div className="border-l-4 border-blue-400 pl-4">
                  <p className="font-medium text-gray-900">Compliance & Legal</p>
                  <p className="text-sm text-gray-600">Worked to ensure design solutions met regulatory requirements while maintaining usability and user trust</p>
                </div>
                <div className="border-l-4 border-purple-400 pl-4">
                  <p className="font-medium text-gray-900">Customer Support Team</p>
                  <p className="text-sm text-gray-600">Engaged with team handling support calls to understand pain points firsthand and validate design solutions</p>
                </div>
                <div className="border-l-4 border-pink-400 pl-4">
                  <p className="font-medium text-gray-900">Product Leadership</p>
                  <p className="text-sm text-gray-600">Communicated findings, justified design decisions, and made the case for investment in the reimbursement feature</p>
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
      <MdCheckCircle className="text-blue-600" size={20} />
    </div>
  );
}
