'use strict';

// ========================================
// Static Data
// ========================================

const FEATURED_PROJECTS = [
    { name: 'easyvpn', stars: 516, description: 'Easily connect to a VPN in a country of your choice. Command-line tool for OpenVPN.', tags: ['JavaScript', 'Node.js', 'VPN', 'OpenVPN'], repo: 'https://github.com/rodrigogs/easyvpn', demo: null },
    { name: 'xvideos', stars: 243, description: 'xvideos API library for Node.js. Scraper and crawler implementation.', tags: ['JavaScript', 'Node.js', 'API', 'Scraper'], repo: 'https://github.com/rodrigogs/xvideos', demo: null },
    { name: 'nodejs-web-jade-scaffold', stars: 167, description: 'Complete web application scaffold featuring Node.js, Express, Jade, Passport, MongoDB and Bootstrap.', tags: ['JavaScript', 'Node.js', 'Express', 'MongoDB'], repo: 'https://github.com/rodrigogs/nodejs-web-jade-scaffold', demo: null },
    { name: 'kairos', stars: 98, description: 'A non date-based time calculator. Mathematical time expressions parser and calculator.', tags: ['JavaScript', 'Time', 'Calculator', 'Math'], repo: 'https://github.com/rodrigogs/kairos', demo: 'https://rodrigogs.github.io/kairos/' },
    { name: 'whats-reader', stars: 22, description: 'WhatsApp Backup Reader - Desktop/web app to visualize WhatsApp chat exports with AI features.', tags: ['Svelte', 'TypeScript', 'WhatsApp', 'AI'], repo: 'https://github.com/rodrigogs/whats-reader', demo: 'https://rodrigogs.github.io/whats-reader/' },
    { name: 'payowl', stars: 17, description: 'Detect websites protected by paywall applications. Identifies various paywall services.', tags: ['JavaScript', 'Node.js', 'Paywall', 'Detection'], repo: 'https://github.com/rodrigogs/payowl', demo: null },
    { name: 'fastify-scaffold', stars: 17, description: 'A structured fastify app example with best practices and organized architecture.', tags: ['JavaScript', 'Fastify', 'Node.js', 'API'], repo: 'https://github.com/rodrigogs/fastify-scaffold', demo: null },
    { name: 'mongoose-timezone', stars: 16, description: 'Mongoose plugin to normalize stored dates timezone. Handles UTC conversion automatically.', tags: ['JavaScript', 'MongoDB', 'Mongoose', 'Timezone'], repo: 'https://github.com/rodrigogs/mongoose-timezone', demo: null },
    { name: 'promise-pool', stars: 15, description: 'Promise pool that loops Promise.all until the last generator item is submitted.', tags: ['JavaScript', 'Promises', 'Async', 'Pool'], repo: 'https://github.com/rodrigogs/promise-pool', demo: null },
    { name: 'barracao-digital', stars: 10, description: 'Virtual queue management system for COVID-19 screening centers in Brazil.', tags: ['Vue.js', 'Node.js', 'Healthcare', 'Serverless'], repo: 'https://github.com/rodrigogs/barracao-digital', demo: null },
    { name: 'occupy-sarahah', stars: 11, description: 'Flood sarahah with random messages. CLI tool for automated messaging.', tags: ['JavaScript', 'Node.js', 'CLI', 'Automation'], repo: 'https://github.com/rodrigogs/occupy-sarahah', demo: null },
    { name: 'debuggler', stars: 9, description: 'Resolves debug namespace like magic. Wrapper for the debug module with automatic namespacing.', tags: ['JavaScript', 'Node.js', 'Debug', 'Logging'], repo: 'https://github.com/rodrigogs/debuggler', demo: null },
];

const SKILLS = [
    { title: 'LANGUAGES', items: ['JavaScript', 'TypeScript', 'Python', 'Java', 'Kotlin', 'Rust', 'C#', 'Bash'] },
    { title: 'FRONTEND', items: ['React', 'Next.js', 'Vue.js', 'Svelte', 'Angular', 'Nuxt.js', 'Vuetify', 'Bootstrap', 'Ionic', 'Electron'] },
    { title: 'BACKEND', items: ['Node.js', 'Express', 'Fastify', 'Spring', '.NET', 'Struts', 'Grails', 'Koin', 'Ktor'] },
    { title: 'DATABASES', items: ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Elasticsearch', 'SQLite', 'Oracle', 'MS SQL Server', 'DynamoDB'] },
    { title: 'DEVOPS & CLOUD', items: ['Docker', 'Kubernetes', 'AWS', 'GCP', 'Firebase', 'Heroku', 'Linux', 'Git'] },
    { title: 'TESTING & CI/CD', items: ['Jest', 'Vitest', 'Cypress', 'Playwright', 'Mocha', 'Jasmine', 'Jenkins', 'CircleCI', 'Travis CI'] },
    { title: 'AI & MACHINE LEARNING', items: ['LangChain', 'LangGraph', 'OpenAI', 'Anthropic', 'TensorFlow', 'OpenWebUI', 'n8n', 'MCP'] },
    { title: 'OTHER TOOLS', items: ['Kafka', 'Hadoop', 'Puppeteer', 'Pug', 'Unity', 'Android', 'Arduino', 'Baileys'] },
];

const STATIC_STATS = { repos: 85, stars: 1200, followers: 100, years: 15 };

const TERMINAL_LINES = [
    { type: 'command', text: '$ whoami' },
    { type: 'output', text: 'rodrigogs - Full-Stack Architect & Open Source Pioneer' },
    { type: 'command', text: '$ cat experience.json' },
    { type: 'output', text: '{' },
    { type: 'output', text: '  "years": "15+",' },
    { type: 'output', text: '  "role": "Full-Stack Developer",' },
    { type: 'output', text: '  "specialty": "Scalable Web Apps & API Design",' },
    { type: 'output', text: '  "passion": "Building tools that matter"' },
    { type: 'output', text: '}' },
    { type: 'command', text: '$ cat passions.txt' },
    { type: 'output', text: 'Open Source Contributor | Innovation Seeker' },
    { type: 'output', text: 'AI/ML Enthusiast | Cloud Architecture' },
    { type: 'output', text: 'Cat Lover | Coffee Connoisseur' },
];

// ========================================
// Rendering
// ========================================

function renderProjects() {
    const grid = document.getElementById('projectsGrid');
    if (!grid) return;
    grid.innerHTML = FEATURED_PROJECTS.map(p => `
        <div class="project-card" onclick="window.open('${p.repo}', '_blank')">
            <h3>${p.name}</h3>
            <div class="stars" data-repo="${p.name}">&#11088; ${p.stars} stars</div>
            <p>${p.description}</p>
            <div class="tags">${p.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
            <div class="project-links">
                <a href="${p.repo}" target="_blank" rel="noopener" class="project-link" onclick="event.stopPropagation()">VIEW REPO</a>
                ${p.demo ? `<a href="${p.demo}" target="_blank" rel="noopener" class="project-link" onclick="event.stopPropagation()">LIVE DEMO</a>` : ''}
            </div>
        </div>
    `).join('');
}

function renderSkills() {
    const cloud = document.getElementById('skillsCloud');
    if (!cloud) return;
    cloud.innerHTML = SKILLS.map(cat => `
        <div class="skill-category">
            <div class="skill-category-title">${cat.title}</div>
            <div class="skill-tags">
                ${cat.items.map(s => `<span class="skill-tag">${s}</span>`).join('')}
            </div>
        </div>
    `).join('');
}

// ========================================
// GitHub API (Static-First + Live Refresh)
// ========================================

const CACHE_TTL = 60 * 60 * 1000; // 1 hour

function getCached(key) {
    try {
        const raw = localStorage.getItem(key);
        if (!raw) return null;
        const { data, ts } = JSON.parse(raw);
        if (Date.now() - ts > CACHE_TTL) {
            localStorage.removeItem(key);
            return null;
        }
        return data;
    } catch {
        return null;
    }
}

function setCache(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify({ data, ts: Date.now() }));
    } catch { /* quota exceeded, ignore */ }
}

async function fetchGitHubData() {
    const cachedUser = getCached('gh_user');
    const cachedRepos = getCached('gh_repos');

    const user = cachedUser || await fetchJSON('https://api.github.com/users/rodrigogs', 'gh_user');
    const repos = cachedRepos || await fetchJSON('https://api.github.com/users/rodrigogs/repos?per_page=100&sort=pushed', 'gh_repos');

    if (user && repos) applyLiveData(user, repos);
    else if (user) applyLiveData(user, []);
}

async function fetchJSON(url, cacheKey) {
    try {
        const res = await fetch(url);
        if (!res.ok) return null;
        const data = await res.json();
        setCache(cacheKey, data);
        return data;
    } catch { return null; }
}

function applyLiveData(user, repos) {
    const repoMap = new Map(repos.map(r => [r.name, r.stargazers_count]));
    document.querySelectorAll('.stars[data-repo]').forEach(el => {
        const liveStars = repoMap.get(el.dataset.repo);
        if (liveStars !== undefined) {
            el.textContent = `\u2B50 ${liveStars} stars`;
        }
    });

    const totalStars = repos.reduce((sum, r) => sum + r.stargazers_count, 0);
    const statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers[0]) statNumbers[0].dataset.target = user.public_repos || STATIC_STATS.repos;
    if (statNumbers[1]) statNumbers[1].dataset.target = totalStars || STATIC_STATS.stars;
    if (statNumbers[2]) statNumbers[2].dataset.target = user.followers || STATIC_STATS.followers;
}

// ========================================
// Scroll Reveal
// ========================================

function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ========================================
// Sticky Nav Active Section
// ========================================

function initNavHighlight() {
    const sections = document.querySelectorAll('.section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
                });
            }
        });
    }, { rootMargin: '-50% 0px -50% 0px' });

    sections.forEach(section => observer.observe(section));

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
}

// ========================================
// Starfield Generator
// ========================================

function initStarfield() {
    const layers = [
        { selector: '.stars-small', count: 600, spread: 2000 },
        { selector: '.stars-medium', count: 200, spread: 2000 },
        { selector: '.stars-large', count: 80, spread: 2000 },
    ];

    layers.forEach(({ selector, count, spread }) => {
        const el = document.querySelector(selector);
        if (!el) return;
        const shadows = [];
        for (let i = 0; i < count; i++) {
            const x = Math.floor(Math.random() * spread);
            const y = Math.floor(Math.random() * spread * 2);
            const opacity = (Math.random() * 0.5 + 0.5).toFixed(2);
            shadows.push(`${x}px ${y}px rgba(255,255,255,${opacity})`);
        }
        el.style.boxShadow = shadows.join(',');
    });
}

// ========================================
// Parallax Background
// ========================================

function initParallax() {
    if (window.innerWidth <= 768) return;

    const sun = document.querySelector('.sun');
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const scrolled = window.scrollY;
                if (sun) sun.style.transform = `translateX(-50%) translateY(${scrolled * 0.2}px)`;
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}

// ========================================
// Animated Stat Counters
// ========================================

function initStatCounters() {
    const statsSection = document.getElementById('stats');
    if (!statsSection) return;

    let fired = false;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !fired) {
                fired = true;
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    observer.observe(statsSection);
}

function animateCounters() {
    document.querySelectorAll('.stat-number').forEach(el => {
        const target = parseInt(el.dataset.target, 10);
        const suffix = el.dataset.suffix || '';
        const duration = 2000;
        const start = performance.now();

        function update(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(eased * target);
            el.textContent = current.toLocaleString() + suffix;

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }

        requestAnimationFrame(update);
    });
}

// ========================================
// Terminal Typing Effect
// ========================================

function initTerminalTyping() {
    const aboutSection = document.getElementById('about');
    const terminalBody = document.getElementById('terminalBody');
    if (!aboutSection || !terminalBody) return;

    let fired = false;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !fired) {
                fired = true;
                typeTerminalLines(terminalBody);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    observer.observe(aboutSection);
}

function typeTerminalLines(container) {
    let lineIndex = 0;

    function typeLine() {
        if (lineIndex >= TERMINAL_LINES.length) {
            const cursorLine = document.createElement('div');
            cursorLine.className = 'terminal-line';
            cursorLine.innerHTML = '<span class="prompt">$ </span><span class="cursor">&#9608;</span>';
            container.appendChild(cursorLine);
            return;
        }

        const line = TERMINAL_LINES[lineIndex];
        const div = document.createElement('div');
        div.className = 'terminal-line';

        if (line.type === 'command') {
            div.innerHTML = `<span class="prompt">${line.text.substring(0, 2)}</span>`;
            container.appendChild(div);
            typeText(div, line.text.substring(2), () => {
                lineIndex++;
                setTimeout(typeLine, 100);
            });
        } else {
            div.innerHTML = `<span class="output">${line.text}</span>`;
            div.style.opacity = '0';
            container.appendChild(div);
            requestAnimationFrame(() => {
                div.style.transition = 'opacity 0.2s';
                div.style.opacity = '1';
                lineIndex++;
                setTimeout(typeLine, 50);
            });
        }
    }

    function typeText(el, text, callback) {
        let i = 0;
        const span = document.createElement('span');
        el.appendChild(span);

        function type() {
            if (i < text.length) {
                span.textContent += text[i];
                i++;
                requestAnimationFrame(() => setTimeout(type, 30));
            } else if (callback) {
                callback();
            }
        }

        type();
    }

    typeLine();
}

// ========================================
// Fluid Sticky Nav
// ========================================

function initFluidNav() {
    const nav = document.getElementById('stickyNav');
    const hero = document.querySelector('.hero');
    if (!nav || !hero) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            nav.classList.toggle('scrolled', !entry.isIntersecting);
        });
    }, { threshold: 0, rootMargin: '-60px 0px 0px 0px' });

    observer.observe(hero);
}

// ========================================
// Konami Code Easter Egg
// ========================================

function initKonamiCode() {
    const sequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    const validKeys = new Set(sequence);
    let buffer = [];
    let lastKeyTime = 0;

    document.addEventListener('keydown', (e) => {
        if (!validKeys.has(e.key)) return;

        const now = Date.now();
        if (now - lastKeyTime > 1000) buffer = [];
        lastKeyTime = now;

        buffer.push(e.key);
        if (buffer.length > sequence.length) buffer.shift();

        if (buffer.length === sequence.length && buffer.every((k, i) => k === sequence[i])) {
            activateEasterEgg();
            buffer = [];
        }
    });
}

function activateEasterEgg() {
    const msg = document.createElement('div');
    msg.style.cssText = `
        position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
        background: linear-gradient(135deg, rgba(255,110,199,0.95), rgba(189,0,255,0.95));
        color: #010409; padding: 2rem 4rem; font-size: 2rem; font-weight: 900;
        border-radius: 8px; z-index: 9999; font-family: 'Orbitron', sans-serif;
        letter-spacing: 0.3rem; text-transform: uppercase;
        box-shadow: 0 0 40px #ff6ec7, 0 0 80px #bd00ff;
        border: 3px solid #00d9ff;
    `;
    msg.textContent = 'KONAMI CODE ACTIVATED!';
    document.body.appendChild(msg);

    document.body.style.animation = 'none';
    requestAnimationFrame(() => {
        document.body.style.animation = 'konamiFlash 2s ease-out';
    });

    setTimeout(() => {
        msg.style.transition = 'opacity 1s';
        msg.style.opacity = '0';
        setTimeout(() => msg.remove(), 1000);
    }, 3000);
}

// ========================================
// Init
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    initStarfield();
    renderProjects();
    renderSkills();
    initScrollReveal();
    initNavHighlight();
    initParallax();
    initStatCounters();
    initTerminalTyping();
    initKonamiCode();
    initFluidNav();
    fetchGitHubData();
});
