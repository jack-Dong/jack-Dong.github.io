document.addEventListener('DOMContentLoaded', () => {
    document.documentElement.classList.add('page-ready');

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const hoverCapable = window.matchMedia('(hover: hover)');

    /* ---------- 滚动渐入 ---------- */
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
    } else {
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
    }

    /* ---------- 数字滚动计数 ---------- */
    const counters = document.querySelectorAll('.mini-card strong, .outcome strong');

    const parseMetric = text => {
        const match = text.trim().match(/^([^\d]*)([\d.]+)([\s\S]*)$/);
        if (!match) return null;
        return { prefix: match[1], value: parseFloat(match[2]), suffix: match[3] };
    };

    if (!reduceMotion.matches && 'IntersectionObserver' in window) {
        const counterObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                const el = entry.target;
                counterObserver.unobserve(el);

                const data = parseMetric(el.textContent);
                if (!data) return;

                const duration = 1100;
                const start = performance.now();
                const tick = now => {
                    const progress = Math.min((now - start) / duration, 1);
                    const eased = 1 - Math.pow(1 - progress, 3);
                    el.textContent = data.prefix + Math.round(data.value * eased) + data.suffix;
                    if (progress < 1) requestAnimationFrame(tick);
                };
                requestAnimationFrame(tick);
            });
        }, { threshold: 0.6 });

        counters.forEach(el => counterObserver.observe(el));
    }

    /* ---------- 轮播打字 ---------- */
    const typedEl = document.getElementById('typed-text');

    if (typedEl && !reduceMotion.matches) {
        const phrases = [
            '大语言模型训练与偏好对齐',
            '视觉时空建模',
            '端到端辅助驾驶与模型数据',
            '具身智能与世界模型',
            '产业级算法系统交付'
        ];
        let phraseIndex = 0;
        let charIndex = phrases[0].length;
        let deleting = true;

        const step = () => {
            if (deleting) {
                charIndex -= 1;
                if (charIndex <= 0) {
                    deleting = false;
                    phraseIndex = (phraseIndex + 1) % phrases.length;
                }
            } else {
                charIndex += 1;
                if (charIndex >= phrases[phraseIndex].length) {
                    deleting = true;
                    typedEl.textContent = phrases[phraseIndex];
                    setTimeout(step, 2600);
                    return;
                }
            }
            typedEl.textContent = phrases[phraseIndex].slice(0, charIndex);
            setTimeout(step, deleting ? 45 : 95);
        };

        setTimeout(step, 2600);
    }

    /* ---------- 卡片晖光 ---------- */
    if (hoverCapable.matches) {
        document.querySelectorAll('.card, .paper, .essay-card, .project-case, .mini-card, .portrait-card')
            .forEach(card => {
                card.addEventListener('mousemove', e => {
                    const rect = card.getBoundingClientRect();
                    card.style.setProperty('--mx', (e.clientX - rect.left) + 'px');
                    card.style.setProperty('--my', (e.clientY - rect.top) + 'px');
                });
            });
    }

    /* ---------- 顶部滚动进度条 ---------- */
    const progressBar = document.querySelector('.scroll-progress');

    if (progressBar) {
        const updateProgress = () => {
            const max = document.documentElement.scrollHeight - window.innerHeight;
            const ratio = max > 0 ? window.scrollY / max : 0;
            progressBar.style.transform = `scaleX(${ratio})`;
        };
        updateProgress();
        window.addEventListener('scroll', updateProgress, { passive: true });
        window.addEventListener('resize', updateProgress);
    }

    /* ---------- 墨梅树（随风互动） ---------- */
    const treeCanvas = document.getElementById('tree-canvas');

    if (treeCanvas) {
        const tctx = treeCanvas.getContext('2d');
        const tdpr = Math.min(window.devicePixelRatio || 1, 2);
        const MAX_LEVEL = 9;
        let tw = 0;
        let th = 0;
        let inkAlpha = 1;
        let branches = [];
        let tips = [];
        let petals = [];
        let treeRaf = null;
        let time = 0;
        let wind = 0;
        let windTarget = 0;
        let gust = 0;
        let lastMouseX = null;
        const mouse = { x: null, y: null };

        const buildTree = () => {
            tw = window.innerWidth;
            th = window.innerHeight;
            treeCanvas.width = tw * tdpr;
            treeCanvas.height = th * tdpr;
            tctx.setTransform(tdpr, 0, 0, tdpr, 0, 0);
            tctx.lineCap = 'round';

            const small = tw < 760;
            inkAlpha = small ? 0.55 : 1;
            const treeH = Math.min(th * (small ? 0.42 : 0.58), small ? 380 : 560);

            branches = [{
                parent: -1,
                level: 0,
                baseAngle: -Math.PI / 2 - 0.12,
                len: treeH * 0.3,
                phase: Math.random() * Math.PI * 2,
                flex: 0,
                flower: false,
                x: 0, y: 0, ex: 0, ey: 0, abs: 0
            }];
            for (let i = 0; i < branches.length; i++) {
                const b = branches[i];
                if (b.level >= MAX_LEVEL) continue;
                const spread = 0.36 + Math.random() * 0.16;
                for (const dir of [-1, 1]) {
                    const level = b.level + 1;
                    branches.push({
                        parent: i,
                        level,
                        baseAngle: dir * spread * (0.7 + Math.random() * 0.6),
                        len: b.len * (0.68 + Math.random() * 0.12),
                        phase: Math.random() * Math.PI * 2,
                        flex: Math.pow(level / MAX_LEVEL, 1.4),
                        flower: level === MAX_LEVEL && Math.random() < 0.3,
                        x: 0, y: 0, ex: 0, ey: 0, abs: 0
                    });
                }
            }
            tips = branches.filter(b => b.level === MAX_LEVEL);
            petals = [];
        };

        const computeTree = () => {
            const small = tw < 760;
            const rootX = tw * (small ? 0.86 : 0.92);
            const rootY = th + 8;
            const bend = wind + gust;
            for (const b of branches) {
                const sway = Math.sin(time * 0.9 + b.phase) * 0.02 * b.flex + bend * b.flex * 0.5;
                if (b.parent < 0) {
                    b.abs = b.baseAngle + sway;
                    b.x = rootX;
                    b.y = rootY;
                } else {
                    const p = branches[b.parent];
                    b.abs = p.abs + b.baseAngle + sway;
                    b.x = p.ex;
                    b.y = p.ey;
                }
                b.ex = b.x + Math.cos(b.abs) * b.len;
                b.ey = b.y + Math.sin(b.abs) * b.len;
            }
        };

        const drawTree = () => {
            for (const b of branches) {
                const ratio = 1 - b.level / (MAX_LEVEL + 1);
                tctx.strokeStyle = `rgba(74, 60, 42, ${(0.1 + ratio * 0.34) * inkAlpha})`;
                tctx.lineWidth = Math.max(0.7, ratio * 6.5);
                tctx.beginPath();
                tctx.moveTo(b.x, b.y);
                tctx.lineTo(b.ex, b.ey);
                tctx.stroke();
                if (b.flower) {
                    tctx.fillStyle = `rgba(166, 63, 42, ${0.4 * inkAlpha})`;
                    tctx.beginPath();
                    tctx.arc(b.ex, b.ey, 1.4 + (b.phase % 1) * 1.2, 0, Math.PI * 2);
                    tctx.fill();
                }
            }
        };

        const spawnPetal = () => {
            if (!tips.length) return;
            const tip = tips[(Math.random() * tips.length) | 0];
            petals.push({
                x: tip.ex,
                y: tip.ey,
                vx: 0,
                vy: 0.35 + Math.random() * 0.4,
                rot: Math.random() * Math.PI,
                vr: (Math.random() - 0.5) * 0.04,
                phase: Math.random() * Math.PI * 2
            });
        };

        const stepPetals = () => {
            if (petals.length < 26 && Math.random() < 0.12) spawnPetal();
            for (let i = petals.length - 1; i >= 0; i--) {
                const p = petals[i];
                p.vx += ((wind + gust) * 1.2 + Math.sin(time * 1.6 + p.phase) * 0.25 - p.vx) * 0.04;
                if (mouse.x !== null) {
                    const dx = p.x - mouse.x;
                    const dy = p.y - mouse.y;
                    const d2 = dx * dx + dy * dy;
                    if (d2 < 10000 && d2 > 0.01) {
                        const d = Math.sqrt(d2);
                        const f = ((100 - d) / 100) * 1.1;
                        p.x += (dx / d) * f;
                        p.y += (dy / d) * f;
                    }
                }
                p.x += p.vx;
                p.y += p.vy;
                p.rot += p.vr;
                if (p.y > th + 12 || p.x < -20 || p.x > tw + 20) petals.splice(i, 1);
            }
        };

        const drawPetals = () => {
            tctx.fillStyle = `rgba(166, 63, 42, ${0.42 * inkAlpha})`;
            for (const p of petals) {
                tctx.save();
                tctx.translate(p.x, p.y);
                tctx.rotate(p.rot);
                tctx.beginPath();
                tctx.ellipse(0, 0, 2.8, 1.5, 0, 0, Math.PI * 2);
                tctx.fill();
                tctx.restore();
            }
        };

        const frame = () => {
            time += 0.016;
            wind += (windTarget - wind) * 0.05;
            gust = Math.max(-0.5, Math.min(0.5, gust * 0.95));
            tctx.clearRect(0, 0, tw, th);
            computeTree();
            drawTree();
            stepPetals();
            drawPetals();
            treeRaf = requestAnimationFrame(frame);
        };

        const startTree = () => {
            if (treeRaf === null) treeRaf = requestAnimationFrame(frame);
        };
        const stopTree = () => {
            if (treeRaf !== null) {
                cancelAnimationFrame(treeRaf);
                treeRaf = null;
            }
        };

        buildTree();

        if (reduceMotion.matches) {
            computeTree();
            drawTree();
            window.addEventListener('resize', () => {
                buildTree();
                computeTree();
                drawTree();
            });
        } else {
            window.addEventListener('mousemove', e => {
                if (lastMouseX !== null) gust += (e.clientX - lastMouseX) * 0.0006;
                lastMouseX = e.clientX;
                windTarget = (e.clientX / tw - 0.5) * 0.7;
                mouse.x = e.clientX;
                mouse.y = e.clientY;
            }, { passive: true });
            window.addEventListener('touchmove', e => {
                if (e.touches.length > 0) {
                    windTarget = (e.touches[0].clientX / tw - 0.5) * 0.7;
                    mouse.x = e.touches[0].clientX;
                    mouse.y = e.touches[0].clientY;
                }
            }, { passive: true });
            document.documentElement.addEventListener('mouseleave', () => {
                mouse.x = null;
                mouse.y = null;
                lastMouseX = null;
            });
            window.addEventListener('resize', buildTree);
            document.addEventListener('visibilitychange', () => {
                if (document.hidden) stopTree();
                else startTree();
            });
            startTree();
        }
    }
});
