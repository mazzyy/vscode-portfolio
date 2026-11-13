import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { projects } from '../../data/projects';
import { socials } from '../../data/profile';

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'app', label: 'Apps ⬇' },
  { key: 'ai', label: 'AI / ML' },
  { key: 'cloud', label: 'Cloud / DevOps' },
  { key: 'web', label: 'Web Apps' },
  { key: 'tools', label: 'Tools' },
];

const AI = ['ai', 'rag', 'openai', 'gemini', 'llm', 'ml', 'agent', 'pydantic', 'litellm', 'copilot', 'matching', 'deep learning', 'computer vision', 'onnx', 'chromadb', 'analytics', 'nlp'];
const CLOUD = ['kubernetes', 'docker', 'azure', 'aws', 'terraform', 'github actions', 'devops', 'aks', 'observability', 'infrastructure', 'ci/cd'];
const WEB = ['react', 'vue', 'node', 'typescript', 'fastapi', 'django', 'flask', 'express', 'webview', 'android', 'macos'];

function catsFor(p) {
  const blob = [...(p.tech || []), p.title, p.shortDesc].join(' ').toLowerCase();
  const has = (arr) => arr.some((k) => blob.includes(k));
  const cats = [];
  if (p.downloads && p.downloads.length) cats.push('app');
  if (has(AI)) cats.push('ai');
  if (has(CLOUD)) cats.push('cloud');
  if (has(WEB)) cats.push('web');
  if (cats.length === 0) cats.push('tools');
  return cats;
}

/* ---------- Right-hand detail panel ---------- */
function ProjectDetail({ project }) {
  const [img, setImg] = useState(0);
  useEffect(() => { setImg(0); }, [project.id]);

  const images = project.images || [];
  const isGithub = project.link && project.link.includes('github.com');
  const countries = project.targetMarkets ? `${project.targetMarkets.length}+ Countries` : null;

  return (
    <div className="mp-md-detail" key={project.id}>
      <div className="mp-md-detail-head">
        <div className="mp-md-detail-ico"><i className={`fas ${project.icon}`} /></div>
        <div className="mp-md-detail-headtext">
          <h3>{project.title}</h3>
          <p>{project.tagline || project.shortDesc}</p>
        </div>
        {project.link && (
          <a className="mp-md-visit" href={project.link} target="_blank" rel="noopener noreferrer">
            <i className={isGithub ? 'fab fa-github' : 'fas fa-arrow-up-right-from-square'} />
            {isGithub ? 'View on GitHub' : 'Visit Live Site'}
          </a>
        )}
      </div>

      <div className="mp-md-badges">
        <span className="mp-md-badge status"><span className="mp-status-dot" />{project.status}</span>
        <span className="mp-md-badge">{project.year}</span>
        {countries && <span className="mp-md-badge green"><i className="fas fa-globe" /> {countries}</span>}
      </div>

      {project.downloads && project.downloads.length > 0 && (
        <div className="mp-modal-downloads" style={{ marginTop: 18 }}>
          {project.downloads.map((d) => (
            <a key={d.url} href={d.url} className="mp-dl-btn" target="_blank" rel="noopener noreferrer">
              <i className={`fab ${d.icon}`} /> {d.label}
            </a>
          ))}
        </div>
      )}

      <div className="mp-md-divider" />

      {project.stats && (
        <div className="mp-modal-stats">
          {project.stats.map((s) => (
            <div key={s.label} className="mp-modal-stat">
              <div className="mp-modal-stat-val">{s.value}</div>
              <div className="mp-modal-stat-lbl">{s.label}</div>
            </div>
          ))}
        </div>
      )}

      {images.length > 0 && (
        <>
          <h4 className="mp-md-sub">{'// Screenshots'}</h4>
          <div className="mp-modal-gallery">
            <div className="mp-modal-main-img">
              <img src={images[img]} alt={`${project.title} screenshot ${img + 1}`} loading="lazy" />
            </div>
            {images.length > 1 && (
              <div className="mp-modal-thumbs">
                {images.map((src, i) => (
                  <img key={src} src={src} alt={`thumb ${i + 1}`} className={i === img ? 'active' : ''} onClick={() => setImg(i)} loading="lazy" />
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {project.video && (
        <>
          <h4 className="mp-md-sub">{'// Demo'}</h4>
          <div className="mp-modal-video">
            <iframe src={project.video} title={`${project.title} demo`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
          </div>
        </>
      )}

      <h4 className="mp-md-sub">{'// About'}</h4>
      <p className="mp-modal-desc">{project.fullDesc || project.shortDesc}</p>

      {project.featureCategories ? (
        <>
          <h4 className="mp-md-sub">{'// Features'}</h4>
          <div className="mp-modal-featcats">
            {project.featureCategories.map((cat) => (
              <div key={cat.category} className="mp-featcat">
                <h4 style={{ color: cat.color || 'var(--mp-accent)' }}>{cat.category}</h4>
                <div className="mp-featcat-items">
                  {cat.items.map((it) => (
                    <div key={it.name} className="mp-featcat-item">
                      <i className={`fas ${it.icon}`} style={{ color: cat.color || 'var(--mp-accent)' }} />
                      <div><b>{it.name}</b><span>{it.desc}</span></div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      ) : project.features && project.features.length > 0 && (
        <>
          <h4 className="mp-md-sub">{'// Key Features'}</h4>
          <ul className="mp-md-feats">
            {project.features.map((f) => <li key={f}><i className="fas fa-check" />{f}</li>)}
          </ul>
        </>
      )}

      <h4 className="mp-md-sub">{'// Tech Stack'}</h4>
      {project.techStack ? (
        <div className="mp-modal-stacklayers">
          {project.techStack.map((layer) => (
            <div key={layer.layer} className="mp-stacklayer">
              <span className="mp-stacklayer-name">{layer.layer}</span>
              <div className="mp-stacklayer-items">
                {layer.items.map((it) => <span key={it.name} className="mp-stacklayer-chip" style={{ '--chip': it.color }}>{it.name}</span>)}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mp-modal-tech">{project.tech.map((t) => <span key={t}>{t}</span>)}</div>
      )}
    </div>
  );
}

/* ---------- Section ---------- */
function ProjectsModern() {
  const [filter, setFilter] = useState('all');
  const tagged = useMemo(() => projects.map((p) => ({ ...p, cats: catsFor(p) })), []);
  const visible = useMemo(
    () => (filter === 'all' ? tagged : tagged.filter((p) => p.cats.includes(filter))),
    [filter, tagged]
  );

  const [selId, setSelId] = useState(projects[0].id);
  const selected = tagged.find((p) => p.id === selId) || visible[0] || tagged[0];

  useEffect(() => {
    if (!visible.find((p) => p.id === selId) && visible[0]) setSelId(visible[0].id);
  }, [filter]); // eslint-disable-line react-hooks/exhaustive-deps

  const select = useCallback((p) => {
    setSelId(p.id);
    try { window.dispatchEvent(new CustomEvent('pet-react', { detail: { emotion: 'smile', say: 'checking my work? 😊' } })); } catch (e) { /* ignore */ }
    if (window.innerWidth <= 900) {
      const d = document.querySelector('.mp-md-detail');
      if (d) setTimeout(() => d.scrollIntoView({ behavior: 'smooth', block: 'start' }), 40);
    }
  }, []);

  return (
    <section id="projects" className="mp-section">
      <div className="mp-section-head reveal">
        <span className="mp-section-index">02.</span>
        <h2 className="mp-section-title">projects<span className="mp-grad">[]</span></h2>
        <div className="mp-section-rule" />
        <a className="mp-section-link" href={`${socials.github}?tab=repositories`} target="_blank" rel="noopener noreferrer">
          <i className="fab fa-github" /> all repos
        </a>
      </div>

      <div className="mp-filters reveal">
        {FILTERS.map((f) => (
          <button key={f.key} className={`mp-filter ${filter === f.key ? 'active' : ''}`} onClick={() => setFilter(f.key)}>
            {f.label}
            <span className="mp-filter-count">{f.key === 'all' ? tagged.length : tagged.filter((p) => p.cats.includes(f.key)).length}</span>
          </button>
        ))}
      </div>

      <div className="mp-md reveal">
        <div className="mp-md-list">
          {visible.map((p) => (
            <button key={p.id} className={`mp-md-item ${p.id === selId ? 'active' : ''}`} onClick={() => select(p)}>
              <div className="mp-md-item-ico"><i className={`fas ${p.icon}`} /></div>
              <div className="mp-md-item-body">
                <h4>{p.title}{p.isShowcase && <span className="mp-md-star">★</span>}{p.downloads && p.downloads.length > 0 && <span className="mp-md-star"><i className="fas fa-download" /></span>}</h4>
                <p>{p.shortDesc}</p>
                <div className="mp-md-item-tech">
                  {p.tech.slice(0, 3).map((t) => <span key={t}>{t}</span>)}
                  {p.tech.length > 3 && <span className="mp-more">+{p.tech.length - 3}</span>}
                </div>
              </div>
              <i className="fas fa-chevron-right mp-md-item-arrow" />
            </button>
          ))}
        </div>

        <ProjectDetail project={selected} />
      </div>
    </section>
  );
}

export default ProjectsModern;
