'use client';

import React from 'react';


interface Skill {
  name: string;
  level: number;
}

// Skill component
const Skill = ({ icon, name }: { icon: React.ReactNode; name: string }) => {
  return (
    <div className="flex items-center gap-3">
      <span className="text-accent text-xl">{icon}</span>
      <span className="font-medium">{name}</span>
    </div>
  );
};

// Main component
const About = () => {
  return (
    <section id="about" className="section-padding bg-gray-50">
      <div className="container mx-auto px-6 md:px-8">
        <h2 className="section-title text-3xl font-bold mb-12">About me</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h3 className="text-2xl font-bold mb-6">
              Passionate <span className="text-accent">Developer</span> & <span className="text-accent">Designer</span>
            </h3>

            <div className="space-y-6">
              <p className="text-muted leading-relaxed font-normal">
                I'm a front-end developer with a strong background in modern web technologies and a passion for creating
                beautiful, responsive, and user-friendly applications.
              </p>

              <p className="text-muted leading-relaxed font-normal">
                With over 3 years of experience, I've worked with a variety of technologies and frameworks including
                React, Next.js, TypeScript, Tailwind CSS, and more. I enjoy working with clients to understand their
                needs and deliver solutions that exceed their expectations.
              </p>

              <p className="text-muted leading-relaxed font-normal">
                My approach combines technical excellence with design thinking to create applications that not only work
                flawlessly but also look great and provide an excellent user experience.
              </p>
            </div>

            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3">
                <span className="font-bold">Location:</span>
                <span className="font-normal">San Francisco, CA</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-bold">Email:</span>{' '}
                <a href="mailto:imran@example.com" className="text-accent hover:underline font-normal">
                  imran@example.com
                </a>
              </div>
            </div>
          </div>

          <div className="space-y-10">
            <div>
              <h3 className="text-2xl font-bold mb-6">My Skills</h3>

              <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {/* Skill icons placeholder */}
                  <Skill icon={<span>⚛️</span>} name="React" />
                  <Skill icon={<span>🔄</span>} name="Next.js" />
                  <Skill icon={<span>📱</span>} name="Responsive Design" />
                  <Skill icon={<span>🎨</span>} name="UI/UX Design" />
                  <Skill icon={<span>💻</span>} name="TypeScript" />
                  <Skill icon={<span>🌊</span>} name="Tailwind CSS" />
                  <Skill icon={<span>🔍</span>} name="SEO" />
                  <Skill icon={<span>🧪</span>} name="Jest" />
                  <Skill icon={<span>📊</span>} name="Data Visualization" />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-6">My Interests</h3>
              <div className="prose prose-muted max-w-none">
                <p className="text-muted leading-relaxed font-normal">
                  Beyond coding, I have a deep interest in photography, hiking, and exploring new technologies. I
                  believe that diverse interests help drive creativity and innovation in my work.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
