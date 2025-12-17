// Shubham Singh - Internship Portfolio JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // ========== BASIC SETUP ==========
    
    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // ========== MOBILE MENU TOGGLE ==========
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    mobileMenuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        const icon = this.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
        
        // Add animation to menu items
        const menuItems = navLinks.querySelectorAll('li');
        menuItems.forEach((item, index) => {
            if (navLinks.classList.contains('active')) {
                item.style.animation = `fadeInDown 0.3s ease forwards ${index * 0.1}s`;
            } else {
                item.style.animation = 'none';
            }
        });
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileMenuBtn.querySelector('i').classList.add('fa-bars');
            mobileMenuBtn.querySelector('i').classList.remove('fa-times');
        });
    });
    
    // ========== DYNAMIC TEXT TYPING EFFECT ==========
    const dynamicText = document.getElementById('dynamic-text');
    // Customized for Shubham's profile
    const roles = ['Software Engineer', 'Java Developer', 'Network Engineer', 'IoT Developer', 'Full Stack Developer'];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    let isPaused = false;
    
    function typeEffect() {
        if (isPaused) {
            setTimeout(typeEffect, 1000);
            return;
        }
        
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            // Deleting text
            dynamicText.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            // Typing text
            dynamicText.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = charIndex < currentRole.length * 0.7 ? 100 : 150;
        }
        
        // Check if word is complete
        if (!isDeleting && charIndex === currentRole.length) {
            // Pause at the end for 2 seconds
            isPaused = true;
            setTimeout(() => {
                isPaused = false;
                isDeleting = true;
            }, 2000);
        } else if (isDeleting && charIndex === 0) {
            // Move to next word
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            // Pause before starting next word
            isPaused = true;
            setTimeout(() => {
                isPaused = false;
            }, 500);
        }
        
        setTimeout(typeEffect, typingSpeed);
    }
    
    // Start typing effect with delay
    setTimeout(typeEffect, 1000);
    
    // ========== CONTACT FORM SUBMISSION ==========
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const subject = this.querySelectorAll('input[type="text"]')[1].value;
            const message = this.querySelector('textarea').value;
            
            // Form validation
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            if (!validateEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Simulate API call (replace with actual API endpoint)
            setTimeout(() => {
                // In real implementation, use fetch() to send data to server
                // fetch('your-api-endpoint', { method: 'POST', body: formData })
                
                // Success simulation
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent Successfully!';
                submitBtn.style.background = '#10b981';
                
                showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
                
                // Reset form after 2 seconds
                setTimeout(() => {
                    this.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                }, 2000);
                
                // Log form data (remove in production)
                console.log('Form Submission:', { name, email, subject, message });
                
            }, 1500);
        });
    }
    
    // Email validation helper
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Notification system
    function showNotification(message, type) {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close"><i class="fas fa-times"></i></button>
        `;
        
        // Add to DOM
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            hideNotification(notification);
        }, 5000);
        
        // Close button functionality
        notification.querySelector('.notification-close').addEventListener('click', () => {
            hideNotification(notification);
        });
    }
    
    function hideNotification(notification) {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }
    
    // ========== SMOOTH SCROLLING ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ========== NAVBAR SCROLL EFFECT ==========
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add shadow when scrolled
        if (scrollTop > 100) {
            navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        }
        
        // Hide/show navbar on scroll (optional)
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // ========== SKILL BARS ANIMATION ==========
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const skillBarsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBars = entry.target.querySelectorAll('.skill-level');
                skillBars.forEach((bar, index) => {
                    // Reset width to 0
                    const originalWidth = bar.style.width;
                    bar.style.width = '0%';
                    
                    // Animate to original width
                    setTimeout(() => {
                        bar.style.transition = 'width 1.5s cubic-bezier(0.65, 0, 0.35, 1)';
                        bar.style.width = originalWidth;
                    }, index * 200);
                });
                
                // Stop observing after animation
                skillBarsObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        skillBarsObserver.observe(skillsSection);
    }
    
    // ========== PROJECT CARDS INTERACTIVE EFFECTS ==========
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        // Hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
            this.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.15)';
            
            // Animate badge
            const badge = this.querySelector('.project-badge');
            if (badge) {
                badge.style.transform = 'scale(1.1)';
                badge.style.transition = 'transform 0.3s ease';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.05)';
            
            // Reset badge
            const badge = this.querySelector('.project-badge');
            if (badge) {
                badge.style.transform = 'scale(1)';
            }
        });
        
        // Click effect for project links
        const projectLinks = card.querySelectorAll('.project-link');
        projectLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.stopPropagation();
                // Add click animation
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
            });
        });
    });
    
    // ========== DOWNLOAD RESUME BUTTON ENHANCEMENT ==========
    const downloadButtons = document.querySelectorAll('a[download]');
    downloadButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Check if resume file exists
            const resumePath = this.getAttribute('href');
            
            // For demo purposes - you can add actual file check
            showNotification('Downloading resume...', 'success');
            
            // Optional: Track download event
            console.log('Resume download initiated:', resumePath);
        });
    });
    
    // ========== ACTIVE NAV LINK HIGHLIGHTING ==========
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-links a');
    
    function highlightNavLink() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const headerHeight = navbar.offsetHeight;
            
            if (scrollY >= (sectionTop - headerHeight - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavLink);
    
    // ========== ANIMATE ELEMENTS ON SCROLL ==========
    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    // Observe elements to animate
    document.querySelectorAll('.project-card, .skill-category, .about-stats .stat-card, .contact-item').forEach(el => {
        fadeInObserver.observe(el);
    });
    
    // ========== COPY EMAIL TO CLIPBOARD ==========
    const emailElement = document.querySelector('.contact-item p');
    if (emailElement && emailElement.textContent.includes('@')) {
        emailElement.style.cursor = 'pointer';
        emailElement.title = 'Click to copy email';
        
        emailElement.addEventListener('click', function() {
            const email = this.textContent.trim();
            navigator.clipboard.writeText(email).then(() => {
                showNotification('Email copied to clipboard!', 'success');
            }).catch(err => {
                console.error('Failed to copy email: ', err);
                showNotification('Failed to copy email', 'error');
            });
        });
    }
    
    // ========== SOCIAL MEDIA LINKS ENHANCEMENT ==========
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            const icon = this.querySelector('i');
            const classes = icon.classList;
            
            // Add bounce animation
            icon.style.animation = 'bounce 0.5s ease';
            
            // Reset animation after it completes
            setTimeout(() => {
                icon.style.animation = '';
            }, 500);
        });
    });
    
    // ========== PAGE LOAD ANIMATION ==========
    window.addEventListener('load', function() {
        // Add loaded class to body for fade-in effect
        document.body.classList.add('loaded');
        
        // Show welcome message (optional)
        setTimeout(() => {
            console.log('Portfolio loaded successfully!');
        }, 1000);
    });
    
    // ========== ADDITIONAL CSS FOR ANIMATIONS ==========
    const style = document.createElement('style');
    style.textContent = `
        /* Animation keyframes */
        @keyframes fadeInDown {
            from {
                opacity: 0;
                transform: translateY(-10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes bounce {
            0%, 100% {
                transform: translateY(0);
            }
            50% {
                transform: translateY(-5px);
            }
        }
        
        @keyframes fadeIn {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
        }
        
        /* Notification styles */
        .notification {
            position: fixed;
            top: 100px;
            right: 20px;
            background: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
            display: flex;
            align-items: center;
            gap: 12px;
            z-index: 9999;
            transform: translateX(120%);
            transition: transform 0.3s ease;
            border-left: 4px solid #4f46e5;
            max-width: 350px;
        }
        
        .notification.show {
            transform: translateX(0);
        }
        
        .notification.success {
            border-left-color: #10b981;
        }
        
        .notification.error {
            border-left-color: #ef4444;
        }
        
        .notification i {
            font-size: 1.2rem;
        }
        
        .notification.success i {
            color: #10b981;
        }
        
        .notification.error i {
            color: #ef4444;
        }
        
        .notification span {
            flex: 1;
            font-size: 0.9rem;
        }
        
        .notification-close {
            background: none;
            border: none;
            color: #6b7280;
            cursor: pointer;
            padding: 5px;
            border-radius: 4px;
            transition: background 0.3s ease;
        }
        
        .notification-close:hover {
            background: #f3f4f6;
        }
        
        /* Load animation */
        body.loaded .hero-content {
            animation: fadeIn 1s ease;
        }
        
        /* Animated elements */
        .project-card, .skill-category, .stat-card, .contact-item {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .project-card.animated, .skill-category.animated, 
        .stat-card.animated, .contact-item.animated {
            opacity: 1;
            transform: translateY(0);
        }
        
        /* Active nav link */
        .nav-links a.active {
            color: #4f46e5;
            font-weight: 600;
        }
        
        .nav-links a.active::after {
            width: 100%;
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
            width: 10px;
        }
        
        ::-webkit-scrollbar-track {
            background: #f1f1f1;
        }
        
        ::-webkit-scrollbar-thumb {
            background: #c1c1c1;
            border-radius: 5px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
            background: #a1a1a1;
        }
    `;
    
    document.head.appendChild(style);
});

// ========== WINDOW RESIZE HANDLER ==========
window.addEventListener('resize', function() {
    const navLinks = document.querySelector('.nav-links');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    
    // Close mobile menu on larger screens
    if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        mobileMenuBtn.querySelector('i').classList.add('fa-bars');
        mobileMenuBtn.querySelector('i').classList.remove('fa-times');
    }
});

// ========== KEYBOARD SHORTCUTS ==========
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + K to focus search (if implemented)
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        console.log('Search shortcut activated');
    }
    
    // Escape to close mobile menu
    if (e.key === 'Escape') {
        const navLinks = document.querySelector('.nav-links');
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
            mobileMenuBtn.querySelector('i').classList.add('fa-bars');
            mobileMenuBtn.querySelector('i').classList.remove('fa-times');
        }
    }
});

// ========== PAGE VISIBILITY API ==========
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        console.log('Portfolio tab is inactive');
    } else {
        console.log('Portfolio tab is active');
    }
});