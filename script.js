document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });

            // Close mobile menu after clicking
            const navToggle = document.querySelector('.nav-toggle');
            const mainNav = document.querySelector('.main-nav');
            if (navToggle.classList.contains('active')) {
                mainNav.classList.remove('nav-open');
                navToggle.classList.remove('active');
            }
        });
    });

    // Toggle for mobile navigation
    const navToggle = document.querySelector('.nav-toggle');
    const mainNav = document.querySelector('.main-nav');

    navToggle.addEventListener('click', () => {
        mainNav.classList.toggle('nav-open');
        navToggle.classList.toggle('active'); // Add/remove active class for hamburger animation
    });

    // Google Form button functionality for the "Fill the Form" button in the hero section
    const openGoogleFormHeroBtn = document.getElementById('openGoogleFormHero');
    if (openGoogleFormHeroBtn) {
        openGoogleFormHeroBtn.addEventListener('click', () => {
            window.open('https://docs.google.com/forms/d/e/1FAIpQLSeZasVw2968xb_U4mPITf0b6_nmMokcYvG--f_OypvByxrBCQ/viewform?usp=dialog', '_blank');
        });
    }

    // Google Form button functionality for the "Open Study Inquiry Form" button in the contact section
    const openGoogleFormContactBtn = document.getElementById('openGoogleFormContact');
    if (openGoogleFormContactBtn) {
        openGoogleFormContactBtn.addEventListener('click', () => {
            window.open('https://docs.google.com/forms/d/e/1FAIpQLSeZasVw2968xb_U4mPITf0b6_nmMokcYvG--f_OypvByxrBCQ/viewform?usp=dialog', '_blank');
        });
    }

    // Google Form button functionality for the sidebar CTA
    const openGoogleFormSidebarBtn = document.getElementById('openGoogleFormSidebar');
    if (openGoogleFormSidebarBtn) {
        openGoogleFormSidebarBtn.addEventListener('click', () => {
            window.open('https://docs.google.com/forms/d/e/1FAIpQLSeZasVw2968xb_U4mPITf0b6_nmMokcYvG--f_OypvByxrBCQ/viewform?usp=dialog', '_blank');
        });
    }

    // "Explore Opportunities" button functionality (from index.html)
    const exploreOpportunitiesBtn = document.getElementById('exploreOpportunitiesBtn');
    if (exploreOpportunitiesBtn) {
        exploreOpportunitiesBtn.addEventListener('click', function() {
            window.location.href = 'supply-chain.html';
        });
    }

    // "About This Study" button functionality (from index.html) - scrolls to the top of the page (home section)
    const aboutStudyBtn = document.getElementById('aboutStudyBtn');
    if (aboutStudyBtn) {
        aboutStudyBtn.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default link behavior
            // Check if on index.html, then scroll to #home, otherwise go to index.html#home
            if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
                document.querySelector('#home').scrollIntoView({
                    behavior: 'smooth'
                });
            } else {
                window.location.href = 'index.html#home';
            }
        });
    }

    // Set current year in footer
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Optional: Add a class to header on scroll for subtle design change
    const header = document.querySelector('.main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Background image cycling for the hero section (only on index.html)
    const heroMediaPlaceholder = document.querySelector('.hero-media-placeholder');
    if (heroMediaPlaceholder) { // Only run if hero-media-placeholder exists (i.e., on index.html)
        const bgImages = heroMediaPlaceholder.querySelectorAll('.hero-bg-image');
        let currentImageIndex = 0;

        // Ensure the first image is active on load
        if (bgImages.length > 0) {
            bgImages[currentImageIndex].classList.add('active');
        }

        function changeBackgroundImage() {
            // Remove 'active' class from current image
            bgImages[currentImageIndex].classList.remove('active');

            // Increment index, reset if at the end
            currentImageIndex = (currentImageIndex + 1) % bgImages.length;

            // Add 'active' class to the next image
            bgImages[currentImageIndex].classList.add('active');
        }

        // Change image every 7 seconds (7000 milliseconds)
        setInterval(changeBackgroundImage, 7000);
    }


    // Dynamic Static Table of Contents Logic
    const staticTocList = document.getElementById('static-toc-list');
    let sections;

    // Determine sections based on the current page
    // Using window.location.pathname to check the current file
    if (window.location.pathname.includes('supply-chain.html')) {
        sections = document.querySelectorAll('.main-content h2[id]'); // Target h2 elements with an ID
    } else if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
        sections = document.querySelectorAll('.main-content h2[id]'); // Target h2 elements with an ID (Understanding, Kenya's Journey, Contact)
    }


    if (staticTocList && sections.length > 0) { // This condition will now be false for index.html's static sidebar
        // Populate the static TOC
        sections.forEach(section => {
            const listItem = document.createElement('li');
            const link = document.createElement('a');
            link.href = `#${section.id}`;
            // For supply-chain.html, extract title before ':'
            if (window.location.pathname.includes('supply-chain.html')) {
                link.textContent = section.textContent.split(': ')[0];
            } else {
                link.textContent = section.textContent; // For index.html, use full H2 text
            }


            // Smooth scroll for static TOC links
            link.addEventListener('click', function(e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });

            listItem.appendChild(link);
            staticTocList.appendChild(listItem);
        });

        // Function to update the active link
        const updateActiveTocLink = () => {
            let currentActive = null;
            // Iterate sections in reverse to find the closest one from the top of the viewport
            for (let i = sections.length - 1; i >= 0; i--) {
                const section = sections[i];
                const rect = section.getBoundingClientRect();
                // If the section's top is visible or slightly above the viewport
                // Adjust 100px for header height and some scroll margin
                if (rect.top <= window.innerHeight / 3 && rect.bottom >= 0) {
                    currentActive = section.id;
                    break;
                }
            }

            // Remove active class from all links
            document.querySelectorAll('#static-toc-list a').forEach(link => {
                link.classList.remove('active');
            });

            // Add active class to the current section's link
            if (currentActive) {
                const activeLink = document.querySelector(`#static-toc-list a[href="#${currentActive}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        };

        // Event listeners for scroll and load
        window.addEventListener('scroll', updateActiveTocLink);
        window.addEventListener('load', updateActiveTocLink); // Set initial active link on load
    }
});