/* ==========================================================================
   US — FOR NIMAH (COMPLETE APPLICATION LOGIC)
   Supports Electron Desktop IPC & Mobile Web App Navigation
   ========================================================================== */

// --- Start Date Config ---
const START_DATE = new Date("2026-01-20T00:00:00");

// --- Global App State ---
let currentView = 'home';
let currentReasonIdx = 0;
let currentTrackIdx = 0;
let isAudioPlaying = false;
let audioObj = new Audio();

// Quiz Data
const QUIZ_DATA = [
  {
    q: "What date did our story officially begin?",
    options: ["January 20th, 2026", "February 14th, 2026", "March 14th, 2026", "April 1st, 2026"],
    correct: 0
  },
  {
    q: "What is your iconic favorite nickname?",
    options: ["Honey", "Potato 🥔", "Cookie", "Pumpkin"],
    correct: 1
  },
  {
    q: "What do we argue about the most? 😂",
    options: ["Phone usage", "Food choices", "Overthinking", "Nothing, we're perfect 😉"],
    correct: 3
  },
  {
    q: "What time do our random 'I love you' messages usually happen?",
    options: ["10:00 AM", "2:00 AM 🌙", "4:00 PM", "8:00 PM"],
    correct: 1
  },
  {
    q: "How long have we been together today?",
    options: ["4 Months", "6 Months", "8 Months 💕", "1 Year"],
    correct: 2
  }
];
let currentQuizIdx = 0;
let quizScore = 0;

// Reasons Data Generation (1000 Unique Romantic Reasons)
function generate1000Reasons() {
  const coreReasons = [
    "I love the way you make even the simplest days feel special. Your smile, your laugh, your kindness... everything about you is just perfect.",
    "Your laugh is genuinely my favorite sound in the entire world.",
    "The way your eyes light up whenever you talk about something you love.",
    "You make me feel safe, calm, and completely understood.",
    "Your kindness and gentle heart are a true superpower.",
    "How you make 'Potato' sound like the sweetest nickname ever.",
    "Your quiet strength that inspires me every single day.",
    "How easily we can talk for hours at 2am without noticing the time.",
    "Your beautiful smile that brightens up any dark room.",
    "Because loving you is the easiest, most natural decision of my life.",
    "How you always know how to comfort me when I overthink.",
    "Your cute little random messages that make my day instantly better.",
    "The way you care so deeply about the people you love.",
    "Because being with you feels like coming home.",
    "How you hold a piece of my heart that nobody else ever could.",
    "The way your hand fits so effortlessly in mine.",
    "Your adorable reactions whenever I tease you.",
    "How you remember the smallest details about our conversations.",
    "The peace I feel in my heart whenever I hear your voice.",
    "Your sweet voice when you wish me goodnight.",
    "How you make even boring routines feel like an exciting adventure.",
    "The way you listen to me with so much care and patience.",
    "Because you are my best friend, my soulmate, and my favorite person.",
    "Your silly dances and goofy moments that make me smile uncontrollably.",
    "How you look at me like I'm the only person in the room.",
    "The warmth in your hugs that makes all my worries melt away.",
    "Because you make me want to be the best version of myself every day.",
    "Your beautiful mind and the intelligent thoughts you share.",
    "How you always know how to bring a smile to my face.",
    "Because nine months with you feels like a lifetime of pure happiness."
  ];

  const prefixes = [
    "I love how", "I cherish the way", "I adore that", "It warms my heart how",
    "I am forever grateful that", "I love that", "I will never get tired of how",
    "I treasure how", "I love the fact that", "It brings me joy how"
  ];

  const themes = [
    "you always text me good morning with so much warmth and affection",
    "you laugh at my silly jokes even when they aren't even funny",
    "you comfort me whenever I feel overwhelmed or stressed out",
    "your presence instantly calms my mind after a chaotic day",
    "you remember the tiniest things I mention in passing",
    "we can talk at 2 AM about everything and anything under the stars",
    "you make 'Potato' the cutest name in the whole world",
    "you make me feel so deeply appreciated, valued, and loved",
    "your smile can turn my worst days into pure sunshine",
    "you hold my hand like you never want to let it go",
    "your kindness shines so brightly in everything you do",
    "you make our story feel like a real-life fairytale movie",
    "you inspire me to dream bigger and love deeper every day",
    "we share inside jokes that nobody else in the world gets",
    "you look so stunningly gorgeous without even trying",
    "you listen to me talk endlessly about my passions with genuine interest",
    "you give the gentlest, sweetest words of encouragement",
    "our chemistry feels completely natural, effortless, and magical",
    "you make me feel so safe to be completely myself around you",
    "every single day with you feels like an anniversary celebration",
    "you bring out the softest, happiest version of me",
    "your hugs feel like coming home after a long journey",
    "you always know how to make me laugh when I least expect it",
    "your voice is the sweetest melody I could ever listen to",
    "you make every moment we spend together feel unforgettable",
    "you trust me with your heart, your thoughts, and your dreams",
    "you show me love in the quietest, sweetest, most genuine ways",
    "you celebrate all my wins like they are your own",
    "you make ordinary days feel like extraordinary memories",
    "you are my favorite thought before I go to sleep and when I wake up",
    "you bring so much light, peace, and color into my universe",
    "we can sit in comfortable silence and still feel so connected",
    "you care so tenderly about the people around you",
    "your eyes sparkle whenever you share something you're excited about",
    "you make me believe in soulmates and happy endings",
    "you hold space for my feelings without any judgment",
    "your sweet text messages give me butterflies every single time",
    "you are my safest place, my sanctuary, and my peace",
    "you make my heart beat faster every time I see your face",
    "you love me so unconditionally, genuinely, and beautifully",
    "you turn simple conversations into precious memories I treasure",
    "your gentle spirit brings so much calm to my restless mind",
    "you make me smile at my phone like a total goofball",
    "you have the purest, most selfless heart I've ever known",
    "you make every single month together sweeter than the last",
    "you understand my silent thoughts without me having to speak",
    "you are my favorite part of every single day",
    "you make me feel like the luckiest person in the entire world",
    "you are the answer to every prayer I didn't know I prayed",
    "you make my life so much richer, brighter, and full of love"
  ];

  const suffixes = [
    "and I love you more every second.",
    "which makes me fall for you all over again.",
    "and I wouldn't trade you for the world.",
    "making you my absolute favorite person forever.",
    "and it makes my heart burst with happiness.",
    "which is why you are my whole world, Nimah.",
    "and I promise to cherish you always.",
    "making me thankful for you every single day.",
    "and I love you to the moon and back.",
    "which makes our love story so truly special."
  ];

  const list = [...coreReasons];
  const seen = new Set(list);

  // Build every prefix + theme + suffix combination (finite, always terminates).
  // Interleave suffixes/prefixes so neighbouring reasons don't sound alike.
  const combos = [];
  for (let i = 0; i < suffixes.length; i++) {
    for (let t = 0; t < themes.length; t++) {
      for (let p = 0; p < prefixes.length; p++) {
        const sfx = suffixes[(i + t + p) % suffixes.length];
        combos.push(`${prefixes[p]} ${themes[t]}, ${sfx}`);
      }
    }
  }

  for (const reason of combos) {
    if (list.length >= 1000) break;
    if (!seen.has(reason)) {
      seen.add(reason);
      list.push(reason);
    }
  }

  return list;
}

const REASONS_LIST = generate1000Reasons();

// Playlist Data (Playable Audio Tracks)
const PLAYLIST = [
  {
    title: "Perfect",
    artist: "Ed Sheeran",
    src: "Ed Sheeran - Perfect (9jaSonic).mp3",
    img: "love_movie_poster.png",
    duration: "04:23"
  },
  {
    title: "Heaven Baby",
    artist: "Ayra Starr feat. ZAYN",
    src: "Ayra_Starr_-_Heaven_Baby_feat._ZAYN_(mp3.pm).mp3",
    img: "candlelight_envelope.png",
    duration: "02:22"
  },
  {
    title: "Love Nwantinti",
    artist: "CKay",
    src: "CKAY_-_LOVE_NWANTINTI_NJ_BOOTLEG_(mp3.pm).mp3",
    img: "love_movie_poster.png",
    duration: "03:08"
  },
  {
    title: "Love My Baby",
    artist: "Wizkid",
    src: "Wizkid_-_Love_My_Baby_(mp3.pm).mp3",
    img: "candlelight_envelope.png",
    duration: "04:00"
  }
];

let audioListenersAttached = false;

function initAudioListeners() {
  if (audioListenersAttached) return;
  audioListenersAttached = true;

  audioObj.addEventListener('timeupdate', () => {
    if (!audioObj.duration) return;
    const mins = Math.floor(audioObj.currentTime / 60);
    const secs = Math.floor(audioObj.currentTime % 60);
    const currLbl = document.getElementById('curr-time');
    if (currLbl) {
      currLbl.innerText = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }

    const slider = document.getElementById('audio-progress');
    if (slider) {
      slider.value = (audioObj.currentTime / audioObj.duration) * 100;
    }
  });

  audioObj.addEventListener('loadedmetadata', () => {
    const mins = Math.floor(audioObj.duration / 60);
    const secs = Math.floor(audioObj.duration % 60);
    const durStr = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    const totalLbl = document.getElementById('total-time');
    if (totalLbl) {
      totalLbl.innerText = durStr;
    }
  });

  audioObj.addEventListener('ended', () => {
    nextTrack();
  });
}

function initPlaylistUI() {
  initAudioListeners();
  const container = document.getElementById('playlist-items');
  if (!container) return;

  container.innerHTML = PLAYLIST.map((song, i) => `
    <div class="playlist-row-item ${i === 0 ? 'active' : ''}" onclick="selectTrack(${i})">
      <div class="track-left">
        <span class="track-icon">${i === 0 ? '🎵' : '💿'}</span>
        <span class="track-name"><strong>${song.title}</strong> &nbsp;·&nbsp; ${song.artist}</span>
      </div>
      <span class="track-duration">${song.duration}</span>
    </div>
  `).join('');

  // Set initial UI header for the first track
  const initialSong = PLAYLIST[0];
  if (initialSong) {
    document.getElementById('player-song-title').innerText = initialSong.title;
    document.getElementById('player-artist').innerText = initialSong.artist;
    document.getElementById('total-time').innerText = initialSong.duration;
    const artImg = document.getElementById('player-album-art');
    if (artImg) artImg.src = initialSong.img;
    audioObj.src = initialSong.src;
  }
}

function selectTrack(idx, shouldPlay = true) {
  currentTrackIdx = idx;
  const song = PLAYLIST[idx];
  if (!song) return;

  document.getElementById('player-song-title').innerText = song.title;
  document.getElementById('player-artist').innerText = song.artist;
  document.getElementById('total-time').innerText = song.duration;

  const artImg = document.getElementById('player-album-art');
  if (artImg) artImg.src = song.img;

  document.querySelectorAll('.playlist-row-item').forEach((item, i) => {
    item.classList.toggle('active', i === idx);
    const iconSpan = item.querySelector('.track-icon');
    if (iconSpan) iconSpan.innerText = (i === idx) ? '🎵' : '💿';
  });

  audioObj.src = song.src;

  if (shouldPlay) {
    audioObj.play().then(() => {
      isAudioPlaying = true;
      document.getElementById('main-play-btn').innerText = "⏸";
    }).catch(err => {
      console.log("Audio play error:", err);
      isAudioPlaying = false;
      document.getElementById('main-play-btn').innerText = "▶";
    });
  } else {
    isAudioPlaying = false;
    document.getElementById('main-play-btn').innerText = "▶";
  }
}

function togglePlayTrack() {
  if (isAudioPlaying) {
    audioObj.pause();
    isAudioPlaying = false;
    document.getElementById('main-play-btn').innerText = "▶";
  } else {
    if (!audioObj.src || audioObj.src.endsWith('#') || audioObj.src === window.location.href) {
      selectTrack(currentTrackIdx, true);
    } else {
      audioObj.play().then(() => {
        isAudioPlaying = true;
        document.getElementById('main-play-btn').innerText = "⏸";
      }).catch(err => {
        console.log("Play error:", err);
        selectTrack(currentTrackIdx, true);
      });
    }
  }
}

function seekAudio(val) {
  if (audioObj.duration) {
    audioObj.currentTime = (val / 100) * audioObj.duration;
  }
}

function nextTrack() {
  currentTrackIdx = (currentTrackIdx + 1) % PLAYLIST.length;
  selectTrack(currentTrackIdx, true);
}

function prevTrack() {
  currentTrackIdx = (currentTrackIdx - 1 + PLAYLIST.length) % PLAYLIST.length;
  selectTrack(currentTrackIdx, true);
}

function toggleShuffle() {
  currentTrackIdx = Math.floor(Math.random() * PLAYLIST.length);
  selectTrack(currentTrackIdx, true);
}

function toggleFavorite() {
  const heartBtn = document.querySelector('.heart-btn');
  if (heartBtn) {
    heartBtn.style.transform = 'scale(1.3)';
    setTimeout(() => heartBtn.style.transform = 'scale(1)', 200);
  }
}

// Movie Scenes Data
const MOVIE_SCENES = [
  {
    scene: 1,
    title: "Scene 1: The First Spark",
    caption: "January 20th, 2026: A simple conversation that changed everything..."
  },
  {
    scene: 2,
    title: "Scene 2: Late Night Talks",
    caption: "Discovering how easily we speak the exact same language at 2am..."
  },
  {
    scene: 3,
    title: "Scene 3: Inside Jokes & Potato",
    caption: "Shared laughs, silly moments, and a nickname that stuck forever..."
  },
  {
    scene: 4,
    title: "Scene 4: Growing Deeper",
    caption: "Through every day, choosing each other quietly and completely..."
  },
  {
    scene: 5,
    title: "Scene 5: Forever & Always",
    caption: "8 months down, a lifetime to go. Happy Anniversary, Nimah 💕"
  }
];

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initElectronControls();
  initNavListeners();
  initCounterTimer();
  initPlaylistUI();
  initQuiz();
  initMemoryGame();
  renderReason();
  startReasonsAutoTimer();
  initMoviePlayer();
});

// Bind click events to navigation links
function initNavListeners() {
  document.querySelectorAll('[data-view]').forEach(navEl => {
    navEl.addEventListener('click', (e) => {
      e.preventDefault();
      const targetView = navEl.getAttribute('data-view');
      if (targetView) {
        switchView(targetView);
      }
    });
  });
}

// Hide loader after loading animation
function initLoader() {
  const bar = document.getElementById('loader-bar');
  const loader = document.getElementById('loader');
  if (bar) bar.style.width = '100%';
  setTimeout(() => {
    if (loader) {
      loader.classList.add('fade-out');
      // Fully remove loader from layout after fade animation
      setTimeout(() => {
        loader.style.display = 'none';
      }, 700);
    }
  }, 1200);
}

// Electron Titlebar Handler
function initElectronControls() {
  if (window.electronAPI) {
    document.getElementById('btn-minimize')?.addEventListener('click', () => window.electronAPI.minimize());
    document.getElementById('btn-maximize')?.addEventListener('click', () => window.electronAPI.maximize());
    document.getElementById('btn-close')?.addEventListener('click', () => window.electronAPI.close());
  } else {
    // When running as a web app in browser
    const titlebar = document.getElementById('desktop-titlebar');
    if (titlebar) titlebar.style.display = 'none';
    document.documentElement.style.setProperty('--titlebar-height', '0px');
  }
}

// View Switcher
function switchView(viewId) {
  currentView = viewId;

  // Hide all sections
  document.querySelectorAll('.view-section').forEach(sec => sec.classList.remove('active'));

  // Show target section
  const targetSec = document.getElementById(viewId);
  if (targetSec) targetSec.classList.add('active');

  // Update sidebar active state
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.toggle('active', item.getAttribute('data-view') === viewId);
  });

  // Update mobile bottom nav
  document.querySelectorAll('.m-nav-btn').forEach(btn => {
    const isAct = btn.getAttribute('onclick')?.includes(viewId);
    btn.classList.toggle('active', isAct);
  });
}

// 8-Month Counter Timer
function initCounterTimer() {
  function updateTimer() {
    const now = new Date();
    const diffMs = now - START_DATE;

    if (diffMs < 0) return;

    const seconds = Math.floor((diffMs / 1000) % 60);
    const minutes = Math.floor((diffMs / (1000 * 60)) % 60);
    const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);

    // Total days & approx months
    const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const months = Math.floor(totalDays / 30.4375);
    const days = Math.floor(totalDays % 30.4375);

    document.getElementById('cnt-months').innerText = String(months).padStart(2, '0');
    document.getElementById('cnt-days').innerText = String(days).padStart(2, '0');
    document.getElementById('cnt-hours').innerText = String(hours).padStart(2, '0');
    document.getElementById('cnt-mins').innerText = String(minutes).padStart(2, '0');
    document.getElementById('cnt-secs').innerText = String(seconds).padStart(2, '0');
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

// --- MOVIE THEATER ENGINE (Video Player) ---
let movieVideoEl = null;
let movieProgressInterval = null;

function initMoviePlayer() {
  movieVideoEl = document.getElementById('movie-video');
  if (!movieVideoEl) return;

  movieVideoEl.addEventListener('loadedmetadata', () => {
    const totalLbl = document.getElementById('movie-total-time');
    if (totalLbl) totalLbl.innerText = formatTime(movieVideoEl.duration);
  });

  movieVideoEl.addEventListener('ended', () => {
    clearInterval(movieProgressInterval);
    const btn = document.getElementById('movie-play-pause-btn');
    if (btn) btn.innerText = '▶ Play';
    // Show overlay again
    const overlay = document.getElementById('cinema-overlay');
    if (overlay) overlay.style.display = 'flex';
    // Show poster again
    const poster = document.getElementById('cinema-poster-img');
    if (poster) poster.style.display = 'block';
    movieVideoEl.style.display = 'none';
  });
}

function formatTime(seconds) {
  if (!seconds || isNaN(seconds)) return '00:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function startMovie() {
  if (!movieVideoEl) movieVideoEl = document.getElementById('movie-video');
  if (!movieVideoEl) return;

  // Hide poster, show video
  const poster = document.getElementById('cinema-poster-img');
  if (poster) poster.style.display = 'none';
  movieVideoEl.style.display = 'block';

  // Hide overlay
  const overlay = document.getElementById('cinema-overlay');
  if (overlay) overlay.style.display = 'none';

  // Play video
  movieVideoEl.currentTime = 0;
  movieVideoEl.play().catch(e => console.log('Video play error:', e));

  // Update play/pause button
  const btn = document.getElementById('movie-play-pause-btn');
  if (btn) btn.innerText = '⏸ Pause';

  // Start progress tracking
  startMovieProgress();
}

function startMovieProgress() {
  clearInterval(movieProgressInterval);
  movieProgressInterval = setInterval(() => {
    if (!movieVideoEl) return;
    const currLbl = document.getElementById('movie-curr-time');
    if (currLbl) currLbl.innerText = formatTime(movieVideoEl.currentTime);

    const slider = document.getElementById('movie-progress');
    if (slider && movieVideoEl.duration) {
      slider.value = Math.floor((movieVideoEl.currentTime / movieVideoEl.duration) * 1000);
    }
  }, 250);
}

function toggleMoviePlayPause() {
  if (!movieVideoEl) return;
  const btn = document.getElementById('movie-play-pause-btn');

  if (movieVideoEl.paused) {
    movieVideoEl.play();
    if (btn) btn.innerText = '⏸ Pause';
    startMovieProgress();
  } else {
    movieVideoEl.pause();
    if (btn) btn.innerText = '▶ Play';
    clearInterval(movieProgressInterval);
  }
}

function seekMovie(val) {
  if (!movieVideoEl || !movieVideoEl.duration) return;
  movieVideoEl.currentTime = (val / 1000) * movieVideoEl.duration;
}

function toggleMovieSound() {
  if (!movieVideoEl) return;
  const soundBtn = document.getElementById('movie-sound-btn');
  movieVideoEl.muted = !movieVideoEl.muted;
  if (soundBtn) soundBtn.innerText = movieVideoEl.muted ? '🔇 Muted' : '🔊 Sound';
}

function restartMovie() {
  if (!movieVideoEl) return;
  movieVideoEl.currentTime = 0;
  movieVideoEl.play().catch(e => console.log('Video restart error:', e));
  const btn = document.getElementById('movie-play-pause-btn');
  if (btn) btn.innerText = '⏸ Pause';
  // Hide poster/overlay if visible
  const poster = document.getElementById('cinema-poster-img');
  if (poster) poster.style.display = 'none';
  movieVideoEl.style.display = 'block';
  const overlay = document.getElementById('cinema-overlay');
  if (overlay) overlay.style.display = 'none';
  startMovieProgress();
}

function toggleCinemaFullscreen() {
  const screenElem = document.getElementById('cinema-screen');
  if (!document.fullscreenElement) {
    screenElem?.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}

// --- QUIZ ENGINE ---
function initQuiz() {
  currentQuizIdx = 0;
  quizScore = 0;
  showQuestion(0);
}

function showQuestion(idx) {
  const qData = QUIZ_DATA[idx];
  if (!qData) return;

  document.getElementById('quiz-progress-text').innerText = `Question ${idx + 1} / ${QUIZ_DATA.length}`;
  document.getElementById('quiz-question-text').innerText = qData.q;

  const optsContainer = document.getElementById('quiz-options');
  optsContainer.innerHTML = qData.options.map((opt, i) => `
    <button class="quiz-opt-btn" onclick="checkAnswer(${i})">${opt}</button>
  `).join('');

  document.getElementById('quiz-next-btn').style.display = 'none';
}

function checkAnswer(selectedIdx) {
  const qData = QUIZ_DATA[currentQuizIdx];
  const buttons = document.querySelectorAll('.quiz-opt-btn');

  buttons.forEach((btn, i) => {
    btn.disabled = true;
    if (i === qData.correct) btn.classList.add('correct');
    else if (i === selectedIdx) btn.classList.add('wrong');
  });

  if (selectedIdx === qData.correct) quizScore++;

  document.getElementById('quiz-next-btn').style.display = 'inline-block';
}

function nextQuestion() {
  currentQuizIdx++;
  if (currentQuizIdx < QUIZ_DATA.length) {
    showQuestion(currentQuizIdx);
  } else {
    // Finish Quiz
    document.getElementById('quiz-question-text').innerText = `Quiz Complete! You scored ${quizScore} / ${QUIZ_DATA.length} 💕`;
    document.getElementById('quiz-options').innerHTML = `<p style="text-align:center; padding:20px;">You know us so well, Nimah! 🤍</p>`;
    document.getElementById('quiz-next-btn').style.display = 'none';
  }
}

// --- MEMORY GAME ---
const MEMORY_ICONS = ['🤍', '🌹', '🥔', '⭐', '✉️', '🎁'];
let memoryCards = [];
let flippedCards = [];
let movesCount = 0;

function initMemoryGame() {
  movesCount = 0;
  document.getElementById('game-moves').innerText = '0';
  memoryCards = [...MEMORY_ICONS, ...MEMORY_ICONS].sort(() => Math.random() - 0.5);

  const grid = document.getElementById('memory-grid');
  if (!grid) return;
  grid.innerHTML = memoryCards.map((icon, idx) => `
    <div class="memory-card" data-idx="${idx}" onclick="flipMemoryCard(this, '${icon}')">?</div>
  `).join('');
}

function flipMemoryCard(cardElem, icon) {
  if (flippedCards.length >= 2 || cardElem.classList.contains('flipped')) return;

  cardElem.classList.add('flipped');
  cardElem.innerText = icon;
  flippedCards.push({ elem: cardElem, icon });

  if (flippedCards.length === 2) {
    movesCount++;
    document.getElementById('game-moves').innerText = movesCount;

    if (flippedCards[0].icon === flippedCards[1].icon) {
      flippedCards = [];
    } else {
      setTimeout(() => {
        flippedCards.forEach(c => {
          c.elem.classList.remove('flipped');
          c.elem.innerText = '?';
        });
        flippedCards = [];
      }, 1000);
    }
  }
}

function resetMemoryGame() {
  initMemoryGame();
}

// --- REASONS CAROUSEL (AUTOMATIC ROTATION EVERY 5 SECONDS) ---
let reasonsAutoTimer = null;

function startReasonsAutoTimer() {
  stopReasonsAutoTimer();
  reasonsAutoTimer = setInterval(() => {
    nextReason(false);
  }, 5000);
}

function stopReasonsAutoTimer() {
  if (reasonsAutoTimer) {
    clearInterval(reasonsAutoTimer);
    reasonsAutoTimer = null;
  }
}

function renderReason() {
  const numElem = document.getElementById('reason-num');
  const textElem = document.getElementById('reason-text');
  const countElem = document.getElementById('reason-count');

  if (numElem) {
    numElem.innerText = `Reason #${String(currentReasonIdx + 1).padStart(3, '0')}`;
  }

  if (textElem) {
    textElem.style.opacity = '0';
    textElem.style.transform = 'translateY(6px)';
    setTimeout(() => {
      textElem.innerText = `"${REASONS_LIST[currentReasonIdx]}"`;
      textElem.style.opacity = '1';
      textElem.style.transform = 'translateY(0)';
    }, 150);
  }

  if (countElem) {
    countElem.innerText = `${currentReasonIdx + 1} / ${REASONS_LIST.length}`;
  }
}

function nextReason(userInitiated = true) {
  currentReasonIdx = (currentReasonIdx + 1) % REASONS_LIST.length;
  renderReason();
  if (userInitiated) {
    startReasonsAutoTimer();
  }
}

function prevReason(userInitiated = true) {
  currentReasonIdx = (currentReasonIdx - 1 + REASONS_LIST.length) % REASONS_LIST.length;
  renderReason();
  if (userInitiated) {
    startReasonsAutoTimer();
  }
}

// --- SECRET EASTER EGG ---
function checkSecretCode() {
  const input = document.getElementById('secret-input')?.value.trim().toUpperCase();
  if (input === 'POTATO') {
    showModal(`
      <div style="text-align:center;">
        <span style="font-size:4rem;">🥔 💕</span>
        <h2 style="font-family:var(--font-serif); margin: 12px 0;">Secret Code Unlocked!</h2>
        <p>You found our secret! You are officially my favorite Potato in the whole wide universe. 🤍</p>
      </div>
    `);
  } else {
    alert("Incorrect code! Hint: Your iconic nickname in all caps (POTATO)");
  }
}

// --- MYSTERY BOXES & MODALS ---
function openMysteryBox(num) {
  const boxContent = {
    1: "💌 <strong>Message Box:</strong> 'I choose you today, tomorrow, and every single day after. You are my favorite human, Nimah.'",
    2: "📸 <strong>Photo Box:</strong> 'Every memory with you is framed in my heart forever.'",
    3: "💭 <strong>Memory Box:</strong> 'Remember our first 2am conversation? I knew right then you were special.'",
    4: "🔒 <strong>Surprise Box:</strong> 'Surprise! You unlocked the golden secret: I love you more than words could ever explain! 💕'"
  };
  showModal(`<div style="text-align:center; padding:10px;">${boxContent[num]}</div>`);
}

function openEnvelopeModal() {
  showModal(`
    <div style="padding:10px;">
      <h2 style="font-family:var(--font-serif); color:var(--primary-pink); margin-bottom:12px;">Dearest Nimah 🤍</h2>
      <p style="line-height:1.6; color:var(--text-main);">
        Happy 9-Month Anniversary, my baby girl! From January 20th to September 19th, these 8 months have been filled with so much love, warmth, laughter, and peace. Thank you for being my person, my potato, my jewel, and my everything.
      </p>
      <p style="margin-top:16px; font-style:italic; color:var(--accent-purple); text-align:right;">Forever yours 🤍</p>
    </div>
  `);
}

function openLightbox(title, date, imgSrc) {
  showModal(`
    <div style="text-align:center;">
      <img src="${imgSrc}" style="width:100%; border-radius:12px; max-height:350px; object-fit:cover; margin-bottom:12px;" />
      <h3 style="font-family:var(--font-serif);">${title}</h3>
      <p style="color:var(--text-sub); font-size:0.85rem;">${date}</p>
    </div>
  `);
}

function showPlaceModal(place, tag, date) {
  showModal(`
    <div style="text-align:center; padding:10px;">
      <span style="font-size:3rem;">📍</span>
      <h2 style="font-family:var(--font-serif); margin:8px 0;">${place}</h2>
      <p style="color:var(--primary-pink);">${tag}</p>
      <p style="color:var(--text-sub); font-size:0.85rem; margin-top:4px;">${date}</p>
    </div>
  `);
}

function showModal(htmlContent) {
  const overlay = document.getElementById('modal-overlay');
  const content = document.getElementById('modal-content');
  if (overlay && content) {
    content.innerHTML = htmlContent;
    overlay.classList.add('active');
  }
}

function closeModal() {
  const overlay = document.getElementById('modal-overlay');
  if (overlay) overlay.classList.remove('active');
}