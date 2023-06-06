// Validation functions
function isValidEmail(email) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

function isValidPassword(password) {
  return password.length >= 8;
}

// Event listener for the form submission
document
  .getElementById("registrationForm")
  .addEventListener("submit", async (event) => {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Retrieve the values from the form
    const firstName = document.getElementById("fname").value;
    const lastName = document.getElementById("lname").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Validate the email and password
    if (!isValidEmail(email)) {
      alert("Please enter a valid email.");
      return;
    }

    if (!isValidPassword(password)) {
      alert("Password should be at least 8 characters long.");
      return;
    }

    // Define the payload to send to your Azure Function
    const payload = {
      firstName,
      lastName,
      email,
      password,
    };

    // Send the payload to your Azure Function using the fetch API
    try {
      const response = await fetch(
        "https://dividefuncapp.azurewebsites.net/api/DivideFunction?",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-functions-key":
              "q6oYRHQPfiE0ySByboQNvRq13QbFA38zAU5zLghTi0NuAzFuCzmevA==",
          },
          body: JSON.stringify(payload),
        }
      );

      // Check the response status and display an appropriate message
      if (response.ok) {
        alert("Account created successfully!");
      } else {
        alert("There was an error creating your account. Please try again.");
      }
    } catch (error) {
      // Handle network errors
      alert("There was a network error. Please try again.");
    }
  });
