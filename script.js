document.addEventListener('DOMContentLoaded', () => {
    // 1. 注入动态光晕背景
    const bgContainer = document.createElement('div');
    bgContainer.className = 'bg-blobs';
    bgContainer.innerHTML = `
        <div class="blob blob-1"></div>
        <div class="blob blob-2"></div>
    `;
    document.body.prepend(bgContainer);

    // 2. 为关键元素添加滚动入场动画的类名
    const animateElements = document.querySelectorAll(
        '.hero, .card, .portrait-card, .project, .paper, .essay-card, .news-item, .section-title'
    );
    
    animateElements.forEach(el => {
        el.classList.add('animate-on-scroll');
    });

    // 为 grid 容器加上交错动画的辅助类
    const gridContainers = document.querySelectorAll('.project-grid, .paper-grid, .essay-grid, .simple-grid, .quick-facts, .news-list');
    gridContainers.forEach(container => {
        container.classList.add('grid-stagger');
    });

    // 3. 设置 IntersectionObserver 监听元素滚动进入视口
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // 可选：动画完成后停止监听该元素
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animateElements.forEach(el => {
        observer.observe(el);
    });
});
