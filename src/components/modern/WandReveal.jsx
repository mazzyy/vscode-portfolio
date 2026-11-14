import React, { useEffect, useRef, useState, useCallback } from 'react';

/*
  Cursor-scrubbed ID badge (aayushbharti-style wand reveal).

  The badge rotation was exported from badge.gif into a trimmed set of frames
  (public/badge/f00.webp .. f17.webp) spanning the real 180 deg flip:
  frame 0 = flat face, the middle frames pass edge-on, and the last frame is
  the flat back of the card (AMS logo + name). Fewer frames => each wand move
  rotates further, so the spin feels fast and snappy, not a slow crawl.
  The wand.png follows the cursor across the box: left -> right flips to the
  back, right -> left reverses to the face. It never auto-loops.
*/

const FRAME_COUNT = 18; // f00..f17 (face -> back, 180 deg)
const FRAMES = Array.from({ length: FRAME_COUNT }, (_, i) => `badge/f${String(i).padStart(2, '0')}.webp`);
const LAST = FRAME_COUNT - 1;

function WandReveal() {
  const wrapRef = useRef(null);
  const rafRef = useRef(0);
  const [idx, setIdx] = useState(0); // 0 = face
  const [active, setActive] = useState(false);

  // preload every frame so scrubbing is instant (no flash of a blank/dark frame)
  useEffect(() => {
    FRAMES.forEach((src) => { const im = new Image(); im.src = src; });
  }, []);

  const onMove = useCallback((e) => {
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
    const py = Math.min(1, Math.max(0, (e.clientY - rect.top) / rect.height));
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      el.style.setProperty('--wx', `${px * rect.width}px`);
      el.style.setProperty('--wy', `${py * rect.height}px`);
      setIdx(Math.round(px * LAST));
    });
  }, []);

  const onEnter = useCallback(() => setActive(true), []);
  const onLeave = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    setActive(false);
    setIdx(0); // settle back to the face
    const el = wrapRef.current;
    if (el) el.style.setProperty('--wx', '44px');
  }, []);

  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  return (
    <div
      ref={wrapRef}
      className={`mp-badge-wrap${active ? ' is-scrubbing' : ''}`}
      onMouseEnter={onEnter}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <img className="mp-wandimg" src="wand.png" alt="" draggable="false" />
      <img
        className="mp-badgegif"
        src={FRAMES[idx]}
        alt="Abdul Musawar Soomro — ID badge"
        draggable="false"
      />
      <div className="mp-badge-hint">
        <i className="fas fa-wand-magic-sparkles" /> move the wand left &rarr; right to spin the badge
      </div>
    </div>
  );
}

export default WandReveal;
