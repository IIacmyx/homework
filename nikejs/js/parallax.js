/**
 * Parallax эффект для Hero-секции
 */
export default class Parallax {
	constructor(config = {}) {
		this.config = {
			selector: config.selector || '[data-parallax]',
			speed: config.speed || 0.5,
			smooth: config.smooth !== false,
		};

		this.elements = document.querySelectorAll(this.config.selector);
		this.currentY = 0;
		this.targetY = 0;
		this.rafId = null;

		if (this.elements.length === 0) return;

		// Проверяем, не мобильное ли устройство
		this.isMobile = window.innerWidth <= 768;
		if (this.isMobile) return; // Отключаем на мобильных для производительности

		this.init();
	}

	init() {
		window.addEventListener('scroll', this.onScroll.bind(this));
		window.addEventListener('resize', this.onResize.bind(this));

		// Первый расчет
		this.onScroll();
	}

	onScroll() {
		this.targetY = window.pageYOffset;

		if (this.config.smooth && !this.rafId) {
			this.animate();
		} else {
			this.applyParallax(this.targetY);
		}
	}

	animate() {
		const diff = this.targetY - this.currentY;

		// Если разница очень маленькая, останавливаем анимацию
		if (Math.abs(diff) < 0.1) {
			this.currentY = this.targetY;
			this.rafId = null;
			return;
		}

		// Плавное приближение к целевому значению
		this.currentY += diff * 0.1;
		this.applyParallax(this.currentY);

		this.rafId = requestAnimationFrame(this.animate.bind(this));
	}

	applyParallax(scrollY) {
		this.elements.forEach((el) => {
			const speed = parseFloat(el.dataset.parallaxSpeed) || this.config.speed;
			const yPos = scrollY * speed;
			el.style.transform = `translateY(${yPos}px)`;
		});
	}

	onResize() {
		this.isMobile = window.innerWidth <= 768;
		if (this.isMobile) {
			// Сбрасываем трансформации на мобильных
			this.elements.forEach((el) => {
				el.style.transform = 'none';
			});
		}
	}

	destroy() {
		if (this.rafId) {
			cancelAnimationFrame(this.rafId);
		}
		window.removeEventListener('scroll', this.onScroll.bind(this));
		window.removeEventListener('resize', this.onResize.bind(this));
	}
}
