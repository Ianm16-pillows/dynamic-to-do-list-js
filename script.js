document.addEventListener('DOMContentLoaded', () => {
  const addButton = document.getElementById('add-task');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');

  // Load tasks from local storage
  loadTasks();

  // Add event listeners
  addButton.addEventListener('click', () => {
    addTask(taskInput.value);
  });

  taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      addTask(taskInput.value);
    }
  });

  // Add a new task
  function addTask(taskText, save = true) {
    taskText = taskText.trim();
    if (taskText === '') return;

    const li = document.createElement('li');
    li.textContent = taskText;

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.className = 'remove-btn';

    removeBtn.addEventListener('click', () => {
      taskList.removeChild(li);
      removeTaskFromStorage(taskText);
    });

    li.appendChild(removeBtn);
    taskList.appendChild(li);
    taskInput.value = '';

    if (save) {
      const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
      storedTasks.push(taskText);
      localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }
  }

  // Load tasks from storage
  function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    storedTasks.forEach(task => addTask(task, false));
  }

  // Remove task from storage
  function removeTaskFromStorage(taskText) {
    let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    storedTasks = storedTasks.filter(task => task !== taskText);
    localStorage.setItem('tasks', JSON.stringify(storedTasks));
  }
});
