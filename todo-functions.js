// Check storage for todos
const getSavedTodos = () => {
  const todoListJSON = localStorage.getItem('todoList');
  try {
    return todoListJSON ? JSON.parse(todoListJSON) : [];
  } catch(e) {
    console.log(e.message);
    return []
  }
}

// Save todos to storage
const saveTodos = (todoList) => {
  localStorage.setItem('todoList',JSON.stringify(todoList))
}

// Rendering Header
const renderHeader = (todos) => {
  const incompleteTodos = todos.filter(todo => !todo.isCompleted);
  document.querySelector('#remaining-todos').textContent = `You have ${incompleteTodos.length} items remaining on your list.`;
}

// Rendering to-do list
const renderTodos = (todos, filters) => {
  todos = sortTodos(todos, filters.sortMethod)
  document.querySelector('#todo-list').innerHTML = ''
  // const filteredTodos = todos.filter(todo => matchesTodosFilter(todo, filters))
  todos.forEach(todo => {
    if (matchesTodosFilter(todo, filters)) {
      const newTodo = createTodoDOM(todo);
      document.querySelector('#todo-list').appendChild(newTodo)
    }
  })
}

// Check if to-do matches the filters
const matchesTodosFilter = (todo, filters) => {
  const matchesSearchText = todo.body.toLowerCase().includes(filters.searchText.toLowerCase())
  const matchesHideCompleted = (filters.hideCompleted ? !todo.isCompleted : true)
  return matchesSearchText && matchesHideCompleted;
}

// Create to-do HTML element
const createTodoDOM = (todo) => {
  const newTodo = document.createElement('div');
  const newTodoCheckbox = document.createElement('input');
  const newTodoText = document.createElement('span');
  const newTodoCreatedText = document.createElement('span');
  const newTodoModifiedText = document.createElement('span');
  const newTodoDelete = document.createElement('button');
  const newTodoEdit = document.createElement('button');

  // if item is completed, sytle with strike-through
  newTodo.style.textDecoration = todo.isCompleted ? 'line-through' : 'none'

  // Checkbox element
  newTodoCheckbox.setAttribute('type', 'checkbox');
  newTodoCheckbox.checked = todo.isCompleted;
  newTodoCheckbox.addEventListener('change', (e) => {
    // Click the checkbox, switch to-do from completed to not completed
    targetTodo = todoList.find(globalTodo => globalTodo.id === todo.id);
    if (targetTodo) {
      targetTodo.isCompleted = !targetTodo.isCompleted
    }
    saveTodos(todoList);
    renderTodos(todoList, filters);
    renderHeader(todoList);
  })
  newTodo.appendChild(newTodoCheckbox);

  // Text element
  newTodoText.textContent = todo.body;
  newTodo.appendChild(newTodoText);

  // Created Text element
  newTodoCreatedText.textContent = ` (Created: ${moment(todo.createdDate).fromNow()}) `;
  newTodo.appendChild(newTodoCreatedText);

  // Created Text element
  newTodoModifiedText.textContent = `(Edited: ${moment(todo.modifiedDate).fromNow()}) `;
  newTodo.appendChild(newTodoModifiedText);  

  // Delete button element
  newTodoDelete.textContent = "x"
  newTodoDelete.addEventListener('click', (e) => {
    // Click the button, delete the todo
    const noteIndex = todoList.findIndex(globalTodo => globalTodo.id === todo.id);
    if (noteIndex > -1) {
      todoList.splice(noteIndex,1);
    }
    saveTodos(todoList);
    renderTodos(todoList, filters);
    renderHeader(todoList);
  })
  newTodo.appendChild(newTodoDelete);

  // Link to edit page
  newTodoEdit.textContent = 'Edit';
  newTodoEdit.addEventListener('click', () => {
    location.assign(`/edit.html#${todo.id}`)
  })
  newTodo.appendChild(newTodoEdit);

  return newTodo;
}

// Sort the to-do list
const sortTodos = (todos, sortMethod) => {
  switch (sortMethod) {
    case 'byAlphabetical':
      return todos.sort((a, b) => {
        if (a.body.toLowerCase() < b.body.toLowerCase()){
          return -1
        } else if (b.body.toLowerCase() < a.body.toLowerCase()){
          return 1
        } else {
          return 0
        };
      });
    case 'byCreatedDate':
      return todos.sort((a, b) => b.createdDate - a.createdDate);
    case 'byModifiedDate':
      return todos.sort((a, b) => b.modifiedDate - a.modifiedDate);
    default:
      console.log("Switch is broken")
  }
}
