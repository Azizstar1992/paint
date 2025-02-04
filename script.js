const numberInput = document.getElementById("number-input");
const errorMessage = document.getElementById("error-message");
const grid = document.getElementById("grid-container");
const colourPickerButton = document.getElementById("colour-picker-button");
let storedNumber = null;
let selectedColor = "#000000"; // Default color

// Create a hidden color input element
const colourPicker = document.createElement("input");
colourPicker.type = "color";
colourPicker.style.display = "none"; // Hide the color picker input
document.body.appendChild(colourPicker);

// Event listener for the color picker button
colourPickerButton.addEventListener("click", () => {
    colourPicker.click(); // Programmatically trigger the color picker
});

// Event listener for the hidden color picker input
colourPicker.addEventListener("input", () => {
    selectedColor = colourPicker.value; // Update selected color
});

// Event listener for number input
numberInput.addEventListener("input", () => {
    const value = numberInput.value;

    // Reset error message and styles
    errorMessage.textContent = "";
    numberInput.style.border = "";

    if (!/^-?\d+$/.test(value) && value !== "") {
        errorMessage.textContent = "Please enter a valid integer!";
        errorMessage.style.color = "red";
        numberInput.style.border = "2px solid red";
        storedNumber = null;
    } else {
        storedNumber = value !== "" ? parseInt(value, 10) : null;

        if (storedNumber > 100) {
            errorMessage.textContent = `Please select a number lower than 101`;
            errorMessage.style.color = "red";
            numberInput.style.border = "2px solid red";
            storedNumber = null;
        } else if (storedNumber !== null && storedNumber > 0) {
            errorMessage.textContent = `You've selected ${value}`;
            errorMessage.style.color = "green";
            numberInput.style.border = "2px solid green";
            add(storedNumber);
        }
    }
});

function add(size) {
    console.log("Stored Integer:", size);

    
    // Clear the grid before creating a new one
    grid.innerHTML = '';

    if (size > 0) {
        grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
        grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

        for (let i = 0; i < size * size; i++) {
            let div = document.createElement("div");
            div.classList.add("box");

            // Add event listener to each grid item for painting
            div.addEventListener("mousedown", () => {
                div.style.backgroundColor = selectedColor;
            });

            // Optional: Add hover effect for painting
            div.addEventListener("mouseover", (event) => {
                if (event.buttons === 1) { // Check if left mouse button is held down
                    div.style.backgroundColor = selectedColor;
                }
            });

            grid.appendChild(div);
        }
    }
}



const clear = document.querySelector("#clear");
clear.addEventListener('click', () => {
    clearGrid();
});

function clearGrid() {
    // Clear the grid by removing all child elements
    const boxes = document.querySelectorAll("#grid-container .box");
    boxes.forEach(box => {
        box.style.backgroundColor = "white";
    });
}