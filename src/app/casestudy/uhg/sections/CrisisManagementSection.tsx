'use client';

import { motion } from 'framer-motion';
import { MdAutoFixHigh, MdCheckCircle, MdLightbulb } from 'react-icons/md';

export function CrisisManagementSection() {
  return (
    <motion.div
      id="crisis-management"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Design Challenges & How I Solved Them</h2>

        {/* Challenge 1: Compliance Tension */}
        <div className="bg-white border border-gray-200 rounded-xl p-8 mb-8 shadow-sm">
          <div className="flex items-start gap-4 mb-6">
            <MdAutoFixHigh className="text-yellow-600 flex-shrink-0 mt-1" size={28} />
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-2">The Compliance vs. Usability Tension</h3>
              <p className="text-gray-600 text-sm mb-4">Early in design, compliance flagged required disclosures that would complicate the user flow.</p>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-4">
                <p className="font-medium text-yellow-900 mb-3">The Challenge</p>
                <p className="text-yellow-800 text-sm leading-relaxed">
                  I had designed a streamlined reimbursement flow, but compliance raised concerns about IRS Publication 969 requirements. Adding all required disclosures upfront would destroy the simplicity I'd designed for. The traditional approach would be a wall of legal text—exactly the friction we were trying to eliminate.
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-4">
                <p className="font-medium text-blue-900 mb-3">My Approach</p>
                <ul className="space-y-2 text-blue-800 text-sm">
                  <li>✓ Reframed the problem: compliance isn't the enemy, it's a feature</li>
                  <li>✓ Designed "progressive disclosure"—showing information contextually when needed</li>
                  <li>✓ Worked with compliance team to understand what information mattered most</li>
                  <li>✓ Tested the approach to ensure users actually understood the disclosures</li>
                  <li>✓ Documented the pattern for reuse across other projects</li>
                </ul>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <p className="font-medium text-green-900 mb-3">Outcome</p>
                <p className="text-green-800 text-sm">
                  Found a solution that satisfied both needs. The progressive disclosure pattern became <strong>UHG's standard approach</strong> for balancing regulatory requirements with user experience across the HSA platform.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Challenge 2: One Size Doesn't Fit All */}
        <div className="bg-white border border-gray-200 rounded-xl p-8 mb-8 shadow-sm">
          <div className="flex items-start gap-4 mb-6">
            <MdLightbulb className="text-purple-600 flex-shrink-0 mt-1" size={28} />
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Discovering: One Flow Won't Work for Everyone</h3>
              <p className="text-gray-600 text-sm mb-4">User research revealed 4 distinct user groups with conflicting needs. Our single "optimal" flow wouldn't work.</p>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mb-4">
                <p className="font-medium text-purple-900 mb-3">The Discovery</p>
                <p className="text-purple-800 text-sm leading-relaxed mb-4">
                  After analyzing 6 months of analytics and 800+ customer service transcripts, I identified 4 distinct user segments:
                </p>
                <ul className="space-y-2 text-purple-800 text-sm">
                  <li><strong>Digital Natives (32%):</strong> Want mobile-first, instant experience, will abandon after first friction</li>
                  <li><strong>Traditional Planners (41%):</strong> Prefer desktop, detailed forms, documentation—they want to understand everything</li>
                  <li><strong>Assisted Users (18%):</strong> Need guidance, prefer guided workflows, may need support assistance</li>
                  <li><strong>Mobile Primary (9%):</strong> Mobile-only users with different constraints and needs</li>
                </ul>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-4">
                <p className="font-medium text-blue-900 mb-3">My Decision</p>
                <p className="text-blue-800 text-sm mb-3">
                  Instead of forcing everyone into one "perfect" flow, I proposed building <strong>fundamentally different experiences</strong> for each segment. This meant more design work, but it was the only way to serve everyone well.
                </p>
                <ul className="space-y-2 text-blue-800 text-sm">
                  <li>✓ Built separate, optimized flows for each user type</li>
                  <li>✓ Made the business case that quality would improve ROI</li>
                  <li>✓ Created segment-specific success metrics</li>
                  <li>✓ Coordinated with engineering on how to support multiple paths</li>
                </ul>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <p className="font-medium text-green-900 mb-3">Outcome</p>
                <p className="text-green-800 text-sm">
                  This decision dramatically improved results. Each segment got an experience optimized for their needs, leading to <strong>30% overall completion rate</strong> with high satisfaction across all user types.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Challenge 3: Mobile Complexity */}
        <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
          <div className="flex items-start gap-4 mb-6">
            <MdCheckCircle className="text-green-600 flex-shrink-0 mt-1" size={28} />
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Uncover & Optimize: Mobile Was Being Ignored</h3>
              <p className="text-gray-600 text-sm mb-4">The original platform had only 0.3% completion on mobile—a massive missed opportunity.</p>

              <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-4">
                <p className="font-medium text-green-900 mb-3">The Problem</p>
                <p className="text-green-800 text-sm leading-relaxed">
                  Mobile users were completely underserved. The old flow required scanning, uploading, form filling—all terrible on a small screen. 0.3% completion rate showed mobile wasn't just overlooked, it was broken. With 9% of users being mobile-primary, this represented massive untapped potential.
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-4">
                <p className="font-medium text-blue-900 mb-3">How I Solved It</p>
                <ul className="space-y-2 text-blue-800 text-sm">
                  <li>✓ Designed mobile-first workflow separate from desktop</li>
                  <li>✓ Implemented smart OCR to minimize manual input on small screens</li>
                  <li>✓ Used progressive disclosure to show only critical fields</li>
                  <li>✓ Optimized for camera/microphone capabilities of phones</li>
                  <li>✓ Tested extensively with users on actual devices</li>
                </ul>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <p className="font-medium text-green-900 mb-3">Outcome</p>
                <p className="text-green-800 text-sm">
                  Mobile completion jumped from 0.3% to 18%—a <strong>60x improvement</strong>. This wasn't just better numbers—it meant mobile users could now actually complete reimbursements, a feature that was previously broken for them.
                </p>
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
