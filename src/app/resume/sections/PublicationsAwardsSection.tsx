import { motion } from 'framer-motion';

interface Publication {
  role: string;
  title: string;
  date: string;
  description: string;
}

interface Award {
  title: string;
  issuer: string;
  date: string;
  description?: string;
  associatedWith?: string;
}

interface Certification {
  name: string;
  issuer: string;
  date: string;
  id?: string;
  skills?: string[];
}

interface PublicationsAwardsSectionProps {
  publications: Publication[];
  awards: Award[];
  certifications: Certification[];
}

export function PublicationsAwardsSection({ publications, awards, certifications }: PublicationsAwardsSectionProps) {
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
    >
      <div className="space-y-12">
        {/* Publications Section */}
        {publications.length > 0 && (
          <div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Publications</h3>
            <div className="space-y-6">
              {publications.map((pub, index) => (
                <div
                  key={index}
                  className="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm transition duration-200 ease-in-out hover:shadow-lg hover:border-purple-300 dark:hover:border-purple-600"
                >
                  <h4 className="text-lg font-bold text-gray-800 dark:text-white">{pub.role}</h4>
                  <p className="text-base font-medium text-gray-600 dark:text-gray-400 italic">
                    {pub.title} · {pub.date}
                  </p>
                  <p className="mt-2 text-sm text-gray-700 dark:text-gray-300 leading-snug whitespace-pre-line">
                    {pub.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Honors & Awards Section */}
        {awards.length > 0 && (
          <div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Honors & Awards</h3>
            <div className="space-y-6">
              {awards.map((award, index) => (
                <div
                  key={index}
                  className="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm transition duration-200 ease-in-out hover:shadow-lg hover:border-purple-300 dark:hover:border-purple-600"
                >
                  <h4 className="text-lg font-bold text-gray-800 dark:text-white">{award.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Issued by {award.issuer} · {award.date}
                  </p>
                  {award.associatedWith && (
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                      Associated with {award.associatedWith}
                    </p>
                  )}
                  {award.description && (
                    <p className="mt-2 text-sm text-gray-700 dark:text-gray-300 leading-snug">{award.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Licenses & Certifications Section */}
        {certifications.length > 0 && (
          <div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Licenses & Certifications</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {certifications.map((cert, index) => (
                <div
                  key={index}
                  className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700/50 shadow-sm transition duration-200 ease-in-out hover:shadow-md hover:ring-1 hover:ring-purple-200 dark:hover:ring-purple-600/50"
                >
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-white">{cert.name}</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Issued by {cert.issuer} · {cert.date}
                  </p>
                  {cert.id && <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">Credential ID: {cert.id}</p>}
                  {renderSkills(cert.skills)}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}