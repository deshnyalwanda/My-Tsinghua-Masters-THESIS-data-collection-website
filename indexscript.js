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
                window.open('https://docs.google.com/forms/d/e/1FAIpQLSf5ipXZmeUTUHt-QQRhgRwPnZe-1EOgLeMNb2p2x0m8yVhKUw/viewform?usp=dialog', '_blank');
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
    
    // 8. Mobile-specific adjustments for CTA
    function adjustForMobile() {
        const beamingCta = document.querySelector('.beaming-cta');
        const staticTocSidebar = document.querySelector('.static-toc-sidebar');
        
        if (window.innerWidth <= 992) {
            // Mobile: Hide TOC sidebar completely
            if (staticTocSidebar) {
                staticTocSidebar.style.display = 'none';
            }
            // Ensure CTA is fixed position on mobile
            if (beamingCta) {
                beamingCta.style.position = 'fixed';
                beamingCta.style.bottom = '20px';
                beamingCta.style.right = '20px';
                beamingCta.style.zIndex = '1000';
                beamingCta.style.display = 'block';
            }
        } else {
            // Desktop: Show TOC with CTA inside
            if (staticTocSidebar) {
                staticTocSidebar.style.display = 'block';
            }
            // Reset CTA styles for desktop
            if (beamingCta) {
                beamingCta.style.position = 'static';
                beamingCta.style.bottom = '';
                beamingCta.style.right = '';
                beamingCta.style.zIndex = '';
            }
        }
    }
    
    // Run on load and resize
    adjustForMobile();
    window.addEventListener('resize', adjustForMobile);
    
    // 9. Mobile navigation close on link click
    const navLinks = document.querySelectorAll('.main-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 992) {
                mainNav.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    });
    
    // 10. Close dropdowns when clicking outside
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
    });
    
    // 11. Handle mobile CTA visibility on scroll
    let lastScroll = 0;
    let beamingCtaVisible = true;
    const beamingCta = document.querySelector('.beaming-cta');
    
    if (beamingCta && window.innerWidth <= 992) {
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            const scrollDirection = currentScroll > lastScroll ? 'down' : 'up';
            const scrollDelta = Math.abs(currentScroll - lastScroll);
            
            // Only hide/show if scrolling significantly
            if (scrollDelta > 50) {
                if (scrollDirection === 'down' && beamingCtaVisible) {
                    // Hide on scroll down
                    beamingCta.style.transform = 'translateY(100px)';
                    beamingCta.style.opacity = '0';
                    beamingCtaVisible = false;
                } else if (scrollDirection === 'up' && !beamingCtaVisible) {
                    // Show on scroll up
                    beamingCta.style.transform = 'translateY(0)';
                    beamingCta.style.opacity = '1';
                    beamingCtaVisible = true;
                }
            }
            
            lastScroll = currentScroll;
        });
    }
    
    // 12. Adjust mobile CTA for smallest screens
    function adjustMobileCtaSize() {
        const beamingCta = document.querySelector('.beaming-cta');
        if (!beamingCta || window.innerWidth > 992) return;
        
        if (window.innerWidth <= 480) {
            beamingCta.style.width = '160px';
            beamingCta.style.bottom = '15px';
            beamingCta.style.right = '15px';
            beamingCta.style.padding = '12px';
        } else {
            beamingCta.style.width = '180px';
            beamingCta.style.bottom = '20px';
            beamingCta.style.right = '20px';
            beamingCta.style.padding = '15px';
        }
    }
    
    adjustMobileCtaSize();
    window.addEventListener('resize', adjustMobileCtaSize);
    
    // 13. Smooth scrolling for anchor links
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
            }
        });
    });
    
    // 14. Auto-open accordion on page load if URL has hash #nuclear-power
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
    
    // 15. Keyboard navigation for accordion
    if (accordionBtn) {
        accordionBtn.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    }
});