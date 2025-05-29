//selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//event listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterToDo);

//functions
function addTodo(event){
    event.preventDefault(); //prevent form from submitting right away

    //todo DIV
    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");

    //create LI
    const newToDo = document.createElement('li');
    newToDo.innerText = todoInput.value;
    newToDo.classList.add("todo-item");
    todoDiv.appendChild(newToDo);

    //ADD TODO TO LOCAL STORAGE
    saveLocalTodos(todoInput.value);

    //Check mark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"><i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    
    //trash Button 
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"><i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    //Append to list
    todoList.appendChild(todoDiv);

    //clear todo input val
    todoInput.value = "";
}

function deleteCheck(e){
    const item = e.target;
    
    //delete todo
    if(item.classList[0] === 'trash-btn'){
        const todo = item.parentElement;

        //animation
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener('transitioned', function(){
            todo.remove();
        });
    }

    //check mark todo
    if(item.classList[0] === "complete-btn"){
        const todo = item.parentElement;
        todo.classList.toggle("completed");
        console.log("hello");
    }
}

function filterToDo(e) {
    const todos = todoList.children; // Use children instead of childNodes
    console.log(todos);
    Array.from(todos).forEach(function(todo) { // Convert to array for compatibility
        switch (e.target.value) {
            case "all":
                todo.style.display = 'flex'; // Show all tasks
                break;
            case "completed":
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'flex'; // Show completed tasks
                } else {
                    todo.style.display = 'none'; // Hide uncompleted tasks
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = 'flex'; // Show uncompleted tasks
                } else {
                    todo.style.display = 'none'; // Hide completed tasks
                }
                break;
        }
    });
}

function saveLocalTodos(todo){
    //check if you already have things in there
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    } else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos(){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    } else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach(function (todo){
        //todo DIV
        const todoDiv = document.createElement('div');
        todoDiv.classList.add("todo");

        //create LI
        const newToDo = document.createElement('li');
        newToDo.innerText = todo;
        newToDo.classList.add("todo-item");
        todoDiv.appendChild(newToDo);

        //Check mark button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"><i>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);
        
        //trash Button 
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"><i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);

        //Append to list
        todoList.appendChild(todoDiv);
    });

}

function removeLocalTodos(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    } else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}
