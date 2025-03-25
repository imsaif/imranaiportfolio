'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface CaseStudyImageProps {
  src: string;
  alt: string;
  caption?: string;
  priority?: boolean;
}

export default function CaseStudyImage({ 
  src, 
  alt, 
  caption, 
  priority = false 
}: CaseStudyImageProps) {
  return (
    <motion.div 
      className="my-10"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="relative w-full h-auto aspect-video rounded-lg overflow-hidden">
        {src ? (
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={priority}
          />
        ) : (
          <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
            <p className="text-gray-500">Image Placeholder</p>
          </div>
        )}
      </div>
      
      {caption && (
        <p className="text-sm text-gray-500 mt-2 text-center">
          {caption}
        </p>
      )}
    </motion.div>
  );
} 