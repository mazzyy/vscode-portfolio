/* ═══════════════════════════════════════════════════════════════
   PORTFOLIO JAVASCRIPT
   ═══════════════════════════════════════════════════════════════ */

// ═══════════════════════════════════════════════════════════════
// TAB NAVIGATION
// ═══════════════════════════════════════════════════════════════

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

// ═══════════════════════════════════════════════════════════════
// ACTIVITY BAR
// ═══════════════════════════════════════════════════════════════

const activityIcons = document.querySelectorAll('.activity-icon[data-section]');
activityIcons.forEach(icon => {
    icon.addEventListener('click', () => {
        activityIcons.forEach(i => i.classList.remove('active'));
        icon.classList.add('active');
    });
});

// ═══════════════════════════════════════════════════════════════
// TERMINAL FUNCTIONS
// ═══════════════════════════════════════════════════════════════

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

// ═══════════════════════════════════════════════════════════════
// DOWNLOAD CV FUNCTION
// ═══════════════════════════════════════════════════════════════

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

// ═══════════════════════════════════════════════════════════════
// RUN CODE BUTTON
// ═══════════════════════════════════════════════════════════════

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

// ═══════════════════════════════════════════════════════════════
// COMMAND PALETTE
// ═══════════════════════════════════════════════════════════════

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

// ═══════════════════════════════════════════════════════════════
// SIDEBAR & SEARCH LOGIC
// ═══════════════════════════════════════════════════════════════

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

// ═══════════════════════════════════════════════════════════════
// GIT ICON LOGIC
// ═══════════════════════════════════════════════════════════════

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

// ═══════════════════════════════════════════════════════════════
// THEME SWITCHER
// ═══════════════════════════════════════════════════════════════

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

// ═══════════════════════════════════════════════════════════════
// CONSOLE EASTER EGG
// ═══════════════════════════════════════════════════════════════

console.log('%c🚀 Welcome to my portfolio!', 'font-size: 20px; color: #00d4ff; text-shadow: 0 0 10px #00d4ff;');
console.log('%c Built with pure HTML, CSS & JS', 'font-size: 12px; color: #858585;');
console.log('%c🔧 musawar.soomro25@gmail.com', 'font-size: 14px; color: #4ec9b0;');

// ═══════════════════════════════════════════════════════════════
// TRIGGER COMMAND (for palette)
// ═══════════════════════════════════════════════════════════════

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
// Call this in your init() function