document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll(
        '.hero, .portrait-card, .project, .paper, .essay-card, .news-item, .section-title'
    );
    
    animateElements.forEach(el => {
        el.classList.add('animate-on-scroll');
    });

    const gridContainers = document.querySelectorAll('.project-grid, .paper-grid, .essay-grid, .simple-grid, .quick-facts, .news-list');
    gridContainers.forEach(container => {
        container.classList.add('grid-stagger');
    });

    if (!('IntersectionObserver' in window)) {
        animateElements.forEach(el => el.classList.add('visible'));
        return;
    }

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -10px 0px',
        threshold: 0.04
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animateElements.forEach(el => {
        observer.observe(el);
    });
});
