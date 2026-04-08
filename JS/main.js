// ===== Задача 1 =====

const number = 7;

if (number % 2 === 0) {
  console.log("Число чётное");
} else {
  console.log("Число нечётное");
}

// ===== Задача 2 =====

// 1. Объявляем переменную age
const age = 25;

// 2. Тернарный оператор (вложенный)
const discount = age < 18 ? 10 : age <= 65 ? 20 : 30;

// 3. Выводим скидку в консоль
console.log("Скидка:", discount + "%");

// 4. Switch-case
let discountSwitch;
switch (true) {
  case age < 18:
    discountSwitch = 10;
    break;
  case age <= 65:
    discountSwitch = 20;
    break;
  default:
    discountSwitch = 30;
}
console.log("Скидка (switch):", discountSwitch + "%");

// ===== Задача 3 =====

// 1. Ввод имени пользователя и пароля через prompt
const username = prompt("Введите имя пользователя:");
const password = prompt("Введите пароль:");

// 2. Проверка условия
if ((username === "admin" || username === "user") && password === "123456") {
  console.log("Доступ разрешен");
} else {
  console.log("Доступ запрещен");
}

// ===== Задача 4 =====

// 1. Ввод данных
const weight = parseFloat(prompt("Введите вес посылки (кг):"));
const deliveryType = prompt("Введите тип доставки (Стандарт, Экспресс, Премиум):");

// 2. Проверка корректности данных
if (weight <= 0) {
  alert("Некорректный вес посылки");
} else if (deliveryType !== "Стандарт" && deliveryType !== "Экспресс" && deliveryType !== "Премиум") {
  alert("Неверный тип доставки");
} else {
  // 3. Расчёт базовой стоимости
  let baseCost;
  if (weight < 1) {
    baseCost = 5;
  } else if (weight <= 5) {
    baseCost = 10;
  } else {
    baseCost = 15;
  }

  // 4. Определение коэффициента через switch-case
  let coefficient;
  switch (deliveryType) {
    case "Стандарт":
      coefficient = 1;
      break;
    case "Экспресс":
      coefficient = 1.5;
      break;
    case "Премиум":
      coefficient = 2;
      break;
  }

  // 5. Расчёт итоговой стоимости
  const totalCost = baseCost * coefficient;

  // 6. Вывод результата
  alert("Итоговая стоимость доставки: " + totalCost + "$.");
}
