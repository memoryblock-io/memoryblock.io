document.addEventListener('DOMContentLoaded', () => {
    // 1. Fetch latest version from NPM
    const fetchLatestVersion = async () => {
        const versionEl = document.getElementById('version-number');
        try {
            const response = await fetch('https://registry.npmjs.org/memoryblock/latest');
            if (!response.ok) throw new Error();
            const data = await response.json();
            if (data.version) {
                versionEl.textContent = data.version;
            }
        } catch (err) {
            console.warn('Failed to fetch latest version from NPM, using fallback.');
        }
    };

    // 2. Copy command to clipboard
    const initCopyBtn = () => {
        const copyBtns = document.querySelectorAll('.copy-btn');
        copyBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetId = btn.getAttribute('data-target');
                const text = document.getElementById(targetId).textContent;
                
                navigator.clipboard.writeText(text).then(() => {
                    const originalIcon = btn.innerHTML;
                    btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#27c93f" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
                    
                    setTimeout(() => {
                        btn.innerHTML = originalIcon;
                    }, 2000);
                });
            });
        });
    };

    // 3. Smooth scrolling for anchor links
    const initSmoothScroll = () => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    };

    // 4. Reveal check on scroll
    const initRevealOnScroll = () => {
        const cards = document.querySelectorAll('.feature-card, .auto-pulse-area');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });

        cards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'all 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)';
            observer.observe(card);
        });
    };

    // Initialize all
    fetchLatestVersion();
    initCopyBtn();
    initSmoothScroll();
    initRevealOnScroll();
});
