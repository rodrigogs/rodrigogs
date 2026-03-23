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
    const starColors = [
        'rgba(255,255,255,',      // white
        'rgba(200,220,255,',      // cool blue-white
        'rgba(255,230,200,',      // warm white
        'rgba(180,200,255,',      // blue
        'rgba(255,200,200,',      // pinkish
    ];

    const layers = [
        { selector: '.stars-small', count: 700, spread: 2000 },
        { selector: '.stars-medium', count: 250, spread: 2000 },
        { selector: '.stars-large', count: 100, spread: 2000 },
    ];

    layers.forEach(({ selector, count, spread }) => {
        const el = document.querySelector(selector);
        if (!el) return;
        const shadows = [];
        for (let i = 0; i < count; i++) {
            const x = Math.floor(Math.random() * spread);
            const y = Math.floor(Math.random() * spread * 2);
            const opacity = (Math.random() * 0.5 + 0.5).toFixed(2);
            const color = starColors[Math.floor(Math.random() * starColors.length)];
            shadows.push(`${x}px ${y}px ${color}${opacity})`);
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
    const horizonGlow = document.querySelector('.horizon-glow');
    const starsSmall = document.querySelector('.stars-small');
    const starsMedium = document.querySelector('.stars-medium');
    const starsLarge = document.querySelector('.stars-large');
    const eventHorizon = document.querySelector('.event-horizon');
    const photonRing = document.querySelector('.photon-ring');
    const accretionDisk = document.querySelector('.accretion-disk');
    const lensingRing = document.querySelector('.lensing-ring');
    const sunSlices = document.querySelectorAll('.sun-slice');
    let ticking = false;

    // Pre-calculate hero height for black hole transition
    const heroHeight = window.innerHeight;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const scrolled = window.scrollY;
                // Black hole transition progress: 0 at top, 1 when scrolled past hero
                const bhProgress = Math.min(scrolled / (heroHeight * 0.7), 1);
                // Eased progress for smoother transition
                const eased = bhProgress * bhProgress * (3 - 2 * bhProgress); // smoothstep

                // Sun parallax + slight shrink as it becomes black hole
                const scale = 1 - eased * 0.15;
                if (sun) {
                    sun.style.transform = `translate(-50%, -50%) translateY(${scrolled * 0.25}px) scale(${scale})`;
                    // Transition sun gradient to dark with bright edge
                    const sunBg = eased < 0.5
                        ? `linear-gradient(to bottom, #ffea00 0%, #ffb800 20%, #ff6ec7 50%, #bd00ff 80%, #6b00b3 100%)`
                        : `radial-gradient(circle, #000 ${30 + eased * 30}%, #0a0020 ${50 + eased * 15}%, #ff6ec7 ${70 + eased * 10}%, #00d9ff ${85 + eased * 5}%, transparent 100%)`;
                    sun.style.background = sunBg;

                    // Shift box-shadow from warm glow to photon ring glow
                    const warmGlow = 1 - eased;
                    const coldGlow = eased;
                    sun.style.boxShadow = `
                        0 0 ${80 + coldGlow * 40}px rgba(${Math.round(255 * warmGlow + 0 * coldGlow)}, ${Math.round(110 * warmGlow + 180 * coldGlow)}, ${Math.round(199 * warmGlow + 255 * coldGlow)}, ${0.6 + coldGlow * 0.2}),
                        0 0 ${160 + coldGlow * 60}px rgba(${Math.round(189 * warmGlow + 0 * coldGlow)}, ${Math.round(0 * warmGlow + 150 * coldGlow)}, ${Math.round(255 * warmGlow + 255 * coldGlow)}, ${0.4 + coldGlow * 0.1}),
                        0 0 ${300 + coldGlow * 100}px rgba(${Math.round(255 * warmGlow + 0 * coldGlow)}, ${Math.round(110 * warmGlow + 100 * coldGlow)}, ${Math.round(199 * warmGlow + 255 * coldGlow)}, ${0.2}),
                        0 0 ${500 + coldGlow * 200}px rgba(${Math.round(189 * warmGlow)}, ${Math.round(0 + 50 * coldGlow)}, ${Math.round(255 * warmGlow + 200 * coldGlow)}, 0.1)
                    `;
                }

                // Fade sun slices out
                sunSlices.forEach(slice => {
                    slice.style.opacity = Math.max(0, 1 - eased * 2.5);
                });

                // Event horizon: dark center grows
                if (eventHorizon) {
                    const ehSize = eased * 75;
                    eventHorizon.style.width = `${ehSize}%`;
                    eventHorizon.style.height = `${ehSize}%`;
                    eventHorizon.style.opacity = eased;
                }

                // Photon ring: bright thin ring appears
                if (photonRing) {
                    const prSize = eased * 82;
                    photonRing.style.width = `${prSize}%`;
                    photonRing.style.height = `${prSize}%`;
                    photonRing.style.border = `${1 + eased * 2}px solid rgba(200, 230, 255, ${eased * 0.9})`;
                    photonRing.style.boxShadow = eased > 0.1
                        ? `0 0 ${eased * 15}px rgba(200, 230, 255, ${eased * 0.8}), 0 0 ${eased * 30}px rgba(0, 217, 255, ${eased * 0.4}), inset 0 0 ${eased * 10}px rgba(200, 230, 255, ${eased * 0.3})`
                        : 'none';
                }

                // Accretion disk: tilted glowing ring that spins
                if (accretionDisk) {
                    const diskSize = 300 + eased * 300;
                    const diskOpacity = Math.max(0, (eased - 0.15) * 1.2);
                    accretionDisk.style.width = `${diskSize}px`;
                    accretionDisk.style.height = `${diskSize}px`;
                    accretionDisk.style.opacity = diskOpacity;
                    accretionDisk.style.top = `calc(30% + ${scrolled * 0.25}px)`;
                    // Start spinning when visible
                    accretionDisk.style.animationPlayState = diskOpacity > 0 ? 'running' : 'paused';
                    if (diskOpacity > 0) {
                        accretionDisk.style.background = `
                            radial-gradient(ellipse, transparent 40%, rgba(0,0,0,0.5) 50%, transparent 55%),
                            conic-gradient(from 0deg,
                                rgba(255,110,199,0.9),
                                rgba(0,217,255,0.7),
                                rgba(255,234,0,0.8),
                                rgba(189,0,255,0.7),
                                rgba(255,110,199,0.9),
                                rgba(0,217,255,0.6),
                                rgba(255,234,0,0.7),
                                rgba(189,0,255,0.8),
                                rgba(255,110,199,0.9)
                            )
                        `;
                        accretionDisk.style.boxShadow = `
                            0 0 ${40 * diskOpacity}px rgba(255, 110, 199, ${0.5 * diskOpacity}),
                            0 0 ${80 * diskOpacity}px rgba(0, 217, 255, ${0.3 * diskOpacity}),
                            0 0 ${120 * diskOpacity}px rgba(189, 0, 255, ${0.2 * diskOpacity}),
                            inset 0 0 ${50 * diskOpacity}px rgba(0, 0, 0, ${0.6 * diskOpacity})
                        `;
                    }
                }

                // Gravitational lensing ring: vertical ring (Interstellar effect)
                if (lensingRing) {
                    const lrSize = 280 + eased * 200;
                    const lrOpacity = Math.max(0, (eased - 0.3) * 1.4);
                    lensingRing.style.width = `${lrSize}px`;
                    lensingRing.style.height = `${lrSize}px`;
                    lensingRing.style.opacity = lrOpacity;
                    lensingRing.style.top = `calc(30% + ${scrolled * 0.25}px)`;
                    if (lrOpacity > 0) {
                        const ringWidth = 2 + eased * 3;
                        lensingRing.style.borderWidth = `${ringWidth}px`;
                        lensingRing.style.borderStyle = 'solid';
                        lensingRing.style.borderImage = `conic-gradient(from 90deg,
                            rgba(255,200,100,0.9),
                            rgba(255,110,199,0.6),
                            rgba(200,230,255,0.8),
                            rgba(255,110,199,0.6),
                            rgba(255,200,100,0.9)
                        ) 1`;
                        lensingRing.style.borderRadius = '50%';
                        lensingRing.style.borderImage = 'none';
                        lensingRing.style.borderColor = `rgba(255, 200, 150, ${0.6 * lrOpacity})`;
                        lensingRing.style.boxShadow = `
                            0 0 ${15 * lrOpacity}px rgba(255, 200, 150, ${0.5 * lrOpacity}),
                            0 0 ${30 * lrOpacity}px rgba(255, 110, 199, ${0.3 * lrOpacity}),
                            inset 0 0 ${15 * lrOpacity}px rgba(255, 200, 150, ${0.2 * lrOpacity})
                        `;
                    }
                }

                // Glow follows sun
                if (horizonGlow) horizonGlow.style.transform = `translateX(-50%) translateY(${scrolled * 0.2}px)`;
                // Stars parallax depth
                if (starsSmall) starsSmall.style.marginTop = `${scrolled * -0.05}px`;
                if (starsMedium) starsMedium.style.marginTop = `${scrolled * -0.1}px`;
                if (starsLarge) starsLarge.style.marginTop = `${scrolled * -0.15}px`;
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
    // Full-screen overlay
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed; inset: 0; z-index: 9998;
        background: radial-gradient(circle at 50% 50%, transparent 0%, rgba(0,0,0,0.7) 100%);
        pointer-events: none; opacity: 0;
        transition: opacity 0.3s ease;
    `;
    document.body.appendChild(overlay);
    requestAnimationFrame(() => { overlay.style.opacity = '1'; });

    // Scanline overlay
    const scanlines = document.createElement('div');
    scanlines.style.cssText = `
        position: fixed; inset: 0; z-index: 9999;
        background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,217,255,0.03) 2px, rgba(0,217,255,0.03) 4px);
        pointer-events: none; animation: konamiScanlines 0.1s steps(2) infinite;
    `;
    document.body.appendChild(scanlines);

    // Neon glitch lines shooting across screen
    const colors = ['#ff6ec7', '#00d9ff', '#bd00ff', '#ffea00'];
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const line = document.createElement('div');
            const isHorizontal = Math.random() > 0.3;
            const color = colors[Math.floor(Math.random() * colors.length)];
            const size = Math.random() * 60 + 20;
            if (isHorizontal) {
                line.style.cssText = `
                    position: fixed; z-index: 10000; pointer-events: none;
                    top: ${Math.random() * 100}vh; left: -10%;
                    width: ${size}vw; height: 2px;
                    background: linear-gradient(90deg, transparent, ${color}, transparent);
                    box-shadow: 0 0 8px ${color}, 0 0 20px ${color};
                    animation: konamiLineH 0.4s ease-out forwards;
                `;
            } else {
                line.style.cssText = `
                    position: fixed; z-index: 10000; pointer-events: none;
                    left: ${Math.random() * 100}vw; top: -10%;
                    height: ${size}vh; width: 2px;
                    background: linear-gradient(180deg, transparent, ${color}, transparent);
                    box-shadow: 0 0 8px ${color}, 0 0 20px ${color};
                    animation: konamiLineV 0.4s ease-out forwards;
                `;
            }
            document.body.appendChild(line);
            setTimeout(() => line.remove(), 500);
        }, i * 80);
    }

    // Main message with glitch effect
    const msg = document.createElement('div');
    msg.style.cssText = `
        position: fixed; top: 50%; left: 50%; z-index: 10001;
        transform: translate(-50%, -50%) scale(0);
        background: linear-gradient(135deg, rgba(255,110,199,0.95), rgba(189,0,255,0.95));
        color: #010409; padding: 2rem 4rem; font-size: 2.5rem; font-weight: 900;
        border-radius: 12px; font-family: 'Orbitron', sans-serif;
        letter-spacing: 0.3rem; text-transform: uppercase;
        box-shadow: 0 0 60px #ff6ec7, 0 0 120px #bd00ff, inset 0 0 30px rgba(255,255,255,0.2);
        border: 3px solid #00d9ff;
        animation: konamiMsgIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s forwards;
        text-shadow: 0 0 10px rgba(0,0,0,0.3);
    `;
    msg.textContent = 'KONAMI CODE ACTIVATED!';
    document.body.appendChild(msg);

    // Rainbow hue-rotate on body
    document.body.style.animation = 'none';
    requestAnimationFrame(() => {
        document.body.style.animation = 'konamiFlash 3s ease-out';
    });

    // Spawn neon particles from center
    setTimeout(() => {
        for (let i = 0; i < 40; i++) {
            const particle = document.createElement('div');
            const angle = (i / 40) * Math.PI * 2;
            const dist = Math.random() * 300 + 100;
            const color = colors[Math.floor(Math.random() * colors.length)];
            const size = Math.random() * 6 + 2;
            particle.style.cssText = `
                position: fixed; z-index: 10001; pointer-events: none;
                top: 50%; left: 50%; width: ${size}px; height: ${size}px;
                background: ${color}; border-radius: 50%;
                box-shadow: 0 0 6px ${color}, 0 0 12px ${color};
                transform: translate(-50%, -50%);
                animation: konamiParticle 1s cubic-bezier(0, 0.5, 0.5, 1) forwards;
                --px: ${Math.cos(angle) * dist}px;
                --py: ${Math.sin(angle) * dist}px;
            `;
            document.body.appendChild(particle);
            setTimeout(() => particle.remove(), 1200);
        }
    }, 600);

    // Cleanup
    setTimeout(() => {
        msg.style.transition = 'all 0.8s ease';
        msg.style.transform = 'translate(-50%, -50%) scale(0) rotate(10deg)';
        msg.style.opacity = '0';
        overlay.style.opacity = '0';
        scanlines.style.opacity = '0';
        scanlines.style.transition = 'opacity 0.5s';
        setTimeout(() => {
            msg.remove();
            overlay.remove();
            scanlines.remove();
        }, 1000);
    }, 3500);
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
