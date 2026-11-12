import React, { useState } from 'react';
import { projects } from '../../data/projects';

function ProjectsSection() {

  const [selectedProject, setSelectedProject] = useState(projects[0]);
  const [lightbox, setLightbox] = useState({ open: false, images: [], index: 0, title: '' });

  const openLightbox = (images, index, title) => {
    setLightbox({ open: true, images, index, title });
  };

  const closeLightbox = () => {
    setLightbox({ open: false, images: [], index: 0, title: '' });
  };

  const navigateLightbox = (dir) => {
    setLightbox(prev => ({
      ...prev,
      index: (prev.index + dir + prev.images.length) % prev.images.length
    }));
  };

  return (
    <>
    <div className="projects-container">
      {/* Left Side - Project List */}
      <div className="projects-list">
        <h2 className="section-title">Featured Projects</h2>
        
        {projects.map((project) => (
          <div 
            key={project.id} 
            className={`project-item ${selectedProject?.id === project.id ? 'active' : ''}`}
            onClick={() => setSelectedProject(project)}
          >
            <div className="project-item-icon">
              <i className={`fas ${project.icon}`}></i>
            </div>
            <div className="project-item-info">
              <h3>{project.title}</h3>
              <p>{project.shortDesc}</p>
              <div className="project-item-tech">
                {project.tech.map((tech, index) => (
                  <span key={index}>{tech}</span>
                ))}
              </div>
            </div>
            <div className="project-item-arrow">
              <i className="fas fa-chevron-right"></i>
            </div>
          </div>
        ))}
      </div>

      {/* Right Side - Detail Panel */}
      <div className={`projects-detail ${selectedProject ? 'has-content' : ''}`}>
        {selectedProject ? (
          selectedProject.isShowcase ? (
            /* === SHOWCASE LAYOUT (UniAdvisorAI) === */
            <div className="detail-content-wrapper showcase-layout">
              {/* Hero Header */}
              <div className="showcase-hero">
                <div className="showcase-hero-left">
                  <div className="detail-icon showcase-icon">
                    <i className={`fas ${selectedProject.icon}`}></i>
                  </div>
                  <div>
                    <h2>{selectedProject.title}</h2>
                    <p className="showcase-tagline">{selectedProject.tagline}</p>
                    <div className="detail-badges">
                      <span className={`status-badge ${selectedProject.status.toLowerCase().replace(' ', '-')}`}>
                        {selectedProject.status}
                      </span>
                      <span className="year-badge">{selectedProject.year}</span>
                      {selectedProject.targetMarkets && (
                        <span className="market-badge">
                          <i className="fas fa-globe"></i> {selectedProject.targetMarkets.length}+ Countries
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                {selectedProject.link && (
                  <a href={selectedProject.link} target="_blank" rel="noopener noreferrer" className="github-link showcase-cta">
                    <i className="fas fa-external-link-alt"></i> Visit Live Site
                  </a>
                )}
              </div>

              {/* Stats Bar */}
              <div className="showcase-stats">
                {selectedProject.stats.map((stat, i) => (
                  <div key={i} className="showcase-stat-card">
                    <i className={`fas ${stat.icon}`}></i>
                    <div className="stat-value">{stat.value}</div>
                    <div className="stat-label">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Screenshots Gallery */}
              {selectedProject.images.length > 0 && (
                <div className="showcase-gallery">
                  <h4><span className="section-marker">//</span> Screenshots</h4>
                  <div className="detail-images showcase-images">
                    {selectedProject.images.map((img, index) => (
                      <img
                        key={index}
                        src={img}
                        alt={`${selectedProject.title} screenshot ${index + 1}`}
                        className="clickable-image"
                        onClick={() => openLightbox(selectedProject.images, index, selectedProject.title)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* RAG Architecture Flow */}
              <div className="showcase-architecture">
                <h4><span className="section-marker">//</span> RAG Pipeline Architecture</h4>
                <div className="arch-flow">
                  {selectedProject.architecture.flow.map((step, i) => (
                    <React.Fragment key={i}>
                      <div className="arch-step">
                        <div className="arch-step-icon">
                          <i className={`fas ${step.icon}`}></i>
                        </div>
                        <div className="arch-step-label">{step.step}</div>
                        <div className="arch-step-desc">{step.desc}</div>
                      </div>
                      {i < selectedProject.architecture.flow.length - 1 && (
                        <div className="arch-arrow">
                          <i className="fas fa-chevron-right"></i>
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* Application 7-Phase Pipeline */}
              <div className="showcase-pipeline">
                <h4><span className="section-marker">//</span> 7-Phase Application Tracker</h4>
                <div className="pipeline-track">
                  {selectedProject.applicationFlow.map((phase, i) => (
                    <div key={i} className="pipeline-phase" style={{ '--phase-color': phase.color }}>
                      <div className="pipeline-phase-num">{phase.phase}</div>
                      <div className="pipeline-phase-icon">
                        <i className={`fas ${phase.icon}`}></i>
                      </div>
                      <div className="pipeline-phase-name">{phase.name}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Feature Categories */}
              <div className="showcase-features">
                <h4><span className="section-marker">//</span> Feature Breakdown (18 Features)</h4>
                {selectedProject.featureCategories.map((cat, ci) => (
                  <div key={ci} className="feature-category" style={{ '--cat-color': cat.color }}>
                    <h5 className="feature-cat-title">
                      <span className="cat-dot" style={{ background: cat.color }}></span>
                      {cat.category}
                    </h5>
                    <div className="feature-cat-grid">
                      {cat.items.map((item, fi) => (
                        <div key={fi} className="feature-card-rich">
                          <div className="feature-card-icon" style={{ color: cat.color }}>
                            <i className={`fas ${item.icon}`}></i>
                          </div>
                          <div className="feature-card-content">
                            <div className="feature-card-name">{item.name}</div>
                            <div className="feature-card-desc">{item.desc}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Tech Stack by Layer */}
              <div className="showcase-techstack">
                <h4><span className="section-marker">//</span> Technology Stack</h4>
                {selectedProject.techStack.map((layer, li) => (
                  <div key={li} className="techstack-layer">
                    <div className="techstack-layer-label">{layer.layer}</div>
                    <div className="techstack-items">
                      {layer.items.map((item, ti) => (
                        <div key={ti} className="techstack-chip" style={{ '--chip-color': item.color }}>
                          <i className={`fas ${item.icon}`} style={{ color: item.color }}></i>
                          <span>{item.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Target Personas */}
              <div className="showcase-personas">
                <h4><span className="section-marker">//</span> Target Users</h4>
                <div className="persona-grid">
                  {selectedProject.personas.map((p, i) => (
                    <div key={i} className="persona-card">
                      <div className="persona-icon">
                        <i className={`fas ${p.icon}`}></i>
                      </div>
                      <div className="persona-title">{p.title}</div>
                      <div className="persona-desc">{p.desc}</div>
                      <div className="persona-features">{p.features}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Target Markets (UniAdvisorAI) */}
              {selectedProject.targetMarkets && (
                <div className="showcase-markets">
                  <h4><span className="section-marker">//</span> Target Markets</h4>
                  <div className="market-tags">
                    {selectedProject.targetMarkets.map((m, i) => (
                      <span key={i} className="market-tag">{m}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Warmup Sigmoid Chart (LinkAI) */}
              {selectedProject.warmupData && (
                <div className="showcase-warmup">
                  <h4><span className="section-marker">//</span> 21-Day Warmup Engine (Sigmoid Curve)</h4>
                  <div className="warmup-chart">
                    <div className="warmup-y-axis">
                      <span>100%</span>
                      <span>75%</span>
                      <span>50%</span>
                      <span>25%</span>
                      <span>0%</span>
                    </div>
                    <div className="warmup-bars">
                      {selectedProject.warmupData.map((d, i) => (
                        <div key={i} className="warmup-bar-group">
                          <div className="warmup-bar-wrapper">
                            <div className="warmup-bar" style={{ height: `${d.pct}%` }}>
                              <span className="warmup-bar-value">{d.pct}%</span>
                            </div>
                          </div>
                          <div className="warmup-bar-label">Day {d.day}</div>
                          <div className="warmup-bar-sub">{d.connections}/day</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="warmup-formula">
                    <code>factor = 1 / (1 + e<sup>-0.35 × (day - 10)</sup>)</code>
                  </div>
                </div>
              )}

              {/* Action Limits Table (LinkAI) */}
              {selectedProject.actionLimits && (
                <div className="showcase-limits">
                  <h4><span className="section-marker">//</span> Daily Action Limits (Mature Account)</h4>
                  <div className="limits-grid">
                    {selectedProject.actionLimits.map((limit, i) => (
                      <div key={i} className="limit-card">
                        <div className="limit-icon"><i className={`fas ${limit.icon}`}></i></div>
                        <div className="limit-value">{limit.daily}</div>
                        <div className="limit-action">{limit.action}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Workflow Node Types (LinkAI) */}
              {selectedProject.workflowNodes && (
                <div className="showcase-workflow-nodes">
                  <h4><span className="section-marker">//</span> Visual Workflow — Node Types</h4>
                  <div className="workflow-demo">
                    {selectedProject.workflowNodes.map((node, i) => (
                      <React.Fragment key={i}>
                        <div className="workflow-node" style={{ '--node-color': node.color }}>
                          <div className="workflow-node-type">{node.type}</div>
                          <div className="workflow-node-name">{node.name}</div>
                        </div>
                        {i < selectedProject.workflowNodes.length - 1 && (
                          <div className="workflow-connector">
                            {node.type === 'condition' ? (
                              <i className="fas fa-code-branch"></i>
                            ) : (
                              <i className="fas fa-long-arrow-alt-down"></i>
                            )}
                          </div>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              )}

              {/* Roadmap (LinkAI) */}
              {selectedProject.roadmap && (
                <div className="showcase-roadmap">
                  <h4><span className="section-marker">//</span> 3-Phase Roadmap (22 Epics, 79 User Stories)</h4>
                  <div className="roadmap-phases">
                    {selectedProject.roadmap.map((phase, i) => (
                      <div key={i} className={`roadmap-phase roadmap-${phase.status}`}>
                        <div className="roadmap-phase-header">
                          <div className="roadmap-phase-indicator"></div>
                          <div className="roadmap-phase-title">{phase.phase}</div>
                          <div className="roadmap-phase-weeks">Weeks {phase.weeks}</div>
                        </div>
                        <div className="roadmap-items">
                          {phase.items.map((item, j) => (
                            <span key={j} className="roadmap-item">{item}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Query Distribution (E-T-A) */}
              {selectedProject.queryDistribution && (
                <div className="showcase-query-dist">
                  <h4><span className="section-marker">//</span> Query Distribution — Traffic Split</h4>
                  <div className="query-dist-bars">
                    {selectedProject.queryDistribution.map((q, i) => (
                      <div key={i} className="query-dist-row">
                        <div className="query-dist-label">
                          <span className="query-dist-dot" style={{ background: q.color }}></span>
                          <span className="query-dist-path">{q.path}</span>
                          <span className="query-dist-cats">{q.categories}</span>
                        </div>
                        <div className="query-dist-bar-track">
                          <div className="query-dist-bar-fill" style={{ width: `${q.traffic}%`, background: q.color }}></div>
                        </div>
                        <div className="query-dist-pct">{q.traffic}%</div>
                        <div className="query-dist-network">
                          {q.leavesNetwork ? <span className="net-external"><i className="fas fa-external-link-alt"></i> External</span> : <span className="net-local"><i className="fas fa-lock"></i> On-Prem</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="query-dist-summary">
                    <span className="net-local"><i className="fas fa-shield-alt"></i> 85% of queries never leave corporate network</span>
                  </div>
                </div>
              )}

              {/* Classification Accuracy (E-T-A) */}
              {selectedProject.classificationAccuracy && (
                <div className="showcase-accuracy">
                  <h4><span className="section-marker">//</span> Classification Accuracy (Iteration 4 — 1,000 queries)</h4>
                  <div className="accuracy-table">
                    <div className="accuracy-header">
                      <span>Category</span>
                      <span>Precision</span>
                      <span>Recall</span>
                      <span>F1</span>
                      <span>Errors</span>
                    </div>
                    {selectedProject.classificationAccuracy.map((row, i) => (
                      <div key={i} className="accuracy-row">
                        <span className="accuracy-cat">{row.category}</span>
                        <span>{row.precision}</span>
                        <span>{row.recall}</span>
                        <span className="accuracy-f1">{row.f1}</span>
                        <span className="accuracy-err">{row.errors}</span>
                      </div>
                    ))}
                    <div className="accuracy-footer">
                      <span>Overall</span>
                      <span></span>
                      <span></span>
                      <span className="accuracy-f1">95.6%</span>
                      <span className="accuracy-err">44 total</span>
                    </div>
                  </div>
                </div>
              )}

              {/* RBAC Access Matrix (E-T-A) */}
              {selectedProject.rbacMatrix && (
                <div className="showcase-rbac">
                  <h4><span className="section-marker">//</span> RBAC Access Matrix</h4>
                  <div className="rbac-table">
                    <div className="rbac-header">
                      <span>Data Category</span>
                      <span>All Staff</span>
                      <span>Engineering</span>
                      <span>HR</span>
                      <span>Management</span>
                    </div>
                    {selectedProject.rbacMatrix.map((row, i) => (
                      <div key={i} className="rbac-row">
                        <span className="rbac-cat">{row.category}</span>
                        <span>{row.allStaff ? '✅' : '❌'}</span>
                        <span>{row.engineering ? '✅' : '❌'}</span>
                        <span>{row.hr ? '✅' : '❌'}</span>
                        <span>{row.management ? '✅' : '❌'}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Server Specs + Cost (E-T-A) */}
              {selectedProject.serverSpecs && selectedProject.costAnalysis && (
                <div className="showcase-infra-cost">
                  <div className="infra-cost-grid">
                    <div className="infra-card">
                      <h4><span className="section-marker">//</span> Server Hardware</h4>
                      <div className="spec-list">
                        <div className="spec-row"><i className="fas fa-microchip"></i><span className="spec-key">GPU</span><span className="spec-val">{selectedProject.serverSpecs.gpu}</span></div>
                        <div className="spec-row"><i className="fas fa-memory"></i><span className="spec-key">CPU</span><span className="spec-val">{selectedProject.serverSpecs.cpu}</span></div>
                        <div className="spec-row"><i className="fas fa-memory"></i><span className="spec-key">RAM</span><span className="spec-val">{selectedProject.serverSpecs.ram}</span></div>
                        <div className="spec-row"><i className="fas fa-hdd"></i><span className="spec-key">Storage</span><span className="spec-val">{selectedProject.serverSpecs.storage}</span></div>
                        <div className="spec-row"><i className="fas fa-linux"></i><span className="spec-key">OS</span><span className="spec-val">{selectedProject.serverSpecs.os}</span></div>
                        <div className="spec-row"><i className="fas fa-users"></i><span className="spec-key">Concurrent</span><span className="spec-val">{selectedProject.serverSpecs.concurrent}</span></div>
                        <div className="spec-row"><i className="fas fa-clock"></i><span className="spec-key">Avg Response</span><span className="spec-val">{selectedProject.serverSpecs.responseTime}</span></div>
                        <div className="spec-row"><i className="fas fa-cube"></i><span className="spec-key">Containers</span><span className="spec-val">{selectedProject.serverSpecs.containers}</span></div>
                      </div>
                    </div>
                    <div className="cost-card">
                      <h4><span className="section-marker">//</span> 3-Year Cost Analysis</h4>
                      <div className="cost-highlight">
                        <div className="cost-roi">{selectedProject.costAnalysis.roi}</div>
                        <div className="cost-roi-label">Return on Investment</div>
                      </div>
                      <div className="cost-list">
                        <div className="cost-row"><span>One-Time Investment</span><span>{selectedProject.costAnalysis.oneTime}</span></div>
                        <div className="cost-row"><span>Annual Operating</span><span>{selectedProject.costAnalysis.annual}</span></div>
                        <div className="cost-row cost-row-highlight"><span>3-Year TCO</span><span>{selectedProject.costAnalysis.threeYearTCO}</span></div>
                        <div className="cost-row cost-row-savings"><span>3-Year Savings</span><span>{selectedProject.costAnalysis.savings}</span></div>
                        <div className="cost-row"><span>Break-Even</span><span>{selectedProject.costAnalysis.breakeven}</span></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Implementation Phases (E-T-A) */}
              {selectedProject.implementationPhases && (
                <div className="showcase-roadmap">
                  <h4><span className="section-marker">//</span> Implementation Roadmap </h4>
                  <div className="roadmap-phases">
                    {selectedProject.implementationPhases.map((phase, i) => (
                      <div key={i} className={`roadmap-phase roadmap-${phase.status}`}>
                        <div className="roadmap-phase-header">
                          <div className="roadmap-phase-indicator"></div>
                          <div className="roadmap-phase-title">{phase.phase}</div>
                          <div className="roadmap-phase-weeks">Weeks {phase.weeks}</div>
                        </div>
                        <div className="roadmap-items">
                          {phase.items.map((item, j) => (
                            <span key={j} className="roadmap-item">{item}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* === DEFAULT LAYOUT (Other projects) === */
            <div className="detail-content-wrapper">
            <div className="detail-header">
              <div className="detail-icon">
                <i className={`fas ${selectedProject.icon}`}></i>
              </div>
              <div>
                <h2>{selectedProject.title}</h2>
                <div className="detail-badges">
                  <span className={`status-badge ${selectedProject.status.toLowerCase().replace(' ', '-')}`}>
                    {selectedProject.status}
                  </span>
                  <span className="year-badge">{selectedProject.year}</span>
                </div>
              </div>
            </div>

            <div className="detail-images">
              {selectedProject.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`${selectedProject.title} screenshot`}
                  className="clickable-image"
                  onClick={() => openLightbox(selectedProject.images, index, selectedProject.title)}
                />
              ))}
            </div>

            <div className="detail-about">
              <h4>About</h4>
              <p>{selectedProject.fullDesc}</p>
            </div>

            <div className="detail-features">
              <h4>Key Features</h4>
              <ul>
                {selectedProject.features.map((feature, index) => (
                  <li key={index}>
                    <i className="fas fa-check"></i>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="detail-technologies">
              <h4>Technologies</h4>
              <div className="tech-list">
                {selectedProject.tech.map((tech, index) => (
                  <span key={index}>{tech}</span>
                ))}
              </div>
            </div>

            {selectedProject.link && (
              <a 
                href={selectedProject.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="github-link"
              >
                {selectedProject.link.includes('github.com') ? (
                  <><i className="fab fa-github"></i> View on GitHub</>
                ) : (
                  <><i className="fas fa-external-link-alt"></i> Visit Website</>
                )}
              </a>
            )}
          </div>
          )
        ) : (
          <div className="detail-empty">
            <div className="empty-icon">
              <i className="fas fa-hand-pointer"></i>
            </div>
            <h3>Select a Project</h3>
            <p>Click on a project from the list to view details</p>
          </div>
        )}
      </div>
    </div>

      {/* Image Lightbox Modal */}
      {lightbox.open && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <div className="lightbox-modal" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="lightbox-header">
              <div className="lightbox-title">
                <i className={`fas ${selectedProject?.icon || 'fa-image'}`}></i>
                <span>{lightbox.title}</span>
                <span className="lightbox-counter">{lightbox.index + 1} / {lightbox.images.length}</span>
              </div>
              <button className="lightbox-close" onClick={closeLightbox}>×</button>
            </div>

            {/* Image Area */}
            <div className="lightbox-body">
              {lightbox.images.length > 1 && (
                <button className="lightbox-nav lightbox-prev" onClick={() => navigateLightbox(-1)}>
                  <i className="fas fa-chevron-left"></i>
                </button>
              )}

              <div className="lightbox-image-wrapper">
                <img
                  src={lightbox.images[lightbox.index]}
                  alt={`${lightbox.title} — screenshot ${lightbox.index + 1}`}
                />
              </div>

              {lightbox.images.length > 1 && (
                <button className="lightbox-nav lightbox-next" onClick={() => navigateLightbox(1)}>
                  <i className="fas fa-chevron-right"></i>
                </button>
              )}
            </div>

            {/* Thumbnail Strip */}
            {lightbox.images.length > 1 && (
              <div className="lightbox-thumbs">
                {lightbox.images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`Thumb ${i + 1}`}
                    className={i === lightbox.index ? 'active' : ''}
                    onClick={() => setLightbox(prev => ({ ...prev, index: i }))}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default ProjectsSection;
