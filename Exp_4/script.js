// 1. Selecting elements from the DOM
const submitBtn = document.getElementById('submitBtn');
const themeBtn = document.getElementById('themeBtn');
const userNameInput = document.getElementById('userName');
const displayArea = document.getElementById('displayArea');
const greeting = document.getElementById('greeting');
const timestamp = document.getElementById('timestamp');

// 2. Function to handle the "Click Me" event
function handleInteraction() {
    const name = userNameInput.value;

    if (name.trim() === "") {
        alert("Please enter a name!");
        return;
    }

    // Update content dynamically
    greeting.textContent = `Hello, ${name}! Welcome to AIML Dept.`;
    timestamp.textContent = "Last Interaction: " + new Date().toLocaleTimeString();

    // Remove the 'hidden' class to show the content
    displayArea.classList.remove('hidden');
}

// 3. Event Listener for the Submit Button
submitBtn.addEventListener('click', handleInteraction);

// 4. Event Listener for Dark Mode Toggle
themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});