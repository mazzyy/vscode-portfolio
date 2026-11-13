import React from 'react';
import { profile, skills } from '../../data/profile';
import { useInView, useCountUp } from './hooks';
import WandReveal from './WandReveal';

function StatCard({ stat }) {
  const [ref, inView] = useInView();
  const value = useCountUp(stat.value, inView);
  return (
    <div ref={ref} className="mp-stat">
      <div className="mp-stat-value">{value}{stat.suffix}</div>
      <div className="mp-stat-label">{stat.label}</div>
    </div>
  );
}

function SkillBar({ skill, index }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} className="mp-skill" style={{ transitionDelay: `${index * 70}ms` }}>
      <div className="mp-skill-top">
        <span className="mp-skill-ico">
          <i className={`${skill.icon.includes('fab') ? '' : 'fas '}${skill.icon}`} />
        </span>
        <span className="mp-skill-name">{skill.title}</span>
        <span className="mp-skill-pct">{skill.level}%</span>
      </div>
      <div className="mp-skill-track">
        <div className="mp-skill-fill" style={{ width: inView ? `${skill.level}%` : '0%' }} />
      </div>
      <div className="mp-skill-tags">
        {skill.tags.map((t) => <span key={t}>{t}</span>)}
      </div>
    </div>
  );
}

function AboutModern() {
  return (
    <section id="about" className="mp-section">
      <div className="mp-section-head reveal">
        <span className="mp-section-index">01.</span>
        <h2 className="mp-section-title">about<span className="mp-grad">()</span></h2>
        <div className="mp-section-rule" />
      </div>

      <div className="mp-about-grid">
        <div className="mp-about-bio reveal">
          <WandReveal />
          <p className="mp-comment">{'/**'}</p>
          <p className="mp-bio-text">{profile.bio}</p>
          <p className="mp-comment">{' */'}</p>

          <div className="mp-about-meta">
            <div><i className="fas fa-location-dot" /> {profile.location}</div>
            <div><i className="fas fa-briefcase" /> {profile.role}</div>
            <div><i className="fas fa-graduation-cap" /> M.Sc. Data Science @ FAU Erlangen-Nürnberg</div>
          </div>

          <div className="mp-stats-row">
            {profile.stats.map((s) => <StatCard key={s.label} stat={s} />)}
          </div>
        </div>

        <div className="mp-about-skills reveal">
          <h3 className="mp-subhead"><span className="mp-prompt">~$</span> ls ./skills</h3>
          {skills.map((s, i) => <SkillBar key={s.title} skill={s} index={i} />)}
        </div>
      </div>
    </section>
  );
}

export default AboutModern;
