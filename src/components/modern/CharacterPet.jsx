import React, { useState, useEffect, useRef, useCallback } from 'react';

/*
  A little portrait companion pinned to the bottom-right corner whose
  eyes follow the cursor. The source GIF sweeps the ACTUAL on-screen gaze
  right → up → left → down; each frame below is tagged with the screen
  direction its eyes point, and we show the frame whose gaze best matches
  the cursor direction.

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

function angularDist(a, b) {
  return Math.abs(((a - b + 540) % 360) - 180);
}

function pickFrame(angle) {
  let best = DEFAULT_IDX;
  let bestD = Infinity;
  for (let i = 0; i < GAZE.length; i++) {
    const d = angularDist(angle, GAZE[i].a);
    if (d < bestD) { bestD = d; best = i; }
  }
  return best;
}

function CharacterPet() {
  const [idx, setIdx] = useState(DEFAULT_IDX);
  const [enabled, setEnabled] = useState(false);
  const wrapRef = useRef(null);
  const rafRef = useRef(0);

  // Only run where there's a real pointer and room for it.
  useEffect(() => {
    const coarse = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
    setEnabled(!coarse && window.innerWidth > 640);
  }, []);

  // Preload every frame so swaps are instant (no flicker).
  useEffect(() => {
    if (!enabled) return;
    GAZE.forEach((g) => { const im = new Image(); im.src = g.s; });
  }, [enabled]);

  const onMove = useCallback((e) => {
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = 0;
      const el = wrapRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      // aim from a point near the eyes (upper third of the portrait)
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height * 0.42;
      const angle = Math.atan2(e.clientY - cy, e.clientX - cx) * 180 / Math.PI;
      setIdx(pickFrame(angle));
    });
  }, []);

  useEffect(() => {
    if (!enabled) return;
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [enabled, onMove]);

  if (!enabled) return null;

  return (
    <div className="mp-pet" ref={wrapRef} aria-hidden="true">
      <div className="mp-pet-glow" />
      <img className="mp-pet-img" src={GAZE[idx].s} alt="" draggable="false" />
      <div className="mp-pet-shadow" />
    </div>
  );
}

export default CharacterPet;
