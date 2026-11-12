# VS Code Portfolio — Abdul Musawar Soomro

A VS Code-themed interactive portfolio website built with React. Mimics the look and feel of Visual Studio Code — complete with a file explorer, editor tabs, integrated terminal, command palette, and 4 switchable color themes.

**Live:** [musawar.tech](https://musawar.tech)

## Screenshots

| Dark+ | Light+ | Ocean Blue | Midnight Purple |
|-------|--------|------------|-----------------|
| Default dark theme | Clean light theme | Modern blue aesthetic | Rich purple tones |

## Features

- **4 Color Themes** — Dark+, Light+, Ocean Blue, Midnight Purple (cycle via settings gear)
- **Interactive Terminal** — Type commands: `help`, `open about`, `download cv`, `whoami`, `clear`
- **Command Palette** — Press `Ctrl+P` / `⌘+P` to quick-search and navigate files
- **File Explorer** — Sidebar with file tree, search, source control history, and feature tips
- **Editor Tabs** — Switch between About, Projects, Videos, and Contact sections
- **Project Showcase** — Master-detail layout with rich showcase pages for featured projects (UniAdvisorAI, LinkAI, E-T-A Hybrid AI)
- **Video Demos** — Embedded YouTube demos with click-to-swap featured video
- **Download CV** — Click `resume.pdf` in the explorer or type `download cv` in terminal
- **Fully Responsive** — Mobile navigation drawer, adaptive layouts for all screen sizes
- **Run Button** — Simulates a build process in the integrated terminal

## Tech Stack

- **React 18** (Create React App)
- **CSS3** with CSS custom properties for theming
- **Font Awesome 6** for icons
- **Fira Code** + **Inter** fonts

## Project Structure

```
src/
├── App.jsx                  # Main app — themes, state, keyboard shortcuts
├── index.js                 # Entry point
├── styles.css               # All styles (~3000 lines, organized by section)
└── components/
    ├── TitleBar.jsx          # macOS-style title bar
    ├── ActivityBar.jsx       # Left icon bar (explorer, search, git, tips, theme)
    ├── Sidebar.jsx           # File tree, search, git history, features panel
    ├── EditorArea.jsx        # Tab bar + content sections
    ├── Terminal.jsx          # Interactive terminal with command parsing
    ├── StatusBar.jsx         # Bottom bar (terminal toggle, theme, status)
    ├── CommandPalette.jsx    # Ctrl+P quick file search
    ├── MobileNav.jsx         # Mobile slide-out navigation
    └── sections/
        ├── AboutSection.jsx      # Profile, skills, experience, education
        ├── ProjectsSection.jsx   # Master-detail project showcase
        ├── VideosSection.jsx     # YouTube video demos
        └── ContactSection.jsx    # Contact links + terminal-style display
```

## Quick Start

```bash
npm install
npm start
```

Runs on `http://localhost:3000`.

To create a production build:

```bash
npm run build
```

## Activity Bar Icons

| Icon | Section | Description |
|------|---------|-------------|
| 📁 | Explorer | File tree navigation |
| 🔍 | Search | Filter and search files |
| 🔀 | Source Control | Git commit history (59 repos) |
| 💡 | Features | Interactive feature tips guide |
| ⚙️ | Settings | Cycle through 4 themes |

## Terminal Commands

| Command | Action |
|---------|--------|
| `help` | Show available commands |
| `open [section]` | Navigate to about / projects / videos / contact |
| `download cv` | Download resume PDF |
| `whoami` | Show profile info |
| `clear` | Clear terminal output |

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+P` / `⌘+P` | Open command palette |
| `Escape` | Close modals / palette / mobile nav |

## Sections

- **About** — Profile header, tech stack (6 categories), work experience (5 roles + master thesis), education
- **Projects** — 8 projects with master-detail view; 3 flagship projects (UniAdvisorAI, LinkAI, E-T-A Hybrid AI) with rich showcase layouts including architecture diagrams, feature breakdowns, tech stacks, roadmaps, and data visualizations
- **Videos** — 4 project demo videos (MarketMap, FaceSwitch, AI Web Builder, Talent Finder) with click-to-swap featured player
- **Contact** — Email, LinkedIn, GitHub, YouTube links with terminal-style JSON display

## License

MIT
