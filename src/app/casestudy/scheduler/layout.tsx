import type { Metadata } from 'next';
import { ReactNode } from 'react';

/**
 * EduScheduler is unpublished, not deleted. The URL still works so it can be
 * opened or shared directly, but it is off every listing and hidden from search.
 * The page itself is a client component, so the tag has to live here.
 */
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function SchedulerLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
