'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { ArrowLeft } from '@/components/Icons';

export default function CaseStudyFooter() {
  const pathname = usePathname();

  // Point at another *published* case study. LessonLoom and EduScheduler are
  // unpublished — their URLs still work, but nothing should route readers there.
  const onCognition = pathname?.includes('/cognition');
  const otherCaseStudyLink = onCognition ? '/casestudy/uhg' : '/casestudy/cognition';
  const otherCaseStudyTitle = onCognition ? 'Optum Bank case study' : 'Cognition case study';

  // Two plain links. The heading and the pill buttons were doing the work of a
  // call to action at the end of a page nobody arrives at by accident.
  const linkClass =
    'text-[17px] text-text-primary underline decoration-border-secondary underline-offset-4 transition-colors hover:text-accent hover:decoration-accent';

  return (
    <motion.div
      className="mx-auto w-full max-w-[820px] border-t border-gray-200 px-6 py-10"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
        <Link href="/" className={`${linkClass} group inline-flex items-center gap-2`}>
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to home
        </Link>
        <Link href={otherCaseStudyLink} className={linkClass}>
          {otherCaseStudyTitle}
        </Link>
      </div>
    </motion.div>
  );
}
