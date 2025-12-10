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
        });
    });

    // Load projects data
    loadProjects();
});

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

// Add parallax effect to background
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const sun = document.querySelector('.sun');
    const mountains = document.querySelector('.mountains');
    
    if (sun) {
        sun.style.transform = `translateX(-50%) translateY(${scrollY * 0.3}px)`;
    }
    
    if (mountains) {
        mountains.style.transform = `translateY(${scrollY * 0.15}px)`;
    }
    
    lastScrollY = scrollY;
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
    if (!document.getElementById('rainbow-animation')) {
        const style = document.createElement('style');
        style.id = 'rainbow-animation';
        style.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
    }
    
    body.style.animation = 'rainbow 2s linear infinite';
    
    setTimeout(() => {
        body.style.animation = '';
    }, 5000);
    
    // Show secret message
    const message = document.createElement('div');
    const messageText = document.createTextNode('🎮 KONAMI CODE ACTIVATED! 🎮');
    message.appendChild(messageText);
    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(255, 110, 199, 0.95);
        color: #010409;
        padding: 2rem 4rem;
        font-size: 2rem;
        font-weight: 900;
        border-radius: 8px;
        z-index: 9999;
        animation: fadeIn 0.5s ease;
        box-shadow: 0 0 40px #ff6ec7;
    `;
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.style.opacity = '0';
        message.style.transition = 'opacity 1s';
        setTimeout(() => message.remove(), 1000);
    }, 3000);
}

// Add typing effect to terminal
const terminalBody = document.querySelector('.terminal-body');
if (terminalBody) {
    const lines = [
        '<p><span class="prompt">$</span> cat about.txt</p>',
        '<p class="output">Passionate full-stack developer with 10+ years of experience</p>',
        '<p class="output">Building scalable web applications and open-source tools</p>',
        '<p class="output">Love solving complex problems with elegant code</p>',
        '<p><span class="prompt">$</span> echo $CURRENT_PROJECT</p>',
        '<p class="output">WhatsApp Backup Reader - Desktop/web app for chat visualization</p>',
        '<p><span class="prompt">$</span> cat interests.txt</p>',
        '<p class="output">• Svelte, TypeScript, AI integrations</p>',
        '<p class="output">• Node.js, Vue.js, Express, MongoDB</p>',
        '<p class="output">• Cats 🐱 | Coffee ☕ | Open Source 💜</p>',
        '<p><span class="prompt cursor">█</span></p>'
    ];
    
    terminalBody.innerHTML = '';
    
    let lineIndex = 0;
    const speed = 300;
    
    function typeWriter() {
        if (lineIndex < lines.length) {
            terminalBody.innerHTML += lines[lineIndex];
            lineIndex++;
            setTimeout(typeWriter, speed);
        }
    }
    
    // Start typing effect when About tab is visible
    const aboutTab = document.getElementById('about');
    if (aboutTab && aboutTab.classList.contains('active')) {
        setTimeout(typeWriter, 500);
    }
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
