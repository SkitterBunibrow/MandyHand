// 5 AROS Services LLC - Main JavaScript File

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
            
            // Change icon based on menu state
            const icon = this.querySelector('i');
            if (nav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (nav.classList.contains('active') && 
            !nav.contains(event.target) && 
            !mobileMenuBtn.contains(event.target)) {
            nav.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form submission handling
    const estimateForm = document.getElementById('estimateForm');
    const contactForm = document.getElementById('contactForm');
    
    if (estimateForm) {
        estimateForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your estimate request! Juan Cordova will contact you shortly.');
            this.reset();
        });
    }
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you as soon as possible.');
            this.reset();
        });
    }
    
    // Add active class to navigation links based on scroll position
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop - document.querySelector('header').offsetHeight - 50;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                document.querySelectorAll('nav ul li a').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
    
    // Add animation on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.service-card, .job-item, .contact-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animate');
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on page load
    
    // Add CSS class for animation
    const style = document.createElement('style');
    style.textContent = `
        .service-card, .job-item, .contact-card {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.5s ease, transform 0.5s ease;
        }
        
        .service-card.animate, .job-item.animate, .contact-card.animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        .service-card:nth-child(2), .job-item:nth-child(2), .contact-card:nth-child(2) {
            transition-delay: 0.1s;
        }
        
        .service-card:nth-child(3), .job-item:nth-child(3), .contact-card:nth-child(3) {
            transition-delay: 0.2s;
        }
        
        .service-card:nth-child(4), .job-item:nth-child(4), .contact-card:nth-child(4) {
            transition-delay: 0.3s;
        }
        
        .service-card:nth-child(5), .job-item:nth-child(5) {
            transition-delay: 0.4s;
        }
        
        .service-card:nth-child(6), .job-item:nth-child(6) {
            transition-delay: 0.5s;
        }
        
        nav ul li a.active {
            color: var(--secondary-color);
        }
        
        nav ul li a.active::after {
            width: 100%;
        }
    `;
    document.head.appendChild(style);
});
