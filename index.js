document.addEventListener("DOMContentLoaded", function () {
    const mobileMenu = document.getElementById("mobile-menu");
    const navLinks = document.querySelector(".nav-links");

    
    mobileMenu.addEventListener("click", function () {
        navLinks.classList.toggle("open");
        mobileMenu.classList.toggle("open");
    });

    
    const navItems = document.querySelectorAll(".nav-links a");
    navItems.forEach(link => {
        link.addEventListener("click", () => {
            navItems.forEach(item => item.classList.remove("active"));
            link.classList.add("active");

            // Close menu on mobile click
            if (navLinks.classList.contains("open")) {
                navLinks.classList.remove("open");
                mobileMenu.classList.remove("open");
            }
        });
    });

    // Fade-in on scroll for section-fade
    const sections = document.querySelectorAll(".section-fade");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target); // optional: remove after first time
            }
        });
    }, {
        threshold: 0.15
    });

    sections.forEach(section => {
        observer.observe(section);
    });
});
