// DOM Elements
const navbar = document.getElementById('navbar');
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');
const sections = document.querySelectorAll('section');
const scrollReveals = document.querySelectorAll('.scroll-reveal');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeLightbox = document.querySelector('.close-lightbox');
const galleryItems = document.querySelectorAll('.gallery-item img');

// Sticky Header
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('sticky');
    } else {
        navbar.classList.remove('sticky');
    }
});

// Mobile Menu Toggle
mobileMenu.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    if (navLinks.style.display === 'flex') {
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '70px';
        navLinks.style.right = '0';
        navLinks.style.background = '#0d0d12';
        navLinks.style.width = '100%';
        navLinks.style.padding = '20px';
        navLinks.style.textAlign = 'center';
    }
});

// Scroll Reveal Animation (Intersection Observer)
const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const revealOnScroll = new IntersectionObserver(function(entries, revealOnScroll) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add('active');
            revealOnScroll.unobserve(entry.target);
        }
    });
}, revealOptions);

scrollReveals.forEach(reveal => {
    revealOnScroll.observe(reveal);
});

// Lightbox Functionality
galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const src = item.getAttribute('src');
        lightboxImg.setAttribute('src', src);
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Disable scroll
    });
});

closeLightbox.addEventListener('click', () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto'; // Enable scroll
});

lightbox.addEventListener('click', (e) => {
    if (e.target !== lightboxImg) {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Smooth Scrolling for Anchors (Optional fallback if CSS smooth-scroll fails)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            // Close mobile menu if open
            if (window.innerWidth <= 768) {
                navLinks.style.display = 'none';
            }
            
            window.scrollTo({
                top: targetSection.offsetTop - 80, // Offset for sticky header
                behavior: 'smooth'
            });
        }
    });
});
