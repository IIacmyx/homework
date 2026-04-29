// Задача 1.

const person = {
  name: "Никита",
  age: 23,
  city: "Москва",
  profession: "Полицейский",
};

console.log("Задача 1:");
console.log("Имя:", person.name);
console.log("Возраст:", person.age);
console.log("Город:", person.city);
console.log("Профессия:", person.profession);

// Задача 2.

function isEmpty(obj) {
  for (const key in obj) {
    return false;
  }
  return true;
}

console.log("\nЗадача 2:");
console.log("Пустой объект:", isEmpty({})); // true
console.log("Не пустой объект:", isEmpty({ a: 1 })); // false

// Задача 3.

const task = {
  title: "Изучить JavaScript",
  description: "Пройти курс по основам JS",
  isCompleted: false,
};

function cloneAndModify(object, modifications) {
  return { ...object, ...modifications };
}

const modifiedTask = cloneAndModify(task, {
  isCompleted: true,
  priority: "high",
});

console.log("\nЗадача 3:");
for (const key in modifiedTask) {
  console.log(`${key}: ${modifiedTask[key]}`);
}

// Задача 4.

const myObject = {
  method1() {
    console.log("Метод 1 вызван");
  },
  method2() {
    console.log("Метод 2 вызван");
  },
  property: "Это не метод",
};

function callAllMethods(obj) {
  for (const key in obj) {
    if (typeof obj[key] === "function") {
      obj[key]();
    }
  }
}

console.log("\nЗадача 4:");
callAllMethods(myObject);
