document.addEventListener('DOMContentLoaded', () => {
    const burgerButton = document.getElementById('burgerButton');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileOverlay = document.getElementById('mobileOverlay');
    const mobileNavShop = document.getElementById('mobileNavShop');
    const mobileDropdownShop = document.getElementById('mobileDropdownShop');
    const navShop = document.getElementById('navShop');
    const searchInput = document.getElementById('searchInput');
    const searchClear = document.getElementById('searchClear');
    const topBanner = document.getElementById('topBanner');
    const bannerClose = document.getElementById('bannerClose');
    const hero = document.querySelector('.hero');
    const header = document.getElementById('header');
    const body = document.body;

    const updateHeaderPosition = () => {
        let bannerHeight;
        
        if (topBanner.classList.contains('hidden')) {
            bannerHeight = 0;
        } else {
            bannerHeight = topBanner.offsetHeight || 40;
        }
        
        header.style.top = `${bannerHeight}px`;

        const headerHeight = 70;
        const menuTop = bannerHeight + headerHeight;
        mobileMenu.style.top = `${menuTop}px`;
        mobileMenu.style.height = `calc(100% - ${menuTop}px)`;
    };

    updateHeaderPosition();


    window.addEventListener('resize', updateHeaderPosition);

    // Отключить видимость мобильного меню
    const toggleMobileMenu = () => {
        burgerButton.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        mobileOverlay.classList.toggle('active');
        body.classList.toggle('page__body--no-scroll');
    };

    burgerButton.addEventListener('click', toggleMobileMenu);
    mobileOverlay.addEventListener('click', toggleMobileMenu);

    // Переключить раскрывающийся список «Магазин» в мобильном меню
    mobileNavShop.addEventListener('click', (e) => {
        e.preventDefault();
        mobileNavShop.classList.toggle('active');
        mobileDropdownShop.classList.toggle('open');
    });

    // Переключить раскрывающийся список «Магазин» в меню рабочего стола
    navShop.addEventListener('click', () => {
        navShop.classList.toggle('active');
    });

    // Закрывает выпадающее меню при щелчке вне его пределов.
    document.addEventListener('click', (e) => {
        if (!navShop.contains(e.target)) {
            navShop.classList.remove('active');
        }
        if (!mobileNavShop.contains(e.target) && !mobileDropdownShop.contains(e.target)) {
            mobileNavShop.classList.remove('active');
            mobileDropdownShop.classList.remove('open');
        }
    });

    // Скрыть кнопку очистки поиска, если поле ввода пустое.
    searchInput.addEventListener('input', () => {
        searchClear.classList.toggle('visible', searchInput.value.length > 0);
    });

    // Очистить поле поиска
    searchClear.addEventListener('click', () => {
        searchInput.value = '';
        searchClear.classList.remove('visible');
        searchInput.focus();
    });

    // Закрыть верхний баннер и настроить заголовок
    bannerClose.addEventListener('click', () => {
        topBanner.classList.add('hidden');
        updateHeaderPosition();
    });

    // Изменение размера окна с помощью ползунка
    window.addEventListener('resize', () => {
        if (window.innerWidth > 1024 && mobileMenu.classList.contains('active')) {
            toggleMobileMenu();
        }
        // Также пересчитывайте положение заголовка при изменении размера окна.
        updateHeaderPosition();
    });
});


// Показать/скрыть дополнительные товары
const productsToggleBtn = document.getElementById('productsToggleBtn');
const additionalProducts = document.getElementById('additionalProducts');
const collapseBtn = document.getElementById('collapseBtn');
const productsSection = document.querySelector('.products');

if (productsToggleBtn && additionalProducts && collapseBtn && productsSection) {
    productsToggleBtn.addEventListener('click', () => {
        productsToggleBtn.style.display = 'none';
        productsSection.classList.add('products--expanded');
        additionalProducts.style.display = 'block';
    });

    collapseBtn.addEventListener('click', () => {
        additionalProducts.style.display = 'none';
        productsSection.classList.remove('products--expanded');
        productsToggleBtn.style.display = 'block';

        // Скролл к секции товаров
        productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
}

// Показать/скрыть дополнительные товары в секции "Лидеры продаж"
const topProductsToggleBtn = document.getElementById('topProductsToggleBtn');
const additionalTopProducts = document.getElementById('additionalTopProducts');
const topCollapseBtn = document.getElementById('topCollapseBtn');
const topProductsSection = document.querySelector('.top__products');

if (topProductsToggleBtn && additionalTopProducts && topCollapseBtn && topProductsSection) {
    topProductsToggleBtn.addEventListener('click', () => {
        topProductsToggleBtn.style.display = 'none';
        topProductsSection.classList.add('top__products--expanded');
        additionalTopProducts.style.display = 'block';
    });

    topCollapseBtn.addEventListener('click', () => {
        additionalTopProducts.style.display = 'none';
        topProductsSection.classList.remove('top__products--expanded');
        topProductsToggleBtn.style.display = 'block';

        // Скролл к секции товаров
        topProductsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
}

// Бесконечный слайдер отзывов
const reviewsTrack = document.querySelector('.reviews__track');
const reviewsPrevBtn = document.querySelector('.reviews__arrow--prev');
const reviewsNextBtn = document.querySelector('.reviews__arrow--next');

if (reviewsTrack && reviewsPrevBtn && reviewsNextBtn) {
    const originalCards = Array.from(document.querySelectorAll('.review-card:not(.review-card--clone)'));
    let currentPosition = 0;
    let isAnimating = false;
    let currentIndex = 0;

    // Клонируем карточки для бесконечной прокрутки
    const initClones = () => {
        document.querySelectorAll('.review-card--clone').forEach(el => el.remove());

        originalCards.forEach(card => {
            const clone = card.cloneNode(true);
            clone.classList.add('review-card--clone');
            reviewsTrack.appendChild(clone);
        });
    };

    initClones();

    const getCardWidth = () => {
        const card = document.querySelector('.review-card');
        if (card) {
            return card.offsetWidth + 24;
        }
        return 424;
    };

    const getTotalOriginalWidth = () => originalCards.length * getCardWidth();

    const slideTo = (position, withTransition = true) => {
        reviewsTrack.style.transition = withTransition ? 'transform 0.4s ease' : 'none';
        reviewsTrack.style.transform = `translateX(-${position}px)`;
        currentPosition = position;
    };

    const slideNext = () => {
        if (isAnimating) return;
        isAnimating = true;

        const cardWidth = getCardWidth();

        currentIndex++;
        slideTo(currentPosition + cardWidth);

        if (currentIndex >= originalCards.length) {
            setTimeout(() => {
                currentIndex = 0;
                slideTo(0, false);
                isAnimating = false;
            }, 400);
        } else {
            setTimeout(() => {
                isAnimating = false;
            }, 400);
        }
    };

    const slidePrev = () => {
        if (isAnimating) return;
        isAnimating = true;

        const cardWidth = getCardWidth();
        const totalOriginalWidth = getTotalOriginalWidth();

        if (currentIndex <= 0) {
            currentIndex = originalCards.length - 1;
            slideTo(totalOriginalWidth - cardWidth, false);

            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    slideTo(totalOriginalWidth - cardWidth - cardWidth);
                    setTimeout(() => {
                        isAnimating = false;
                    }, 400);
                });
            });
        } else {
            currentIndex--;
            slideTo(currentPosition - cardWidth);
            setTimeout(() => {
                isAnimating = false;
            }, 400);
        }
    };

    reviewsNextBtn.addEventListener('click', slideNext);
    reviewsPrevBtn.addEventListener('click', slidePrev);

    // Прокрутка колёсиком мыши
    const reviewsWrapper = document.querySelector('.reviews__wrapper');
    let wheelTimeout = null;

    reviewsWrapper.addEventListener('wheel', (e) => {
        e.preventDefault();

        if (wheelTimeout) return;

        wheelTimeout = setTimeout(() => {
            wheelTimeout = null;
        }, 400);

        if (e.deltaY > 0 || e.deltaX > 0) {
            slideNext();
        } else if (e.deltaY < 0 || e.deltaX < 0) {
            slidePrev();
        }
    }, { passive: false });

    // Сброс при ресайзе
    window.addEventListener('resize', () => {
        initClones();
        currentIndex = 0;
        slideTo(0, false);
        isAnimating = false;
    });

    // Инициализация
    slideTo(0, false);
}

