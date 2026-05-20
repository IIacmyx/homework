/**
 * Анимация появления элементов при скролле (Intersection Observer)
 */
export default class ScrollReveal {
	constructor(config = {}) {
		this.config = {
			selector: config.selector || '[data-reveal]',
			threshold: config.threshold || 0.1,
			rootMargin: config.rootMargin || '0px 0px -50px 0px',
			hiddenClass: config.hiddenClass || 'reveal-hidden',
			visibleClass: config.visibleClass || 'reveal-visible',
			once: config.once !== false, // по умолчанию анимировать один раз
		};

		this.elements = document.querySelectorAll(this.config.selector);
		this.observer = null;

		if (this.elements.length === 0) return;

		this.init();
	}

	init() {
		// Добавляем скрытый класс всем элементам
		this.elements.forEach((el) => {
			el.classList.add(this.config.hiddenClass);
		});

		// Создаем Observer
		this.observer = new IntersectionObserver(
			this.onIntersect.bind(this),
			{
				threshold: this.config.threshold,
				rootMargin: this.config.rootMargin,
			}
		);

		// Начинаем наблюдение
		this.elements.forEach((el) => this.observer.observe(el));
	}

	onIntersect(entries) {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add(this.config.visibleClass);
				entry.target.classList.remove(this.config.hiddenClass);

				if (this.config.once) {
					this.observer.unobserve(entry.target);
				}
			} else if (!this.config.once) {
				entry.target.classList.remove(this.config.visibleClass);
				entry.target.classList.add(this.config.hiddenClass);
			}
		});
	}

	destroy() {
		if (this.observer) {
			this.observer.disconnect();
		}
	}
}
