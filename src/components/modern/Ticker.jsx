import React from 'react';

const ITEMS = [
  'Cloud Engineer', 'AI Agents', 'Kubernetes', 'DevOps', 'Full-Stack',
  'FastAPI', 'React', 'TypeScript', 'Azure', 'AWS', 'RAG', 'Terraform', 'Python', 'Docker',
];

function Row() {
  return (
    <div className="mp-ticker-row" aria-hidden="true">
      {ITEMS.map((w, i) => (
        <span key={i} className="mp-ticker-item">{w}<i className="mp-ticker-sep">✦</i></span>
      ))}
    </div>
  );
}

function Ticker() {
  return (
    <div className="mp-ticker" aria-hidden="true">
      <div className="mp-ticker-track"><Row /><Row /></div>
    </div>
  );
}

export default Ticker;
