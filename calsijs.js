// Select buttons and display areas
const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const previousOperandText = document.querySelector("[data-previous-operand]");
const currentOperandText = document.querySelector("[data-current-operand]");

// Variables for keeping track of current and previous numbers, and the operation
let currentOperand = "";
let previousOperand = "";
let operation = "";

// Update the display
function updateDisplay() {
    currentOperandText.textContent = currentOperand;
    previousOperandText.textContent = previousOperand ? `${previousOperand} ${operation}` : "";
}

// When a number button is clicked, add it to the current number
numberButtons.forEach(button => {
    button.addEventListener("click", () => {
        currentOperand += button.textContent;
        updateDisplay();
    });
});

// When an operation button is clicked, save the current number and set the operation
operationButtons.forEach(button => {
    button.addEventListener("click", () => {
        if (currentOperand === "") return; // Prevent operation if no number is entered
        if (previousOperand !== "") {
            calculate(); // If there's already a number, calculate the previous result
        }
        operation = button.textContent;
        previousOperand = currentOperand;
        currentOperand = "";
        updateDisplay();
    });
});

// When the equals button is clicked, calculate the result
equalsButton.addEventListener("click", () => {
    if (currentOperand === "" || previousOperand === "") return; // Do nothing if operands are empty
    calculate(); // Perform the calculation
    updateDisplay(); // Show the result
});

// Perform the calculation based on the selected operation
function calculate() {
    let result;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);

    switch (operation) {
        case "+":
            result = prev + current;
            break;
        case "-":
            result = prev - current;
            break;
        case "*":
            result = prev * current;
            break;
        case "÷":
            result = prev / current;
            break;
        default:
            return;
    }

    currentOperand = result.toString(); // Show the result in the current operand area
    previousOperand = ""; // Clear the previous operand after calculation
    operation = ""; // Clear the operation after calculation
}

// When the delete button is clicked, remove the last digit
deleteButton.addEventListener("click", () => {
    currentOperand = currentOperand.slice(0, -1);
    updateDisplay();
});

// When the all-clear button is clicked, reset everything
allClearButton.addEventListener("click", () => {
    currentOperand = "";
    previousOperand = "";
    operation = "";
    updateDisplay();
});
