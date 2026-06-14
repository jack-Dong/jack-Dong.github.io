document.addEventListener('DOMContentLoaded', () => {
    document.documentElement.classList.add('page-ready');

    const animateElements = document.querySelectorAll(
        '.project-intro, .project-case, #about .card, .paper, .essay-card, .news-item, .section-title'
    );
    
    animateElements.forEach(el => {
        el.classList.add('animate-on-scroll');
    });

    const gridContainers = document.querySelectorAll('.project-list, .paper-grid, .essay-grid, .simple-grid, .quick-facts, .news-list');
    gridContainers.forEach(container => {
        container.classList.add('grid-stagger');
    });

    document.querySelectorAll('.project-case').forEach((project, projectIndex) => {
        project.style.setProperty('--reveal-order', projectIndex);

        project.querySelectorAll('.outcome, .story-cell').forEach((item, itemIndex) => {
            item.style.setProperty('--item-order', itemIndex);
        });
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
