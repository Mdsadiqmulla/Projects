const outputPrevious = document.querySelector('.previous-operand');
const outputCurrent = document.querySelector('.current-operand');
const buttons = document.querySelectorAll('button');

let currentOperand = '';
let previousOperand = '';
let operator = '';

// Add event listener for all buttons
buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.getAttribute('data-value');
    
    if (value === 'clear') {
      clear();
    } else if (value === '+' || value === '-' || value === '*' || value === '/') {
      operate(value);
    } else if (value === '=') {
      calculate();
    } else {
      append(value);
    }
  });
});

// Append the value of the button clicked to the current operand
function append(value) {
  currentOperand += value;
  outputCurrent.textContent = currentOperand;
}

// Perform the arithmetic operation when an operator button is clicked
function operate(value) {
  operator = value;
  previousOperand = currentOperand;
  currentOperand = '';
  outputPrevious.textContent = previousOperand + ' ' + operator;
  outputCurrent.textContent = currentOperand;
}

// Calculate the result when the equals button is clicked
function calculate() {
  const previous = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  let result;

  switch (operator) {
    case '+':
      result = previous + current;
      break;
    case '-':
      result = previous - current;
      break;
    case '*':
      result = previous * current;
      break;
    case '/':
      result = previous / current;
      break;
    default:
      return;
  }

  outputCurrent.textContent = result;
  currentOperand = result.toString();
  outputPrevious.textContent = '';
}

// Clear the calculator
function clear() {
  currentOperand = '';
  previousOperand = '';
  operator = '';
  outputCurrent.textContent = '0';
  outputPrevious.textContent = '';
}

