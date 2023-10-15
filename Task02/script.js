
// Load tasks from localStorage on page load
window.onload = function() {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskList = document.getElementById('taskList');
    
    for (const taskText of savedTasks) {
        createTaskElement(taskText);
    }
}

function addTask() {
    const taskInput = document.getElementById('task');
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        createTaskElement(taskText);

        // Save tasks to localStorage
        const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        savedTasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(savedTasks));

        taskInput.value = '';
    }
}

function createTaskElement(taskText) {
    const taskList = document.getElementById('taskList');
    const listItem = document.createElement('li');
    listItem.textContent = taskText;

    const deleteButton = document.createElement('button');
    deleteButton.className = 'btn del-btn';
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = function () {
        taskList.removeChild(listItem);
        updateLocalStorage();
    };

    const editButton = document.createElement('button');
    editButton.className = 'btn edit-btn';
    editButton.textContent = 'Edit';
    editButton.onclick = function () {
        const newText = prompt('Edit task:', taskText);
        if (newText !== null) {
            listItem.textContent = newText;
            updateLocalStorage();
        }
    };

    listItem.appendChild(deleteButton);
    listItem.appendChild(editButton);
    taskList.appendChild(listItem);
}

function updateLocalStorage() {
    const tasks = Array.from(document.querySelectorAll('#taskList li')).map(li => li.textContent);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
