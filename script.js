// ===== DOM Elements =====
const navMenu = document.getElementById('navMenu');
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelectorAll('.nav-link');
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const contactForm = document.getElementById('contactForm');
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const particlesContainer = document.getElementById('particles');
const loader = document.getElementById('loader');

// ===== Initialization =====
document.addEventListener('DOMContentLoaded', () => {
    loadThemePreference();
    setupParticles();
    setupEventListeners();
    handleFormSubmit();
    
    // Hide loader after 2.5 seconds
    setTimeout(() => {
        console.log('Page loaded');
    }, 2500);
});

// ===== Theme Toggle =====
function loadThemePreference() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        body.classList.add('light-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    
    if (body.classList.contains('light-mode')) {
        localStorage.setItem('theme', 'light');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        localStorage.setItem('theme', 'dark');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
});

// ===== Mobile Menu Toggle =====
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger
    hamburger.style.position = 'relative';
});

// Close menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// ===== Smooth Scrolling =====
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== Particles Background =====
function setupParticles() {
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 4 + 2;
        const xPos = Math.random() * 100;
        const yPos = Math.random() * 100;
        const duration = Math.random() * 5 + 5;
        const tx = (Math.random() - 0.5) * 100;
        
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = xPos + '%';
        particle.style.top = yPos + '%';
        particle.style.setProperty('--tx', tx + 'px');
        particle.style.animationDuration = duration + 's';
        particle.style.animationDelay = Math.random() * 2 + 's';
        
        particlesContainer.appendChild(particle);
        
        // Recreate particle after animation
        setTimeout(() => {
            particle.remove();
        }, (duration + 2) * 1000);
    }
    
    // Continuously add new particles
    setInterval(() => {
        if (particlesContainer.children.length < 20) {
            setupParticles();
        }
    }, 3000);
}

// ===== Event Listeners Setup =====
function setupEventListeners() {
    // Navbar active state
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

// ===== Contact Form Handling =====
function handleFormSubmit() {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const name = contactForm.querySelector('input[placeholder="Your Name"]').value;
        const email = contactForm.querySelector('input[placeholder="Your Email"]').value;
        const message = contactForm.querySelector('textarea').value;
        
        // Simple validation
        if (name && email && message) {
            // Show success message
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        } else {
            alert('Please fill in all fields');
        }
    });
}

// ===== Project Filtering =====
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        
        // Add active to clicked button
        btn.classList.add('active');
        
        // Get filter value
        const filterValue = btn.getAttribute('data-filter');
        
        // Filter projects
        projectCards.forEach(card => {
            if (filterValue === 'all') {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                }, 10);
            } else {
                const cardCategory = card.getAttribute('data-category');
                if (cardCategory === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            }
        });
    });
});

// ===== Scroll Animations =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.skill-card, .project-card, .testimonial-card, .resume-block').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ===== Skills Progress Animation =====
const skillProgresss = document.querySelectorAll('.skill-progress');
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.style.width) {
            const width = entry.target.style.width;
            entry.target.style.animation = 'fillBar 1.5s ease-out forwards';
        }
    });
}, observerOptions);

skillProgresss.forEach(progress => {
    skillObserver.observe(progress);
});

// ===== Download CV =====
document.querySelectorAll('.download-cv-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        // Replace with actual CV file path
        const cvLink = document.createElement('a');
        cvLink.href = '#'; // Change to your actual CV file
        cvLink.download = 'Atharva_CV.pdf';
        // Uncomment below to enable download
        // cvLink.click();
        alert('CV download feature will be enabled once you add the CV file');
    });
});

// ===== Typing Animation Enhancement =====
const typingElement = document.querySelector('.typing');
if (typingElement) {
    typingElement.addEventListener('animationend', () => {
        typingElement.style.borderRight = 'none';
    });
}

// ===== Add smooth fade-in for sections =====
window.addEventListener('load', () => {
    document.querySelectorAll('section').forEach((section, index) => {
        section.style.animation = `fadeInUp 0.8s ease ${index * 0.1}s both`;
    });
});

// ===== Custom Cursor (Optional Enhancement) =====
document.addEventListener('mousemove', (e) => {
    // You can add custom cursor effects here if needed
});

// ===== Keyboard Navigation =====
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        navMenu.classList.remove('active');
    }
});

// ===== Scroll to Top Button =====
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollTopBtn.className = 'scroll-top';
scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    background: linear-gradient(135deg, #00d4ff, #0099ff);
    border: none;
    color: #0a0e27;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    cursor: pointer;
    display: none;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    z-index: 50;
    transition: all 0.3s;
    font-weight: bold;
    box-shadow: 0 4px 15px rgba(0, 212, 255, 0.3);
`;

document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.style.display = 'flex';
    } else {
        scrollTopBtn.style.display = 'none';
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollTopBtn.addEventListener('mouseenter', () => {
    scrollTopBtn.style.transform = 'scale(1.1)';
});

scrollTopBtn.addEventListener('mouseleave', () => {
    scrollTopBtn.style.transform = 'scale(1)';
});

// ===== Add Animation Keyframes =====
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// ===== Performance Monitoring =====
if (performance.timing) {
    window.addEventListener('load', () => {
        const pageLoadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log('Page load time: ' + pageLoadTime + ' ms');
    });
}

// ===== Lazy Loading Images (Optional) =====
if ('IntersectionObserver' in window) {
    const images = document.querySelectorAll('img');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ===== Analytics (Optional) =====
function trackEvent(eventName, eventData = {}) {
    console.log(`Event: ${eventName}`, eventData);
    // Can be integrated with Google Analytics or similar
}

// Ensure proper layering on page load
document.addEventListener('DOMContentLoaded', function() {
    const allSections = document.querySelectorAll('section, nav, footer');
    allSections.forEach(section => {
        section.style.position = 'relative';
        section.style.zIndex = '1';
    });
});

// Skill card click navigation
document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('click', function() {
        const skillId = this.getAttribute('data-skill');
        window.location.href = `skill-projects.html?skill=${skillId}`;
    });
});