'use client';

import { Pull, Readers, Section, Shipped, Steps } from './sections';
import { StagedEmbed, StagedTwoUp } from './visuals';
import CaseStudyFooter from '@/components/case-studies/CaseStudyFooter';
import ScrollToTopButton from '@/components/ui/ScrollToTopButton';

const META: { label: string; value: string }[] = [
  { label: 'Role', value: 'Design lead' },
  { label: 'Scope', value: 'Research, product design, design system' },
  { label: 'Timeline', value: 'Nov 2025 \u2013 May 2026' },
  { label: 'Team', value: 'Product director, solution architect, engineers' },
];

/**
 * Cognition: conversational AI for government education leaders at NewGlobe.
 *
 * The product is public: NewGlobe unveiled it at the Education World Forum in
 * May 2026. Screens are the design files, running on synthetic figures. The
 * partner data behind it is not mine to publish.
 */
export default function CognitionCaseStudy() {
  return (
    <main className="bg-white pb-8 pt-28 md:pt-32">
      {/* ---------- Opening ---------- */}
      <header className="mx-auto w-full max-w-[820px] px-6">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-gray-500">Cognition &middot; NewGlobe</p>
        <h1 className="mt-5 text-[40px] font-bold leading-[1.05] tracking-[-0.03em] text-text-primary md:text-[56px]">
          A quiet interface for asking hard questions.
        </h1>
        <p className="mt-6 text-[20px] leading-[1.6] tracking-[-0.01em] text-text-secondary md:text-[22px]">
          Conversational AI for the officials who run a national education programme, and answer to ministers for it. The
          screens here report on Bayelsa State, Nigeria, covering 222 schools and 41,000 pupils.{' '}
          <a
            href="https://newglobe.education/enterprise-ai.html"
            target="_blank"
            rel="noopener noreferrer"
            className="border-b border-gray-400 text-text-primary transition-colors hover:border-gray-900"
          >
            NewGlobe
          </a>{' '}
          unveiled it at the{' '}
          <a
            href="https://www.theewf.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="border-b border-gray-400 text-text-primary transition-colors hover:border-gray-900"
          >
            Education World Forum
          </a>{' '}
          in London, where it drew applause from an audience of education ministers from more than 100 nations. I led
          the design from problem framing through to the shipped interface, working with a product director, a solution
          architect and the engineering team.
        </p>

      </header>

      <dl className="mx-auto mt-14 grid w-full max-w-6xl grid-cols-2 gap-x-14 gap-y-10 border-t border-gray-200 px-6 pt-10 sm:grid-cols-4">
        {META.map(({ label, value }) => (
          <div key={label}>
            <dt className="font-mono text-[12px] uppercase tracking-wider text-text-tertiary">{label}</dt>
            <dd className="mt-2 text-[17px] font-medium leading-[1.45] tracking-[-0.01em] text-text-primary md:text-[18px]">
              {value}
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-14">
        {/* The product itself, running, rather than a picture of it. It opens on
            the welcome screen the case study goes on to describe, then plays one
            question through both modes.
            CAPTION IS THE ORIGINAL FIGURE'S. It describes the opening screen
            only, while the demo now runs past it. Imran to revise. */}
        <StagedEmbed
          src="/mockups/cognition/prompt-to-answer/index.html?scene=lite"
          title="Cognition: a question picked from the opening screen, answered in Lite"
          ratio="1400 / 720"
          eager
          caption="The opening screen. Three example questions do the work an empty text box cannot. Cognition was designed for NewGlobe first, with programme branding applied on top: the same product, themed per state. These are the NewGlobe base screens."
        />
      </div>

      {/* ---------- 01 ---------- */}
      <Section index="01" title="Data, not answers">
        <p>
          NewGlobe held one of the richest education datasets anywhere: attendance, lesson delivery and assessment
          captured daily across every school in the programme. The dashboards on top of it were real, and people used
          them.
        </p>
        <p>
          They just answered a different question. A dashboard shows you the numbers and leaves the interpretation to
          you: pick the filters, cross-reference two views, work out which of the three districts moved and why. That is
          analyst work, and it takes time nobody in this audience has.
        </p>
        <p>
          The people using them had a specific question, a meeting in an hour, and a phone in their hand. The gap was
          never access to the data. It was the distance between a chart and a sentence they could say out loud.
        </p>
      </Section>

      <Pull cite="Field note from the commercial team">
        A minister doesn&rsquo;t want a dashboard. They want an answer they can repeat in the next room.
      </Pull>

      {/* ---------- 02 ---------- */}
      <Section index="02" title="Three readers, one accountability">
        <p>
          Every design decision traced back to who was holding the phone. All three answer upward, none of them are
          analysts, and none of them have time to learn a tool.
        </p>
        <p>
          They are senior people in their forties and fifties whose expertise is education policy, not software.
          Conversational AI is not part of how they already work, and nothing about their job has required it to be.
          The unfamiliarity sits with the tool, not with them.
        </p>
        <p>
          NewGlobe held extensive persona research on this audience already, and I ran a further round of interviews on
          top of it. The three below came out of that work, which is why the shape of the product was settled before
          anything was built.
        </p>
      </Section>

      <Readers
        items={[
          {
            who: 'Ministry officials',
            need: 'Speak about education to cabinet, parliament and the press. Need a short, defensible answer, not a spreadsheet.',
            constraint: 'Speaks in public, not in software',
          },
          {
            who: 'Regional directors',
            need: 'Run schools at scale. Want their region compared to last term, before a 9am briefing.',
            constraint: 'Patchy connectivity',
          },
          {
            who: 'Programme leads',
            need: 'The bridge between NewGlobe and the partner government. Brief upward, intervene downward, fast.',
            constraint: 'Multi-stakeholder load',
          },
        ]}
      />

      {/* ---------- 03 ---------- */}
      <Section index="03" title="What we tried before a conversation">
        <p>
          A conversation was not the obvious answer. Three other shapes were explored before it.
        </p>
        <Steps
          items={[
            {
              label: 'A smarter dashboard',
              body: 'The cheapest thing to build on what already existed, and it kept the original problem intact: the numbers are still somewhere you have to go and find. A minister in a government office does not apply filters, and should not have to.',
            },
            {
              label: 'A WhatsApp bot',
              body: 'It met the audience where they already were, phone in hand, between visits. It also put a government system inside a teacher\u2019s personal WhatsApp. Neither the privacy exposure nor the question of who owned that thread had a good answer.',
            },
            {
              label: 'A desktop app built around a teacher\u2019s persona',
              body: 'The closest to a product with a personality. It ran into a fear we could not design around: that anything installed and always running was NewGlobe, or the government, watching. Rather than try to mitigate a suspicion that was reasonable, we dropped the shape that provoked it.',
            },
          ]}
        />
        <p>
          What won was a chat at a URL. It sits behind a login on NewGlobe&rsquo;s own domain, carrying NewGlobe&rsquo;s
          identity, which answers the ownership and surveillance questions the other three shapes could not.
        </p>
        <p>
          That login carries the access rules with it. Programme isolation is absolute: a user cannot retrieve data for
          a programme they are not cleared for, under any phrasing of any question, and asking sideways returns a
          refusal that names the programmes they do have rather than hinting at ones they do not. An official in one
          state never sees another state&rsquo;s numbers, and never sees a control suggesting they might. Chat history
          is scoped to the individual, not the programme, so nobody browses a colleague&rsquo;s questions.
        </p>
      </Section>

      <Pull>
        A conversation was not a familiar form for this audience either. It is why the opening screen leads with
        example questions instead of an empty box: the blank prompt is the part of chat they cannot use.
      </Pull>

      {/* ---------- 04 ---------- */}
      <Section index="04" title="The decision: a tool that says no">
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
              body: 'It refuses in plain language, with no apology and no hedging. An official reading the reply aloud in a meeting is not embarrassed by it.',
            },
          ]}
        />
      </Section>

      {/* The refusal, running rather than screenshotted. A still of a decline is the
          thing a sceptical reader assumes was staged. Narrower than the hero so two
          desktop frames do not read as the same picture twice. */}
      <StagedEmbed
        src="/mockups/cognition/refusal/index.html"
        title="Cognition declining an out-of-scope question"
        ratio="1400 / 760"
        size="wide"
        caption="Asked who someone is, it says what it is for, declines, and points elsewhere."
      />

      {/* ---------- 05 ---------- */}
      <Section index="05" title="When it does not know">
        <p>
          Declining a question it was never for is the easy half. The harder half is a fair question it cannot
          answer well, because that is the answer an official repeats to a minister without knowing anything went
          wrong.
        </p>
        <p>
          The rule underneath the product is closed-loop grounding. Cognition does not search the open internet,
          speculate or fabricate. Every answer is generated from authorised programme data, and where there is no data
          to answer with, it says so plainly rather than guess. Internet access was ruled out of the release for exactly
          this reason: an ungrounded answer is worse than no answer to someone who has to repeat it in a meeting.
        </p>
        <Steps
          items={[
            {
              label: 'No data for the question',
              body: 'It says what it checked and what it did not find, and it does not present an empty result as a meaningful zero. A period with no data is not a term where nothing happened.',
            },
            {
              label: 'A question it cannot answer',
              body: 'A plain explanation of why, and a suggestion for rephrasing or narrowing. No fabrication, and no half-answer that leaves the reader to work out which part to trust.',
            },
            {
              label: 'Data outside the user\u2019s programme',
              body: 'It declines and names the programmes the user does have. It never returns partial data, and never implies a figure exists but is being withheld.',
            },
            {
              label: 'Something goes wrong on our side',
              body: 'It says so and offers a retry on the same question. Errors do not arrive dressed as answers.',
            },
          ]}
        />
        <p>
          The sharpest version of this was a decision to carry less. Assessment and teacher observation data existed,
          but it had not been prepared in a form Cognition could answer accurately, and assessment is the highest-stakes
          thing this audience asks about. Both were switched off before launch on the grounds that they were doing more
          harm than good. Shipping a narrower product was cheaper than shipping a confident wrong answer about a
          child&rsquo;s learning.
        </p>
      </Section>

      {/* ---------- 06 ---------- */}
      <Section index="06" title="What a good answer looks like">
        <p>
          Answers are set as prose at a comfortable measure. A chart where the question is about a trend, a table where
          the content is genuinely tabular, and a sentence after either one saying what it means. No chat bubbles, no
          gradients, no chrome signalling &ldquo;AI&rdquo;. The register borrows from a well-set annual report, because
          that is the document this audience already trusts.
        </p>
        <p>
          The voice was mine to set. I read what good practice actually looked like for assistants of this kind, and
          wrote the guidelines the answers are held to: what it calls things, how much it hedges, how it declines,
          and how long an answer runs before it stops being useful.
        </p>
        <p>
          What it calls things is not one decision, though, because the same words do not mean the same thing across
          programmes. Streams in one place are arms in another. Pupils in one are students in another. Head teacher,
          head master and school leader are three names for a single role, and last term resolves against a different
          calendar in each state. Cognition normalises what you type to a canonical term before it goes anywhere near
          the data, then answers back in the vocabulary of your own programme. None of the mapping is visible: you ask
          in your words and the answer arrives in them.
        </p>
        <p>
          That mapping is doing real work. Without it, every official outside whichever programme happened to set the
          canonical terms would be translating their own vocabulary into somebody else&rsquo;s before they could ask a
          question, and reading the answer back the same way.
        </p>
      </Section>

      {/* No visual here on purpose. This section is about language: register, who
          owned the voice, and the vocabulary mapping. A screenshot of an answer
          evidences none of that, the hero already plays one, and section 07 shows
          the table. The rest between two running demos is worth having. */}

      {/* ---------- 06 ---------- */}
      <Section index="07" title="The second decision: two modes, not three">
        <p>
          The solution architect&rsquo;s model was three modes of thinking: fast, medium and deep. It described the
          system accurately. It told an official nothing, because how hard a model is working is not something a user
          has any way to judge, or any reason to care about.
        </p>
        <p>
          I argued for two, named for the question rather than the machine, and sat down with the product director and
          the solution architect until we agreed on it. The difference between them is not how long the model thinks.
          It is whether the answer is checked before anyone sees it. Lite returns what it generates, which suits
          the arithmetic most of this audience asks for: how many teachers, how many pupils, how many schools. Pro
          takes a further pass to verify the answer before showing it. The budgets we designed against were 30
          seconds for Lite and 60 to 90 for Pro. Lite is for a question you can sanity-check yourself. Pro is for one you intend to act on.
        </p>
        <p>
          The system picks the mode itself, and we instrumented that switch so we would find out which one people
          actually used. Lite was the default in practice.
        </p>
        <p>
          Every answer carries the mode that produced it, so the reader knows which of the two they are holding. Pro
          shows the working: what was compared, against which baseline, in what order, and the extra step where it
          checks itself. Deciding how much of that to show, and when, took three attempts.
        </p>
        <Steps
          items={[
            {
              label: 'Two separate boxes',
              body: 'A thinking indicator above a list of steps. Accurate, and visually noisy: two containers competing before the answer had even arrived.',
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
      </Section>

      <Pull>Show the working when someone asks for it. Hide it when they don&rsquo;t.</Pull>

      {/* The Pro half, running. It opens with the Lite exchange already on screen,
          placed rather than replayed, so this is a follow-up rather than a repeat
          of the hero. */}
      <StagedEmbed
        src="/mockups/cognition/prompt-to-answer/index.html?scene=pro"
        title="Cognition in Pro: the working shown while it thinks, then folded away"
        ratio="1400 / 720"
        caption="Pro, once it has finished. The working is folded to a single line saying how long it thought and how many steps, above the comparison it was asked for."
      />

      {/* ---------- 08 ---------- */}
      <Section index="08" title="Getting it used">
        <p>
          The officials work from Android tablets. For that audience an app is an icon on the home screen, not a URL in
          a browser, so Cognition ships as an installable PWA rather than a native app or a plain responsive site.
        </p>
        <p>
          It did not need inventing. NewGlobe already ran a PWA for Spotlight, the dashboard product this one answers
          back to, so Cognition took the same shell. The work was everything around it: 15 icon sizes, splash
          screens held to a 3.0-second cold start and a 1.8-second warm start, breakpoints from 360 pixels up to
          tablet, and a sidebar that becomes a drawer below 1024 rather than a rail.
        </p>
        <p>
          It still needs a connection. Installed, it opens like an app; away from signal it does not work.
        </p>
        <p>
          Voice input follows the same logic. Speech lands in the composer as editable text rather than firing off as a
          query. Speech recognition is trained overwhelmingly on accents that are not these officials&rsquo;, and a
          mis-heard question returns a confident answer about a district nobody asked about. Showing the transcript
          first puts the correction in the user&rsquo;s hands instead of making them argue with the machine.
        </p>
        <p>
          The tool had to be in officials&rsquo; hands quickly, and an in-product tour was the wrong instrument twice
          over: it would have cost time we did not have, and this was not an audience likely to follow one. So we
          taught it outside the product. Marketing ran live online training sessions for the officials on what
          Cognition is, what it is not, and what to ask it. I made the material they taught from.
        </p>
        <p>
          That framing came straight out of the scope decision. A tool defined as much by what it declines as by what
          it answers is a tool you can teach in a single session, because the boundary is the lesson.
        </p>
      </Section>

      {/* These three exports carry their own tablet bodies, so they sit straight on
          the stage. A white card behind them would be a frame around a frame. All
          three are the same size, so nothing needs forcing to make the row align. */}
      <StagedTwoUp
        variant="bare"
        size="full"
        sizes="(max-width: 640px) 100vw, 340px"
        caption="The whole reason it is a PWA. These officials work from Android tablets, where an app means an icon on the home screen rather than a URL in a browser. Below tablet width the sidebar stops being a rail and becomes a drawer."
        items={[
          {
            src: '/images/casestudy/cognition/tablet-install-prompt.png',
            alt: 'Cognition on a tablet in portrait, with an Install Cognition prompt above the composer',
            label: 'Install prompt',
            width: 1200,
            height: 1848,
          },
          {
            src: '/images/casestudy/cognition/tablet-installed.png',
            alt: 'A tablet home screen with Cognition installed alongside the built-in apps',
            label: 'Installed',
            width: 1200,
            height: 1848,
          },
          {
            src: '/images/casestudy/cognition/tablet-drawer.png',
            alt: 'The sidebar opened as a full-height drawer with new chat, history, theme and logout',
            label: 'Sidebar as a drawer',
            width: 1200,
            height: 1848,
          },
        ]}
      />

      {/* The voice interaction, running: the mic is tapped, speech lands in the
          composer as editable text, and nothing is sent until send is pressed.
          CAPTION IS THE ORIGINAL FIGURE'S. Imran to revise now that it moves. */}
      <StagedEmbed
        src="/mockups/cognition/voice/index.html"
        title="Cognition on a phone: asking a question by voice"
        ratio="488 / 991"
        device="phone"
        maxWidth="340px"
        caption="Speech lands in the composer as text the official can correct. The keyboard is up and nothing has been sent yet, which is the whole point: a mis-heard question gets fixed before it becomes an answer about the wrong district."
      />

      {/* This block is making a point about a state change, which two still frames
          make the reader reconstruct. It runs instead. Kept wide and short, the
          shape of the crops it replaces. */}
      <StagedEmbed
        src="/mockups/cognition/send-state/index.html"
        title="Cognition: the send button stays disabled until there is text to check"
        ratio="1260 / 150"
        size="full"
        caption="Closer in. While it is listening the send button is disabled, so the only thing the official can do is finish speaking and read back what was heard. It only becomes available once there is text to check."
      />

      {/* ---------- 08 ---------- */}
      <Section index="09" title="Where the research ran out">
        <p>
          Two things about this audience were settled before any of it was built. The persona research inside NewGlobe,
          and the interviews I ran on top of it, said these officials would not meet a blank chat box halfway. So the
          opening screen was never a blank box. I proposed leading with example questions, and the team agreed there
          should be handholding rather than an empty screen with no direction. That call held.
        </p>
        <p>
          What the research did not catch was smaller and more ordinary. An early version put logout behind a click,
          the way most current interfaces do. Watching officials use it, nobody found it: this is an audience whose
          habits were formed when logout was always on screen. It is permanently visible now.
        </p>
        <p>
          The same thing turned out to be true of two more controls in that corner of the screen. The theme switch was
          a sun and a moon, which is the convention everywhere and meant nothing here, so it became the words Light and
          Dark under a heading that says Theme. The control that collapses the sidebar was doing the same quiet
          disappearing act, and was made explicit alongside them.
        </p>
        <p>
          The parts I had reasoned about hardest held. What broke was the conventional furniture around them.
        </p>
      </Section>

      {/* Cropped to the corner where the changes are, at the same slice of the
          screen in each, rather than two full screens where the difference is a
          few pixels the reader has to hunt for. */}
      <StagedTwoUp
        size="inset"
        aspect="167 / 144"
        sizes="(max-width: 640px) 100vw, 380px"
        caption="The whole finding, in one corner. Sign out moved out of a menu and onto the sidebar, and the theme switch stopped being a moon and started saying which theme you are in."
        items={[
          {
            src: '/images/casestudy/cognition/sidebar-footer-before.png',
            alt: 'The old sidebar footer: an account name and a small moon icon, with no sign out',
            label: 'Before: a moon, and no way out',
            width: 167,
            height: 144,
          },
          {
            src: '/images/casestudy/cognition/sidebar-footer-after.png',
            alt: 'The same corner after: a theme control labelled Light and Dark, and a labelled Logout row',
            label: 'After: both spelled out',
            width: 262,
            height: 226,
          },
        ]}
      />

      {/* ---------- 10 ---------- */}
      <Section index="10" title="How accurate it had to be">
        <p>
          The floor was 80% accuracy measured against Spotlight, the dashboard product this audience
          already treats as the record, with 85% as the number we were aiming at. The test was not whether an answer read well. It was whether it
          matched the number the organisation had already agreed on.
        </p>
        <p>
          It was calibrated before any official saw it. The first release went to about 25 people inside
          NewGlobe. 10 came from the executive and commercial side, asking the questions they would
          really ask. 15 came from the technology and Cognition teams, whose job was to check answers
          against Spotlight and file the ones that did not match. Staff attendance took the longest to
          come up to standard. Officials followed in a staged rollout, roughly 20 per programme across
          Bayelsa and Jigawa states in Nigeria, and Liberia.
        </p>
        <p>
          80% also means 1 answer in 5 is wrong, and the interface has to carry that honestly. So every answer shows which mode produced it. Every answer can be marked useful or
          not. Pro exists for the questions where being right matters more than being quick. Nothing on
          screen claims more confidence than the system has earned.
        </p>
        <p>
          The feedback control was the whole point of that first release rather than a courtesy. Without
          a way to flag a wrong answer inside the product, accuracy problems arrive as screenshots in
          chat threads, stripped of the one thing that makes them fixable: which question, in which mode,
          in which session.
        </p>
        <p>
          Those 25 people were also how the design got tested. There is no clean usability protocol for
          an interface wrapped around an answer that differs every run, so we ran it as a weekly loop
          instead. The group met each week, what they hit became tickets, and the fixes went into the
          next build. My job was to turn what came out of that hour into design fast enough to be in it.
          Underneath that ran a daily conversation with the solution architect and the product director, where we
          decided what went out next and what waited.
        </p>
        <p>
          Most of what the product became came out of those weeks rather than out of a document. Three
          of the larger ones:
        </p>
        <Steps
          items={[
            {
              label: 'Search, and how history is grouped',
              body: 'Whether past conversations should be grouped by day, week or month, and what search across them needed to match, were both settled by watching people fail to find something they had asked before.',
            },
            {
              label: 'The programme selector, removed',
              body: 'I had designed Cognition in every programme\u2019s brand colours, NewGlobe\u2019s included, and put a selector in a modal at the start. The loop killed it. The programme belongs in the URL, and each person is sent to the one they are assigned to, so most users never see a control at all.',
            },
            {
              label: 'Dark mode, argued down',
              body: 'The proposal was a dark theme built from NewGlobe\u2019s brand colours. I argued it would fail on contrast before it reached anyone, and we shipped a conventional dark theme instead. Every screen was redrawn for it.',
            },
          ]}
        />
        <p>
          The same weeks produced the smaller things that make it usable: the feedback control itself, and
          tooltips on the controls for people meeting these options for the first time. Starring and
          renaming a conversation came out of the loop too, designed and not built before I left.
        </p>
      </Section>

      <Section index="11" title="Where it landed">
        <p>
          Cognition was unveiled at the{' '}
          <a
            href="https://newglobe.education/enterprise-ai.html#unveiling"
            target="_blank"
            rel="noopener noreferrer"
            className="border-b border-gray-400 text-gray-900 transition-colors hover:border-gray-900"
          >
            Education World Forum
          </a>{' '}
          in London in May 2026, the largest annual gathering of education ministers in the world, as part of
          NewGlobe&rsquo;s enterprise AI suite. Their announcement page carries the film of the unveiling.
        </p>
        <p>
          At the point it was shown, the interface, the streaming, the sessions and the design system were real and
          stable, with the data layer held behind a single swap-in point. What follows is what existed then.
        </p>
        <Shipped
          built={[
            'Conversational surface with token-by-token streaming',
            'Persistent sessions with search and auto-titling',
            'Lite and Pro modes with reasoning disclosure',
            'Scope guard: out-of-scope questions decline and redirect',
            'Voice input for use between school visits',
            'Self-generating follow-up suggestions',
            'Programme isolation: a user cannot reach data they are not cleared for, under any phrasing',
            'Light and dark themes on a shared token set, WCAG AA contrast in both',
            'Published design system with an accessibility gate: keyboard reachable, screen-reader labelled, never colour alone',
          ]}
          notBuilt={[
            'Surfacing low confidence on a single answer, beyond the mode label',
            'Assessment and teacher observation data, switched off rather than answered badly',
            'Offline. It installs like an app but still needs a connection',
            'Citations on the face of an answer. Designed, not shipped',
            'Local languages. The interface is English, and speech recognition is the weaker half of that',
            'Starring and renaming a conversation, so a piece of analysis can be found again',
          ]}
        />
      </Section>

      <div className="mx-auto w-full max-w-[820px] px-6 pb-8">
        <p className="border-t border-gray-200 pt-8 text-sm leading-relaxed text-gray-500">
          Every figure in these screens is synthetic, and the screens are the design files rather than a running
          build. The partner data behind them is not mine to publish.
        </p>
      </div>

      <CaseStudyFooter />
      <ScrollToTopButton />
    </main>
  );
}
