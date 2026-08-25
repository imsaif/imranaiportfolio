'use client';

import { Figure, Pull, Readers, Section, Shipped, Steps } from './sections';
import CaseStudyFooter from '@/components/case-studies/CaseStudyFooter';
import ScrollToTopButton from '@/components/ui/ScrollToTopButton';

const META: { label: string; value: string }[] = [
  { label: 'Role', value: 'Sole product designer' },
  { label: 'Scope', value: 'Research, product design, front end' },
  { label: 'Context', value: 'Global education organisation' },
  { label: 'Status', value: 'Working prototype · not deployed' },
];

/**
 * Cognition — conversational AI for government education leaders.
 *
 * The client, the country and the programme are deliberately unnamed. Screens are
 * the real product running on synthetic data.
 */
export default function CognitionCaseStudy() {
  return (
    <main className="bg-white pb-8 pt-28 md:pt-32">
      {/* ---------- Opening ---------- */}
      <header className="mx-auto w-full max-w-3xl px-6">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-gray-500">
          AI product design &middot; internal proposal
        </p>
        <h1 className="mt-5 text-4xl font-bold leading-[1.12] tracking-tight text-gray-900 md:text-5xl">
          A quiet interface for asking hard questions of programme data.
        </h1>
        <p className="mt-6 text-xl leading-relaxed text-gray-600">
          Conversational AI for the officials who run a national education programme &mdash; and answer to ministers for
          it. Designed and built end to end, from the problem framing to the working front end.
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
          src="/images/casestudy/cognition/welcome.jpg"
          alt="Cognition welcome screen with a greeting and six example questions about programme data"
          caption="The opening screen. Six example questions do the work an empty text box cannot."
          priority
        />
      </div>

      {/* ---------- 01 ---------- */}
      <Section index="01" title="A dashboard nobody opens">
        <p>
          The organisation held one of the richest education datasets anywhere &mdash; attendance, lesson delivery and
          assessment captured daily across every school in the programme. The people who most needed to interrogate it
          could not.
        </p>
        <p>
          Business intelligence tools assume fluency with pivot tables, filters and SQL-shaped thinking. Ministry
          officials, regional directors and programme leads do not have that fluency, and should not need it. They have
          a question, a meeting in an hour, and a phone in their hand.
        </p>
        <Pull cite="Field note from the commercial team">
          A minister doesn&rsquo;t want a dashboard. They want an answer they can repeat in the next room.
        </Pull>
      </Section>

      {/* ---------- 02 ---------- */}
      <Section index="02" title="Three readers, one accountability">
        <p>
          Every design decision traced back to who was holding the phone. All three answer upward, none of them are
          analysts, and none of them have time to learn a tool.
        </p>
        <Readers
          items={[
            {
              who: 'Ministry officials',
              need: 'Speak about education to cabinet, parliament and the press. Need a short, defensible answer, not a spreadsheet.',
              constraint: 'Low technical literacy',
            },
            {
              who: 'Regional directors',
              need: 'Run schools at scale. Want their region compared to last term, before a 9am briefing.',
              constraint: 'Patchy connectivity',
            },
            {
              who: 'Programme leads',
              need: 'The bridge between the organisation and the partner. Brief upward, intervene downward, fast.',
              constraint: 'Multi-stakeholder load',
            },
          ]}
        />
      </Section>

      {/* ---------- 03 ---------- */}
      <Section index="03" title="The decision: a tool that says no">
        <p>
          The obvious build was a capable assistant that answers whatever it is asked. I argued for the opposite, and it
          became the shape of the whole product: Cognition answers about programme data and declines everything else,
          out loud, citing its scope.
        </p>
        <p>
          Refusal is usually treated as a failure state to be minimised. Here it was the feature. An assistant that
          visibly declines is one an official can put in front of a minister without rehearsing it first.
        </p>
        <Steps
          items={[
            {
              label: 'Trust',
              body: 'Officials learn the edges of the tool in one turn. No invented policy, no opinion on a rival programme, no drift into territory nobody signed off.',
            },
            {
              label: 'Procurement',
              body: 'A narrowly scoped, predictable system is far easier to put through a government IT review than a general-purpose assistant.',
            },
            {
              label: 'Composure',
              body: 'A decline that names what it can answer keeps the conversation moving. The user is never left holding a dead end.',
            },
          ]}
        />
      </Section>

      <Figure
        src="/images/casestudy/cognition/refusal.jpg"
        alt="Cognition declining a political question, citing its scope and offering three in-scope follow-up questions"
        caption="Asked for a view on an opposition manifesto, it declines, says what it does cover, and offers three questions it can answer."
      />

      {/* ---------- 04 ---------- */}
      <Section index="04" title="What a good answer looks like">
        <p>
          Answers are set as prose at a comfortable measure, with a table only where the content is genuinely tabular.
          No chat bubbles, no gradients, no chrome signalling &ldquo;AI&rdquo;. The register borrows from a well-set
          annual report, because that is the document this audience already trusts.
        </p>
        <p>
          Every answer ends with three follow-up questions derived from the answer itself, so the conversation carries
          itself forward without the user having to compose the next query.
        </p>
      </Section>

      <Figure
        src="/images/casestudy/cognition/answer-table.jpg"
        alt="An answer showing literacy trends by district as a table, with observations and recommended actions"
        caption="Prose, then a table, then what to do about it. Figures shown are synthetic."
      />

      {/* ---------- 05 ---------- */}
      <Section index="05" title="Getting the reasoning disclosure right">
        <p>
          A Lite mode answers immediately. A Pro mode shows the working &mdash; what was compared, against which
          baseline, in what order. Deciding how much of that to show, and when, took three attempts.
        </p>
        <Steps
          items={[
            {
              label: 'Two separate boxes',
              body: 'A thinking indicator above a list of steps. Accurate, and visually noisy — two containers competing before the answer had even arrived.',
            },
            {
              label: 'One merged box',
              body: 'Collapsed into a single panel showing the active step and a live timer. Better, but it sat open after completion and pushed the answer down the page.',
            },
            {
              label: 'Collapse on completion',
              body: 'It now folds itself away shortly after finishing, leaving one quiet line: how long it thought, and how many steps. The steps persist on the message, so anyone who wants the working can reopen it.',
            },
          ]}
        />
        <p>
          The principle underneath: disclosure should be available on demand and invisible by default. Reasoning that
          stays expanded is not transparency, it is clutter that happens to be true.
        </p>
      </Section>

      <Figure
        src="/images/casestudy/cognition/reasoning.jpg"
        alt="Pro mode showing reasoning steps streaming live above the answer"
        caption="Pro mode while the answer is still forming: the active step, a live timer, and the steps already taken. On completion the whole panel folds to one line."
      />

      {/* ---------- 06 ---------- */}
      <Section index="06" title="Where it landed">
        <p>
          Cognition was an internal proposal, and it worked as one. The commercial team backed it and a pilot path was
          agreed. It was never deployed to a partner, and no outcome data exists &mdash; so there is none to quote here.
        </p>
        <p>
          What exists is a working front end: real streaming, real sessions, a real design system, with the data layer
          held flat behind a single swap-in point.
        </p>
        <Shipped
          built={[
            'Conversational surface with token-by-token streaming',
            'Persistent sessions with search and auto-titling',
            'Lite and Pro modes with reasoning disclosure',
            'Scope guard: out-of-scope questions decline and redirect',
            'Voice input for use between school visits',
            'Self-generating follow-up suggestions',
            'Light and dark themes on a shared token set',
            'Published design system with an accessibility gate',
          ]}
          notBuilt={[
            'Live data integration',
            'Staff review and approval of sensitive answers',
            'Per-partner permissions and single-tenant deployment',
          ]}
        />
      </Section>

      <div className="mx-auto w-full max-w-3xl px-6 pb-8">
        <p className="border-t border-gray-200 pt-8 text-sm leading-relaxed text-gray-500">
          The client, country and programme are not named, and every figure shown is synthetic. The interface is the
          real product.
        </p>
      </div>

      <CaseStudyFooter />
      <ScrollToTopButton />
    </main>
  );
}
