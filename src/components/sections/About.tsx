'use client';

import React from 'react';

import { SectionTitle } from '../ui/SectionTitle';

const About = () => {
  return (
    <section id="about" className="section-padding bg-gray-50">
      <div className="container mx-auto px-6 md:px-8">
        <div className="max-w-4xl mx-auto">
          <SectionTitle>About Me</SectionTitle>

          <div className="bg-white p-8 rounded-xl shadow-sm mb-8">
            <p className="text-lg text-muted leading-relaxed mb-4">
              I'm a developer and designer focused on creating intuitive, accessible, and impactful digital experiences.
              With expertise in modern web technologies, I build solutions that balance technical excellence with user needs.
            </p>
            <p className="text-muted leading-relaxed">
              My approach combines technical knowledge with design thinking to deliver products that not only work flawlessly but also delight users.
            </p>
          </div>

          <div className="mt-16 text-center">
            <p className="text-muted italic text-lg">"The best way to predict the future is to create it."</p>
            <p className="text-sm mt-2">— Alan Kay</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
