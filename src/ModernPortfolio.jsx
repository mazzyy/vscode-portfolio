import React, { useState, useEffect, useRef, useCallback } from 'react';
import ParticleField from './components/modern/ParticleField';
import ModernNav from './components/modern/ModernNav';
import Hero from './components/modern/Hero';
import Ticker from './components/modern/Ticker';
import AboutModern from './components/modern/AboutModern';
import ProjectsModern from './components/modern/ProjectsModern';
import ExperienceModern from './components/modern/ExperienceModern';
import ContactModern from './components/modern/ContactModern';
import CommandPalette from './components/modern/CommandPalette';
import TerminalDock from './components/modern/TerminalDock';
import CharacterPet from './components/modern/CharacterPet';
import MatrixRain from './components/modern/MatrixRain';
import IntroSequence from './components/modern/IntroSequence';
import { loadSavedTheme } from './components/modern/ThemeLab';

const SECTIONS = ['home', 'about', 'projects', 'experience', 'contact'];
const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

function ModernPortfolio({ onEnterVSCode }) {
  const [activeSection, setActiveSection] = useState('home');
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [matrix, setMatrix] = useState(false);
  const [progress, setProgress] = useState(0);
  const [intro, setIntro] = useState(() => {
    try { return !sessionStorage.getItem('mp-intro-seen'); } catch (e) { return true; }
  });
  const cursorRef = useRef(null);
  const konamiRef = useRef([]);

  const endIntro = useCallback(() => {
    try { sessionStorage.setItem('mp-intro-seen', '1'); } catch (e) { /* ignore */ }
    setIntro(false);
  }, []);

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
    try { window.dispatchEvent(new CustomEvent('pet-react', { detail: { emotion: 'laugh', say: 'thanks for grabbing my CV! 📄' } })); } catch (e) { /* ignore */ }
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
      {intro && <IntroSequence onDone={endIntro} />}
      <div className="mp-progress" style={{ width: `${progress}%` }} />
      <div ref={cursorRef} className="mp-cursor-glow" aria-hidden="true" />
      <ParticleField />
      <div className="mp-vignette" aria-hidden="true" />
      <div className="mp-grain" aria-hidden="true" />

      <ModernNav
        activeSection={activeSection}
        onNavigate={navigate}
        onOpenPalette={() => setPaletteOpen(true)}
        onEnterVSCode={onEnterVSCode}
      />

      <main className="mp-main">
        <Hero onNavigate={navigate} onEnterVSCode={onEnterVSCode} onDownloadCV={downloadCV} onMatrix={() => setMatrix(true)} />
        <Ticker />
        <AboutModern />
        <ProjectsModern />
        <ExperienceModern />
        <ContactModern onDownloadCV={downloadCV} onEnterVSCode={onEnterVSCode} />
      </main>

      <TerminalDock
        onEnterVSCode={onEnterVSCode}
        onMatrix={() => setMatrix(true)}
        onDownloadCV={downloadCV}
        onNavigate={navigate}
      />

      <CharacterPet />

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
