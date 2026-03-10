// Project data for each skill with GitHub links
const skillProjectsData = {
    'c-programming': {
        title: 'C Programming Projects',
        icon: '<i class="fas fa-code"></i>',
        description: 'Collection of C programming projects and practice codes',
        projects: [
            {
                name: 'Calculator Program',
                github: 'https://github.com/username/calculator-c'
            },
            {
                name: 'Fibonacci Series Generator',
                github: 'https://github.com/username/fibonacci-c'
            },
            {
                name: 'Factorial Calculator (Recursion)',
                github: 'https://github.com/username/factorial-c'
            },
            {
                name: 'Prime Number Checker',
                github: 'https://github.com/username/prime-checker-c'
            },
            {
                name: 'Matrix Operations',
                github: 'https://github.com/username/matrix-operations-c'
            }
        ]
    },
    'html': {
        title: 'HTML Projects',
        icon: '<i class="fab fa-html5"></i>',
        description: 'Web pages and HTML structures created',
        projects: [
            {
                name: 'Personal Portfolio Website',
                github: 'https://github.com/username/portfolio-html'
            },
            {
                name: 'Contact Form Page',
                github: 'https://github.com/username/contact-form-html'
            },
            {
                name: 'Product Listing Page',
                github: 'https://github.com/username/product-listing-html'
            },
            {
                name: 'Blog Template',
                github: 'https://github.com/username/blog-template-html'
            },
            {
                name: 'Student Registration Form',
                github: 'https://github.com/username/registration-form-html'
            }
        ]
    },
    'css': {
        title: 'CSS Projects',
        icon: '<i class="fab fa-css3-alt"></i>',
        description: 'Styling and CSS design projects',
        projects: [
            {
                name: 'Modern Navigation Bar',
                github: 'https://github.com/username/navbar-css'
            },
            {
                name: 'Card Layout with Grid',
                github: 'https://github.com/username/card-grid-css'
            },
            {
                name: 'Animated Button Styles',
                github: 'https://github.com/username/animated-buttons-css'
            },
            {
                name: 'Responsive Flexbox Layout',
                github: 'https://github.com/username/flexbox-layout-css'
            },
            {
                name: 'CSS Animations & Transitions',
                github: 'https://github.com/username/animations-css'
            }
        ]
    },
    'javascript': {
        title: 'JavaScript Projects',
        icon: '<i class="fab fa-js-square"></i>',
        description: 'Interactive JavaScript applications and scripts',
        projects: [
            {
                name: 'To-Do List Application',
                github: 'https://github.com/username/todo-list-js'
            },
            {
                name: 'Weather App',
                github: 'https://github.com/username/weather-app-js'
            },
            {
                name: 'Calculator with DOM',
                github: 'https://github.com/username/calculator-js'
            },
            {
                name: 'Quiz Application',
                github: 'https://github.com/username/quiz-app-js'
            },
            {
                name: 'Tic Tac Toe Game',
                github: 'https://github.com/username/tictactoe-js'
            }
        ]
    },
    'java': {
        title: 'Java Projects',
        icon: '<i class="fab fa-java"></i>',
        description: 'Java programs and object-oriented concepts',
        projects: [
            {
                name: 'Student Management System',
                github: 'https://github.com/username/student-mgmt-java'
            },
            {
                name: 'Bank Account Class',
                github: 'https://github.com/username/bank-account-java'
            },
            {
                name: 'Pattern Printing Programs',
                github: 'https://github.com/username/patterns-java'
            },
            {
                name: 'Employee Payroll System',
                github: 'https://github.com/username/payroll-java'
            },
            {
                name: 'Library Management System',
                github: 'https://github.com/username/library-mgmt-java'
            }
        ]
    },
    'os': {
        title: 'Operating Systems',
        icon: '<i class="fas fa-cogs"></i>',
        description: 'Operating Systems concepts, notes and implementations',
        projects: [
            {
                name: 'Process Scheduling Simulator',
                github: 'https://github.com/username/process-scheduler-os'
            },
            {
                name: 'Memory Management Concepts',
                github: 'https://github.com/username/memory-mgmt-os'
            },
            {
                name: 'File System Implementation',
                github: 'https://github.com/username/filesystem-os'
            },
            {
                name: 'Disk Scheduling Algorithms',
                github: 'https://github.com/username/disk-scheduling-os'
            },
            {
                name: 'Thread Synchronization Examples',
                github: 'https://github.com/username/thread-sync-os'
            }
        ]
    }
};

// Get skill from URL parameter
const urlParams = new URLSearchParams(window.location.search);
const skillId = urlParams.get('skill');

// Load skill content
function loadSkillContent() {
    const skillContent = document.getElementById('skillContent');
    
    if(!skillId || !skillProjectsData[skillId]) {
        skillContent.innerHTML = '<h2>Skill not found</h2>';
        return;
    }
    
    const skillData = skillProjectsData[skillId];
    
    let html = `
        <h1>${skillData.icon} ${skillData.title}</h1>
        <p class="skill-description">${skillData.description}</p>
        <div class="projects-grid">
    `;
    
    skillData.projects.forEach((project) => {
        html += `
            <div class="project-detail-card">
                <div class="project-header">
                    <h3>${project.name}</h3>
                    <i class="fas fa-code"></i>
                </div>
                <div class="project-footer">
                    <a href="${project.github}" target="_blank" class="github-link">
                        <i class="fab fa-github"></i> View on GitHub
                    </a>
                </div>
            </div>
        `;
    });
    
    html += '</div>';
    skillContent.innerHTML = html;
}

// Load content on page load
document.addEventListener('DOMContentLoaded', loadSkillContent);