/**
 * Маска для телефона (+7 (___) ___-__-__)
 */
export const initPhoneMask = () => {
	const phoneInputs = document.querySelectorAll('input[type="tel"]');
	const maskPattern = '+7 (___) ___-__-__';

	const formatPhone = (value) => {
		// Удаляем все нецифровые символы
		let digits = value.replace(/\D/g, '');

		// Убираем ведущий 8 или 7, если есть
		if (digits.startsWith('8')) {
			digits = digits.slice(1);
		} else if (digits.startsWith('7')) {
			digits = digits.slice(1);
		}

		// Ограничиваем до 10 цифр
		digits = digits.slice(0, 10);

		// Форматируем
		let formatted = '+7';
		if (digits.length > 0) {
			formatted += ' (' + digits.slice(0, 3);
		}
		if (digits.length > 3) {
			formatted += ') ' + digits.slice(3, 6);
		}
		if (digits.length > 6) {
			formatted += '-' + digits.slice(6, 8);
		}
		if (digits.length > 8) {
			formatted += '-' + digits.slice(8, 10);
		}

		return formatted;
	};

	const handleInput = (e) => {
		const input = e.target;
		const cursorPosition = input.selectionStart;
		const oldValue = input.value;
		const newValue = formatPhone(input.value);

		input.value = newValue;

		// Пытаемся сохранить позицию курсора
		let newCursorPosition = cursorPosition;
		if (newValue.length > oldValue.length) {
			newCursorPosition = cursorPosition + 1;
		} else if (newValue.length < oldValue.length) {
			newCursorPosition = cursorPosition - 1;
		}
		input.setSelectionRange(newCursorPosition, newCursorPosition);
	};

	const handleFocus = (e) => {
		const input = e.target;
		if (!input.value) {
			input.value = '+7 (';
		}
	};

	const handleBlur = (e) => {
		const input = e.target;
		// Если введено недостаточно цифр, очищаем
		const digits = input.value.replace(/\D/g, '');
		if (digits.length < 10) {
			input.value = '';
		}
	};

	phoneInputs.forEach((input) => {
		input.addEventListener('input', handleInput);
		input.addEventListener('focus', handleFocus);
		input.addEventListener('blur', handleBlur);
	});
};
