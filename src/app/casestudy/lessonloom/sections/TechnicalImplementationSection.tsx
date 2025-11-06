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
          As a designer, my role during implementation was to bridge user needs with technical constraints, collaborate with engineers on architecture decisions, and validate that the system worked intuitively for educators. This wasn't about knowing code—it was about asking the right questions and ensuring technical decisions served our users.
        </p>
      </div>

      <div className="space-y-8 mb-12">
        {/* Shaping Interface Requirements */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0 }}
          className="bg-blue-50 rounded-lg p-6 border border-blue-200"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-3">
            <MdBuild className="w-6 h-6 text-blue-600" />
            Defining Interface Requirements That Shaped Architecture
          </h3>
          <p className="text-gray-700 mb-4">
            Early user research revealed that educators needed to <strong>see exact output before committing</strong>. This simple requirement had massive technical implications. Engineers had to build:
          </p>
          <ul className="space-y-3 text-gray-700 text-sm">
            <li className="flex gap-3">
              <span className="font-semibold text-blue-600 flex-shrink-0">•</span>
              <span><strong>A preview system</strong> that could render lessons without saving them to the database</span>
            </li>
            <li className="flex gap-3">
              <span className="font-semibold text-blue-600 flex-shrink-0">•</span>
              <span><strong>A stateless generation pipeline</strong> that could be called multiple times for the same input without side effects</span>
            </li>
            <li className="flex gap-3">
              <span className="font-semibold text-blue-600 flex-shrink-0">•</span>
              <span><strong>Version control for prompts</strong> so we could track which prompt generated which lesson</span>
            </li>
          </ul>
          <p className="text-gray-700 mt-4 italic">
            By advocating for this user need, we indirectly shaped the backend architecture to be more flexible and resilient.
          </p>
        </motion.div>

        {/* Prompt Design & AI Collaboration */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-green-50 rounded-lg p-6 border border-green-200"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-3">
            <MdBuild className="w-6 h-6 text-green-600" />
            Collaborating on Prompt Design & AI Optimization
          </h3>
          <p className="text-gray-700 mb-4">
            I worked closely with our ML team on prompt engineering—not as a technical expert, but as a bridge between user needs and model behavior:
          </p>
          <div className="space-y-4 text-gray-700 text-sm">
            <div>
              <strong>Translating feedback into prompts:</strong>
              <p className="mt-1">When user interviews revealed that teachers wanted lessons to emphasize "conceptual understanding" for math but "procedural fluency" for language arts, we worked with ML to create subject-specific prompts that encoded these pedagogical principles.</p>
            </div>
            <div>
              <strong>Testing prompt variations:</strong>
              <p className="mt-1">I conducted user testing on different prompt outputs—not just looking at technical quality, but whether educators trusted the AI's pedagogical reasoning. This feedback directly improved how we structured prompts.</p>
            </div>
            <div>
              <strong>Balancing speed vs. quality:</strong>
              <p className="mt-1">We discovered that more detailed prompts gave better output but took 3x longer. I helped advocate for the detailed approach during a time-vs-quality tradeoff discussion with engineering.</p>
            </div>
          </div>
        </motion.div>

        {/* User Research Influencing Technical Decisions */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-purple-50 rounded-lg p-6 border border-purple-200"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-3">
            <MdBuild className="w-6 h-6 text-purple-600" />
            Using Research to Inform Technical Decisions
          </h3>
          <p className="text-gray-700 mb-4">
            I brought research insights directly into technical planning discussions:
          </p>
          <div className="space-y-4 text-gray-700 text-sm">
            <div>
              <strong>Trust in automation:</strong>
              <p className="mt-1">User research showed educators were hesitant to trust AI output. This led to a technical requirement: <span className="italic">make the AI's reasoning visible</span>. Engineers built an "explain generation" feature that showed exactly which curriculum standards were matched and why specific content was included.</p>
            </div>
            <div>
              <strong>Regeneration at scale:</strong>
              <p className="mt-1">Teachers mentioned wanting to generate variations quickly (e.g., "Can you make this lesson harder?"). This insight drove technical work on prompt parameterization and caching strategies.</p>
            </div>
            <div>
              <strong>Quality assurance workflow:</strong>
              <p className="mt-1">Content teams showed me their manual QA process. I helped engineers understand what they were looking for—bias, factual errors, cultural sensitivity—which informed how we built automated validation.</p>
            </div>
          </div>
        </motion.div>

        {/* Iteration & Feasibility */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-orange-50 rounded-lg p-6 border border-orange-200"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-3">
            <MdBuild className="w-6 h-6 text-orange-600" />
            Iterating Design with Engineering Constraints
          </h3>
          <p className="text-gray-700 mb-4">
            Design-engineering collaboration meant sometimes simplifying:
          </p>
          <ul className="space-y-3 text-gray-700 text-sm">
            <li className="flex gap-3">
              <span className="text-orange-600 flex-shrink-0">→</span>
              <span><strong>Real-time collaborative editing:</strong> Originally envisioned but technically infeasible with our infrastructure. We pivoted to "commenting + revision suggestions" instead, which actually worked better for the asynchronous nature of content creation.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-600 flex-shrink-0">→</span>
              <span><strong>Multi-language generation:</strong> We wanted single-click translation, but maintaining curriculum alignment across languages was harder than expected. We built a review-and-refine workflow instead, where AI generates a first draft in the target language and humans validate cultural appropriateness.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-600 flex-shrink-0">→</span>
              <span><strong>Custom AI model fine-tuning:</strong> Turns out it was more cost-effective to use better prompts with GPT-4 than to fine-tune a smaller model. This realization came from prototyping and testing—and led to a better user experience anyway.</span>
            </li>
          </ul>
        </motion.div>

        {/* Design-Led QA & Validation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-indigo-50 rounded-lg p-6 border border-indigo-200"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-3">
            <MdBuild className="w-6 h-6 text-indigo-600" />
            Validating Technical Solutions with Real Users
          </h3>
          <p className="text-gray-700 mb-4">
            While engineers handled automated testing, I focused on qualitative validation:
          </p>
          <ul className="space-y-3 text-gray-700 text-sm">
            <li className="flex gap-3">
              <span className="text-indigo-600 flex-shrink-0">✓</span>
              <span><strong>Weekly user testing sessions</strong> with content creators using development builds, identifying friction points that weren't caught by unit tests</span>
            </li>
            <li className="flex gap-3">
              <span className="text-indigo-600 flex-shrink-0">✓</span>
              <span><strong>Bias & cultural sensitivity reviews</strong> of AI outputs alongside domain experts from different regions</span>
            </li>
            <li className="flex gap-3">
              <span className="text-indigo-600 flex-shrink-0">✓</span>
              <span><strong>Performance validation</strong> from an educator's perspective—testing if "2-3 minute generation time" actually felt acceptable while they waited</span>
            </li>
            <li className="flex gap-3">
              <span className="text-indigo-600 flex-shrink-0">✓</span>
              <span><strong>Error handling scenarios</strong>—what happens when the AI fails? Working with engineers to ensure error messages helped educators understand why and what to do next</span>
            </li>
          </ul>
        </motion.div>
      </div>

      <div className="bg-gradient-to-r from-slate-50 to-gray-50 rounded-lg p-8 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-4">The Designer's Role in Technical Implementation</h3>
        <p className="text-gray-700 leading-relaxed mb-4">
          My contribution wasn't writing code—it was translating human needs into technical priorities, asking "why" when engineers suggested shortcuts, and validating that the final system actually served educators the way we intended.
        </p>
        <p className="text-gray-700 leading-relaxed">
          The most impactful moment was pushing back on an optimization that would've reduced generation time to 30 seconds but made errors less recoverable. Yes, it was faster, but it violated the mental model educators had developed. Sometimes the "right" technical solution is the one that respects how humans actually think.
        </p>
      </div>
    </motion.div>
  );
}
