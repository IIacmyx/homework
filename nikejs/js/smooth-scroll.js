/**
 * Плавный скролл по якорным ссылкам
 */
export const initSmoothScroll = () => {
	const anchors = document.querySelectorAll('a[href^="#"]');
	const headerOffset = 80; // отступ для фиксированного хедера

	const scrollToElement = (target) => {
		const element = document.querySelector(target);
		if (!element) return;

		const elementPosition = element.getBoundingClientRect().top;
		const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

		window.scrollTo({
			top: offsetPosition,
			behavior: 'smooth',
		});
	};

	anchors.forEach((anchor) => {
		anchor.addEventListener('click', (e) => {
			const href = anchor.getAttribute('href');
			if (href === '#') return;

			e.preventDefault();
			scrollToElement(href);
		});
	});
};
