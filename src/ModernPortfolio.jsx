import React, { useState, useEffect, useRef, useCallback } from 'react';
import ParticleField from './components/modern/ParticleField';
import ModernNav from './components/modern/ModernNav';
import Hero from './components/modern/Hero';
import AboutModern from './components/modern/AboutModern';
import ProjectsModern from './components/modern/ProjectsModern';
import ExperienceModern from './components/modern/ExperienceModern';
import Playground from './components/modern/Playground';
import ContactModern from './components/modern/ContactModern';
import CommandPalette from './components/modern/CommandPalette';
import TerminalDock from './components/modern/TerminalDock';
import MatrixRain from './components/modern/MatrixRain';
import { loadSavedTheme } from './components/modern/ThemeLab';

const SECTIONS = ['home', 'about', 'projects', 'experience', 'playground', 'contact'];
const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

function ModernPortfolio({ onEnterVSCode }) {
  const [activeSection, setActiveSection] = useState('home');
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [matrix, setMatrix] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);
  const cursorRef = useRef(null);
  const konamiRef = useRef([]);

  const navigate = useCallback((id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const downloadCV = useCallback(() => {
    const link = document.createElement('a');
    link.href = 'resume.pdf';
    link.download = 'Abdul_Musawar_Soomro_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  // apply saved accent theme
  useEffect(() => { loadSavedTheme(); }, []);

  // scroll reveal for static elements
  useEffect(() => {
    const els = Array.from(document.querySelectorAll('.modern-root .reveal'));
    if (typeof IntersectionObserver === 'undefined') {
      els.forEach((e) => e.classList.add('reveal-in'));
      return;
    }
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add('reveal-in'); obs.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    els.forEach((e) => obs.observe(e));
    return () => obs.disconnect();
  }, []);

  // scrollspy
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) setActiveSection(en.target.id); });
    }, { threshold: 0.3, rootMargin: '-45% 0px -45% 0px' });
    SECTIONS.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  // scroll progress + back-to-top
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? (h.scrollTop / max) * 100 : 0);
      setShowTop(h.scrollTop > 700);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // command palette hotkey + konami
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPaletteOpen((o) => !o);
      }
      // konami
      const seq = konamiRef.current;
      seq.push(e.key);
      if (seq.length > KONAMI.length) seq.shift();
      if (seq.length === KONAMI.length && seq.every((k, i) => k.toLowerCase() === KONAMI[i].toLowerCase())) {
        konamiRef.current = [];
        setMatrix(true);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // cursor glow (fine pointer only)
  useEffect(() => {
    const el = cursorRef.current;
    if (!el) return;
    if (window.matchMedia && window.matchMedia('(pointer: coarse)').matches) { el.style.display = 'none'; return; }
    let rafId;
    const move = (e) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        el.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      });
    };
    window.addEventListener('mousemove', move);
    return () => { window.removeEventListener('mousemove', move); cancelAnimationFrame(rafId); };
  }, []);

  return (
    <div className="modern-root">
      <div className="mp-progress" style={{ width: `${progress}%` }} />
      <div ref={cursorRef} className="mp-cursor-glow" aria-hidden="true" />
      <ParticleField />
      <div className="mp-vignette" aria-hidden="true" />

      <ModernNav
        activeSection={activeSection}
        onNavigate={navigate}
        onOpenPalette={() => setPaletteOpen(true)}
        onEnterVSCode={onEnterVSCode}
      />

      <main className="mp-main">
        <Hero onNavigate={navigate} onEnterVSCode={onEnterVSCode} onDownloadCV={downloadCV} onMatrix={() => setMatrix(true)} />
        <AboutModern />
        <ProjectsModern />
        <ExperienceModern />
        <Playground onEnterVSCode={onEnterVSCode} onMatrix={() => setMatrix(true)} onDownloadCV={downloadCV} />
        <ContactModern onDownloadCV={downloadCV} onEnterVSCode={onEnterVSCode} />
      </main>

      <button
        className={`mp-top ${showTop ? 'show' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
      >
        <i className="fas fa-chevron-up" />
      </button>

      <TerminalDock
        onEnterVSCode={onEnterVSCode}
        onMatrix={() => setMatrix(true)}
        onDownloadCV={downloadCV}
        onNavigate={navigate}
      />

      {paletteOpen && (
        <CommandPalette
          onClose={() => setPaletteOpen(false)}
          onNavigate={navigate}
          onEnterVSCode={onEnterVSCode}
          onDownloadCV={downloadCV}
          onMatrix={() => setMatrix(true)}
        />
      )}

      {matrix && <MatrixRain onClose={() => setMatrix(false)} />}
    </div>
  );
}

export default ModernPortfolio;
