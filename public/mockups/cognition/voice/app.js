/*
  Drives the voice interaction: tap the mic, watch the waveform run, see the
  speech land in the composer as editable text, then send it and watch the answer
  stream back.

  The beat that matters is between listening and sending. Speech becomes text the
  official can read and correct, and nothing goes anywhere until send is pressed —
  a mis-heard question gets fixed before it becomes an answer about the wrong
  district.

  PLACEHOLDER COPY — replace before this is public: the answer text below is
  mine, not the product's. The question is the one in the captured screen.
*/

(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var QUESTION = 'How is the teacher attendance for this quarter?';
  var ANSWER = [
    'Teacher attendance is averaging 91% this quarter, two points up on last.',
    'The figure is steady across most of the state. Two districts sit below 85%, and both are ones where the mid-term break ran long.',
  ];

  // Pacing. Speech lands a word at a time, slower than a reply, because the
  // point is to watch it arrive and see that it can be corrected.
  var SPEECH_MS = 130;
  var SPEECH_JITTER_MS = 90;
  var TOKEN_MS = 45;
  var TOKEN_JITTER_MS = 60;
  var WAVE_BARS = 22;

  var phone = document.getElementById('phone');
  var welcome = document.getElementById('welcome');
  var thread = document.getElementById('thread');
  var canvas = document.getElementById('canvas');
  var composer = document.getElementById('composer');
  var composerText = document.getElementById('composerText');
  var wave = document.getElementById('wave');
  var mic = document.getElementById('mic');
  var send = document.getElementById('send');
  var pointer = document.getElementById('pointer');
  var replay = document.getElementById('replay');

  var timers = [];
  var runToken = 0;
  var STALE = { stale: true };

  // Bars are built once; their heights and timings are randomised so the wave
  // does not read as a repeating pattern.
  (function buildWave() {
    for (var i = 0; i < WAVE_BARS; i++) {
      var bar = document.createElement('i');
      bar.style.height = (30 + Math.random() * 70).toFixed(0) + '%';
      bar.style.animationDelay = (Math.random() * 0.9).toFixed(2) + 's';
      bar.style.animationDuration = (0.7 + Math.random() * 0.5).toFixed(2) + 's';
      wave.appendChild(bar);
    }
  })();

  function wait(ms) {
    return new Promise(function (resolve) {
      timers.push(setTimeout(resolve, reduceMotion ? Math.min(ms, 80) : ms));
    });
  }

  function guard(token) {
    return function (value) {
      if (token !== runToken) throw STALE;
      return value;
    };
  }

  function tokenize(text) {
    return text.match(/\S+\s*/g) || [];
  }

  function streamInto(el, text, base, jitter) {
    var perToken = base || TOKEN_MS;
    var spread = jitter === undefined ? TOKEN_JITTER_MS : jitter;

    if (reduceMotion) {
      el.textContent = text;
      return Promise.resolve();
    }

    el.classList.add('is-streaming');
    return tokenize(text)
      .reduce(function (chain, token) {
        return chain.then(function () {
          el.textContent += token;
          canvas.scrollTop = canvas.scrollHeight;
          return wait(perToken + Math.random() * spread);
        });
      }, Promise.resolve())
      .then(function () {
        el.classList.remove('is-streaming');
      });
  }

  function movePointerTo(el) {
    if (reduceMotion) return Promise.resolve();
    var frame = phone.getBoundingClientRect();
    var box = el.getBoundingClientRect();
    pointer.style.transform =
      'translate(' + (box.left - frame.left + box.width / 2) + 'px,' + (box.top - frame.top + box.height / 2) + 'px)';
    pointer.classList.add('is-visible');
    return wait(700);
  }

  function tap() {
    pointer.classList.add('is-tapping');
    return wait(260).then(function () {
      pointer.classList.remove('is-tapping');
    });
  }

  function reset() {
    runToken += 1;
    timers.forEach(clearTimeout);
    timers = [];
    thread.innerHTML = '';
    thread.hidden = true;
    welcome.hidden = false;
    composer.classList.remove('is-listening', 'is-focused');
    composerText.textContent = 'Ask about your education data…';
    composerText.classList.remove('is-filled');
    mic.classList.remove('is-listening');
    send.classList.remove('is-ready');
    pointer.classList.remove('is-visible', 'is-tapping');
    replay.hidden = true;
    canvas.scrollTop = 0;
  }

  function run() {
    reset();
    var token = runToken;
    var stop = guard(token);

    return wait(800)
      .then(stop)
      .then(function () {
        return movePointerTo(mic);
      })
      .then(stop)
      .then(tap)
      .then(stop)
      .then(function () {
        // Listening. The field gives itself over to the waveform.
        mic.classList.add('is-listening');
        composer.classList.add('is-listening');
        composerText.textContent = 'Listening…';
        composerText.classList.remove('is-filled');
        pointer.classList.remove('is-visible');
        return wait(1400);
      })
      .then(stop)
      .then(function () {
        // Speech arrives as text, word by word, while it is still listening.
        composerText.textContent = '';
        composerText.classList.add('is-filled');
        return streamInto(composerText, QUESTION, SPEECH_MS, SPEECH_JITTER_MS);
      })
      .then(stop)
      .then(function () {
        // Listening stops. The text is now something to read and correct, and
        // only now is there anything worth sending.
        return wait(420).then(function () {
          mic.classList.remove('is-listening');
          composer.classList.remove('is-listening');
          composer.classList.add('is-focused');
          send.classList.add('is-ready');
          return wait(900);
        });
      })
      .then(stop)
      .then(function () {
        return movePointerTo(send);
      })
      .then(stop)
      .then(tap)
      .then(stop)
      .then(function () {
        // Sent.
        pointer.classList.remove('is-visible');
        welcome.hidden = true;
        thread.hidden = false;

        var user = document.createElement('div');
        user.className = 'user-msg';
        user.textContent = QUESTION;
        thread.appendChild(user);

        composer.classList.remove('is-focused');
        composerText.textContent = 'Ask about your education data…';
        composerText.classList.remove('is-filled');
        send.classList.remove('is-ready');
        canvas.scrollTop = canvas.scrollHeight;

        return wait(520);
      })
      .then(stop)
      .then(function () {
        var ai = document.createElement('div');
        ai.className = 'ai-msg';
        ai.innerHTML = '<span class="dots"><span></span><span></span><span></span></span>';
        thread.appendChild(ai);
        canvas.scrollTop = canvas.scrollHeight;
        return wait(1000).then(function () {
          ai.innerHTML = '';
          return ai;
        });
      })
      .then(function (ai) {
        stop();
        return ANSWER.reduce(function (chain, para) {
          return chain.then(function () {
            stop();
            var p = document.createElement('p');
            ai.appendChild(p);
            return streamInto(p, para);
          });
        }, Promise.resolve()).then(function () {
          return ai;
        });
      })
      .then(stop)
      .then(function () {
        var meta = document.createElement('div');
        meta.innerHTML = '<span class="badge">Lite</span>';
        thread.appendChild(meta);
        canvas.scrollTop = canvas.scrollHeight;
        replay.hidden = false;
      })
      .catch(function (err) {
        if (err !== STALE) throw err;
      });
  }

  replay.addEventListener('click', run);

  // Only once it is actually on screen.
  var started = false;
  function start() {
    if (started) return;
    started = true;
    run();
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
    io.observe(phone);
  } else {
    start();
  }
})();
