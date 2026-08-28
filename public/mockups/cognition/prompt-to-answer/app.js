/*
  Drives one interaction: a pointer moves to a suggested prompt, taps it, the
  question lands in the thread, and the answer streams in a word at a time.

  The streaming is faked with timers — which is also true of the product itself,
  whose demo build streams canned answers rather than calling a model. The
  product runs at 15-50ms per word; this is deliberately slower, because here the
  streaming is the thing being demonstrated rather than something to get past.

  COPY THAT IS NOT THE PRODUCT'S — replace before this is public:
    - the `attendance` and `enrollment` answers, whose figures are invented
    - the three `PRO.steps` reasoning lines, which are shortened paraphrases
      rather than the product's own buildReasoning() output
  The `completion` answer and the Pro table are the product's own output, captured
  from the screens in the case study.
*/

(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Per-word pacing. Slower than the product's own 15-50ms: at reading distance
  // on a case study the point is to watch the answer arrive, not to receive it.
  var TOKEN_MS = 45;
  var TOKEN_JITTER_MS = 60;

  // The reasoning is prose someone is meant to actually read as it arrives, so it
  // runs slower still than the answers.
  var THINK_MS = 70;
  var THINK_JITTER_MS = 80;

  // ---------- content ----------

  var ANSWERS = {
    completion: {
      question: 'Show me lesson completion for the last 4 weeks.',
      title: 'Lesson Completion Comparison',
      blocks: [
        { type: 'text', value: 'Lesson completion for the last 4 weeks is here' },
        {
          type: 'chart',
          caption: 'Lesson completion by week',
          bars: [
            { label: 'Week 1', value: 88 },
            { label: 'Week 2', value: 91 },
            { label: 'Week 3', value: 87 },
            { label: 'Week 4', value: 94 },
          ],
        },
        {
          type: 'text',
          value:
            'Completion has held above 87% across the four weeks, climbing to 94% in the most recent week. The dip in Week 3 coincides with the mid-term break in three regions.',
        },
      ],
    },

    attendance: {
      question: 'How is staff attendance trending in Jigawa this term?',
      title: 'Staff Attendance Trend',
      blocks: [
        {
          type: 'text',
          value:
            'Staff attendance across Jigawa has been steady this term, with the pattern holding close to last term at the same point.',
        },
        {
          type: 'chart',
          caption: 'Staff attendance by month',
          bars: [
            { label: 'Sep', value: 92 },
            { label: 'Oct', value: 90 },
            { label: 'Nov', value: 86 },
            { label: 'Dec', value: 89 },
          ],
        },
        {
          type: 'text',
          value:
            'The November figure is the one worth watching: it is the only month below 90% and the drop is concentrated in rural schools rather than spread evenly.',
        },
      ],
    },

    enrollment: {
      question: 'Show pupil enrollment by region in Jigawa?',
      title: 'Pupil Enrollment by Region',
      blocks: [
        {
          type: 'text',
          value: 'Enrollment across the four regions for the current term is here',
        },
        {
          type: 'chart',
          caption: 'Pupil enrollment by region, thousands',
          bars: [
            { label: 'North', value: 74 },
            { label: 'East', value: 61 },
            { label: 'South', value: 83 },
            { label: 'West', value: 68 },
          ],
        },
        {
          type: 'text',
          value:
            'The South region carries the largest share. The gap between South and East is wide enough that per-school figures are the more useful comparison here.',
        },
      ],
    },
  };

  // The Pro follow-up.
  //
  // Both the stage labels and the prose are the product's own: the labels come
  // from buildProSteps() (the topic resolves to 'reading score comparisons' for
  // a last-term question) and the prose is buildReasoning() verbatim for a
  // follow-up comparison query. Stage timings are mockSSE's [800,1200,1000,600].
  var PRO = {
    question: 'And how does it compare with last term?',
    steps: [
      'Reading your question',
      'Looking up reading score comparisons',
      'Cross-referencing field reports',
      'Drafting your answer',
    ],
    stepMs: [800, 1200, 1000, 600],
    reasoning:
      'The user is following up on the previous turn. I should keep the same scope but narrow the lens to what they actually want next. ' +
      'They want a comparison, so I should anchor on the two (or more) cohorts being compared and check whether the deltas are meaningful or just noise. ' +
      'Pulling from the program field reports first, then cross-checking against the aggregated dataset so I don\u2019t surface a single outlier as a trend. ' +
      'If any region shows an unusual swing, I\u2019ll call it out explicitly rather than averaging it away. These leaders use the answer to make funding decisions, so directional accuracy matters more than precision to the decimal. ' +
      'Drafting the answer now \u2014 short headline first, then a table they can scan, then the one action I\u2019d recommend.',
    lead: 'Lesson completion ratios compared to LAST TERM',
    table: {
      head: ['Metric', 'Last term', 'This term', 'Difference'],
      rows: [
        ['Average reading score', '54.2', '61.8', '+7.6'],
        ['Lesson completion rate', '41%', '49%', '+8%'],
      ],
    },
  };

  var ICON_TICK =
    '<svg viewBox="0 0 20 20"><path d="M10 1a9 9 0 100 18 9 9 0 000-18zm4.2 6.6l-5 5.6a.9.9 0 01-1.3.05L5.6 11a.9.9 0 111.2-1.32l1.6 1.46 4.4-4.93a.9.9 0 111.4 1.2z"/></svg>';
  var ICON_SPARK =
    '<svg viewBox="0 0 20 20"><path d="M10 1.5l1.6 4.6 4.6 1.6-4.6 1.6L10 14l-1.6-4.7L3.8 7.7l4.6-1.6L10 1.5zM15.6 12.8l.8 2.3 2.3.8-2.3.8-.8 2.3-.8-2.3-2.3-.8 2.3-.8.8-2.3z"/></svg>';

  // ---------- elements ----------

  var app = document.getElementById('app');
  var welcome = document.getElementById('welcome');
  var thread = document.getElementById('thread');
  var canvas = document.getElementById('canvas');
  var threadTitle = document.getElementById('threadTitle');
  var composerText = document.getElementById('composerText');
  var pointer = document.getElementById('pointer');
  var replay = document.getElementById('replay');
  var sendBtn = document.querySelector('.icon-btn.send');
  var prompts = Array.prototype.slice.call(document.querySelectorAll('.prompt'));
  var modes = Array.prototype.slice.call(document.querySelectorAll('.mode'));

  var timers = [];
  var running = false;

  // Every run carries a token. A run that is no longer the current one stops at
  // its next step instead of carrying on appending into a thread that has since
  // been reset — otherwise a replay, or a click landing on top of the autoplay,
  // leaves two conversations interleaved in the same pane.
  var runToken = 0;

  // Folded is a resting state, not a final one: the summary line reopens the
  // working. Delegated from the thread so it survives replays and applies to any
  // reasoning box the run creates.
  thread.addEventListener('click', function (event) {
    var head = event.target.closest ? event.target.closest('.reasoning-head') : null;
    if (!head) return;
    var box = head.parentElement;
    var collapsed = box.classList.toggle('is-collapsed');
    head.setAttribute('aria-expanded', String(!collapsed));
  });

  // Keep the newest message in view as the thread grows, the way a chat does.
  // A mutation observer catches streamed text as well as appended nodes.
  if ('MutationObserver' in window) {
    new MutationObserver(function () {
      canvas.scrollTop = canvas.scrollHeight;
    }).observe(thread, { childList: true, subtree: true, characterData: true });
  }

  function wait(ms) {
    return new Promise(function (resolve) {
      timers.push(setTimeout(resolve, reduceMotion ? Math.min(ms, 80) : ms));
    });
  }

  // Rejects rather than resolves, so an abandoned run unwinds its whole promise
  // chain instead of falling through every remaining step.
  var STALE = { stale: true };

  function guard(token) {
    return function (value) {
      if (token !== runToken) throw STALE;
      return value;
    };
  }

  function clearTimers() {
    timers.forEach(clearTimeout);
    timers = [];
  }

  // ---------- streaming ----------

  // Word-level tokens, whitespace kept on the token so re-joining is lossless.
  function tokenize(text) {
    return text.match(/\S+\s*/g) || [];
  }

  function streamInto(el, text, base, jitter) {
    var perToken = base || TOKEN_MS;
    var spread = jitter === undefined ? TOKEN_JITTER_MS : jitter;
    var tokens = tokenize(text);
    el.classList.add('is-streaming');

    if (reduceMotion) {
      el.textContent = text;
      el.classList.remove('is-streaming');
      return Promise.resolve();
    }

    return tokens
      .reduce(function (chain, token) {
        return chain.then(function () {
          el.textContent += token;
          return wait(perToken + Math.random() * spread);
        });
      }, Promise.resolve())
      .then(function () {
        el.classList.remove('is-streaming');
      });
  }

  // ---------- chart ----------

  function buildChart(block) {
    var wrap = document.createElement('figure');
    wrap.className = 'chart';

    var width = 260;
    var height = 110;
    var left = 26;
    var bottom = 88;
    var top = 12;
    var count = block.bars.length;
    var slot = (width - left - 8) / count;
    var barW = Math.min(20, slot * 0.5);

    var svg =
      '<svg viewBox="0 0 ' + width + ' ' + height + '" role="img" aria-label="' + block.caption + '">';

    // Gridlines and their labels, drawn before the bars so bars sit on top.
    [0, 50, 100].forEach(function (pct) {
      var y = bottom - (pct / 100) * (bottom - top);
      svg +=
        '<line class="' +
        (pct === 0 ? 'axis-line' : 'grid-line') +
        '" x1="' + left + '" y1="' + y + '" x2="' + (width - 4) + '" y2="' + y + '" />';
      svg += '<text class="tick" x="' + (left - 5) + '" y="' + (y + 2.5) + '" text-anchor="end">' + pct + '%</text>';
    });

    block.bars.forEach(function (bar, i) {
      var h = (bar.value / 100) * (bottom - top);
      var x = left + slot * i + (slot - barW) / 2;
      svg += '<rect class="bar" x="' + x + '" y="' + (bottom - h) + '" width="' + barW + '" height="' + h + '" rx="2" />';
      svg +=
        '<text class="tick" x="' + (x + barW / 2) + '" y="' + (bottom + 12) + '" text-anchor="middle">' +
        bar.label +
        '</text>';
    });

    svg += '</svg>';
    wrap.innerHTML = svg;
    return wrap;
  }

  // ---------- sequence ----------

  function movePointerTo(el) {
    if (reduceMotion) return Promise.resolve();
    var appBox = app.getBoundingClientRect();
    var box = el.getBoundingClientRect();
    pointer.style.transform =
      'translate(' + (box.left - appBox.left + box.width / 2) + 'px,' + (box.top - appBox.top + box.height / 2) + 'px)';
    pointer.classList.add('is-visible');
    return wait(760);
  }

  function reset() {
    runToken += 1;
    clearTimers();
    thread.innerHTML = '';
    thread.hidden = true;
    welcome.hidden = false;
    threadTitle.hidden = true;
    composerText.textContent = 'Ask about your education data…';
    composerText.classList.remove('is-filled');
    sendBtn.classList.remove('is-active');
    pointer.classList.remove('is-visible', 'is-tapping');
    replay.hidden = true;
    prompts.forEach(function (p) {
      p.classList.remove('is-focused', 'is-pressed');
    });
    modes[0].classList.add('is-active');
    modes[1].classList.remove('is-active');
  }

  function run(key) {
    var answer = ANSWERS[key];
    var chip = prompts.filter(function (p) {
      return p.dataset.answer === key;
    })[0];

    // reset() invalidates whatever was in flight; this run claims the token it
    // leaves behind, so the order here matters.
    reset();
    running = true;
    var token = runToken;
    var stop = guard(token);

    var seq = wait(700)
      .then(stop)
      .then(function () {
        return movePointerTo(chip);
      })
      .then(stop)
      .then(function () {
        chip.classList.add('is-focused');
        return wait(240);
      })
      .then(stop)
      .then(function () {
        // Tap: the chip depresses and the question appears in the composer, the
        // way it would if someone had typed it.
        pointer.classList.add('is-tapping');
        chip.classList.add('is-pressed');
        composerText.textContent = answer.question;
        composerText.classList.add('is-filled');
        sendBtn.classList.add('is-active');
        return wait(320);
      })
      .then(stop)
      .then(function () {
        pointer.classList.remove('is-tapping', 'is-visible');
        chip.classList.remove('is-pressed', 'is-focused');
        return wait(220);
      })
      .then(stop)
      .then(function () {
        // Send.
        welcome.hidden = true;
        thread.hidden = false;
        threadTitle.textContent = answer.title;
        threadTitle.hidden = false;

        var user = document.createElement('div');
        user.className = 'user-msg';
        user.textContent = answer.question;
        thread.appendChild(user);

        composerText.textContent = 'Ask about your education data…';
        composerText.classList.remove('is-filled');
        sendBtn.classList.remove('is-active');

        return wait(380);
      })
      .then(stop)
      .then(function () {
        // Thinking.
        var ai = document.createElement('div');
        ai.className = 'ai-msg';
        ai.innerHTML = '<span class="dots"><span></span><span></span><span></span></span>';
        thread.appendChild(ai);
        return wait(1100).then(function () {
          ai.innerHTML = '';
          return ai;
        });
      })
      .then(stop)
      .then(function (ai) {
        // Blocks, in order: prose streams, the chart draws itself.
        return answer.blocks.reduce(function (chain, block) {
          return chain.then(function () {
            if (block.type === 'text') {
              var p = document.createElement('p');
              ai.appendChild(p);
              return streamInto(p, block.value);
            }

            var chart = buildChart(block);
            ai.appendChild(chart);
            // One frame between insertion and the class flip, or the transition
            // has no starting value to animate from.
            return wait(30).then(function () {
              chart.classList.add('is-drawn');
              return wait(reduceMotion ? 0 : 620);
            });
          });
        }, Promise.resolve());
      })
      .then(stop)
      .then(function () {
        return proAct(token, stop);
      })
      .then(stop)
      .then(function () {
        // The Pro answer already carries its own badge; nothing further to label.
        replay.hidden = false;
        running = false;
      })
      .catch(function (err) {
        if (err !== STALE) throw err;
      });

    return seq;
  }

  // ---------- act two: the same question asked again, in Pro ----------

  function d(tag, cls) {
    var el = document.createElement(tag);
    el.className = cls;
    return el;
  }

  function appendMeta(label, cls) {
    var meta = document.createElement('div');
    meta.className = 'answer-meta';
    meta.innerHTML = '<span class="badge ' + (cls || '') + '">' + label + '</span>';
    thread.appendChild(meta);
  }

  function proAct(token, stop) {
    var proToggle = modes[1];

    appendMeta('Lite');

    return wait(900)
      .then(stop)
      .then(function () {
        return movePointerTo(proToggle);
      })
      .then(stop)
      .then(function () {
        // Switch to Pro.
        pointer.classList.add('is-tapping');
        modes[0].classList.remove('is-active');
        proToggle.classList.add('is-active');
        return wait(300);
      })
      .then(stop)
      .then(function () {
        pointer.classList.remove('is-tapping', 'is-visible');

        var user = document.createElement('div');
        user.className = 'user-msg';
        user.textContent = PRO.question;
        thread.appendChild(user);
        return wait(420);
      })
      .then(stop)
      .then(function () {
        // The working, shown while it happens.
        var box = d('div', 'reasoning');
        box.innerHTML =
          '<button type="button" class="reasoning-head" aria-expanded="true">' +
          '<span class="reasoning-head-left">' +
          '<span class="reasoning-mark spark">' + ICON_SPARK + '</span>' +
          '<span class="reasoning-label">Thinking\u2026</span>' +
          '</span>' +
          '<svg class="reasoning-chevron" viewBox="0 0 16 16"><polyline points="4,6 8,10 12,6" /></svg>' +
          '</button>' +
          '<div class="reasoning-body">' +
          '<ul class="reasoning-steps"></ul>' +
          '<div class="reasoning-prose"></div>' +
          '</div>';
        thread.appendChild(box);

        var list = box.querySelector('.reasoning-steps');
        var label = box.querySelector('.reasoning-label');
        var prose = box.querySelector('.reasoning-prose');
        var mark = box.querySelector('.reasoning-mark');

        PRO.steps.forEach(function (text) {
          var li = document.createElement('li');
          li.className = 'reasoning-step';
          li.innerHTML = '<span class="dot"></span><span class="step-label"></span>';
          li.querySelector('.step-label').textContent = text;
          list.appendChild(li);
        });

        var rows = list.querySelectorAll('.reasoning-step');
        var started = Date.now();

        // The header counts up while it works, the way the built component does.
        var ticker = setInterval(function () {
          var secs = Math.floor((Date.now() - started) / 1000);
          var active = list.querySelector('.reasoning-step.is-active');
          var name = active ? active.querySelector('.step-label').textContent : 'Thinking';
          label.textContent = secs > 0 ? name + ' \u00b7 ' + secs + 's' : name + '\u2026';
        }, 250);
        timers.push(ticker);

        function setStage(i) {
          rows.forEach(function (row, n) {
            row.classList.toggle('is-active', n === i);
            row.classList.toggle('is-done', n < i);
            row.querySelector('.dot').innerHTML = n < i ? ICON_TICK : '';
          });
        }
        setStage(0);

        // Stages advance on their own clock while the prose streams alongside.
        var stageWalk = PRO.stepMs.reduce(function (chain, ms, i) {
          return chain.then(function () {
            return wait(ms).then(function () {
              setStage(i + 1);
            });
          });
        }, Promise.resolve());

        return Promise.all([stageWalk, streamInto(prose, PRO.reasoning, THINK_MS, THINK_JITTER_MS)]).then(function () {
          clearInterval(ticker);
          rows.forEach(function (row) {
            row.classList.remove('is-active');
            row.classList.add('is-done');
            row.querySelector('.dot').innerHTML = ICON_TICK;
          });
          var secs = Math.max(1, Math.round((Date.now() - started) / 1000));
          label.textContent = 'Thought for ' + secs + 's \u00b7 ' + PRO.steps.length + ' steps';
          mark.className = 'reasoning-mark tick';
          mark.innerHTML = ICON_TICK;
          // Folds away shortly after finishing, not the instant it lands.
          return wait(600).then(function () {
            box.classList.add('is-collapsed');
            box.querySelector('.reasoning-head').setAttribute('aria-expanded', 'false');
            return wait(700);
          });
        });
      })
      .then(stop)
      .then(function () {
        appendMeta('Pro', 'pro');

        var ai = document.createElement('div');
        ai.className = 'ai-msg';
        thread.appendChild(ai);

        var lead = document.createElement('p');
        ai.appendChild(lead);

        return streamInto(lead, PRO.lead).then(function () {
          var table = document.createElement('table');
          table.className = 'answer-table';
          table.innerHTML =
            '<thead><tr>' +
            PRO.table.head
              .map(function (h) {
                return '<th>' + h + '</th>';
              })
              .join('') +
            '</tr></thead><tbody>' +
            PRO.table.rows
              .map(function (row) {
                return (
                  '<tr>' +
                  row
                    .map(function (cell) {
                      return '<td>' + cell + '</td>';
                    })
                    .join('') +
                  '</tr>'
                );
              })
              .join('') +
            '</tbody>';
          ai.appendChild(table);
          // One frame before the class flip, or there is no starting value to
          // animate from and the table simply appears.
          return wait(30)
            .then(function () {
              table.classList.add('is-in');
              return wait(520);
            });
        });
      });
  }

  // ---------- triggers ----------

  prompts.forEach(function (p) {
    p.addEventListener('click', function () {
      run(p.dataset.answer);
    });
  });

  replay.addEventListener('click', function () {
    run('completion');
  });

  // Only start once the prototype is actually on screen. Inside an iframe the
  // observer watches this document's own viewport, which the browser reports as
  // intersecting only when the iframe itself is visible.
  var started = false;
  function start() {
    if (started) return;
    started = true;
    run('completion');
  }

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            start();
            io.disconnect();
          }
        });
      },
      { threshold: 0.35 }
    );
    io.observe(app);
  } else {
    start();
  }
})();
