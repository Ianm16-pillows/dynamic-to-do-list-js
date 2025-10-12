// Wait for the DOM to fully load before running the script
document.addEventListener('DOMContentLoaded', function() {

    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to add a new task
    function addTask() {
        // Get and trim the task text
        const taskText = taskInput.value.trim();

        // Check if input is empty
        if (taskText === "") {
            alert("Please enter a task");
            return;
        }

        // Create new list item for the task
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create remove button for each task
        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.className = 'remove-btn';

        // Add event to remove button
        removeBtn.onclick = function() {
            taskList.removeChild(li);
        };

        // Append remove button to the list item
        li.appendChild(removeBtn);

        // Append the list item to the task list
        taskList.appendChild(li);

        // Clear input field
        taskInput.value = "";
    }

    // Add click event to Add Task button
    addButton.addEventListener('click', addTask);

    // Add keypress event to input field to allow Enter key submission
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});
