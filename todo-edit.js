const targetTodoID = location.hash.substring(1);
let todoList = getSavedTodos();
let targetTodo = todoList.find(todo => todo.id === targetTodoID);

if (!targetTodo) {
  location.assign('/index.html');
}

const todoInput = document.querySelector('#todo-text');
todoInput.value = targetTodo.body;
todoInput.addEventListener('input', (e) => {
  targetTodo.body = e.target.value;
  targetTodo.modifiedDate = moment().valueOf();
  saveTodos(todoList);
})

window.addEventListener('storage', (e) => {
  if (e.key === 'todoList') {
    todoList = JSON.parse(e.newValue);
    targetTodo = todoList.find(todo => todo.id === targetTodoID);

    if (!targetTodo) {
      location.assign('/index.html');
    }

    todoInput.value = targetTodo.body
  }
})