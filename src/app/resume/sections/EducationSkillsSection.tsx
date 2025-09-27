import { motion } from 'framer-motion';

interface Education {
  institution: string;
  degree: string;
  field?: string;
  duration: string;
  skills?: string[];
}

interface EducationSkillsSectionProps {
  education: Education[];
  skills: string[];
}

export function EducationSkillsSection({ education, skills }: EducationSkillsSectionProps) {
  // Helper function to render skills list
  const renderSkills = (skillsList?: string[]) => {
    if (!skillsList || skillsList.length === 0) return null;
    return (
      <ul className="mt-3 flex flex-wrap gap-2">
        {skillsList.map((skill, index) => (
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
      <div className="space-y-12">
        {/* Education Section */}
        <div>
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Education</h3>
          <div className="space-y-6">
            {education.map((edu, index) => (
              <div
                key={index}
                className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700/50 shadow-sm transition duration-200 ease-in-out hover:shadow-md hover:ring-1 hover:ring-purple-200 dark:hover:ring-purple-600/50"
              >
                <h4 className="text-xl font-bold text-gray-800 dark:text-white">{edu.institution}</h4>
                <p className="text-base font-semibold text-gray-700 dark:text-gray-100">
                  {edu.degree}
                  {edu.field ? `, ${edu.field}` : ''}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{edu.duration}</p>
                {renderSkills(edu.skills)}
              </div>
            ))}
          </div>
        </div>

        {/* Skills Section */}
        <div>
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Skills</h3>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
            <ul className="flex flex-wrap gap-3">
              {skills.map((skill, index) => (
                <li
                  key={index}
                  className="bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 text-sm font-semibold px-4 py-2 rounded-full border border-blue-200 dark:border-blue-700 shadow-sm"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
}