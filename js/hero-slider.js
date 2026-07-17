(function () {
    const slider = document.querySelector('[data-hero-slider]');

    if (!slider) {
        return;
    }

    const heroSection = slider.closest('.hero-section') || slider;
    const slides = Array.from(slider.querySelectorAll('.hero-slide'));
    const dots = Array.from(document.querySelectorAll('[data-hero-dot]'));
    const prevButton = document.querySelector('[data-hero-prev]');
    const nextButton = document.querySelector('[data-hero-next]');
    const autoplayDelay = 5000;
    const swipeThreshold = 45;
    let currentIndex = 0;
    let autoplayTimer = null;
    let touchStartX = 0;
    let touchStartY = 0;

    if (slides.length <= 1) {
        return;
    }

    const setActiveSlide = (nextIndex) => {
        const normalizedIndex = (nextIndex + slides.length) % slides.length;

        slides[currentIndex].classList.remove('active');
        dots[currentIndex]?.classList.remove('active');
        dots[currentIndex]?.removeAttribute('aria-current');

        slides[normalizedIndex].classList.add('active');
        dots[normalizedIndex]?.classList.add('active');
        dots[normalizedIndex]?.setAttribute('aria-current', 'true');

        currentIndex = normalizedIndex;
    };

    const showNextSlide = () => {
        setActiveSlide(currentIndex + 1);
    };

    const showPreviousSlide = () => {
        setActiveSlide(currentIndex - 1);
    };

    const startAutoplay = () => {
        stopAutoplay();
        autoplayTimer = window.setInterval(showNextSlide, autoplayDelay);
    };

    const stopAutoplay = () => {
        if (autoplayTimer) {
            window.clearInterval(autoplayTimer);
            autoplayTimer = null;
        }
    };

    const restartAutoplay = () => {
        startAutoplay();
    };

    nextButton?.addEventListener('click', () => {
        showNextSlide();
        restartAutoplay();
    });

    prevButton?.addEventListener('click', () => {
        showPreviousSlide();
        restartAutoplay();
    });

    dots.forEach((dot) => {
        dot.addEventListener('click', () => {
            const requestedIndex = Number(dot.dataset.heroDot);

            if (!Number.isNaN(requestedIndex)) {
                setActiveSlide(requestedIndex);
                restartAutoplay();
            }
        });
    });

    heroSection.addEventListener('touchstart', (event) => {
        const touch = event.changedTouches[0];
        touchStartX = touch.clientX;
        touchStartY = touch.clientY;
        stopAutoplay();
    }, { passive: true });

    heroSection.addEventListener('touchend', (event) => {
        const touch = event.changedTouches[0];
        const diffX = touch.clientX - touchStartX;
        const diffY = touch.clientY - touchStartY;

        if (Math.abs(diffX) > swipeThreshold && Math.abs(diffX) > Math.abs(diffY)) {
            if (diffX < 0) {
                showNextSlide();
            } else {
                showPreviousSlide();
            }
        }

        restartAutoplay();
    }, { passive: true });

    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            stopAutoplay();
        } else {
            startAutoplay();
        }
    });

    startAutoplay();
})();
