const todoList = document.querySelector('#todo-list');
const todoForm = document.querySelector('#todo-form');

// generate unique id for todos by incrementing counter for new todos
let uniqueTodoId = parseInt(localStorage.getItem('uniqueTodoId')) || 1;
// restore todos for storage and append to html
let cachedTodos = JSON.parse(localStorage.getItem('savedTodos')) || [];
if (cachedTodos.length > 0) {
    for (let todo of cachedTodos) {
        createLi(todo.id, todo.text, todo.done);
    }
}

// submit listener
todoForm.addEventListener('submit', function(e) {
    let text = document.querySelector('#new-item').value;
    e.preventDefault();
    createLi(uniqueTodoId, text, false);
    cachedTodos.push({
        'id': uniqueTodoId,
        'text': text,
        'done': false
    });
    todoForm.reset();
    localStorage.setItem('uniqueTodoId', uniqueTodoId++);
    localStorage.setItem('savedTodos', JSON.stringify(cachedTodos));
})

todoList.addEventListener('click', function(e) {
    if (e.target.tagName === 'LI') {
        e.target.classList.toggle('done');
        // finds todo in cache
        let todo = cachedTodos.find(function(key, index) {
            if (parseInt(key.id) === parseInt(e.target.dataset.id)) {
                return true;
            }
        });
        todo.done = todo.done ? false : true;
    } else if (e.target.tagName === 'BUTTON') {
        e.target.parentElement.remove();
        // finds todo in cache
        let todo = cachedTodos.findIndex(function(key, index) {
            if (parseInt(key.id) === parseInt(e.target.parentElement.dataset.id)) {
                return true;
            }
        });
        cachedTodos.splice(todo, 1);
    }
    localStorage.setItem('savedTodos', JSON.stringify(cachedTodos));
})

function createLi(id, text, done) {
    let li = document.createElement('li');
    let button = document.createElement('button');
    
    li.dataset.id = id;
    li.innerText = text;
    if (done) {
        li.classList.add('done');
    }
    button.innerText = 'x';

    li.append(button);
    todoList.append(li);
}
