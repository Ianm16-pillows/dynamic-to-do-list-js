// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', () => {
  const addButton = document.getElementById('add-task-btn');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');

  // Load tasks from localStorage when page loads
  loadTasks();

  // Function to add a task
  function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
      alert("Please enter a task!");
      return;
    }

    // Create task element
    const li = document.createElement('li');
    li.textContent = taskText;

    // Create remove button
    const removeBtn = document.createElement('button');
    removeBtn.textContent = "Remove";
    removeBtn.className = 'remove-btn';

    // When remove is clicked, delete task
    removeBtn.onclick = () => {
      taskList.removeChild(li);
      removeTaskFromStorage(taskText);
    };

    // Append elements
    li.appendChild(removeBtn);
    taskList.appendChild(li);

    // Save task
    saveTask(taskText);

    // Clear input
    taskInput.value = '';
  }

  // Save task to localStorage
  function saveTask(task) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  // Remove task from localStorage
  function removeTaskFromStorage(task) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(t => t !== task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  // Load tasks from localStorage
  function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
      const li = document.createElement('li');
      li.textContent = task;

      const removeBtn = document.createElement('button');
      removeBtn.textContent = "Remove";
      removeBtn.className = 'remove-btn';

      removeBtn.onclick = () => {
        taskList.removeChild(li);
        removeTaskFromStorage(task);
      };

      li.appendChild(removeBtn);
      taskList.appendChild(li);
    });
  }

  // Add button event
  addButton.addEventListener('click', addTask);

  // Allow adding task with Enter key
  taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      addTask();
    }
  });
});
