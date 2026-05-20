# JavaScript Модули Nike Air Mag

## Обзор новых функций

### 1. Плавный скролл (`smooth-scroll.js`)
Плавная прокрутка к якорным ссылкам с учетом фиксированного хедера.

**Использование:**
```html
<a href="#sizes">Размеры</a>
```

---

### 2. Анимации при скролле (`scroll-reveal.js`)
Появление элементов при прокрутке с помощью Intersection Observer.

**HTML атрибуты:**
- `data-reveal` — включить анимацию
- `data-reveal-direction="left|right|scale"` — направление анимации
- `data-reveal-delay="0|100|200|300|400|500"` — задержка в мс

**Пример:**
```html
<h2 data-reveal data-reveal-delay="100">Заголовок</h2>
<article data-reveal data-reveal-direction="left">Карточка</article>
```

**JS конфигурация:**
```javascript
new ScrollReveal({
  selector: '[data-reveal]',
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px',
  once: true, // анимировать только один раз
});
```

---

### 3. Toast уведомления (`toast.js`)
Система уведомлений для действий пользователя.

**Использование:**
```javascript
import Toast from './toast.js';

const toast = new Toast({ position: 'top-right' });

// Методы
toast.success('Сообщение');
toast.error('Сообщение');
toast.info('Сообщение');
toast.warning('Сообщение');

// С опциями
toast.show('Сообщение', 'success', { duration: 4000 });
```

**Типы:** `success`, `error`, `info`, `warning`

---

### 4. Маска телефона (`phone-mask.js`)
Автоматическая маска для полей телефона формата +7 (___) ___-__-__.

**Использование:**
```html
<input type="tel" placeholder="Номер телефона" />
```

Маска применяется ко всем `input[type="tel"]` автоматически.

---

### 5. Оверлей поиска (`search-overlay.js`)
Модальное окно поиска по сайту.

**HTML:**
```html
<button data-search-open>Поиск</button>

<div class="search-overlay">
  <button data-search-close>✕</button>
  <form>
    <input class="search-overlay__input" type="search" />
    <button type="submit">Найти</button>
  </form>
</div>
```

**JS:**
```javascript
new SearchOverlay({
  openButton: '[data-search-open]',
  closeButton: '[data-search-close]',
  overlay: '.search-overlay',
  input: '.search-overlay__input',
});
```

---

### 6. Корзина (`cart.js`)
Функционал корзины с сохранением в localStorage.

**HTML:**
```html
<button data-cart-add>Добавить в корзину</button>
<span data-cart-counter>0</span>
```

**JS:**
```javascript
const cart = new Cart({
  addButton: '[data-cart-add]',
  counter: '[data-cart-counter]',
  toastDuration: 3000,
});

// Методы
cart.addItem({ id: '1', title: 'Товар', price: '1000 ₽' });
cart.removeItem('1');
cart.clearCart();
cart.getItems(); // получить все товары
cart.getTotal(); // получить общую сумму
```

---

### 7. Parallax эффект (`parallax.js`)
Параллакс для элементов при скролле.

**HTML:**
```html
<picture data-parallax data-parallax-speed="0.3">
  <img src="..." alt="..." />
</picture>
```

**JS:**
```javascript
new Parallax({
  selector: '[data-parallax]',
  speed: 0.3,
  smooth: true,
});
```

**Атрибуты:**
- `data-parallax` — включить параллакс
- `data-parallax-speed` — скорость (по умолчанию 0.5)

*Отключается на мобильных устройствах (≤768px) для производительности*

---

## Подключение в index.js

```javascript
import { initSmoothScroll } from './smooth-scroll.js';
import ScrollReveal from './scroll-reveal.js';
import Toast from './toast.js';
import { initPhoneMask } from './phone-mask.js';
import SearchOverlay from './search-overlay.js';
import Cart from './cart.js';
import Parallax from './parallax.js';

// Инициализация
initSmoothScroll();
new ScrollReveal({ selector: '[data-reveal]', once: true });
initPhoneMask();
new SearchOverlay({ /* конфиг */ });
const cart = new Cart({ /* конфиг */ });
new Parallax({ selector: '[data-parallax]' });
window.toast = new Toast({ position: 'top-right' });
```

---

## CSS утилиты

Все стили для JS-компонентов находятся в `css/utils.css`:
- Scroll Reveal анимации
- Toast уведомления
- Search Overlay
- Cart Counter
- Parallax
- Hover эффекты для карточек

---

## Изменения: Модальное окно корзины

**Дата:** 2026-01-03

### Описание
Добавлена функциональность просмотра корзины через модальное окно. Пользователи могут добавлять товары, просматривать их, удалять отдельные позиции и очищать корзину полностью.

---

### Изменённые файлы

#### 1. `index.html`

**Добавлено:**
- Атрибут `data-cart-open` к кнопке корзины в header
- Новое модальное окно корзины `modal-cart` внутри контейнера `.modal`

**Структура модального окна:**
```html
<div class="modal__window modal-cart" data-modal-window="cart">
  <button class="modal__close" data-modal-close>...</button>
  <div class="modal__content modal-cart__content">
    <h3 class="modal-cart__title title-sm">Корзина</h3>
    <div class="modal-cart__items" data-cart-items>
      <p class="modal-cart__empty" data-cart-empty>Корзина пуста</p>
    </div>
    <div class="modal-cart__footer" data-cart-footer>
      <div class="modal-cart__total">
        <span class="modal-cart__total-label">Итого:</span>
        <span class="modal-cart__total-value" data-cart-total>0 ₽</span>
      </div>
      <button class="modal-cart__checkout" data-modal-button="buy">Оформить заказ</button>
      <button class="modal-cart__clear" data-cart-clear>Очистить корзину</button>
    </div>
  </div>
</div>
```

---

#### 2. `css/blocks/modal-cart.css` (новый файл)

**Основные классы:**
- `.modal-cart` — контейнер модального окна
- `.modal-cart__content` — контентная область
- `.modal-cart__items` — список товаров (с прокруткой, max-height: 400px)
- `.modal-cart__empty` — сообщение о пустой корзине
- `.modal-cart__item` — карточка товара
- `.modal-cart__item-img` — изображение товара (64×64px)
- `.modal-cart__item-title` — название товара
- `.modal-cart__item-price` — цена товара
- `.modal-cart__item-remove` — кнопка удаления товара
- `.modal-cart__footer` — подвал с итогами
- `.modal-cart__total` — блок итоговой суммы
- `.modal-cart__checkout` — кнопка оформления заказа
- `.modal-cart__clear` — кнопка очистки корзины

**Особенности:**
- Адаптивная вёрстка (медиа-запросы для 576px)
- Кастомный скроллбар для списка товаров
- Hover-эффекты для интерактивных элементов

---

#### 3. `css/index.css`

**Добавлен импорт:**
```css
@import "./blocks/modal-cart.css";
```

---

#### 4. `css/blocks/header.css`

**Добавлены стили для счётчика:**
```css
.header__cart-counter {
  position: absolute;
  top: -6px;
  right: -6px;
  min-width: 18px;
  height: 18px;
  font-size: 10px;
  font-weight: 700;
  color: var(--bg-color);
  background-color: var(--accent-color);
  border-radius: 9px;
  opacity: 0;
  visibility: hidden;
  transition: opacity, visibility;
}

.header__cart-counter--visible {
  opacity: 1;
  visibility: visible;
}
```

---

#### 5. `js/modal.js`

**Изменён метод `open()`:**
```javascript
// Было:
open() { ... }

// Стало:
open(targetWindow, speed = 300) {
  if (targetWindow) {
    this.modalWindow = document.querySelector(
      `[data-modal-window="${targetWindow}"]`
    );
  }
  // ... остальная логика
}
```

---

#### 6. `js/cart.js`

**Добавлено в конфиг:**
```javascript
openButton: config.openButton || '[data-cart-open]',
modal: config.modal || null,
```

**Новые методы:**
- `openCart()` — открытие модального окна корзины
- `renderCartItems()` — рендеринг списка товаров
- `formatTotal(total)` — форматирование итоговой суммы

**Обновлённые методы:**
- `bindEvents()` — добавлены обработчики для `data-cart-open`, `data-cart-remove`, `data-cart-clear`
- `removeItem()` — вызывает `renderCartItems()` после удаления
- `clearCart()` — вызывает `renderCartItems()` после очистки
- `init()` — вызывает `renderCartItems()` при инициализации

---

#### 7. `js/index.js`

**Изменено:**
```javascript
// Было:
new Modal({ ... });
const cart = new Cart({ ... });

// Стало:
const modal = new Modal({ ... });
const cart = new Cart({
  addButton: '[data-cart-add]',
  openButton: '[data-cart-open]',
  counter: '[data-cart-counter]',
  toastDuration: 3000,
  modal: modal,
});
```

---

### Функциональность

| Действие | Элемент | Описание |
|----------|---------|----------|
| Добавить товар | `data-cart-add` | Сохранение в localStorage, обновление счётчика, toast |
| Открыть корзину | `data-cart-open` | Открытие модального окна со списком товаров |
| Удалить товар | `data-cart-remove` | Удаление по ID, обновление интерфейса |
| Очистить корзину | `data-cart-clear` | Полная очистка, сброс счётчика |
| Оформить заказ | `data-modal-button="buy"` | Переход к форме заказа |

---

### Хранение данных

**Ключ localStorage:** `nike-cart`

**Структура элемента:**
```javascript
{
  id: "1704278400000",
  title: "Кроссовки Air Mag Back To Future",
  price: "36 490 ₽",
  image: "path/to/image.png",
  quantity: 1
}
```

---

### Тестирование

1. ✅ Добавить товар → проверить счётчик и toast-уведомление
2. ✅ Открыть корзину → проверить отображение товаров и суммы
3. ✅ Удалить товар → проверить обновление списка
4. ✅ Очистить корзину → проверить сброс счётчика и сообщение "Корзина пуста"
5. ✅ Оформить заказ → проверить переход к форме `modal-buy`
6. ✅ Обновить страницу → проверить сохранение данных в localStorage
