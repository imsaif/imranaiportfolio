import { motion } from 'framer-motion';
import { MdGroup } from 'react-icons/md';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

export function RoleCollaborationSection() {
  return (
    <motion.div {...fadeIn} className="max-w-4xl mx-auto">
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">My Role & Collaboration</h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          As the lead Product Designer, I owned the end-to-end user experience—from understanding educator needs to designing interfaces that make AI-assisted lesson generation feel natural and trustworthy.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0 }}
          className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-6 border border-blue-100"
        >
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <MdGroup className="w-5 h-5 text-blue-600" />
            Design Direction
          </h3>
          <p className="text-gray-700 text-sm">
            Owned the overall UX direction by conducting research with 8 instructional designers, defining core workflows, and establishing design principles for AI-assisted tools in education
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-6 border border-purple-100"
        >
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <MdGroup className="w-5 h-5 text-purple-600" />
            Technical Partnership
          </h3>
          <p className="text-gray-700 text-sm">
            Worked closely with engineers to balance design ambitions with technical constraints, particularly around AI latency, token costs, and prompt reliability
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6 border border-green-100"
        >
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <MdGroup className="w-5 h-5 text-green-600" />
            Educator Input
          </h3>
          <p className="text-gray-700 text-sm">
            Regularly validated designs with teachers and instructional designers to ensure usability and that the tool supported their workflows rather than forcing new ones
          </p>
        </motion.div>
      </div>

      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg p-8 border border-indigo-100">
        <h3 className="text-xl font-bold text-gray-900 mb-4">How Senior Design Added Value</h3>
        <p className="text-gray-700 mb-4 leading-relaxed">
          This project required more than execution—it required defining a new design category (AI-assisted education tools). My role was to establish clear principles: transparency about AI involvement, educator agency over automation, quality over speed, and building systems that could scale across multiple languages and curricula.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Rather than designing in isolation, I structured the process as ongoing dialogue with stakeholders. This meant catching misalignments early and building shared understanding of why we made certain choices. It's slower upfront but resulted in fewer major pivots during development.
        </p>
      </div>
    </motion.div>
  );
}
