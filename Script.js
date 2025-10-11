
// script.js
// Advanced To-Do List: DOM + Events + localStorage
document.addEventListener('DOMContentLoaded', function () {
  // Select DOM elements
  const addButton = document.getElementById('add-task-btn');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');

  // In-memory tasks array (keeps sync with localStorage)
  let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');

  /**
   * createTaskElement
   * Creates an li element for the given taskText, wires up its remove button,
   * and appends it to the DOM. Does NOT update localStorage by itself.
   * @param {string} taskText
   */
  function createTaskElement(taskText) {
    const li = document.createElement('li');

    // Task text node
    const textNode = document.createTextNode(taskText);
    li.appendChild(textNode);

    // Remove button
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.className = 'remove-btn';

    // When clicked, remove the li from DOM and remove from storage
    removeBtn.onclick = function () {
      // Remove DOM element
      if (li.parentNode === taskList) {
        taskList.removeChild(li);
      }

      // Remove FIRST occurrence of taskText from tasks array and update storage
      const index = tasks.indexOf(taskText);
      if (index > -1) {
        tasks.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
      }
    };

    li.appendChild(removeBtn);
    taskList.appendChild(li);
  }

  /**
   * addTask
   * If called with no argument, reads and trims the value from the input field.
   * If called with a string argument, uses that string as the task text.
   * Validates non-empty; alerts if empty. Adds DOM element and updates localStorage.
   * @param {string} [taskTextParam]
   */
  function addTask(taskTextParam) {
    // Get and trim input if no param provided
    const taskText = (typeof taskTextParam === 'string')
      ? taskTextParam.trim()
      : taskInput.value.trim();

    // Validate
    if (taskText === '') {
      alert('Please enter a task!');
      return;
    }

    // Create DOM element for the task
    createTaskElement(taskText);

    // Update tasks array and persist
    tasks.push(taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    // Clear input (only when user typed it)
    if (typeof taskTextParam !== 'string') {
      taskInput.value = '';
    }
  }

  /**
   * loadTasks
   * Populates the DOM from the tasks array (which is already loaded from localStorage).
   */
  function loadTasks() {
    tasks.forEach(taskText => {
      createTaskElement(taskText);
    });
  }

  // Initialize UI from storage
  loadTasks();

  // Attach events: button click and Enter key
  addButton.addEventListener('click', function () {
    addTask();
  });

  taskInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
      addTask();
    }
  });
});
