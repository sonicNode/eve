// Splash Screen
const splashScreen = document.getElementById('splashScreen');
const mainContent = document.getElementById('mainContent');

// Prevent body scroll during splash screen
if (splashScreen) {
    document.body.classList.add('splash-active');
}

// Hide splash screen and show main content after delay
window.addEventListener('load', () => {
    // Wait for splash screen animation (2 seconds for loader + fade)
    setTimeout(() => {
        if (splashScreen) {
            splashScreen.classList.add('hidden');
        }
        if (mainContent) {
            mainContent.classList.add('visible');
        }
        // Remove splash screen from DOM and enable scrolling after transition
        setTimeout(() => {
            if (splashScreen) {
                splashScreen.style.display = 'none';
            }
            document.body.classList.remove('splash-active');
        }, 800); // Match transition duration
    }, 2500); // Total splash screen duration (2.5 seconds)
});

// Mobile menu toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            }
        }
    });
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });
}

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe feature cards
document.querySelectorAll('.feature-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Observe pricing cards
document.querySelectorAll('.pricing-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Add active state to nav links on scroll
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-menu a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Video scroll synchronization
const heroVideo = document.getElementById('heroVideo');
const heroSection = document.getElementById('home');

if (heroVideo && heroSection) {
    // Ensure video doesn't autoplay - it will only seek based on scroll
    heroVideo.pause();
    
    // Load video metadata and set to start
    heroVideo.addEventListener('loadedmetadata', () => {
        // Set initial video position to start
        heroVideo.currentTime = 0;
        heroVideo.pause(); // Ensure it stays paused
    });

    // Sync video with scroll position
    function syncVideoWithScroll() {
        if (!heroVideo.duration) return; // Wait for video to load
        
        // Keep video paused - we only want to seek, not play
        if (!heroVideo.paused) {
            heroVideo.pause();
        }
        
        const heroSectionTop = heroSection.offsetTop;
        const heroSectionHeight = heroSection.offsetHeight;
        const windowHeight = window.innerHeight;
        const scrollPosition = window.pageYOffset;
        
        // Calculate scroll progress within hero section
        // Video syncs from when hero section enters viewport to when it exits
        const heroStart = heroSectionTop - windowHeight;
        const heroEnd = heroSectionTop + heroSectionHeight;
        const scrollRange = heroEnd - heroStart;
        
        // Calculate scroll progress (0 to 1)
        let scrollProgress = (scrollPosition - heroStart) / scrollRange;
        
        // Clamp progress between 0 and 1
        scrollProgress = Math.max(0, Math.min(1, scrollProgress));
        
        // Map scroll progress to video time (0 to video duration)
        // At top of page (scrollProgress = 0), video is at start (currentTime = 0)
        // As we scroll down, video seeks forward
        const targetTime = scrollProgress * heroVideo.duration;
        
        // Update video time based on scroll position
        // Use a smaller threshold for smoother scrubbing
        if (Math.abs(heroVideo.currentTime - targetTime) > 0.05) {
            heroVideo.currentTime = targetTime;
        }
    }

    // Throttled scroll handler for smooth video scrubbing
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                syncVideoWithScroll();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Initial sync on page load - set video to start
    window.addEventListener('load', () => {
        heroVideo.currentTime = 0;
        heroVideo.pause();
        syncVideoWithScroll();
    });

    // Also sync when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            heroVideo.currentTime = 0;
            heroVideo.pause();
        });
    } else {
        heroVideo.currentTime = 0;
        heroVideo.pause();
    }

    // Prevent video from playing - only allow seeking
    heroVideo.addEventListener('play', () => {
        heroVideo.pause();
    });

    // Ensure video stays paused when seeking
    heroVideo.addEventListener('seeked', () => {
        if (!heroVideo.paused) {
            heroVideo.pause();
        }
    });
}


