export function initializeButtonFunctionality() {
  const fileInput = document.getElementById("imageUpload");
  const amountButtons = document.querySelectorAll(".amountButton");

  // Load saved button data from local storage
  loadButtonData();

  // Track the currently selected button
  let selectedButton = null;

  // Add click event listeners to all buttons
  amountButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons
      amountButtons.forEach((btn) => btn.classList.remove("active"));
      // Add active class to the clicked button
      button.classList.add("active");
      // Update the selected button
      selectedButton = button;
    });
  });

  // Handle file upload event
  fileInput.addEventListener("change", (event) => {
    const file = event.target.files[0]; // Get the uploaded file

    if (!file) return; // No file selected

    // Validate the file type
    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image file.");
      return;
    }

    // Validate the file size (e.g., limit to 2MB)
    if (file.size > 2 * 1024 * 1024) {
      alert("File size must be less than 2MB.");
      return;
    }

    // Read the file as a data URL
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageDataUrl = e.target.result;

      // Check if a button is selected
      if (selectedButton) {
        // Update the button's image
        const imgElement = selectedButton.querySelector("img");
        imgElement.src = imageDataUrl;

        // Optionally, update the button's data-amount
        const newAmount = prompt("Enter the new amount (in Riel):");
        if (newAmount && !isNaN(newAmount)) {
          selectedButton.setAttribute("data-amount", newAmount);
          selectedButton.querySelector("span").textContent = `${newAmount}៛`;
        }

        // Save button data to local storage
        saveButtonData(selectedButton);
      } else {
        alert("Please select a button first.");
      }
    };

    reader.readAsDataURL(file); // Start reading the file
  });
}

// Function to save button data to local storage
function saveButtonData(button) {
  const buttonId = button.getAttribute("data-value"); // Use the button's unique ID
  const imgSrc = button.querySelector("img").src;
  const amount = button.getAttribute("data-amount");

  // Store the data in local storage
  localStorage.setItem(
    `button-${buttonId}`,
    JSON.stringify({ imgSrc, amount })
  );
}

// Function to load button data from local storage
function loadButtonData() {
  const amountButtons = document.querySelectorAll(".amountButton");
  amountButtons.forEach((button) => {
    const buttonId = button.getAttribute("data-value");
    const savedData = localStorage.getItem(`button-${buttonId}`);

    if (savedData) {
      const { imgSrc, amount } = JSON.parse(savedData);

      // Update the button's image and amount
      button.querySelector("img").src = imgSrc;
      button.setAttribute("data-amount", amount);
      button.querySelector("span").textContent = `${amount}៛`;
    }
  });
}
