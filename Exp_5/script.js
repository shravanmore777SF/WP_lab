// Selecting HTML elements using DOM methods
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

// Function to add a new task
function addTask() {
    const taskValue = taskInput.value;

    // Check if input is empty
    if (taskValue === "") {
        alert("Please enter a task!");
        return;
    }

    // 1. Dynamically create a new list item (li)
    const li = document.createElement('li');
    
    // 2. Set the content of the li using the input value
    li.innerHTML = `
        <span>${taskValue}</span>
        <button class="delete-btn">Delete</button>
    `;

    // 3. Append the new task to the taskList (ul)
    taskList.appendChild(li);

    // 4. Clear the input field for the next task
    taskInput.value = "";

    // 5. Add event listener to the delete button of this specific task
    const deleteBtn = li.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', function() {
        taskList.removeChild(li); // Remove element from DOM
    });
}

// Event listener for the "Add Task" button click
addBtn.addEventListener('click', addTask);

// Optional: Allow pressing "Enter" key to add task (keydown event)
taskInput.addEventListener('keydown', function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});