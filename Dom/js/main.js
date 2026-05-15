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
  const todo = createTodo(todos, text);
  const todoElement = createTodoElement(text);

  todoElement.dataset.id = todo[todoKeys.id];

  const completeButton = todoElement.querySelector(".button-complete");
  const deleteButton = todoElement.querySelector(".button-delete");

  completeButton.addEventListener("click", () => {
    const updatedTodo = completeTodoById(todos, Number(todoElement.dataset.id));
    if (updatedTodo) {
      todoElement.classList.toggle("completed", updatedTodo[todoKeys.is_completed]);
    }
  });

  deleteButton.addEventListener("click", () => {
    deleteTodoById(todos, Number(todoElement.dataset.id));
    todoElement.remove();
  });

  todosElement.append(todoElement);
  return todoElement;
};

formElement.addEventListener("submit", event => {
  event.preventDefault();
  const text = inputElement.value.trim();
  if (!text) return;
  handleCreateTodo(todos, text);
  inputElement.value = "";
  inputElement.focus();
});
