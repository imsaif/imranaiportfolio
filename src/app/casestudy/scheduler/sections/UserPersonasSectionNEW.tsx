import { motion } from 'framer-motion';
import { useState } from 'react';

/**
 * Persona type definition
 */
type Persona = {
  name: string;
  age: number;
  role: string;
  goals: string;
  painPoints: string;
};

const personas: Persona[] = [
  {
    name: 'Anne',
    age: 38,
    role: 'Academic Director',
    goals: 'Ensure curriculum quality and efficient, adaptable schedules.',
    painPoints: '"We spend more time creating timetables than we do reviewing their quality."',
  },
  {
    name: 'Jake',
    age: 32,
    role: 'Digital Production',
    goals: 'Generate error-free timetables efficiently, minimize manual work',
    painPoints: '"When teacher distribution changes, we have to recreate timetables from scratch."',
  },
  {
    name: 'Laura',
    age: 42,
    role: 'Schools Team',
    goals: 'Optimize teacher assignments, ensure appropriate specialist rotations',
    painPoints: '"We need teachers teaching what they\'re qualified for."',
  },
];

/**
 * Flip card for a single persona
 */
function PersonaCard({ persona }: { persona: Persona }) {
  const [flipped, setFlipped] = useState(false);
  const [hovered, setHovered] = useState(false);

  // Assign color classes based on persona name
  let borderColor = '';
  let bgColor = '';
  if (persona.name === 'Anne') {
    borderColor = 'border-blue-300';
    bgColor = 'bg-blue-50';
  } else if (persona.name === 'Jake') {
    borderColor = 'border-purple-300';
    bgColor = 'bg-purple-50';
  } else if (persona.name === 'Laura') {
    borderColor = 'border-pink-300';
    bgColor = 'bg-pink-50';
  }

  return (
    <div
      className="relative w-full h-64 sm:w-72 cursor-pointer group focus:outline-none"
      tabIndex={0}
      aria-pressed={flipped}
      onClick={() => setFlipped(f => !f)}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') setFlipped(f => !f);
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      role="button"
    >
      <motion.div className="w-full h-full" style={{ perspective: 1200 }}>
        <motion.div
          className="relative w-full h-full"
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0.2, 0.2, 1] }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Front */}
          <div
            className={`absolute w-full h-full ${bgColor} ${borderColor} border-2 rounded-xl shadow-md flex flex-col items-center justify-center p-6`}
            style={{ backfaceVisibility: 'hidden' }}
          >
            {/* Name */}
            <div className="text-gray-900 font-semibold text-2xl mb-2 w-full text-center tracking-tight">
              {persona.name}
            </div>
            {/* Divider and Role */}
            <div className="flex justify-center items-center mb-2">
              <span className="block w-8 h-0.5 bg-gray-200 mx-2" />
            </div>
            <div className="text-sm text-gray-500 italic mb-4 text-center">{persona.role}</div>
            {/* Age */}
            <div className="text-gray-500 text-sm mb-4">Age {persona.age}</div>
            {/* Goals */}
            <div className="text-gray-700 text-base text-center leading-snug font-medium max-w-xs mx-auto">
              {persona.goals}
            </div>
          </div>
          {/* Back */}
          <div
            className={`absolute w-full h-full ${bgColor} ${borderColor} border-2 rounded-xl shadow-md flex flex-col items-center justify-center p-6`}
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          >
            <div className="text-purple-700 font-bold text-lg mb-2 w-full text-center">Pain Points</div>
            <div className="text-gray-700 text-base italic w-full text-center">{persona.painPoints}</div>
          </div>
        </motion.div>
      </motion.div>
      {/* Tap to flip button on hover */}
      {hovered && !flipped && (
        <button
          className={`absolute z-20 left-1/2 -translate-x-1/2 bottom-6 px-5 py-2 text-xs rounded-full shadow-md font-medium text-white focus:outline-none
            ${persona.name === 'Anne' ? 'bg-blue-500' : persona.name === 'Jake' ? 'bg-purple-500' : 'bg-pink-500'}`}
          tabIndex={-1}
          aria-hidden
          style={{ pointerEvents: 'none' }}
        >
          Tap to flip
        </button>
      )}
    </div>
  );
}

/**
 * User Personas Section with flip cards
 */
const UserPersonasSection: React.FC = () => {
  return (
    <section id="user-personas" className="flex-1">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex flex-col gap-8 max-w-5xl mx-auto border border-gray-200 bg-white rounded-xl px-8 py-10"
      >
        <p className="text-gray-700 mb-8 max-w-2xl">
          Through this research, I developed three key personas representing the primary users and stakeholders of the
          EduScheduler system.
        </p>
        <div className="w-full flex flex-col items-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
            {personas.map(persona => (
              <PersonaCard key={persona.name} persona={persona} />
            ))}
          </div>
        </div>
        {/* Key Pain Points Identified Section */}
        <div className="mt-12">
          <h3 className="text-lg font-bold text-gray-900 mb-6 text-left ml-1">Key Pain Points Identified</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Process Issues */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 shadow-sm flex flex-col">
              <div className="flex items-center mb-3">
                <svg
                  className="w-6 h-6 text-blue-400 mr-2"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2a4 4 0 014-4h4" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5v2a4 4 0 004 4h4" />
                </svg>
                <span className="font-semibold text-blue-700 text-lg">Process Issues</span>
              </div>
              <ul className="list-disc pl-5 text-gray-700 space-y-2 text-sm">
                <li>Manual timetable creation takes 2-3 weeks</li>
                <li>Each specialist rotation requires separate configuration</li>
                <li>Changes require restarting entire process</li>
                <li>86% of staff time spent on data entry</li>
                <li>Physical classroom constraints ignored</li>
              </ul>
            </div>
            {/* Technical Limitations */}
            <div className="bg-purple-50 border border-purple-200 rounded-xl p-6 shadow-sm flex flex-col">
              <div className="flex items-center mb-3">
                <svg
                  className="w-6 h-6 text-purple-400 mr-2"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m4 0h-1v-4h-1m4 0h-1v-4h-1" />
                </svg>
                <span className="font-semibold text-purple-700 text-lg">Technical Limitations</span>
              </div>
              <ul className="list-disc pl-5 text-gray-700 space-y-2 text-sm">
                <li>Current system cannot handle more than 12 teaching tracks</li>
                <li>No way to verify rule compliance</li>
                <li>Teacher utilization at only 68% of optimal capacity</li>
                <li>23% of schedules contain errors</li>
                <li>Teacher specializations not considered</li>
              </ul>
            </div>
            {/* Resource Constraints */}
            <div className="bg-pink-50 border border-pink-200 rounded-xl p-6 shadow-sm flex flex-col">
              <div className="flex items-center mb-3">
                <svg
                  className="w-6 h-6 text-pink-400 mr-2"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a5 5 0 00-10 0v2a5 5 0 0010 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 17v2m0 0h-2m2 0h2" />
                </svg>
                <span className="font-semibold text-pink-700 text-lg">Resource Constraints</span>
              </div>
              <ul className="list-disc pl-5 text-gray-700 space-y-2 text-sm">
                <li>Textbook sharing not optimized (12% higher costs)</li>
                <li>Teacher utilization at only 68% of optimal capacity</li>
                <li>Specialist teachers often double-booked</li>
                <li>Teacher specializations not considered</li>
                <li>Staff time spent on data entry</li>
              </ul>
            </div>
          </div>
        </div>
        {/* Design Requirements Section */}
        <div className="mt-16">
          <h3 className="text-lg font-bold text-gray-900 mb-6 text-left ml-1">Design Requirements</h3>
          <p className="text-gray-700 mb-6 text-left ml-1 max-w-2xl">
            Based on this research, I established clear design requirements to guide the solution:
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-xl shadow-sm">
              <thead>
                <tr className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 border-b border-gray-200">
                    Requirement Category
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 border-b border-gray-200">
                    Requirement
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 border-b border-gray-200">
                    Description
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 border-b border-gray-200">
                    User Need Addressed
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-blue-50 transition">
                  <td className="px-4 py-3 align-top text-sm font-medium text-blue-700 whitespace-nowrap">
                    Plan Generation &amp; Management
                  </td>
                  <td className="px-4 py-3 align-top text-sm text-gray-900 font-semibold">
                    Automated Timetable Generation
                  </td>
                  <td className="px-4 py-3 align-top text-sm text-gray-700">
                    System must generate conflict-free timetables based on defined rules and constraints
                  </td>
                  <td className="px-4 py-3 align-top text-sm text-gray-600">
                    Digital Production spends 2-3 weeks manually creating timetables
                  </td>
                </tr>
                <tr className="hover:bg-purple-50 transition">
                  <td className="px-4 py-3 align-top text-sm font-medium text-purple-700 whitespace-nowrap">
                    Rule Violation Management
                  </td>
                  <td className="px-4 py-3 align-top text-sm text-gray-900 font-semibold">Violation Categorization</td>
                  <td className="px-4 py-3 align-top text-sm text-gray-700">
                    Clearly categorize by severity (Hard/Medium/Soft)
                  </td>
                  <td className="px-4 py-3 align-top text-sm text-gray-600">
                    23% of schedules contain errors when created manually
                  </td>
                </tr>
                <tr className="hover:bg-pink-50 transition">
                  <td className="px-4 py-3 align-top text-sm font-medium text-pink-700 whitespace-nowrap">
                    View Flexibility
                  </td>
                  <td className="px-4 py-3 align-top text-sm text-gray-900 font-semibold">Multiple Perspectives</td>
                  <td className="px-4 py-3 align-top text-sm text-gray-700">
                    Support both grade/stream view and teacher view
                  </td>
                  <td className="px-4 py-3 align-top text-sm text-gray-600">
                    Different stakeholders need different perspectives
                  </td>
                </tr>
                <tr className="hover:bg-green-50 transition">
                  <td className="px-4 py-3 align-top text-sm font-medium text-green-700 whitespace-nowrap">
                    Resource Optimization
                  </td>
                  <td className="px-4 py-3 align-top text-sm text-gray-900 font-semibold">Book-Sharing Scheduling</td>
                  <td className="px-4 py-3 align-top text-sm text-gray-700">
                    Support constraints for textbook sharing between grades
                  </td>
                  <td className="px-4 py-3 align-top text-sm text-gray-600">
                    Textbook sharing not optimized, 12% higher procurement costs
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default UserPersonasSection;
