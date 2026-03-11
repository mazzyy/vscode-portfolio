import React from 'react';

function AboutSection() {
  const skills = [
    {
      icon: 'fa-code',
      title: 'Languages',
      tags: ['Python', 'JavaScript', 'Bash']
    },
    {
      icon: 'fab fa-react',
      title: 'Frontend',
      tags: ['React.js', 'Vue.js', 'UI/UX Design']
    },
    {
      icon: 'fa-server',
      title: 'Backend',
      tags: ['Django', 'FastAPI', 'Flask', 'Node.js', 'Express']
    },
    {
      icon: 'fa-cloud',
      title: 'Cloud & DevOps',
      tags: ['AWS', 'Azure', 'Docker', 'Kubernetes']
    },
    {
      icon: 'fa-database',
      title: 'Databases',
      tags: ['PostgreSQL', 'MySQL', 'SQLite', 'MongoDB', 'NoSQL']
    },
    {
      icon: 'fa-rocket',
      title: 'CI/CD & Tools',
      tags: ['GitHub Actions', 'Jenkins', 'Terraform', 'REST APIs', 'GraphQL']
    }
  ];

  const experience = [
    {
      date: 'Nov 2025 - Present',
      title: 'Master Thesis',
      company: 'E-T-A Engineering Technology · Altdorf, Bavaria, Germany',
      desc: 'Conducting master thesis research in a full-time hybrid role, focusing on AI and engineering technology solutions.'
    },
    {
      date: 'Jan 2024 - Present',
      title: 'Kubernetes Developer',
      company: 'Siemens Healthineers · Erlangen, Germany',
      desc: 'Automating container image analysis and Dockerization processes. Architected Kubernetes infrastructure and automated deployment processes. Implementing continuous system monitoring and maintenance protocols. Integrating CI/CD pipelines with Kubernetes deployments for seamless workflows. Upholding security standards for all containers and Kubernetes operations.'
    },
    {
      date: 'Sep 2022 - Mar 2023',
      title: 'Cloud Infrastructure Engineer',
      company: 'PUMA · Herzogenaurach, Germany',
      desc: 'Designed, deployed, and managed Azure-based cloud solutions with a focus on containerization. Implemented infrastructure using Terraform and shell scripting, resulting in reduction in deployment time. Collaborated with cross-functional teams to optimize solutions. Developed comprehensive documentation for cloud infrastructure and processes.'
    },
    {
      date: 'Jun 2021 - Aug 2022',
      title: 'Co-Founder',
      company: 'Asaan Recovery · Karachi, Pakistan',
      desc: 'Created CRM enhancing work management with innovative efficiency and transparency. Developed role-based access system for enhanced security. Integrated SMS services for direct user communication. Optimized account and payroll management. Implemented strict data security ensuring compliance with industry standards.'
    },
    {
      date: 'Jun 2020 - Jun 2021',
      title: 'Full-Stack Web Developer',
      company: 'One Stop Solution · Karachi, Pakistan',
      desc: 'Conducted research, designed, implemented, and managed software programs. Developed projects including CRM utilizing both backend and frontend. Integrated RESTful services into software programs. Collaborated with team members for root cause analysis and code reviews. Created technical documentation for reference and reporting.'
    },
    {
      date: 'Oct 2019 - Mar 2020',
      title: 'Full-Stack Web Developer',
      company: 'DXIGNLAB PVT LTD · Karachi, Pakistan',
      desc: 'Assisted in web architecture design and implementation. Supported meeting user and technical needs. Helped build web application features. Contributed to optimizing the tech stack for speed and scalability.'
    }
  ];

  const education = [
    {
      date: 'Oct 2021 - Sep 2026',
      title: 'Master of Science in Data Science',
      company: 'Friedrich-Alexander-Universität Erlangen-Nürnberg',
      desc: 'Specialization: Artificial Intelligence / Machine Learning. Master Thesis at E-T-A Engineering Technology.'
    },
    {
      date: 'Jun 2016 - May 2020',
      title: 'Bachelor of Science in Computer Science',
      company: 'Mohammad Ali Jinnah University · Karachi, Pakistan',
      desc: ''
    }
  ];

  return (
    <div className="profile-section cyber-grid">
      {/* Profile Header */}
      <div className="profile-header">
        <div className="profile-avatar">
          <i className="fas fa-user-astronaut"></i>
        </div>
        <div className="profile-info">
          <h1 className="profile-name">Abdul Musawar Soomro</h1>
          <div className="profile-title">
            <span className="keyword">const</span> role = <span className="string">"Kubernetes Developer @ Siemens Healthineers"</span>;
          </div>
          <p className="profile-bio">
            Software Engineer with 6+ years of experience in building scalable web applications and cloud infrastructure. 
            Proven track record of successfully implementing CI/CD, automating infrastructure, and delivering engaging user experiences.
            Passionate about leveraging cutting-edge technologies to create innovative solutions and solve complex problems.
          </p>
          <div className="profile-stats">
            <div className="stat-box">
              <div className="stat-value">6+</div>
              <div className="stat-label">Years Exp</div>
            </div>
            <div className="stat-box">
              <div className="stat-value">59</div>
              <div className="stat-label">Repos</div>
            </div>
            <div className="stat-box">
              <div className="stat-value">10+</div>
              <div className="stat-label">Projects</div>
            </div>
            <div className="stat-box">
              <div className="stat-value">4</div>
              <div className="stat-label">Videos</div>
            </div>
          </div>
        </div>
      </div>

      {/* Skills Section */}
      <div className="skills-section">
        <h2 className="section-title">Tech Stack</h2>
        <div className="skills-grid">
          {skills.map((skill, index) => (
            <div key={index} className="skill-card">
              <div className="skill-card-header">
                <div className="skill-icon">
                  <i className={`${skill.icon.includes('fab') ? '' : 'fas '}${skill.icon}`}></i>
                </div>
                <h3>{skill.title}</h3>
              </div>
              <div className="skill-tags">
                {skill.tags.map((tag, tagIndex) => (
                  <span key={tagIndex} className="skill-tag">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Experience Timeline */}
      <div className="experience-timeline">
        <h2 className="section-title">Experience</h2>
        {experience.map((exp, index) => (
          <div key={index} className="timeline-item">
            <div className="timeline-date">{exp.date}</div>
            <div className="timeline-title">{exp.title}</div>
            <div className="timeline-company">{exp.company}</div>
            <div className="timeline-desc">{exp.desc}</div>
          </div>
        ))}
      </div>

      {/* Education Section */}
      <div className="education-section">
        <h2 className="section-title">Education</h2>
        {education.map((edu, index) => (
          <div key={index} className="timeline-item">
            <div className="timeline-date">{edu.date}</div>
            <div className="timeline-title">{edu.title}</div>
            <div className="timeline-company">{edu.company}</div>
            {edu.desc && <div className="timeline-desc">{edu.desc}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AboutSection;
