'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import CaseStudyFooter from '@/components/case-studies/CaseStudyFooter';
import CaseStudyVoiceToggle from '@/components/case-studies/CaseStudyVoiceToggle';
import ScrollToTopButton from '@/components/ui/ScrollToTopButton';

export default function Page() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  // In the Generation Workflow section, modify to add interactivity
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <div className="bg-[#f8f9fe] min-h-screen">
      {/* Header section */}
      <header className="bg-white py-0 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          {/* Removed: <Link href="/" className="text-purple-600 font-medium text-xl">Imran Mohammed</Link> */}
        </div>
      </header>

      {/* Full-width hero image section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="w-full relative"
      >
        <div className="w-full h-[70vh] md:h-[80vh] relative overflow-hidden">
          <Image
            src="/images/casestudy/lessonloom/lessonloomboard.png"
            alt="LessonLoom: Automated Lesson Generation Platform"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent"></div>
        </div>
      </motion.div>

      <main className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
        {/* Title Section */}
        <motion.h1
          className="text-5xl font-bold text-transparent bg-clip-text animate-gradient-text mb-12"
          style={{
            backgroundImage: 'linear-gradient(90deg, #d94f9d, #9333ea, #d94f9d)',
            backgroundSize: '200% auto',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          LessonLoom: Automated Lesson Generation Platform
        </motion.h1>

        {/* Add CSS keyframes animation definition at the top of the page */}
        <style jsx global>{`
          @keyframes gradient-shift {
            0% {
              background-position: 0% center;
            }
            50% {
              background-position: 100% center;
            }
            100% {
              background-position: 0% center;
            }
          }

          .animate-gradient-text {
            animation: gradient-shift 6s ease infinite;
          }
        `}</style>

        {/* Introduction Section */}
        <motion.div
          id="intro-section"
          className="mb-16 border-l-4 border-blue-500 pl-6 py-4 bg-white rounded-lg shadow-sm"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p className="text-gray-800 text-lg">
            As a product designer for LessonLoom, I led the design process for an innovative platform that automates the
            creation of educational materials using AI and templating systems. This case study walks through how our
            design team approached this complex challenge – from understanding user needs and pain points to crafting an
            intuitive interface that empowers educators to create high-quality content at scale.
          </p>
        </motion.div>

        {/* Project Overview Section */}
        <section className="mb-16">
          <motion.h2 className="text-3xl font-bold text-gray-800 mb-6" {...fadeIn}>
            Project Overview
          </motion.h2>

          <motion.div
            className="h-1 w-24 mb-10 rounded-full"
            style={{
              background: 'linear-gradient(to right, #9333ea, #d94f9d)',
            }}
            initial={{ width: 0 }}
            animate={{ width: '6rem' }}
            transition={{ duration: 0.5 }}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              className="bg-[#f9f2ff] rounded-2xl p-6 shadow border-t-4 border-t-[#9333ea]"
              {...fadeIn}
              transition={{ delay: 0.1 }}
            >
              <h3 className="text-gray-800 font-semibold mb-3">Role</h3>
              <p className="text-gray-800">Product Designer</p>
            </motion.div>

            <motion.div
              className="bg-[#f2f7ff] rounded-2xl p-6 shadow border-t-4 border-t-[#4f69ea]"
              {...fadeIn}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-gray-800 font-semibold mb-3">Organization</h3>
              <p className="text-gray-800">NewGlobe</p>
            </motion.div>

            <motion.div
              className="bg-[#fff2f8] rounded-2xl p-6 shadow border-t-4 border-t-[#d94f9d]"
              {...fadeIn}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-gray-800 font-semibold mb-3">Technologies</h3>
              <p className="text-gray-800">Vue.js, .NET Core, Python, Azure OpenAI, AWS S3</p>
            </motion.div>
          </div>
        </section>

        {/* Challenge Section */}
        <motion.section className="mb-16" {...fadeIn} transition={{ delay: 0.2 }}>
          <h2 className="text-3xl font-bold text-gray-800 mb-6">The Challenge</h2>

          <motion.div
            className="h-1 w-24 mb-10 rounded-full"
            style={{
              background: 'linear-gradient(to right, #9333ea, #d94f9d)',
            }}
            initial={{ width: 0 }}
            animate={{ width: '6rem' }}
            transition={{ duration: 0.5, delay: 0.1 }}
          />

          <div className="bg-white p-8 rounded-xl shadow mb-8">
            <p className="text-gray-800 mb-8">
              NewGlobe, a global education organization, faced significant obstacles when creating teaching materials
              across multiple countries:
            </p>

            <div className="space-y-6 mb-8">
              <div className="flex items-start">
                <div className="h-5 w-5 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold mr-4 mt-1 flex-shrink-0">
                  <div className="h-2.5 w-2.5 rounded-full bg-purple-600"></div>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">Curriculum Alignment</h3>
                  <p className="text-gray-700">
                    Training models to accurately follow educational standards across different regions required
                    developing a comprehensive taxonomy of educational objectives and standards.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="h-5 w-5 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold mr-4 mt-1 flex-shrink-0">
                  <div className="h-2.5 w-2.5 rounded-full bg-purple-600"></div>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">Content Diversity</h3>
                  <p className="text-gray-700">
                    Generating inclusive materials that represent different cultural contexts and learning styles
                    required careful prompt engineering and diverse training datasets.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="h-5 w-5 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold mr-4 mt-1 flex-shrink-0">
                  <div className="h-2.5 w-2.5 rounded-full bg-purple-600"></div>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">Age-Appropriate Content</h3>
                  <p className="text-gray-700">
                    Developing filtering systems to ensure all generated content was suitable for the target age group
                    required multiple layers of content safety measures.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="h-5 w-5 rounded-full bg-purple-100 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                  <div className="h-2.5 w-2.5 rounded-full bg-purple-600"></div>
                </div>
                <div>
                  <span className="font-semibold text-gray-800">Localization bottlenecks:</span>
                  <span className="text-gray-800">
                    {' '}
                    Adapting content for different regions created expansion delays
                  </span>
                </div>
              </div>
            </div>

            <div className="border-l-4 border-blue-500 pl-6 py-4">
              <p className="text-gray-800">
                Content creators needed a solution that would free them from tedious formatting work while maintaining
                their pedagogical expertise in the process.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Design Process Section */}
        <motion.section className="mb-16" {...fadeIn} transition={{ delay: 0.4 }}>
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Design Process</h2>

          <motion.div
            className="h-1 w-24 mb-10 rounded-full"
            style={{
              background: 'linear-gradient(to right, #9333ea, #d94f9d)',
            }}
            initial={{ width: 0 }}
            animate={{ width: '6rem' }}
            transition={{ duration: 0.5, delay: 0.3 }}
          />

          <div className="bg-white p-8 rounded-xl shadow">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Research & Discovery</h3>

            <p className="text-gray-800 mb-8">
              I began by deeply understanding the existing content creation workflow through:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* User Interviews Column */}
              <div className="bg-purple-50 p-6 rounded-xl">
                <h4 className="flex items-center mb-4">
                  <span className="text-xl font-bold text-gray-800 mr-2">1</span>
                  <span className="text-xl font-semibold text-gray-800">User Interviews</span>
                </h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="text-purple-600 mr-2 mt-1.5">•</div>
                    <p className="text-gray-800">Shadowed 8 instructional designers</p>
                  </li>
                  <li className="flex items-start">
                    <div className="text-purple-600 mr-2 mt-1.5">•</div>
                    <p className="text-gray-800">Conducted interviews with 12 curriculum specialists</p>
                  </li>
                  <li className="flex items-start">
                    <div className="text-purple-600 mr-2 mt-1.5">•</div>
                    <p className="text-gray-800">Ran collaborative workshops with translation teams</p>
                  </li>
                </ul>
              </div>

              {/* Content Analysis Column */}
              <div className="bg-blue-50 p-6 rounded-xl">
                <h4 className="flex items-center mb-4">
                  <span className="text-xl font-bold text-gray-800 mr-2">2</span>
                  <span className="text-xl font-semibold text-gray-800">Content Analysis</span>
                </h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="text-blue-600 mr-2 mt-1.5">•</div>
                    <p className="text-gray-800">Analyzed 150+ teacher guides</p>
                  </li>
                  <li className="flex items-start">
                    <div className="text-blue-600 mr-2 mt-1.5">•</div>
                    <p className="text-gray-800">Mapped recurring patterns</p>
                  </li>
                  <li className="flex items-start">
                    <div className="text-blue-600 mr-2 mt-1.5">•</div>
                    <p className="text-gray-800">Created information architecture diagrams</p>
                  </li>
                </ul>
              </div>

              {/* Pain Point Analysis Column */}
              <div className="bg-pink-50 p-6 rounded-xl">
                <h4 className="flex items-center mb-4">
                  <span className="text-xl font-bold text-gray-800 mr-2">3</span>
                  <span className="text-xl font-semibold text-gray-800">Pain Point Analysis</span>
                </h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="text-pink-600 mr-2 mt-1.5">•</div>
                    <p className="text-gray-800">Created journey maps</p>
                  </li>
                  <li className="flex items-start">
                    <div className="text-pink-600 mr-2 mt-1.5">•</div>
                    <p className="text-gray-800">Quantified time spent on tasks</p>
                  </li>
                  <li className="flex items-start">
                    <div className="text-pink-600 mr-2 mt-1.5">•</div>
                    <p className="text-gray-800">Developed empathy maps</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Key Insights Subsection */}
          <div className="bg-white p-8 rounded-xl shadow mt-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Key Insights</h3>

            <p className="text-gray-800 mb-8">
              Our research revealed critical insights that shaped our design approach:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {/* Pedagogical Focus */}
              <div className="bg-purple-50 p-6 rounded-xl">
                <h4 className="flex items-center mb-4">
                  <span className="text-xl font-bold text-gray-800 mr-2">1</span>
                  <span className="text-xl font-semibold text-gray-800">Pedagogical Focus</span>
                </h4>
                <p className="text-gray-800 mb-2">
                  Creators valued pedagogical decisions, not <span className="text-amber-700">formatting</span>
                </p>
                <div className="bg-white p-3 rounded-lg italic text-gray-700 text-sm">
                  "I spend 70% of my time making things look right rather than thinking about how students will learn."
                </div>
              </div>

              {/* Mental Templates */}
              <div className="bg-blue-50 p-6 rounded-xl">
                <h4 className="flex items-center mb-4">
                  <span className="text-xl font-bold text-gray-800 mr-2">2</span>
                  <span className="text-xl font-semibold text-gray-800">Mental Templates</span>
                </h4>
                <p className="text-gray-800 mb-2">Templates were mental models, not just documents</p>
                <div className="bg-white p-3 rounded-lg italic text-gray-700 text-sm">
                  "We already have mental templates we follow, but they're not captured anywhere."
                </div>
              </div>

              {/* Subject Variations */}
              <div className="bg-pink-50 p-6 rounded-xl">
                <h4 className="flex items-center mb-4">
                  <span className="text-xl font-bold text-gray-800 mr-2">3</span>
                  <span className="text-xl font-semibold text-gray-800">Subject Variations</span>
                </h4>
                <p className="text-gray-800 mb-2">Content needs varied by subject</p>
                <div className="bg-white p-3 rounded-lg italic text-gray-700 text-sm">
                  "Math lessons follow predictable patterns, while reading comprehension needs more flexibility."
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Visual Clarity */}
              <div className="bg-purple-50 p-6 rounded-xl">
                <h4 className="flex items-center mb-4">
                  <span className="text-xl font-bold text-gray-800 mr-2">4</span>
                  <span className="text-xl font-semibold text-gray-800">Visual Clarity</span>
                </h4>
                <p className="text-gray-800 mb-2">Visual clarity was essential</p>
                <div className="bg-white p-3 rounded-lg italic text-gray-700 text-sm">
                  "I need to see exactly how the final lesson will appear to teachers."
                </div>
              </div>

              {/* Trust in Automation */}
              <div className="bg-blue-50 p-6 rounded-xl">
                <h4 className="flex items-center mb-4">
                  <span className="text-xl font-bold text-gray-800 mr-2">5</span>
                  <span className="text-xl font-semibold text-gray-800">Trust in Automation</span>
                </h4>
                <p className="text-gray-800 mb-2">Trust in automation was fragile</p>
                <div className="bg-white p-3 rounded-lg italic text-gray-700 text-sm">
                  "I'd use automation if I could verify and adjust the output easily."
                </div>
              </div>
            </div>
          </div>

          {/* Design Exploration Subsection */}
          <div className="bg-white p-8 rounded-xl shadow mt-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Design Exploration</h3>

            <p className="text-gray-800 mb-8">
              During the design process, I explored several conceptual approaches. Each approach represented a different
              philosophy about how to structure the generation system, balancing control, flexibility, and ease of use
              for curriculum specialists.
            </p>

            <div className="bg-blue-50 p-8 rounded-xl">
              <h4 className="text-xl font-bold text-gray-800 mb-4">Design Exploration Methodology</h4>

              <p className="text-gray-800 mb-6">
                My exploration was guided by several key considerations identified during the research phase:
              </p>

              <div className="space-y-5">
                <div className="flex items-start">
                  <div className="text-indigo-600 mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-800">Balance of control and automation:</span>
                    <span className="text-gray-800">
                      {' '}
                      Finding the right mix of automated generation while preserving educator control over pedagogical
                      content
                    </span>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="text-indigo-600 mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-800">Scalability:</span>
                    <span className="text-gray-800">
                      {' '}
                      Ensuring the system could accommodate growing content needs across multiple subjects and regions
                    </span>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="text-indigo-600 mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-800">Familiar mental models:</span>
                    <span className="text-gray-800">
                      {' '}
                      Using interfaces and workflows that matched how curriculum specialists already thought about
                      content creation
                    </span>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="text-indigo-600 mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-800">Transparency:</span>
                    <span className="text-gray-800">
                      {' '}
                      Creating a system where users always understood the relationship between inputs and outputs
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Concept 1: Template-Driven Generation */}
            <div className="mt-8">
              <h4 className="text-xl font-bold text-gray-800 mb-4">Concept 1: Template-Driven Generation</h4>

              <p className="text-gray-800 mb-6">
                In this approach, I explored prioritizing template structure as the foundation of the system. The core
                idea was to create highly structured templates with specialized syntax that would serve as the
                "blueprint" for all generated content.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-purple-50 p-6 rounded-xl">
                  <h5 className="font-bold text-purple-800 mb-4">Key Characteristics</h5>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="text-purple-600 mr-2 mt-1.5">•</div>
                      <p className="text-gray-800">
                        Templates designed by instructional designers with embedded automation tags
                      </p>
                    </li>
                    <li className="flex items-start">
                      <div className="text-purple-600 mr-2 mt-1.5">•</div>
                      <p className="text-gray-800">
                        Content parameters provided separately and mapped to template placeholders
                      </p>
                    </li>
                    <li className="flex items-start">
                      <div className="text-purple-600 mr-2 mt-1.5">•</div>
                      <p className="text-gray-800">
                        Strong emphasis on consistent output format across all generated materials
                      </p>
                    </li>
                    <li className="flex items-start">
                      <div className="text-purple-600 mr-2 mt-1.5">•</div>
                      <p className="text-gray-800">Validation of inputs against template requirements</p>
                    </li>
                  </ul>
                </div>

                <div className="bg-blue-50 p-6 rounded-xl">
                  <h5 className="font-bold text-blue-800 mb-4">Strategic Rationale</h5>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="text-blue-600 mr-2 mt-1.5">•</div>
                      <p className="text-gray-800">Ensures pedagogical best practices are encoded in templates</p>
                    </li>
                    <li className="flex items-start">
                      <div className="text-blue-600 mr-2 mt-1.5">•</div>
                      <p className="text-gray-800">
                        Provides predictable output structure for review and quality control
                      </p>
                    </li>
                    <li className="flex items-start">
                      <div className="text-blue-600 mr-2 mt-1.5">•</div>
                      <p className="text-gray-800">
                        Allows content specialists to focus on subject matter rather than formatting
                      </p>
                    </li>
                    <li className="flex items-start">
                      <div className="text-blue-600 mr-2 mt-1.5">•</div>
                      <p className="text-gray-800">Creates organization-wide consistency in teaching materials</p>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-amber-50 p-6 rounded-xl mt-6">
                <h5 className="font-bold text-amber-800 mb-4">Design Consideration</h5>
                <p className="text-gray-800">
                  User testing revealed template creation was challenging for many curriculum specialists. This approach
                  would require specialized training or dedicated template designers.
                </p>
              </div>

              {/* Template-First Approach Visualization */}
              <div className="mt-8 border border-gray-200 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl">
                {/* Header with concept label */}
                <div className="bg-gray-50 p-4 border-b border-gray-200 flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="flex space-x-1 mr-3">
                      <div className="h-3 w-3 rounded-full bg-red-500"></div>
                      <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                      <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    </div>
                    <h5 className="font-semibold text-gray-800">Concept 1: Template-Driven Generation</h5>
                  </div>
                  <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">Explored Concept</span>
                </div>

                {/* Content split into two columns */}
                <div className="flex flex-col md:flex-row">
                  {/* Left column - approach description */}
                  <div className="p-6 md:w-1/2 bg-white">
                    <h5 className="font-bold text-gray-800 mb-4">Template-First Approach</h5>
                    <p className="text-gray-700 mb-6">
                      Design focused on creating flexible templates with specialized syntax that could be populated with
                      various content.
                    </p>

                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <div className="text-gray-400 mr-2">•</div>
                        <p className="text-gray-700">Reusable formats across subjects</p>
                      </li>
                      <li className="flex items-start">
                        <div className="text-gray-400 mr-2">•</div>
                        <p className="text-gray-700">Predictable output structure</p>
                      </li>
                      <li className="flex items-start">
                        <div className="text-gray-400 mr-2">•</div>
                        <p className="text-gray-700">Higher initial setup time</p>
                      </li>
                    </ul>
                  </div>

                  {/* Right column - template mockup */}
                  <div className="p-6 md:w-1/2 bg-gray-50 border-t md:border-t-0 md:border-l border-gray-200">
                    <h5 className="font-bold text-gray-800 mb-4">Lesson Template</h5>

                    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                      <div className="mb-6">
                        <div className="font-medium text-gray-700 mb-2">{'{title}'}</div>
                        <div className="text-gray-500 text-sm bg-gray-50 p-2 rounded border border-gray-200">
                          Grade {'{grade}'} • {'{subject}'}
                        </div>
                      </div>

                      <div className="mb-6">
                        <div className="font-medium text-gray-700 mb-2">Learning Objective</div>
                        <div className="text-gray-500 text-sm bg-gray-50 p-2 rounded border border-gray-200">
                          {'{learning_objective}'}
                        </div>
                      </div>

                      <div className="mb-6">
                        <div className="font-medium text-gray-700 mb-2">Materials</div>
                        <div className="text-gray-500 text-sm bg-gray-50 p-2 rounded border border-gray-200">
                          {'{materials_list}'}
                        </div>
                      </div>

                      <div>
                        <div className="font-medium text-gray-700 mb-2">Instructions</div>
                        <div className="text-gray-500 text-sm bg-gray-50 p-2 rounded border border-gray-200">
                          {'{activity_instructions}'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Concept 2: Content-First Approach */}
            <div className="mt-12">
              <h4 className="text-xl font-bold text-gray-800 mb-4">Concept 2: Content-First Approach</h4>

              <p className="text-gray-800 mb-6">
                For my second exploration, I inverted the paradigm to prioritize content organization over template
                structure. This approach treated content as the primary asset, with formatting applied later in the
                process.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-purple-50 p-6 rounded-xl">
                  <h5 className="font-bold text-purple-800 mb-4">Key Characteristics</h5>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="text-purple-600 mr-2 mt-1.5">•</div>
                      <p className="text-gray-800">
                        Content parameters organized in spreadsheets with standard columns
                      </p>
                    </li>
                    <li className="flex items-start">
                      <div className="text-purple-600 mr-2 mt-1.5">•</div>
                      <p className="text-gray-800">Format selection happens after content planning</p>
                    </li>
                    <li className="flex items-start">
                      <div className="text-purple-600 mr-2 mt-1.5">•</div>
                      <p className="text-gray-800">Content can be filtered, sorted, and batch processed</p>
                    </li>
                    <li className="flex items-start">
                      <div className="text-purple-600 mr-2 mt-1.5">•</div>
                      <p className="text-gray-800">Uses familiar spreadsheet interface for planning</p>
                    </li>
                  </ul>
                </div>

                <div className="bg-blue-50 p-6 rounded-xl">
                  <h5 className="font-bold text-blue-800 mb-4">Strategic Rationale</h5>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="text-blue-600 mr-2 mt-1.5">•</div>
                      <p className="text-gray-800">Aligns with how curriculum specialists naturally organize content</p>
                    </li>
                    <li className="flex items-start">
                      <div className="text-blue-600 mr-2 mt-1.5">•</div>
                      <p className="text-gray-800">Emphasizes pedagogical content over presentation format</p>
                    </li>
                    <li className="flex items-start">
                      <div className="text-blue-600 mr-2 mt-1.5">•</div>
                      <p className="text-gray-800">Easier for teams to collaborate on content creation</p>
                    </li>
                    <li className="flex items-start">
                      <div className="text-blue-600 mr-2 mt-1.5">•</div>
                      <p className="text-gray-800">
                        Simplifies the process of creating multiple variations of similar lessons
                      </p>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-amber-50 p-6 rounded-xl mt-6">
                <h5 className="font-bold text-amber-800 mb-4">User Insight</h5>
                <p className="text-gray-800">
                  During testing, curriculum specialists responded positively to the spreadsheet approach, noting that
                  it mirrored their existing content planning workflows. However, some expressed concern about the lack
                  of preview capabilities during the planning phase.
                </p>
              </div>

              {/* Content-First Approach Visualization */}
              <div className="mt-8 border border-gray-200 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl">
                {/* Header with concept label */}
                <div className="bg-gray-50 p-4 border-b border-gray-200 flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="flex space-x-1 mr-3">
                      <div className="h-3 w-3 rounded-full bg-red-500"></div>
                      <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                      <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    </div>
                    <h5 className="font-semibold text-gray-800">Concept 2: Content-First Approach</h5>
                  </div>
                  <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">Explored Concept</span>
                </div>

                {/* Content split into two columns */}
                <div className="flex flex-col md:flex-row">
                  {/* Left column - approach description */}
                  <div className="p-6 md:w-1/2 bg-white">
                    <h5 className="font-bold text-gray-800 mb-4">Content-Driven Design</h5>
                    <p className="text-gray-700 mb-6">
                      Design focused on organizing content parameters in spreadsheets first, with formats applied later.
                    </p>

                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <div className="text-gray-400 mr-2">•</div>
                        <p className="text-gray-700">Content planning separated from formatting</p>
                      </li>
                      <li className="flex items-start">
                        <div className="text-gray-400 mr-2">•</div>
                        <p className="text-gray-700">More flexible content organization</p>
                      </li>
                      <li className="flex items-start">
                        <div className="text-gray-400 mr-2">•</div>
                        <p className="text-gray-700">Easier for curriculum specialists</p>
                      </li>
                    </ul>
                  </div>

                  {/* Right column - spreadsheet mockup */}
                  <div className="p-6 md:w-1/2 bg-gray-50 border-t md:border-t-0 md:border-l border-gray-200">
                    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                      {/* Tab buttons */}
                      <div className="flex mb-4">
                        <div className="bg-blue-100 px-3 py-1 rounded-md text-blue-700 mr-2 text-sm">Subject</div>
                        <div className="bg-green-100 px-3 py-1 rounded-md text-green-700 mr-2 text-sm">Grade</div>
                        <div className="bg-purple-100 px-3 py-1 rounded-md text-purple-700 text-sm">Topic</div>
                      </div>

                      {/* Content parameters */}
                      <div className="mb-6">
                        <h6 className="font-medium text-gray-700 mb-3">Content Parameters</h6>
                        <div className="flex flex-wrap gap-2">
                          <span className="inline-block bg-gray-100 rounded-md px-3 py-1 text-sm text-gray-700">
                            Duration: 45min
                          </span>
                          <span className="inline-block bg-gray-100 rounded-md px-3 py-1 text-sm text-gray-700">
                            Group size: 4
                          </span>
                          <span className="inline-block bg-gray-100 rounded-md px-3 py-1 text-sm text-gray-700">
                            Difficulty: Medium
                          </span>
                          <span className="inline-block bg-gray-100 rounded-md px-3 py-1 text-sm text-gray-700">
                            Standards: 3.NBT.2
                          </span>
                        </div>
                      </div>

                      {/* Format options */}
                      <div>
                        <h6 className="font-medium text-gray-700 mb-3">Format Options</h6>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                            checked
                            readOnly
                          />
                          <label className="ml-2 text-sm text-gray-700">Worksheet</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Concept 3: Hybrid Approach */}
            <div className="mt-12">
              <h4 className="text-xl font-bold text-gray-800 mb-4">Concept 3: Hybrid Approach</h4>

              <p className="text-gray-800 mb-6">
                After testing the previous concepts with users, I developed a hybrid approach that combined the
                strengths of both paradigms. This synthesis emerged from direct user feedback and represented a more
                balanced solution.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-purple-50 p-6 rounded-xl">
                  <h5 className="font-bold text-purple-800 mb-4">Key Characteristics</h5>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="text-purple-600 mr-2 mt-1.5">•</div>
                      <p className="text-gray-800">Separate but interconnected content and template systems</p>
                    </li>
                    <li className="flex items-start">
                      <div className="text-purple-600 mr-2 mt-1.5">•</div>
                      <p className="text-gray-800">
                        Intelligent matching between content parameters and suitable templates
                      </p>
                    </li>
                    <li className="flex items-start">
                      <div className="text-purple-600 mr-2 mt-1.5">•</div>
                      <p className="text-gray-800">Live preview capability during content planning</p>
                    </li>
                    <li className="flex items-start">
                      <div className="text-purple-600 mr-2 mt-1.5">•</div>
                      <p className="text-gray-800">Multi-stage workflow with validation at each step</p>
                    </li>
                  </ul>
                </div>

                <div className="bg-blue-50 p-6 rounded-xl">
                  <h5 className="font-bold text-blue-800 mb-4">Strategic Rationale</h5>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="text-blue-600 mr-2 mt-1.5">•</div>
                      <p className="text-gray-800">
                        Splits responsibilities between template designers and content creators
                      </p>
                    </li>
                    <li className="flex items-start">
                      <div className="text-blue-600 mr-2 mt-1.5">•</div>
                      <p className="text-gray-800">Balances standardization needs with content flexibility</p>
                    </li>
                    <li className="flex items-start">
                      <div className="text-blue-600 mr-2 mt-1.5">•</div>
                      <p className="text-gray-800">Provides visibility into the generation process</p>
                    </li>
                    <li className="flex items-start">
                      <div className="text-blue-600 mr-2 mt-1.5">•</div>
                      <p className="text-gray-800">
                        Creates clear separation of concerns while maintaining integration
                      </p>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-green-50 p-6 rounded-xl mt-6 border-l-4 border-green-500 shadow-md">
                <h5 className="font-bold text-green-800 mb-4 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Key Decision Point
                </h5>
                <p className="text-gray-800 font-medium">
                  The hybrid approach was unanimously preferred in user testing. Curriculum specialists appreciated
                  maintaining their content-focused workflow while instructional designers valued the template system's
                  ability to enforce pedagogical best practices.
                </p>
              </div>

              {/* Hybrid Approach Visualization */}
              <div className="mt-8 border border-gray-200 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl">
                {/* Header with concept label */}
                <div className="bg-purple-50 p-4 border-b border-gray-200 flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="flex space-x-1 mr-3">
                      <div className="h-3 w-3 rounded-full bg-red-500"></div>
                      <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                      <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    </div>
                    <h5 className="font-semibold text-gray-800">Concept 3: Hybrid Approach</h5>
                  </div>
                  <span className="text-sm text-white bg-purple-600 px-3 py-1 rounded-full flex items-center">
                    Selected Approach
                    <svg
                      className="w-4 h-4 ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </span>
                </div>

                {/* Content split into two columns */}
                <div className="flex flex-col md:flex-row">
                  {/* Left column - approach description */}
                  <div className="p-6 md:w-1/2 bg-white">
                    <h5 className="font-bold text-gray-800 mb-4">Template + Content Integration</h5>
                    <p className="text-gray-700 mb-6">
                      The final design combined template flexibility with content-driven planning.
                    </p>

                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <div className="text-gray-400 mr-2">•</div>
                        <p className="text-gray-700">Centralized content control</p>
                      </li>
                      <li className="flex items-start">
                        <div className="text-gray-400 mr-2">•</div>
                        <p className="text-gray-700">Modular template system</p>
                      </li>
                      <li className="flex items-start">
                        <div className="text-gray-400 mr-2">•</div>
                        <p className="text-gray-700">Simplified generation workflow</p>
                      </li>
                    </ul>
                  </div>

                  {/* Right column - integration mockup */}
                  <div className="p-6 md:w-1/2 bg-gray-50 border-t md:border-t-0 md:border-l border-gray-200">
                    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                      {/* Navigation buttons */}
                      <div className="flex mb-6 justify-between">
                        <div className="bg-gray-100 px-3 py-2 rounded-md text-gray-700 text-sm flex items-center">
                          Content Spreadsheet
                        </div>
                        <div className="text-gray-400">→</div>
                        <div className="bg-gray-100 px-3 py-2 rounded-md text-gray-700 text-sm flex items-center">
                          Template Library
                        </div>
                      </div>

                      {/* Matching System */}
                      <div className="mb-6 border border-gray-200 rounded-lg p-3">
                        <div className="flex justify-between items-center mb-2">
                          <h6 className="font-medium text-gray-700">Matching System</h6>
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Active</span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <div className="h-3 w-3 rounded-full bg-purple-500 mr-2"></div>
                            <span className="text-sm text-gray-700">Content ID: L001</span>
                          </div>
                          <div className="flex items-center">
                            <div className="h-3 w-3 rounded-full bg-blue-500 mr-2"></div>
                            <span className="text-sm text-gray-700">Template: Math-Basic</span>
                          </div>
                        </div>
                      </div>

                      {/* Preview Output */}
                      <div>
                        <h6 className="font-medium text-gray-700 mb-2">Preview Output</h6>
                        <div className="h-20 bg-gray-50 border border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400 text-sm">
                          Generated Lesson
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Review & Iteration Interface section */}
          <div className="bg-white p-8 rounded-xl shadow mt-8">
            <h4 className="text-xl font-bold text-gray-800 mb-4">3. Review & Iteration Interface</h4>
            <p className="text-gray-700 mb-6">The review interface was crucial for building trust in the system:</p>

            <div className="border border-gray-200 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg mb-6">
              {/* Wireframe Header */}
              <div className="bg-gray-50 p-3 border-b border-gray-200 flex items-center">
                <div className="flex space-x-2 mr-3">
                  <div className="h-3 w-3 rounded-full bg-red-500"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                </div>
                <span className="text-gray-700 font-medium">Review Interface</span>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Left column - Template */}
                  <div className="bg-gray-50 p-5 rounded-lg">
                    <h5 className="font-bold text-gray-800 mb-4">Template</h5>
                    <div className="bg-white p-4 rounded border border-gray-200">
                      <p className="font-medium text-gray-800 mb-2">## Introduction</p>
                      <p className="text-gray-600">
                        Generate an engaging introduction about {'{TOPIC}'} for {'{GRADE}'} students
                      </p>
                    </div>
                  </div>

                  {/* Right column - Generated Output */}
                  <div className="bg-blue-50 p-5 rounded-lg">
                    <h5 className="font-bold text-blue-800 mb-4">Generated Output</h5>
                    <div className="bg-white p-4 rounded border border-blue-200">
                      <p className="font-medium text-gray-800 mb-2">## Introduction</p>
                      <p className="text-gray-600">
                        Welcome to our exciting lesson on fractions! Today we'll discover how fractions are used in
                        everyday life and why they're important for 3rd grade math skills.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Edit Controls */}
                <div className="mt-8">
                  <h5 className="font-bold text-gray-800 mb-4">Edit Controls</h5>
                  <div className="flex flex-wrap gap-3">
                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                      Accept
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      Edit
                    </button>
                    <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                      Regenerate
                    </button>
                    <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                      View Metadata
                    </button>
                  </div>
                </div>

                {/* Features List */}
                <div className="mt-8">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="text-indigo-600 mr-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <p className="text-gray-700">Side-by-side comparison of template and generated output</p>
                    </li>
                    <li className="flex items-start">
                      <div className="text-indigo-600 mr-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <p className="text-gray-700">Inline editing capabilities for quick adjustments</p>
                    </li>
                    <li className="flex items-start">
                      <div className="text-indigo-600 mr-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <p className="text-gray-700">
                        Generation metadata to understand the source of each content element
                      </p>
                    </li>
                    <li className="flex items-start">
                      <div className="text-indigo-600 mr-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <p className="text-gray-700">Option to regenerate specific sections while preserving others</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Design Solution Section */}
        <motion.section className="mb-16" {...fadeIn} transition={{ delay: 0.5 }}>
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Design Solution</h2>

          <motion.div
            className="h-1 w-24 mb-10 rounded-full"
            style={{
              background: 'linear-gradient(to right, #9333ea, #d94f9d)',
            }}
            initial={{ width: 0 }}
            animate={{ width: '6rem' }}
            transition={{ duration: 0.5, delay: 0.4 }}
          />

          <div className="bg-white p-8 rounded-xl shadow">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Information Architecture</h3>

            <p className="text-gray-800 mb-8">I designed a system with three main components:</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Content Spreadsheet */}
              <div className="bg-blue-50 p-6 rounded-xl">
                <h4 className="font-bold text-blue-800 mb-4 text-xl">Content Spreadsheet</h4>
                <p className="text-gray-700">Centralized data structure where users define lesson parameters</p>
              </div>

              {/* Template Library */}
              <div className="bg-purple-50 p-6 rounded-xl">
                <h4 className="font-bold text-purple-800 mb-4 text-xl">Template Library</h4>
                <p className="text-gray-700">Repository of lesson formats with specialized syntax for automation</p>
              </div>

              {/* Generation Interface */}
              <div className="bg-pink-50 p-6 rounded-xl">
                <h4 className="font-bold text-pink-800 mb-4 text-xl">Generation Interface</h4>
                <p className="text-gray-700">Process management and review interface</p>
              </div>
            </div>

            <p className="text-gray-800">
              This architecture separated content planning from content generation, allowing specialists to focus on
              curriculum decisions while automation handled implementation.
            </p>
          </div>

          {/* System Workflow Diagram */}
          <div className="bg-white p-8 rounded-xl shadow mt-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">System Workflow Diagram</h3>

            <div className="max-w-3xl mx-auto">
              {/* First row of components */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
                {/* Content Spreadsheet */}
                <div className="flex flex-col items-center">
                  <div className="bg-purple-100 p-5 rounded-lg mb-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12 text-purple-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <h4 className="text-xl font-bold text-gray-800 mb-2 text-center">Content Spreadsheet</h4>
                  <p className="text-gray-700 text-center">Curriculum specialists define lesson parameters</p>
                </div>

                {/* Template Library */}
                <div className="flex flex-col items-center">
                  <div className="bg-blue-100 p-5 rounded-lg mb-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12 text-blue-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-bold text-gray-800 mb-2 text-center">Template Library</h4>
                  <p className="text-gray-700 text-center">Instructional designers create templates with syntax</p>
                </div>

                {/* Generation Interface */}
                <div className="flex flex-col items-center">
                  <div className="bg-pink-100 p-5 rounded-lg mb-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12 text-pink-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <h4 className="text-xl font-bold text-gray-800 mb-2 text-center">Generation Interface</h4>
                  <p className="text-gray-700 text-center">Users manage process and review generated lessons</p>
                </div>
              </div>

              {/* Arrow pointing down */}
              <div className="flex justify-center mb-12">
                <svg
                  className="w-12 h-12 text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  ></path>
                </svg>
              </div>

              {/* Generated Lesson Box */}
              <div className="bg-green-50 p-8 rounded-xl max-w-2xl mx-auto mb-12">
                <div className="flex justify-center mb-6">
                  <div className="bg-green-100 p-4 rounded-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12 text-green-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9 2a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V6.414A2 2 0 0016.414 5L14 2.586A2 2 0 0012.586 2H9z" />
                      <path d="M3 8a2 2 0 012-2v10h8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
                    </svg>
                  </div>
                </div>
                <h4 className="text-xl font-bold text-gray-800 mb-3 text-center">Generated Lesson</h4>
                <p className="text-gray-700 text-center mb-8">Complete, formatted teaching materials</p>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                    <span className="text-gray-700">Content data merged</span>
                  </div>
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-blue-500 mr-2"></div>
                    <span className="text-gray-700">Format applied</span>
                  </div>
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-pink-500 mr-2"></div>
                    <span className="text-gray-700">User reviewed</span>
                  </div>
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                    <span className="text-gray-700">Ready for use</span>
                  </div>
                </div>
              </div>

              {/* Workflow description */}
              <p className="text-gray-800 text-center max-w-3xl mx-auto">
                This workflow combines curriculum content from the spreadsheet with formatting from templates. The
                generation interface orchestrates the process, allowing users to review and finalize lessons before
                they're delivered to teachers.
              </p>
            </div>
          </div>

          {/* Content Spreadsheet Example */}
          <div className="bg-white p-8 rounded-xl shadow mt-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-8">Content Spreadsheet Example</h3>

            <div className="border border-gray-200 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg mb-6">
              {/* Spreadsheet Header */}
              <div className="bg-gray-50 p-3 border-b border-gray-200 flex items-center">
                <div className="flex space-x-2 mr-3">
                  <div className="h-3 w-3 rounded-full bg-red-500"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                </div>
                <span className="text-gray-700 font-medium">Content Spreadsheet</span>
              </div>

              {/* Spreadsheet Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="px-4 py-3 text-left font-medium text-gray-700 border-b border-r border-gray-200">
                        LESSON ID
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-gray-700 border-b border-r border-gray-200">
                        GRADE
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-gray-700 border-b border-r border-gray-200">
                        SUBJECT
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-gray-700 border-b border-r border-gray-200">
                        TOPIC
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-gray-700 border-b border-r border-gray-200">
                        DURATION
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-gray-700 border-b border-r border-gray-200">
                        MATERIALS
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-gray-700 border-b border-gray-200">
                        ACTIVITY TYPE
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-gray-700 border-r border-gray-200">L001</td>
                      <td className="px-4 py-3 text-gray-700 border-r border-gray-200">Grade 3</td>
                      <td className="px-4 py-3 text-gray-700 border-r border-gray-200">Math</td>
                      <td className="px-4 py-3 text-gray-700 border-r border-gray-200">Fractions</td>
                      <td className="px-4 py-3 text-gray-700 border-r border-gray-200">45 min</td>
                      <td className="px-4 py-3 text-gray-700 border-r border-gray-200">Paper strips, scissors</td>
                      <td className="px-4 py-3 text-gray-700">Group work</td>
                    </tr>
                    <tr className="bg-gray-50 hover:bg-gray-100">
                      <td className="px-4 py-3 text-gray-700 border-r border-gray-200">L002</td>
                      <td className="px-4 py-3 text-gray-700 border-r border-gray-200">Grade 3</td>
                      <td className="px-4 py-3 text-gray-700 border-r border-gray-200">Math</td>
                      <td className="px-4 py-3 text-gray-700 border-r border-gray-200">Addition</td>
                      <td className="px-4 py-3 text-gray-700 border-r border-gray-200">30 min</td>
                      <td className="px-4 py-3 text-gray-700 border-r border-gray-200">Counters, worksheet</td>
                      <td className="px-4 py-3 text-gray-700">Individual practice</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-gray-700 border-r border-gray-200">L003</td>
                      <td className="px-4 py-3 text-gray-700 border-r border-gray-200">Grade 3</td>
                      <td className="px-4 py-3 text-gray-700 border-r border-gray-200">Science</td>
                      <td className="px-4 py-3 text-gray-700 border-r border-gray-200">Plants</td>
                      <td className="px-4 py-3 text-gray-700 border-r border-gray-200">60 min</td>
                      <td className="px-4 py-3 text-gray-700 border-r border-gray-200">Seeds, cups, soil</td>
                      <td className="px-4 py-3 text-gray-700">Experiment</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-gray-700 text-center">
              The content spreadsheet provides curriculum specialists with a familiar interface for defining lesson
              parameters without worrying about formatting.
            </p>
          </div>

          {/* Template Library Example */}
          <div className="bg-white p-8 rounded-xl shadow mt-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-8">Template Library Example</h3>

            <div className="border border-gray-200 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg mb-6">
              {/* Template Library Header */}
              <div className="bg-gray-50 p-3 border-b border-gray-200 flex items-center">
                <div className="flex space-x-2 mr-3">
                  <div className="h-3 w-3 rounded-full bg-red-500"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                </div>
                <span className="text-gray-700 font-medium">Template Library</span>
              </div>

              {/* Template Cards */}
              <div className="p-6 bg-white">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Math Lesson Template */}
                  <div className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
                    <div className="flex justify-center mb-3">
                      <div className="h-10 w-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-purple-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2z"
                          />
                        </svg>
                      </div>
                    </div>
                    <h4 className="text-center font-semibold text-gray-800 mb-1">Math Lesson - Basic</h4>
                    <p className="text-center text-gray-500 text-sm">Last edited: 2 days ago</p>
                  </div>

                  {/* Reading Template */}
                  <div className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
                    <div className="flex justify-center mb-3">
                      <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-blue-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                          />
                        </svg>
                      </div>
                    </div>
                    <h4 className="text-center font-semibold text-gray-800 mb-1">Reading - Comprehension</h4>
                    <p className="text-center text-gray-500 text-sm">Last edited: 5 days ago</p>
                  </div>

                  {/* Science Template */}
                  <div className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
                    <div className="flex justify-center mb-3">
                      <div className="h-10 w-10 bg-pink-100 rounded-lg flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-pink-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                          />
                        </svg>
                      </div>
                    </div>
                    <h4 className="text-center font-semibold text-gray-800 mb-1">Science - Experiment</h4>
                    <p className="text-center text-gray-500 text-sm">Last edited: 1 week ago</p>
                  </div>

                  {/* English Template */}
                  <div className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
                    <div className="flex justify-center mb-3">
                      <div className="h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-green-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                          />
                        </svg>
                      </div>
                    </div>
                    <h4 className="text-center font-semibold text-gray-800 mb-1">English - Creative Writing</h4>
                    <p className="text-center text-gray-500 text-sm">Last edited: 2 weeks ago</p>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-gray-700 text-center">
              The template library contains professionally designed lesson formats that instructional designers can
              customize with specialized syntax for content generation.
            </p>
          </div>

          {/* Generation Interface Example */}
          <div className="bg-white p-8 rounded-xl shadow mt-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-8">Generation Interface Example</h3>

            <div className="border border-gray-200 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg mb-6">
              {/* Generation Interface Header */}
              <div className="bg-gray-50 p-3 border-b border-gray-200 flex items-center">
                <div className="flex space-x-2 mr-3">
                  <div className="h-3 w-3 rounded-full bg-red-500"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                </div>
                <span className="text-gray-700 font-medium">Generation Interface</span>
              </div>

              {/* Generation Interface Body */}
              <div className="p-6 bg-white">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Left column - Generation Queue */}
                  <div className="lg:w-1/2">
                    <h4 className="font-bold text-gray-800 mb-4">Generation Queue</h4>

                    {/* Completed Lesson */}
                    <div className="bg-green-50 p-4 rounded-lg mb-3 flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="h-3 w-3 bg-green-500 rounded-full mr-3"></div>
                        <span className="text-gray-800">L001 - Grade 3 Math: Fractions</span>
                      </div>
                      <span className="text-green-600 text-sm font-medium">Completed</span>
                    </div>

                    {/* In Progress Lesson */}
                    <div className="bg-blue-50 p-4 rounded-lg mb-3 flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="h-3 w-3 bg-blue-500 rounded-full mr-3"></div>
                        <span className="text-gray-800">L002 - Grade 3 Math: Addition</span>
                      </div>
                      <span className="text-blue-600 text-sm font-medium">In Progress</span>
                    </div>

                    {/* Queued Lesson */}
                    <div className="bg-gray-50 p-4 rounded-lg flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="h-3 w-3 bg-gray-300 rounded-full mr-3"></div>
                        <span className="text-gray-800">L003 - Grade 3 Science: Plants</span>
                      </div>
                      <span className="text-gray-500 text-sm font-medium">Queued</span>
                    </div>
                  </div>

                  {/* Right column - Statistics */}
                  <div className="lg:w-1/2">
                    <h4 className="font-bold text-gray-800 mb-4">Statistics</h4>

                    {/* Progress Bar */}
                    <div className="mb-6">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Progress</span>
                        <span className="text-gray-800">33%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-purple-500 rounded-full" style={{ width: '33%' }}></div>
                      </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-purple-50 p-4 rounded-lg flex flex-col items-center">
                        <span className="text-purple-700 font-bold text-xl">1/3</span>
                        <span className="text-gray-600 text-sm">Completed</span>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-lg flex flex-col items-center">
                        <span className="text-blue-700 font-bold text-xl">~15m</span>
                        <span className="text-gray-600 text-sm">Est. Time</span>
                      </div>
                    </div>

                    {/* Download Button */}
                    <button className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-purple-700 transition-colors">
                      Download Complete
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-gray-700 text-center">
              The generation interface allows users to monitor the progress of lesson creation, track completion status,
              and download finished materials when ready.
            </p>
          </div>

          {/* Visual System & Interface Design */}
          <div className="bg-white p-8 rounded-xl shadow mt-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Visual System & Interface Design</h3>

            <div className="mb-8">
              <h4 className="text-xl font-bold text-gray-800 mb-4">1. Template Syntax System</h4>
              <p className="text-gray-700 mb-6">
                One of my key design challenges was creating a visual language that would clearly communicate different
                types of automation. Working with content specialists, I developed a syntax system using familiar word
                processing concepts:
              </p>

              <div className="border border-gray-200 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg mb-6">
                {/* Template Editor Header */}
                <div className="bg-gray-50 p-3 border-b border-gray-200 flex items-center">
                  <div className="flex space-x-2 mr-3">
                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                    <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  </div>
                  <span className="text-gray-700 font-medium">Template Editor</span>
                </div>

                {/* Template Editor Content - Side by Side */}
                <div className="flex flex-col md:flex-row">
                  {/* Left side - Template with Placeholders */}
                  <div className="p-4 md:w-1/2 border-r border-gray-200">
                    <div className="flex justify-between items-center mb-4">
                      <h5 className="font-semibold text-gray-700">Template with Placeholders</h5>
                      <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">Edit Mode</span>
                    </div>

                    <div className="bg-gray-50 p-4 rounded font-mono text-sm">
                      <p className="mb-4"># Introduction to {'{{TOPIC}}'}</p>

                      <p className="mb-2">
                        ## Subject: <span className="text-red-600">{'{{SUBJECT}}'}</span>
                      </p>

                      <p className="mb-2">
                        ## Grade Level: <span className="text-red-600">{'{{GRADE}}'}</span>
                      </p>

                      <p className="mb-4">
                        ## Duration: <span className="text-red-600">{'{{DURATION}}'}</span> minutes
                      </p>

                      <p className="mb-4 text-gray-500">---</p>

                      <p className="mb-2 text-blue-600">### Learning Objectives</p>

                      <p className="mb-4">By the end of this lesson, students will be able to:</p>

                      <p className="mb-4 bg-yellow-100 px-2">
                        - Generate 3 specific learning objectives for{' '}
                        <span className="text-red-600">{'{{SUBJECT}}'}</span>{' '}
                        <span className="text-red-600">{'{{TOPIC}}'}</span> appropriate for{' '}
                        <span className="text-red-600">{'{{GRADE}}'}</span>
                      </p>

                      <p className="mb-4 text-gray-500">---</p>

                      <p className="mb-2 text-blue-600">### Introduction</p>

                      <p className="mb-4 bg-yellow-100 px-2">
                        Generate an engaging introduction about <span className="text-red-600">{'{{TOPIC}}'}</span> that
                        includes a real-world example relevant for <span className="text-red-600">{'{{GRADE}}'}</span>{' '}
                        students
                      </p>

                      <p className="mb-4 text-gray-500">---</p>

                      <p className="mb-2 text-blue-600">### Main Activity</p>

                      <p className="mb-2">Materials needed:</p>

                      <p className="mb-4 text-red-600">{'{{MATERIALS}}'}</p>

                      <p className="mb-2">Instructions:</p>

                      <p className="bg-yellow-100 px-2">
                        Generate step-by-step instructions for a hands-on activity about{' '}
                        <span className="text-red-600">{'{{TOPIC}}'}</span>
                      </p>
                    </div>
                  </div>

                  {/* Right side - Filled Template Preview */}
                  <div className="p-4 md:w-1/2 bg-white">
                    <div className="flex justify-between items-center mb-4">
                      <h5 className="font-semibold text-gray-700">Filled Template Preview</h5>
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">Preview Mode</span>
                    </div>

                    <div className="bg-gray-50 p-4 rounded text-sm">
                      <p className="font-bold mb-4"># Introduction to Fractions</p>

                      <p className="mb-2">## Subject: Mathematics</p>

                      <p className="mb-2">## Grade Level: 3rd Grade</p>

                      <p className="mb-4">## Duration: 45 minutes</p>

                      <p className="mb-4 text-gray-500">---</p>

                      <p className="mb-2 font-semibold text-gray-800">### Learning Objectives</p>

                      <p className="mb-4">By the end of this lesson, students will be able to:</p>

                      <ul className="list-disc pl-6 mb-4 space-y-2">
                        <li>Identify fractions as parts of a whole</li>
                        <li>Represent fractions using visual models</li>
                        <li>Compare simple fractions (1/2, 1/4, 1/3)</li>
                      </ul>

                      <p className="mb-4 text-gray-500">---</p>

                      <p className="mb-2 font-semibold text-gray-800">### Introduction</p>

                      <p className="mb-4">
                        Imagine sharing a pizza with friends! When we cut a pizza into equal pieces, each piece
                        represents a fraction of the whole pizza. Today we'll explore how fractions help us share things
                        fairly and measure parts of a whole in our everyday lives.
                      </p>

                      <p className="mb-4 text-gray-500">---</p>

                      <p className="mb-2 font-semibold text-gray-800">### Main Activity</p>

                      <p className="mb-2">Materials needed:</p>

                      <ul className="list-disc pl-6 mb-4 space-y-1">
                        <li>Circle fraction manipulatives</li>
                        <li>Colored pencils</li>
                        <li>Fraction worksheets</li>
                      </ul>

                      <p className="mb-2">Instructions:</p>

                      <ol className="list-decimal pl-6 space-y-2">
                        <li>Distribute fraction circles to each student</li>
                        <li>Demonstrate how to create a whole using different pieces</li>
                        <li>Have students explore combining different fractions</li>
                        <li>Guide students in coloring the worksheet sections</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>

              {/* Color coding explanation */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 rounded bg-red-100 border border-red-200 flex items-center justify-center mr-3 mt-0.5">
                    <div className="h-2 w-2 rounded bg-red-500"></div>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Red text:</p>
                    <p className="text-gray-600">Content from spreadsheets (mail-merge)</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 rounded bg-blue-100 border border-blue-200 flex items-center justify-center mr-3 mt-0.5">
                    <div className="h-2 w-2 rounded bg-blue-500"></div>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Blue text:</p>
                    <p className="text-gray-600">Markdown formatting elements</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 rounded bg-yellow-100 border border-yellow-200 flex items-center justify-center mr-3 mt-0.5">
                    <div className="h-2 w-2 rounded bg-yellow-500"></div>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Yellow highlighting:</p>
                    <p className="text-gray-600">AI-generated content instructions</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 rounded bg-gray-100 border border-gray-200 flex items-center justify-center mr-3 mt-0.5">
                    <div className="h-2 w-2 rounded bg-gray-500"></div>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Gray text:</p>
                    <p className="text-gray-600">Section dividers and structural elements</p>
                  </div>
                </div>
              </div>

              {/* Template System Benefits */}
              <div className="bg-gray-50 p-6 rounded-xl">
                <h5 className="font-bold text-gray-800 mb-4">Template System Benefits</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-700">Consistent lesson structure across subjects</span>
                  </div>

                  <div className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-700">Clear visual differentiation of content types</span>
                  </div>

                  <div className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-700">Flexible generation instructions</span>
                  </div>

                  <div className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-700">Predictable output format</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Generation Workflow section */}
            <div className="mb-8">
              <h4 className="text-xl font-bold text-gray-800 mb-4">2. Generation Workflow</h4>
              <p className="text-gray-700 mb-6">
                I designed a step-by-step workflow that provided transparency and control:
              </p>

              {/* Try it yourself info box */}
              <div className="bg-indigo-50 p-6 rounded-xl mb-8">
                <div className="flex items-start">
                  <div className="bg-indigo-100 h-8 w-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    <span className="text-indigo-600 font-bold">?</span>
                  </div>
                  <div>
                    <h5 className="font-semibold text-indigo-700 mb-2">Try it yourself!</h5>
                    <p className="text-gray-700">
                      This wireframe is fully interactive. Click on the step numbers or use the navigation buttons to
                      walk through the entire generation workflow.
                    </p>
                  </div>
                </div>
              </div>

              {/* Workflow Wireframe */}
              <div className="border border-gray-200 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg mb-6">
                {/* Wireframe Header */}
                <div className="bg-gray-50 p-3 border-b border-gray-200 flex items-center">
                  <div className="flex space-x-2 mr-3">
                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                    <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  </div>
                  <span className="text-gray-700 font-medium">Generate lessons (interactive)</span>
                </div>

                {/* Step Indicators */}
                <div className="border-b border-gray-200 p-4">
                  <div className="flex flex-wrap justify-between items-center max-w-3xl mx-auto relative">
                    {/* Horizontal connecting lines */}
                    <div className="absolute top-1/2 w-full h-[1px] bg-gray-200 -z-10"></div>

                    {/* Active step line - only shows to the left of active step */}
                    <div
                      className="absolute top-1/2 left-0 h-[1px] bg-indigo-600 -z-10 transition-all duration-300"
                      style={{
                        width: `${Math.max(0, (currentStep - 1) * 20)}%`,
                      }}
                    ></div>

                    {/* Steps with connecting lines between them */}
                    {/* Step 1 */}
                    <div className="flex flex-col items-center z-10">
                      <div
                        className="h-12 w-12 rounded-full flex items-center justify-center font-bold mb-2 cursor-pointer transition-colors bg-indigo-600 text-white"
                        onClick={() => setCurrentStep(1)}
                      >
                        1
                      </div>
                      <span className="text-indigo-600 text-sm font-medium text-center">Upload template library</span>
                    </div>

                    {/* Step 2 */}
                    <div className="flex flex-col items-center z-10">
                      <div
                        className={`h-12 w-12 rounded-full flex items-center justify-center font-bold mb-2 cursor-pointer transition-colors ${currentStep >= 2 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'}`}
                        onClick={() => setCurrentStep(2)}
                      >
                        2
                      </div>
                      <span
                        className={`text-sm font-medium text-center ${currentStep >= 2 ? 'text-indigo-600' : 'text-gray-600'}`}
                      >
                        Upload spreadsheet
                      </span>
                    </div>

                    {/* Step 3 */}
                    <div className="flex flex-col items-center z-10">
                      <div
                        className={`h-12 w-12 rounded-full flex items-center justify-center font-bold mb-2 cursor-pointer transition-colors ${currentStep >= 3 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'}`}
                        onClick={() => setCurrentStep(3)}
                      >
                        3
                      </div>
                      <span
                        className={`text-sm font-medium text-center ${currentStep >= 3 ? 'text-indigo-600' : 'text-gray-600'}`}
                      >
                        Select content
                      </span>
                    </div>

                    {/* Step 4 */}
                    <div className="flex flex-col items-center z-10">
                      <div
                        className={`h-12 w-12 rounded-full flex items-center justify-center font-bold mb-2 cursor-pointer transition-colors ${currentStep >= 4 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'}`}
                        onClick={() => setCurrentStep(4)}
                      >
                        4
                      </div>
                      <span
                        className={`text-sm font-medium text-center ${currentStep >= 4 ? 'text-indigo-600' : 'text-gray-600'}`}
                      >
                        Select lessons
                      </span>
                    </div>

                    {/* Step 5 */}
                    <div className="flex flex-col items-center z-10">
                      <div
                        className={`h-12 w-12 rounded-full flex items-center justify-center font-bold mb-2 cursor-pointer transition-colors ${currentStep >= 5 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'}`}
                        onClick={() => setCurrentStep(5)}
                      >
                        5
                      </div>
                      <span
                        className={`text-sm font-medium text-center ${currentStep >= 5 ? 'text-indigo-600' : 'text-gray-600'}`}
                      >
                        Generate lessons
                      </span>
                    </div>

                    {/* Step 6 */}
                    <div className="flex flex-col items-center z-10">
                      <div
                        className={`h-12 w-12 rounded-full flex items-center justify-center font-bold mb-2 cursor-pointer transition-colors ${currentStep >= 6 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'}`}
                        onClick={() => setCurrentStep(6)}
                      >
                        6
                      </div>
                      <span
                        className={`text-sm font-medium text-center ${currentStep >= 6 ? 'text-indigo-600' : 'text-gray-600'}`}
                      >
                        Summary
                      </span>
                    </div>
                  </div>
                </div>

                {/* Main Content Area - Based on current step */}
                <div className="p-10 border-b border-gray-200">
                  {currentStep === 1 && (
                    <div className="max-w-lg mx-auto text-center">
                      <h3 className="text-xl font-bold text-gray-800 mb-4">Upload template library</h3>
                      <p className="text-gray-600 mb-8">Drag and drop template library here to upload.</p>

                      <p className="text-gray-500 mb-8">Template library should be in .docx format.</p>

                      <div className="mb-8 flex justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-16 w-16 text-gray-300"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                      </div>

                      <button className="px-6 py-2 bg-indigo-50 text-indigo-600 border border-indigo-200 hover:bg-indigo-100 rounded-lg transition-colors flex items-center mx-auto">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                          />
                        </svg>
                        Choose file
                      </button>

                      <p className="text-gray-500 mt-8">Upload your Word template library with automation syntax</p>
                    </div>
                  )}

                  {currentStep === 2 && (
                    <div className="max-w-lg mx-auto text-center">
                      <h3 className="text-xl font-bold text-gray-800 mb-4">Upload content spreadsheet</h3>
                      <p className="text-gray-600 mb-8">Drag and drop content spreadsheet here to upload.</p>

                      <p className="text-gray-500 mb-8">Spreadsheet should be in .xlsx format.</p>

                      <div className="mb-8 flex justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-16 w-16 text-gray-300"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1}
                            d="M5 3a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2H5zm0 0v2m0 0h14m0 0v14m-2-2H5m0-4h14m0-6H5"
                          />
                        </svg>
                      </div>

                      <button className="px-6 py-2 bg-indigo-50 text-indigo-600 border border-indigo-200 hover:bg-indigo-100 rounded-lg transition-colors flex items-center mx-auto">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                          />
                        </svg>
                        Choose file
                      </button>

                      <p className="text-gray-500 mt-8">Upload your content spreadsheet with lesson data</p>
                    </div>
                  )}

                  {currentStep === 3 && (
                    <div className="max-w-xl mx-auto">
                      <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">Select content tab</h3>

                      <p className="text-gray-600 mb-4">Choose which spreadsheet tab to use:</p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                        <div className="border border-indigo-200 bg-indigo-50 rounded-lg p-4 flex items-center">
                          <input
                            type="radio"
                            name="tab"
                            id="math"
                            className="h-4 w-4 text-indigo-600"
                            defaultChecked
                            readOnly
                          />
                          <label htmlFor="math" className="ml-2 text-gray-800 font-medium">
                            Grade 3 - Math
                          </label>
                        </div>

                        <div className="border border-gray-200 rounded-lg p-4 flex items-center">
                          <input type="radio" name="tab" id="science" className="h-4 w-4 text-indigo-600" />
                          <label htmlFor="science" className="ml-2 text-gray-800 font-medium">
                            Grade 3 - Science
                          </label>
                        </div>

                        <div className="border border-gray-200 rounded-lg p-4 flex items-center">
                          <input type="radio" name="tab" id="english" className="h-4 w-4 text-indigo-600" />
                          <label htmlFor="english" className="ml-2 text-gray-800 font-medium">
                            Grade 4 - English
                          </label>
                        </div>

                        <div className="border border-gray-200 rounded-lg p-4 flex items-center">
                          <input type="radio" name="tab" id="social" className="h-4 w-4 text-indigo-600" />
                          <label htmlFor="social" className="ml-2 text-gray-800 font-medium">
                            Grade 4 - Social Studies
                          </label>
                        </div>
                      </div>

                      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                        <div className="flex items-start">
                          <svg
                            className="h-5 w-5 text-green-600 mr-2 mt-0.5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 13l4 4L19 7"
                            ></path>
                          </svg>
                          <div>
                            <p className="font-medium text-green-800">Valid content structure</p>
                            <p className="text-green-700 text-sm">
                              All required columns are present in the selected tab.
                            </p>
                          </div>
                        </div>
                      </div>

                      <p className="text-gray-500 text-center">Choose which content tab to use for generation</p>
                    </div>
                  )}

                  {currentStep === 4 && (
                    <div className="max-w-xl mx-auto">
                      <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">Select lessons to generate</h3>

                      <div className="flex justify-between items-center mb-4">
                        <p className="text-gray-700">Found 12 lessons in Grade 3 - Math</p>
                        <div>
                          <button className="text-indigo-600 text-sm mr-3 hover:underline">All</button>
                          <button className="text-indigo-600 text-sm hover:underline">None</button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                        <div className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center">
                            <input type="checkbox" id="lesson1" className="h-4 w-4 text-indigo-600" checked readOnly />
                            <div className="ml-3">
                              <label htmlFor="lesson1" className="font-medium text-gray-800 block">
                                Lesson 1: Introduction to Fractions
                              </label>
                              <span className="text-gray-600 text-sm">Topic: Basic fraction concepts</span>
                            </div>
                          </div>
                        </div>

                        <div className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center">
                            <input type="checkbox" id="lesson2" className="h-4 w-4 text-indigo-600" checked readOnly />
                            <div className="ml-3">
                              <label htmlFor="lesson2" className="font-medium text-gray-800 block">
                                Lesson 2: Equivalent Fractions
                              </label>
                              <span className="text-gray-600 text-sm">Topic: Finding equivalent fractions</span>
                            </div>
                          </div>
                        </div>

                        <div className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center">
                            <input type="checkbox" id="lesson3" className="h-4 w-4 text-indigo-600" checked readOnly />
                            <div className="ml-3">
                              <label htmlFor="lesson3" className="font-medium text-gray-800 block">
                                Lesson 3: Comparing Fractions
                              </label>
                              <span className="text-gray-600 text-sm">Topic: Greater than and less than</span>
                            </div>
                          </div>
                        </div>

                        <div className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center">
                            <input type="checkbox" id="lesson4" className="h-4 w-4 text-indigo-600" />
                            <div className="ml-3">
                              <label htmlFor="lesson4" className="font-medium text-gray-800 block">
                                Lesson 4: Adding Fractions
                              </label>
                              <span className="text-gray-600 text-sm">Topic: Adding with like denominators</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mb-6">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600">Selected lessons: 3 of 12</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-indigo-600 rounded-full w-1/4"></div>
                        </div>
                      </div>

                      <p className="text-gray-500 text-center">Choose which lessons to generate</p>
                    </div>
                  )}

                  {currentStep === 5 && (
                    <div className="max-w-lg mx-auto text-center">
                      <h3 className="text-xl font-bold text-gray-800 mb-6">Generation in progress</h3>

                      <div className="mb-6">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600">Progress</span>
                          <span className="text-gray-800">67%</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-indigo-600 rounded-full" style={{ width: '67%' }}></div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-8">
                        <div className="bg-indigo-50 p-4 rounded-lg text-center">
                          <span className="text-indigo-700 font-bold text-xl">2/3</span>
                          <span className="text-gray-600 text-sm block">Completed</span>
                        </div>
                        <div className="bg-indigo-50 p-4 rounded-lg text-center">
                          <span className="text-indigo-700 font-bold text-xl">~1m</span>
                          <span className="text-gray-600 text-sm block">Est. remaining</span>
                        </div>
                      </div>

                      <div className="space-y-3 mb-8 text-left">
                        <div className="flex items-center">
                          <svg
                            className="h-5 w-5 text-green-500 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 13l4 4L19 7"
                            ></path>
                          </svg>
                          <span className="text-gray-700">Lesson 1: Introduction to Fractions - Completed</span>
                        </div>
                        <div className="flex items-center">
                          <svg
                            className="h-5 w-5 text-green-500 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 13l4 4L19 7"
                            ></path>
                          </svg>
                          <span className="text-gray-700">Lesson 2: Equivalent Fractions - Completed</span>
                        </div>
                        <div className="flex items-center">
                          <svg
                            className="animate-spin h-5 w-5 text-indigo-500 mr-2"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          <span className="text-gray-700">Lesson 3: Comparing Fractions - Processing</span>
                        </div>
                      </div>

                      <p className="text-gray-500 text-center">Please wait while your lessons are being generated</p>
                    </div>
                  )}

                  {currentStep === 6 && (
                    <div className="max-w-xl mx-auto">
                      <div className="bg-green-50 p-5 rounded-lg mb-8">
                        <div className="flex items-start">
                          <svg
                            className="h-6 w-6 text-green-600 mr-3 mt-0.5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 13l4 4L19 7"
                            ></path>
                          </svg>
                          <div>
                            <h3 className="text-xl font-bold text-green-800 mb-2">Generation Complete</h3>
                            <p className="text-green-700">
                              All 3 lessons have been generated successfully. You can download them individually or as a
                              package.
                            </p>
                          </div>
                        </div>
                      </div>

                      <h4 className="font-bold text-gray-800 mb-4 text-xl">Generated Lessons</h4>

                      <div className="space-y-4 mb-8">
                        <div className="border border-gray-200 rounded-lg p-4 flex justify-between items-center">
                          <div>
                            <h5 className="font-medium text-gray-800">Lesson 1: Introduction to Fractions</h5>
                            <p className="text-gray-500 text-sm">Generated: Just now • Size: 2.4 MB</p>
                          </div>
                          <div className="space-x-2">
                            <button className="px-4 py-1 bg-indigo-50 text-indigo-600 rounded hover:bg-indigo-100 transition-colors">
                              Preview
                            </button>
                            <button className="px-4 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors">
                              Download
                            </button>
                          </div>
                        </div>

                        <div className="border border-gray-200 rounded-lg p-4 flex justify-between items-center">
                          <div>
                            <h5 className="font-medium text-gray-800">Lesson 2: Equivalent Fractions</h5>
                            <p className="text-gray-500 text-sm">Generated: Just now • Size: 2.1 MB</p>
                          </div>
                          <div className="space-x-2">
                            <button className="px-4 py-1 bg-indigo-50 text-indigo-600 rounded hover:bg-indigo-100 transition-colors">
                              Preview
                            </button>
                            <button className="px-4 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors">
                              Download
                            </button>
                          </div>
                        </div>

                        <div className="border border-gray-200 rounded-lg p-4 flex justify-between items-center">
                          <div>
                            <h5 className="font-medium text-gray-800">Lesson 3: Comparing Fractions</h5>
                            <p className="text-gray-500 text-sm">Generated: Just now • Size: 2.6 MB</p>
                          </div>
                          <div className="space-x-2">
                            <button className="px-4 py-1 bg-indigo-50 text-indigo-600 rounded hover:bg-indigo-100 transition-colors">
                              Preview
                            </button>
                            <button className="px-4 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors">
                              Download
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row justify-between">
                        <button className="px-6 py-3 mb-3 sm:mb-0 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                            />
                          </svg>
                          Download All Lessons
                        </button>
                        <button className="px-6 py-3 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors">
                          Start New Generation
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Navigation Buttons */}
                <div className="p-4 flex justify-between">
                  <button
                    className={`px-6 py-2 rounded-lg transition-colors ${currentStep > 1 ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
                    onClick={() => currentStep > 1 && setCurrentStep(currentStep - 1)}
                  >
                    Previous
                  </button>
                  <button
                    className={`px-6 py-2 rounded-lg transition-colors ${currentStep < 6 ? 'bg-indigo-600 text-white hover:bg-indigo-700' : currentStep === 6 ? 'bg-green-600 text-white hover:bg-green-700' : ''}`}
                    onClick={() => currentStep < 6 && setCurrentStep(currentStep + 1)}
                  >
                    {currentStep < 6 ? 'Next' : 'Finish'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Technical Challenges Section */}
        <motion.section className="mb-16" {...fadeIn} transition={{ delay: 0.5 }}>
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Technical Challenges</h2>

          <motion.div
            className="h-1 w-24 mb-10 rounded-full"
            style={{
              background: 'linear-gradient(to right, #9333ea, #d94f9d)',
            }}
            initial={{ width: 0 }}
            animate={{ width: '6rem' }}
            transition={{ duration: 0.5, delay: 0.4 }}
          />

          <div className="bg-white p-8 rounded-xl shadow">
            <p className="text-gray-700 mb-8">
              Creating an effective AI teaching assistant required overcoming several technical hurdles:
            </p>

            <div className="space-y-6 mb-6">
              <div className="flex items-start">
                <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold mr-4 mt-1 flex-shrink-0">
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
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">Curriculum Alignment</h3>
                  <p className="text-gray-700">
                    Training models to accurately follow educational standards across different regions required
                    developing a comprehensive taxonomy of educational objectives and standards.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold mr-4 mt-1 flex-shrink-0">
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
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">Content Diversity</h3>
                  <p className="text-gray-700">
                    Generating inclusive materials that represent different cultural contexts and learning styles
                    required careful prompt engineering and diverse training datasets.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold mr-4 mt-1 flex-shrink-0">
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
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">Age-Appropriate Content</h3>
                  <p className="text-gray-700">
                    Developing filtering systems to ensure all generated content was suitable for the target age group
                    required multiple layers of content safety measures.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Results Section */}
        <motion.section className="mb-16" {...fadeIn} transition={{ delay: 0.6 }}>
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Results & Impact</h2>

          <motion.div
            className="h-1 w-24 mb-10 rounded-full"
            style={{
              background: 'linear-gradient(to right, #9333ea, #d94f9d)',
            }}
            initial={{ width: 0 }}
            animate={{ width: '6rem' }}
            transition={{ duration: 0.5, delay: 0.5 }}
          />

          <div className="bg-white p-8 rounded-xl shadow">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <motion.div
                className="bg-green-50 rounded-lg p-6 text-center"
                whileHover={{ scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                <div className="text-4xl font-bold text-green-600 mb-2">75%</div>
                <div className="text-gray-800 font-medium">Reduction in lesson prep time</div>
              </motion.div>

              <motion.div
                className="bg-blue-50 rounded-lg p-6 text-center"
                whileHover={{ scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                <div className="text-4xl font-bold text-blue-600 mb-2">85%</div>
                <div className="text-gray-800 font-medium">Teacher satisfaction rate</div>
              </motion.div>

              <motion.div
                className="bg-purple-50 rounded-lg p-6 text-center"
                whileHover={{ scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                <div className="text-4xl font-bold text-purple-600 mb-2">12,000+</div>
                <div className="text-gray-800 font-medium">Active users</div>
              </motion.div>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl mb-8">
              <blockquote className="text-lg italic text-gray-700 border-l-4 border-purple-500 pl-4">
                "LessonLoom has revolutionized how I prepare for my classes. What used to take hours now takes minutes,
                and the quality of the materials is consistently excellent. My students are more engaged than ever."
              </blockquote>
              <div className="text-right mt-2 text-gray-600">- Jennifer K., High School English Teacher</div>
            </div>

            <p className="text-gray-700">
              Lesson Loom has been adopted by over 200 schools and educational organizations, dramatically reducing the
              time teachers spend on material preparation. User research shows that educators are able to create more
              personalized content for their students, leading to improved engagement and learning outcomes. The
              platform continues to grow, with new features being added based on ongoing user feedback.
            </p>
          </div>
        </motion.section>

        <CaseStudyFooter />
      </main>
      <ScrollToTopButton targetId="intro-section" />

      {/* Voice Chat Toggle */}
      <CaseStudyVoiceToggle
        caseStudyId="lessonloom"
        caseStudyTitle="LessonLoom: Automated Lesson Generation Platform"
        limits={{
          maxPremiumMinutes: 3, // 3 minutes premium per session
          maxDailyConversations: 5, // 5 conversations per day
          premiumCooldownHours: 1, // 1 hour between premium sessions
        }}
      />
    </div>
  );
}
