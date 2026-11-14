import React from 'react';
import { useTilt } from './hooks';

/*
  A holographic ID-badge card (hanging from a lanyard) that tilts in 3D
  toward the cursor, with a glossy sheen that tracks the pointer — the photo
  is shown on the badge. Inspired by aayushbharti.in.
*/
function WandReveal({ src = 'character/look-00.webp', name = 'Abdul Musawar Soomro', role = 'Cloud & AI Engineer' }) {
  const tilt = useTilt(15);

  return (
    <div className="mp-badge-wrap">
      <div className="mp-badge-strap"><span>musawar.tech · musawar.tech ·</span></div>
      <div
        className="mp-badge"
        ref={tilt.ref}
        onMouseMove={tilt.onMouseMove}
        onMouseLeave={tilt.onMouseLeave}
      >
        <div className="mp-badge-clip" />
        <div className="mp-badge-tex" />
        <div className="mp-badge-photo"><img src={src} alt={name} draggable="false" /></div>
        <div className="mp-badge-sheen" />
        <div className="mp-badge-info">
          <span className="mp-badge-mono">{'</>'}</span>
          <div>
            <b>{name}</b>
            <small>{role}</small>
          </div>
        </div>
      </div>
      <div className="mp-badge-hint"><i className="fas fa-wand-magic-sparkles" /> hover to tilt</div>
    </div>
  );
}

export default WandReveal;
