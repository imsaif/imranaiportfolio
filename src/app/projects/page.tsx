import type { Metadata } from 'next';
import Link from 'next/link';

import { getProjectBySlug } from '@/data/projects';

export const metadata: Metadata = {
  title: 'Case studies | Imran Mohammed',
  description:
    'Longer write-ups of the work: AI tools at NewGlobe, enterprise healthcare at Optum, and the design decisions behind dwic.',
  alternates: { canonical: '/projects' },
};

/** Ordered deliberately: the AI work leads, then the strongest measured outcome. */
const CASE_STUDY_SLUGS = ['cognition', 'lessonloom', 'scheduler', 'uhg'] as const;

interface Entry {
  title: string;
  meta: string;
  description: string;
  href: string;
}

const caseStudies: Entry[] = CASE_STUDY_SLUGS.map(slug => {
  const project = getProjectBySlug(slug);
  return {
    title: project?.title ?? slug,
    meta: project?.tagline ?? '',
    description: project?.description ?? '',
    href: `/casestudy/${slug}`,
  };
});

const decisionRecords: Entry[] = [
  {
    title: 'dwic',
    meta: 'AI DESIGN TOOLING',
    description:
      'The interaction decisions behind an MCP server that audits design systems inside Claude Code. What I chose, what I chose it over, and the one I have not settled.',
    href: '/decisions/dwic',
  },
];

const EntryList = ({ entries }: { entries: Entry[] }) => (
  <ul className="divide-y divide-border-secondary border-t border-border-secondary">
    {entries.map(entry => (
      <li key={entry.href}>
        <Link
          href={entry.href}
          className="group block py-6 transition-colors hover:bg-background-grain"
        >
          {entry.meta && (
            <p className="text-xs font-medium uppercase tracking-[0.08em] text-text-secondary">
              {entry.meta}
            </p>
          )}
          <h3 className="mt-2 flex items-center gap-2 text-lg md:text-xl font-semibold text-text-primary">
            <span>{entry.title}</span>
            <svg
              aria-hidden="true"
              className="w-4 h-4 shrink-0 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-0.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </h3>
          <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-text-secondary">
            {entry.description}
          </p>
        </Link>
      </li>
    ))}
  </ul>
);

export default function ProjectsPage() {
  return (
    <div className="bg-background-primary min-h-screen">
      <section className="pt-12 pb-14 md:pt-16 md:pb-20 bg-background-grain">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-text-primary">
            Case studies
          </h1>
          <p className="mt-5 text-text-secondary text-lg md:text-xl leading-relaxed max-w-3xl">
            Longer write-ups of the work: what the problem was, what I decided, and what I would do
            differently.
          </p>
        </div>
      </section>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 space-y-16 md:space-y-20">
        <section>
          <h2 className="mb-6 text-sm font-semibold uppercase tracking-[0.08em] text-text-secondary">
            Product work
          </h2>
          <EntryList entries={caseStudies} />
        </section>

        <section>
          <h2 className="mb-6 text-sm font-semibold uppercase tracking-[0.08em] text-text-secondary">
            Design decisions
          </h2>
          <EntryList entries={decisionRecords} />
        </section>

        <section className="max-w-3xl">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.08em] text-text-secondary">
            Also live
          </h2>
          <p className="text-[15px] leading-relaxed text-text-secondary">
            <a
              href="https://llmsgist.org"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-text-primary hover:text-accent transition-colors"
            >
              llmsgist.org
            </a>{' '}
            is a structured spec format for AI coding tools. .gist.design files give Claude, Cursor,
            and Copilot the design context they otherwise lack.
          </p>
        </section>

        <section>
          <Link
            href="/"
            className="text-sm font-medium text-text-secondary hover:text-accent transition-colors"
          >
            Back to home
          </Link>
        </section>
      </main>
    </div>
  );
}
