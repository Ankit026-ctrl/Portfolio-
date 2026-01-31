// DOM Elements
const typingText = document.getElementById('typing-text');
const terminalOutput = document.getElementById('terminal-output');
const footerTyping = document.getElementById('footer-typing');
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

// Typing effect for main terminal
const messages = [
    "./start_portfolio.sh",
    "show_services --all",
    "display_skills --detailed",
    "connect --message 'Let\\'s work together'"
];
let messageIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentMessage = messages[messageIndex];
    
    if (!isDeleting && charIndex <= currentMessage.length) {
        typingText.textContent = currentMessage.substring(0, charIndex);
        charIndex++;
        setTimeout(typeEffect, 100);
    } else if (isDeleting && charIndex >= 0) {
        typingText.textContent = currentMessage.substring(0, charIndex);
        charIndex--;
        setTimeout(typeEffect, 50);
    } else {
        isDeleting = !isDeleting;
        if (!isDeleting) {
            messageIndex = (messageIndex + 1) % messages.length;
        }
        setTimeout(typeEffect, 1200);
    }
}

// Footer typing effect
const footerMessages = [
    "system status: online",
    "services: running",
    "last_login: today",
    "uptime: 100%"
];
let footerIndex = 0;
let footerCharIndex = 0;
let footerDeleting = false;

function footerTypeEffect() {
    const currentMessage = footerMessages[footerIndex];
    
    if (!footerDeleting && footerCharIndex <= currentMessage.length) {
        footerTyping.textContent = currentMessage.substring(0, footerCharIndex);
        footerCharIndex++;
        setTimeout(footerTypeEffect, 100);
    } else if (footerDeleting && footerCharIndex >= 0) {
        footerTyping.textContent = currentMessage.substring(0, footerCharIndex);
        footerCharIndex--;
        setTimeout(footerTypeEffect, 50);
    } else {
        footerDeleting = !footerDeleting;
        if (!footerDeleting) {
            footerIndex = (footerIndex + 1) % footerMessages.length;
        }
        setTimeout(footerTypeEffect, 1500);
    }
}

// Terminal command functionality
function runCommand(cmd) {
    const output = document.getElementById('terminal-output');
    output.innerHTML = '';
    
    if (cmd === 'help') {
        output.innerHTML = `
            <p>Available commands:</p>
            <p><span class="command" data-command="services">services</span> - List all DevOps services</p>
            <p><span class="command" data-command="skills">skills</span> - Display technical skills</p>
            <p><span class="command" data-command="contact">contact</span> - Show contact information</p>
            <p><span class="command" data-command="clear">clear</span> - Clear terminal</p>
            <p><span class="command" data-command="about">about</span> - About me</p>
        `;
    } else if (cmd === 'services') {
        output.innerHTML = `
            <p>DevOps Services Offered:</p>
            <p>1. Domain & Email Management</p>
            <p>2. Web Hosting Solutions</p>
            <p>3. SSL Certificates & Security</p>
            <p>4. CI/CD Pipeline Automation</p>
            <p>5. Cloud Infrastructure</p>
            <p>6. Containerization & Orchestration</p>
            <p>Scroll down for detailed information.</p>
        `;
        document.getElementById('services').scrollIntoView({behavior: 'smooth'});
    } else if (cmd === 'skills') {
        output.innerHTML = `
            <p>Technical Skills:</p>
            <p>• Linux Administration: 85%</p>
            <p>• Cloud Platforms: 70%</p>
            <p>• Docker & Containerization: 65%</p>
            <p>• CI/CD & Automation: 75%</p>
            <p>• Kubernetes: 50% (learning)</p>
            <p>• Terraform (IaC): 60%</p>
            <p>Scroll down for detailed skills section.</p>
        `;
        document.getElementById('skills').scrollIntoView({behavior: 'smooth'});
    } else if (cmd === 'contact') {
        output.innerHTML = `
            <p>Contact Information:</p>
            <p>Email: ankithk252@gmail.com</p>
            <p>Phone: +91 8686803953</p>
            <p>Available for freelance and full-time DevOps positions.</p>
            <p>Use the contact form below or scroll down.</p>
        `;
        document.getElementById('contact').scrollIntoView({behavior: 'smooth'});
    } else if (cmd === 'clear') {
        output.innerHTML = `
            <p>Welcome to my Linux-themed DevOps portfolio.</p>
            <p>Type <span class="command" data-command="help">'help'</span> to see available commands.</p>
            <p>Or scroll down to explore my services and skills.</p>
        `;
    } else if (cmd === 'about') {
        output.innerHTML = `
            <p>About Ankith Kumar:</p>
            <p>DevOps Engineer & Linux Specialist</p>
            <p>Email: ankithk252@gmail.com</p>
            <p>Phone: +91 8686803953</p>
            <p>Location: India</p>
            <p>Passionate about creating efficient, scalable DevOps solutions.</p>
            <p>Scroll up to see my profile section.</p>
        `;
        document.getElementById('about').scrollIntoView({behavior: 'smooth'});
    } else {
        output.innerHTML = `<p>Command '${cmd}' not found. Type <span class="command" data-command="help">'help'</span> for available commands.</p>`;
    }
    
    // Reattach event listeners to new command elements
    attachCommandListeners();
}

// Toggle tools visibility
function toggleTools() {
    const tools = document.getElementById('skills-details');
    const viewText = document.querySelector('.view-tools');
    
    if (tools.style.display === 'none' || tools.style.display === '') {
        tools.style.display = 'block';
        viewText.innerHTML = 'Click <span class="command" data-command="toggle-tools">here</span> to hide tools list.';
    } else {
        tools.style.display = 'none';
        viewText.innerHTML = 'Click <span class="command" data-command="toggle-tools">here</span> to view detailed tools list.';
    }
    
    // Reattach event listeners
    attachCommandListeners();
}

// Attach event listeners to command elements
function attachCommandListeners() {
    document.querySelectorAll('.command').forEach(cmd => {
        cmd.addEventListener('click', function() {
            const command = this.getAttribute('data-command');
            if (command === 'toggle-tools') {
                toggleTools();
            } else {
                runCommand(command);
            }
        });
    });
}

// Form submission with email sending
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const service = document.getElementById('service').value;
    const message = document.getElementById('message').value;
    
    // Create email body
    const emailBody = `
Name: ${name}
Email: ${email}
Service Needed: ${service}
Message: ${message}
    
This message was sent from your DevOps portfolio website.
    `;
    
    // Create mailto link
    const mailtoLink = `mailto:ankithk252@gmail.com?subject=DevOps Service Inquiry from ${name}&body=${encodeURIComponent(emailBody)}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Show success message
    formMessage.style.display = 'block';
    this.reset();
    
    // Hide message after 5 seconds
    setTimeout(() => {
        formMessage.style.display = 'none';
    }, 5000);
});

// Mobile menu toggle
mobileMenuBtn.addEventListener('click', function() {
    if (navLinks.style.display === 'flex' || navLinks.style.display === '') {
        navLinks.style.display = 'none';
    } else {
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '100%';
        navLinks.style.left = '0';
        navLinks.style.width = '100%';
        navLinks.style.backgroundColor = 'var(--terminal-header)';
        navLinks.style.padding = '20px';
        navLinks.style.gap = '15px';
        navLinks.style.borderTop = '2px solid var(--terminal-text)';
        navLinks.style.zIndex = '100';
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Close mobile menu if open
            if (window.innerWidth <= 992) {
                navLinks.style.display = 'none';
            }
            
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Initialize effects and event listeners when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Start typing effects
    typeEffect();
    footerTypeEffect();
    
    // Attach command listeners
    attachCommandListeners();
    
    // Add click event to close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 992 && 
            !e.target.closest('.nav-links') && 
            !e.target.closest('.mobile-menu-btn')) {
            navLinks.style.display = 'none';
        }
    });
    
    // Update copyright year
    const yearSpan = document.querySelector('.footer p:nth-child(2)');
    if (yearSpan) {
        const currentYear = new Date().getFullYear();
        yearSpan.textContent = `© ${currentYear} Ankith Kumar. All systems operational.`;
    }
});

// Handle window resize
window.addEventListener('resize', function() {
    if (window.innerWidth > 992) {
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'row';
        navLinks.style.position = 'static';
        navLinks.style.width = 'auto';
        navLinks.style.backgroundColor = 'transparent';
        navLinks.style.padding = '0';
        navLinks.style.borderTop = 'none';
    } else {
        navLinks.style.display = 'none';
    }
});



// ============================================
// TITLE TYPING ANIMATION
// ============================================

const titleElement = document.getElementById('typing-title');
const titleText = "DevOps Engineer & Linux Specialist";
let titleIndex = 0;
let titleSpeed = 100; // typing speed in ms
let isTitleDeleting = false;
let titlePause = 1500; // pause at the end
let titleGlitchInterval;
let titleAnimationActive = true;

// Matrix-style title animation
function matrixTitleEffect() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$+-*/=%\"'#&_(),.;:?!\\|{}<>[]^~";
    const finalText = "DevOps Engineer & Linux Specialist";
    let currentText = "";
    let position = 0;
    let iterations = 0;
    const maxIterations = 3; // Number of scrambles before revealing correct letter
    
    function scramble() {
        if (!titleAnimationActive) return;
        
        if (position >= finalText.length) {
            // Title complete, add periodic glitch
            titleElement.innerHTML = finalText
                .replace(/DevOps/g, '<span class="title-devops">DevOps</span>')
                .replace(/Engineer/g, '<span class="title-engineer">Engineer</span>')
                .replace(/Linux/g, '<span class="title-linux">Linux</span>')
                .replace(/Specialist/g, '<span class="title-specialist">Specialist</span>')
                .replace(/&/g, '<span class="title-ampersand">&</span>');
            titleElement.classList.add('title-complete');
            
            // Add glitch effect every 5 seconds
            if (!titleGlitchInterval) {
                titleGlitchInterval = setInterval(() => {
                    titleElement.classList.add('glitch-effect');
                    setTimeout(() => {
                        titleElement.classList.remove('glitch-effect');
                    }, 300);
                }, 5000);
            }
            return;
        }
        
        if (iterations < maxIterations) {
            // Scramble current position
            let scrambled = currentText;
            for (let i = position; i < finalText.length; i++) {
                const randomChar = chars[Math.floor(Math.random() * chars.length)];
                scrambled += `<span class="matrix-char scrambling">${randomChar}</span>`;
            }
            
            // Apply styling to already revealed characters
            let styledCurrent = currentText
                .replace(/DevOps/g, '<span class="title-devops">DevOps</span>')
                .replace(/Engineer/g, '<span class="title-engineer">Engineer</span>')
                .replace(/Linux/g, '<span class="title-linux">Linux</span>')
                .replace(/Specialist/g, '<span class="title-specialist">Specialist</span>')
                .replace(/&/g, '<span class="title-ampersand">&</span>');
            
            titleElement.innerHTML = styledCurrent + scrambled;
            
            iterations++;
            setTimeout(scramble, 50);
        } else {
            // Reveal correct character
            currentText += finalText[position];
            position++;
            iterations = 0;
            
            // Show current text with correct characters revealed
            titleElement.innerHTML = currentText
                .replace(/DevOps/g, '<span class="title-devops">DevOps</span>')
                .replace(/Engineer/g, '<span class="title-engineer">Engineer</span>')
                .replace(/Linux/g, '<span class="title-linux">Linux</span>')
                .replace(/Specialist/g, '<span class="title-specialist">Specialist</span>')
                .replace(/&/g, '<span class="title-ampersand">&</span>');
            
            // Continue with next character
            setTimeout(scramble, Math.random() * 100 + 50);
        }
    }
    
    // Clear any existing interval
    if (titleGlitchInterval) {
        clearInterval(titleGlitchInterval);
        titleGlitchInterval = null;
    }
    
    titleAnimationActive = true;
    scramble();
}

// Simple typing animation
function typeTitleSimple() {
    if (!titleAnimationActive) return;
    
    if (titleIndex <= titleText.length) {
        // Typing forward
        displayTitleWithStyles(titleText.substring(0, titleIndex));
        titleIndex++;
        setTimeout(typeTitleSimple, titleSpeed);
    } else {
        // Add glitch effect when complete
        titleElement.classList.add('glitch-effect');
        setTimeout(() => {
            titleElement.classList.remove('glitch-effect');
        }, 300);
        
        // Add a subtle glitch effect periodically
        if (!titleGlitchInterval) {
            titleGlitchInterval = setInterval(() => {
                titleElement.classList.add('glitch-effect');
                setTimeout(() => {
                    titleElement.classList.remove('glitch-effect');
                }, 100);
            }, 5000);
        }
        
        titleElement.classList.add('title-complete');
    }
}

function displayTitleWithStyles(text) {
    // Apply different colors to different parts of the title
    let styledText = text
        .replace(/DevOps/g, '<span class="title-devops">DevOps</span>')
        .replace(/Engineer/g, '<span class="title-engineer">Engineer</span>')
        .replace(/Linux/g, '<span class="title-linux">Linux</span>')
        .replace(/Specialist/g, '<span class="title-specialist">Specialist</span>')
        .replace(/&/g, '<span class="title-ampersand">&</span>');
    
    titleElement.innerHTML = styledText;
}

// Initialize title animation
function initTitleAnimation() {
    // Reset title
    titleElement.innerHTML = '';
    titleElement.classList.remove('title-complete', 'glitch-effect');
    titleIndex = 0;
    titleAnimationActive = true;
    
    // Clear any existing intervals
    if (titleGlitchInterval) {
        clearInterval(titleGlitchInterval);
        titleGlitchInterval = null;
    }
    
    // Start matrix effect (most impressive)
    matrixTitleEffect();
    
    // Uncomment for simple typing effect instead:
    // typeTitleSimple();
}

// ============================================
// EXISTING CODE (keep all your existing functions)
// ============================================

// ... (your existing JavaScript code remains here)

// Initialize effects and event listeners when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Start title animation
    initTitleAnimation();
    
    // Start typing effects (existing)
    typeEffect();
    footerTypeEffect();
    
    // Attach command listeners (existing)
    attachCommandListeners();
    
    // ... (rest of your existing initialization code)
});

// Pause animation when user is not viewing the page
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        titleAnimationActive = false;
        if (titleGlitchInterval) {
            clearInterval(titleGlitchInterval);
            titleGlitchInterval = null;
        }
    } else {
        // Restart animation when page becomes visible again
        setTimeout(initTitleAnimation, 500);
    }
});