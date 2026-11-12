import React from 'react';
import { profile, socials } from '../../data/profile';
import { useTypewriter, useMagnetic } from './hooks';
import InteractiveTerminal from './InteractiveTerminal';

const heroIntro = [
  { t: 'cmd', v: 'whoami' },
  { t: 'out', v: 'abdul-musawar-soomro' },
  { t: 'cmd', v: 'cat profile.json' },
  { t: 'json', v: `{
  "role": "Kubernetes Developer",
  "company": "Siemens Healthineers",
  "location": "Erlangen, DE",
  "focus": ["Cloud", "AI Agents", "DevOps"],
  "experience": "6+ years",
  "status": "shipping 🚀"
}` },
  { t: 'cmd', v: './deploy.sh --prod' },
  { t: 'ok', v: '✔ build passed   ✔ tests green   ✔ deployed' },
  { t: 'sys', v: "↑ this shell is live — type 'help' and hit enter." },
];

function Hero({ onNavigate, onEnterVSCode, onDownloadCV, onMatrix }) {
  const role = useTypewriter(profile.roles, { typeSpeed: 65, deleteSpeed: 32, pause: 1500 });
  const magProjects = useMagnetic(0.25);
  const magCV = useMagnetic(0.25);

  return (
    <section id="home" className="mp-hero">
      <div className="mp-hero-scanlines" aria-hidden="true" />
      <div className="mp-hero-grid" aria-hidden="true" />

      <div className="mp-hero-inner">
        <div className="mp-hero-left reveal">
          <div className="mp-hero-badge">
            <span className="mp-pulse" /> Available for opportunities
          </div>

          <p className="mp-hero-hi">
            <span className="mp-mono-accent">const</span> greeting = <span className="mp-str">'Hi, I am'</span>;
          </p>

          <h1 className="mp-hero-name">
            Abdul <span className="mp-grad">Musawar</span> Soomro
          </h1>

          <div className="mp-hero-role">
            <span className="mp-prompt">~$</span>
            <span className="mp-role-text">{role}</span>
            <span className="mp-caret" />
          </div>

          <p className="mp-hero-tagline">{profile.tagline}</p>

          <div className="mp-hero-cta">
            <button ref={magProjects} className="mp-btn mp-btn-primary" onClick={() => onNavigate('projects')}>
              <i className="fas fa-rocket" /> View Projects
            </button>
            <button ref={magCV} className="mp-btn mp-btn-ghost" onClick={onDownloadCV}>
              <i className="fas fa-download" /> Download CV
            </button>
            <button className="mp-btn mp-btn-outline" onClick={onEnterVSCode}>
              <i className="fas fa-code" /> VS Code mode
            </button>
          </div>

          <div className="mp-hero-socials">
            <a href={socials.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><i className="fab fa-github" /></a>
            <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><i className="fab fa-linkedin" /></a>
            <a href={socials.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube"><i className="fab fa-youtube" /></a>
            <a href={socials.email} aria-label="Email"><i className="fas fa-envelope" /></a>
          </div>
        </div>

        <div className="mp-hero-right reveal">
          <div className="mp-term-card mp-term-card-live">
            <div className="mp-term-head">
              <span className="mp-dot red" />
              <span className="mp-dot yellow" />
              <span className="mp-dot green" />
              <span className="mp-term-title">musawar@portfolio: ~/dev — zsh</span>
            </div>
            <InteractiveTerminal
              variant="hero"
              initialLines={heroIntro}
              onEnterVSCode={onEnterVSCode}
              onDownloadCV={onDownloadCV}
              onMatrix={onMatrix}
              onGotoTab={() => onNavigate('playground')}
            />
          </div>
        </div>
      </div>

      <button className="mp-scroll-ind" onClick={() => onNavigate('about')} aria-label="Scroll down">
        <span>scroll</span>
        <i className="fas fa-chevron-down" />
      </button>
    </section>
  );
}

export default Hero;
