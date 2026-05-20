/**
 * Оверлей поиска
 */
export default class SearchOverlay {
	constructor(config = {}) {
		this.config = {
			openButton: config.openButton || '[data-search-open]',
			closeButton: config.closeButton || '[data-search-close]',
			overlay: config.overlay || '.search-overlay',
			input: config.input || '.search-overlay__input',
			bodyClass: config.bodyClass || 'page__body--no-scroll',
		};

		this.isOpen = false;
		this.overlay = null;
		this.input = null;
		this.openButton = null;
		this.closeButton = null;

		this.init();
	}

	init() {
		this.openButton = document.querySelector(this.config.openButton);
		this.closeButton = document.querySelector(this.config.closeButton);
		this.overlay = document.querySelector(this.config.overlay);
		this.input = document.querySelector(this.config.input);

		if (!this.overlay) {
			console.warn('Search overlay element not found');
			return;
		}

		this.bindEvents();
	}

	bindEvents() {
		if (this.openButton) {
			this.openButton.addEventListener('click', (e) => {
				e.preventDefault();
				this.open();
			});
		}

		if (this.closeButton) {
			this.closeButton.addEventListener('click', () => this.close());
		}

		// Закрытие по ESC
		document.addEventListener('keydown', (e) => {
			if (e.key === 'Escape' && this.isOpen) {
				this.close();
			}
		});

		// Закрытие по клику вне формы
		this.overlay.addEventListener('click', (e) => {
			if (e.target === this.overlay) {
				this.close();
			}
		});

		// Обработка отправки формы
		const form = this.overlay.querySelector('form');
		if (form) {
			form.addEventListener('submit', (e) => {
				e.preventDefault();
				this.handleSearch(this.input.value);
			});
		}
	}

	open() {
		this.isOpen = true;
		this.overlay.classList.add('search-overlay--open');
		document.body.classList.add(this.config.bodyClass);

		// Фокус на поле ввода с небольшой задержкой
		setTimeout(() => {
			if (this.input) {
				this.input.focus();
			}
		}, 100);
	}

	close() {
		this.isOpen = false;
		this.overlay.classList.remove('search-overlay--open');
		document.body.classList.remove(this.config.bodyClass);

		// Очищаем поле
		if (this.input) {
			this.input.value = '';
		}
	}

	handleSearch(query) {
		if (!query.trim()) return;

		console.log('Search query:', query);
		// Здесь можно добавить логику поиска по сайту
		// Например, фильтрация товаров или перенаправление на страницу результатов
		alert(`Поиск: ${query}`);
		this.close();
	}
}
