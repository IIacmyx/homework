// Задача 1. Вывод чисел от 1 до 20, пропуская делящиеся на 4
for (let i = 1; i <= 20; i++) {
  if (i % 4 === 0) continue;
  console.log(i);
}

// Задача 2. Вычисление факториала
const num = parseInt(prompt("Введите число для вычисления факториала:"));
let factorial = 1;
for (let i = 1; i <= num; i++) {
  factorial *= i;
}
console.log(`Факториал ${num} = ${factorial}`);

// Задача 3. Шахматная доска 8x8
let board = "";
for (let row = 0; row < 8; row++) {
  for (let col = 0; col < 8; col++) {
    board += (row + col) % 2 === 0 ? "#" : " ";
  }
  board += "\n";
}
console.log(board);