/**
 * Логика корзины
 */
import Toast from './toast.js';
import Modal from './modal.js';

export default class Cart {
	constructor(config = {}) {
		this.config = {
			addButton: config.addButton || '[data-cart-add]',
			openButton: config.openButton || '[data-cart-open]',
			counter: config.counter || '[data-cart-counter]',
			storageKey: config.storageKey || 'nike-cart',
			toastDuration: config.toastDuration || 2500,
			modal: config.modal || null,
		};

		this.items = this.loadFromStorage();
		this.toast = new Toast({
			position: 'top-right',
			duration: this.config.toastDuration,
		});

		this.modal = this.config.modal;

		this.init();
	}

	init() {
		this.updateCounter();
		this.renderCartItems();
		this.bindEvents();
	}

	bindEvents() {
		// Обработчик кнопок "Добавить в корзину"
		document.addEventListener('click', (e) => {
			const addButton = e.target.closest(this.config.addButton);
			if (addButton) {
				e.preventDefault();
				this.addItemFromButton(addButton);
			}

			// Обработчик кнопки открытия корзины
			const openButton = e.target.closest(this.config.openButton);
			if (openButton) {
				e.preventDefault();
				this.openCart();
			}

			// Обработчик кнопки удаления товара
			const removeButton = e.target.closest('[data-cart-remove]');
			if (removeButton) {
				e.preventDefault();
				const itemId = removeButton.dataset.cartRemove;
				this.removeItem(itemId);
			}

			// Обработчик кнопки очистки корзины
			const clearButton = e.target.closest('[data-cart-clear]');
			if (clearButton) {
				e.preventDefault();
				this.clearCart();
			}
		});
	}

	openCart() {
		this.renderCartItems();
		if (this.modal) {
			this.modal.open('cart');
		} else {
			// Fallback: ищем модальное окно в DOM
			const modalWindow = document.querySelector('[data-modal-window="cart"]');
			const modal = document.querySelector('.modal');
			if (modalWindow && modal) {
				modal.classList.add('modal--open');
				modalWindow.classList.add('modal__window--open');
				document.querySelector('.page__body')?.classList.add('page__body--no-scroll');
			}
		}
	}

	addItemFromButton(button) {
		const productCard = button.closest('.product, .top-models__product');
		if (!productCard) return;

		const titleEl = productCard.querySelector('.product__title, .top-models__product-title');
		const priceEl = productCard.querySelector('.product__price');
		const imgEl = productCard.querySelector('img');

		const item = {
			id: Date.now().toString(),
			title: titleEl ? titleEl.textContent.trim() : 'Товар',
			price: priceEl ? priceEl.textContent.trim() : '0 ₽',
			image: imgEl ? imgEl.src : '',
			quantity: 1,
		};

		this.addItem(item);
	}

	addItem(item) {
		this.items.push(item);
		this.saveToStorage();
		this.updateCounter();
		this.showToast(item);
	}

	removeItem(itemId) {
		this.items = this.items.filter((item) => item.id !== itemId);
		this.saveToStorage();
		this.updateCounter();
		this.renderCartItems();
	}

	clearCart() {
		this.items = [];
		this.saveToStorage();
		this.updateCounter();
		this.renderCartItems();
	}

	updateCounter() {
		const counterEl = document.querySelector(this.config.counter);
		if (counterEl) {
			counterEl.textContent = this.items.length;
			counterEl.classList.toggle('header__cart-counter--visible', this.items.length > 0);
		}
	}

	renderCartItems() {
		const itemsContainer = document.querySelector('[data-cart-items]');
		const emptyMessage = document.querySelector('[data-cart-empty]');
		const footer = document.querySelector('[data-cart-footer]');
		const totalEl = document.querySelector('[data-cart-total]');

		if (!itemsContainer) return;

		// Очищаем контейнер, кроме сообщения о пустой корзине
		const existingItems = itemsContainer.querySelectorAll('.modal-cart__item');
		existingItems.forEach((item) => item.remove());

		if (this.items.length === 0) {
			if (emptyMessage) emptyMessage.style.display = 'block';
			if (footer) footer.classList.remove('modal-cart__footer--visible');
			if (totalEl) totalEl.textContent = '0 ₽';
			return;
		}

		if (emptyMessage) emptyMessage.style.display = 'none';
		if (footer) footer.classList.add('modal-cart__footer--visible');

		// Рендерим товары
		this.items.forEach((item) => {
			const itemEl = document.createElement('div');
			itemEl.className = 'modal-cart__item';
			itemEl.innerHTML = `
				<img class="modal-cart__item-img" src="${item.image}" alt="${item.title}" />
				<div class="modal-cart__item-info">
					<div class="modal-cart__item-title">${item.title}</div>
					<div class="modal-cart__item-price">${item.price}</div>
				</div>
				<button class="modal-cart__item-remove" data-cart-remove="${item.id}" aria-label="Удалить товар">
					<svg width="20" height="20" viewBox="0 0 24 24" fill="none">
						<path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
					</svg>
				</button>
			`;
			itemsContainer.appendChild(itemEl);
		});

		// Обновляем итоговую сумму
		if (totalEl) {
			totalEl.textContent = this.formatTotal(this.getTotal());
		}
	}

	formatTotal(total) {
		return total.toLocaleString('ru-RU') + ' ₽';
	}

	saveToStorage() {
		try {
			localStorage.setItem(this.config.storageKey, JSON.stringify(this.items));
		} catch (e) {
			console.warn('Failed to save cart to localStorage:', e);
		}
	}

	loadFromStorage() {
		try {
			const data = localStorage.getItem(this.config.storageKey);
			return data ? JSON.parse(data) : [];
		} catch (e) {
			console.warn('Failed to load cart from localStorage:', e);
			return [];
		}
	}

	showToast(item) {
		this.toast.success(`
			<div style="display: flex; align-items: center; gap: 10px;">
				${item.image ? `<img src="${item.image}" alt="" style="width: 40px; height: 40px; object-fit: cover; border-radius: 4px;">` : ''}
				<div>
					<div style="font-weight: 600;">${item.title}</div>
					<div style="font-size: 13px; opacity: 0.8;">Добавлено в корзину</div>
				</div>
			</div>
		`, 'success', { duration: 3000 });
	}

	getItems() {
		return [...this.items];
	}

	getTotal() {
		return this.items.reduce((total, item) => {
			const price = parseFloat(item.price.replace(/\D/g, '')) || 0;
			return total + price * item.quantity;
		}, 0);
	}
}
