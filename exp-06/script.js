// Selecting elements
const themeToggle = document.getElementById('themeToggle');
const contactForm = document.getElementById('contactForm');
const savedInfoDisplay = document.getElementById('savedInfo');

// 1. DARK MODE TOGGLE & PERSISTENCE [cite: 101, 102]
// Retrieve saved theme on load [cite: 144]
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    // Save preference to Local Storage [cite: 142]
    const currentTheme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
    localStorage.setItem('theme', currentTheme);
});

// 2. FORM VALIDATION & DATA STORAGE [cite: 99, 143]
contactForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent page refresh [cite: 133]
    
    // Clear previous errors [cite: 123]
    document.querySelectorAll('.error').forEach(el => el.innerText = "");

    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;
    
    let isValid = true;

    // Email validation [cite: 118]
    if (!email.includes('@')) {
        document.getElementById('emailError').innerText = "Invalid email format.";
        isValid = false;
    }

    // Phone validation (10 digits) [cite: 119]
    if (phone.length !== 10 || isNaN(phone)) {
        document.getElementById('phoneError').innerText = "Phone must be 10 digits.";
        isValid = false;
    }

    // Password validation (min 6 chars) [cite: 120]
    if (password.length < 6) {
        document.getElementById('passwordError').innerText = "Password must be at least 6 characters.";
        isValid = false;
    }

    // If valid, store and display [cite: 143, 147]
    if (isValid) {
        const userData = { email, phone };
        localStorage.setItem('userData', JSON.stringify(userData));
        displayStoredData();
        alert("Form submitted and data saved!");
    }
});

// 3. RETRIEVE DATA ON REFRESH [cite: 134, 144]
function displayStoredData() {
    const data = JSON.parse(localStorage.getItem('userData'));
    if (data) {
        savedInfoDisplay.innerText = `Email: ${data.email}, Phone: ${data.phone}`;
    }
}

// Call on page load
displayStoredData();