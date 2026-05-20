/**
 * Toast-уведомления
 */
export default class Toast {
	constructor(config = {}) {
		this.config = {
			container: config.container || 'body',
			position: config.position || 'top-right', // top-right, top-left, bottom-right, bottom-left
			duration: config.duration || 3000,
			types: {
				success: 'toast--success',
				error: 'toast--error',
				info: 'toast--info',
				warning: 'toast--warning',
			},
		};

		this.container = null;
		this.init();
	}

	init() {
		// Создаем контейнер для тостов
		this.container = document.createElement('div');
		this.container.className = `toast-container toast-container--${this.config.position}`;
		document.querySelector(this.config.container).appendChild(this.container);
	}

	show(message, type = 'info', options = {}) {
		const toast = document.createElement('div');
		toast.className = `toast ${this.config.types[type] || ''}`;

		const duration = options.duration || this.config.duration;

		// Добавляем иконку в зависимости от типа
		const icon = this.getIcon(type);
		toast.innerHTML = `
			<div class="toast__icon">${icon}</div>
			<div class="toast__message">${message}</div>
			<button class="toast__close" aria-label="Закрыть уведомление">
				<svg width="16" height="16" viewBox="0 0 16 16">
					<path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" stroke-width="2" fill="none"/>
				</svg>
			</button>
		`;

		this.container.appendChild(toast);

		// Анимация появления
		requestAnimationFrame(() => {
			toast.classList.add('toast--show');
		});

		// Автозакрытие
		const closeTimeout = setTimeout(() => {
			this.hide(toast);
		}, duration);

		// Закрытие по клику на крестик
		const closeButton = toast.querySelector('.toast__close');
		closeButton.addEventListener('click', () => {
			clearTimeout(closeTimeout);
			this.hide(toast);
		});

		return toast;
	}

	hide(toast) {
		if (!toast) return;

		toast.classList.remove('toast--show');
		toast.classList.add('toast--hide');

		// Удаляем после завершения анимации
		setTimeout(() => {
			if (toast.parentNode) {
				toast.parentNode.removeChild(toast);
			}
		}, 300);
	}

	getIcon(type) {
		const icons = {
			success: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none">
				<circle cx="10" cy="10" r="8" stroke="currentColor" stroke-width="2"/>
				<path d="M6 10l3 3 5-6" stroke="currentColor" stroke-width="2" fill="none"/>
			</svg>`,
			error: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none">
				<circle cx="10" cy="10" r="8" stroke="currentColor" stroke-width="2"/>
				<path d="M7 7l6 6M13 7l-6 6" stroke="currentColor" stroke-width="2"/>
			</svg>`,
			info: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none">
				<circle cx="10" cy="10" r="8" stroke="currentColor" stroke-width="2"/>
				<circle cx="10" cy="7" r="1" fill="currentColor"/>
				<path d="M10 10v4" stroke="currentColor" stroke-width="2"/>
			</svg>`,
			warning: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none">
				<path d="M10 2l8 14H2L10 2z" stroke="currentColor" stroke-width="2" fill="none"/>
				<circle cx="10" cy="14" r="1" fill="currentColor"/>
				<path d="M10 8v3" stroke="currentColor" stroke-width="2"/>
			</svg>`,
		};
		return icons[type] || icons.info;
	}

	success(message, options) {
		return this.show(message, 'success', options);
	}

	error(message, options) {
		return this.show(message, 'error', options);
	}

	info(message, options) {
		return this.show(message, 'info', options);
	}

	warning(message, options) {
		return this.show(message, 'warning', options);
	}
}
