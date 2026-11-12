import React from 'react';
import { profile, socials } from '../../data/profile';
import { useMagnetic } from './hooks';

const LINKS = [
  { icon: 'fas fa-envelope', label: 'Email', value: profile.email, href: socials.email },
  { icon: 'fab fa-linkedin', label: 'LinkedIn', value: '/in/musawar', href: socials.linkedin, external: true },
  { icon: 'fab fa-github', label: 'GitHub', value: '@mazzyy', href: socials.github, external: true },
  { icon: 'fab fa-youtube', label: 'YouTube', value: '@Ideeaflux', href: socials.youtube, external: true },
];

function ContactModern({ onDownloadCV }) {
  const mag = useMagnetic(0.2);
  return (
    <section id="contact" className="mp-section mp-contact">
      <div className="mp-section-head reveal">
        <span className="mp-section-index">05.</span>
        <h2 className="mp-section-title">contact<span className="mp-grad">()</span></h2>
        <div className="mp-section-rule" />
      </div>

      <div className="mp-contact-grid">
        <div className="mp-contact-left reveal">
          <h3 className="mp-contact-head">Let's build something.</h3>
          <p className="mp-contact-sub">
            I'm open to roles in cloud, AI, and platform engineering — and always up for an interesting problem.
            Drop a line and I'll reply.
          </p>

          <div className="mp-contact-links">
            {LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target={l.external ? '_blank' : undefined}
                rel={l.external ? 'noopener noreferrer' : undefined}
                className="mp-contact-link"
              >
                <span className="mp-contact-ico"><i className={l.icon} /></span>
                <span className="mp-contact-info">
                  <b>{l.label}</b>
                  <small>{l.value}</small>
                </span>
                <i className="fas fa-arrow-right mp-contact-arrow" />
              </a>
            ))}
          </div>

          <button ref={mag} className="mp-btn mp-btn-primary" onClick={onDownloadCV}>
            <i className="fas fa-download" /> Download CV
          </button>
        </div>

        <div className="mp-contact-right reveal">
          <div className="mp-term-card">
            <div className="mp-term-head">
              <span className="mp-dot red" /><span className="mp-dot yellow" /><span className="mp-dot green" />
              <span className="mp-term-title">contact.json</span>
            </div>
            <pre className="mp-contact-json">{`{
  "name": "${profile.name}",
  "email": "${profile.email}",
  "phone": "${profile.phone}",
  "location": "${profile.location}",
  "timezone": "CET (UTC+1)",
  "status": "${profile.status}",
  "responseTime": "< 24h"
}`}</pre>
          </div>
        </div>
      </div>

      <footer className="mp-footer">
        <span>Designed &amp; built by {profile.name}</span>
        <span className="mp-footer-dim">React · CSS · a canvas or two · zero templates</span>
      </footer>
    </section>
  );
}

export default ContactModern;
