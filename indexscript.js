// indexscript.js - JavaScript for landing page functionality

document.addEventListener('DOMContentLoaded', function() {
    // 1. Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // 2. Mobile navigation toggle
    const navToggle = document.querySelector('.nav-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
    
    // 2a. Single accordion toggle
    const accordionBtn = document.querySelector('.accordion-read-more-btn');
    const accordionContent = document.querySelector('.accordion-content');
    
    if (accordionBtn) {
        accordionBtn.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent event from bubbling up
            const isExpanding = !this.classList.contains('active');
            
            this.classList.toggle('active');
            accordionContent.classList.toggle('active');
            
            // Change button text
            const btnText = this.querySelector('.btn-text');
            if (btnText) {
                btnText.textContent = isExpanding ? 'Show Less' : 'Read More';
            }
            
            // Smooth scroll to accordion when expanding
            if (isExpanding) {
                setTimeout(() => {
                    const accordionContainer = document.querySelector('.single-accordion-container');
                    if (accordionContainer) {
                        const headerHeight = document.querySelector('.main-header').offsetHeight;
                        const containerPosition = accordionContainer.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                        
                        window.scrollTo({
                            top: containerPosition,
                            behavior: 'smooth'
                        });
                    }
                }, 300);
            }
        });
    }
    
    // 3. Hero background image rotation
    const heroImages = document.querySelectorAll('.hero-bg-image');
    let currentImageIndex = 0;
    
    if (heroImages.length > 1) {
        // NOTE: If using the pure CSS slideshow from previous steps, this JavaScript block
        // (the setInterval part) is redundant and can be removed, but kept here for now.
        setInterval(() => {
            heroImages.forEach(img => img.classList.remove('active'));
            currentImageIndex = (currentImageIndex + 1) % heroImages.length;
            heroImages[currentImageIndex].classList.add('active');
        }, 5000);
    }
    
    // 4. TOC highlight on scroll (Desktop only)
    const sections = document.querySelectorAll('section[id]');
    const tocLinks = document.querySelectorAll('.toc-link');
    
    function highlightTocLink() {
        // Only run on desktop (≥993px)
        if (window.innerWidth < 993) return;
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        tocLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', highlightTocLink);
    highlightTocLink(); // Initial highlight
    
    // 5. TOC link smooth scrolling (Desktop only)
    tocLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only prevent default and smooth scroll on desktop
            if (window.innerWidth >= 993) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const headerHeight = document.querySelector('.main-header').offsetHeight;
                    const targetPosition = targetSection.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Update TOC highlight
                    document.querySelectorAll('.toc-link').forEach(l => l.classList.remove('active'));
                    this.classList.add('active');
                }
            }
        });
    });
    
    // 6. Google Form buttons (all 3 buttons)
    const formButtons = [
        'openGoogleFormHero',
        'openGoogleFormContact',
        'openGoogleFormSidebar'
    ];
    
    formButtons.forEach(id => {
        const button = document.getElementById(id);
        if (button) {
            button.addEventListener('click', () => {
                window.open('https://forms.gle/63FyUTMUnLJHX1UZ9', '_blank');
            });
        }
    });
    
    // 7. Modal functionality
    const modal = document.getElementById('infoModal');
    const modalTitle = document.querySelector('.modal-title');
    const modalBody = document.querySelector('.modal-body');
    const modalClose = document.querySelector('.modal-close');
    
    // Function to open modal with content
    window.openModal = function(title, content) {
        if (modalTitle) modalTitle.textContent = title;
        if (modalBody) modalBody.innerHTML = content;
        if (modal) modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };
    
    // Close modal
    if (modalClose) {
        modalClose.addEventListener('click', () => {
            if (modal) modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }
    
    // Close modal on overlay click
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal || e.target.classList.contains('modal-overlay')) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // =================================================================
    // 8. CORRECTED: Beaming CTA visibility control (Replaces old sections 8, 11, 12)
    // The CTA will appear after scrolling past a threshold. Visibility and width
    // are now handled purely by the 'visible' class in your CSS.
    // =================================================================
    const beamingCtaBtn = document.getElementById('openGoogleFormSidebar');
    // Adjust this value (in pixels) to determine how far down the user must scroll before the CTA appears.
    const scrollThreshold = 500; 

    function checkCtaVisibility() {
        if (!beamingCtaBtn) return; 

        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

        if (currentScroll > scrollThreshold) {
            // Show the CTA
            beamingCtaBtn.classList.add('visible');
        } else {
            // Hide the CTA
            beamingCtaBtn.classList.remove('visible');
        }
    }

    // Attach the listener and run once on load
    window.addEventListener('scroll', checkCtaVisibility);
    checkCtaVisibility(); 
    
    // 9. Mobile navigation close on link click (Re-numbered)
    const navLinks = document.querySelectorAll('.main-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 992) {
                mainNav.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    });
    
    // 10. Close dropdowns when clicking outside (Re-numbered)
    document.addEventListener('click', (e) => {
        // Close accordion when clicking outside (optional)
        if (accordionBtn && accordionContent && 
            !e.target.closest('.single-accordion-container') && 
            !e.target.closest('.accordion-read-more-btn') &&
            accordionContent.classList.contains('active')) {
            accordionBtn.classList.remove('active');
            accordionContent.classList.remove('active');
            const btnText = accordionBtn.querySelector('.btn-text');
            if (btnText) btnText.textContent = 'Read More';
        }
        
        // Close mobile nav when clicking outside
        if (window.innerWidth <= 992 && 
            !e.target.closest('.main-nav') && 
            !e.target.closest('.nav-toggle') &&
            mainNav.classList.contains('active')) {
            mainNav.classList.remove('active');
            navToggle.classList.remove('active');
        }
        
        // Close Mobile TOC when clicking outside
        const mobileTocNav = document.querySelector('.mobile-toc-nav');
        const tocToggleBtn = document.querySelector('.toc-toggle-btn');
        const tocList = document.querySelector('.toc-list');
        
        if (mobileTocNav && tocToggleBtn && tocList && 
            !e.target.closest('.mobile-toc-nav') &&
            tocList.classList.contains('active')) {
            
            tocList.classList.remove('active');
            tocToggleBtn.setAttribute('aria-expanded', 'false');
        }
    });
    
    // 11. Smooth scrolling for anchor links (Re-numbered)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                e.preventDefault();
                const headerHeight = document.querySelector('.main-header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile nav if open
                if (window.innerWidth <= 992 && mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    navToggle.classList.remove('active');
                }
                
                // Close Mobile TOC if open
                const tocList = document.querySelector('.toc-list');
                const tocToggleBtn = document.querySelector('.toc-toggle-btn');
                if (window.innerWidth <= 768 && tocList && tocList.classList.contains('active')) {
                    tocList.classList.remove('active');
                    if (tocToggleBtn) tocToggleBtn.setAttribute('aria-expanded', 'false');
                }
            }
        });
    });
    
    // 12. Auto-open accordion on page load if URL has hash #nuclear-power (Re-numbered)
    if (window.location.hash === '#nuclear-power' && accordionBtn && accordionContent) {
        setTimeout(() => {
            accordionBtn.classList.add('active');
            accordionContent.classList.add('active');
            const btnText = accordionBtn.querySelector('.btn-text');
            if (btnText) btnText.textContent = 'Show Less';
            
            // Scroll to the accordion
            const accordionContainer = document.querySelector('.single-accordion-container');
            if (accordionContainer) {
                const headerHeight = document.querySelector('.main-header').offsetHeight;
                const containerPosition = accordionContainer.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                
                setTimeout(() => {
                    window.scrollTo({
                        top: containerPosition,
                        behavior: 'smooth'
                    });
                }, 100);
            }
        }, 500);
    }
    
    // 13. Keyboard navigation for accordion (Re-numbered)
    if (accordionBtn) {
        accordionBtn.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    }

    // 14. Mobile Table of Contents (TOC) Toggle (NEW)
    const tocToggleBtn = document.querySelector('.toc-toggle-btn');
    const tocList = document.querySelector('.toc-list');
    
    if (tocToggleBtn && tocList) {
        tocToggleBtn.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true' || false;
            
            // Toggle the active class for visual state change (via CSS transition/display)
            tocList.classList.toggle('active');
            
            // Update aria attributes for accessibility
            this.setAttribute('aria-expanded', !isExpanded);
        });
        
        // Optional: Close TOC after a link is clicked (improves mobile UX)
        const tocLinks = tocList.querySelectorAll('a');
        tocLinks.forEach(link => {
            link.addEventListener('click', () => {
                // Ensure the closing logic is only executed if it's visible (for safety)
                if (window.innerWidth <= 768 && tocList.classList.contains('active')) {
                    tocList.classList.remove('active');
                    tocToggleBtn.setAttribute('aria-expanded', 'false');
                }
                // Smooth scrolling handled by existing logic (section 11)
            });
        });
    }
});