'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

import { ArrowLeft } from '@/components/Icons';
import { SectionTitle } from '@/components/ui/SectionTitle';

export default function LessonLoomContent() {
  return (
    <main className="pt-36 pb-16">
      <div className="container mx-auto px-6">
        <nav className="mb-12">
          <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span>Back to Portfolio</span>
          </Link>
        </nav>

        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <SectionTitle
              title="LessonLoom: Automated Lesson Generation Platform"
              subtitle="How we redesigned educational content creation with AI"
            />
          </motion.div>

          <div className="mt-16 prose prose-lg max-w-none">
            <motion.p
              className="lead text-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              As a Product Designer at LessonLoom, I led a design process that revolutionized how educational materials
              are created using AI and templating systems. The result was an intuitive interface that empowers educators
              to create high-quality content at scale.
            </motion.p>

            <div className="my-12 bg-gray-50 p-8 rounded-lg border border-gray-200 shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Project Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-indigo-700">Role</h3>
                  <p>Product Designer</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-indigo-700">Organization</h3>
                  <p>NewGlobe</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-indigo-700">Technologies</h3>
                  <p>Vue.js, .NET Core, Python, Azure OpenAI, AWS S3</p>
                </div>
              </div>
            </div>

            <div className="my-16 relative rounded-xl overflow-hidden">
              <div className="aspect-video bg-gray-100 flex items-center justify-center">
                <Image
                  src="/projects/dashboard.jpg"
                  alt="LessonLoom Platform"
                  width={1200}
                  height={675}
                  className="w-full h-auto rounded-xl shadow-lg"
                />
              </div>
              <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg shadow-sm">
                <p className="text-sm font-medium">LessonLoom Dashboard</p>
              </div>
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              viewport={{ once: true }}
              className="mt-16"
            >
              The Challenge
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              viewport={{ once: true }}
            >
              NewGlobe, a global education organization, faced significant obstacles when creating teaching materials
              across multiple countries:
            </motion.p>
            <motion.ul
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <li>
                <strong>Time-intensive process:</strong> Content teams spent months developing customized teacher guides
              </li>
              <li>
                <strong>Resource constraints:</strong> Skilled curriculum designers were pulled into repetitive
                formatting tasks
              </li>
              <li>
                <strong>Quality consistency:</strong> Materials varied based on individual writers' interpretations
              </li>
              <li>
                <strong>Localization bottlenecks:</strong> Adapting content for different regions created expansion
                delays
              </li>
            </motion.ul>

            <div className="bg-indigo-50 p-6 border-l-4 border-indigo-500 my-8 rounded-r-lg shadow-sm">
              <p>
                Content creators needed a solution that would free them from tedious formatting work while maintaining
                their pedagogical expertise in the process.
              </p>
            </div>

            {/* All instance of CourseForge have been replaced with LessonLoom */}
          </div>
        </div>
      </div>
    </main>
  );
}
