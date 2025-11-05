import { motion } from 'framer-motion';
import { MdBuild } from 'react-icons/md';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

export function TechnicalImplementationSection() {
  return (
    <motion.div {...fadeIn} className="max-w-4xl mx-auto">
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Technical Implementation</h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          LessonLoom's technical architecture balanced complexity with maintainability, using Azure OpenAI APIs for content generation while building domain-specific validation layers to ensure educational quality.
        </p>
      </div>

      <div className="space-y-8 mb-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0 }}
          className="bg-blue-50 rounded-lg p-6 border border-blue-200"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-3">
            <MdBuild className="w-6 h-6 text-blue-600" />
            Tech Stack
          </h3>
          <div className="grid grid-cols-2 gap-4 text-gray-700 text-sm">
            <div><strong>Frontend:</strong> Vue.js 3, TypeScript</div>
            <div><strong>Backend:</strong> .NET Core 6</div>
            <div><strong>AI/ML:</strong> Azure OpenAI API (GPT-4)</div>
            <div><strong>Data:</strong> PostgreSQL, AWS S3</div>
            <div><strong>Infrastructure:</strong> Docker, Kubernetes</div>
            <div><strong>Monitoring:</strong> Datadog, Custom logging</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-green-50 rounded-lg p-6 border border-green-200"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-3">
            <MdBuild className="w-6 h-6 text-green-600" />
            AI Integration Architecture
          </h3>
          <p className="text-gray-700 mb-4">
            The system uses a multi-stage approach to ensure quality:
          </p>
          <ul className="space-y-2 text-gray-700 text-sm">
            <li className="flex gap-2"><span className="font-semibold text-green-600">1.</span> Template parsing to understand lesson structure requirements</li>
            <li className="flex gap-2"><span className="font-semibold text-green-600">2.</span> Curriculum validation against stored curriculum frameworks</li>
            <li className="flex gap-2"><span className="font-semibold text-green-600">3.</span> Content generation using few-shot prompting with examples</li>
            <li className="flex gap-2"><span className="font-semibold text-green-600">4.</span> Quality checks for age-appropriateness, accuracy, and alignment</li>
            <li className="flex gap-2"><span className="font-semibold text-green-600">5.</span> Localization pipeline for language and cultural adaptation</li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-purple-50 rounded-lg p-6 border border-purple-200"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-3">
            <MdBuild className="w-6 h-6 text-purple-600" />
            Key Technical Challenges Solved
          </h3>
          <div className="space-y-4 text-gray-700 text-sm">
            <div>
              <strong>Curriculum Alignment</strong>
              <p className="mt-1">Built a curriculum knowledge base that contains learning standards from 8 countries, enabling the AI to validate generated content against official frameworks.</p>
            </div>
            <div>
              <strong>Content Consistency</strong>
              <p className="mt-1">Implemented template syntax and validation layers to ensure generated lessons follow consistent structure, even across multiple generations.</p>
            </div>
            <div>
              <strong>Latency Optimization</strong>
              <p className="mt-1">Generation times average 2-3 minutes per lesson through careful prompt design and token optimization. Caching strategies reduce repeat generations to &lt;30 seconds.</p>
            </div>
            <div>
              <strong>Cost Management</strong>
              <p className="mt-1">Used prompt optimization and token counting to reduce API costs by 60% without sacrificing output quality.</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-orange-50 rounded-lg p-6 border border-orange-200"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-3">
            <MdBuild className="w-6 h-6 text-orange-600" />
            Quality Assurance & Safety
          </h3>
          <p className="text-gray-700 text-sm mb-4">
            Given the educational context, we implemented rigorous QA:
          </p>
          <ul className="space-y-2 text-gray-700 text-sm">
            <li className="flex gap-2"><span className="text-orange-600">✓</span> Automated tests for bias detection in generated content</li>
            <li className="flex gap-2"><span className="text-orange-600">✓</span> Manual review of edge cases and culturally sensitive topics</li>
            <li className="flex gap-2"><span className="text-orange-600">✓</span> Feedback loops to continuously improve prompt engineering</li>
            <li className="flex gap-2"><span className="text-orange-600">✓</span> Version control for all curriculum knowledge bases</li>
            <li className="flex gap-2"><span className="text-orange-600">✓</span> Audit trails for all AI-generated content for transparency</li>
          </ul>
        </motion.div>
      </div>

      <div className="bg-gradient-to-r from-slate-50 to-gray-50 rounded-lg p-8 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Design-Engineering Collaboration</h3>
        <p className="text-gray-700 leading-relaxed">
          The technical implementation was closely tied to design decisions. For example, the "regenerate" feature in the UI was only possible because engineers built a stateless generation system that could safely retry or generate variations. Similarly, the transparent AI interface showing exact prompts and parameters was architected to support educator debugging and refinement.
        </p>
      </div>
    </motion.div>
  );
}
