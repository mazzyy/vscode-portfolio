import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { projects } from '../../data/projects';
import { socials } from '../../data/profile';
import { useTilt } from './hooks';

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

function ProjectCard({ project, onOpen, index }) {
  const tilt = useTilt(8);
  const isGithub = project.link && project.link.includes('github.com');
  const hasMedia = (project.images && project.images.length) || project.video;
  return (
    <article
      ref={tilt.ref}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
      className={`mp-pcard ${project.isShowcase ? 'featured' : ''}`}
      style={{ animationDelay: `${(index % 6) * 55}ms` }}
      onClick={() => onOpen(project)}
    >
      <div className="mp-pcard-glow" />
      <div className="mp-pcard-top">
        <div className="mp-pcard-ico"><i className={`fas ${project.icon}`} /></div>
        <div className="mp-pcard-meta">
          {project.downloads && project.downloads.length > 0 && <span className="mp-chip-dl"><i className="fas fa-download" /> App</span>}
          {project.isShowcase && <span className="mp-chip-featured">★ Featured</span>}
          <span className="mp-pcard-year">{project.year}</span>
        </div>
      </div>

      <h3 className="mp-pcard-title">{project.title}</h3>
      <p className="mp-pcard-desc">{project.shortDesc}</p>

      <div className="mp-pcard-tech">
        {project.tech.slice(0, 4).map((t) => <span key={t}>{t}</span>)}
        {project.tech.length > 4 && <span className="mp-more">+{project.tech.length - 4}</span>}
      </div>

      <div className="mp-pcard-foot">
        <span className={`mp-status mp-status-${(project.status || '').toLowerCase().replace(/[^a-z]/g, '')}`}>
          <span className="mp-status-dot" />{project.status}
        </span>
        <span className="mp-pcard-link">
          {hasMedia && <i className="fas fa-images mp-pcard-media" title="Has screenshots/video" />}
          {isGithub ? <i className="fab fa-github" /> : project.link ? <i className="fas fa-arrow-up-right-from-square" /> : <i className="fas fa-circle-info" />}
          Details
        </span>
      </div>
    </article>
  );
}

function ProjectModal({ project, onClose }) {
  const [img, setImg] = useState(0);
  const images = project.images || [];
  const isGithub = project.link && project.link.includes('github.com');

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div className="mp-modal-overlay" onClick={onClose}>
      <div className="mp-modal" onClick={(e) => e.stopPropagation()}>
        <button className="mp-modal-close" onClick={onClose} aria-label="Close">×</button>

        <div className="mp-modal-head">
          <div className="mp-modal-ico"><i className={`fas ${project.icon}`} /></div>
          <div>
            <h3>{project.title}</h3>
            <div className="mp-modal-sub">
              <span className="mp-status-dot" />{project.status} · {project.year}
            </div>
          </div>
        </div>

        {/* Download buttons — prominent for app projects */}
        {project.downloads && project.downloads.length > 0 && (
          <div className="mp-modal-downloads">
            {project.downloads.map((d) => (
              <a key={d.url} href={d.url} className="mp-dl-btn" target="_blank" rel="noopener noreferrer">
                <i className={`fab ${d.icon}`} /> {d.label}
              </a>
            ))}
          </div>
        )}

        {/* Video demo */}
        {project.video && (
          <div className="mp-modal-video">
            <iframe
              src={project.video}
              title={`${project.title} demo`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}

        {/* Screenshot gallery */}
        {images.length > 0 && (
          <div className="mp-modal-gallery">
            <div className="mp-modal-main-img">
              <img src={images[img]} alt={`${project.title} screenshot ${img + 1}`} loading="lazy" />
            </div>
            {images.length > 1 && (
              <div className="mp-modal-thumbs">
                {images.map((src, i) => (
                  <img
                    key={src}
                    src={src}
                    alt={`thumb ${i + 1}`}
                    className={i === img ? 'active' : ''}
                    onClick={() => setImg(i)}
                    loading="lazy"
                  />
                ))}
              </div>
            )}
          </div>
        )}

        <p className="mp-modal-desc">{project.fullDesc || project.shortDesc}</p>

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

        {/* Grouped feature categories (showcase projects) */}
        {project.featureCategories ? (
          <div className="mp-modal-featcats">
            {project.featureCategories.map((cat) => (
              <div key={cat.category} className="mp-featcat">
                <h4 style={{ color: cat.color || 'var(--mp-accent)' }}>{cat.category}</h4>
                <div className="mp-featcat-items">
                  {cat.items.map((it) => (
                    <div key={it.name} className="mp-featcat-item">
                      <i className={`fas ${it.icon}`} style={{ color: cat.color || 'var(--mp-accent)' }} />
                      <div>
                        <b>{it.name}</b>
                        <span>{it.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : project.features && project.features.length > 0 && (
          <div className="mp-modal-feats">
            <h4>Key Features</h4>
            <ul>
              {project.features.map((f) => (
                <li key={f}><i className="fas fa-check" />{f}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Tech stack (grouped by layer when available) */}
        {project.techStack ? (
          <div className="mp-modal-stacklayers">
            <h4>Tech Stack</h4>
            {project.techStack.map((layer) => (
              <div key={layer.layer} className="mp-stacklayer">
                <span className="mp-stacklayer-name">{layer.layer}</span>
                <div className="mp-stacklayer-items">
                  {layer.items.map((it) => (
                    <span key={it.name} className="mp-stacklayer-chip" style={{ '--chip': it.color }}>
                      {it.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mp-modal-tech">
            {project.tech.map((t) => <span key={t}>{t}</span>)}
          </div>
        )}

        {project.link && (
          <a href={project.link} target="_blank" rel="noopener noreferrer" className="mp-btn mp-btn-outline mp-modal-cta">
            {isGithub ? <><i className="fab fa-github" /> View on GitHub</> : <><i className="fas fa-arrow-up-right-from-square" /> Visit Live Site</>}
          </a>
        )}
      </div>
    </div>
  );
}

function ProjectsModern() {
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState(null);

  const tagged = useMemo(() => projects.map((p) => ({ ...p, cats: catsFor(p) })), []);
  const visible = useMemo(
    () => (filter === 'all' ? tagged : tagged.filter((p) => p.cats.includes(filter))),
    [filter, tagged]
  );

  const open = useCallback((p) => {
    setSelected(p);
    try { window.dispatchEvent(new CustomEvent('pet-react', { detail: { emotion: 'smile', say: 'checking my work? 😊' } })); } catch (e) { /* ignore */ }
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
          <button
            key={f.key}
            className={`mp-filter ${filter === f.key ? 'active' : ''}`}
            onClick={() => setFilter(f.key)}
          >
            {f.label}
            <span className="mp-filter-count">
              {f.key === 'all' ? tagged.length : tagged.filter((p) => p.cats.includes(f.key)).length}
            </span>
          </button>
        ))}
      </div>

      <div className="mp-projects-grid">
        {visible.map((p, i) => (
          <ProjectCard key={p.id} project={p} onOpen={open} index={i} />
        ))}
      </div>

      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}

export default ProjectsModern;
