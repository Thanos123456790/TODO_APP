document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('new-task');
    const addTaskButton = document.getElementById('add-task');
    const taskList = document.getElementById('task-list');

    addTaskButton.addEventListener('click', addTask);
    taskList.addEventListener('click', handleTaskAction);

    loadTasks();

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText) {
            const task = createTaskElement(taskText);
            taskList.appendChild(task);
            saveTask(taskText);
            taskInput.value = '';
        }
    }

    function createTaskElement(taskText) {
        const li = document.createElement('li');
        li.textContent = taskText;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete');
        li.appendChild(deleteButton);

        li.addEventListener('dblclick', () => {
            li.classList.toggle('completed');
            updateTaskStatus(taskText, li.classList.contains('completed'));
        });

        return li;
    }

    function handleTaskAction(e) {
        if (e.target.classList.contains('delete')) {
            const taskItem = e.target.parentElement;
            const taskText = taskItem.firstChild.textContent;
            taskItem.remove();
            deleteTask(taskText);
        }
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            const taskElement = createTaskElement(task.text);
            if (task.completed) {
                taskElement.classList.add('completed');
            }
            taskList.appendChild(taskElement);
        });
    }

    function saveTask(taskText) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push({ text: taskText, completed: false });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function deleteTask(taskText) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks = tasks.filter(task => task.text !== taskText);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function updateTaskStatus(taskText, completed) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const task = tasks.find(task => task.text === taskText);
        if (task) {
            task.completed = completed;
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }
});
