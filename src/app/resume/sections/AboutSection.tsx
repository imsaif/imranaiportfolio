import { motion } from 'framer-motion';

interface AboutSectionProps {
  about: string;
}

export function AboutSection({ about }: AboutSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mb-20"
    >
      <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-sm p-8 border border-gray-200">
        <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
          {about}
        </p>
      </div>
    </motion.div>
  );
}