const tasks = [];
if (localStorage.getItem('tasks')) {
    const tasksString = localStorage.getItem('tasks');
    const tasksArray = JSON.parse(tasksString);
    tasksArray.forEach(task => {
        tasks.push(task);
    });
    print();
}

const taskInput = document.getElementById('task');

taskInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        add();
    }
  });

function add() {
    const task = taskInput.value;
    taskInput.value = '';
    const obj = {name: task, done: false};
    tasks.push(obj);
    console.log(tasks);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    print();
}

function done(element) {
    const taskElement = element.parentElement.parentElement;
    const index = Array.from(taskElement.parentElement.children).indexOf(taskElement);
    tasks[index].done = !tasks[index].done;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    print();
}

function remove(element) {
    const taskElement = element.parentElement.parentElement;
    const index = Array.from(taskElement.parentElement.children).indexOf(taskElement);
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    print();
}


function print() {
    document.getElementById('tasks').innerHTML = '';
    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        const taskElement = document.createElement('div');
        taskElement.className = 'element';
        const color = task.done ? '#198754' : '#dc3545';
        taskElement.innerHTML = `<div class="task">
                                    <h6>${task.name}</h6>
                                </div>
                                <div class="buttons">
                                    <button class="btn btn-outline-success" onclick="done(this);">Done</button>
                                    <button class="btn btn-outline-danger" onclick="remove(this);">Remove</button>
                                </div>`;
        taskElement.style.borderLeftColor = color;
        document.getElementById('tasks').appendChild(taskElement);
    }
}
