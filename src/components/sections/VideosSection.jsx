import React, { useState } from 'react';

function VideosSection() {
  const allVideos = [
    {
      id: 'marketmap',
      embedUrl: 'https://www.youtube.com/embed/CL3smZv6ojM',
      title: 'MarketMap',
      subtitle: 'AI Market Mapping',
      icon: 'fa-map-marked-alt',
      description: 'A robust, modular architecture designed for automated and intelligent market mapping. Leverages agent-based collaboration to dynamically fetch, verify, and structure talent or company data based on natural language prompts.',
      tech: ['Chat Agent', 'Router Agent', 'AI Verification', 'LLM'],
      link: 'https://github.com/mazzyy'
    },
    {
      id: 'faceswitch',
      embedUrl: 'https://www.youtube.com/embed/frebcabqAfo',
      title: 'FaceSwitch',
      subtitle: 'Deep Learning Face Swap',
      icon: 'fa-theater-masks',
      description: 'Deep learning-based FaceSwap application with facial landmark detection, face alignment, and blending for realistic results. Features both web-based and desktop UI for easy usage.',
      tech: ['Deep Learning', 'Computer Vision', 'OpenCV', 'Python'],
      link: 'https://github.com/mazzyy'
    },
    {
      id: 'webbuilder',
      embedUrl: 'https://www.youtube.com/embed/ZxK9OYwRzKQ',
      title: 'AI Web App Builder',
      subtitle: 'Natural Language to Code',
      icon: 'fa-tools',
      description: "Create professional websites using natural language prompts. Google's Gemini AI generates responsive HTML, CSS & JavaScript with VS Code-like editing environment and real-time preview.",
      tech: ['Gemini AI', 'Code Generation', 'React', 'Monaco Editor'],
      link: 'https://github.com/mazzyy/AI-Web-App-Builder'
    },
    {
      id: 'talentfinder',
      embedUrl: 'https://www.youtube.com/embed/YaozBMgRDRI',
      title: 'Talent Finder',
      subtitle: 'AI Recruitment Assistant',
      icon: 'fa-bullseye',
      description: 'Intelligent recruitment assistant with AI-powered candidate matching. Filter by experience, location, industry, and skills for perfect matches. Streamlines the hiring process.',
      tech: ['AI Matching', 'Python', 'NLP', 'REST API'],
      link: 'https://github.com/mazzyy'
    }
  ];

  const [featuredIndex, setFeaturedIndex] = useState(0);
  
  const featured = allVideos[featuredIndex];
  const smallVideos = allVideos.filter((_, index) => index !== featuredIndex);

  const handleVideoClick = (clickedVideo) => {
    const newIndex = allVideos.findIndex(v => v.id === clickedVideo.id);
    setFeaturedIndex(newIndex);
  };

  return (
    <div className="videos-section cyber-grid">
      <h2 className="section-title">Project Demos</h2>
      
      {/* Featured Video */}
      <div className="video-featured">
        <div className="video-embed">
          <iframe
            src={featured.embedUrl}
            title={featured.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <div className="video-featured-info">
          <h3>
            <i className={`fas ${featured.icon}`}></i> {featured.title} — {featured.subtitle}
          </h3>
          <p>{featured.description}</p>
          <div className="project-tech">
            {featured.tech.map((tech, index) => (
              <span key={index}>{tech}</span>
            ))}
          </div>
          <a href={featured.link} target="_blank" rel="noopener noreferrer" className="project-link">
            View Source Code →
          </a>
        </div>
      </div>

      {/* Video Grid - Clickable to swap */}
      <div className="video-grid">
        {smallVideos.map((video) => (
          <div 
            key={video.id} 
            className="video-card clickable"
            onClick={() => handleVideoClick(video)}
          >
            <div className="video-thumbnail">
              <img 
                src={`https://img.youtube.com/vi/${video.embedUrl.split('/').pop()}/mqdefault.jpg`}
                alt={video.title}
              />
              <div className="play-overlay">
                <i className="fas fa-play"></i>
              </div>
            </div>
            <div className="video-card-info">
              <h4>
                <i className={`fas ${video.icon}`}></i> {video.title}
              </h4>
              <p>{video.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VideosSection;
