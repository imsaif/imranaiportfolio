'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import React from 'react';
import type { FC } from 'react';
import { FaUserTie, FaTools, FaRegCalendarAlt, FaQuoteLeft } from 'react-icons/fa';

/**
 * CaseStudyPageProps defines the structure for case study content.
 */
export type CaseStudyPageProps = {
  title: string;
  subtitle: string;
  heroImage: string;
  cta: string;
  highlights: { icon: React.ReactNode; label: string; value: string }[];
  sections: { heading: string; content: string }[];
  testimonial: { quote: string; author: string; role: string };
  gallery: { src: string; alt: string }[];
  contactCta: string;
};

const caseStudyData: CaseStudyPageProps = {
  title: 'Next-Gen Portfolio Experience',
  subtitle: 'A modern, animated, and accessible case study presentation inspired by the best of Framer.com',
  heroImage: '/images/casestudy/newproject/hero.jpg', // Placeholder
  cta: 'See Live Demo',
  highlights: [
    { icon: <FaUserTie className="text-blue-500 text-2xl" />, label: 'Role', value: 'Lead Designer & Developer' },
    {
      icon: <FaTools className="text-purple-500 text-2xl" />,
      label: 'Tech',
      value: 'React, Next.js, Framer Motion, Tailwind CSS',
    },
    { icon: <FaRegCalendarAlt className="text-pink-500 text-2xl" />, label: 'Timeline', value: '2024' },
  ],
  sections: [
    {
      heading: 'Challenge',
      content:
        'How do you create a portfolio case study that is both visually stunning and easy to update, while ensuring accessibility and performance?',
    },
    {
      heading: 'Solution',
      content:
        'We designed a modular, animation-rich template using Framer Motion and Tailwind CSS, focusing on clarity, responsiveness, and subtle interactivity.',
    },
    {
      heading: 'Process',
      content:
        '1. Researched top Framer.com templates. 2. Defined a clean, sectioned layout. 3. Implemented with React, TypeScript, and Framer Motion. 4. Optimized for accessibility and performance.',
    },
    {
      heading: 'Results',
      content: 'A beautiful, maintainable case study page that can be easily updated and reused for future projects.',
    },
  ],
  testimonial: {
    quote:
      'This template made my portfolio stand out and helped me land more clients. The animations and layout are world-class!',
    author: 'Imran Mohammed',
    role: 'Founder, ImranAI Studio',
  },
  gallery: [
    { src: '/images/casestudy/newproject/shot1.jpg', alt: 'Screenshot 1' },
    { src: '/images/casestudy/newproject/shot2.jpg', alt: 'Screenshot 2' },
    { src: '/images/casestudy/newproject/shot3.jpg', alt: 'Screenshot 3' },
  ],
  contactCta: 'Ready to build your own? Contact me for a custom portfolio!',
};

/**
 * CaseStudyPage - A modern, animated case study template.
 */
export const CaseStudyPage: FC = () => {
  const { title, subtitle, heroImage, highlights, sections, testimonial, gallery } = caseStudyData;

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative w-full h-[70vh] flex items-center justify-center overflow-hidden"
      >
        <Image src={heroImage} alt={title} fill className="object-cover object-center brightness-90" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent" />
        <div className="relative z-10 text-center w-full px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg mb-4">{title}</h1>
          <p className="text-lg md:text-2xl text-white/90 font-medium max-w-2xl mx-auto mb-8">{subtitle}</p>
        </div>
      </motion.section>

      {/* Project Highlights */}
      <section className="max-w-4xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        {highlights.map((item, idx) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="flex flex-col items-center bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow p-8 border-t-4 border-blue-400"
          >
            <div className="mb-3">{item.icon}</div>
            <h3 className="text-gray-700 font-semibold mb-1 text-lg">{item.label}</h3>
            <p className="text-gray-900 text-base text-center">{item.value}</p>
          </motion.div>
        ))}
      </section>

      {/* Story Sections */}
      <main className="max-w-3xl mx-auto px-4 pb-20">
        {sections.map((section, idx) => (
          <motion.section
            key={section.heading}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.15 }}
            className="mb-16"
          >
            <div className="flex items-center mb-4">
              <span className="h-8 w-1 bg-gradient-to-b from-blue-500 to-purple-400 rounded-full mr-4" />
              <h2 className="text-2xl md:text-3xl font-bold text-blue-700 capitalize">{section.heading}</h2>
            </div>
            <p className="text-gray-800 text-lg leading-relaxed bg-white/80 rounded-lg p-5 shadow">{section.content}</p>
          </motion.section>
        ))}

        {/* Testimonial/Quote Block */}
        <motion.section
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mb-20"
        >
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 shadow flex flex-col items-center">
            <FaQuoteLeft className="text-blue-400 text-3xl mb-4" />
            <blockquote className="text-xl text-gray-700 italic text-center mb-4">“{testimonial.quote}”</blockquote>
            <div className="text-gray-900 font-semibold">{testimonial.author}</div>
            <div className="text-gray-500 text-sm">{testimonial.role}</div>
          </div>
        </motion.section>

        {/* Gallery/Media Section */}
        <motion.section
          id="gallery"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-20"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-blue-700 mb-6">Gallery</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {gallery.map(img => (
              <div key={img.src} className="relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow">
                <Image src={img.src} alt={img.alt} fill className="object-cover object-center" />
              </div>
            ))}
          </div>
        </motion.section>
      </main>
    </div>
  );
};

export default CaseStudyPage;
