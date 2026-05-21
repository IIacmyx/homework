export const getTodosFromLocalStorage = () => {
  const data = localStorage.getItem("todos");
  return data ? JSON.parse(data) : [];
};

export const setTodosToLocalStorage = todos => {
  localStorage.setItem("todos", JSON.stringify(todos));
};