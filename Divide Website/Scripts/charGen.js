document
  .querySelector("#character-form", "#randomize-button")
  .addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent form submission

    console.log("Submit event triggered");
    try {
      const formData = new FormData(event.target);
      console.log("Form Data:", Array.from(formData.entries())); // Log formData

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 100000); // Adjust the timeout as needed.

      const response = await fetch("http://localhost:7000/CharGen", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams([...formData.entries()]).toString(),
        signal: controller.signal,
      });

      console.log("Response:", response); // Log the response

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;

      var nameValue = document.getElementById("name").value;
      a.download = nameValue + ".txt"; // or use any other filename you prefer
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      console.error("Error:", error);
      console.error("Stack trace:", error.stack); // Log the whole error object
    }
  });
