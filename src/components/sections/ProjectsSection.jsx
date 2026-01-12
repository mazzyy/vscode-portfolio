import React, { useState } from 'react';

function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      id: 'marketmap',
      icon: 'fa-map-marked-alt',
      title: 'MarketMap',
      shortDesc: 'AI-powered market mapping with agent-based collaboration.',
      tech: ['AI Agents', 'LLM', 'NLP'],
      link: 'https://github.com/mazzyy',
      fullDesc: `MarketMap is a robust, modular architecture designed for automated and intelligent market mapping. It leverages agent-based collaboration to dynamically fetch, verify, and structure talent or company data based on natural language prompts.`,
      features: [
        'Natural language query processing',
        'Multi-agent collaboration system',
        'Real-time data verification',
        'Structured JSON/CSV output',
        'Integration with LinkedIn, Crunchbase APIs'
      ],
      images: [
        'https://via.placeholder.com/500x280/1e1e1e/00d4ff?text=MarketMap+Screenshot+1',
        'https://via.placeholder.com/500x280/1e1e1e/b14eff?text=MarketMap+Screenshot+2',
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
      link: 'https://github.com/mazzyy',
      fullDesc: `FaceSwitch is a deep learning-based face swapping application that detects and aligns facial features, replacing faces while maintaining natural expressions, skin tones, and lighting conditions.`,
      features: [
        '68-point facial landmark detection',
        'Automatic face alignment',
        'Skin tone matching',
        'Lighting adjustment',
        'Web and desktop UI'
      ],
      images: [
        'https://via.placeholder.com/500x280/1e1e1e/ff006e?text=FaceSwitch+Demo+1',
        'https://via.placeholder.com/500x280/1e1e1e/00ff9d?text=FaceSwitch+Demo+2',
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
        'https://via.placeholder.com/500x280/1e1e1e/4fc1ff?text=Web+Builder+UI',
        'https://via.placeholder.com/500x280/1e1e1e/dcdcaa?text=Generated+Website',
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
      link: 'https://github.com/mazzyy',
      fullDesc: `Talent Finder is an intelligent recruitment assistant that uses AI-powered candidate matching to streamline the hiring process. Filter candidates by experience, location, industry, and skills.`,
      features: [
        'AI-powered candidate scoring',
        'Multi-criteria filtering',
        'Resume parsing',
        'Skills matching algorithm',
        'Analytics dashboard'
      ],
      images: [
        'https://via.placeholder.com/500x280/1e1e1e/b14eff?text=Talent+Finder+Dashboard',
        'https://via.placeholder.com/500x280/1e1e1e/00d4ff?text=Candidate+Matching',
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
      images: [
        'https://via.placeholder.com/500x280/1e1e1e/4ec9b0?text=CRM+Dashboard',
        'https://via.placeholder.com/500x280/1e1e1e/ce9178?text=Analytics+View',
      ],
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
      images: [
        'https://via.placeholder.com/500x280/1e1e1e/569cd6?text=DevOps+Genie+Interface',
        'https://via.placeholder.com/500x280/1e1e1e/6a9955?text=Generated+Pipeline',
      ],
      status: 'Active Development',
      year: '2024'
    }
  ];

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

            <a 
              href={selectedProject.link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="github-link"
            >
              <i className="fab fa-github"></i>
              View on GitHub
            </a>
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
