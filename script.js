//todos -- add unique id as entry to storage, change storage to reference by id number

const list = document.querySelector('#todo-list');
const form = document.querySelector('#todo-form');

// restore todos for storage and append to html
let cache = JSON.parse(localStorage.getItem('todos')) || [];
if (cache.length > 0) {
    for (let todo of cache) {
        createLi(todo.todoText, todo.isCompleted);
    }
    todoUniqueId++ // increment id to stay unique
}

// submit listenenr
form.addEventListener('submit', function(e) {
    e.preventDefault();

    let todoTextValue = document.querySelector('#todo-new-item').value;
    createLi(todoTextValue, false);
    cache.push({todoText: todoTextValue, isCompleted: false});

    form.reset();
    localStorage.setItem('todos', JSON.stringify(cache));
})

list.addEventListener('click', function(e) {
    if (e.target.tagName === 'LI') {
        let currentTodo = cache.find(function(key, index) {
            if (parseInt(key.todoId) === parseInt(e.target.dataset.todoId)) {
                return true;
            }
        });
        e.target.classList.toggle('completed');
        currentTodo.isCompleted = currentTodo.isCompleted ? false : true;
    } else if (e.target.tagName === 'BUTTON') {
        let currentTodo = cache.findIndex(function(key, index) {
            if (parseInt(key.todoId) === parseInt(e.target.parentElement.dataset.todoId)) {
                return true;
            }
        });
        cache.splice(currentTodo, 1);
        e.target.parentElement.remove();
    }
    localStorage.setItem('todos', JSON.stringify(cache));
})

function createLi(text, completed) {
    let btn = document.createElement('button');
    let li = document.createElement('li');
    
    btn.innerText = 'x';
    li.innerText = text;
    li.completed = completed;
    if (completed) {
        li.classList.add('completed');
    }

    li.append(btn);
    list.append(li);
}