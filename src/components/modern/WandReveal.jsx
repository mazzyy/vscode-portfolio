import React, { useEffect, useRef, useState, useCallback } from 'react';

/*
  Cursor-scrubbed ID badge (aayushbharti-style wand reveal).

  Frames (public/badge/f00.webp .. f17.webp) span the real 180 deg flip:
  frame 0 = flat face, the middle passes edge-on, frame 17 = flat back
  (AMS logo + name). The wand.png follows the cursor across the box, and the
  ROTATION is mapped to the card's own horizontal span so a single sweep of
  the wand across the visible card flips it all the way to the back. It never
  auto-loops and does NOT reset on mouse-leave: the badge stays locked at
  wherever the wand left it until the user sweeps back.
*/

const FRAME_COUNT = 18; // f00..f17 (face -> back, 180 deg)
const FRAMES = Array.from({ length: FRAME_COUNT }, (_, i) => `badge/f${String(i).padStart(2, '0')}.webp`);
const LAST = FRAME_COUNT - 1;

function WandReveal() {
  const wrapRef = useRef(null);
  const gifRef = useRef(null);
  const rafRef = useRef(0);
  const [idx, setIdx] = useState(0); // 0 = face

  // preload every frame so scrubbing is instant (no flash of a blank frame)
  useEffect(() => {
    FRAMES.forEach((src) => { const im = new Image(); im.src = src; });
  }, []);

  const onMove = useCallback((e) => {
    const el = wrapRef.current;
    const gif = gifRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const card = gif ? gif.getBoundingClientRect() : rect;
    // rotation is driven across the visible card (slightly inset so the two
    // extremes — flat face / flat back — are easy to reach without pixel aiming)
    const inset = card.width * 0.06;
    const zoneL = card.left + inset;
    const zoneR = card.right - inset;
    const frac = Math.min(1, Math.max(0, (e.clientX - zoneL) / Math.max(1, zoneR - zoneL)));
    // the wand itself tracks the cursor freely across the whole box
    const wx = Math.min(rect.width, Math.max(0, e.clientX - rect.left));
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      el.style.setProperty('--wx', `${wx}px`);
      setIdx(Math.round(frac * LAST));
    });
  }, []);

  // no reset on leave — the flip stays locked where the user left it
  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  return (
    <div
      ref={wrapRef}
      className="mp-badge-wrap"
      onMouseMove={onMove}
    >
      <img className="mp-wandimg" src="wand.png" alt="" draggable="false" />
      <img
        ref={gifRef}
        className="mp-badgegif"
        src={FRAMES[idx]}
        alt="Abdul Musawar Soomro — ID badge"
        draggable="false"
      />
      <div className="mp-badge-hint">
        <i className="fas fa-wand-magic-sparkles" /> sweep the wand across the card to flip it
      </div>
    </div>
  );
}

export default WandReveal;
