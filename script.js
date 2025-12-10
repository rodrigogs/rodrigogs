// Tab switching functionality
document.addEventListener('DOMContentLoaded', () => {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');

            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
            
            // Animate skill bars when skills tab is activated
            if (targetTab === 'skills') {
                animateSkillBars();
            }
        });
    });

    // Load projects data
    loadProjects();
});

// Animate skill progress bars
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach((bar, index) => {
        // Reset animation
        bar.style.width = '0%';
        
        // Trigger reflow to restart animation
        setTimeout(() => {
            const targetWidth = bar.style.width || bar.getAttribute('style').match(/width:\s*(\d+)%/)[1] + '%';
            bar.style.width = targetWidth;
        }, index * 30); // Stagger the animations
    });
}

// Projects data
const featuredProjects = [
    {
        name: 'easyvpn',
        stars: 516,
        description: 'Easily connect to a VPN in a country of your choice. Command-line tool for OpenVPN.',
        tags: ['JavaScript', 'Node.js', 'VPN', 'OpenVPN'],
        repo: 'https://github.com/rodrigogs/easyvpn',
        demo: null
    },
    {
        name: 'xvideos',
        stars: 243,
        description: 'xvideos API library for Node.js. Scraper and crawler implementation.',
        tags: ['JavaScript', 'Node.js', 'API', 'Scraper'],
        repo: 'https://github.com/rodrigogs/xvideos',
        demo: null
    },
    {
        name: 'nodejs-web-jade-scaffold',
        stars: 167,
        description: 'Complete web application scaffold featuring Node.js, Express, Jade, Passport, MongoDB and Bootstrap.',
        tags: ['JavaScript', 'Node.js', 'Express', 'MongoDB'],
        repo: 'https://github.com/rodrigogs/nodejs-web-jade-scaffold',
        demo: 'http://nodejs-web-jade-scaffold.herokuapp.com/'
    },
    {
        name: 'kairos',
        stars: 98,
        description: 'A non date-based time calculator. Mathematical time expressions parser and calculator.',
        tags: ['JavaScript', 'Time', 'Calculator', 'Math'],
        repo: 'https://github.com/rodrigogs/kairos',
        demo: 'http://rodrigogs.github.io/kairos/'
    },
    {
        name: 'whats-reader',
        stars: 22,
        description: 'WhatsApp Backup Reader - Desktop/web app to visualize WhatsApp chat exports with AI features.',
        tags: ['Svelte', 'TypeScript', 'WhatsApp', 'AI'],
        repo: 'https://github.com/rodrigogs/whats-reader',
        demo: 'https://rodrigogs.github.io/whats-reader/'
    },
    {
        name: 'payowl',
        stars: 17,
        description: 'Detect websites protected by paywall applications. Identifies various paywall services.',
        tags: ['JavaScript', 'Node.js', 'Paywall', 'Detection'],
        repo: 'https://github.com/rodrigogs/payowl',
        demo: null
    },
    {
        name: 'fastify-scaffold',
        stars: 17,
        description: 'A structured fastify app example with best practices and organized architecture.',
        tags: ['JavaScript', 'Fastify', 'Node.js', 'API'],
        repo: 'https://github.com/rodrigogs/fastify-scaffold',
        demo: null
    },
    {
        name: 'mongoose-timezone',
        stars: 16,
        description: 'Mongoose plugin to normalize stored dates timezone. Handles UTC conversion automatically.',
        tags: ['JavaScript', 'MongoDB', 'Mongoose', 'Timezone'],
        repo: 'https://github.com/rodrigogs/mongoose-timezone',
        demo: null
    },
    {
        name: 'promise-pool',
        stars: 15,
        description: 'Promise pool that loops Promise.all until the last generator item is submitted.',
        tags: ['JavaScript', 'Promises', 'Async', 'Pool'],
        repo: 'https://github.com/rodrigogs/promise-pool',
        demo: null
    },
    {
        name: 'barracao-digital',
        stars: 10,
        description: 'Virtual queue management system for COVID-19 screening centers in Brazil.',
        tags: ['Vue.js', 'Node.js', 'Healthcare', 'Serverless'],
        repo: 'https://github.com/rodrigogs/barracao-digital',
        demo: 'https://barracaodigital.com'
    },
    {
        name: 'occupy-sarahah',
        stars: 11,
        description: 'Flood sarahah with random messages. CLI tool for automated messaging.',
        tags: ['JavaScript', 'Node.js', 'CLI', 'Automation'],
        repo: 'https://github.com/rodrigogs/occupy-sarahah',
        demo: null
    },
    {
        name: 'debuggler',
        stars: 9,
        description: 'Resolves debug namespace like magic. Wrapper for the debug module with automatic namespacing.',
        tags: ['JavaScript', 'Node.js', 'Debug', 'Logging'],
        repo: 'https://github.com/rodrigogs/debuggler',
        demo: null
    }
];

function loadProjects() {
    const projectsGrid = document.getElementById('projectsGrid');
    
    // Simulate loading delay for effect
    setTimeout(() => {
        projectsGrid.innerHTML = '';
        
        featuredProjects.forEach(project => {
            const projectCard = createProjectCard(project);
            projectsGrid.appendChild(projectCard);
        });
    }, 500);
}

function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    
    const tagsHTML = project.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
    
    const linksHTML = `
        <div class="project-links">
            <a href="${project.repo}" target="_blank" class="project-link">VIEW REPO</a>
            ${project.demo ? `<a href="${project.demo}" target="_blank" class="project-link">LIVE DEMO</a>` : ''}
        </div>
    `;
    
    card.innerHTML = `
        <h3>${project.name}</h3>
        <div class="stars">⭐ ${project.stars} stars</div>
        <p>${project.description}</p>
        <div class="tags">${tagsHTML}</div>
        ${linksHTML}
    `;
    
    // Add click animation
    card.addEventListener('click', (e) => {
        if (!e.target.classList.contains('project-link')) {
            window.open(project.repo, '_blank');
        }
    });
    
    return card;
}

// Add smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add easter egg - Konami code
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
const validKeys = new Set(konamiSequence);
let lastKeyTime = 0;
const keyTimeout = 1000; // Reset if more than 1 second between keys

document.addEventListener('keydown', (e) => {
    // Only process keys that could be part of the sequence
    if (!validKeys.has(e.key)) {
        return;
    }
    
    const currentTime = Date.now();
    
    // Reset if too much time has passed
    if (currentTime - lastKeyTime > keyTimeout) {
        konamiCode = [];
    }
    
    lastKeyTime = currentTime;
    konamiCode.push(e.key);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.length === konamiSequence.length && 
        konamiCode.every((key, index) => key === konamiSequence[index])) {
        activateEasterEgg();
        konamiCode = [];
    }
});

function activateEasterEgg() {
    const body = document.body;
    
    // Check if style already exists
    if (!document.getElementById('konami-animations')) {
        const style = document.createElement('style');
        style.id = 'konami-animations';
        style.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
            @keyframes glitchMessage {
                0%, 100% { 
                    transform: translate(-50%, -50%) skew(0deg);
                    text-shadow: 0 0 10px #ff6ec7;
                }
                10% { 
                    transform: translate(-52%, -48%) skew(2deg);
                    text-shadow: -3px 0 #00d9ff, 3px 0 #ff6ec7;
                }
                20% { 
                    transform: translate(-48%, -52%) skew(-2deg);
                    text-shadow: 3px 0 #00d9ff, -3px 0 #bd00ff;
                }
                30% { 
                    transform: translate(-50%, -50%) skew(0deg);
                    text-shadow: 0 0 20px #ff6ec7;
                }
                40% { 
                    transform: translate(-51%, -49%) skew(1deg);
                    text-shadow: -2px 0 #bd00ff, 2px 0 #00d9ff;
                }
                50% { 
                    transform: translate(-49%, -51%) skew(-1deg);
                    text-shadow: 2px 0 #ff6ec7, -2px 0 #00d9ff;
                }
                60% { 
                    transform: translate(-50%, -50%) skew(3deg);
                    clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%);
                }
                65% { 
                    transform: translate(-50%, -50%) skew(-3deg);
                    clip-path: polygon(0 55%, 100% 55%, 100% 100%, 0 100%);
                }
                70% { 
                    transform: translate(-50%, -50%) skew(0deg);
                    clip-path: none;
                }
            }
            @keyframes scanlineGlitch {
                0%, 100% { background-position: 0 0; opacity: 0.3; }
                25% { background-position: 0 5px; opacity: 0.5; }
                50% { background-position: 0 -5px; opacity: 0.7; }
                75% { background-position: 0 2px; opacity: 0.4; }
            }
            @keyframes chromaticShift {
                0%, 100% { text-shadow: 0 0 10px #ff6ec7, 0 0 20px #ff6ec7; }
                25% { text-shadow: -5px 0 #00d9ff, 5px 0 #ff6ec7, 0 0 30px #bd00ff; }
                50% { text-shadow: 5px 0 #00d9ff, -5px 0 #ff6ec7, 0 0 40px #ffea00; }
                75% { text-shadow: -3px 0 #bd00ff, 3px 0 #00d9ff, 0 0 35px #ff6ec7; }
            }
            @keyframes flickerIntense {
                0%, 100% { opacity: 1; }
                5% { opacity: 0.3; }
                10% { opacity: 1; }
                15% { opacity: 0.5; }
                20% { opacity: 1; }
                50% { opacity: 0.8; }
                55% { opacity: 0.2; }
                60% { opacity: 1; }
                80% { opacity: 0.6; }
                85% { opacity: 1; }
            }
            @keyframes distortionWave {
                0%, 100% { transform: translate(-50%, -50%) scaleX(1) scaleY(1); }
                10% { transform: translate(-50%, -50%) scaleX(1.02) scaleY(0.98); }
                20% { transform: translate(-50%, -50%) scaleX(0.98) scaleY(1.02); }
                30% { transform: translate(-50%, -50%) scaleX(1.01) scaleY(0.99); }
                40% { transform: translate(-50%, -50%) scaleX(0.99) scaleY(1.01); }
            }
            .konami-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                pointer-events: none;
                z-index: 9998;
                background: repeating-linear-gradient(
                    0deg,
                    transparent,
                    transparent 2px,
                    rgba(0, 217, 255, 0.03) 2px,
                    rgba(0, 217, 255, 0.03) 4px
                );
                animation: scanlineGlitch 0.1s infinite;
            }
            .konami-message {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: linear-gradient(135deg, rgba(255, 110, 199, 0.95) 0%, rgba(189, 0, 255, 0.95) 100%);
                color: #010409;
                padding: 2rem 4rem;
                font-size: 2rem;
                font-weight: 900;
                border-radius: 8px;
                z-index: 9999;
                box-shadow: 
                    0 0 40px #ff6ec7,
                    0 0 80px #bd00ff,
                    inset 0 0 20px rgba(255, 255, 255, 0.2);
                animation: glitchMessage 0.15s infinite, chromaticShift 0.3s infinite;
                border: 3px solid #00d9ff;
                text-transform: uppercase;
                letter-spacing: 0.3rem;
                font-family: 'Orbitron', sans-serif;
            }
            .konami-message::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: linear-gradient(
                    90deg,
                    transparent 0%,
                    rgba(255, 255, 255, 0.2) 50%,
                    transparent 100%
                );
                animation: flickerIntense 0.2s infinite;
            }
            .konami-message::after {
                content: '';
                position: absolute;
                top: -2px;
                left: -2px;
                right: -2px;
                bottom: -2px;
                background: linear-gradient(45deg, #ff6ec7, #00d9ff, #bd00ff, #ffea00);
                z-index: -1;
                border-radius: 10px;
                animation: rainbow 1s linear infinite;
                filter: blur(4px);
            }
            .glitch-body {
                animation: rainbow 2s linear infinite, flickerIntense 0.5s infinite !important;
            }
            .glitch-text-effect {
                position: relative;
            }
            .glitch-text-effect::before,
            .glitch-text-effect::after {
                content: '🎮 KONAMI CODE ACTIVATED! 🎮';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                opacity: 0.8;
            }
            .glitch-text-effect::before {
                color: #00d9ff;
                animation: glitchMessage 0.1s infinite;
                clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%);
            }
            .glitch-text-effect::after {
                color: #bd00ff;
                animation: glitchMessage 0.15s infinite reverse;
                clip-path: polygon(0 55%, 100% 55%, 100% 100%, 0 100%);
            }
        `;
        document.head.appendChild(style);
    }
    
    body.classList.add('glitch-body');
    
    // Create scanline overlay
    const overlay = document.createElement('div');
    overlay.className = 'konami-overlay';
    document.body.appendChild(overlay);
    
    setTimeout(() => {
        body.classList.remove('glitch-body');
        overlay.remove();
    }, 5000);
    
    // Show secret message with glitch effects
    const message = document.createElement('div');
    message.className = 'konami-message';
    
    const textSpan = document.createElement('span');
    textSpan.className = 'glitch-text-effect';
    textSpan.textContent = '🎮 KONAMI CODE ACTIVATED! 🎮';
    message.appendChild(textSpan);
    
    document.body.appendChild(message);
    
    // Add extra glitch particles
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const glitchParticle = document.createElement('div');
            glitchParticle.style.cssText = `
                position: fixed;
                left: ${Math.random() * 100}vw;
                top: ${Math.random() * 100}vh;
                width: ${Math.random() * 100 + 50}px;
                height: 2px;
                background: ${['#ff6ec7', '#00d9ff', '#bd00ff', '#ffea00'][Math.floor(Math.random() * 4)]};
                z-index: 9997;
                pointer-events: none;
                opacity: ${Math.random() * 0.5 + 0.3};
                animation: flickerIntense 0.1s infinite;
            `;
            document.body.appendChild(glitchParticle);
            setTimeout(() => glitchParticle.remove(), 300);
        }, i * 100);
    }
    
    setTimeout(() => {
        message.style.opacity = '0';
        message.style.transition = 'opacity 1s';
        setTimeout(() => message.remove(), 1000);
    }, 3000);
}

// Track tab changes to trigger animations
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
            const target = mutation.target;
            if (target.classList.contains('active') && target.id === 'about') {
                // Retrigger terminal typing effect
                const terminalBody = document.querySelector('.terminal-body');
                if (terminalBody) {
                    terminalBody.style.opacity = '0';
                    setTimeout(() => {
                        terminalBody.style.opacity = '1';
                        terminalBody.style.transition = 'opacity 0.5s';
                    }, 100);
                }
            }
        }
    });
});

document.querySelectorAll('.tab-content').forEach((tab) => {
    observer.observe(tab, { attributes: true });
});

// ========================================
// EXTRAVAGANT ENHANCEMENTS - OPTIMIZED
// ========================================

// Add animated skill tag indices for staggered animations
document.addEventListener('DOMContentLoaded', () => {
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach((tag, index) => {
        tag.style.setProperty('--i', index);
    });
});

// Throttle helper for performance
function throttle(func, delay) {
    let lastCall = 0;
    return function(...args) {
        const now = Date.now();
        if (now - lastCall >= delay) {
            lastCall = now;
            return func(...args);
        }
    };
}

// Parallax effect on scroll - SMOOTH with requestAnimationFrame
let ticking = false;
let lastScrollY = 0;

function updateParallax() {
    const scrolled = window.pageYOffset;
    const sun = document.querySelector('.sun');
    const mountains = document.querySelector('.mountains');
    
    if (sun) {
        // Preserve the translateX(-50%) while adding parallax translateY
        sun.style.transform = `translateX(-50%) translateY(${scrolled * 0.5}px)`;
    }
    if (mountains) {
        mountains.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
    
    ticking = false;
}

window.addEventListener('scroll', () => {
    lastScrollY = window.pageYOffset;
    
    if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
    }
}, { passive: true });

// Add hover effects - CSS-based, no JS transforms needed
// Removed redundant JS hover handlers as CSS handles this better

// Matrix rain effect - OPTIMIZED with requestAnimationFrame
function createMatrixEffect() {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '-1';
    canvas.style.opacity = '0.05';
    canvas.style.pointerEvents = 'none';
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d', { alpha: false }); // Performance boost
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const matrix = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}';
    const fontSize = 10;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);
    
    let lastFrame = 0;
    const frameDelay = 50; // Reduced frequency for better performance
    
    function draw(timestamp) {
        if (timestamp - lastFrame < frameDelay) {
            requestAnimationFrame(draw);
            return;
        }
        lastFrame = timestamp;
        
        ctx.fillStyle = 'rgba(13, 17, 23, 0.04)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#ff6ec7';
        ctx.font = fontSize + 'px monospace';
        
        // Only update a subset of drops each frame for performance
        const step = 3;
        for (let i = 0; i < drops.length; i += step) {
            const text = matrix[Math.floor(Math.random() * matrix.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
        
        requestAnimationFrame(draw);
    }
    
    requestAnimationFrame(draw);
    
    // Cleanup on resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }, 250);
    });
}

// Initialize matrix effect only if not on mobile for performance
if (window.innerWidth > 768) {
    createMatrixEffect();
}

// Mouse particle trail - HEAVILY THROTTLED and with pooling
let particlePool = [];
let activeParticles = 0;
const MAX_PARTICLES = 20;

const handleMouseMove = throttle((e) => {
    if (activeParticles >= MAX_PARTICLES) return;
    
    const particle = document.createElement('div');
    particle.className = 'mouse-particle';
    particle.style.left = e.clientX + 'px';
    particle.style.top = e.clientY + 'px';
    
    document.body.appendChild(particle);
    activeParticles++;
    
    setTimeout(() => {
        particle.remove();
        activeParticles--;
    }, 1000);
}, 100); // Only create particle every 100ms max

document.addEventListener('mousemove', handleMouseMove, { passive: true });

// Add particle style via CSS class instead of inline styles
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    .mouse-particle {
        position: fixed;
        width: 4px;
        height: 4px;
        background: radial-gradient(circle, #ff6ec7, transparent);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        animation: particleFade 1s ease-out forwards;
        will-change: opacity, transform;
    }
    @keyframes particleFade {
        to {
            opacity: 0;
            transform: translateY(-20px) scale(0);
        }
    }
`;
document.head.appendChild(particleStyle);

// Enhanced terminal cursor effect - Use CSS animation instead
const cursorStyle = document.createElement('style');
cursorStyle.textContent = `
    .cursor {
        animation: cursorBlink 1s infinite;
    }
    @keyframes cursorBlink {
        0%, 49% { opacity: 1; }
        50%, 100% { opacity: 0; }
    }
`;
document.head.appendChild(cursorStyle);
