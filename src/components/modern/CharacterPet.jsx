import React, { useState, useEffect, useRef, useCallback } from 'react';

/*
  Bottom-right portrait companion.

  1. On arrival he plays the "falling into the spotlight" landing clip.
  2. Then his eyes follow the cursor (frames split from looking.gif).
  3. Emotion clips fire on interaction: click him to cycle through his
     moods, run a joke / unknown command in a terminal, or leave the
     page idle. Clips play once (loop=1 WebP) then he resumes following.

  Other parts of the app trigger a reaction by dispatching:
     window.dispatchEvent(new CustomEvent('pet-react',{detail:{emotion:'laugh'}}))

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
const DEFAULT_IDX = 5; // rests gazing up-left toward the page

// Play-once clips: { src, dur(ms) }. dur = measured loop length (+ buffer in code).
const CLIPS = {
  land:     { s: 'character/land.webp',     d: 2750 },
  laugh:    { s: 'character/laugh.webp',    d: 1920 },
  confused: { s: 'character/confused.webp', d: 1680 },
  shock:    { s: 'character/shock.webp',    d: 1280 },
  smile:    { s: 'character/smile.webp',    d: 1440 },
};
const CLICK_CYCLE = ['laugh', 'confused', 'shock', 'smile'];
const IDLE_MS = 15000;

function angularDist(a, b) {
  return Math.abs(((a - b + 540) % 360) - 180);
}
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
  const [clip, setClip] = useState(null); // { s, key } while a clip plays

  const wrapRef = useRef(null);
  const rafRef = useRef(0);
  const clipTimer = useRef(0);
  const idleTimer = useRef(0);
  const lastAngle = useRef(-140);
  const clickIdx = useRef(0);
  const followingRef = useRef(false);

  useEffect(() => { followingRef.current = following; }, [following]);

  // Only run with a real pointer and enough room.
  useEffect(() => {
    const coarse = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
    setEnabled(!coarse && window.innerWidth > 640);
  }, []);

  // Preload gaze frames + landing now; emotion clips shortly after.
  useEffect(() => {
    if (!enabled) return;
    [...GAZE.map((g) => g.s), CLIPS.land.s].forEach((s) => { const im = new Image(); im.src = s; });
    const t = setTimeout(() => {
      ['laugh', 'confused', 'shock', 'smile'].forEach((k) => { const im = new Image(); im.src = CLIPS[k].s; });
    }, 2500);
    return () => clearTimeout(t);
  }, [enabled]);

  const toFollow = useCallback(() => {
    setClip(null);
    setFollowing(true);
    setIdx(pickFrame(lastAngle.current));
  }, []);

  const playClip = useCallback((name) => {
    const c = CLIPS[name];
    if (!c) return;
    clearTimeout(clipTimer.current);
    setFollowing(false);
    setClip({ s: c.s, key: Date.now() }); // changing key remounts <img> → restarts the animation
    clipTimer.current = setTimeout(toFollow, c.d + 140);
  }, [toFollow]);

  // Landing sequence on mount.
  useEffect(() => {
    if (!enabled) return;
    playClip('land');
    return () => { clearTimeout(clipTimer.current); clearTimeout(idleTimer.current); };
  }, [enabled, playClip]);

  // External reaction events (terminals, etc.).
  useEffect(() => {
    if (!enabled) return;
    const h = (e) => { const em = e.detail && e.detail.emotion; if (em) playClip(em); };
    window.addEventListener('pet-react', h);
    return () => window.removeEventListener('pet-react', h);
  }, [enabled, playClip]);

  // Cursor following + idle detection.
  const onMove = useCallback((e) => {
    clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(() => { if (followingRef.current) playClip('smile'); }, IDLE_MS);

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
    const em = CLICK_CYCLE[clickIdx.current % CLICK_CYCLE.length];
    clickIdx.current += 1;
    playClip(em);
  }, [playClip]);

  if (!enabled) return null;

  const src = clip ? clip.s : GAZE[idx].s;

  return (
    <div className={`mp-pet ${following ? 'is-follow' : ''}`} ref={wrapRef}>
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
