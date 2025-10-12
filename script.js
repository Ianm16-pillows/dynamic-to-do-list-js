// Wait for the DOM to fully load before running the script
document.addEventListener('DOMContentLoaded', function() {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    /**
     * Load tasks from localStorage and render them in the DOM.
     * If no tasks are stored, an empty array is used.
     */
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => {
            // When loading from storage, pass save=false to avoid saving again
            addTask(taskText, false);
        });
    }

    /**
     * Save the given array of tasks to localStorage.
     * @param {Array<string>} tasksArr
     */
    function saveTasksToLocalStorage(tasksArr) {
        localStorage.setItem('tasks', JSON.stringify(tasksArr));
    }

    /**
     * Add a task to the DOM and optionally save it to localStorage.
     * @param {string|null} taskTextParam - If provided, use this text; otherwise read from taskInput.
     * @param {boolean} save - Whether to save the new task into localStorage (default true).
     */
    function addTask(taskTextParam = null, save = true) {
        // Determine task text (either passed or from input)
        let taskText = taskTextParam === null ? taskInput.value.trim() : String(taskTextParam).trim();

        // Validate non-empty
        if (taskText === "") {
            // If called by loadTasks with empty string, silently ignore
            if (taskTextParam === null) {
                alert("Please enter a task");
            }
            return;
        }

        // Create list item
        const li = document.createElement('li');

        // Create a span to hold the text (so we can distinguish it from the remove button)
        const textSpan = document.createElement('span');
        textSpan.textContent = taskText;

        // Create remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-btn';

        // Append text and button to li
        li.appendChild(textSpan);
        li.appendChild(removeBtn);

        // Append li to the task list in the DOM
        taskList.appendChild(li);

        // If save is true, update localStorage
        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(taskText);
            saveTasksToLocalStorage(storedTasks);
        }

        // Clear input field if the task came from the input
        if (taskTextParam === null) {
            taskInput.value = '';
        }

        // Attach event to remove button to remove task from DOM and localStorage
        removeBtn.addEventListener('click', function () {
            // Remove item from DOM
            taskList.removeChild(li);

            // Update localStorage: remove first occurrence of this task text
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            const index = storedTasks.indexOf(taskText);
            if (index > -1) {
                storedTasks.splice(index, 1);
                saveTasksToLocalStorage(storedTasks);
            }
        });
    }

    // Add click event to Add Task button
    addButton.addEventListener('click', function () {
        addTask(); // will read from input and save
    });

    // Add keypress event to input field to allow Enter key submission
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask(); // will read from input and save
        }
    });

    // Load tasks stored in localStorage when the page loads
    loadTasks();
});
