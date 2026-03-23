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
// Parallax + WebGL Black Hole Shader
// ========================================

const BLACKHOLE_VERT = `
attribute vec2 a_position;
void main() { gl_Position = vec4(a_position, 0.0, 1.0); }
`;

// Proper ray-marching black hole shader with gravitational lensing
// Based on Schwarzschild metric geodesic integration
const BLACKHOLE_FRAG = `
precision highp float;
uniform vec2 u_resolution;
uniform float u_time;
uniform float u_progress;

#define PI 3.14159265
#define STEPS 128
#define BH_MASS 1.0
#define DISK_INNER 2.6
#define DISK_OUTER 12.0

// Blackbody-inspired disk color: hot inner edge, cool outer
vec3 diskColor(float r, float phi) {
    float t = (r - DISK_INNER) / (DISK_OUTER - DISK_INNER);
    t = clamp(t, 0.0, 1.0);
    // Hot white/yellow inner -> orange middle -> deep red outer
    vec3 hot  = vec3(1.0, 0.98, 0.9) * 1.8;
    vec3 mid  = vec3(1.0, 0.6, 0.15) * 1.2;
    vec3 cool = vec3(0.7, 0.15, 0.03) * 0.6;
    vec3 col = mix(hot, mid, smoothstep(0.0, 0.4, t));
    col = mix(col, cool, smoothstep(0.3, 1.0, t));
    // Doppler-like brightness variation (approaching side brighter)
    float doppler = 0.75 + 0.25 * sin(phi + u_time * 0.4);
    // Brightness falls off with distance
    float brightness = 1.0 / (1.0 + t * 2.0);
    return col * brightness * doppler;
}

// Rotate 2D
mat2 rot(float a) { float c=cos(a), s=sin(a); return mat2(c,-s,s,c); }

void main() {
    vec2 uv = (gl_FragCoord.xy * 2.0 - u_resolution) / min(u_resolution.x, u_resolution.y);
    float progress = u_progress;
    float gravity = progress * BH_MASS;

    // Camera: slightly above the disk plane, looking at center
    float camDist = 22.0;
    float camHeight = 6.0 * progress + 0.01;
    vec3 ro = vec3(0.0, camHeight, -camDist);
    vec3 lookAt = vec3(0.0, 0.0, 0.0);
    // Camera matrix
    vec3 fwd = normalize(lookAt - ro);
    vec3 right = normalize(cross(fwd, vec3(0,1,0)));
    vec3 up = cross(right, fwd);
    vec3 rd = normalize(fwd * 2.0 + right * uv.x + up * uv.y);

    // Ray march through curved spacetime
    vec3 pos = ro;
    vec3 vel = rd * 0.5;
    vec3 color = vec3(0.0);
    float alpha = 0.0;
    float prevY = pos.y;
    bool captured = false;

    for (int i = 0; i < STEPS; i++) {
        float r = length(pos);

        // Event horizon: Schwarzschild radius = 2 * GM/c^2, normalized to 2.0
        float rs = 2.0 * gravity;
        if (r < rs) {
            captured = true;
            alpha = max(alpha, progress);
            break;
        }

        // Gravitational acceleration (Newtonian approx for visual)
        // F = -GM/r^2 in radial direction
        float accelMag = gravity * 1.5 / (r * r);
        vec3 accel = -normalize(pos) * accelMag;
        vel += accel * 0.5;
        vec3 newPos = pos + vel * 0.5;
        float newR = length(newPos);

        // Check disk intersection: ray crossed y=0 plane
        if (pos.y * newPos.y < 0.0 && newR > rs * 1.3 && newR < DISK_OUTER) {
            // Interpolate exact crossing point
            float t_cross = abs(pos.y) / max(abs(pos.y - newPos.y), 0.001);
            vec3 hitPos = mix(pos, newPos, t_cross);
            float hitR = length(hitPos.xz);
            float hitPhi = atan(hitPos.z, hitPos.x);

            if (hitR > DISK_INNER && hitR < DISK_OUTER) {
                vec3 dc = diskColor(hitR, hitPhi);
                // Accumulate (front and back crossings both contribute)
                float diskAlpha = 0.9 * progress;
                color += dc * diskAlpha * (1.0 - alpha);
                alpha = min(1.0, alpha + diskAlpha);
            }
        }

        prevY = pos.y;
        pos = newPos;

        // Escaped to infinity
        if (r > 50.0) break;
    }

    // Event horizon fill
    if (captured) {
        color = vec3(0.0);
    }

    // Subtle outer glow
    float dist2d = length(uv);
    float glow = smoothstep(1.2, 0.15, dist2d) * 0.08 * progress;
    color += vec3(0.3, 0.15, 0.5) * glow * (1.0 - alpha);
    alpha = max(alpha, glow);

    // Photon ring: a subtle bright ring at the shadow edge
    // The shadow radius for Schwarzschild is ~2.6 * M at our camera distance
    float shadowR = 2.6 * gravity / camDist * 2.0;
    float ring = smoothstep(0.02, 0.0, abs(dist2d - shadowR)) * progress * 0.6;
    color += vec3(0.9, 0.85, 0.7) * ring;
    alpha = max(alpha, ring);

    gl_FragColor = vec4(color, alpha);
}
`;

function initBlackHoleShader() {
    const canvas = document.getElementById('blackholeCanvas');
    if (!canvas) return null;

    const gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: false });
    if (!gl) return null;

    // Size
    const SIZE = window.innerWidth <= 768 ? 350 : 600;
    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = SIZE * DPR;
    canvas.height = SIZE * DPR;
    gl.viewport(0, 0, canvas.width, canvas.height);

    // Compile shaders
    function compileShader(src, type) {
        const s = gl.createShader(type);
        gl.shaderSource(s, src);
        gl.compileShader(s);
        return s;
    }

    const vs = compileShader(BLACKHOLE_VERT, gl.VERTEX_SHADER);
    const fs = compileShader(BLACKHOLE_FRAG, gl.FRAGMENT_SHADER);
    const program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    gl.useProgram(program);

    // Full-screen quad
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    // Uniforms
    const uRes = gl.getUniformLocation(program, 'u_resolution');
    const uTime = gl.getUniformLocation(program, 'u_time');
    const uProgress = gl.getUniformLocation(program, 'u_progress');

    gl.uniform2f(uRes, canvas.width, canvas.height);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    return { gl, uTime, uProgress };
}

function initParallax() {
    const sun = document.querySelector('.sun');
    const horizonGlow = document.querySelector('.horizon-glow');
    const starsSmall = document.querySelector('.stars-small');
    const starsMedium = document.querySelector('.stars-medium');
    const starsLarge = document.querySelector('.stars-large');
    const sunSlices = document.querySelectorAll('.sun-slice');
    const canvas = document.getElementById('blackholeCanvas');
    const isMobile = window.innerWidth <= 768;

    // Init WebGL shader
    const shader = initBlackHoleShader();
    let ticking = false;
    let animating = false;
    let currentProgress = 0;
    const heroHeight = window.innerHeight;

    // Render loop
    function renderLoop(time) {
        if (!animating || !shader) return;
        const { gl, uTime, uProgress } = shader;
        gl.uniform1f(uTime, time * 0.001);
        gl.uniform1f(uProgress, currentProgress);
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        requestAnimationFrame(renderLoop);
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const scrolled = window.scrollY;
                const bhProgress = Math.min(scrolled / (heroHeight * 0.65), 1);
                const eased = bhProgress * bhProgress * (3 - 2 * bhProgress);
                currentProgress = eased;

                // Sun fades out
                if (sun) {
                    sun.style.transform = `translate(-50%, -50%) translateY(${isMobile ? 0 : scrolled * 0.25}px)`;
                    sun.style.opacity = Math.max(0, 1 - eased * 2.5);
                }
                sunSlices.forEach(s => { s.style.opacity = Math.max(0, 1 - eased * 3); });

                // Canvas fades in
                if (canvas) {
                    canvas.style.opacity = Math.min(1, eased * 2);
                    if (!isMobile) {
                        canvas.style.transform = `translate(-50%, -50%) translateY(${scrolled * 0.25}px)`;
                    }
                    if (eased > 0.02 && !animating) {
                        animating = true;
                        requestAnimationFrame(renderLoop);
                    } else if (eased <= 0.02) {
                        animating = false;
                    }
                }

                // Other parallax
                if (horizonGlow && !isMobile) horizonGlow.style.transform = `translateX(-50%) translateY(${scrolled * 0.2}px)`;
                if (!isMobile) {
                    if (starsSmall) starsSmall.style.marginTop = `${scrolled * -0.05}px`;
                    if (starsMedium) starsMedium.style.marginTop = `${scrolled * -0.1}px`;
                    if (starsLarge) starsLarge.style.marginTop = `${scrolled * -0.15}px`;
                }
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
