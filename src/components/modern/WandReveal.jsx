import React from 'react';

/*
  Uses the supplied badge.gif (optimized to badge.webp) — the full ID badge
  on a lanyard that rotates and shows the name — with the wand.png resting to
  its left; the wand flicks across on hover.
*/
function WandReveal() {
  return (
    <div className="mp-badge-wrap">
      <img className="mp-wandimg" src="wand.png" alt="" draggable="false" />
      <img className="mp-badgegif" src="badge.webp" alt="Abdul Musawar Soomro — ID badge" draggable="false" />
      <div className="mp-badge-hint"><i className="fas fa-wand-magic-sparkles" /> hover to flick the wand</div>
    </div>
  );
}

export default WandReveal;
