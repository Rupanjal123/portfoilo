// script.js

document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#home') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    // Adjust scroll position to account for sticky header
                    const headerOffset = document.querySelector('.header').offsetHeight;
                    const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                    const offsetPosition = elementPosition - headerOffset - 20; // Added extra padding

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }

            // Close mobile menu if open
            const navLinks = document.querySelector('.nav-links');
            const menuToggle = document.getElementById('mobile-menu');
            if (navLinks.classList.contains('open')) {
                navLinks.classList.remove('open');
                menuToggle.classList.remove('open');
            }
        });
    });

    // Mobile menu toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('open');
            mobileMenu.classList.toggle('open');
        });
    }

    // Add 'active' class to current section in navigation
    const sections = document.querySelectorAll('section');
    const navLi = document.querySelectorAll('.nav-links li a');

    const setActiveLink = () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - document.querySelector('.header').offsetHeight;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLi.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href').includes(current)) {
                a.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', setActiveLink);
    setActiveLink(); // Call on load to set initial active link

    // Fade-in sections on scroll (Intersection Observer)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2 // Trigger when 20% of the section is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Stop observing once visible
            }
        });
    }, observerOptions);

    document.querySelectorAll('.section-fade').forEach(section => {
        observer.observe(section);
    });

    // Simple typing effect for the home section (optional)
    const homeTextElement = document.querySelector('.home p span'); // You'll need to wrap part of your P tag in a span
    // For now, let's target the existing P tag for simplicity, or modify HTML if you want specific words
    const homeParagraph = document.querySelector('.home p');
    if (homeParagraph) {
        const originalText = homeParagraph.textContent;
        homeParagraph.textContent = ''; // Clear text to start typing
        let i = 0;
        function typeWriter() {
            if (i < originalText.length) {
                homeParagraph.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 50); // Adjust typing speed here
            }
        }
        // Disabled typing effect for now as it's often more complex to implement cleanly without affecting accessibility.
        // If you want a specific "typing effect", consider a library or more targeted JS for titles.
        // typeWriter();
    }
});
