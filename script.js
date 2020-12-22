//todos -- add unique id as entry to storage, change storage to reference by id number

let todoUniqueId = 1; // always holds newest unique identifier for newly added todo

const todoList = document.querySelector('#todo-list');
const todoForm = document.querySelector('#todo-form');

// restore todos for storage and append to html
let cachedTodos = JSON.parse(localStorage.getItem('savedTodos')) || [];
if (cachedTodos.length > 0) {
    for (let todo of cachedTodos) {
        let todoId = parseInt(todo.todoId);
        appendTodoList(todoId, todo.todoText, todo.isCompleted);
        todoUniqueId = parseInt(todoUniqueId) > todoId ? parseInt(todoUniqueId) : todoId; // set to highest id
    }
    todoUniqueId++ // increment id to stay unique
}

// submit listenenr
todoForm.addEventListener('submit', function(e) {
    e.preventDefault();

    let todoTextValue = document.querySelector('#new-item').value;
    appendTodoList(todoUniqueId, todoTextValue, false);
    cachedTodos.push({todoId: todoUniqueId, todoText: todoTextValue, isCompleted: false});

    todoUniqueId++; // after adding todo, increment unique id
    todoForm.reset();
    localStorage.setItem('savedTodos', JSON.stringify(cachedTodos));
})

todoList.addEventListener('click', function(e) {
    if (e.target.tagName === 'LI') {
        let currentTodo = cachedTodos.find(function(key, index) {
            if (parseInt(key.todoId) === parseInt(e.target.dataset.todoId)) {
                return true;
            }
        });
        e.target.classList.toggle('completed');
        currentTodo.isCompleted = currentTodo.isCompleted ? false : true;
    } else if (e.target.tagName === 'BUTTON') {
        let currentTodo = cachedTodos.findIndex(function(key, index) {
            if (parseInt(key.todoId) === parseInt(e.target.parentElement.dataset.todoId)) {
                return true;
            }
        });
        cachedTodos.splice(currentTodo, 1);
        e.target.parentElement.remove();
    }
    localStorage.setItem('savedTodos', JSON.stringify(cachedTodos));
})

function appendTodoList(todoId, todoText, isCompleted) {
    let removeButton = document.createElement('button');
    removeButton.innerText = 'x';

    let newTodo = document.createElement('li');
    newTodo.dataset.todoId = todoId;
    newTodo.innerText = todoText;
    newTodo.isCompleted = isCompleted;
    if (newTodo.isCompleted) {
        newTodo.classList.add('completed');
    }

    newTodo.append(removeButton);
    todoList.append(newTodo);
}