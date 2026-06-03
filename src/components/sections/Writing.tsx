'use client';

import React from 'react';
import Link from 'next/link';

interface Article {
  title: string;
  url: string;
}

const SERIES_URL = 'https://medium.com/@imsaif';

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

const Writing = () => {
  return (
    <section className="pt-12 md:pt-16 pb-12 md:pb-16 bg-background relative">
      <div className="container mx-auto px-4 xs:px-5 sm:px-6 md:px-8">
        <div className="max-w-3xl">
          <h2 className="section-title text-2xl md:text-3xl font-bold text-foreground mb-8 tracking-tight leading-tight">
            Writing
          </h2>

          <ul className="flex flex-col gap-3">
            {articles.map((article, index) => (
              <li key={index}>
                <Link
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-baseline gap-1.5 text-base md:text-lg text-foreground hover:text-accent transition-colors"
                >
                  <span>{article.title}</span>
                  {/* External-link cue: always visible, nudges on hover */}
                  <svg
                    aria-hidden="true"
                    className="w-4 h-4 self-center shrink-0 opacity-60 transition-transform duration-200 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H9M17 7v8" />
                  </svg>
                  <span className="sr-only">(opens in a new tab)</span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <Link
              href={SERIES_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-accent font-semibold hover:gap-3 transition-all"
            >
              <span>Read the series on Medium</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Writing;
