document.getElementById('new-task-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const taskTitle = document.getElementById('task-title').value.trim();
    const taskDesc = document.getElementById('task-desc').value.trim();
    const taskDate = document.getElementById('task-date').value.trim();

    if (taskTitle && taskDate) {
        addTask(taskTitle, taskDesc, taskDate, true); // O último argumento indica se deve salvar no localStorage
    }

    this.reset();
});

function addTask(title, desc, date, save = false) {
    const taskList = document.getElementById('tasks');
    
    // Verifique se a tarefa já existe no DOM
    const existingTask = Array.from(taskList.children).find(
        task => task.querySelector('h3').textContent === title && task.querySelector('small').textContent.includes(date)
    );

    if (!existingTask) {
        const taskItem = document.createElement('li');

        taskItem.innerHTML = `
            <div>
                <h3>${title}</h3>
                <p>${desc}</p>
                <small>Data: ${date}</small>
            </div>
            <button onclick="toggleComplete(this)">✔️</button>
        `;

        taskList.appendChild(taskItem);

        if (save) {
            saveTaskToLocalStorage(title, desc, date);
        }
    }
}

function toggleComplete(button) {
    const taskItem = button.parentElement;
    taskItem.classList.toggle('completed');
}

function saveTaskToLocalStorage(title, desc, date) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Evitar duplicação verificando se a tarefa já existe
    if (!tasks.some(task => task.title === title && task.desc === desc && task.date === date)) {
        tasks.push({ title, desc, date });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}

function loadTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addTask(task.title, task.desc, task.date));
}

window.onload = loadTasksFromLocalStorage;
