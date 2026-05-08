// Задание 1.
const users = [
  { name: 'Alex', age: 24, isAdmin: false },
  { name: 'Bob', age: 13, isAdmin: false },
  { name: 'John', age: 31, isAdmin: true },
  { name: 'Jane', age: 20, isAdmin: false },
];

users.push(
  { name: 'Ann', age: 19, isAdmin: false },
  { name: 'Jack', age: 43, isAdmin: true }
);

// Задание 2.
function getUserAverageAge(users) {
  const totalAge = users.reduce((sum, user) => sum + user.age, 0);
  return totalAge / users.length;
}

// Задание 3.
function getAllAdmins(users) {
  return users.filter(user => user.isAdmin);
}

// Задание 4.
function first(arr, n) {
  if (n === undefined) {
    return arr.length > 0 ? [arr[0]] : [];
  }
  if (n === 0) {
    return [];
  }
  return arr.slice(0, n);
}


console.log('Средний возраст:', getUserAverageAge(users));
console.log('Администраторы:', getAllAdmins(users));
console.log('Первые 2 элемента:', first(users, 2));
console.log('Первый элемент:', first(users));
console.log('Ноль элементов:', first(users, 0));