// Mobile Menu Functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileBreakpoint = 1199;

    // Get elements
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navbarBackdrop = document.createElement('div');
    const dropdownToggles = document.querySelectorAll('.nav-link.dropdown-toggle');

    if (!navbarToggler || !navbarCollapse) {
        return;
    }
    
    // Add backdrop element for mobile
    navbarBackdrop.className = 'navbar-backdrop';
    document.body.appendChild(navbarBackdrop);

    // Toggle mobile menu
    navbarToggler.addEventListener('click', function() {
        this.classList.toggle('active');
        navbarCollapse.classList.toggle('show');
        navbarBackdrop.classList.toggle('show');
        this.setAttribute('aria-expanded', navbarCollapse.classList.contains('show') ? 'true' : 'false');
        document.body.style.overflow = navbarCollapse.classList.contains('show') ? 'hidden' : '';
    });

    // Close menu when clicking backdrop
    navbarBackdrop.addEventListener('click', function() {
        navbarToggler.classList.remove('active');
        navbarCollapse.classList.remove('show');
        this.classList.remove('show');
        document.body.style.overflow = '';
        
        // Close all dropdowns
        dropdownToggles.forEach(toggle => {
            const dropdownMenu = toggle.nextElementSibling;
            if (dropdownMenu && dropdownMenu.classList.contains('dropdown-menu')) {
                dropdownMenu.classList.remove('show');
            }
        });
    });

    // Handle dropdown toggles on mobile
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            const dropdownMenu = this.nextElementSibling;

            if (!dropdownMenu || !dropdownMenu.classList.contains('dropdown-menu')) {
                return;
            }

            // Close other dropdowns first so only one is open at a time.
            dropdownToggles.forEach(otherToggle => {
                if (otherToggle !== this) {
                    const otherMenu = otherToggle.nextElementSibling;
                    if (otherMenu && otherMenu.classList.contains('dropdown-menu')) {
                        otherMenu.classList.remove('show');
                    }
                }
            });

            // Toggle the current dropdown on both desktop and mobile.
            dropdownMenu.classList.toggle('show');

            if (window.innerWidth <= mobileBreakpoint && navbarCollapse.classList.contains('show')) {
                navbarBackdrop.classList.add('show');
            }
        });
    });

    // Close dropdowns when clicking outside on desktop
    document.addEventListener('click', function(e) {
        if (window.innerWidth > mobileBreakpoint) {
            const isDropdown = e.target.closest('.dropdown');
            if (!isDropdown) {
                document.querySelectorAll('.dropdown-menu').forEach(menu => {
                    menu.classList.remove('show');
                });
            }
        }
    });

    // Handle dropdown hover on desktop
    if (window.innerWidth > mobileBreakpoint) {
        document.querySelectorAll('.dropdown').forEach(dropdown => {
            dropdown.addEventListener('mouseenter', function() {
                this.querySelector('.dropdown-menu').classList.add('show');
            });
            
            dropdown.addEventListener('mouseleave', function() {
                this.querySelector('.dropdown-menu').classList.remove('show');
            });
        });
    }

    // Sticky navbar on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.custom-navbar');
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Close mobile menu when clicking on a nav link (except dropdown toggles)
    document.querySelectorAll('.nav-link:not(.dropdown-toggle)').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= mobileBreakpoint) {
                navbarToggler.classList.remove('active');
                navbarCollapse.classList.remove('show');
                navbarBackdrop.classList.remove('show');
                navbarToggler.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });
    });

    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > mobileBreakpoint) {
            // Reset mobile menu state
            navbarToggler.classList.remove('active');
            navbarCollapse.classList.remove('show');
            navbarBackdrop.classList.remove('show');
            navbarToggler.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
            
            // Close all dropdowns
            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                menu.classList.remove('show');
            });
        }
    });

    // Escape key to close mobile menu
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (window.innerWidth <= mobileBreakpoint && navbarCollapse.classList.contains('show')) {
                navbarToggler.classList.remove('active');
                navbarCollapse.classList.remove('show');
                navbarBackdrop.classList.remove('show');
                navbarToggler.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        }
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        if (this.classList.contains('dropdown-toggle')) {
            return;
        }

        const href = this.getAttribute('href');
        if (!href || href === '#') {
            return;
        }

        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add loading animation to buttons
document.querySelectorAll('.btn-quote').forEach(button => {
    button.addEventListener('click', function(e) {
        if (!this.classList.contains('loading')) {
            this.classList.add('loading');
            this.innerHTML = '<span>Loading...</span>';
            
            // Remove loading state after 2 seconds (for demo)
            setTimeout(() => {
                this.classList.remove('loading');
                this.innerHTML = 'Get A Quote';
            }, 2000);
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all elements with fade-in class
document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});



// Get popup and close button
window.addEventListener('load', () => {
    const popup = document.getElementById('popup');
    if (popup) {
        popup.style.display = 'flex';
    }
});

const closePopup = document.getElementById('closePopup');
if (closePopup) {
    closePopup.addEventListener('click', () => {
        const popup = document.getElementById('popup');
        if (popup) {
            popup.style.display = 'none';
        }
    });
}
