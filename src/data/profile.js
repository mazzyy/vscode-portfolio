// Shared profile data — consumed by both the VS Code sections and the Modern experience.

export const profile = {
  name: 'Abdul Musawar Soomro',
  firstName: 'Musawar',
  role: 'Kubernetes Developer @ Siemens Healthineers',
  roles: [
    'Cloud & AI Engineer',
    'Kubernetes Developer',
    'Full-Stack Builder',
    'DevOps Automator',
    'AI Agent Tinkerer',
  ],
  tagline: 'I build scalable cloud infrastructure, AI agents, and products that ship.',
  bio: `Software Engineer with 6+ years of experience building scalable web applications and cloud infrastructure. Proven track record implementing CI/CD, automating infrastructure, and delivering engaging user experiences. Passionate about leveraging cutting-edge technologies to create innovative solutions and solve complex problems.`,
  location: 'Erlangen, Germany',
  email: 'musawar.soomro25@gmail.com',
  phone: '+49 152 17136471',
  status: 'Open to opportunities',
  domain: 'musawar.tech',
  resume: 'resume.pdf',
  stats: [
    { label: 'Years Exp', value: 6, suffix: '+' },
    { label: 'Repos', value: 59, suffix: '' },
    { label: 'Projects', value: 12, suffix: '+' },
    { label: 'Cloud Deploys', value: 100, suffix: '+' },
  ],
};

export const socials = {
  email: 'mailto:musawar.soomro25@gmail.com',
  linkedin: 'https://www.linkedin.com/in/musawar/',
  github: 'https://github.com/mazzyy',
  youtube: 'https://www.youtube.com/@Ideeaflux',
};

export const skills = [
  { icon: 'fa-code', title: 'Languages', level: 92, tags: ['Python', 'JavaScript', 'TypeScript', 'Bash'] },
  { icon: 'fab fa-react', title: 'Frontend', level: 85, tags: ['React.js', 'Vue.js', 'TailwindCSS', 'UI/UX Design'] },
  { icon: 'fa-server', title: 'Backend', level: 90, tags: ['Django', 'FastAPI', 'Flask', 'Node.js', 'Express'] },
  { icon: 'fa-cloud', title: 'Cloud & DevOps', level: 94, tags: ['AWS', 'Azure', 'Docker', 'Kubernetes', 'Terraform'] },
  { icon: 'fa-database', title: 'Databases', level: 82, tags: ['PostgreSQL', 'MySQL', 'MongoDB', 'ChromaDB', 'NoSQL'] },
  { icon: 'fa-robot', title: 'AI / ML', level: 88, tags: ['RAG', 'Azure OpenAI', 'LangChain', 'LiteLLM', 'ONNX'] },
];

export const experience = [
  {
    date: 'Nov 2025 — Present',
    title: 'Master Thesis',
    company: 'E-T-A Engineering Technology',
    location: 'Altdorf, Bavaria, Germany',
    desc: 'Conducting master thesis research in a full-time hybrid role, focusing on AI and engineering technology solutions.',
  },
  {
    date: 'Jan 2024 — Present',
    title: 'Kubernetes Developer',
    company: 'Siemens Healthineers',
    location: 'Erlangen, Germany',
    desc: 'Automating container image analysis and Dockerization. Architected Kubernetes infrastructure and automated deployment. Continuous monitoring and maintenance, CI/CD integration with Kubernetes, and container/cluster security standards.',
  },
  {
    date: 'Sep 2022 — Mar 2023',
    title: 'Cloud Infrastructure Engineer',
    company: 'PUMA',
    location: 'Herzogenaurach, Germany',
    desc: 'Designed, deployed, and managed Azure-based cloud solutions with a focus on containerization. Implemented infrastructure with Terraform and shell scripting, reducing deployment time, and documented cloud infrastructure and processes.',
  },
  {
    date: 'Jun 2021 — Aug 2022',
    title: 'Co-Founder',
    company: 'Asaan Recovery',
    location: 'Karachi, Pakistan',
    desc: 'Built a CRM enhancing work management with efficiency and transparency. Role-based access, SMS integration for user communication, optimized account/payroll management, and strict data-security compliance.',
  },
  {
    date: 'Jun 2020 — Jun 2021',
    title: 'Full-Stack Web Developer',
    company: 'One Stop Solution',
    location: 'Karachi, Pakistan',
    desc: 'Researched, designed, implemented, and managed software programs including CRMs. Integrated RESTful services, collaborated on root-cause analysis and code reviews, and created technical documentation.',
  },
  {
    date: 'Oct 2019 — Mar 2020',
    title: 'Full-Stack Web Developer',
    company: 'DXIGNLAB PVT LTD',
    location: 'Karachi, Pakistan',
    desc: 'Assisted in web architecture design and implementation, built application features, and optimized the tech stack for speed and scalability.',
  },
];

export const education = [
  {
    date: 'Oct 2021 — Sep 2026',
    title: 'M.Sc. Data Science',
    company: 'Friedrich-Alexander-Universität Erlangen-Nürnberg',
    desc: 'Specialization: Artificial Intelligence / Machine Learning. Master Thesis at E-T-A Engineering Technology.',
  },
  {
    date: 'Jun 2016 — May 2020',
    title: 'B.Sc. Computer Science',
    company: 'Mohammad Ali Jinnah University · Karachi, Pakistan',
    desc: '',
  },
];
