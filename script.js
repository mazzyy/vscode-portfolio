/* ═══════════════════════════════════════════════════════════════
   PORTFOLIO JAVASCRIPT
   ═══════════════════════════════════════════════════════════════ */

 
// TAB NAVIGATION
 

// Section map for tab to content mapping
const sectionMap = {
    'about': 'about-section',
    'projects': 'projects-section',
    'videos': 'videos-section',
    'contact': 'contact-section'
};

function switchTab(tabName) {
    console.log('Switching to tab:', tabName);
    
    // Remove active from all tabs
    document.querySelectorAll('.editor-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.file-item[data-tab]').forEach(f => f.classList.remove('active'));
    document.querySelectorAll('.content-section').forEach(s => s.classList.remove('active'));

    // Add active to selected tab
    const editorTab = document.querySelector(`.editor-tab[data-tab="${tabName}"]`);
    const fileItem = document.querySelector(`.file-item[data-tab="${tabName}"]`);
    const section = document.getElementById(sectionMap[tabName]);
    
    if (editorTab) editorTab.classList.add('active');
    if (fileItem) fileItem.classList.add('active');
    if (section) section.classList.add('active');
    
    // Update mobile nav active state
    document.querySelectorAll('.mobile-nav-item[data-mobile-tab]').forEach(item => {
        item.classList.remove('active');
    });
    const mobileNavItem = document.querySelector(`.mobile-nav-item[data-mobile-tab="${tabName}"]`);
    if (mobileNavItem) mobileNavItem.classList.add('active');
}

// Initialize tab listeners
function initTabs() {
    // Editor tab clicks - use event delegation on the tabs container
    const tabsContainer = document.querySelector('.editor-tabs');
    if (tabsContainer) {
        tabsContainer.addEventListener('click', function(e) {
            // Find the closest editor-tab parent
            const tab = e.target.closest('.editor-tab[data-tab]');
            if (tab) {
                e.preventDefault();
                const tabName = tab.getAttribute('data-tab');
                if (tabName) switchTab(tabName);
            }
        });
    }
    
    console.log('Tabs initialized');
}

 
// ACTIVITY BAR
 

const activityIcons = document.querySelectorAll('.activity-icon[data-section]');
activityIcons.forEach(icon => {
    icon.addEventListener('click', () => {
        activityIcons.forEach(i => i.classList.remove('active'));
        icon.classList.add('active');
    });
});

 
// TERMINAL FUNCTIONS
 

function toggleTerminal() {
    const panel = document.getElementById('integrated-terminal');
    const input = document.getElementById('term-input');
    
    panel.classList.toggle('open');
    
    if (panel.classList.contains('open')) {
        input.focus();
    }
}

// Terminal Commands
const termCommands = {
    help: "Available commands: <span class='keyword'>open [section]</span>, <span class='keyword'>clear</span>, <span class='keyword'>whoami</span>, <span class='keyword'>socials</span>, <span class='keyword'>download cv</span>",
    whoami: "Abdul Musawar Soomro - Kubernetes Developer @ Siemens Healthineers",
    socials: "LinkedIn: /in/musawar | GitHub: @mazzyy | YouTube: @Ideeaflux",
    "download cv": "Downloading resume.pdf...",
    "docker ps": "CONTAINER ID   IMAGE          COMMAND    STATUS\na1b2c3d4e5   portfolio:v1   npm start  Up 2 hours",
    "kubectl get pods": "NAME                     READY   STATUS    RESTARTS   AGE\nportfolio-app-6d8f     1/1     Running   0          5h\nbackend-api-7g9h         1/1     Running   0          5h",
    "sudo": "User is not in the sudoers file. This incident will be reported.",
    clear: "CLEAR"
};

// Terminal Input Handler
document.addEventListener('DOMContentLoaded', () => {
    const termInput = document.getElementById('term-input');
    const termOutput = document.getElementById('term-output');
    const termBody = document.getElementById('term-body');

    if (termInput) {
        termInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                const command = this.value.trim().toLowerCase();
                
                // Add user command to history
                termOutput.innerHTML += `<div class="terminal-line"><span class="terminal-prompt">➜</span> <span class="terminal-path">~/portfolio</span> ${this.value}</div>`;

                // Command Logic
                if (command === 'download cv') {
                    downloadCV();
                } 
                else if (command === 'clear') {
                    termOutput.innerHTML = '';
                }
                else if (termCommands[command]) {
                    termOutput.innerHTML += `<div class="terminal-line">${termCommands[command]}</div>`;
                }
                else if (command.startsWith('open ')) {
                    const section = command.split(' ')[1];
                    if (['about', 'projects', 'videos', 'contact'].includes(section)) {
                        switchTab(section);
                        termOutput.innerHTML += `<div class="terminal-line"><span class="terminal-success">Opening ${section}...</span></div>`;
                    } else {
                        termOutput.innerHTML += `<div class="terminal-line"><span class="terminal-error">Section not found. Try: about, projects, videos, contact</span></div>`;
                    }
                }
                else {
                    termOutput.innerHTML += `<div class="terminal-line"><span class="terminal-error">zsh: command not found: ${command}</span></div>`;
                }

                this.value = '';
                termBody.scrollTop = termBody.scrollHeight;
            }
        });
    }
});

 
// DOWNLOAD CV FUNCTION
 

function downloadCV() {
    const termOutput = document.getElementById('term-output');
    const termBody = document.getElementById('term-body');

    // Simulation Steps
    const steps = [
        { text: "Resolving host...", delay: 200 },
        { text: "Connecting to secure server...", delay: 600 },
        { text: "Fetching data stream...", delay: 1000 },
        { text: "Downloading: [#####               ] 25%", delay: 1500 },
        { text: "Downloading: [##########          ] 50%", delay: 2000 },
        { text: "Downloading: [###############     ] 75%", delay: 2500 },
        { text: "<span class='terminal-success'>Downloading: [####################] 100%</span>", delay: 3000 },
        { text: "<span class='terminal-success'>Successfully saved to local disk.</span>", delay: 3500 }
    ];

    // Execute Steps
    steps.forEach(step => {
        setTimeout(() => {
            if (termOutput) {
                const div = document.createElement('div');
                div.className = 'terminal-line';
                div.innerHTML = `<span class="text-muted">${step.text}</span>`;
                termOutput.appendChild(div);
                if (termBody) termBody.scrollTop = termBody.scrollHeight;
            }
        }, step.delay);
    });

    // Trigger Real Download
    setTimeout(() => {
        const link = document.createElement('a');
        link.href = 'resume.pdf'; 
        link.download = 'Abdul_Musawar_Soomro_CV.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }, 3500);
}

 
// RUN CODE BUTTON
 

function runCode() {
    // Open terminal if closed
    const panel = document.getElementById('integrated-terminal');
    if (panel && !panel.classList.contains('open')) {
        toggleTerminal(); 
    }

    const termOutput = document.getElementById('term-output');
    const termBody = document.getElementById('term-body');
    const time = new Date().toLocaleTimeString();

    // Append the "command"
    termOutput.innerHTML += `
        <div class="terminal-line" style="margin-top: 10px;">
            <span class="terminal-success">➜</span> 
            <span class="terminal-path">~/portfolio</span> 
            <span class="text-white">npm run start</span>
        </div>
    `;

    // Append simulated compilation steps
    termOutput.innerHTML += `
        <div class="terminal-line text-muted">[${time}] Compiling src/pages...</div>
        <div class="terminal-line text-muted">[${time}] TypeScript v5.3.3 compiled successfully.</div>
        <div class="terminal-line text-muted">[${time}] Optimizing production build...</div>
        <div class="terminal-line">
            <span class="terminal-success">✔ Build successful.</span> 
            <span class="text-muted">Serving at http://localhost:3000</span>
        </div>
        <div class="terminal-line text-muted">Ready for user interaction...</div>
    `;
    
    // Auto-scroll
    if (termBody) {
        termBody.scrollTop = termBody.scrollHeight;
    }
}

 
// COMMAND PALETTE
 

const paletteOverlay = document.getElementById('command-palette-overlay');
const paletteInput = document.getElementById('palette-input');
const paletteResults = document.getElementById('palette-results');

// Searchable Files
const searchableFiles = [
    { name: 'about.tsx', path: 'src/pages', tab: 'about' },
    { name: 'projects.tsx', path: 'src/pages', tab: 'projects' },
    { name: 'videos.tsx', path: 'src/pages', tab: 'videos' },
    { name: 'contact.tsx', path: 'src/pages', tab: 'contact' },
    { name: 'resume.pdf', path: 'downloads', action: 'download' }
];

// Command Palette Commands
const commands = [
    { name: 'Go to About', action: () => switchTab('about') },
    { name: 'Go to Projects', action: () => switchTab('projects') },
    { name: 'Go to Videos', action: () => switchTab('videos') },
    { name: 'Download Resume', action: () => downloadCV() },
    { name: 'Toggle Terminal', action: () => toggleTerminal() },
    { name: 'Contact Me', action: () => switchTab('contact') }
];

let selectedIndex = 0;

// Toggle Palette
function togglePalette() {
    if (!paletteOverlay) return;
    const isHidden = paletteOverlay.style.display === 'none';
    paletteOverlay.style.display = isHidden ? 'flex' : 'none';
    if (isHidden) {
        paletteInput.value = '';
        paletteInput.focus();
        renderPaletteResults('');
    }
}

// Render Results
function renderPaletteResults(filter) {
    if (!paletteResults) return;
    paletteResults.innerHTML = '';
    const lowerFilter = filter.toLowerCase();
    
    const matches = searchableFiles.filter(f => 
        f.name.toLowerCase().includes(lowerFilter)
    );

    matches.forEach((file, index) => {
        const item = document.createElement('div');
        item.className = `palette-item ${index === selectedIndex ? 'selected' : ''}`;
        item.innerHTML = `
            <span class="palette-item-name">${file.name}</span>
            <span class="palette-item-path">${file.path}</span>
        `;
        
        item.addEventListener('click', () => selectFile(file));
        item.addEventListener('mouseenter', () => {
            selectedIndex = index;
            renderPaletteResults(filter);
        });
        
        paletteResults.appendChild(item);
    });
}

// Select File
function selectFile(file) {
    if (file.action === 'download') {
        downloadCV();
    } else {
        switchTab(file.tab);
    }
    togglePalette();
}

// Keyboard Shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl+P or Cmd+P to open palette
    if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault();
        togglePalette();
    }
    // Escape to close
    if (e.key === 'Escape' && paletteOverlay && paletteOverlay.style.display === 'flex') {
        togglePalette();
    }
});

// Close when clicking outside
if (paletteOverlay) {
    paletteOverlay.addEventListener('click', (e) => {
        if (e.target === paletteOverlay) togglePalette();
    });
}

// Palette Input Events
if (paletteInput) {
    paletteInput.addEventListener('input', (e) => {
        selectedIndex = 0;
        renderPaletteResults(e.target.value);
    });

    paletteInput.addEventListener('keydown', (e) => {
        const items = document.querySelectorAll('.palette-item');
        
        if (e.key === 'ArrowDown') {
            selectedIndex = (selectedIndex + 1) % items.length;
            renderPaletteResults(paletteInput.value);
        } else if (e.key === 'ArrowUp') {
            selectedIndex = (selectedIndex - 1 + items.length) % items.length;
            renderPaletteResults(paletteInput.value);
        } else if (e.key === 'Enter') {
            const matches = searchableFiles.filter(f => 
                f.name.toLowerCase().includes(paletteInput.value.toLowerCase())
            );
            if (matches[selectedIndex]) {
                selectFile(matches[selectedIndex]);
            }
        }
    });
}

 
// SIDEBAR & SEARCH LOGIC
 

const searchIcon = document.querySelector('[data-section="search"]');
const explorerIcon = document.querySelector('[data-section="explorer"]');
const sidebarHeader = document.querySelector('.sidebar-header');
const sidebarContent = document.querySelector('.file-tree');

// Store original content with proper structure
const originalTreeContent = `
    <div class="folder-item">
        <span>📁</span> src
    </div>
    <div class="folder-item nested-1">
        <span>📁</span> pages
    </div>
    <div class="file-item ts nested-2 active" data-tab="about">
        about.tsx
    </div>
    <div class="file-item ts nested-2" data-tab="projects">
        projects.tsx
    </div>
    <div class="file-item ts nested-2" data-tab="videos">
        videos.tsx
    </div>
    <div class="file-item ts nested-2" data-tab="contact">
        contact.tsx
    </div>
    <div class="folder-item nested-1">
        <span>📁</span> components
    </div>
    <div class="file-item ts nested-2 non-clickable">
        Skills.tsx
    </div>
    <div class="file-item ts nested-2 non-clickable">
        Experience.tsx
    </div>
    <div class="file-item ts nested-2 non-clickable">
        ProjectCard.tsx
    </div>
    <div class="file-item ts nested-2 non-clickable">
        VideoPlayer.tsx
    </div>
    <div class="file-item json">
        package.json
    </div>
    <div class="file-item yml">
        docker-compose.yml
    </div>
    <div class="file-item md">
        README.md
    </div>
    <div class="file-item pdf" data-tab="resume" onclick="downloadCV()">
        resume.pdf
    </div>
`;

let originalContent = sidebarContent ? originalTreeContent : '';

// Single delegated listener for sidebar - handles all file clicks
function initSidebarListeners() {
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
        sidebar.addEventListener('click', function(e) {
            const item = e.target.closest('.file-item[data-tab]');
            if (item) {
                const tabName = item.getAttribute('data-tab');
                
                // Update active state in sidebar
                document.querySelectorAll('.file-item').forEach(i => i.classList.remove('active'));
                item.classList.add('active');
                
                // Switch tab (unless it's resume which triggers download)
                if (tabName && tabName !== 'resume') {
                    switchTab(tabName);
                }
            }
        });
    }
    console.log('Sidebar listeners initialized');
}

// Legacy function for compatibility - no longer needed with delegation
function attachFileListeners() {
    // No-op - using event delegation on sidebar instead
}

// Search Icon Click
if (searchIcon) {
    searchIcon.addEventListener('click', () => {
        sidebarHeader.textContent = "SEARCH";
        
        sidebarContent.innerHTML = `
            <div style="padding: 10px;">
                <input type="text" id="global-search" placeholder="Search files..." 
                       style="width: 100%; background: #3c3c3c; border: 1px solid #007acc; color: white; padding: 5px; outline: none; font-family: inherit;">
            </div>
            <div id="search-results">${originalContent}</div>
        `;

        attachFileListeners();

        const searchInput = document.getElementById('global-search');
        searchInput.focus();
        
        searchInput.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            const items = document.querySelectorAll('#search-results .file-item');
            const folders = document.querySelectorAll('#search-results .folder-item');

            folders.forEach(f => f.style.display = term ? 'none' : 'flex');
            
            items.forEach(item => {
                const text = item.textContent.toLowerCase();
                if (text.includes(term)) {
                    item.style.display = 'flex';
                    if (term) {
                        item.style.paddingLeft = '24px';
                    } else {
                        item.style.paddingLeft = '';
                    }
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// Explorer Icon Click
if (explorerIcon) {
    explorerIcon.addEventListener('click', () => {
        sidebarHeader.textContent = "EXPLORER";
        sidebarContent.innerHTML = originalContent;
        attachFileListeners(); 
    });
}

// Initial Load
document.addEventListener('DOMContentLoaded', function() {
    initTabs();
    initSidebarListeners();
    console.log('Portfolio initialized');
});

 
// MOBILE NAVIGATION
 

function toggleMobileMenu() {
    const nav = document.getElementById('mobile-nav');
    const overlay = document.getElementById('mobile-nav-overlay');
    
    if (nav && overlay) {
        nav.classList.toggle('open');
        overlay.classList.toggle('open');
        
        // Prevent body scroll when menu is open
        if (nav.classList.contains('open')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }
}

function mobileNavTo(tabName) {
    // Update mobile nav active state
    document.querySelectorAll('.mobile-nav-item[data-mobile-tab]').forEach(item => {
        item.classList.remove('active');
    });
    const activeItem = document.querySelector(`.mobile-nav-item[data-mobile-tab="${tabName}"]`);
    if (activeItem) activeItem.classList.add('active');
    
    // Switch tab
    switchTab(tabName);
    
    // Close mobile menu
    toggleMobileMenu();
}

// Close mobile menu on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const nav = document.getElementById('mobile-nav');
        if (nav && nav.classList.contains('open')) {
            toggleMobileMenu();
        }
    }
});

// Close mobile menu on window resize above mobile breakpoint
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        const nav = document.getElementById('mobile-nav');
        const overlay = document.getElementById('mobile-nav-overlay');
        if (nav && nav.classList.contains('open')) {
            nav.classList.remove('open');
            overlay.classList.remove('open');
            document.body.style.overflow = '';
        }
    }
});

 
// GIT ICON LOGIC
 

const gitIcon = document.querySelector('[data-section="git"]');

if (gitIcon) {
    gitIcon.addEventListener('click', () => {
        sidebarHeader.textContent = "SOURCE CONTROL";
        
        sidebarContent.innerHTML = `
            <div style="padding: 10px; font-size: 0.8rem; color: #cccccc;">
                <div style="padding-bottom: 10px; border-bottom: 1px solid #3c3c3c; margin-bottom: 10px;">
                    <span>Repositories</span>
                    <span style="float: right; background: #007acc; padding: 0 5px; border-radius: 10px;">59</span>
                </div>
                
                <div class="git-history">
                    <div style="color: #6a9955; margin-bottom: 10px; font-weight: bold;">COMMITS (Timeline)</div>
                    
                    <div class="commit-item" style="margin-bottom: 15px; cursor: pointer;">
                        <div style="display: flex; align-items: center; gap: 5px;">
                            <span style="color: #d7ba7d;">●</span>
                            <span style="color: #4ec9b0;">feat: Joined Siemens Healthineers</span>
                        </div>
                        <div style="padding-left: 15px; color: #858585; font-size: 0.75rem;">
                            <span>d41d8cd</span> • <span>Jan 2024</span>
                        </div>
                    </div>

                    <div class="commit-item" style="margin-bottom: 15px; cursor: pointer;">
                        <div style="display: flex; align-items: center; gap: 5px;">
                            <span style="color: #d7ba7d;">●</span>
                            <span style="color: #4ec9b0;">fix: Infrastructure overhaul at PUMA</span>
                        </div>
                        <div style="padding-left: 15px; color: #858585; font-size: 0.75rem;">
                            <span>a1b2c3d</span> • <span>Sep 2022</span>
                        </div>
                    </div>

                    <div class="commit-item" style="margin-bottom: 15px; cursor: pointer;">
                        <div style="display: flex; align-items: center; gap: 5px;">
                            <span style="color: #d7ba7d;">●</span>
                            <span style="color: #4ec9b0;">init: Co-founded Asaan Recovery</span>
                        </div>
                        <div style="padding-left: 15px; color: #858585; font-size: 0.75rem;">
                            <span>98f7e6d</span> • <span>Jun 2021</span>
                        </div>
                    </div>

                    <div class="commit-item" style="margin-bottom: 15px; cursor: pointer;">
                        <div style="display: flex; align-items: center; gap: 5px;">
                            <span style="color: #d7ba7d;">●</span>
                            <span style="color: #4ec9b0;">feat: Started MSc Data Science at FAU</span>
                        </div>
                        <div style="padding-left: 15px; color: #858585; font-size: 0.75rem;">
                            <span>f5e4d3c</span> • <span>Oct 2021</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
}

 
// THEME SWITCHER
 

const settingsIcon = document.querySelector('[data-section="settings"]');

if (settingsIcon) {
    let isDark = true;

    settingsIcon.addEventListener('click', () => {
        const root = document.documentElement;
        
        if (isDark) {
            // SWITCH TO LIGHT THEME
            root.style.setProperty('--bg-primary', '#ffffff');
            root.style.setProperty('--bg-secondary', '#f3f3f3');
            root.style.setProperty('--bg-tertiary', '#e8e8e8');
            root.style.setProperty('--bg-editor', '#ffffff');
            root.style.setProperty('--bg-terminal', '#f3f3f3'); 
            root.style.setProperty('--bg-sidebar', '#eeeeee'); 
            root.style.setProperty('--bg-active', '#e4e6f1'); 
            root.style.setProperty('--bg-hover', '#e8e8e8');  
            root.style.setProperty('--text-primary', '#2c2c2c');
            root.style.setProperty('--text-secondary', '#424242');
            root.style.setProperty('--text-muted', '#6e6e6e');
            root.style.setProperty('--text-white', '#000000');
            root.style.setProperty('--border', '#d4d4d4');
            root.style.setProperty('--syntax-keyword', '#0000ff');
            root.style.setProperty('--syntax-string', '#a31515');
            root.style.setProperty('--syntax-function', '#795e26');
            root.style.setProperty('--syntax-comment', '#008000');
            root.style.setProperty('--syntax-variable', '#001080');
            root.style.setProperty('--syntax-operator', '#2c2c2c');
            root.style.setProperty('--accent-blue', '#005fb8');
            root.style.setProperty('--neon-green', '#008000');
            root.style.setProperty('--neon-blue', '#0000ff');
            root.style.setProperty('--neon-purple', '#800080');
            root.style.setProperty('--neon-pink', '#c70054');
            root.style.setProperty('--accent-cyan', '#005c99');
            root.style.setProperty('--accent-red', '#d11515');

            isDark = false;
            
        } else {
            // SWITCH BACK TO DARK THEME
            root.style.setProperty('--bg-primary', '#1e1e1e');
            root.style.setProperty('--bg-secondary', '#252526');
            root.style.setProperty('--bg-tertiary', '#2d2d30');
            root.style.setProperty('--bg-editor', '#1e1e1e');
            root.style.setProperty('--bg-terminal', '#0d0d0d'); 
            root.style.setProperty('--bg-sidebar', '#181818'); 
            root.style.setProperty('--bg-active', '#37373d'); 
            root.style.setProperty('--bg-hover', '#2a2d2e');  
            root.style.setProperty('--text-primary', '#d4d4d4');
            root.style.setProperty('--text-secondary', '#858585');
            root.style.setProperty('--text-muted', '#6e6e6e');
            root.style.setProperty('--text-white', '#ffffff');
            root.style.setProperty('--border', '#3c3c3c');
            root.style.setProperty('--syntax-keyword', '#569cd6');
            root.style.setProperty('--syntax-string', '#ce9178');
            root.style.setProperty('--syntax-function', '#dcdcaa');
            root.style.setProperty('--syntax-comment', '#6a9955');
            root.style.setProperty('--syntax-variable', '#9cdcfe');
            root.style.setProperty('--syntax-operator', '#d4d4d4');
            root.style.setProperty('--accent-blue', '#007acc');
            root.style.setProperty('--neon-green', '#00ff9d');
            root.style.setProperty('--neon-blue', '#00d4ff');
            root.style.setProperty('--neon-purple', '#b14eff');
            root.style.setProperty('--neon-pink', '#ff006e');
            root.style.setProperty('--accent-cyan', '#4fc1ff');
            root.style.setProperty('--accent-red', '#f14c4c');

            isDark = true;
        }
    });
}

 
// CONSOLE EASTER EGG
 

console.log('%c🚀 Welcome to my portfolio!', 'font-size: 20px; color: #00d4ff; text-shadow: 0 0 10px #00d4ff;');
console.log('%c Built with pure HTML, CSS & JS', 'font-size: 12px; color: #858585;');
console.log('%c🔧 musawar.soomro25@gmail.com', 'font-size: 14px; color: #4ec9b0;');

 
// TRIGGER COMMAND (for palette)
 

window.triggerCommand = (name) => {
    const command = commands.find(c => c.name === name);
    if (command) {
        command.action();
        const palette = document.getElementById('command-palette');
        if (palette) palette.style.display = 'none';
    }
};

async function fetchGitHubStats() {
    const user = 'mazzyy'; // Your GitHub username from resume [cite: 4]
    try {
        const response = await fetch(`https://api.github.com/users/${user}`);
        const data = await response.json();
        
        // Update the DOM element
        const repoCount = document.querySelector('.activity-badge');
        if(repoCount) repoCount.innerText = data.public_repos;
    } catch (error) {
        console.error('Error fetching GitHub data:', error);
    }
}

/* ═══════════════════════════════════════════════════════════════
   LANDING PAGE - BOOT SEQUENCE
   ═══════════════════════════════════════════════════════════════ */

const bootMessages = [
    { text: "Initializing system...", type: "info", delay: 0 },
    { text: "Loading kernel modules...", type: "info", delay: 300 },
    { text: "✓ Core systems online", type: "success", delay: 600 },
    { text: "Connecting to GitHub...", type: "info", delay: 900 },
    { text: "✓ 59 repositories synced", type: "success", delay: 1200 },
    { text: "Loading experience data...", type: "info", delay: 1500 },
    { text: "✓ 5+ years of expertise loaded", type: "success", delay: 1800 },
    { text: "Initializing AI assistant...", type: "info", delay: 2100 },
    { text: "✓ Azure OpenAI connected", type: "success", delay: 2400 },
    { text: "", type: "spacer", delay: 2600 },
    { text: "Welcome, visitor.", type: "success", delay: 2700 },
    { text: "Portfolio ready.", type: "success", delay: 2900 }
];

function initLandingPage() {
    const overlay = document.getElementById('landing-overlay');
    const bootLines = document.getElementById('boot-lines');
    const enterBtn = document.getElementById('enter-btn');
    
    // Check if user has visited before
    const hasVisited = localStorage.getItem('portfolio_visited');
    
    if (hasVisited) {
        // Skip landing for returning visitors
        if (overlay) overlay.style.display = 'none';
        return;
    }
    
    // Initialize matrix rain
    initMatrixRain();
    
    // Play boot sequence
    bootMessages.forEach((msg, index) => {
        setTimeout(() => {
            if (bootLines && msg.text) {
                const line = document.createElement('div');
                line.className = `boot-line ${msg.type}`;
                line.innerHTML = msg.text;
                bootLines.appendChild(line);
                bootLines.scrollTop = bootLines.scrollHeight;
            }
        }, msg.delay);
    });
    
    // Enter button click
    if (enterBtn) {
        enterBtn.addEventListener('click', closeLanding);
    }
    
    // Keyboard shortcuts to skip
    document.addEventListener('keydown', function landingKeyHandler(e) {
        if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') {
            if (overlay && !overlay.classList.contains('hidden')) {
                e.preventDefault();
                closeLanding();
                document.removeEventListener('keydown', landingKeyHandler);
            }
        }
    });
}

function closeLanding() {
    const overlay = document.getElementById('landing-overlay');
    if (overlay) {
        overlay.classList.add('hidden');
        setTimeout(() => {
            overlay.style.display = 'none';
        }, 800);
        // Remember the visit
        localStorage.setItem('portfolio_visited', 'true');
    }
}

// Matrix Rain Effect
function initMatrixRain() {
    const canvas = document.getElementById('matrix-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const charArray = chars.split('');
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = [];
    
    for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * -100;
    }
    
    function drawMatrix() {
        ctx.fillStyle = 'rgba(10, 10, 15, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#00ff9d';
        ctx.font = `${fontSize}px Fira Code`;
        
        for (let i = 0; i < drops.length; i++) {
            const text = charArray[Math.floor(Math.random() * charArray.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    const matrixInterval = setInterval(drawMatrix, 50);
    
    // Stop matrix when landing closes
    const overlay = document.getElementById('landing-overlay');
    if (overlay) {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.target.classList.contains('hidden')) {
                    clearInterval(matrixInterval);
                    observer.disconnect();
                }
            });
        });
        observer.observe(overlay, { attributes: true, attributeFilter: ['class'] });
    }
}

/* ═══════════════════════════════════════════════════════════════
   AI CHAT FUNCTIONALITY
   ═══════════════════════════════════════════════════════════════ */

// Chat state
let chatHistory = [];
let isWaitingForResponse = false;

// AI System prompt based on resume
const AI_SYSTEM_PROMPT = `You are an AI assistant representing Abdul Musawar Soomro's portfolio. You have detailed knowledge about his background:

PROFILE:
- Name: Abdul Musawar Soomro
- Current Role: Kubernetes Developer at Siemens Healthineers (Jan 2024 - Present)
- Location: Erlangen, Germany
- Contact: musawar.soomro25@gmail.com, +49 152 17136471
- Education: MSc Data Science (AI/ML specialization) at FAU Erlangen-Nürnberg (ongoing), BSc Computer Science from Mohammad Ali Jinnah University

SKILLS:
- Languages: Python, JavaScript, Bash
- Frontend: React.js, Vue.js, UI/UX Design
- Backend: Django, FastAPI, Flask, Node.js, Express
- Cloud & DevOps: AWS, Azure, Docker, Kubernetes, Terraform
- Databases: PostgreSQL, MySQL, SQLite, MongoDB
- CI/CD: GitHub Actions, Jenkins
- Other: REST APIs, GraphQL, Agile/SCRUM

EXPERIENCE:
1. Kubernetes Developer @ Siemens Healthineers (Jan 2024 - Present): Container image analysis, Kubernetes infrastructure, CI/CD pipelines, security standards
2. Cloud Infrastructure Engineer @ PUMA (Sep 2022 - Mar 2023): Azure cloud solutions, Terraform, containerization
3. Co-Founder @ Asaan Recovery (Jun 2021 - Aug 2022): Built CRM with role-based access, SMS integration, payroll management
4. Full-Stack Developer @ One Stop Solution (Jun 2020 - Jun 2021): CRM development, RESTful services
5. Full-Stack Developer @ DXIGNLAB (Oct 2019 - Mar 2020): Web architecture, application features

PROJECTS:
- MarketMap: AI-powered market mapping with agent-based collaboration
- FaceSwitch: Deep learning face swap with facial landmark detection
- AI Web App Builder: Create websites using natural language with Gemini AI
- Talent Finder: AI-powered recruitment assistant
- CRM System: Full-featured CRM with React, Node.js, MongoDB
- DevOps Genie: AI-powered DevOps assistant

Respond in a friendly, professional manner. Keep responses concise but informative. Use emojis sparingly. If asked something you don't know about Musawar, suggest they contact him directly.`;

function initChatPanel() {
    const chatIcon = document.getElementById('ai-chat-icon');
    const chatPanel = document.getElementById('chat-panel');
    const closeChat = document.getElementById('close-chat');
    const clearChat = document.getElementById('clear-chat');
    const chatInput = document.getElementById('chat-input');
    const chatSend = document.getElementById('chat-send');
    const chatMessages = document.getElementById('chat-messages');
    
    // Toggle chat panel
    if (chatIcon) {
        chatIcon.addEventListener('click', () => {
            toggleChatPanel();
            // Update active state
            document.querySelectorAll('.activity-icon').forEach(i => i.classList.remove('active'));
            if (chatPanel.classList.contains('open')) {
                chatIcon.classList.add('active');
            }
        });
    }
    
    // Close chat
    if (closeChat) {
        closeChat.addEventListener('click', () => {
            closeChatPanel();
        });
    }
    
    // Clear chat
    if (clearChat) {
        clearChat.addEventListener('click', () => {
            clearChatHistory();
        });
    }
    
    // Send message
    if (chatSend) {
        chatSend.addEventListener('click', () => {
            sendMessage();
        });
    }
    
    // Input handling
    if (chatInput) {
        chatInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });
        
        // Auto-resize textarea
        chatInput.addEventListener('input', () => {
            chatInput.style.height = 'auto';
            chatInput.style.height = Math.min(chatInput.scrollHeight, 120) + 'px';
        });
    }
    
    // Quick prompts
    document.querySelectorAll('.quick-prompt').forEach(btn => {
        btn.addEventListener('click', () => {
            const prompt = btn.getAttribute('data-prompt');
            if (chatInput) {
                chatInput.value = prompt;
                sendMessage();
            }
        });
    });
}

function toggleChatPanel() {
    const chatPanel = document.getElementById('chat-panel');
    if (chatPanel) {
        chatPanel.classList.toggle('open');
        if (chatPanel.classList.contains('open')) {
            document.getElementById('chat-input')?.focus();
        }
    }
}

function closeChatPanel() {
    const chatPanel = document.getElementById('chat-panel');
    const chatIcon = document.getElementById('ai-chat-icon');
    if (chatPanel) {
        chatPanel.classList.remove('open');
    }
    if (chatIcon) {
        chatIcon.classList.remove('active');
    }
}

function clearChatHistory() {
    const chatMessages = document.getElementById('chat-messages');
    chatHistory = [];
    
    if (chatMessages) {
        chatMessages.innerHTML = `
            <div class="chat-message ai">
                <div class="message-avatar">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                        <path d="M12 2a2 2 0 012 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 017 7h1a1 1 0 011 1v3a1 1 0 01-1 1h-1v1a2 2 0 01-2 2H5a2 2 0 01-2-2v-1H2a1 1 0 01-1-1v-3a1 1 0 011-1h1a7 7 0 017-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 012-2zm-3 9a1 1 0 100 2 1 1 0 000-2zm6 0a1 1 0 100 2 1 1 0 000-2z"/>
                    </svg>
                </div>
                <div class="message-content">
                    <div class="message-header">
                        <span class="message-sender">Musawar's AI</span>
                        <span class="message-time">now</span>
                    </div>
                    <div class="message-text">
                        Chat cleared! 🗑️ How can I help you learn about Musawar?
                        <div class="quick-prompts">
                            <button class="quick-prompt" data-prompt="What's your Kubernetes experience?">Kubernetes experience?</button>
                            <button class="quick-prompt" data-prompt="Tell me about your projects">Your projects</button>
                            <button class="quick-prompt" data-prompt="What tech stack do you use?">Tech stack</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Re-attach quick prompt listeners
        document.querySelectorAll('.quick-prompt').forEach(btn => {
            btn.addEventListener('click', () => {
                const prompt = btn.getAttribute('data-prompt');
                const chatInput = document.getElementById('chat-input');
                if (chatInput) {
                    chatInput.value = prompt;
                    sendMessage();
                }
            });
        });
    }
}

function sendMessage() {
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');
    
    if (!chatInput || !chatMessages || isWaitingForResponse) return;
    
    const message = chatInput.value.trim();
    if (!message) return;
    
    // Add user message to UI
    addMessageToUI('user', message);
    chatHistory.push({ role: 'user', content: message });
    
    // Clear input
    chatInput.value = '';
    chatInput.style.height = 'auto';
    
    // Show typing indicator
    showTypingIndicator();
    isWaitingForResponse = true;
    
    // Call AI API
    callAIAPI(message);
}

function addMessageToUI(type, text) {
    const chatMessages = document.getElementById('chat-messages');
    if (!chatMessages) return;
    
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const senderName = type === 'user' ? 'You' : "Musawar's AI";
    
    const avatarContent = type === 'user' 
        ? '<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>'
        : '<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M12 2a2 2 0 012 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 017 7h1a1 1 0 011 1v3a1 1 0 01-1 1h-1v1a2 2 0 01-2 2H5a2 2 0 01-2-2v-1H2a1 1 0 01-1-1v-3a1 1 0 011-1h1a7 7 0 017-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 012-2zm-3 9a1 1 0 100 2 1 1 0 000-2zm6 0a1 1 0 100 2 1 1 0 000-2z"/></svg>';
    
    const messageHTML = `
        <div class="chat-message ${type}">
            <div class="message-avatar">${avatarContent}</div>
            <div class="message-content">
                <div class="message-header">
                    <span class="message-sender">${senderName}</span>
                    <span class="message-time">${time}</span>
                </div>
                <div class="message-text">${formatMessage(text)}</div>
            </div>
        </div>
    `;
    
    chatMessages.insertAdjacentHTML('beforeend', messageHTML);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function formatMessage(text) {
    // Convert markdown-like formatting
    return text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/`(.*?)`/g, '<code>$1</code>')
        .replace(/\n/g, '<br>');
}

function showTypingIndicator() {
    const chatMessages = document.getElementById('chat-messages');
    if (!chatMessages) return;
    
    const indicatorHTML = `
        <div class="chat-message ai typing-message">
            <div class="message-avatar">
                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                    <path d="M12 2a2 2 0 012 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 017 7h1a1 1 0 011 1v3a1 1 0 01-1 1h-1v1a2 2 0 01-2 2H5a2 2 0 01-2-2v-1H2a1 1 0 01-1-1v-3a1 1 0 011-1h1a7 7 0 017-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 012-2z"/>
                </svg>
            </div>
            <div class="message-content">
                <div class="message-text">
                    <div class="typing-indicator">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    chatMessages.insertAdjacentHTML('beforeend', indicatorHTML);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function removeTypingIndicator() {
    const typingMessage = document.querySelector('.typing-message');
    if (typingMessage) {
        typingMessage.remove();
    }
}

async function callAIAPI(userMessage) {
    // For now, use a mock response since the FastAPI endpoint isn't ready yet
    // This will be replaced with actual API call
    
    try {
        // Simulated API delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Mock intelligent responses based on keywords
        const response = getMockResponse(userMessage);
        
        removeTypingIndicator();
        addMessageToUI('ai', response);
        chatHistory.push({ role: 'assistant', content: response });
        
    } catch (error) {
        console.error('AI API Error:', error);
        removeTypingIndicator();
        addMessageToUI('ai', "Sorry, I'm having trouble connecting right now. Please try again or contact Musawar directly at musawar.soomro25@gmail.com");
    } finally {
        isWaitingForResponse = false;
    }
}

function getMockResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    // Kubernetes related
    if (lowerMessage.includes('kubernetes') || lowerMessage.includes('k8s')) {
        return "I've been working as a **Kubernetes Developer at Siemens Healthineers** since January 2024. My work involves automating container image analysis, architecting Kubernetes infrastructure, implementing CI/CD pipelines, and maintaining security standards for all containers. I also work extensively with Docker for containerization. 🐳";
    }
    
    // Cloud/DevOps
    if (lowerMessage.includes('cloud') || lowerMessage.includes('devops') || lowerMessage.includes('aws') || lowerMessage.includes('azure')) {
        return "I have extensive cloud experience! At **PUMA**, I designed and managed Azure-based cloud solutions with Terraform. I'm proficient in both **AWS and Azure**, plus Docker, Kubernetes, GitHub Actions, and Jenkins for CI/CD. Cloud infrastructure and automation are my specialties! ☁️";
    }
    
    // Projects
    if (lowerMessage.includes('project')) {
        return "Here are some of my favorite projects:\n\n• **MarketMap** - AI-powered market mapping with agent-based collaboration\n• **FaceSwitch** - Deep learning face swap using facial landmark detection\n• **AI Web App Builder** - Create websites using natural language prompts\n• **Talent Finder** - AI-powered recruitment assistant\n• **CRM System** - Full-featured CRM with React & Node.js\n\nYou can check them out in the Projects tab! 🚀";
    }
    
    // Tech stack
    if (lowerMessage.includes('tech') || lowerMessage.includes('stack') || lowerMessage.includes('skill')) {
        return "My tech stack includes:\n\n**Languages:** Python, JavaScript, Bash\n**Frontend:** React.js, Vue.js\n**Backend:** Django, FastAPI, Flask, Node.js\n**Cloud:** AWS, Azure, Docker, Kubernetes\n**Databases:** PostgreSQL, MySQL, MongoDB\n**CI/CD:** GitHub Actions, Jenkins, Terraform\n\nI love working with cutting-edge technologies! 💻";
    }
    
    // Education
    if (lowerMessage.includes('education') || lowerMessage.includes('study') || lowerMessage.includes('degree') || lowerMessage.includes('university')) {
        return "I'm currently pursuing my **MSc in Data Science** at Friedrich-Alexander-Universität Erlangen-Nürnberg (FAU), specializing in AI/ML. Before that, I completed my **BSc in Computer Science** from Mohammad Ali Jinnah University in Karachi, Pakistan (2016-2020). 🎓";
    }
    
    // Experience
    if (lowerMessage.includes('experience') || lowerMessage.includes('work') || lowerMessage.includes('job')) {
        return "I have **5+ years** of professional experience:\n\n• **Siemens Healthineers** (2024-Present) - Kubernetes Developer\n• **PUMA** (2022-2023) - Cloud Infrastructure Engineer\n• **Asaan Recovery** (2021-2022) - Co-Founder\n• **One Stop Solution** (2020-2021) - Full-Stack Developer\n• **DXIGNLAB** (2019-2020) - Full-Stack Developer\n\nFrom startups to enterprise - I've seen it all! 📈";
    }
    
    // Contact
    if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('reach') || lowerMessage.includes('hire')) {
        return "You can reach Musawar at:\n\n📧 **Email:** musawar.soomro25@gmail.com\n📱 **Phone:** +49 152 17136471\n🔗 **LinkedIn:** /in/musawar\n💻 **GitHub:** @mazzyy\n📍 **Location:** Erlangen, Germany\n\nHe's currently open to opportunities! 🤝";
    }
    
    // Hello/Hi
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
        return "Hey there! 👋 I'm Musawar's AI assistant. I can tell you about his experience, skills, projects, or education. What would you like to know?";
    }
    
    // Who is/about
    if (lowerMessage.includes('who') || lowerMessage.includes('about')) {
        return "Musawar is a **Software Engineer** with 5+ years of experience in building scalable web applications and cloud infrastructure. He's currently a Kubernetes Developer at Siemens Healthineers and pursuing his MSc in Data Science at FAU. He's passionate about cloud technologies, AI, and solving complex problems! 🌟";
    }
    
    // Default response
    return "That's a great question! While I might not have the specific answer, I can tell you about Musawar's experience, skills, projects, education, or how to contact him. What interests you most? 🤔";
}

/* ═══════════════════════════════════════════════════════════════
   INITIALIZE ALL NEW FEATURES
   ═══════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize landing page
    initLandingPage();
    
    // Initialize chat panel
    initChatPanel();
    
    console.log('Landing page and AI chat initialized');
});