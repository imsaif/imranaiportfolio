import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Writing | Imran Mohammed',
  description:
    'Thoughts on AI interfaces and what breaks in them, published in Design Bootcamp on Medium.',
  alternates: { canonical: '/writing' },
};

const SERIES_URL = 'https://medium.com/@imsaif';

interface Article {
  title: string;
  url: string;
}

const articles: Article[] = [
  {
    title: 'AI is finally learning to shut up',
    url: 'https://medium.com/design-bootcamp/ai-is-finally-learning-to-shut-up-62af1d2c01c8',
  },
  {
    title: 'AI learned to shut up. It forgot to say what it was doing',
    url: 'https://medium.com/design-bootcamp/ai-learned-to-shut-up-it-forgot-to-say-what-it-was-doing-91df21ad2742',
  },
  {
    title: "AI can't see your design, so it guesses",
    url: 'https://medium.com/design-bootcamp/ai-cant-see-your-design-so-it-guesses-c50e3695f01a',
  },
  {
    title: 'Who is designing the boundary for AI?',
    url: 'https://medium.com/design-bootcamp/who-is-designing-the-boundary-for-ai-3a51b18b5fc7',
  },
  {
    title: 'The AI you use for design feedback is guessing',
    url: 'https://medium.com/design-bootcamp/the-ai-you-use-for-design-feedback-is-guessing-b4b9cfeaf7ee',
  },
  {
    title: 'Most AIUX is just search with extra steps?',
    url: 'https://medium.com/design-bootcamp/most-aiux-is-just-search-with-extra-steps-3faaae035ab8',
  },
];

const ExternalArrow = () => (
  <svg
    aria-hidden="true"
    className="w-4 h-4 shrink-0 opacity-60 transition-transform duration-200 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H9M17 7v8" />
  </svg>
);

export default function WritingPage() {
  return (
    <div className="bg-background-primary min-h-screen">
      <section className="pt-12 pb-14 md:pt-16 md:pb-20 bg-background-grain">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-text-primary">
            Writing
          </h1>
          <p className="mt-5 text-text-secondary text-lg md:text-xl leading-relaxed max-w-3xl">
            Thoughts on AI interfaces and what breaks in them, published in Design Bootcamp.
          </p>
        </div>
      </section>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 space-y-16 md:space-y-20">
        <section>
          <ul className="divide-y divide-border-secondary border-t border-border-secondary">
            {articles.map(article => (
              <li key={article.url}>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 py-6 text-lg md:text-xl font-medium text-text-primary transition-colors hover:text-accent"
                >
                  <span>{article.title}</span>
                  <ExternalArrow />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section className="flex flex-wrap items-center gap-x-8 gap-y-3">
          <a
            href={SERIES_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-sm font-medium text-text-primary hover:text-accent transition-colors"
          >
            <span>Read the series on Medium</span>
            <ExternalArrow />
          </a>
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
