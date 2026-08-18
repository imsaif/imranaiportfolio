import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Design decisions: dwic | Imran Mohammed',
  description:
    'The interaction decisions behind dwic, an MCP server and CLI that audits design systems from inside Claude Code. What was chosen, what it was chosen over, and why.',
  alternates: { canonical: '/decisions/dwic' },
};

interface Decision {
  title: string;
  chose: string;
  over: string;
  because: string;
}

const decisions: Decision[] = [
  {
    title: 'Findings cite evidence, not verdicts',
    chose:
      'Every finding carries the specific artifact behind it: the token name, the computed contrast ratio, the off-grid pixel value, or the offending selector.',
    over:
      'Returning a severity label and a short description, the way most linters and most AI reviewers do.',
    because:
      'A designer cannot act on "violates best practice," and cannot verify it either. When a tool runs inside an AI coding session, every unverifiable claim it makes is something the human has to take on trust. Evidence is what makes a finding checkable, and checkable is what makes it safe to act on quickly.',
  },
  {
    title: 'A skip is not a pass',
    chose:
      'Every audit category has an explicit skip condition. Form is skipped when there is no form markup, motion when nothing animates. The dashboard renders a skip differently from a clean pass.',
    over:
      'Reporting a clean pass for categories with nothing to audit, which is simpler to build and produces a friendlier looking report.',
    because:
      'Returning a green when there was nothing to check is a false negative the user has no way to detect. An empty design system is a signal, not a win. This is the decision that most affects whether someone trusts the second run as much as the first.',
  },
  {
    title: 'Cold CLI run before the install funnel',
    chose:
      'A public npx dwic-audit that needs no token, no account, and no config, and runs cold against any project.',
    over:
      'Gating every capability behind the token and install funnel: mint a token, then set up the MCP server, then audit.',
    because:
      'The funnel works for designers who were already convinced. Skeptics are the larger audience, and they need a 30 second proof that the tool finds real problems in their real code. The cold run is the moment that turns curiosity into a trial.',
  },
];

const notThis: string[] = [
  'Not a canvas tool. It does not generate screens, prototypes, or mockups. It audits the system that generated screens will render against.',
  'Not a linter. Prettier and ESLint handle code style. Findings never cite indentation, semicolons, or import order.',
  'Not a generic AI design assistant. There is no chat interface and no prompt box. The CLI is zero prompt: it reads the code and reports what it found.',
];

export default function DwicDecisionsPage() {
  return (
    <div className="bg-background-primary min-h-screen">
      <section className="pt-12 pb-14 md:pt-16 md:pb-20 bg-background-grain">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-medium uppercase tracking-[0.08em] text-text-secondary">
            Design decisions
          </p>
          <h1 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight text-text-primary">
            dwic
          </h1>
          <p className="mt-5 text-text-secondary text-lg md:text-xl leading-relaxed max-w-3xl">
            An MCP server and CLI that audits design systems from inside Claude Code. Below are the
            interaction decisions behind it: what I chose, what I chose it over, and why. Including
            the one I have not settled.
          </p>
          <a
            href="https://designwithclaude.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-text-primary hover:text-accent transition-colors"
          >
            <span>designwithclaude.com</span>
            <svg
              aria-hidden="true"
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H9M17 7v8" />
            </svg>
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </div>
      </section>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 space-y-16 md:space-y-20">
        <section>
          <ol className="space-y-10 md:space-y-12">
            {decisions.map(decision => (
              <li key={decision.title} className="max-w-3xl">
                <h2 className="text-xl md:text-2xl font-semibold text-text-primary tracking-tight">
                  {decision.title}
                </h2>
                <dl className="mt-5 space-y-4">
                  <div>
                    <dt className="text-sm font-semibold uppercase tracking-[0.08em] text-text-secondary">
                      Chose
                    </dt>
                    <dd className="mt-1.5 text-base md:text-lg leading-relaxed text-text-primary">
                      {decision.chose}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-semibold uppercase tracking-[0.08em] text-text-secondary">
                      Over
                    </dt>
                    <dd className="mt-1.5 text-base md:text-lg leading-relaxed text-text-primary">
                      {decision.over}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-semibold uppercase tracking-[0.08em] text-text-secondary">
                      Because
                    </dt>
                    <dd className="mt-1.5 text-base md:text-lg leading-relaxed text-text-secondary">
                      {decision.because}
                    </dd>
                  </div>
                </dl>
              </li>
            ))}
          </ol>
        </section>

        <section className="max-w-3xl">
          <h2 className="text-xl md:text-2xl font-semibold text-text-primary tracking-tight">
            What it deliberately is not
          </h2>
          <ul className="mt-5 space-y-3">
            {notThis.map(item => (
              <li key={item} className="text-base md:text-lg leading-relaxed text-text-secondary">
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="max-w-3xl">
          <h2 className="text-xl md:text-2xl font-semibold text-text-primary tracking-tight">
            Still open
          </h2>
          <p className="mt-5 text-base md:text-lg leading-relaxed text-text-secondary">
            Whether the CLI should gain a <code>--fix</code> flag for mechanical findings, like
            adding a reduced-motion guard or replacing <code>transition: all</code> with an explicit
            property list. Shortening that loop is worth a lot. But once the tool writes source
            files the trust bar rises sharply, and a single false positive stops being a bad
            suggestion and becomes &quot;dwic broke my CSS.&quot; Deferred until audit coverage is
            stable and there is data on which findings people actually fix.
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
