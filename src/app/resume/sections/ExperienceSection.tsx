import { motion } from 'framer-motion';

interface Experience {
  title: string;
  company: string;
  duration: string;
  location: string;
  description: string;
  skills: string[];
}

interface ExperienceSectionProps {
  experience: Experience[];
}

export function ExperienceSection({ experience }: ExperienceSectionProps) {
  // Helper function to render skills list
  const renderSkills = (skills?: string[]) => {
    if (!skills || skills.length === 0) return null;
    return (
      <ul className="mt-3 flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <li
            key={index}
            className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-xs font-medium px-3 py-1 rounded-full border border-gray-300 dark:border-gray-600"
          >
            {skill}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mb-20"
    >
      <div className="space-y-10">
        {experience.map((job, index) => (
          <div
            key={index}
            className="relative pl-10 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-1 before:bg-gray-300 dark:before:bg-gray-600 last:before:h-[calc(100%-2rem)] first:before:top-5 p-6 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200 border border-gray-200 dark:border-gray-700 bg-white shadow-sm"
          >
            <div className="absolute left-1 top-2.5 w-5 h-5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full border-4 border-white dark:border-gray-900"></div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">{job.title}</h3>
            <p className="text-base font-medium text-gray-600 dark:text-gray-400">{job.company}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
              {job.duration} | {job.location}
            </p>
            <p className="text-base mb-3 text-gray-700 dark:text-gray-300">{job.description}</p>
            {renderSkills(job.skills)}
          </div>
        ))}
      </div>
    </motion.div>
  );
}