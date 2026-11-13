import React, { useState, useEffect, useRef, useCallback } from 'react';

/*
  Bottom-right portrait companion.

  Intro: lands (spotlight descent) → waves hi → then follows the cursor.
  His eyes track the cursor using frames split from looking.gif.
  Emotion clips play once (loop=1 WebP) on interaction, then he resumes
  following, sometimes with a little speech bubble above him.

  Trigger a reaction from anywhere in the app:
    window.dispatchEvent(new CustomEvent('pet-react',
      { detail: { emotion: 'laugh', say: 'optional line' } }))

  Angle convention (atan2): 0 = right, 90 = down, ±180 = left, -90 = up.
*/
const GAZE = [
  { s: 'character/look-00.webp', a: 0 },     // right
  { s: 'character/look-01.webp', a: -45 },   // up-right
  { s: 'character/look-02.webp', a: -70 },   // up-right
  { s: 'character/look-03.webp', a: -90 },   // up
  { s: 'character/look-04.webp', a: -115 },  // up-left
  { s: 'character/look-05.webp', a: -140 },  // up-left
  { s: 'character/look-06.webp', a: 180 },   // left
  { s: 'character/look-07.webp', a: 135 },   // down-left
  { s: 'character/look-08.webp', a: 90 },    // down
];
const DEFAULT_IDX = 5;

const CLIPS = {
  land:     { s: 'character/land.webp',     d: 3500 },
  wave:     { s: 'character/wave.webp',     d: 1440 },
  laugh:    { s: 'character/laugh.webp',    d: 1920 },
  confused: { s: 'character/confused.webp', d: 1680 },
  anger:    { s: 'character/anger.webp',    d: 1530 },
  facepalm: { s: 'character/facepalm.webp', d: 1530 },
  smile:    { s: 'character/smile.webp',    d: 1440 },
};
const ANNOY = ['confused', 'anger', 'facepalm']; // escalation when pestered
const IDLE_MS = 16000;

const SPEECH = {
  wave:     ["👋 Hi, I'm Musawar!", '👋 Hey — welcome in!', 'Hi there! Look around 👀'],
  laugh:    ['haha!', 'nice one 😄', 'ha! good one', 'lol'],
  confused: ['huh?', 'wait, what?', "that's... a command?", '🤔 hmm'],
  anger:    ['hey, quit it 😤', 'stop poking me!', 'seriously?'],
  facepalm: ['🤦 I give up', '...really?', 'ugh, fine.'],
  smile:    ['nice ✨', 'ooh 😊', 'good pick!', ':)'],
};

function angularDist(a, b) { return Math.abs(((a - b + 540) % 360) - 180); }
function pickFrame(angle) {
  let best = DEFAULT_IDX, bestD = Infinity;
  for (let i = 0; i < GAZE.length; i++) {
    const d = angularDist(angle, GAZE[i].a);
    if (d < bestD) { bestD = d; best = i; }
  }
  return best;
}

function CharacterPet() {
  const [enabled, setEnabled] = useState(false);
  const [idx, setIdx] = useState(DEFAULT_IDX);
  const [following, setFollowing] = useState(false);
  const [clip, setClip] = useState(null);   // { s, key } while a clip plays
  const [speech, setSpeech] = useState(null);

  const wrapRef = useRef(null);
  const rafRef = useRef(0);
  const clipTimer = useRef(0);
  const idleTimer = useRef(0);
  const lastAngle = useRef(-140);
  const clickStreak = useRef(0);
  const clickReset = useRef(0);
  const followingRef = useRef(false);

  useEffect(() => { followingRef.current = following; }, [following]);

  useEffect(() => {
    const coarse = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
    setEnabled(!coarse && window.innerWidth > 640);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    [...GAZE.map((g) => g.s), CLIPS.land.s, CLIPS.wave.s].forEach((s) => { const im = new Image(); im.src = s; });
    const t = setTimeout(() => {
      ['laugh', 'confused', 'anger', 'facepalm', 'smile'].forEach((k) => { const im = new Image(); im.src = CLIPS[k].s; });
    }, 3200);
    return () => clearTimeout(t);
  }, [enabled]);

  const toFollow = useCallback(() => {
    setClip(null);
    setSpeech(null);
    setFollowing(true);
    setIdx(pickFrame(lastAngle.current));
  }, []);

  const playClip = useCallback((name, opts = {}) => {
    const c = CLIPS[name];
    if (!c) return;
    clearTimeout(clipTimer.current);
    setFollowing(false);
    setClip({ s: c.s, key: Date.now() });
    const pool = SPEECH[name];
    const line = opts.say || (pool ? pool[Math.floor(Math.random() * pool.length)] : null);
    setSpeech(line);
    clipTimer.current = setTimeout(opts.onDone || toFollow, c.d + 140);
  }, [toFollow]);

  // Intro: land → wave → follow.
  useEffect(() => {
    if (!enabled) return;
    playClip('land', { onDone: () => playClip('wave', { onDone: toFollow }) });
    return () => { clearTimeout(clipTimer.current); clearTimeout(idleTimer.current); clearTimeout(clickReset.current); };
  }, [enabled, playClip, toFollow]);

  // External reactions (terminals, project views, theme, etc.).
  useEffect(() => {
    if (!enabled) return;
    const h = (e) => {
      const d = e.detail || {};
      if (d.emotion) playClip(d.emotion, { say: d.say });
    };
    window.addEventListener('pet-react', h);
    return () => window.removeEventListener('pet-react', h);
  }, [enabled, playClip]);

  // Cursor follow + idle smile.
  const onMove = useCallback((e) => {
    clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(() => { if (followingRef.current) playClip('smile', { say: 'still here 👀' }); }, IDLE_MS);

    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = 0;
      const el = wrapRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height * 0.42;
      lastAngle.current = Math.atan2(e.clientY - cy, e.clientX - cx) * 180 / Math.PI;
      if (followingRef.current) setIdx(pickFrame(lastAngle.current));
    });
  }, [playClip]);

  useEffect(() => {
    if (!enabled) return;
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [enabled, onMove]);

  const onClick = useCallback(() => {
    clearTimeout(clickReset.current);
    const em = ANNOY[Math.min(clickStreak.current, ANNOY.length - 1)];
    clickStreak.current += 1;
    clickReset.current = setTimeout(() => { clickStreak.current = 0; }, 2500);
    playClip(em);
  }, [playClip]);

  if (!enabled) return null;

  const src = clip ? clip.s : GAZE[idx].s;

  return (
    <div className={`mp-pet ${following ? 'is-follow' : ''}`} ref={wrapRef}>
      {speech && <div className="mp-pet-bubble" key={`b-${clip ? clip.key : 'x'}`}>{speech}</div>}
      <div className="mp-pet-glow" />
      <img
        key={clip ? clip.key : 'follow'}
        className="mp-pet-img"
        src={src}
        alt=""
        draggable="false"
        onClick={onClick}
        title="click me"
      />
      <div className="mp-pet-shadow" />
    </div>
  );
}

export default CharacterPet;
