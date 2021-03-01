// Global variables
let todoList = getSavedTodos();

const filters = {
  searchText: '',
  hideCompleted: false,
  sortMethod: 'byAlphabetical'
};

// Initial rendering
renderTodos(todoList, filters);
renderHeader(todoList);

// Click a button, add a new to-do item
document.querySelector('#add-todo').addEventListener('submit', (e) => {
  e.preventDefault();
  const newTodo = {
    id: uuidv4(),
    createdDate: moment().valueOf(),
    modifiedDate: moment().valueOf(),
    body: e.target.elements.todoText.value,
    isCompleted: false
  }
  todoList.push(newTodo);
  saveTodos(todoList);
  renderTodos(todoList, filters);
  renderHeader(todoList);
  e.target.elements.todoText.value = '';
})

// Click a button, delete Completed todos
document.querySelector('#delete-completed').addEventListener('click', (e) => {
  todoList = todoList.filter(todo => !todo.isCompleted);
  saveTodos(todoList);
  renderTodos(todoList, filters);
})

// Enter a query in search bar, dynamically fitler the rendered todos
document.querySelector('#filter-todo').addEventListener('input', (e) =>{
  filters.searchText = e.target.value;
  renderTodos(todoList, filters);
})

// Click a checkbox, hide completed to-do's
document.querySelector('#hide-completed').addEventListener('change', (e) =>{
  filters.hideCompleted = e.target.checked;
  renderTodos(todoList, filters);
})

// Select a sort method, sort the elements
document.querySelector('#filter-options').addEventListener('change', (e) =>{
  filters.sortMethod = e.target.value;
  renderTodos(todoList, filters);
})

// // Re-render the notes when a title changes
// window.addEventListener('storage', (e) => {
//   if (e.key === 'todoList') {
//     todoList = JSON.parse(e.newValue);
//     renderTodos(todoList, filters);
//   }
// })