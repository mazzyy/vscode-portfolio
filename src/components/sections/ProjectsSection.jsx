import React, { useState } from 'react';

function ProjectsSection() {
  const projects = [
    {
      id: 'uniadvisorai',
      icon: 'fa-graduation-cap',
      title: 'UniAdvisorAI',
      shortDesc: 'AI-powered Study in Germany platform — RAG matching, application tracking, and AI tools.',
      tech: ['React', 'TypeScript', 'FastAPI', 'Azure OpenAI', 'ChromaDB', 'PostgreSQL'],
      link: 'https://uniadvisorai.com',
      fullDesc: `The only AI-powered platform that combines personalized German university matching with comprehensive application tracking — for free. Built with RAG-based AI matching (Azure OpenAI GPT-4 + ChromaDB), end-to-end application tracking, AI document generation, and scholarship matching for international students.`,
      features: [
        'Smart Program Discovery',
        'AI-Powered Recommendations & Chat',
        'Application Tracker (7-phase)',
        'AI SOP Generator',
        'AI CV Generator',
        'German Grade Calculator',
        'Scholarship Matching',
        'Document Vault',
        'Cost of Living Calculator',
        'Visa Guide & Country Guides',
        'University Explorer',
        'Community Hub',
        'Notifications System',
        'Admin Dashboard',
        'Document Intelligence (OCR)',
        'SEO & AEO Optimization'
      ],
      images: [
        'uniadvisorai_1.png',
        'uniadvisorai_2.png',
        'uniadvisorai_3.png',
        'uniadvisorai_4.png',
      ],
      status: 'Active Development',
      year: '2025',
      // UniAdvisorAI extended data
      isShowcase: true,
      tagline: 'The only AI-powered platform that combines personalized German university matching with comprehensive application tracking — for free.',
      targetMarkets: ['Pakistan', 'India', 'Bangladesh', 'Nigeria', 'Kenya', 'Egypt', 'Vietnam', 'Indonesia', 'Turkey', 'Iran', 'China', 'USA', 'UK', 'Canada', 'Russia'],
      stats: [
        { label: 'Programs', value: '2500+', icon: 'fa-university' },
        { label: 'Features', value: '18', icon: 'fa-puzzle-piece' },
        { label: 'API Endpoints', value: '40+', icon: 'fa-code' },
        { label: 'Countries', value: '15+', icon: 'fa-globe' },
      ],
      featureCategories: [
        {
          category: 'AI & Intelligence',
          color: '#00d4ff',
          items: [
            { name: 'RAG Recommendations', desc: 'GPT-4 + ChromaDB semantic matching with Two-Step Evaluation', icon: 'fa-brain' },
            { name: 'Chat Nova', desc: 'Conversational AI advisor grounded in program database & user profile', icon: 'fa-comments' },
            { name: 'Document Intelligence', desc: 'OCR + GPT-4 parsing for transcripts, CVs, and certificates', icon: 'fa-file-alt' },
            { name: 'AI SOP Generator', desc: 'Generate tailored Statements of Purpose with PDF/DOCX export', icon: 'fa-pen-fancy' },
            { name: 'AI CV Generator', desc: 'German-style CV builder with AI scoring and feedback', icon: 'fa-id-card' },
          ]
        },
        {
          category: 'Application Management',
          color: '#b14eff',
          items: [
            { name: '7-Phase Tracker', desc: 'Eligibility → Language → Documents → Application → Admission → Finance → Visa', icon: 'fa-tasks' },
            { name: 'Country-Specific Workflows', desc: '7 countries with verification steps, embassy links, GPA scales', icon: 'fa-flag' },
            { name: 'Document Vault', desc: 'Secure storage with credential manager for university portals', icon: 'fa-vault' },
            { name: 'Scholarship Matching', desc: 'AI eligibility scoring via GPT-4 against user profile', icon: 'fa-award' },
          ]
        },
        {
          category: 'Discovery & Guidance',
          color: '#00ff9d',
          items: [
            { name: 'Smart Program Discovery', desc: '2500+ programs with semantic search and multi-filter browsing', icon: 'fa-search' },
            { name: 'German Grade Calculator', desc: 'Modified Bavarian Formula with per-country calibration', icon: 'fa-calculator' },
            { name: 'Cost of Living Calculator', desc: 'City-specific expense estimates with 3 lifestyle modes', icon: 'fa-coins' },
            { name: 'Visa & Country Guides', desc: 'Step-by-step visa process and SEO-optimized per-country guides', icon: 'fa-passport' },
          ]
        },
        {
          category: 'Platform & Social',
          color: '#dcdcaa',
          items: [
            { name: 'Community Hub', desc: 'Forum with posts, threaded comments, and voting system', icon: 'fa-users' },
            { name: 'Notification System', desc: 'In-app + email alerts with APScheduler for deadline reminders', icon: 'fa-bell' },
            { name: 'Admin Dashboard', desc: 'User management, token analytics, and data import tools', icon: 'fa-tachometer-alt' },
            { name: 'SEO & AEO', desc: 'JSON-LD structured data, hreflang, Open Graph, and sitemap generation', icon: 'fa-chart-line' },
          ]
        }
      ],
      techStack: [
        { layer: 'Frontend', items: [
          { name: 'React 18.2', icon: 'fa-react', color: '#61DAFB' },
          { name: 'TypeScript 5.3', icon: 'fa-code', color: '#3178C6' },
          { name: 'Vite 5.0', icon: 'fa-bolt', color: '#646CFF' },
          { name: 'TailwindCSS', icon: 'fa-paint-brush', color: '#38BDF8' },
          { name: 'Zustand', icon: 'fa-database', color: '#F59E0B' },
          { name: 'React Query', icon: 'fa-sync', color: '#FF4154' },
          { name: 'Framer Motion', icon: 'fa-magic', color: '#FF0080' },
          { name: 'SSE Streaming', icon: 'fa-stream', color: '#00ff9d' },
        ]},
        { layer: 'Backend', items: [
          { name: 'FastAPI', icon: 'fa-server', color: '#009688' },
          { name: 'Python 3.10+', icon: 'fa-python', color: '#3776AB' },
          { name: 'SQLAlchemy 2.0', icon: 'fa-link', color: '#CE4438' },
          { name: 'Pydantic 2.6', icon: 'fa-shield-alt', color: '#E92063' },
          { name: 'APScheduler', icon: 'fa-clock', color: '#00d4ff' },
          { name: 'JWT Auth', icon: 'fa-key', color: '#D63AFF' },
        ]},
        { layer: 'AI / ML', items: [
          { name: 'Azure OpenAI GPT-4', icon: 'fa-robot', color: '#FF6F00' },
          { name: 'ChromaDB', icon: 'fa-cubes', color: '#FF6B6B' },
          { name: 'ONNX Runtime', icon: 'fa-microchip', color: '#049DBF' },
          { name: 'all-MiniLM-L6-v2', icon: 'fa-vector-square', color: '#7C3AED' },
          { name: 'Tesseract OCR', icon: 'fa-eye', color: '#4EC9B0' },
        ]},
        { layer: 'Database', items: [
          { name: 'PostgreSQL', icon: 'fa-database', color: '#336791' },
          { name: 'SQLite (dev)', icon: 'fa-hdd', color: '#003B57' },
          { name: 'Docker', icon: 'fa-docker', color: '#2496ED' },
        ]},
      ],
      architecture: {
        flow: [
          { step: 'User Query', icon: 'fa-user', desc: '"Find CS masters in Munich"' },
          { step: 'Embedding', icon: 'fa-microchip', desc: 'ONNX Runtime: all-MiniLM-L6-v2' },
          { step: 'Retrieval', icon: 'fa-search', desc: 'ChromaDB semantic search + SQL filters' },
          { step: 'Augmentation', icon: 'fa-layer-group', desc: 'Profile + Programs + System Prompt' },
          { step: 'Generation', icon: 'fa-robot', desc: 'Azure OpenAI GPT-4 Two-Step Eval' },
          { step: 'Streaming', icon: 'fa-stream', desc: 'SSE response with match scores' },
        ]
      },
      applicationFlow: [
        { phase: '1', name: 'Eligibility', icon: 'fa-clipboard-check', color: '#00d4ff' },
        { phase: '2', name: 'Language', icon: 'fa-language', color: '#4fc1ff' },
        { phase: '3', name: 'Documents', icon: 'fa-file-alt', color: '#b14eff' },
        { phase: '4', name: 'Application', icon: 'fa-paper-plane', color: '#dcdcaa' },
        { phase: '5', name: 'Admission', icon: 'fa-envelope-open-text', color: '#ce9178' },
        { phase: '6', name: 'Finance', icon: 'fa-wallet', color: '#4ec9b0' },
        { phase: '7', name: 'Visa', icon: 'fa-passport', color: '#00ff9d' },
      ],
      personas: [
        { title: 'International Student', desc: 'Looking for Master\'s/PhD programs in Germany', icon: 'fa-user-graduate', features: 'AI Recommendations, App Tracker, SOP/CV Generator' },
        { title: 'Career Switcher', desc: 'Transitioning fields via a German degree', icon: 'fa-exchange-alt', features: 'AI matching considers work experience, eligibility checker' },
        { title: 'University Admin', desc: 'Managing international applications', icon: 'fa-user-shield', features: 'Admin Dashboard, token analytics, user management' },
      ],
    },
    {
      id: 'linkedin-automation',
      icon: 'fa-linkedin',
      title: 'LinkAI',
      shortDesc: 'Intelligent LinkedIn automation SaaS — recruiter outreach + applicant auto-apply with AI.',
      tech: ['FastAPI', 'React', 'TypeScript', 'PostgreSQL', 'Redis', 'Playwright'],
      link: '',
      fullDesc: `A dual-sided LinkedIn automation SaaS combining recruiter outreach workflow building with applicant auto-apply — powered by AI personalization, anti-detection architecture, and a safety-first human-in-the-loop philosophy. Features a hybrid Chrome extension + cloud Playwright architecture, 21-day warmup engine, and React Flow visual workflow builder.`,
      features: [
        'Chrome Extension Session Bridge',
        'Multi-Tenant Auth & Team Management',
        'LinkedIn Account Lifecycle Management',
        'AES-256-GCM Session Encryption',
        '21-Day Sigmoid Warmup Engine',
        'Anti-Detection & Human Behavior Sim',
        'Browser Fingerprint Manager',
        'Lead Management & CRM',
        'Smart Inbox with Auto-Labeling',
        'Campaign & Sequence Engine',
        'Visual Workflow Builder (React Flow)',
        'Message Templates & A/B Testing',
        'Analytics Dashboard (Recharts)',
        'Engagement & Enrichment',
        'Premium Landing Page'
      ],
      images: [
        '2.png',
        '3.png',
        '4.png',
        '5.png',
      ],
      status: 'Active Development',
      year: '2025',
      isShowcase: true,
      tagline: 'A dual-sided LinkedIn automation SaaS combining recruiter outreach workflow building with applicant auto-apply — powered by AI personalization, anti-detection architecture, and a safety-first human-in-the-loop philosophy.',
      stats: [
        { label: 'API Routes', value: '14', icon: 'fa-code' },
        { label: 'Services', value: '17', icon: 'fa-cogs' },
        { label: 'Pages', value: '16', icon: 'fa-desktop' },
        { label: 'Epics', value: '22', icon: 'fa-flag' },
      ],
      featureCategories: [
        {
          category: 'Security & Anti-Detection',
          color: '#ef4444',
          items: [
            { name: 'AES-256-GCM Encryption', desc: 'Session cookies encrypted with authenticated encryption, unique 96-bit nonce per operation', icon: 'fa-lock' },
            { name: '21-Day Warmup Engine', desc: 'Sigmoid curve scaling: Day 1 = 5% → Day 10 = 50% → Day 21 = 97% of full limits', icon: 'fa-chart-line' },
            { name: 'Human Behavior Simulation', desc: 'Bézier mouse paths, Fitts\'s Law velocity, typing at 40-60 WPM with typo simulation', icon: 'fa-user-secret' },
            { name: 'Browser Fingerprint Manager', desc: 'Deterministic fingerprints from account UUID — Canvas, WebGL, Navigator, Audio spoofing', icon: 'fa-fingerprint' },
            { name: 'Residential Proxy Support', desc: 'Per-account dedicated proxies with geographic consistency and sticky sessions', icon: 'fa-shield-alt' },
          ]
        },
        {
          category: 'Outreach & Automation',
          color: '#8b5cf6',
          items: [
            { name: 'Visual Workflow Builder', desc: 'React Flow drag-and-drop with Action, Condition, Delay, and Trigger node types', icon: 'fa-project-diagram' },
            { name: 'Campaign & Sequence Engine', desc: 'Multi-step sequences: connect → message → follow-up with conditional branching', icon: 'fa-route' },
            { name: 'Message Templates', desc: 'Dynamic variables ({{first_name}}, {{company}}), A/B testing with variant tracking', icon: 'fa-envelope-open-text' },
            { name: 'Smart Inbox', desc: 'Unified conversations across accounts with auto-labeling and direct reply', icon: 'fa-inbox' },
          ]
        },
        {
          category: 'Platform & Infrastructure',
          color: '#00d4ff',
          items: [
            { name: 'Chrome Extension Bridge', desc: 'MV3 extension extracts li_at + JSESSIONID — no DOM injection, no content scripts', icon: 'fa-puzzle-piece' },
            { name: 'Multi-Tenant Architecture', desc: 'PostgreSQL RLS, JWT with tenant_id claims, team invitations with role assignment', icon: 'fa-building' },
            { name: 'Lead Management & CRM', desc: 'CSV import, tag-based filtering, full-text search, interaction history, CSV export', icon: 'fa-address-book' },
            { name: 'Analytics Dashboard', desc: 'Connections, acceptance rate, reply rate with daily/weekly Recharts time-series', icon: 'fa-chart-bar' },
          ]
        },
        {
          category: 'AI & Enrichment (Phase 3)',
          color: '#f59e0b',
          items: [
            { name: 'AI Job Matching', desc: 'Resume parsing + text-embedding-3-small + pgvector for hybrid scoring (0-100%)', icon: 'fa-brain' },
            { name: 'Easy Apply Automation', desc: 'Tiered LLM routing: GPT-4o-mini (simple) → GPT-4o (complex) at ~$0.0006/app', icon: 'fa-magic' },
            { name: 'AI Message Personalization', desc: 'Profile/post-aware icebreakers with tone selection at ~$0.001/message', icon: 'fa-comment-dots' },
            { name: 'Email Enrichment', desc: 'GDPR-compliant third-party email finder for multi-channel LinkedIn + Email workflows', icon: 'fa-at' },
          ]
        }
      ],
      techStack: [
        { layer: 'Frontend', items: [
          { name: 'React 19', icon: 'fa-react', color: '#61DAFB' },
          { name: 'TypeScript 5.9', icon: 'fa-code', color: '#3178C6' },
          { name: 'Vite 7.3', icon: 'fa-bolt', color: '#646CFF' },
          { name: 'React Flow', icon: 'fa-project-diagram', color: '#FF0072' },
          { name: 'Recharts', icon: 'fa-chart-area', color: '#8884d8' },
          { name: 'React Router 7', icon: 'fa-route', color: '#CA4245' },
          { name: 'Lucide Icons', icon: 'fa-icons', color: '#F56565' },
          { name: 'Axios', icon: 'fa-exchange-alt', color: '#5A29E4' },
        ]},
        { layer: 'Backend', items: [
          { name: 'FastAPI', icon: 'fa-server', color: '#009688' },
          { name: 'SQLAlchemy 2.0 (async)', icon: 'fa-link', color: '#CE4438' },
          { name: 'Alembic', icon: 'fa-database', color: '#336791' },
          { name: 'Pydantic 2.9', icon: 'fa-shield-alt', color: '#E92063' },
          { name: 'python-jose (JWT)', icon: 'fa-key', color: '#D63AFF' },
          { name: 'httpx (async)', icon: 'fa-globe', color: '#4FC3F7' },
          { name: 'cryptography', icon: 'fa-lock', color: '#FF6F00' },
        ]},
        { layer: 'Infrastructure', items: [
          { name: 'PostgreSQL 16', icon: 'fa-database', color: '#336791' },
          { name: 'pgvector', icon: 'fa-vector-square', color: '#7C3AED' },
          { name: 'Redis 7', icon: 'fa-bolt', color: '#DC382D' },
          { name: 'Docker Compose', icon: 'fa-cube', color: '#2496ED' },
        ]},
        { layer: 'Extension & Automation', items: [
          { name: 'Chrome MV3', icon: 'fa-puzzle-piece', color: '#4285F4' },
          { name: 'Playwright (future)', icon: 'fa-robot', color: '#2EAD33' },
          { name: 'Residential Proxies', icon: 'fa-network-wired', color: '#F59E0B' },
        ]},
      ],
      architecture: {
        flow: [
          { step: 'Extension', icon: 'fa-puzzle-piece', desc: 'Extract li_at + JSESSIONID from Chrome' },
          { step: 'Encrypt', icon: 'fa-lock', desc: 'AES-256-GCM with unique nonce' },
          { step: 'Warmup', icon: 'fa-chart-line', desc: '21-day sigmoid curve scaling' },
          { step: 'Orchestrate', icon: 'fa-cogs', desc: 'Campaign sequences + state machines' },
          { step: 'Simulate', icon: 'fa-user-secret', desc: 'Bézier mouse + typing + delays' },
          { step: 'Execute', icon: 'fa-paper-plane', desc: 'LinkedIn actions within safe limits' },
        ]
      },
      applicationFlow: [
        { phase: '1', name: 'Connect', icon: 'fa-plug', color: '#22c55e' },
        { phase: '2', name: 'Warmup', icon: 'fa-fire', color: '#f59e0b' },
        { phase: '3', name: 'Import Leads', icon: 'fa-upload', color: '#3b82f6' },
        { phase: '4', name: 'Build Workflow', icon: 'fa-project-diagram', color: '#8b5cf6' },
        { phase: '5', name: 'Send Outreach', icon: 'fa-paper-plane', color: '#00d4ff' },
        { phase: '6', name: 'Track & Reply', icon: 'fa-comments', color: '#ec4899' },
        { phase: '7', name: 'Analyze', icon: 'fa-chart-bar', color: '#00ff9d' },
      ],
      personas: [
        { title: 'Recruiter / Sales', desc: 'Automated outreach sequences at $59-99/seat/month', icon: 'fa-user-tie', features: 'Workflow Builder, Smart Inbox, Templates, Analytics' },
        { title: 'Job Applicant', desc: 'AI-powered auto-apply with human review (Phase 3)', icon: 'fa-user-graduate', features: 'Job Matching, Easy Apply, Knowledge Base, RAG' },
        { title: 'Agency / Team', desc: 'Multi-account management with team roles', icon: 'fa-users-cog', features: 'Multi-Tenant, Team Invites, Shared Templates' },
      ],
      // LinkedIn-specific extra sections
      warmupData: [
        { day: 1, pct: 5, connections: 1 },
        { day: 7, pct: 25, connections: 6 },
        { day: 10, pct: 50, connections: 12 },
        { day: 14, pct: 75, connections: 18 },
        { day: 21, pct: 97, connections: 24 },
      ],
      actionLimits: [
        { action: 'Connection Requests', daily: 25, icon: 'fa-user-plus' },
        { action: 'Messages', daily: 50, icon: 'fa-envelope' },
        { action: 'Profile Views', daily: 75, icon: 'fa-eye' },
        { action: 'Easy Apply', daily: 35, icon: 'fa-file-alt' },
        { action: 'Endorsements', daily: 15, icon: 'fa-thumbs-up' },
        { action: 'Likes', daily: 20, icon: 'fa-heart' },
      ],
      roadmap: [
        { phase: 'Phase 1 — MVP', weeks: '1–12', status: 'active', items: ['Auth & LinkedIn Connect', 'Leads & Inbox', 'Templates & Analytics', 'Integrations'] },
        { phase: 'Phase 2 — Automation', weeks: '10–20', status: 'upcoming', items: ['Scheduled Sends', 'Sequence & Workflow Builder', 'Engagement & Enrichment', 'Anti-Detection Hardening'] },
        { phase: 'Phase 3 — Applicant', weeks: '18–30', status: 'planned', items: ['AI Job Matching', 'Easy Apply', 'Knowledge Base', 'GDPR & Scale'] },
      ],
      workflowNodes: [
        { name: 'Find Leads', type: 'trigger', color: '#22c55e' },
        { name: 'View Profile', type: 'action', color: '#3b82f6' },
        { name: 'Wait 1 Day', type: 'delay', color: '#6b7280' },
        { name: 'Send Connection', type: 'action', color: '#8b5cf6' },
        { name: 'Accepted?', type: 'condition', color: '#f59e0b' },
        { name: 'Send Message', type: 'action', color: '#3b82f6' },
        { name: 'Email Fallback', type: 'action', color: '#ef4444' },
      ],
    },
    {
      id: 'eta-hybrid-ai',
      icon: 'fa-brain',
      title: 'E-T-A Hybrid AI',
      shortDesc: 'Enterprise hybrid AI platform — on-prem LLM + RAG + Azure cloud with intelligent query routing.',
      tech: ['vLLM', 'Qwen3', 'Qdrant', 'FastAPI', 'Azure OpenAI', 'Docker'],
      link: '',
      fullDesc: `A unified hybrid AI platform for 104 employees combining on-premises LLM inference (Qwen3 30B via vLLM) with Azure OpenAI cloud fallback. Features intelligent query classification (95.6% accuracy), RAG-powered knowledge retrieval across 7 department spaces, DLP scanning, GDPR compliance, and full observability — processing 85% of queries entirely on-premises.`,
      features: [
        'Intelligent 4-Category Query Router',
        'On-Premises LLM (Qwen3 30B-A3B)',
        'Azure OpenAI Cloud Fallback',
        'RAG Engine (Qdrant + BGE-M3)',
        'DLP Scanner with PII Redaction',
        'RBAC Document Access Control',
        'SSO / Active Directory Integration',
        'Multi-Format Document Ingestion',
        'SAP Dual-Mode Access',
        'Grafana + Prometheus Monitoring',
        'HashiCorp Vault Secrets',
        'GDPR & EU AI Act Compliance',
        'Immutable Audit Logging',
        '7 Department Knowledge Spaces',
        'TLS 1.3 Encryption'
      ],
      images: [],
      status: 'Active Development',
      year: '2026',
      isShowcase: true,
      tagline: 'A unified hybrid AI platform combining on-premises LLM inference with Azure OpenAI cloud fallback — 85% of queries never leave the corporate network.',
      stats: [
        { label: 'Employees', value: '104', icon: 'fa-users' },
        { label: 'On-Premises', value: '85%', icon: 'fa-server' },
        { label: 'Router Accuracy', value: '95.6%', icon: 'fa-bullseye' },
        { label: '3-Year ROI', value: '509%', icon: 'fa-chart-line' },
      ],
      featureCategories: [
        {
          category: 'Intelligent Routing',
          color: '#f5a623',
          items: [
            { name: '4-Category Classifier', desc: 'Confidential → Simple → RAG → Complex with strict priority chain (T=0.0, 10 tokens)', icon: 'fa-route' },
            { name: '95.6% Accuracy', desc: '1,000-query test set across 4 iterations — RAG F1: 95.0%, Complex F1: 96.5%', icon: 'fa-bullseye' },
            { name: 'DLP Scanner', desc: 'Pre-transmission PII detection and redaction for cloud-bound queries', icon: 'fa-shield-alt' },
            { name: 'Confidential Gate', desc: 'Highest-priority safety gate — PII, HR data, credentials never leave premises', icon: 'fa-lock' },
          ]
        },
        {
          category: 'RAG & Knowledge',
          color: '#9b59b6',
          items: [
            { name: 'Hybrid Search', desc: 'Qdrant vector (BGE-M3 1024-dim) + BM25 sparse search with Reciprocal Rank Fusion', icon: 'fa-search' },
            { name: '7 Knowledge Spaces', desc: 'Engineering, Production, Quality, Sales, Finance, HR, IT — department-scoped', icon: 'fa-layer-group' },
            { name: 'Multi-Format Ingestion', desc: 'Excel, PDF, Word, PPTX, SAP exports, CAD metadata via format-specific connectors', icon: 'fa-file-import' },
            { name: 'SAP Dual-Mode', desc: 'Descriptive (embed records for RAG) + Analytical (Text-to-SQL on staging DB)', icon: 'fa-database' },
          ]
        },
        {
          category: 'Security & Compliance',
          color: '#e74c3c',
          items: [
            { name: 'RBAC Pre-Filter', desc: 'Deny-by-default document filtering — per-department access before retrieval', icon: 'fa-user-lock' },
            { name: 'GDPR Compliance', desc: 'Art. 6/25/28/35 — Privacy by Design, DPA with Microsoft, DPIA conducted', icon: 'fa-gavel' },
            { name: 'EU AI Act Ready', desc: 'Classified as minimal/limited risk — full transparency and audit capability', icon: 'fa-balance-scale' },
            { name: 'TLS 1.3 + Vault', desc: 'All data encrypted in transit/rest, HashiCorp Vault for quarterly key rotation', icon: 'fa-key' },
          ]
        },
        {
          category: 'Infrastructure & Ops',
          color: '#27ae60',
          items: [
            { name: 'RTX 4090 Server', desc: '24 GB VRAM, 128 GB DDR5 ECC, 1 TB NVMe — handles 20-30 concurrent users', icon: 'fa-microchip' },
            { name: '7 Docker Containers', desc: 'vLLM, Open WebUI, FastAPI Router, Qdrant, BGE-M3, Ingestion Worker, Monitoring', icon: 'fa-cube' },
            { name: 'Grafana Stack', desc: 'Prometheus metrics, Loki log aggregation, real-time dashboards and DLP alerts', icon: 'fa-chart-bar' },
            { name: 'Auto-Ingestion', desc: 'Scheduled pipelines: SAP nightly/6h, PDFs on-change, Excel monthly, CAD nightly', icon: 'fa-sync' },
          ]
        }
      ],
      techStack: [
        { layer: 'AI / LLM', items: [
          { name: 'Qwen3 30B-A3B', icon: 'fa-brain', color: '#7ed321' },
          { name: 'vLLM (PagedAttention)', icon: 'fa-server', color: '#27ae60' },
          { name: 'Azure OpenAI GPT-4o', icon: 'fa-cloud', color: '#bd10e0' },
          { name: 'Ollama (Router)', icon: 'fa-robot', color: '#f5a623' },
          { name: 'BGE-M3 Embeddings', icon: 'fa-vector-square', color: '#2980b9' },
        ]},
        { layer: 'RAG & Data', items: [
          { name: 'Qdrant', icon: 'fa-database', color: '#9b59b6' },
          { name: 'LangChain', icon: 'fa-link', color: '#00d4ff' },
          { name: 'PyMuPDF', icon: 'fa-file-pdf', color: '#CE4438' },
          { name: 'Tesseract OCR', icon: 'fa-eye', color: '#4EC9B0' },
          { name: 'PyRFC (SAP)', icon: 'fa-industry', color: '#F59E0B' },
        ]},
        { layer: 'Platform', items: [
          { name: 'FastAPI', icon: 'fa-server', color: '#009688' },
          { name: 'LiteLLM Proxy', icon: 'fa-exchange-alt', color: '#5A29E4' },
          { name: 'Open WebUI', icon: 'fa-globe', color: '#4a90d9' },
          { name: 'PostgreSQL', icon: 'fa-database', color: '#336791' },
          { name: 'Active Directory', icon: 'fa-id-badge', color: '#0078D4' },
        ]},
        { layer: 'Infrastructure', items: [
          { name: 'Docker Compose', icon: 'fa-cube', color: '#2496ED' },
          { name: 'Ubuntu 22.04', icon: 'fa-linux', color: '#E95420' },
          { name: 'NVIDIA CUDA', icon: 'fa-microchip', color: '#76B900' },
          { name: 'Nginx', icon: 'fa-shield-alt', color: '#009639' },
        ]},
        { layer: 'Security & Monitoring', items: [
          { name: 'HashiCorp Vault', icon: 'fa-key', color: '#000000' },
          { name: 'Grafana', icon: 'fa-chart-line', color: '#F46800' },
          { name: 'Prometheus', icon: 'fa-fire', color: '#E6522C' },
          { name: 'Loki', icon: 'fa-scroll', color: '#F9D71C' },
        ]},
      ],
      architecture: {
        flow: [
          { step: 'User', icon: 'fa-user', desc: '104 employees via Open WebUI' },
          { step: 'SSO Auth', icon: 'fa-id-badge', desc: 'Active Directory SAML/OAuth' },
          { step: 'Router', icon: 'fa-route', desc: 'Ollama classifier (T=0.0)' },
          { step: 'Classify', icon: 'fa-code-branch', desc: '4 categories: C/S/R/X' },
          { step: 'Process', icon: 'fa-cogs', desc: 'On-Prem LLM or DLP→Azure' },
          { step: 'Respond', icon: 'fa-comment-dots', desc: 'Audit logged + delivered' },
        ]
      },
      applicationFlow: [
        { phase: '1', name: 'User Access', icon: 'fa-user', color: '#4a90d9' },
        { phase: '2', name: 'Routing', icon: 'fa-route', color: '#f5a623' },
        { phase: '3A', name: 'On-Prem', icon: 'fa-server', color: '#7ed321' },
        { phase: '3B', name: 'Cloud', icon: 'fa-cloud', color: '#bd10e0' },
        { phase: '4', name: 'Governance', icon: 'fa-chart-bar', color: '#e74c3c' },
        { phase: '5', name: 'Ingestion', icon: 'fa-file-import', color: '#9b59b6' },
      ],
      personas: [
        { title: 'Employee (104)', desc: 'Chat-based AI assistant for daily queries across all departments', icon: 'fa-user', features: 'Open WebUI, AI Chat, Knowledge Search, Document Q&A' },
        { title: 'IT Administrator', desc: 'Platform management, monitoring, and compliance oversight', icon: 'fa-user-cog', features: 'Grafana Dashboards, Vault, Audit Logs, Ingestion Config' },
        { title: 'Management', desc: 'Cost analytics, compliance reporting, and strategic oversight', icon: 'fa-user-tie', features: 'Usage Analytics, Cost Allocation, GDPR Reports, ROI Tracking' },
      ],
      // E-T-A specific sections
      classificationAccuracy: [
        { category: 'RAG', precision: '91.8%', recall: '98.4%', f1: '95.0%', errors: '4 misclassified' },
        { category: 'Confidential', precision: '99.6%', recall: '90.4%', f1: '94.8%', errors: '24 missed' },
        { category: 'Complex', precision: '93.3%', recall: '100%', f1: '96.5%', errors: '0 missed' },
        { category: 'Simple', precision: '98.7%', recall: '93.6%', f1: '96.1%', errors: '16 misclassified' },
      ],
      queryDistribution: [
        { path: 'On-Prem Direct', categories: 'Simple + Confidential', traffic: 55, leavesNetwork: false, processing: 'Qwen3 30B via vLLM', color: '#7ed321' },
        { path: 'On-Prem RAG', categories: 'Internal Knowledge', traffic: 30, leavesNetwork: false, processing: 'Qdrant → Qwen3', color: '#9b59b6' },
        { path: 'Cloud API', categories: 'Complex', traffic: 15, leavesNetwork: true, processing: 'DLP → Azure OpenAI', color: '#bd10e0' },
      ],
      costAnalysis: {
        oneTime: '€17,050',
        annual: '€6,950',
        threeYearTCO: '€37,850',
        savings: '€103,846 (73%)',
        breakeven: '~5 months',
        roi: '509%',
      },
      serverSpecs: {
        gpu: 'NVIDIA RTX 4090 (24 GB)',
        cpu: 'EPYC 7543 / Xeon Gold (32+ cores)',
        ram: '128 GB DDR5 ECC',
        storage: '1 TB NVMe + 2 TB SSD',
        os: 'Ubuntu 22.04 LTS',
        concurrent: '20–30 users',
        responseTime: '4–6 sec avg',
        containers: 7,
      },
      implementationPhases: [
        { phase: 'Phase 1 — Hardware & Model', weeks: '1–4', status: 'active', items: ['Hardware procurement', 'CUDA + model download', 'Benchmarking & validation'] },
        { phase: 'Phase 2 — Platform Core', weeks: '5–7', status: 'upcoming', items: ['Open WebUI + SSO', 'API Gateway + Router'] },
        { phase: 'Phase 3 — Security & Hybrid', weeks: '8–10', status: 'upcoming', items: ['DLP Scanner', 'Classification + Azure', 'RAG deployment'] },
        { phase: 'Phase 4 — Pilot', weeks: '11–14', status: 'planned', items: ['10–15 users (2–3 depts)', 'Feedback + tuning'] },
        { phase: 'Phase 5 — Rollout', weeks: '15–16', status: 'planned', items: ['Full 104 users', 'Decommission ChatGPT'] },
      ],
      rbacMatrix: [
        { category: 'Product Manuals', allStaff: true, engineering: true, hr: true, management: true },
        { category: 'Engineering Specs', allStaff: false, engineering: true, hr: false, management: true },
        { category: 'CAD / BOM', allStaff: false, engineering: true, hr: false, management: true },
        { category: 'SAP Production', allStaff: false, engineering: true, hr: false, management: true },
        { category: 'HR Records', allStaff: false, engineering: false, hr: true, management: true },
        { category: 'Financial Reports', allStaff: false, engineering: false, hr: false, management: true },
        { category: 'Customer Data', allStaff: false, engineering: false, hr: false, management: true },
      ],
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
