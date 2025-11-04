'use client';

import { motion } from 'framer-motion';
import { MdLightbulb, MdCheckCircle, MdAutoAwesome } from 'react-icons/md';

export function StrategicInsightsSection() {
  return (
    <motion.div
      id="strategic-insights"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Key Learnings & Design Principles</h2>

        {/* Core Learnings */}
        <div className="bg-white border border-gray-200 rounded-xl p-8 mb-8 shadow-sm">
          <div className="flex items-start gap-4 mb-6">
            <MdLightbulb className="text-yellow-600 flex-shrink-0" size={28} />
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-4">What This Project Taught Me</h3>

              <div className="space-y-6">
                <div className="border-l-4 border-yellow-400 pl-6 py-4">
                  <p className="font-bold text-gray-900 mb-2 text-lg">Constraints Are Catalysts, Not Barriers</p>
                  <p className="text-gray-700">
                    I initially saw HIPAA restrictions, IRS compliance, and legacy systems as obstacles. But the best solutions came from working within these constraints. Privacy requirements drove us to smarter authentication patterns. Compliance needs led to progressive disclosure. Our biggest innovations emerged because we couldn't do the obvious thing.
                  </p>
                </div>

                <div className="border-l-4 border-yellow-400 pl-6 py-4">
                  <p className="font-bold text-gray-900 mb-2 text-lg">Diverse User Needs Demand Diverse Solutions</p>
                  <p className="text-gray-700">
                    The instinct is to find "the best" design that works for everyone. But 4 distinct user segments with conflicting needs can't be served by one interface. Sometimes the right move is to build 4 different experiences optimized for each segment. This goes against the "elegant solution" instinct but delivers better outcomes.
                  </p>
                </div>

                <div className="border-l-4 border-yellow-400 pl-6 py-4">
                  <p className="font-bold text-gray-900 mb-2 text-lg">Data Informs But Doesn't Decide</p>
                  <p className="text-gray-700">
                    Analytics showed us the problems (98.9% abandonment, 18-minute flows). But they didn't tell us why or how to fix it. Good research—combining data with transcripts, stakeholder interviews, and observation—revealed the true mental models and needs. Data opens the door; qualitative research walks through it.
                  </p>
                </div>

                <div className="border-l-4 border-yellow-400 pl-6 py-4">
                  <p className="font-bold text-gray-900 mb-2 text-lg">Mobile Matters More Than You Think</p>
                  <p className="text-gray-700">
                    We initially prioritized desktop. But 0.3% mobile completion meant the feature was effectively broken for mobile users. When we properly optimized for mobile as a first-class experience (not a responsive afterthought), it contributed 60x improvement. Mobile isn't an edge case—it's core.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cross-Functional Collaboration */}
        <div className="bg-white border border-gray-200 rounded-xl p-8 mb-8 shadow-sm">
          <div className="flex items-start gap-4 mb-6">
            <MdCheckCircle className="text-green-600 flex-shrink-0" size={28} />
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-4">How Great Design Happens</h3>
              <p className="text-gray-700 mb-6">
                This project showed me that exceptional design results from exceptional collaboration. The role of a senior designer is to orchestrate, not dictate.
              </p>
              <div className="space-y-4">
                <div className="border-l-4 border-green-400 pl-4">
                  <p className="font-bold text-gray-900 mb-2">Involve Specialists Early, Not Late</p>
                  <p className="text-sm text-gray-700">
                    When engineering is in design discussions from day one, they can say "OCR is actually feasible" instead of discovering months later it's impossible. When compliance is a design partner, not a gate, they help you build trust, not block progress.
                  </p>
                </div>
                <div className="border-l-4 border-blue-400 pl-4">
                  <p className="font-bold text-gray-900 mb-2">Research Guides, Design Proposes, Data Validates</p>
                  <p className="text-sm text-gray-700">
                    Research reveals what's broken. Design proposes how to fix it. Data tells you if it worked. Each step builds on the last. None of them alone is sufficient.
                  </p>
                </div>
                <div className="border-l-4 border-purple-400 pl-4">
                  <p className="font-bold text-gray-900 mb-2">The Product Manager Translates Vision Into Reality</p>
                  <p className="text-sm text-gray-700">
                    Your brilliant design idea needs someone who can build the business case, navigate stakeholders, and secure resources. That person often isn't the designer.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* What I'd Do Differently */}
        <div className="bg-white border border-gray-200 rounded-xl p-8 mb-8 shadow-sm">
          <div className="flex items-start gap-4 mb-6">
            <MdAutoAwesome className="text-blue-600 flex-shrink-0" size={28} />
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-4">What I'd Do Differently Next Time</h3>
              <p className="text-gray-700 mb-6">
                These are the small adjustments that would make a big difference on the next complex redesign project.
              </p>

              <div className="space-y-4">
                {[
                  {
                    title: "Validate Assumptions Earlier",
                    desc: "We spent 3 weeks on one design direction before testing with users. Quick guerrilla testing in week 1 would have saved 2 weeks of work."
                  },
                  {
                    title: "Start Mobile First, Genuinely",
                    desc: "We designed desktop first and adapted for mobile. Should have designed mobile-first since it forced better prioritization."
                  },
                  {
                    title: "Build Measurable Hypotheses Into Design",
                    desc: "Design with specific metrics in mind from the start. \"This flow should reduce completion time by 40%\" is better than \"make it simpler.\""
                  },
                  {
                    title: "Document Decisions as You Make Them",
                    desc: "Waiting until the end to document 'why we designed it this way' loses the context. Do it as you go."
                  },
                  {
                    title: "Plan Knowledge Transfer Early",
                    desc: "Don't wait for the project to end to share what you learned. Share weekly with the team throughout."
                  }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 text-blue-600 font-bold text-sm">
                      {idx + 1}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{item.title}</p>
                      <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* How It Shapes My Work Now */}
        <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 border border-gray-200 rounded-xl p-8 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 mb-4">How This Shapes My Work Now</h3>
          <p className="text-gray-700 mb-6">
            Every project I do now is influenced by what I learned here.
          </p>
          <div className="space-y-3">
            {[
              "I always ask: What are the real constraints, and how might they inspire better solutions?",
              "I design for the messy real world, not the ideal world. Complexity isn't a bug; it's a feature to understand.",
              "I invest heavily in research because I've seen how wrong assumptions can derail great design.",
              "I involve specialists early because I know what happens when you wait until the end.",
              "I measure impact relentlessly because insights without validation are just opinions."
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-200">
                <span className="text-xl text-blue-600 flex-shrink-0">✓</span>
                <p className="text-sm text-gray-700">{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Gradient divider */}
        <div className="w-full h-px my-8 bg-gray-200" />
      </div>
    </motion.div>
  );
}
