/* author Christian Pujol pujolchr@gmail.com */

/* for eslint: */
/* global document */

let operandOne = '';
let operandTwo = '';
let lastOperator = '';
let output = '';

function calc(input) {
// console.log(`o2: ${operandTwo} -lastO: ${lastOperator} -o1: ${operandOne}`);
  // eslint-disable-next-line default-case
  switch (input) {

    case 'A':
      operandTwo = '';
      lastOperator = '';
    // eslint-disable-next-line no-fallthrough
    case 'C':
      operandOne = '';
      output = '';
      break;

    case '.':
      if (operandOne === '') operandOne = '0.';
      if (operandOne.indexOf('.') > -1) break;
    // eslint-disable-next-line no-fallthrough
    case '0':
    case '1':
    case '2':
    case '3':
    case '4':
    case '5':
    case '6':
    case '7':
    case '8':
    case '9':
      operandOne = `${operandOne}${input}`;
      output = operandOne;
      break;
    case '-':
    case '+':
    case '*':
    case '/':
    case '=':
      if (lastOperator === '') {
        lastOperator = input;
        if (operandTwo === '') operandTwo = operandOne;
        if (operandTwo === '') operandTwo = '0';
        operandOne = '';
        output = operandTwo;
        break;
      }
      if (operandOne === '') {
        lastOperator = input;
        break;
      }
      // eslint-disable-next-line no-eval
      operandTwo = eval(operandTwo + lastOperator + operandOne).toString();
      operandOne = '';
      output = operandTwo;
      if (input === '=') {
        lastOperator = '';
        break;
      }
      lastOperator = input;
  } // end of switch -----------------------------

  if (output === 'Infinity' || output === 'NaN') {
    operandOne = '';
    operandTwo = '';
    lastOperator = '';
  }
  // TODO check lenght for lenght max

  if (output === '') output = '0';
  document.getElementById('result').innerHTML = output;
}

//  listen to key press
document.addEventListener('keypress', (event) => {
  if (event.which === 13) {
    calc('=');
    return;
  }
  calc(String.fromCharCode(event.which));
});

//  listen to click on calc button
const btns = document.getElementsByClassName('calc-btn');
for (let i = 0; i < btns.length; i += 1) {
  btns[i].addEventListener('click', event => calc(event.target.value));
}
