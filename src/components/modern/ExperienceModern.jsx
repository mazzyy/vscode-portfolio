import React from 'react';
import { experience, education } from '../../data/profile';
import { useInView } from './hooks';

function TimelineItem({ item, index }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} className={`mp-tl-item ${inView ? 'in' : ''}`} style={{ transitionDelay: `${index * 60}ms` }}>
      <div className="mp-tl-node"><span /></div>
      <div className="mp-tl-card">
        <div className="mp-tl-date">{item.date}</div>
        <h3 className="mp-tl-title">{item.title}</h3>
        <div className="mp-tl-company">
          <i className="fas fa-building" /> {item.company}
          {item.location && <span className="mp-tl-loc"> · {item.location}</span>}
        </div>
        {item.desc && <p className="mp-tl-desc">{item.desc}</p>}
      </div>
    </div>
  );
}

function ExperienceModern() {
  return (
    <section id="experience" className="mp-section">
      <div className="mp-section-head reveal">
        <span className="mp-section-index">03.</span>
        <h2 className="mp-section-title">experience<span className="mp-grad">{'{}'}</span></h2>
        <div className="mp-section-rule" />
      </div>

      <div className="mp-exp-wrap">
        <div className="mp-exp-col">
          <h3 className="mp-subhead reveal"><span className="mp-prompt">~$</span> git log --work</h3>
          <div className="mp-timeline">
            {experience.map((e, i) => <TimelineItem key={e.title + e.date} item={e} index={i} />)}
          </div>
        </div>

        <div className="mp-exp-col">
          <h3 className="mp-subhead reveal"><span className="mp-prompt">~$</span> git log --education</h3>
          <div className="mp-timeline">
            {education.map((e, i) => <TimelineItem key={e.title + e.date} item={e} index={i} />)}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ExperienceModern;
