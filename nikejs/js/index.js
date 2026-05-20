import HeaderFixed from './header.js';
import BurgerMenu from './burger.js';
import Modal from './modal.js';
import { productSlider } from './product-slider.js';
import { sizes } from './sizes.js';
import { initSmoothScroll } from './smooth-scroll.js';
import ScrollReveal from './scroll-reveal.js';
import Toast from './toast.js';
import { initPhoneMask } from './phone-mask.js';
import SearchOverlay from './search-overlay.js';
import Cart from './cart.js';

try {
	const headerFixed = new HeaderFixed({
		HEADER: 'header',
		HEADER_FIXED: 'header--fixed',
	});

	new BurgerMenu(
		{
			BURGER: 'burger',
			BURGER_OPEN: 'burger--open',
			HEADER_MENU: 'header__menu',
			HEADER_MENU_OPEN: 'header__menu--open',
			lABEL: {
				OPEN: 'Открыть меню',
				CLOSE: 'Закрыть меню',
			},
			PAGE_BODY: 'page__body',
			PAGE_BODY_NO_SCROLL: 'page__body--no-scroll',
			MENU_LINK: 'menu__link',
			BREAKPOINT: 768,
			MAIN: 'main',
		},
		headerFixed,
	);

	const modal = new Modal({
		PAGE_BODY: 'page__body',
		PAGE_BODY_NO_SCROLL: 'page__body--no-scroll',
	});

	// Плавный скролл по якорям
	initSmoothScroll();

	// Анимации при скролле
	new ScrollReveal({
		selector: '[data-reveal]',
		threshold: 0.1,
		rootMargin: '0px 0px -50px 0px',
		once: true,
	});

	// Маска телефона в модалках
	initPhoneMask();

	// Оверлей поиска
	new SearchOverlay({
		openButton: '[data-search-open]',
		closeButton: '[data-search-close]',
		overlay: '.search-overlay',
		input: '.search-overlay__input',
	});

	// Корзина
	const cart = new Cart({
		addButton: '[data-cart-add]',
		openButton: '[data-cart-open]',
		counter: '[data-cart-counter]',
		toastDuration: 3000,
		modal: modal,
	});

	// Глобальный toast для внешнего использования
	window.toast = new Toast({ position: 'top-right' });

	productSlider();
	sizes();

	// Отправка формы заказа
	const orderForm = document.querySelector('.modal-buy__form');
	if (orderForm) {
		orderForm.addEventListener('submit', (e) => {
			e.preventDefault();
			const formData = new FormData(orderForm);
			const data = Object.fromEntries(formData.entries());

			// Имитация отправки
			setTimeout(() => {
				window.toast.success('Заказ успешно оформлен! Мы свяжемся с вами.', {
					duration: 4000,
				});
				orderForm.reset();
				// Закрываем модалку
				document.querySelector('[data-modal-close]')?.click();
			}, 500);
		});
	}
} catch (error) {
	console.error(error);
}
