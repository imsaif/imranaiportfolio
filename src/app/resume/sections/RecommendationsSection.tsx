import { motion } from 'framer-motion';

interface Recommendation {
  author: string;
  title: string;
  date: string;
  context: string;
  text: string;
}

interface RecommendationsSectionProps {
  recommendations: Recommendation[];
}

export function RecommendationsSection({ recommendations }: RecommendationsSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="space-y-8">
        {recommendations.map((rec, index) => (
          <blockquote
            key={index}
            className="relative pl-10 pr-6 py-6 bg-gray-50 dark:bg-gray-800/50 rounded-lg shadow-sm border-l-4 border-blue-500 dark:border-blue-400 transition duration-200 ease-in-out hover:shadow-md"
          >
            <span className="absolute left-2 top-1 text-6xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent opacity-50">
              "
            </span>
            <p className="mb-5 text-gray-800 dark:text-gray-200 italic z-10 relative leading-relaxed">
              {rec.text.replace(/^"|"$/g, '')}
            </p>
            <footer className="not-italic z-10 relative flex flex-col sm:flex-row sm:items-center gap-2 justify-between">
              <div>
                <div className="font-bold text-lg text-gray-800 dark:text-gray-100">{rec.author}</div>
                <div className="text-sm font-medium text-blue-600 dark:text-blue-400">{rec.title}</div>
              </div>
              <div className="text-xs bg-gray-100 dark:bg-gray-700 px-3 py-1.5 rounded-full text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600">
                {rec.date} · {rec.context}
              </div>
            </footer>
          </blockquote>
        ))}
      </div>
    </motion.div>
  );
}