'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import InteractivePrototype from './InteractivePrototype';
import CaseStudyFooter from '@/components/case-studies/CaseStudyFooter';
import CaseStudyHeader from '@/components/case-studies/CaseStudyHeader';
import InfoArchitectureDiagrams from '@/components/case-studies/InfoArchitectureDiagrams';
import UserJourneyMapInteractive from '@/components/case-studies/UserJourneyMapInteractive';
import ScrollToTopButton from '@/components/ui/ScrollToTopButton';

const sections = [
  { id: 'introduction', label: 'Introduction' },
  { id: 'overview', label: 'Project Overview' },
  { id: 'challenge', label: 'Challenge' },
  { id: 'process', label: 'User Research' },
  { id: 'design-process', label: 'Design Process' },
  { id: 'lessons', label: 'Lessons' },
  { id: 'results', label: 'Results' },
];

function FloatingNavBar() {
  const [active, setActive] = useState(sections[0].id);

  useEffect(() => {
    const handleScroll = () => {
      let current = sections[0].id;
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el && window.scrollY + 100 >= el.offsetTop) {
          current = section.id;
        }
      }
      setActive(current);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur shadow">
      <ul className="flex justify-center space-x-6 py-3">
        {sections.map(section => (
          <li key={section.id} className="relative">
            <a
              href={`#${section.id}`}
              className={`px-3 py-1 font-medium transition-colors ${
                active === section.id ? 'text-blue-600' : 'text-gray-500 hover:text-blue-500'
              }`}
            >
              {section.label}
              {active === section.id && (
                <motion.div
                  layoutId="underline"
                  className="absolute left-0 right-0 -bottom-1 h-1 bg-blue-500 rounded"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default function Page() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Header section */}
      <header className="bg-white py-0 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          {/* Removed: <Link href="/" className="text-purple-600 font-medium text-xl">Imran Mohammed</Link> */}
        </div>
      </header>

      {/* Hero image in its own container */}
      <div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="w-full relative"
        >
          <div className="w-full h-[70vh] md:h-[80vh] relative overflow-hidden">
            <Image
              src="/images/casestudy/scheduler/teacherafri1.png"
              alt="EduScheduler: Intelligent Academic Planning System"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent"></div>
          </div>
        </motion.div>
      </div>

      <main className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-20 py-12">
        <CaseStudyHeader level="h1">EduScheduler: Intelligent Academic Planning System</CaseStudyHeader>

        <motion.div
          id="introduction"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white p-8 rounded-xl border-l-4 border-blue-400 shadow-sm mb-16"
        >
          <p className="text-lg text-gray-700">
            EduScheduler was built to help NewGlobe Education quickly generate optimized teaching schedules for hundreds
            of schools worldwide.
          </p>
        </motion.div>

        {/* Project Overview Section */}
        <section id="overview" className="mb-20">
          <div className="flex items-center mb-12">
            <CaseStudyHeader level="h2" showGradientLine>
              Project Overview
            </CaseStudyHeader>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          >
            <div className="bg-blue-50 p-8 rounded-2xl border-t-4 border-blue-400 shadow-md">
              <h3 className="text-gray-800 font-bold mb-3">Role</h3>
              <p className="text-gray-900">Lead Product Designer</p>
            </div>

            <div className="bg-purple-50 p-8 rounded-2xl border-t-4 border-purple-400 shadow-md">
              <h3 className="text-gray-800 font-bold mb-3">Organization</h3>
              <p className="text-gray-900">NewGlobe Education</p>
            </div>

            <div className="bg-pink-50 p-8 rounded-2xl border-t-4 border-pink-400 shadow-md">
              <h3 className="text-gray-800 font-bold mb-3">Technologies</h3>
              <p className="text-gray-900">React, Node.js, PostgreSQL, Optimization Algorithms</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white p-8 rounded-xl shadow-md mb-12"
          >
            <p className="text-gray-700">
              Before EduScheduler, timetables were created manually—slow, error-prone, and inflexible. As Lead Product
              Designer, I worked with cross-functional teams to design an automated, adaptable scheduling system.
            </p>
          </motion.div>
        </section>

        {/* The Challenge Section */}
        <section id="challenge" className="mb-20">
          <div className="flex items-center mb-8">
            <CaseStudyHeader level="h2" showGradientLine>
              The Challenge
            </CaseStudyHeader>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white p-8 rounded-xl shadow-md"
          >
            <p className="text-gray-700 mb-8">
              NewGlobe faced major hurdles creating teaching materials for schools in different countries:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="flex items-start bg-gray-50 rounded-xl p-6 border-l-4 border-blue-200 shadow-sm">
                <span className="bg-blue-100 text-blue-500 rounded-full p-2 mr-4 flex items-center justify-center">
                  {/* Clock Icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </span>
                <div>
                  <div className="font-bold text-gray-900 mb-1">Time-intensive</div>
                  <div className="text-gray-800">Manual guide creation took months</div>
                </div>
              </div>
              <div className="flex items-start bg-gray-50 rounded-xl p-6 border-l-4 border-pink-200 shadow-sm">
                <span className="bg-pink-100 text-pink-500 rounded-full p-2 mr-4 flex items-center justify-center">
                  {/* Briefcase Icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-7 4h8a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v7a2 2 0 002 2zm2-10V5a2 2 0 114 0v1"
                    />
                  </svg>
                </span>
                <div>
                  <div className="font-bold text-gray-900 mb-1">Resource drain</div>
                  <div className="text-gray-800">Experts spent time on repetitive tasks</div>
                </div>
              </div>
              <div className="flex items-start bg-gray-50 rounded-xl p-6 border-l-4 border-yellow-200 shadow-sm">
                <span className="bg-yellow-100 text-yellow-500 rounded-full p-2 mr-4 flex items-center justify-center">
                  {/* Check Badge Icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4" />
                  </svg>
                </span>
                <div>
                  <div className="font-bold text-gray-900 mb-1">Inconsistent quality</div>
                  <div className="text-gray-800">Materials varied by writer</div>
                </div>
              </div>
              <div className="flex items-start bg-gray-50 rounded-xl p-6 border-l-4 border-green-200 shadow-sm">
                <span className="bg-green-100 text-green-500 rounded-full p-2 mr-4 flex items-center justify-center">
                  {/* Globe Icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 3C7.03 3 3 7.03 3 12s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm0 0c0 4.97 4.03 9 9 9m-9-9C7.03 3 3 7.03 3 12m9-9v18"
                    />
                  </svg>
                </span>
                <div>
                  <div className="font-bold text-gray-900 mb-1">Localization delays</div>
                  <div className="text-gray-800">Regional adaptation slowed expansion</div>
                </div>
              </div>
            </div>
            <p className="text-gray-700">
              Content creators needed a solution to free them from tedious formatting and let them focus on teaching
              quality.
            </p>
          </motion.div>
        </section>

        {/* User Research & Problem Definition Section */}
        <section id="process" className="mb-20">
          <div className="flex items-center mb-8">
            <CaseStudyHeader level="h2" showGradientLine>
              User Research & Problem Definition
            </CaseStudyHeader>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white p-8 rounded-xl shadow-md"
          >
            <p className="text-gray-800 mb-6">
              I ran in-depth research to understand pain points and workflows for all stakeholders.
            </p>

            <p className="text-gray-700 mb-8">
              We used interviews, on-site observation, workshops, and system analysis to find bottlenecks and define
              solution requirements.
            </p>

            <h3 className="text-gray-800 font-bold mb-6">Research Methods</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-blue-50 p-6 rounded-xl">
                <div className="flex items-center mb-4">
                  <div className="text-blue-600 mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <h4 className="font-bold text-gray-800">Stakeholder Interviews</h4>
                </div>
                <ul className="list-disc pl-5 text-gray-700 space-y-2">
                  <li>12 interviews across 3 groups</li>
                  <li>Mapped goals and workflow issues</li>
                  <li>Documented scheduling needs</li>
                </ul>
              </div>

              <div className="bg-purple-50 p-6 rounded-xl">
                <div className="flex items-center mb-4">
                  <div className="text-purple-600 mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </div>
                  <h4 className="font-bold text-gray-800">Process Shadowing</h4>
                </div>
                <ul className="list-disc pl-5 text-gray-700 space-y-2">
                  <li>5 days observing timetable creation</li>
                  <li>Mapped end-to-end workflow</li>
                  <li>Found process bottlenecks</li>
                </ul>
              </div>

              <div className="bg-pink-50 p-6 rounded-xl">
                <div className="flex items-center mb-4">
                  <div className="text-pink-600 mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                  <h4 className="font-bold text-gray-800">Collaborative Workshops</h4>
                </div>
                <ul className="list-disc pl-5 text-gray-700 space-y-2">
                  <li>Facilitated rule identification sessions</li>
                  <li>Created journey maps with teams</li>
                  <li>Prioritized requirements together</li>
                </ul>
              </div>

              <div className="bg-green-50 p-6 rounded-xl">
                <div className="flex items-center mb-4">
                  <div className="text-green-600 mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      />
                    </svg>
                  </div>
                  <h4 className="font-bold text-gray-800">System Analysis</h4>
                </div>
                <ul className="list-disc pl-5 text-gray-700 space-y-2">
                  <li>Audited legacy system</li>
                  <li>Reviewed docs and data flows</li>
                  <li>Found technical gaps</li>
                </ul>
              </div>
            </div>

            <h3 className="text-gray-800 font-bold mb-6">User Personas</h3>
            <p className="text-gray-700 mb-8">Through this research, I developed three key personas:</p>

            <div className="grid grid-cols-1 grid-flow-col auto-cols-fr gap-8 overflow-x-auto mb-12">
              <div className="rounded-xl overflow-hidden shadow-md border border-gray-200 min-w-[300px]">
                <div className="bg-blue-100 py-8 flex justify-center">
                  <div className="h-16 w-16 rounded-full bg-white flex items-center justify-center">
                    <span className="text-blue-500 font-bold text-xl">AD</span>
                  </div>
                </div>
                <div className="bg-white p-6">
                  <h4 className="text-xl font-bold mb-1 text-center">Academic Director</h4>
                  <p className="text-gray-600 mb-6 text-center">Anne, 38</p>

                  <h5 className="font-bold mb-2">Goals:</h5>
                  <p className="text-gray-700 mb-5">
                    Ensure curriculum quality, optimize instructional time, adapt schedules to program needs
                  </p>

                  <h5 className="font-bold mb-2">Pain Points:</h5>
                  <div className="bg-blue-50 p-4 rounded-md border-l-4 border-blue-200">
                    <p className="text-gray-700 italic">
                      "We spend more time creating timetables than we do reviewing their quality."
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl overflow-hidden shadow-md border border-gray-200 min-w-[300px]">
                <div className="bg-purple-100 py-8 flex justify-center">
                  <div className="h-16 w-16 rounded-full bg-white flex items-center justify-center">
                    <span className="text-purple-500 font-bold text-xl">DP</span>
                  </div>
                </div>
                <div className="bg-white p-6">
                  <h4 className="text-xl font-bold mb-1 text-center">Digital Production</h4>
                  <p className="text-gray-600 mb-6 text-center">Jake, 32</p>

                  <h5 className="font-bold mb-2">Goals:</h5>
                  <p className="text-gray-700 mb-5">Generate error-free timetables efficiently, minimize manual work</p>

                  <h5 className="font-bold mb-2">Pain Points:</h5>
                  <div className="bg-blue-50 p-4 rounded-md border-l-4 border-blue-200">
                    <p className="text-gray-700 italic">
                      "When teacher distribution changes, we have to recreate timetables from scratch."
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl overflow-hidden shadow-md border border-gray-200 min-w-[300px]">
                <div className="bg-pink-50 py-8 flex justify-center">
                  <div className="h-16 w-16 rounded-full bg-white flex items-center justify-center">
                    <span className="text-pink-500 font-bold text-xl">ST</span>
                  </div>
                </div>
                <div className="bg-white p-6">
                  <h4 className="text-xl font-bold mb-1 text-center">Schools Team</h4>
                  <p className="text-gray-600 mb-6 text-center">Laura, 42</p>

                  <h5 className="font-bold mb-2">Goals:</h5>
                  <p className="text-gray-700 mb-5">
                    Optimize teacher assignments, ensure appropriate specialist rotations
                  </p>

                  <h5 className="font-bold mb-2">Pain Points:</h5>
                  <div className="bg-blue-50 p-4 rounded-md border-l-4 border-blue-200">
                    <p className="text-gray-700 italic">"We need teachers teaching what they're qualified for."</p>
                  </div>
                </div>
              </div>
            </div>

            <h3 className="text-gray-800 font-bold mb-6">Key Pain Points Identified</h3>

            <div className="overflow-x-auto bg-gray-50 p-6 rounded-xl mb-12">
              <table className="w-full text-left border-collapse border border-gray-200">
                <thead>
                  <tr>
                    <th className="py-4 px-6 font-bold text-gray-800 border border-gray-200">PROCESS ISSUES</th>
                    <th className="py-4 px-6 font-bold text-gray-800 border border-gray-200">TECHNICAL LIMITATIONS</th>
                    <th className="py-4 px-6 font-bold text-gray-800 border border-gray-200">RESOURCE CONSTRAINTS</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-3 px-6 text-gray-700 border border-gray-200">Manual creation took 2-3 weeks</td>
                    <td className="py-3 px-6 text-gray-700 border border-gray-200">
                      System can't handle more than 12 tracks
                    </td>
                    <td className="py-3 px-6 text-gray-700 border border-gray-200">No book sharing—12% higher costs</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-6 text-gray-700 border border-gray-200">
                      Each specialist rotation set up separately
                    </td>
                    <td className="py-3 px-6 text-gray-700 border border-gray-200">No rule compliance check</td>
                    <td className="py-3 px-6 text-gray-700 border border-gray-200">Teacher use only 68% of optimal</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-6 text-gray-700 border border-gray-200">Any change restarts the process</td>
                    <td className="py-3 px-6 text-gray-700 border border-gray-200">23% of schedules have errors</td>
                    <td className="py-3 px-6 text-gray-700 border border-gray-200">
                      Specialist teachers double-booked
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-6 text-gray-700 border border-gray-200">86% of staff time on data entry</td>
                    <td className="py-3 px-6 text-gray-700 border border-gray-200">Teacher specialties ignored</td>
                    <td className="py-3 px-6 text-gray-700 border border-gray-200">Classroom limits not considered</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-gray-800 font-bold mb-6">Design Requirements</h3>
            <p className="text-gray-700 mb-8">
              Based on this research, I set clear requirements to guide the solution:
            </p>

            <div className="overflow-x-auto bg-gray-50 p-6 rounded-xl">
              <table className="w-full text-left border-collapse border border-gray-200">
                <thead>
                  <tr>
                    <th className="py-4 px-4 font-bold text-gray-800 border border-gray-200">REQUIREMENT CATEGORY</th>
                    <th className="py-4 px-4 font-bold text-gray-800 border border-gray-200">REQUIREMENT</th>
                    <th className="py-4 px-4 font-bold text-gray-800 border border-gray-200">DESCRIPTION</th>
                    <th className="py-4 px-4 font-bold text-gray-800 border border-gray-200">USER NEED ADDRESSED</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-3 px-4 text-gray-700 border border-gray-200">Plan Generation & Management</td>
                    <td className="py-3 px-4 font-medium text-gray-700 border border-gray-200">Auto Timetable</td>
                    <td className="py-3 px-4 text-gray-700 border border-gray-200">
                      Create conflict-free timetables from rules
                    </td>
                    <td className="py-3 px-4 text-gray-700 border border-gray-200">Manual process took 2-3 weeks</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-gray-700 border border-gray-200">Rule Violation Management</td>
                    <td className="py-3 px-4 font-medium text-gray-700 border border-gray-200">Violation Severity</td>
                    <td className="py-3 px-4 text-gray-700 border border-gray-200">Mark as Hard/Medium/Soft</td>
                    <td className="py-3 px-4 text-gray-700 border border-gray-200">23% errors when done manually</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-gray-700 border border-gray-200">View Flexibility</td>
                    <td className="py-3 px-4 font-medium text-gray-700 border border-gray-200">Multiple Views</td>
                    <td className="py-3 px-4 text-gray-700 border border-gray-200">Grade/stream and teacher views</td>
                    <td className="py-3 px-4 text-gray-700 border border-gray-200">Users need different views</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-gray-700 border border-gray-200">Resource Optimization</td>
                    <td className="py-3 px-4 font-medium text-gray-700 border border-gray-200">Book Sharing</td>
                    <td className="py-3 px-4 text-gray-700 border border-gray-200">
                      Allow textbook sharing between grades
                    </td>
                    <td className="py-3 px-4 text-gray-700 border border-gray-200">No sharing = 12% higher costs</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>
        </section>

        {/* Design Process Section */}
        <section id="design-process" className="mb-20">
          <div className="flex items-center mb-8">
            <CaseStudyHeader level="h2" showGradientLine>
              Design Process
            </CaseStudyHeader>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white p-8 rounded-xl shadow-md mb-12"
          >
            <h3 className="text-gray-800 font-bold text-xl mb-6">1. Information Architecture & Workflow Design</h3>

            <div className="bg-blue-50 p-6 rounded-xl mb-6">
              <p className="text-gray-800 mb-6">
                Clear structure and workflows were essential for scalable scheduling.
              </p>

              <InfoArchitectureDiagrams />

              <ul className="list-none space-y-6">
                <li>
                  <p>
                    <span className="text-blue-600 font-bold">Information architecture:</span> Defined how programs,
                    schools, grades, teachers, and subjects connect for easy data flow.
                  </p>
                </li>
                <li>
                  <p>
                    <span className="text-blue-600 font-bold">Workflow diagrams:</span> Mapped each user's steps from
                    setup to schedule delivery, clarifying roles and handoffs.
                  </p>
                </li>
                <li>
                  <p>
                    <span className="text-blue-600 font-bold">State diagrams:</span> Visualized every stage—draft,
                    optimizing, conflicts, review, approval, published—so everyone knew the process.
                  </p>
                </li>
              </ul>
            </div>

            <p className="text-gray-700 italic">
              This foundation made the system intuitive for both development and user training.
            </p>

            {/* User Journey Mapping */}
            <h3 className="text-gray-800 font-bold text-xl mb-6">2. User Journey Mapping</h3>

            <p className="text-gray-800 mb-6">
              Mapped real user steps, emotions, and pain points to guide design decisions.
            </p>

            <UserJourneyMapInteractive />

            <div className="grid grid-cols-1 gap-8 mb-10">
              {/* Pain Points Card */}
              <div className="bg-red-50 p-6 rounded-xl">
                <h4 className="font-bold mb-4 text-gray-800">Pain Points</h4>
                <ul className="space-y-4">
                  <li>
                    <div className="border-l-4 border-red-500 pl-3">
                      <p className="text-gray-800 font-medium">Limited visibility</p>
                      <p className="text-gray-700">into which schools have unique constraints</p>
                    </div>
                  </li>
                  <li>
                    <div className="border-l-4 border-red-500 pl-3">
                      <p className="text-gray-800 font-medium">Long waiting times</p>
                      <p className="text-gray-700">for plan generation with no progress indicator</p>
                    </div>
                  </li>
                  <li>
                    <div className="border-l-4 border-red-500 pl-3">
                      <p className="text-gray-800 font-medium">Overwhelming error messages</p>
                      <p className="text-gray-700">with no clear resolution path</p>
                    </div>
                  </li>
                  <li>
                    <div className="border-l-4 border-red-500 pl-3">
                      <p className="text-gray-800 font-medium">Tedious manual adjustments</p>
                      <p className="text-gray-700">requiring repetitive actions</p>
                    </div>
                  </li>
                </ul>
              </div>
              {/* Design Opportunities Card */}
              <div className="bg-green-50 p-6 rounded-xl">
                <h4 className="font-bold mb-4 text-gray-800">Design Opportunities</h4>
                <ul className="space-y-4">
                  <li>
                    <div className="border-l-4 border-green-500 pl-3">
                      <p className="text-gray-800 font-medium">Create visual constraint indicators</p>
                      <p className="text-gray-700">for quick school assessment</p>
                    </div>
                  </li>
                  <li>
                    <div className="border-l-4 border-green-500 pl-3">
                      <p className="text-gray-800 font-medium">Implement real-time progress updates</p>
                      <p className="text-gray-700">with estimated completion times</p>
                    </div>
                  </li>
                  <li>
                    <div className="border-l-4 border-green-500 pl-3">
                      <p className="text-gray-800 font-medium">Design guided resolution workflows</p>
                      <p className="text-gray-700">for each violation type</p>
                    </div>
                  </li>
                  <li>
                    <div className="border-l-4 border-green-500 pl-3">
                      <p className="text-gray-800 font-medium">Create bulk editing capabilities</p>
                      <p className="text-gray-700">for common adjustment patterns</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <p className="text-gray-700 mb-8">
              These insights shaped targeted improvements across the user experience.
            </p>
          </motion.div>

          {/* UI Design and Visualization */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h3 className="text-gray-800 font-bold text-xl mb-6">3. UI Design and Visualization</h3>

            <p className="text-gray-700 mb-8">
              I designed intuitive interfaces focused on making complex scheduling data accessible and actionable:
            </p>

            <div className="grid grid-cols-1 gap-8 mb-10">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="p-0"
              >
                <h4 className="font-bold mb-4 text-gray-900 flex items-center">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 text-white mr-3 text-sm">
                    1
                  </span>
                  School Selection Interface
                </h4>

                <div className="flex space-x-3 mb-4">
                  <span className="inline-block px-3 py-1 text-sm font-medium bg-green-100 text-green-800 rounded-full">
                    Published
                  </span>
                  <span className="inline-block px-3 py-1 text-sm font-medium bg-yellow-100 text-yellow-800 rounded-full">
                    In Review
                  </span>
                  <span className="inline-block px-3 py-1 text-sm font-medium bg-gray-100 text-gray-800 rounded-full">
                    Draft
                  </span>
                </div>

                <div className="bg-white rounded-lg p-3 shadow-sm mb-4">
                  <div className="flex justify-between items-center mb-2 pb-2 border-b border-gray-100">
                    <span className="font-medium text-gray-900">Apex Primary School</span>
                    <span className="inline-block px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded">
                      Published
                    </span>
                  </div>
                  <div className="flex justify-between items-center mb-2 pb-2 border-b border-gray-100">
                    <span className="font-medium text-gray-900">Bridgeview Academy</span>
                    <span className="inline-block px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded">
                      In Review
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-900">Cedar Heights School</span>
                    <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded">
                      Draft
                    </span>
                  </div>
                </div>

                <ul className="list-none text-gray-700 space-y-2 mb-2">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">✓</span>
                    <span>Clean, filterable list view of schools</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">✓</span>
                    <span>Status indicators showing plan generation state</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">✓</span>
                    <span>Batch selection capabilities for managing multiple schools</span>
                  </li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="p-0"
              >
                <h4 className="font-bold mb-4 text-gray-900 flex items-center">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-500 text-white mr-3 text-sm">
                    2
                  </span>
                  Plan Generation Flow
                </h4>

                <p className="text-sm font-medium text-gray-700 mb-2">Generation Progress</p>
                <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '70%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="bg-blue-600 h-4 rounded-full"
                  ></motion.div>
                </div>
                <p className="text-xs text-gray-600 mb-4">
                  Processing constraints<span className="float-right">70%</span>
                </p>

                <div className="bg-white rounded-lg p-6 shadow-sm mb-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="inline-block h-3 w-3 bg-red-500 rounded-full mr-2"></span>
                        <span className="text-sm text-gray-700">Hard Violations</span>
                      </div>
                      <span className="font-medium text-red-600">2</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="inline-block h-3 w-3 bg-yellow-500 rounded-full mr-2"></span>
                        <span className="text-sm text-gray-700">Soft Violations</span>
                      </div>
                      <span className="font-medium text-yellow-600">3</span>
                    </div>
                  </div>
                </div>

                <ul className="list-none text-gray-700 space-y-2 mb-2">
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2">✓</span>
                    <span>Simple, focused generation interface with clear status communication</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2">✓</span>
                    <span>Intelligent prioritization of rule violations needing attention</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2">✓</span>
                    <span>Comparison view for evaluating multiple generated plans</span>
                  </li>
                </ul>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 gap-8 mb-10">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="p-0"
              >
                <h4 className="font-bold mb-4 text-gray-900 flex items-center">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-green-500 text-white mr-3 text-sm">
                    3
                  </span>
                  Timetable Visualization
                </h4>

                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-semibold text-gray-700 bg-gray-100 px-2 py-1 rounded">
                    Grade 6 - Stream B
                  </span>
                  <div>
                    <span className="inline-block px-2 py-1 text-xs font-medium bg-green-600 text-white rounded-l">
                      Grade View
                    </span>
                    <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-200 text-gray-600 rounded-r">
                      Teacher View
                    </span>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-6 shadow-sm mb-4">
                  <div className="grid grid-cols-5 gap-1 text-xs mb-2">
                    <div className="bg-blue-100 p-2 text-center rounded text-blue-800 font-medium">Math</div>
                    <div className="bg-purple-100 p-2 text-center rounded text-purple-800 font-medium">Arts</div>
                    <div className="bg-purple-100 p-2 text-center rounded text-purple-800 font-medium">Arts</div>
                    <div className="bg-yellow-100 p-2 text-center rounded text-yellow-800 font-medium">History</div>
                    <div className="bg-green-100 p-2 text-center rounded text-green-800 font-medium">Science</div>
                    <div className="bg-pink-100 p-2 text-center rounded text-pink-800 font-medium">English</div>
                    <div className="bg-yellow-100 p-2 text-center rounded text-yellow-800 font-medium">History</div>
                    <div className="bg-blue-100 p-2 text-center rounded text-blue-800 font-medium">Math</div>
                    <div className="bg-green-100 p-2 text-center rounded text-green-800 font-medium">Science</div>
                    <div className="bg-yellow-100 p-2 text-center rounded text-yellow-800 font-medium">History</div>
                  </div>
                  <div className="text-xs text-center text-gray-500">Monday - Friday schedule</div>
                </div>

                <ul className="list-none text-gray-700 space-y-2 mb-2">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Color-coded calendar view for intuitive schedule reading</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Toggle between grade/stream and teacher views</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Visual highlighting of rule violations by severity</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Detailed sidebar for activity information</span>
                  </li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-gradient-to-br from-red-50 to-gray-50 rounded-xl p-6 shadow-sm border border-red-100"
              >
                <h4 className="font-bold mb-4 text-gray-900 flex items-center">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-red-500 text-white mr-3 text-sm">
                    4
                  </span>
                  Rule Violation Management
                </h4>

                <p className="text-sm font-medium text-gray-700 mb-2">Violation Summary</p>
                <div className="flex space-x-2 mb-4">
                  <span className="inline-block px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
                    Hard (2)
                  </span>
                  <span className="inline-block px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                    Medium (4)
                  </span>
                  <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                    Soft (7)
                  </span>
                </div>

                <div className="bg-white rounded-lg p-3 shadow-sm mb-4">
                  <div className="border-l-4 border-red-500 pl-3 py-2">
                    <h5 className="text-sm font-medium text-gray-900 mb-1">Teacher Double Booking</h5>
                    <p className="text-sm text-gray-700 mb-2">
                      Ms. Adesina is scheduled for two classes at the same time
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-600">Grade 6, Monday, 9:00</span>
                      <button className="px-2 py-1 bg-blue-600 text-white text-xs rounded shadow-sm hover:bg-blue-700 transition-colors">
                        Fix Now
                      </button>
                    </div>
                  </div>
                </div>

                <ul className="list-none text-gray-700 space-y-2 mb-2">
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">✓</span>
                    <span>Comprehensive summary of all rule violations</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">✓</span>
                    <span>Categorization by severity and type</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">✓</span>
                    <span>Direct navigation to problematic schedule areas</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">✓</span>
                    <span>Clear explanation of violation impact and resolution options</span>
                  </li>
                </ul>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-100"
            >
              <p className="text-gray-700">
                These interface designs were informed by extensive user testing and iterated based on feedback. The
                focus was on creating visual clarity for complex data, providing intuitive navigation between related
                elements, and ensuring that users always had clear paths to resolve issues.
              </p>
            </motion.div>
          </motion.div>

          {/* Wireframing & Prototyping */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-xl shadow-md p-8 mb-12"
          >
            <h3 className="text-gray-800 font-bold text-xl mb-6">5. Wireframing & Prototyping</h3>

            <p className="text-gray-700 mb-8">
              After establishing the user requirements and journey maps, I followed a structured design process to
              translate conceptual ideas into tangible interfaces that would effectively solve the scheduling
              challenges:
            </p>

            {/* Design Process Steps */}
            <div className="relative mb-16">
              {/* Removed vertical blue line */}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="relative z-10 mb-12"
              >
                <div>
                  {/* Removed numbered circle */}
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-3">Low-Fidelity Sketches</h4>
                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 mb-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="bg-white p-4 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center">
                          <div className="h-4 w-24 bg-gray-300 rounded mb-3"></div>
                          <div className="h-3 w-16 bg-gray-200 rounded mb-2"></div>
                          <div className="grid grid-cols-5 gap-1 w-full">
                            <div className="h-3 bg-gray-200 rounded"></div>
                            <div className="h-3 bg-gray-200 rounded"></div>
                            <div className="h-3 bg-gray-200 rounded"></div>
                            <div className="h-3 bg-gray-200 rounded"></div>
                            <div className="h-3 bg-gray-200 rounded"></div>
                          </div>
                          <p className="text-xs text-gray-500 mt-2">School Selection</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center">
                          <div className="h-4 w-20 bg-gray-300 rounded mb-3"></div>
                          <div className="h-2 w-full bg-gray-200 rounded mb-2"></div>
                          <div className="grid grid-cols-3 gap-1 w-full mb-2">
                            <div className="h-6 bg-gray-200 rounded"></div>
                            <div className="h-6 bg-gray-200 rounded"></div>
                            <div className="h-6 bg-gray-200 rounded"></div>
                          </div>
                          <p className="text-xs text-gray-500 mt-2">Plan Generation</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center">
                          <div className="h-4 w-28 bg-gray-300 rounded mb-3"></div>
                          <div className="grid grid-cols-5 gap-1 w-full mb-2">
                            <div className="h-4 bg-gray-200 rounded"></div>
                            <div className="h-4 bg-gray-200 rounded"></div>
                            <div className="h-4 bg-gray-200 rounded"></div>
                            <div className="h-4 bg-gray-200 rounded"></div>
                            <div className="h-4 bg-gray-200 rounded"></div>
                          </div>
                          <p className="text-xs text-gray-500 mt-2">Timetable View</p>
                        </div>
                      </div>
                      <p className="text-gray-700 text-sm">
                        Initial paper sketches focused on core functionality and primary user flows. These quick,
                        low-commitment drawings allowed rapid exploration of multiple approaches before investing in
                        digital wireframes.
                      </p>
                    </div>
                    <div className="text-gray-700">
                      <p className="mb-2">
                        <span className="font-medium">Key Activities:</span>
                      </p>
                      <ul className="list-none space-y-1 mb-4">
                        <li className="flex items-start">
                          <span className="text-blue-500 mr-2">✓</span>
                          <span>Collaborative sketching sessions with stakeholders</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-500 mr-2">✓</span>
                          <span>Mapping critical user journeys to interface elements</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-500 mr-2">✓</span>
                          <span>Establishing information hierarchy and core navigation</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative z-10 mb-12"
              >
                <div>
                  {/* Removed numbered circle */}
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-3">Mid-Fidelity Wireframes</h4>

                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 mb-4">
                      <div className="grid grid-cols-1 gap-8 mb-4">
                        <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                          <h5 className="font-medium text-gray-900 mb-3 flex items-center">
                            <span className="inline-block w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                            Schools List View
                          </h5>
                          <div className="border-b border-gray-200 pb-2 mb-2 flex justify-between items-center">
                            <span className="text-xs font-medium">School Name</span>
                            <span className="text-xs font-medium">Status</span>
                          </div>

                          <div className="space-y-2 mb-3">
                            <div className="flex justify-between items-center py-1 border-b border-gray-100">
                              <span className="text-xs">Amagor School</span>
                              <span className="inline-block px-2 py-0.5 text-xs bg-gray-100 rounded-full">No Plan</span>
                            </div>
                            <div className="flex justify-between items-center py-1 border-b border-gray-100">
                              <span className="text-xs">Baki School</span>
                              <span className="inline-block px-2 py-0.5 text-xs bg-gray-100 rounded-full">No Plan</span>
                            </div>
                            <div className="flex justify-between items-center py-1 border-b border-gray-100">
                              <span className="text-xs">Ivbore School</span>
                              <span className="inline-block px-2 py-0.5 text-xs bg-gray-100 rounded-full">No Plan</span>
                            </div>
                          </div>

                          <div className="flex justify-between items-center text-xs text-gray-500">
                            <span>Page 1 of 32</span>
                            <div className="flex space-x-1">
                              <span className="inline-block px-1.5 py-0.5 bg-gray-100 rounded">←</span>
                              <span className="inline-block px-1.5 py-0.5 bg-gray-100 rounded">→</span>
                            </div>
                          </div>
                        </div>

                        <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                          <h5 className="font-medium text-gray-900 mb-3 flex items-center">
                            <span className="inline-block w-3 h-3 bg-purple-500 rounded-full mr-2"></span>
                            Plan Generation Modal
                          </h5>

                          <div className="flex justify-center mb-2">
                            <div className="inline-block p-2 rounded-lg bg-blue-50">
                              <div className="w-6 h-6 bg-blue-500 rounded"></div>
                            </div>
                          </div>

                          <div className="text-center mb-3">
                            <p className="text-sm font-medium text-gray-800 mb-1">Generating plan...</p>
                            <p className="text-xs text-gray-600">This might take a few minutes</p>
                          </div>

                          <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                            <div className="bg-blue-500 h-2 rounded-full w-2/3"></div>
                          </div>
                          <p className="text-xs text-gray-500 mb-2">Processing constraints</p>

                          <div className="space-y-1 mb-2">
                            <div className="flex items-center">
                              <span className="inline-block w-2 h-2 bg-red-500 rounded-full mr-1"></span>
                              <span className="text-xs text-gray-700">Hard Violations (2)</span>
                            </div>
                            <div className="flex items-center">
                              <span className="inline-block w-2 h-2 bg-yellow-500 rounded-full mr-1"></span>
                              <span className="text-xs text-gray-700">Soft Violations (3)</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                        <h5 className="font-medium text-gray-900 mb-3 flex items-center">
                          <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                          Rule Violation Management
                        </h5>

                        <div className="mb-3">
                          <div className="text-xs font-medium mb-2">Violation Types</div>
                          <div className="flex space-x-2 mb-2">
                            <span className="inline-block px-2 py-0.5 text-xs bg-red-100 text-red-800 rounded">
                              Hard (2)
                            </span>
                            <span className="inline-block px-2 py-0.5 text-xs bg-yellow-100 text-yellow-800 rounded">
                              Medium (4)
                            </span>
                            <span className="inline-block px-2 py-0.5 text-xs bg-gray-100 text-gray-800 rounded">
                              Soft (7)
                            </span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="border border-gray-200 rounded p-2">
                            <div className="flex items-start">
                              <span className="inline-block w-2 h-2 bg-red-500 rounded-full mt-1 mr-2"></span>
                              <div>
                                <p className="text-xs font-medium text-gray-900">Teacher Double Booking</p>
                                <p className="text-xs text-gray-700">
                                  Ms. Adesina is scheduled for two classes at the same time
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="border border-gray-200 rounded p-2">
                            <div className="flex items-start">
                              <span className="inline-block w-2 h-2 bg-yellow-500 rounded-full mt-1 mr-2"></span>
                              <div>
                                <p className="text-xs font-medium text-gray-900">Gaps in Schedule</p>
                                <p className="text-xs text-gray-700">
                                  A stream prefers sequential activities without gaps
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <p className="text-gray-700 text-sm mt-4">
                        Mid-fidelity wireframes introduced more detailed UI elements and specific layout choices. At
                        this stage, I focused on functionality rather than visual design, ensuring that key user needs
                        were addressed through intuitive interfaces.
                      </p>
                    </div>

                    <div className="text-gray-700">
                      <p className="mb-2">
                        <span className="font-medium">Key Activities:</span>
                      </p>
                      <ul className="list-none space-y-1 mb-4">
                        <li className="flex items-start">
                          <span className="text-purple-500 mr-2">✓</span>
                          <span>Defining interaction patterns and navigation flows</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-purple-500 mr-2">✓</span>
                          <span>Structuring layouts for optimal information consumption</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-purple-500 mr-2">✓</span>
                          <span>Designing state transitions and error handling approaches</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="relative z-10 mb-12"
              >
                <div>
                  {/* Removed numbered circle */}
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-3">High-Fidelity Prototypes</h4>

                    <div className="bg-gray-50 p-4 md:p-6 rounded-xl border border-gray-200 mb-4">
                      <div className="grid grid-cols-1 gap-4 md:gap-6 mb-4">
                        <div className="bg-white p-4 md:p-5 rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                          <h5 className="font-medium text-gray-900 mb-3">Weekly Timetable View</h5>

                          <div className="border border-gray-100 rounded overflow-hidden">
                            <div className="grid grid-cols-5 text-center">
                              <div className="bg-gray-50 py-1 text-xs font-medium text-gray-600 border-r border-gray-100">
                                MON
                              </div>
                              <div className="bg-gray-50 py-1 text-xs font-medium text-gray-600 border-r border-gray-100">
                                TUE
                              </div>
                              <div className="bg-gray-50 py-1 text-xs font-medium text-gray-600 border-r border-gray-100">
                                WED
                              </div>
                              <div className="bg-gray-50 py-1 text-xs font-medium text-gray-600 border-r border-gray-100">
                                THU
                              </div>
                              <div className="bg-gray-50 py-1 text-xs font-medium text-gray-600">FRI</div>
                            </div>

                            <div className="grid grid-cols-5 gap-1 p-1">
                              <div className="bg-blue-100 p-1 rounded text-xs text-blue-800 text-center">Math</div>
                              <div className="bg-purple-100 p-1 rounded text-xs text-purple-800 text-center">Arts</div>
                              <div className="bg-green-100 p-1 rounded text-xs text-green-800 text-center">English</div>
                              <div className="bg-yellow-100 p-1 rounded text-xs text-yellow-800 text-center">
                                Science
                              </div>
                              <div className="bg-pink-100 p-1 rounded text-xs text-pink-800 text-center">History</div>

                              <div className="bg-green-100 p-1 rounded text-xs text-green-800 text-center relative">
                                <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                                  <span className="text-white text-[8px]">!</span>
                                </div>
                                English
                              </div>
                              <div className="bg-yellow-100 p-1 rounded text-xs text-yellow-800 text-center">
                                Science
                              </div>
                              <div className="bg-blue-100 p-1 rounded text-xs text-blue-800 text-center">Math</div>
                              <div className="bg-purple-100 p-1 rounded text-xs text-purple-800 text-center">Arts</div>
                              <div className="bg-green-100 p-1 rounded text-xs text-green-800 text-center">English</div>
                            </div>
                          </div>

                          <div className="mt-3">
                            <div className="mb-2">
                              <span className="text-xs font-medium text-gray-700">View Controls:</span>
                            </div>
                            <div className="flex space-x-2">
                              <span className="inline-block px-2 py-1 text-xs bg-blue-600 text-white rounded">
                                Grade View
                              </span>
                              <span className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                                Teacher View
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="bg-white p-4 md:p-5 rounded-lg border border-gray-200 shadow-sm">
                          <h5 className="font-medium text-gray-900 mb-3">Completion Confirmation</h5>

                          <div className="mb-4 flex justify-center">
                            <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                              <span className="text-green-600 text-xl">✓</span>
                            </div>
                          </div>

                          <div className="text-center mb-4">
                            <p className="text-base font-medium text-gray-900 mb-1">Instructional plan is generated!</p>
                            <p className="text-xs text-gray-600">
                              The plan has been created with 3 rule violations that need attention
                            </p>
                          </div>

                          <div className="flex justify-center space-x-3">
                            <button className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded shadow-sm">
                              View Summary
                            </button>
                            <button className="px-3 py-1.5 bg-white text-gray-700 text-sm rounded border border-gray-300">
                              Go back to list
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white p-4 md:p-5 rounded-lg border border-gray-200 shadow-sm">
                        <h5 className="font-medium text-gray-900 mb-3">Conflict Resolution Interface</h5>

                        <div className="border-b border-gray-200 pb-3 mb-3">
                          <div className="flex items-center mb-2">
                            <span className="inline-block px-2 py-0.5 text-xs bg-red-100 text-red-800 rounded-full mr-2">
                              Teacher Conflict
                            </span>
                            <span className="text-sm font-medium text-gray-900">Resolution Options</span>
                          </div>

                          <p className="text-xs text-gray-700 mb-2">
                            Teacher is teaching Social Studies and English at the same time for P3A on Tuesday at 10:25
                            to 11:00 AM
                          </p>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <div className="bg-blue-50 p-2 rounded border border-blue-100">
                              <p className="text-xs font-medium text-gray-900 mb-1">Option 1</p>
                              <p className="text-xs text-gray-700">Reschedule Social Studies to Wednesday</p>
                            </div>
                            <div className="bg-blue-50 p-2 rounded border border-blue-100">
                              <p className="text-xs font-medium text-gray-900 mb-1">Option 2</p>
                              <p className="text-xs text-gray-700">Assign a different teacher to English</p>
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-end space-x-2">
                          <button className="px-2 py-1 bg-white text-gray-700 text-xs rounded border border-gray-300">
                            Skip for now
                          </button>
                          <button className="px-2 py-1 bg-blue-600 text-white text-xs rounded shadow-sm">
                            Apply Option 1
                          </button>
                        </div>
                      </div>

                      {/* Add separation line after the first 3 cards */}
                      <hr className="my-6 border-t border-gray-200" />

                      {/* School Timetable View - Full Screen Section */}
                      <div className="bg-white p-4 md:p-5 rounded-lg border border-gray-200 shadow-sm">
                        <h5 className="font-medium text-gray-900 mb-3 flex items-center">
                          <span className="inline-block w-3 h-3 bg-indigo-500 rounded-full mr-2"></span>
                          School Timetable View
                        </h5>

                        <div className="bg-white border border-gray-200 rounded-md overflow-hidden">
                          <div className="p-3 border-b border-gray-200">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center">
                                <span className="text-gray-400 mr-1">←</span>
                                <span className="text-sm font-medium">Amagor School</span>
                              </div>
                              <span className="bg-gray-100 px-2 py-0.5 text-xs rounded">DRAFT</span>
                            </div>

                            <div className="flex border-b border-gray-200 mb-2">
                              <button className="px-3 py-1 text-xs font-medium text-gray-500">Summary</button>
                              <button className="px-3 py-1 text-xs font-medium text-gray-800 border-b-2 border-gray-800">
                                Plan
                              </button>
                            </div>

                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
                              <div className="flex flex-wrap items-center gap-2 text-xs">
                                <span>View by</span>
                                <span className="border border-gray-200 rounded px-2 py-0.5">Grade and Stream ▼</span>
                                <span className="border border-gray-200 rounded px-2 py-0.5">Primary 3 ▼</span>
                                <span className="border border-gray-200 rounded px-2 py-0.5">A ▼</span>
                              </div>
                              <button className="bg-blue-600 text-white text-xs px-2 py-1 rounded">Publish</button>
                            </div>
                          </div>

                          <div className="border-b border-gray-200 overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                              <thead className="bg-gray-50">
                                <tr>
                                  <th
                                    scope="col"
                                    className="p-2 text-left text-xs font-medium text-gray-500 tracking-wider"
                                  ></th>
                                  <th
                                    scope="col"
                                    className="p-2 text-center text-xs font-medium text-gray-500 tracking-wider"
                                  >
                                    MON
                                  </th>
                                  <th
                                    scope="col"
                                    className="p-2 text-center text-xs font-medium text-gray-500 tracking-wider"
                                  >
                                    TUE
                                  </th>
                                  <th
                                    scope="col"
                                    className="p-2 text-center text-xs font-medium text-gray-500 tracking-wider"
                                  >
                                    WED
                                  </th>
                                  <th
                                    scope="col"
                                    className="p-2 text-center text-xs font-medium text-gray-500 tracking-wider"
                                  >
                                    THU
                                  </th>
                                  <th
                                    scope="col"
                                    className="p-2 text-center text-xs font-medium text-gray-500 tracking-wider"
                                  >
                                    FRI
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td className="p-2 text-xs font-medium text-gray-500">10 AM</td>
                                  <td className="p-1">
                                    <div className="bg-gray-100 mb-1 p-1 text-center text-[9px] rounded">
                                      Long Break
                                    </div>
                                    <div className="bg-green-100 p-1 text-center text-[9px] rounded">
                                      English Studies
                                    </div>
                                  </td>
                                  <td className="p-1">
                                    <div className="bg-gray-100 mb-1 p-1 text-center text-[9px] rounded">
                                      Long Break
                                    </div>
                                    <div className="flex space-x-1">
                                      <div className="bg-blue-100 p-1 w-1/2 text-center text-[9px] rounded relative">
                                        Social Studies
                                        <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center text-white text-[7px]">
                                          !
                                        </span>
                                      </div>
                                      <div className="bg-green-100 p-1 w-1/2 text-center text-[9px] rounded relative">
                                        English
                                        <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center text-white text-[7px]">
                                          !
                                        </span>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="p-1">
                                    <div className="bg-gray-100 mb-1 p-1 text-center text-[9px] rounded">
                                      Long Break
                                    </div>
                                    <div className="bg-amber-100 p-1 text-center text-[9px] rounded">Mathematics</div>
                                  </td>
                                  <td className="p-1">
                                    <div className="bg-gray-100 mb-1 p-1 text-center text-[9px] rounded">
                                      Long Break
                                    </div>
                                    <div className="bg-red-100 p-1 text-center text-[9px] rounded relative">
                                      Gaps in schedule
                                      <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                                    </div>
                                  </td>
                                  <td className="p-1">
                                    <div className="bg-gray-100 mb-1 p-1 text-center text-[9px] rounded">
                                      Long Break
                                    </div>
                                    <div className="bg-green-100 p-1 text-center text-[9px] rounded">
                                      English Studies
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>

                          <div className="p-3 bg-red-50 border-t border-red-100">
                            <p className="text-xs font-medium text-red-800 mb-1">Teacher Conflict</p>
                            <p className="text-xs text-gray-700">
                              A teacher is teaching Social Studies and English at the same time for P3A on Tuesday at
                              10:25 to 11:00 AM
                            </p>
                          </div>
                        </div>

                        <div className="mt-2 text-xs text-gray-700">
                          <p className="font-medium mt-1">Key Features:</p>
                          <ul className="mt-1 space-y-1">
                            <li className="flex items-start">
                              <span className="text-green-500 mr-1">✓</span>
                              <span>Color-coded subjects with visual conflict indicators</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-green-500 mr-1">✓</span>
                              <span>Grade/stream filtering for focused timetable views</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-green-500 mr-1">✓</span>
                              <span>Clear error explanations with interactive resolution</span>
                            </li>
                          </ul>
                        </div>
                      </div>

                      {/* School Selection Interface - New Component */}
                      <div className="bg-white p-4 md:p-5 rounded-lg border border-gray-200 shadow-sm mt-4">
                        <h5 className="font-medium text-gray-900 mb-3">School Selection Interface</h5>

                        <div className="border border-gray-200 rounded overflow-hidden">
                          {/* Header */}
                          <div className="bg-blue-600 text-white px-4 py-2 flex justify-between items-center">
                            <div className="flex items-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 mr-1.5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                />
                              </svg>
                              <span className="text-sm font-medium">Schools</span>
                            </div>
                            <button className="bg-blue-700 rounded px-2 py-1 text-xs">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-3 w-3"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                />
                              </svg>
                            </button>
                          </div>

                          {/* Schools List */}
                          <div className="divide-y divide-gray-200">
                            {/* Selected School */}
                            <div className="bg-blue-50 p-3 flex justify-between items-center">
                              <div className="flex items-center">
                                <input
                                  type="checkbox"
                                  className="h-3 w-3 rounded border-gray-300 text-blue-600 mr-2"
                                  defaultChecked
                                />
                                <div>
                                  <div className="text-sm font-medium text-blue-600">Amagor Primary School</div>
                                  <div className="text-xs text-gray-500">Primary • P1-P6</div>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <span className="px-2 py-0.5 text-xs bg-yellow-100 text-yellow-800 rounded-full">
                                  In Progress
                                </span>
                                <button className="text-xs text-blue-600">View</button>
                              </div>
                            </div>

                            <div className="p-3 flex justify-between items-center hover:bg-gray-50">
                              <div className="flex items-center">
                                <input
                                  type="checkbox"
                                  className="h-3 w-3 rounded border-gray-300 text-blue-600 mr-2"
                                  defaultChecked
                                />
                                <div>
                                  <div className="text-sm font-medium text-gray-900">Baki Primary School</div>
                                  <div className="text-xs text-gray-500">Primary • P1-P8</div>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <span className="px-2 py-0.5 text-xs bg-gray-100 text-gray-800 rounded-full">
                                  No Plan
                                </span>
                                <button className="text-xs text-blue-600">Generate</button>
                              </div>
                            </div>

                            <div className="p-3 flex justify-between items-center hover:bg-gray-50">
                              <div className="flex items-center">
                                <input
                                  type="checkbox"
                                  className="h-3 w-3 rounded border-gray-300 text-blue-600 mr-2"
                                  defaultChecked
                                />
                                <div>
                                  <div className="text-sm font-medium text-gray-900">Ivbore Primary School</div>
                                  <div className="text-xs text-gray-500">Primary • P1-P6</div>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <span className="px-2 py-0.5 text-xs bg-green-100 text-green-800 rounded-full">
                                  Published
                                </span>
                                <button className="text-xs text-blue-600">View</button>
                              </div>
                            </div>
                          </div>

                          {/* Pagination */}
                          <div className="bg-gray-50 px-3 py-2 flex justify-between text-xs text-gray-600">
                            <span>Showing 3 of 32 schools</span>
                            <div className="flex space-x-1">
                              <button className="px-1.5 py-0.5 bg-white border border-gray-300 rounded">Prev</button>
                              <button className="px-1.5 py-0.5 bg-white border border-gray-300 rounded">Next</button>
                            </div>
                          </div>
                        </div>

                        <div className="mt-2 text-xs text-gray-700">
                          <p className="font-medium mt-2">Design Features:</p>
                          <ul className="mt-1 space-y-1">
                            <li className="flex items-center">
                              <span className="text-green-500 mr-1">✓</span>
                              Row highlighting with color feedback for selected items
                            </li>
                            <li className="flex items-center">
                              <span className="text-green-500 mr-1">✓</span>
                              Status badges with color coding for plan progress
                            </li>
                            <li className="flex items-center">
                              <span className="text-green-500 mr-1">✓</span>
                              Compact layout for efficient school management
                            </li>
                          </ul>
                        </div>
                      </div>

                      <p className="text-gray-700 text-sm mt-4">
                        High-fidelity prototypes included visual design elements, realistic data, and interactive
                        components. These prototypes were built in Figma with interactive elements to simulate the
                        actual user experience and test complex interactions.
                      </p>

                      {/* School Plan Generated View */}
                      <div className="bg-white p-4 md:p-5 rounded-lg border border-gray-200 shadow-sm mt-4 mb-4">
                        <h5 className="font-medium text-gray-900 mb-3">School Plan Summary View</h5>

                        <div className="flex flex-col md:flex-row min-h-[300px] border border-gray-200 rounded overflow-hidden">
                          {/* Left Sidebar */}
                          <div className="w-full md:w-[150px] bg-white border-b md:border-b-0 md:border-r border-gray-200 p-3 flex flex-row md:flex-col justify-between md:justify-start items-center md:items-start space-x-4 md:space-x-0 md:space-y-4">
                            <div className="flex items-center">
                              <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs font-bold mr-1.5">
                                KL
                              </div>
                              <div className="text-xs font-bold text-gray-800">KWARA LEARN</div>
                            </div>

                            <div className="flex md:flex-col space-x-3 md:space-x-0 md:space-y-1">
                              <div className="px-2 py-1 flex items-center text-xs text-gray-600">
                                <span className="mr-1.5">⌂</span>
                                <span>Home</span>
                              </div>
                              <div className="px-2 py-1 flex items-center text-xs text-gray-600">
                                <span className="mr-1.5">▦</span>
                                <span>Apps</span>
                              </div>
                              <div className="px-2 py-1 bg-blue-50 rounded flex items-center text-xs text-blue-600">
                                <span className="mr-1.5">📋</span>
                                <span>Instructional Planner</span>
                              </div>
                            </div>
                          </div>

                          {/* Main Content */}
                          <div className="flex-1 p-3">
                            {/* Header */}
                            <div className="mb-4 flex items-center">
                              <span className="text-gray-400 mr-1">←</span>
                              <span className="text-sm font-medium">Amagor School</span>
                            </div>

                            {/* Tabs */}
                            <div className="mb-4 flex border-b border-gray-200">
                              <button className="px-3 py-1 text-xs font-medium text-gray-800 border-b-2 border-gray-800">
                                Summary
                              </button>
                              <button className="px-3 py-1 text-xs font-medium text-gray-500">Plan</button>
                            </div>

                            {/* Plan Summary */}
                            <div className="mb-4">
                              <h3 className="text-xs font-medium mb-2">Plan Summary</h3>
                              <div className="space-y-1">
                                <div className="grid grid-cols-2 p-2 bg-gray-50 text-xs border border-gray-100 rounded-sm">
                                  <div>Teaching Model</div>
                                  <div>Primary</div>
                                </div>
                                <div className="grid grid-cols-2 p-2 bg-gray-50 text-xs border border-gray-100 rounded-sm">
                                  <div>Multigrade classrooms</div>
                                  <div>N/A</div>
                                </div>
                                <div className="grid grid-cols-2 p-2 bg-gray-50 text-xs border border-gray-100 rounded-sm">
                                  <div>Grades offered</div>
                                  <div>P1-P6</div>
                                </div>
                              </div>
                            </div>

                            {/* Rules Summary */}
                            <div>
                              <h3 className="text-xs font-medium mb-2">Rules Summary</h3>
                              <div className="overflow-x-auto">
                                <table className="w-full border text-xs">
                                  <thead className="bg-gray-50">
                                    <tr>
                                      <th className="p-2 text-left">Rule Broken</th>
                                      <th className="p-2 text-left">Reason</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr className="border-t">
                                      <td className="p-2">
                                        <span className="inline-block px-2 py-0.5 bg-red-100 text-red-800 rounded text-xs">
                                          Teacher Conflict
                                        </span>
                                      </td>
                                      <td className="p-2 text-xs">
                                        A teacher was assigned to teach two subjects at the same time.
                                      </td>
                                    </tr>
                                    <tr className="border-t">
                                      <td className="p-2">
                                        <span className="inline-block px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded text-xs">
                                          Gaps in schedule
                                        </span>
                                      </td>
                                      <td className="p-2 text-xs">
                                        A stream has non-sequential activities with gaps between.
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="mt-3 text-xs text-gray-700">
                          <p className="font-medium">Design Features:</p>
                          <ul className="mt-1 space-y-1">
                            <li className="flex items-center">
                              <span className="text-green-500 mr-1">✓</span>
                              Clear success confirmation with next steps
                            </li>
                            <li className="flex items-center">
                              <span className="text-green-500 mr-1">✓</span>
                              Color-coded rule violations by severity
                            </li>
                          </ul>
                        </div>
                      </div>

                      <p className="text-gray-700 text-sm mt-4">
                        High-fidelity prototypes included visual design elements, realistic data, and interactive
                        components. These prototypes were built in Figma with interactive elements to simulate the
                        actual user experience and test complex interactions.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="relative z-10"
              >
                <div>
                  {/* Removed numbered circle */}
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-3">Usability Testing & Iteration</h4>

                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 mb-4">
                      <div className="flex items-start space-x-4 mb-4">
                        <div className="flex-shrink-0 bg-pink-100 p-3 rounded-full">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-pink-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h5 className="font-medium text-gray-900 mb-2">Prototype Validation</h5>
                          <p className="text-sm text-gray-700 mb-3">
                            The high-fidelity prototypes were tested with actual users, revealing critical insights that
                            informed design refinements:
                          </p>
                          <div className="grid grid-cols-1 gap-4">
                            <div>
                              <p className="text-xs font-medium text-gray-900 mb-1">Usability Metrics:</p>
                              <ul className="list-disc pl-4 text-xs text-gray-700 space-y-1">
                                <li>Task completion rate: 87%</li>
                                <li>Time on task reduction: 35%</li>
                                <li>System Usability Scale (SUS) score: 82/100</li>
                              </ul>
                            </div>
                            <div>
                              <p className="text-xs font-medium text-gray-900 mb-1">Key Insights:</p>
                              <ul className="list-disc pl-4 text-xs text-gray-700 space-y-1">
                                <li>Users needed clearer rule violation categories</li>
                                <li>Timetable navigation required simplification</li>
                                <li>Batch operations were highly valued</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white p-4 rounded-lg border border-gray-200 mb-3">
                        <h5 className="text-sm font-medium text-gray-900 mb-2">Design Iterations</h5>
                        <div className="grid grid-cols-1 gap-4">
                          <div>
                            <p className="text-xs font-medium text-pink-500 mb-1">Before Testing</p>
                            <ul className="list-disc pl-4 text-xs text-gray-700 space-y-1">
                              <li>Single view for all rule violations</li>
                              <li>Complex navigation between timetables</li>
                              <li>Limited bulk actions for schools</li>
                            </ul>
                          </div>
                          <div>
                            <p className="text-xs font-medium text-green-500 mb-1">After Refinement</p>
                            <ul className="list-disc pl-4 text-xs text-gray-700 space-y-1">
                              <li>Categorized violation types with clear visual cues</li>
                              <li>Simplified grade/stream/teacher view tabs</li>
                              <li>Added batch operations for multiple schools</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <p className="text-gray-700 text-sm">
                        Multiple rounds of testing and iteration ensured that the final design addressed user needs
                        effectively while minimizing cognitive load. Each test session revealed new opportunities to
                        optimize the interface.
                      </p>
                    </div>

                    <div className="text-gray-700">
                      <p className="mb-2">
                        <span className="font-medium">Key Activities:</span>
                      </p>
                      <ul className="list-none space-y-1 mb-4">
                        <li className="flex items-start">
                          <span className="text-pink-500 mr-2">✓</span>
                          <span>Conducting moderated usability tests with real users</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-pink-500 mr-2">✓</span>
                          <span>Analyzing qualitative and quantitative testing data</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-pink-500 mr-2">✓</span>
                          <span>Implementing design refinements based on user feedback</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Design System & Documentation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-100"
            >
              <h4 className="font-bold mb-4 text-gray-900">Design System & Documentation</h4>

              <p className="text-gray-700 mb-6">
                To ensure consistency and facilitate development, I created a comprehensive design system with reusable
                components and detailed documentation:
              </p>

              <div className="grid grid-cols-1 gap-6 mb-6">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h5 className="font-medium text-gray-900 mb-3">Component Library</h5>
                  <div className="space-y-2">
                    <div className="p-2 bg-gray-50 rounded">
                      <p className="text-xs font-medium text-gray-700 mb-1">Buttons</p>
                      <div className="flex space-x-2">
                        <div className="px-3 py-1 bg-blue-600 text-white text-xs rounded">Primary</div>
                        <div className="px-3 py-1 bg-white text-gray-700 text-xs rounded border border-gray-300">
                          Secondary
                        </div>
                      </div>
                    </div>
                    <div className="p-2 bg-gray-50 rounded">
                      <p className="text-xs font-medium text-gray-700 mb-1">Status Tags</p>
                      <div className="flex space-x-2">
                        <div className="px-2 py-0.5 text-xs bg-green-100 text-green-800 rounded-full">Success</div>
                        <div className="px-2 py-0.5 text-xs bg-red-100 text-red-800 rounded-full">Error</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h5 className="font-medium text-gray-900 mb-3">Color System</h5>
                  <div className="grid grid-cols-5 gap-1">
                    <div className="h-6 bg-blue-500 rounded"></div>
                    <div className="h-6 bg-green-500 rounded"></div>
                    <div className="h-6 bg-red-500 rounded"></div>
                    <div className="h-6 bg-yellow-500 rounded"></div>
                    <div className="h-6 bg-purple-500 rounded"></div>
                  </div>
                  <div className="grid grid-cols-5 gap-1 mt-1">
                    <div className="h-4 bg-blue-200 rounded"></div>
                    <div className="h-4 bg-green-200 rounded"></div>
                    <div className="h-4 bg-red-200 rounded"></div>
                    <div className="h-4 bg-yellow-200 rounded"></div>
                    <div className="h-4 bg-purple-200 rounded"></div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h5 className="font-medium text-gray-900 mb-3">Interaction Patterns</h5>
                  <div className="space-y-2 text-xs text-gray-700">
                    <div className="flex items-center">
                      <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                      <span>Drag and drop for schedule changes</span>
                    </div>
                    <div className="flex items-center">
                      <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                      <span>One-click conflict resolution</span>
                    </div>
                    <div className="flex items-center">
                      <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                      <span>Progressive disclosure of options</span>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-gray-700">
                The comprehensive wireframing and prototyping process was essential to translating complex scheduling
                requirements into an intuitive interface. Each design decision was validated through user testing to
                ensure the final product would effectively meet the needs of all stakeholders while significantly
                improving the efficiency and quality of the scheduling process.
              </p>
            </motion.div>
          </motion.div>
        </section>

        {/* Interactive Prototype Section */}
        <div className="mb-20">
          <InteractivePrototype />
        </div>

        {/* Lessons Learned Section */}
        <section id="lessons" className="mb-20 mt-20">
          <div className="flex items-center mb-8">
            <CaseStudyHeader level="h2" showGradientLine>
              Lessons Learned
            </CaseStudyHeader>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white p-8 rounded-xl shadow-md mb-12"
          >
            <p className="text-gray-800 mb-8">
              The EduScheduler project provided valuable insights that have informed my approach to complex system
              design:
            </p>

            {/* Key Challenges */}
            <div className="mb-12">
              <h3 className="text-gray-900 font-bold text-xl mb-6">Key Challenges</h3>

              <div className="grid grid-cols-1 gap-6 mb-8">
                <div className="bg-blue-50 p-6 rounded-xl border-t-4 border-blue-400 shadow-sm">
                  <div className="flex items-center mb-4">
                    <div className="text-blue-600 mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        />
                      </svg>
                    </div>
                    <h4 className="font-bold text-gray-900">Complex Constraint Management</h4>
                  </div>
                  <p className="text-gray-700">
                    Balancing the need for standardization across programs with flexibility for local contexts proved
                    more complex than initially anticipated.
                  </p>
                </div>

                <div className="bg-purple-50 p-6 rounded-xl border-t-4 border-purple-400 shadow-sm">
                  <div className="flex items-center mb-4">
                    <div className="text-purple-600 mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                    </div>
                    <h4 className="font-bold text-gray-900">Stakeholder Alignment</h4>
                  </div>
                  <p className="text-gray-700">
                    Coordinating between program administrators, school principals, and teachers required careful
                    communication plans and change management.
                  </p>
                </div>

                <div className="bg-pink-50 p-6 rounded-xl border-t-4 border-pink-400 shadow-sm">
                  <div className="flex items-center mb-4">
                    <div className="text-pink-600 mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h4 className="font-bold text-gray-900">Performance Optimization</h4>
                  </div>
                  <p className="text-gray-700">
                    The complexity of scheduling algorithms required significant optimization to deliver results in a
                    timely manner for larger schools.
                  </p>
                </div>
              </div>
            </div>

            {/* What I Would Do Differently */}
            <div className="mb-12">
              <h3 className="text-gray-900 font-bold text-xl mb-6">What I Would Do Differently</h3>

              <motion.div className="rounded-xl overflow-hidden shadow-md border border-gray-200 mb-8">
                <div className="py-4 px-6 bg-blue-50 rounded-t-xl">
                  <h4 className="font-bold text-gray-900">Process Improvements</h4>
                </div>
                <div className="bg-white p-6">
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-500 flex items-center justify-center mt-1 mr-3">
                        <span className="text-white text-xs">1</span>
                      </div>
                      <div>
                        <h5 className="font-bold text-gray-900 mb-1">Earlier User Testing</h5>
                        <p className="text-gray-700">
                          Involving end users earlier in the process would have identified usability challenges sooner
                          and improved adoption rates.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-500 flex items-center justify-center mt-1 mr-3">
                        <span className="text-white text-xs">2</span>
                      </div>
                      <div>
                        <h5 className="font-bold text-gray-900 mb-1">Incremental Rollout</h5>
                        <p className="text-gray-700">
                          A more phased approach to deployment would have allowed for iterative improvements based on
                          real-world usage.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-500 flex items-center justify-center mt-1 mr-3">
                        <span className="text-white text-xs">3</span>
                      </div>
                      <div>
                        <h5 className="font-bold text-gray-900 mb-1">Enhanced Data Visualization</h5>
                        <p className="text-gray-700">
                          More sophisticated data visualization tools would have made it easier for administrators to
                          identify optimization opportunities.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Design Principles Reinforced */}
            <div className="mb-12">
              <h3 className="text-gray-900 font-bold text-xl mb-6">Design Principles Reinforced</h3>

              <div className="grid grid-cols-1 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-blue-400 w-16 h-16 -mr-6 -mt-6 rounded-full opacity-20"></div>
                  <h4 className="font-bold text-gray-900 mb-3">Progressive Disclosure</h4>
                  <p className="text-gray-700 relative z-10">
                    Revealing complexity gradually allowed users to navigate the system confidently despite its
                    sophistication.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-purple-400 w-16 h-16 -mr-6 -mt-6 rounded-full opacity-20"></div>
                  <h4 className="font-bold text-gray-900 mb-3">Contextual Assistance</h4>
                  <p className="text-gray-700 relative z-10">
                    Providing help and guidance at the point of need significantly reduced training requirements.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-pink-400 w-16 h-16 -mr-6 -mt-6 rounded-full opacity-20"></div>
                  <h4 className="font-bold text-gray-900 mb-3">Adaptive Interfaces</h4>
                  <p className="text-gray-700 relative z-10">
                    Different user roles required tailored interfaces to focus on their specific needs and
                    responsibilities.
                  </p>
                </div>
              </div>
            </div>

            {/* The Biggest Takeaway */}
            <div className="mb-4">
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-100"
              >
                <h3 className="text-xl font-bold mb-4 text-gray-900">The Biggest Takeaway</h3>
                <p className="text-gray-700">
                  The most significant lesson from this project was that even the most complex systems can be made
                  approachable through thoughtful information architecture and workflow design. By creating clear mental
                  models and providing appropriate feedback mechanisms, users can successfully navigate and control
                  highly sophisticated processes.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </section>

        <section id="results" className="mb-20">
          <div className="flex items-center mb-8">
            <CaseStudyHeader level="h2" showGradientLine>
              Conclusion
            </CaseStudyHeader>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white p-8 rounded-xl shadow-md mb-12"
          >
            <p className="text-gray-800 mb-8">
              EduScheduler transformed a complex manual process into an efficient, intuitive system, empowering
              administrators to create optimal schedules while meeting diverse needs.
            </p>

            <h3 className="text-blue-700 font-bold text-lg mb-4">Project Achievements</h3>
            <div className="bg-blue-50 p-6 rounded-lg mb-8">
              <p className="text-gray-700">
                Thoughtful UX design enabled automation and control, balancing optimization with human expertise. Clear
                workflows and visualizations made schedule creation accessible for all stakeholders.
              </p>
            </div>

            <h4 className="font-bold text-gray-900 mb-4 text-xl">Impact Metrics</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-blue-100 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-blue-700 mb-1">80%</div>
                <div className="text-sm text-gray-700">Fewer scheduling errors</div>
              </div>
              <div className="bg-purple-100 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-purple-700 mb-1">85%</div>
                <div className="text-sm text-gray-700">Time saved</div>
              </div>
              <div className="bg-pink-100 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-pink-700 mb-1">92%</div>
                <div className="text-sm text-gray-700">Teacher resource optimization</div>
              </div>
              <div className="bg-green-100 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-green-700 mb-1">12%</div>
                <div className="text-sm text-gray-700">Cost reduction</div>
              </div>
            </div>

            <h4 className="font-bold text-gray-900 mb-4 text-xl">My Role</h4>
            <p className="text-gray-700 mb-6">
              As Lead Product Designer, I led research, design, and implementation, collaborating across teams and
              supporting users throughout the product lifecycle.
            </p>

            <h4 className="font-bold text-gray-900 mb-4 text-xl">Future Directions</h4>
            <p className="text-gray-700 mb-6">
              EduScheduler lays the foundation for a modular learning platform, with future enhancements planned for
              content, planning, teacher, and school management.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-xl flex items-start">
              <div className="mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-blue-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l9-5-9-5v10z" />
                </svg>
              </div>
              <div>
                <p className="italic text-gray-700 mb-2">
                  "The EduScheduler system has revolutionized how we approach academic scheduling, saving countless
                  hours while producing better results. It's become an essential tool in our educational planning
                  process."
                </p>
                <div className="text-sm text-gray-900 font-semibold">DA</div>
                <div className="text-xs text-gray-500">Director of Academic Programs</div>
              </div>
            </div>
          </motion.div>
        </section>

        <CaseStudyFooter />
      </main>
      <ScrollToTopButton targetId="intro-section" />
    </div>
  );
}
