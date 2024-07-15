

// Contact us
document.querySelectorAll("input").forEach(input => {
    input.addEventListener("keyup", validateInput);
});

document.getElementById("registrationForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission

    const errorContainer = document.getElementById("errorMessages");
    errorContainer.innerHTML = "";

    // Validate all inputs before submission
    let valid = true;

    document.querySelectorAll("input").forEach(input => {
        if (!validateInput({ target: input })) {
            valid = false;
        }
    });

    if (valid) {
        alert("Form submitted successfully!");
        document.getElementById("registrationForm").reset();
    }
});

function validateInput(event) {
    const input = event.target;
    const value = input.value.trim();
    const errorMessages = [];
    let valid = true;

    const nameRegex = /^[A-Za-z\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10,13}$/;
    const ageRegex = /^(0?[1-9]|[1-9][0-9])$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    switch (input.id) {
        case "name":
            if (!value || !nameRegex.test(value)) {
                errorMessages.push("Valid name is required (letters and spaces only).");
                valid = false;
            }
            break;
        case "email":
            if (!value || !emailRegex.test(value)) {
                errorMessages.push("Valid email is required (e.g., example@yyy.zzz).");
                valid = false;
            }
            break;
        case "phone":
            if (!value || !phoneRegex.test(value)) {
                errorMessages.push("Phone number must be 10 to 13 digits.");
                valid = false;
            }
            break;
        case "age":
            if (!value || !ageRegex.test(value)) {
                errorMessages.push("Age must be a valid number between 1 and 99.");
                valid = false;
            }
            break;
        case "password":
            if (!value || !passwordRegex.test(value)) {
                errorMessages.push("Password must be at least 8 characters, including at least one letter and one number.");
                valid = false;
            }
            break;
        case "confirmPassword":
            const password = document.getElementById("password").value;
            if (value !== password) {
                errorMessages.push("Passwords do not match.");
                valid = false;
            }
            break;
    }

    const errorContainer = document.getElementById("errorMessages");
    errorContainer.innerHTML = ""; // Clear previous errors
    if (!valid) {
        errorMessages.forEach(message => {
            const div = document.createElement("div");
            div.textContent = message;
            errorContainer.appendChild(div);
        });
    }

    return valid; // Return the validity of the input
}
