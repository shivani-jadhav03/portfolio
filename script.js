// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        
        if (target) {
            // Close mobile menu if open
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            
            // Calculate offset for fixed navbar
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navbarHeight - 20;
            
            // Smooth scroll to target
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Active Navigation Link on Scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Navbar Background on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
    }
});

// Animate Skill Bars on Scroll
const animateSkillBars = () => {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const rect = bar.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible && !bar.classList.contains('animated')) {
            const progress = bar.getAttribute('data-progress');
            bar.style.width = progress + '%';
            bar.classList.add('animated');
        }
    });
};

// Animate Elements on Scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.project-card, .timeline-item, .education-card, .achievement-card, .certificate-card, .language-card, .interest-card');
    
    elements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible && !element.classList.contains('animate')) {
            element.classList.add('animate');
        }
    });
};

// Counter Animation for Stats
const animateCounters = () => {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;
    
    counters.forEach(counter => {
        const rect = counter.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible && !counter.classList.contains('counted')) {
            const target = +counter.innerText;
            const increment = target / speed;
            
            const updateCount = () => {
                const count = +counter.innerText;
                
                if (count < target) {
                    counter.innerText = Math.ceil(count + increment);
                    setTimeout(updateCount, 1);
                } else {
                    counter.innerText = target + '+';
                    counter.classList.add('counted');
                }
            };
            
            updateCount();
        }
    });
};

// Typing Animation for Hero Title
const typeWriter = () => {
    const nameElement = document.querySelector('.name');
    const text = 'Shivani Mahadev Jadhav';
    let index = 0;
    
    const type = () => {
        if (index < text.length) {
            nameElement.textContent = text.slice(0, index + 1);
            index++;
            setTimeout(type, 100);
        }
    };
    
    setTimeout(type, 1000);
};

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero && heroContent) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroContent.style.opacity = 1 - scrolled / 600;
    }
});

// Form Validation and Submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Basic validation
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Create email content with all form details
        const emailContent = `
Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}

---
This message was sent from your portfolio website.
        `;
        
        // Create mailto link with all details
        const mailtoLink = `mailto:jadhavshivani41003@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailContent)}`;
        
        // Simulate form submission
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            // Open email client with pre-filled details
            window.location.href = mailtoLink;
            
            // Reset form
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            showNotification('Email client opened with your details!', 'success');
        }, 1500);
    });
}

// Email Validation Helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    switch(type) {
        case 'success':
            notification.style.background = '#10B981';
            break;
        case 'error':
            notification.style.background = '#EF4444';
            break;
        default:
            notification.style.background = '#4F46E5';
    }
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Scroll Progress Indicator
const createScrollProgress = () => {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #4F46E5, #7C3AED);
        z-index: 10001;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrolled = (window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = scrolled + '%';
    });
};

// Reveal Animation on Scroll
const revealOnScroll = () => {
    const reveals = document.querySelectorAll('section');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('revealed');
        }
    });
};

// Mobile and Scroll Animations
const addScrollAnimations = () => {
    // Disable scroll animations to prevent unwanted transitions
    // const elements = document.querySelectorAll('.skill-category, .project-card, .timeline-item, .education-card, .achievement-card, .certificate-card, .language-card, .interest-card');
    
    // const observer = new IntersectionObserver((entries) => {
    //     entries.forEach(entry => {
    //         if (entry.isIntersecting) {
    //             entry.target.classList.add('animate-on-scroll');
    //             setTimeout(() => {
    //                 entry.target.classList.add('animated');
    //             }, 100);
    //         }
    //     });
    // }, { threshold: 0.1 });
    
    // elements.forEach(el => observer.observe(el));
};

// Enhanced mobile menu handling
const enhanceMobileMenu = () => {
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Close mobile menu after navigation
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
};

// Remove parallax effect to prevent unwanted animations
// const addParallaxEffect = () => {
//     const hero = document.querySelector('.hero');
//     window.addEventListener('scroll', () => {
//         const scrolled = window.pageYOffset;
//         const parallaxElements = hero.querySelectorAll('.hero-text, .hero-image');
//         
//         parallaxElements.forEach((element, index) => {
//             const speed = index === 0 ? 0.5 : 0.3;
//             element.style.transform = `translateY(${scrolled * speed}px)`;
//         });
//     });
// };

// Initialize animations and event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Start typing animation
    typeWriter();
    
    // Add scroll animations (disabled to prevent unwanted transitions)
    // addScrollAnimations();
    
    // Enhance mobile menu
    enhanceMobileMenu();
    
    // Add parallax effect (disabled to prevent unwanted animations)
    // addParallaxEffect();
    
    // Initial animations
    animateSkillBars();
    animateCounters();
    revealOnScroll();
    
    // Scroll event listeners
    window.addEventListener('scroll', () => {
        animateSkillBars();
        animateCounters();
        revealOnScroll();
    });
    
    // Add hover effects to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-10px) scale(1)';
        });
    });
    
    // Add click effect to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.5);
                left: ${x}px;
                top: ${y}px;
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add CSS for ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .notification {
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        }
        
        section {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease-out;
        }
        
        section.revealed {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
});

// Intersection Observer for better performance
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.project-card, .timeline-item, .education-card, .achievement-card, .certificate-card, .language-card, .interest-card');
    animatedElements.forEach(el => observer.observe(el));
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Add loading animation styles
    const loadingStyle = document.createElement('style');
    loadingStyle.textContent = `
        body {
            overflow-x: hidden;
        }
        
        body:not(.loaded) * {
            animation-duration: 0s !important;
            transition-duration: 0s !important;
        }
        
        body.loaded {
            overflow-x: hidden;
        }
    `;
    document.head.appendChild(loadingStyle);
});

// Mouse move parallax effect (subtle)
document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth - 0.5;
    const mouseY = e.clientY / window.innerHeight - 0.5;
    
    const parallaxElements = document.querySelectorAll('.profile-card');
    parallaxElements.forEach(el => {
        const depth = 10;
        const moveX = mouseX * depth;
        const moveY = mouseY * depth;
        
        el.style.transform = `perspective(1000px) rotateY(${moveX}deg) rotateX(${-moveY}deg)`;
    });
});

// Performance optimization - Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
window.addEventListener('scroll', debounce(() => {
    // Scroll-based animations here
}, 10));
