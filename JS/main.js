// Задача 1. Расчёт итоговой цены со скидкой и налогом
function calculateFinalPrice(basePrice, discountPercent, taxRate) {
  const priceAfterDiscount = basePrice - (basePrice * discountPercent / 100);
  const finalPrice = priceAfterDiscount * (1 + taxRate);
  return finalPrice;
}

// Задача 2. Проверка доступа
function checkAccess(username, password) {
  if (username === "admin" && password === "123456") {
    return "Доступ разрешен";
  }
  return "Доступ запрещен";
}

// Задача 3. Определение времени суток
function getTimeOfDay(hour) {
  if (hour >= 0 && hour <= 5) {
    return "Ночь";
  } else if (hour >= 6 && hour <= 11) {
    return "Утро";
  } else if (hour >= 12 && hour <= 17) {
    return "День";
  } else if (hour >= 18 && hour <= 23) {
    return "Вечер";
  }
  return "Некорректное время";
}

// Задача 4. Поиск первого чётного числа в диапазоне
function findFirstEven(start, end) {
  for (let i = start; i <= end; i++) {
    if (i % 2 === 0) {
      return i;
    }
  }
  return "Чётных чисел нет";
}

// Примеры использования:
console.log(calculateFinalPrice(100, 10, 0.2)); // 108
console.log(calculateFinalPrice(100, 10, 0));   // 90

console.log(checkAccess("admin", "123456"));    // "Доступ разрешен"
console.log(checkAccess("user", "123456"));     // "Доступ запрещен"

console.log(getTimeOfDay(3));   // "Ночь"
console.log(getTimeOfDay(8));   // "Утро"
console.log(getTimeOfDay(15));  // "День"
console.log(getTimeOfDay(20));  // "Вечер"
console.log(getTimeOfDay(25));  // "Некорректное время"

console.log(findFirstEven(1, 10));  // 2
console.log(findFirstEven(9, 9));   // "Чётных чисел нет"