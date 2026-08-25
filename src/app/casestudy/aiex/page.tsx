'use client';

import { Figure, Pull, Section, Shipped, Steps } from '../cognition/sections';
import CaseStudyFooter from '@/components/case-studies/CaseStudyFooter';
import ScrollToTopButton from '@/components/ui/ScrollToTopButton';

const META: { label: string; value: string }[] = [
  { label: 'Role', value: 'Designed, built and ships it' },
  { label: 'Scope', value: 'Product, design system, front and back end' },
  { label: 'Stack', value: 'Next.js, TypeScript, Postgres, Vercel' },
  { label: 'Status', value: 'Live at aiuxdesign.guide' },
];

/**
 * aiuxdesign.guide — my own product. Every claim here is checkable by opening
 * the site. Funnel figures are dated windows, not current state: two of the
 * readings quoted were later corrected, and that correction is the point of
 * section 05.
 */
export default function AiexCaseStudy() {
  return (
    <main className="bg-white pb-8 pt-28 md:pt-32">
      <header className="mx-auto w-full max-w-3xl px-6">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-gray-500">
          aiuxdesign.guide &middot; my own product
        </p>
        <h1 className="mt-5 text-4xl font-bold leading-[1.12] tracking-tight text-gray-900 md:text-5xl">
          It started as a folder on my laptop.
        </h1>
        <p className="mt-6 text-xl leading-relaxed text-gray-600">
          A free AI UX audit built on 38 patterns, each one a working example rather than a picture of one. Nothing here
          was planned. Every turn came from a gap I hit myself, then checked against other people.
        </p>

        <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-gray-200 pt-8 sm:grid-cols-4">
          {META.map(({ label, value }) => (
            <div key={label}>
              <dt className="font-mono text-[11px] uppercase tracking-wider text-gray-400">{label}</dt>
              <dd className="mt-1 text-sm font-medium text-gray-900">{value}</dd>
            </div>
          ))}
        </dl>
      </header>

      <div className="mt-14">
        <Figure
          src="/images/casestudy/aiex/hero.jpg"
          alt="The aiuxdesign.guide homepage: Turn Your Design Into Claude Skills, with a free audit and no signup"
          caption="Where it is now. The audit is still the front door; skills are what you take away from it."
          priority
        />
      </div>

      {/* ---------- 01 ---------- */}
      <Section index="01" title="Nowhere to look">
        <p>
          I was designing for AI, with AI, and I wanted to know how other people were solving the same problems. There
          was no good answer. Figma templates and Dribbble shots show you what an AI product <em>looks</em> like &mdash;
          the polish, the gradient, the imagined screen. None of them show you how the thing behaves when the model is
          uncertain, or wrong, or slow.
        </p>
        <p>
          So I made a folder called <span className="font-mono text-[15px]">aiuxdesignpatterns</span> and started saving
          screenshots of real shipped products. That was the whole thing for a while. Eventually it seemed worth putting
          somewhere other than my own machine, so it went on GitHub and onto Vercel.
        </p>
        <Pull>The reference I wanted didn&rsquo;t exist, so the first version of this was just me keeping notes.</Pull>
      </Section>

      {/* ---------- 02 ---------- */}
      <Section index="02" title="The demo that changed what it was">
        <p>
          Looking at the Human-in-the-Loop page, I realised a screenshot still wasn&rsquo;t enough. You cannot tell from
          a static image what happens when a reviewer disagrees with the model. So I built a small working version and
          put it under the screenshots, for my own reference.
        </p>
        <p>
          That was the turn. A working example answers the question a screenshot leaves open, and if it helped me it
          would help the next person arriving with the same question. Every pattern got one. Thirty-eight patterns, each
          with a live micro-app, the code behind it, and an honest account of when the pattern is the wrong choice.
        </p>
      </Section>

      <Figure
        src="/images/casestudy/aiex/micro-app.jpg"
        alt="The Human-in-the-Loop pattern page showing a working content moderation queue you can interact with, plus a Preview and Code toggle"
        caption="The Human-in-the-Loop micro-app. Flag something, approve it, override the model — then read the code that does it."
      />

      {/* ---------- 03 ---------- */}
      <Section index="03" title="Then an engineering problem">
        <p>
          Writing about the patterns on Medium showed me people were actively looking for this. That raised a harder
          question: if 38 patterns describe what good looks like, could one system read <em>any</em> interface against
          all of them and say something genuinely useful?
        </p>
        <p>
          The audit tool is where I went to find out. Upload a screenshot, and it works out what kind of surface it is,
          checks it against the patterns that actually apply, and returns the gaps with the evidence for each one. Free,
          and no signup, which is still the thing none of the alternatives offer.
        </p>
        <Steps
          items={[
            {
              label: 'It evaluates, it does not learn',
              body: 'Each audit is independent. Nothing carries over between runs and no signal adjusts the model — so this is an evaluation harness, not a system that improves itself.',
            },
            {
              label: 'A critic stage, built and held back',
              body: 'A second pass judges each finding against a quality rubric — keep, sharpen or drop, and whether the evidence is actually visible in the screenshot — then a revision step fixes what it flags, inside a 55-second budget so it cannot run past the timeout.',
            },
            {
              label: 'Off in production, deliberately',
              body: 'The loop sits behind a flag that is switched off. It costs latency on a free tool and I have not proven it earns that. What users get today is the single analysis pass.',
            },
          ]}
        />
      </Section>

      {/* ---------- 04 ---------- */}
      <Section index="04" title="Twice I asked, twice I changed direction">
        <p>
          I ran a survey asking what would make the site more useful. Over 60% wanted something that closed the gap
          between design and engineering &mdash; not more patterns. So I wrote guides. There are eight now, and the two
          people stay longest in, three to four hours, are Claude Code for Designers and Building Conversational UI.
        </p>
        <p>
          A later survey said something different: people wanted help turning all of this into Claude skills they could
          actually use while working. So every pattern now downloads as one. That is the current headline, and it is the
          third thing this product has been.
        </p>
        <Pull>
          I have changed the front door twice, and both times because I asked and the answer wasn&rsquo;t what I
          expected.
        </Pull>
      </Section>

      {/* ---------- 05 ---------- */}
      <Section index="05" title="The number that was wrong">
        <p>
          When I made the audit the front door, I gated the decision on data rather than on how it felt. Then the funnel
          read badly. In one fortnight, only a sixth of people who picked a product type got a useful result back. I
          concluded people were uploading the wrong kind of screenshot and started designing fixes for that.
        </p>
        <p>
          Before building them, I grouped the sessions by IP hash. Six of the seven were me &mdash; my own testing
          across two Macs and three Windows browsers. One row was a real person, and for that person the tool had worked
          on the first try, with the maximum number of images.
        </p>
        <p>
          There was no quality problem. There was one real user in fourteen days. The bottleneck was not the product at
          all, it was that almost nobody had arrived yet &mdash; and every fix I had been about to build would have
          addressed a failure that did not exist.
        </p>
        <Steps
          items={[
            {
              label: 'What I changed',
              body: 'A test-mode flag so my own sessions tag themselves, and a standing rule: no conclusion from this table without first asking whether the rows are real users or me.',
            },
            {
              label: 'What it cost',
              body: 'Two weeks of reading a metric that was mostly my own reflection, and one fully-argued diagnosis that was wrong from the first line.',
            },
            {
              label: 'What it was worth',
              body: 'When the traffic did arrive, the same funnel showed 85% of real completions returning useful gaps. The product had been fine the whole time.',
            },
          ]}
        />
      </Section>

      {/* ---------- 06 ---------- */}
      <Section index="06" title="The leak I did find">
        <p>
          Once there were real users, one drop dominated everything: of the people who watched the demo on the homepage,
          only about a fifth went on to start an audit of their own. Everything downstream of that click was healthy
          &mdash; most people who started, finished, and most who finished got useful results.
        </p>
        <p>
          My first theory was that the interactive demo was satisfying people instead of converting them. The data said
          no: only 14% of viewers ever clicked one of its hotspots, and non-converters were leaving without touching it
          at all. The decision was happening above the fold, before the demo mattered. Which also told me the demo
          itself was doing far less work than its complexity deserved.
        </p>
        <Pull>The thing I built most carefully turned out to be the thing almost nobody touched.</Pull>
        <p>
          I did not then run an A/B test, because at this traffic a realistic improvement would take about fourteen
          weeks to reach significance. Instead I pre-registered what would count as a win before changing anything, and
          measured before and after against that bar.
        </p>
      </Section>

      <Figure
        src="/images/casestudy/aiex/demo-pins.jpg"
        alt="The homepage interactive demo: a mock dashboard with numbered hotspots and a panel listing five audit findings"
        caption="The homepage demo. Only 14% of the people who saw it ever clicked a hotspot."
      />

      {/* ---------- 07 ---------- */}
      <Section index="07" title="Where it stands">
        <p>
          It is live, it is free, and it gets found without me doing anything: organic search, plus a steady trickle of
          people arriving from ChatGPT, Perplexity, Claude and Gemini citing it in their answers. That last part I did
          not plan and cannot take credit for designing.
        </p>
        <Shipped
          built={[
            '38 patterns, each with a working micro-app and its source',
            'Free screenshot audit, no signup, no account',
            'Self-critiquing evaluation harness (behind a flag)',
            'Eight guides, the longest holding attention for hours',
            'Every pattern downloadable as a Claude skill',
            'Analytics and a database read I actually check',
            'Daily AI UX news, sourced and deduplicated',
          ]}
          notBuilt={[
            'Widening the demo-to-start drop, the known open leak',
            'An email capture that captures anything at all',
            'Enough traffic to run a properly powered test',
          ]}
        />
      </Section>

      <div className="mx-auto w-full max-w-3xl px-6 pb-8">
        <p className="border-t border-gray-200 pt-8 text-sm leading-relaxed text-gray-500">
          Every figure here is a dated reading from a specific window, not a running total. Two of the readings quoted
          were later corrected, which is the subject of section 05. The site is live if you want to check any of it.
        </p>
      </div>

      <CaseStudyFooter />
      <ScrollToTopButton />
    </main>
  );
}
