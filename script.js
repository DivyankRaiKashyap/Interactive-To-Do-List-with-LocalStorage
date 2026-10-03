```javascript
// Get HTML elements

const taskInput = document.getElementById("taskInput");

const addButton = document.getElementById("addButton");

const taskList = document.getElementById("taskList");

const taskCount = document.getElementById("taskCount");

const clearButton = document.getElementById("clearButton");


// Get tasks from LocalStorage

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


// Display tasks when page loads

displayTasks();


// Add task when button is clicked

addButton.addEventListener("click", addTask);


// Add task when Enter key is pressed

taskInput.addEventListener("keypress", function(event) {

    if (event.key === "Enter") {

        addTask();

    }

});


// Add a new task

function addTask() {

    const taskText = taskInput.value.trim();


    // Don't add empty task

    if (taskText === "") {

        alert("Please enter a task.");

        return;

    }


    // Create task object

    const task = {

        id: Date.now(),

        text: taskText,

        completed: false

    };


    // Add task to array

    tasks.push(task);


    // Save tasks

    saveTasks();


    // Clear input

    taskInput.value = "";


    // Display updated tasks

    displayTasks();

}


// Display all tasks

function displayTasks() {

    taskList.innerHTML = "";


    // Show empty message

    if (tasks.length === 0) {

        taskList.innerHTML =
            '<li class="empty-message">No tasks yet.</li>';

        updateTaskCount();

        return;

    }


    // Create each task

    tasks.forEach(function(task) {

        const li = document.createElement("li");

        li.className = "task";


        // Add completed class

        if (task.completed) {

            li.classList.add("completed");

        }


        // Left section

        const leftSection =
            document.createElement("div");

        leftSection.className = "task-left";


        // Checkbox

        const checkbox =
            document.createElement("input");

        checkbox.type = "checkbox";

        checkbox.className = "task-checkbox";

        checkbox.checked = task.completed;


        // Change completed status

        checkbox.addEventListener("change", function() {

            toggleTask(task.id);

        });


        // Task text

        const text =
            document.createElement("span");

        text.className = "task-text";

        text.textContent = task.text;


        // Delete button

        const deleteButton =
            document.createElement("button");

        deleteButton.className = "delete-button";

        deleteButton.textContent = "Delete";


        deleteButton.addEventListener("click", function() {

            deleteTask(task.id);

        });


        // Put checkbox and text together

        leftSection.appendChild(checkbox);

        leftSection.appendChild(text);


        // Put everything inside task

        li.appendChild(leftSection);

        li.appendChild(deleteButton);


        // Add task to list

        taskList.appendChild(li);

    });


    updateTaskCount();

}


// Mark task complete/incomplete

function toggleTask(id) {

    tasks = tasks.map(function(task) {

        if (task.id === id) {

            task.completed = !task.completed;

        }

        return task;

    });


    saveTasks();

    displayTasks();

}


// Delete task

function deleteTask(id) {

    tasks = tasks.filter(function(task) {

        return task.id !== id;

    });


    saveTasks();

    displayTasks();

}


// Clear completed tasks

clearButton.addEventListener("click", function() {

    tasks = tasks.filter(function(task) {

        return !task.completed;

    });


    saveTasks();

    displayTasks();

});


// Save tasks to LocalStorage

function saveTasks() {

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );

}


// Update task counter

function updateTaskCount() {

    const remainingTasks =
        tasks.filter(function(task) {

            return !task.completed;

        }).length;


    if (remainingTasks === 1) {

        taskCount.textContent = "1 task remaining";

    } else {

        taskCount.textContent =
            remainingTasks + " tasks remaining";

    }

}
```
