import React, { useState } from 'react';

function ProjectsSection() {
  const projects = [
    {
      id: 'uniadvisorai',
      icon: 'fa-graduation-cap',
      title: 'UniAdvisorAI',
      shortDesc: 'AI-powered university advising platform for students.',
      tech: ['AI', 'React', 'Node.js'],
      link: 'https://uniadvisorai.com',
      fullDesc: `UniAdvisorAI is an intelligent university advising platform that helps students navigate academic decisions with AI-powered recommendations. It provides personalized guidance on course selection, degree planning, and career pathways.`,
      features: [
        'AI-powered academic advising',
        'Personalized course recommendations',
        'Degree planning & tracking',
        'Career pathway guidance',
        'University comparison tools'
      ],
      images: [
        'uniadvisorai_1.png',
        'uniadvisorai_2.png',
        'uniadvisorai_3.png',
        'uniadvisorai_4.png',
      ],
      status: 'Active Development',
      year: '2025'
    },
    {
      id: 'linkedin-automation',
      icon: 'fa-linkedin',
      title: 'LinkedIn Automation SaaS',
      shortDesc: 'Dual-sided LinkedIn automation platform for applicants and recruiters.',
      tech: ['FastAPI', 'React', 'Playwright', 'Celery', 'PostgreSQL'],
      link: '',
      fullDesc: `A dual-sided LinkedIn automation platform combining applicant auto-apply with recruiter outreach workflow building. Features a hybrid Chrome extension + cloud Playwright architecture for anti-detection, AI-powered question answering via tiered LLM routing, and a React Flow visual workflow builder backed by XState state machines and Celery task queues.`,
      features: [
        'Anti-detection hybrid architecture (extension auth + cloud execution)',
        'AI-powered Easy Apply with tiered LLM routing',
        'Visual workflow builder with React Flow + XState',
        'Per-user RAG knowledge base with pgvector',
        'Multi-tenant SaaS with Row Level Security',
        'Human-in-the-loop approval workflows'
      ],
      images: [
       
        '2.png',
        '3.png',
        '4.png',
        '5.png',
        
      ],
      status: 'Active Development',
      year: '2025'
    },
    {
      id: 'marketmap',
      icon: 'fa-map-marked-alt',
      title: 'MarketMap',
      shortDesc: 'AI-powered market mapping with agent-based collaboration.',
      tech: ['AI Agents', 'LLM', 'NLP'],
      link: '',
      fullDesc: `MarketMap is a robust, modular architecture designed for automated and intelligent market mapping. It leverages agent-based collaboration to dynamically fetch, verify, and structure talent or company data based on natural language prompts.`,
      features: [
        'Natural language query processing',
        'Multi-agent collaboration system',
        'Real-time data verification',
        'Structured JSON/CSV output',
        'Integration with LinkedIn, Crunchbase APIs'
      ],
      images: [
       'M-1.png',
       'M-2.png',

      ],
      status: 'Active Development',
      year: '2024'
    },
    {
      id: 'faceswitch',
      icon: 'fa-theater-masks',
      title: 'FaceSwitch',
      shortDesc: 'Deep learning-based FaceSwap with facial landmark detection.',
      tech: ['Deep Learning', 'Computer Vision', 'OpenCV'],
      link: '',
      fullDesc: `FaceSwitch is a deep learning-based face swapping application that detects and aligns facial features, replacing faces while maintaining natural expressions, skin tones, and lighting conditions.`,
      features: [
        '68-point facial landmark detection',
        'Automatic face alignment',
        'Skin tone matching',
        'Lighting adjustment',
        'Web and desktop UI'
      ],
      images: [
        'faceswap-1.png',
        'faceswap-2.png',
      ],
      status: 'Completed',
      year: '2023'
    },
    {
      id: 'webbuilder',
      icon: 'fa-tools',
      title: 'AI Web App Builder',
      shortDesc: 'Create websites using natural language prompts with Gemini AI.',
      tech: ['Gemini AI', 'Code Gen', 'React'],
      link: 'https://github.com/mazzyy/AI-Web-App-Builder',
      fullDesc: `AI Web App Builder allows users to create professional websites using simple natural language prompts. Powered by Google's Gemini AI, it generates responsive HTML, CSS & JavaScript code with real-time preview.`,
      features: [
        'Natural language to code conversion',
        'Real-time preview',
        'VS Code-like editor interface',
        'Responsive code generation',
        'Export to HTML/CSS/JS'
      ],
      images: [
        'web-1.png',
        'web-3.png',
      ],
      status: 'Active Development',
      year: '2024'
    },
    {
      id: 'talentfinder',
      icon: 'fa-bullseye',
      title: 'Talent Finder',
      shortDesc: 'Intelligent recruitment assistant with AI-powered matching.',
      tech: ['AI Matching', 'Python', 'ML'],
      link: '',
      fullDesc: `Talent Finder is an intelligent recruitment assistant that uses AI-powered candidate matching to streamline the hiring process. Filter candidates by experience, location, industry, and skills.`,
      features: [
        'AI-powered candidate scoring',
        'Multi-criteria filtering',
        'Resume parsing',
        'Skills matching algorithm',
        'Analytics dashboard'
      ],
      images: [
        'F5.png',
        'F4.png',
        'F3.png'

      ],
      status: 'Completed',
      year: '2023'
    },
    {
      id: 'crm',
      icon: 'fa-chart-bar',
      title: 'CRM System',
      shortDesc: 'Full-featured CRM with admin dashboard and analytics.',
      tech: ['React', 'Node.js', 'MongoDB'],
      link: 'https://github.com/mazzyy/AuditIQ_CRM',
      fullDesc: `A comprehensive Customer Relationship Management system built with modern technologies. Features a sleek admin dashboard, role-based access control, and real-time analytics.`,
      features: [
        'Modern admin dashboard',
        'Role-based access control',
        'Customer interaction tracking',
        'Sales pipeline management',
        'Reporting & analytics'
      ],
      images: [],
      status: 'Production',
      year: '2022'
    },
    {
      id: 'devopsgenie',
      icon: 'fa-robot',
      title: 'DevOps Genie',
      shortDesc: 'AI-powered DevOps assistant for infrastructure automation.',
      tech: ['JavaScript', 'AI', 'DevOps'],
      link: 'https://github.com/mazzyy/DevopsGenie',
      fullDesc: `DevOps Genie is an AI-powered assistant that helps automate infrastructure tasks and provides intelligent recommendations for DevOps workflows.`,
      features: [
        'Dockerfile generation',
        'Kubernetes manifest creation',
        'CI/CD pipeline templates',
        'Infrastructure recommendations',
        'Security best practices'
      ],
      images: [],
      status: 'Active Development',
      year: '2024'
    }
  ];

  const [selectedProject, setSelectedProject] = useState(projects[0]);

  return (
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
                <img key={index} src={img} alt={`${selectedProject.title} screenshot`} />
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
  );
}

export default ProjectsSection;
