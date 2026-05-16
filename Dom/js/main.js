"use strict";

const todoKeys = {
  id: "id",
  text: "text",
  is_completed: "is_completed",
};

const todos = [];

const errTodoNotFound = todoId => `Todo with id ${todoId} not found`;

const getNewTodoId = todos =>
  todos.reduce((maxId, todo) => Math.max(maxId, todo[todoKeys.id]), 0) + 1;

const createTodo = (todos, text) => {
  const newTodo = {
    [todoKeys.id]: getNewTodoId(todos),
    [todoKeys.text]: text,
    [todoKeys.is_completed]: false,
  };
  todos.push(newTodo);
  return newTodo;
};

const completeTodoById = (todos, todoId) => {
  const todo = todos.find(todo => todo[todoKeys.id] === todoId);

  if (!todo) {
    console.error(errTodoNotFound(todoId));
    return null;
  }
  todo[todoKeys.is_completed] = !todo[todoKeys.is_completed];
  return todo;
};

const deleteTodoById = (todos, todoId) => {
  const todoIndex = todos.findIndex(todo => todo[todoKeys.id] === todoId);
  if (todoIndex === -1) {
    console.error(errTodoNotFound(todoId));
    return todos;
  }
  todos.splice(todoIndex, 1);
  return todos;
};

const isDuplicateTodo = (todos, text) =>
  todos.some(todo => todo[todoKeys.text].toLowerCase() === text.toLowerCase());

const formElement = document.querySelector(".form");
const inputElement = document.querySelector(".input");
const todosElement = document.querySelector(".todos");

const createTodoElement = text => {
  const todoElement = document.createElement("li");
  todoElement.className = "todo";

  const textElement = document.createElement("div");
  textElement.className = "todo-text";
  textElement.textContent = text;

  const actionsElement = document.createElement("div");
  actionsElement.className = "todo-actions";

  const completeButton = document.createElement("button");
  completeButton.className = "button-complete button";
  completeButton.innerHTML = "&#10004;";

  const deleteButton = document.createElement("button");
  deleteButton.className = "button-delete button";
  deleteButton.innerHTML = "&#10006;";

  actionsElement.append(completeButton, deleteButton);
  todoElement.append(textElement, actionsElement);

  return todoElement;
};

const handleCreateTodo = (todos, text) => {
  if (isDuplicateTodo(todos, text)) {
    return null;
  }

  const todo = createTodo(todos, text);
  const todoElement = createTodoElement(text);

  todoElement.dataset.id = todo[todoKeys.id];

  todosElement.append(todoElement);
  return todoElement;
};

todosElement.addEventListener("click", event => {
  const completeButton = event.target.closest(".button-complete");
  const deleteButton = event.target.closest(".button-delete");

  if (!completeButton && !deleteButton) return;

  const todoElement = event.target.closest(".todo");
  if (!todoElement) return;

  const todoId = Number(todoElement.dataset.id);

  if (completeButton) {
    const updatedTodo = completeTodoById(todos, todoId);
    if (updatedTodo) {
      todoElement.classList.toggle("completed", updatedTodo[todoKeys.is_completed]);
    }
  }

  if (deleteButton) {
    deleteTodoById(todos, todoId);
    todoElement.remove();
  }
});

formElement.addEventListener("submit", event => {
  event.preventDefault();
  const text = inputElement.value.trim();
  if (!text) return;

  const todoElement = handleCreateTodo(todos, text);
  if (!todoElement) {
    inputElement.classList.add("error");
    setTimeout(() => inputElement.classList.remove("error"), 1500);
    return;
  }

  inputElement.value = "";
  inputElement.focus();
});
