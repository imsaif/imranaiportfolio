import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

/**
 * Navigation bar for floating between case study sections.
 * @returns {JSX.Element}
 */
export const sections = [
  { id: 'introduction', label: 'Introduction' },
  { id: 'overview', label: 'Project Overview' },
  { id: 'challenge', label: 'Challenge' },
  { id: 'process', label: 'User Research' },
  { id: 'design-process', label: 'Design Process' },
  { id: 'lessons', label: 'Lessons' },
  { id: 'results', label: 'Results' },
];

export const FloatingNavBar: React.FC = () => {
  const [active, setActive] = useState<string>(sections[0].id);

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
};
