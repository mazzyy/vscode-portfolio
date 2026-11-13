import React, { useRef, useCallback } from 'react';

/*
  A portrait that stays greyscale until you sweep a glowing "wand" over it —
  a spotlight ring follows the cursor and colourises the photo underneath.
*/
function WandReveal({ src = 'character/look-00.webp', name = 'Abdul Musawar Soomro' }) {
  const ref = useRef(null);

  const onMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--x', `${e.clientX - r.left}px`);
    el.style.setProperty('--y', `${e.clientY - r.top}px`);
    el.classList.add('on');
  }, []);

  const toggle = useCallback((on) => {
    const el = ref.current;
    if (el) el.classList.toggle('on', on);
  }, []);

  return (
    <div
      className="mp-wand"
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => toggle(true)}
      onMouseLeave={() => toggle(false)}
    >
      <div className="mp-wand-bg" />
      <img className="mp-wand-img color" src={src} alt={name} draggable="false" />
      <img className="mp-wand-img gray" src={src} alt="" aria-hidden="true" draggable="false" />
      <div className="mp-wand-ring" aria-hidden="true" />
      <div className="mp-wand-hint"><i className="fas fa-wand-magic-sparkles" /> wave to reveal</div>
    </div>
  );
}

export default WandReveal;
