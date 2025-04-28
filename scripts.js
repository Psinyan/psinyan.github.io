const htmlElement = document.documentElement; 

function changeTheme() {
    const themeToggleButton = document.getElementById('theme-toggle-button');
    const themeIcon = themeToggleButton.querySelector('img'); 
    const helpButton = document.getElementById('help-button');
    const helpIcon = helpButton.querySelector('img'); 

    if (htmlElement.getAttribute('data-theme') === 'dark') {
        htmlElement.removeAttribute('data-theme'); 
        themeIcon.src = 'icons/bx_moon.svg'; 
        helpIcon.src = 'icons/bx_question-mark.svg';
    } else {
        htmlElement.setAttribute('data-theme', 'dark');
        themeIcon.src = 'icons/bx_moon__white.svg';
        helpIcon.src = 'icons/bx_question-mark__white.svg'; 
    }
}

document.getElementById('theme-toggle-button').addEventListener('click', changeTheme);

function showHelp() {
    alert("Калькулятор позволяет выполнять базовые арифметические операции: перевод, сложение, вычитание для чисел в разных системах счисления. \n\nВведите числа, СС и выберите операцию для выполнения. Результат будет отображен на экране.");
}

document.getElementById('help-button').addEventListener('click', showHelp);

function checkCCInputs(partId) {
    let isValid = true;
    const partElement = document.getElementById(partId);

    partElement.querySelectorAll('.CC').forEach(input => {
        let value = parseInt(input.value, 10);

        if (isNaN(value)) {
            value = parseInt(input.placeholder, 10);
            input.value = input.placeholder;
        }

        if (value < 2 || value > 16 || isNaN(value)) {
            isValid = false;
            input.style.border = '2px solid red';
            input.style.backgroundColor = '#ffcccc'; 
        } else {
            input.style.border = 'none';
            input.style.backgroundColor = '';
        }
    });

    return isValid;
}

document.querySelectorAll('.main-button').forEach(button => {
    button.addEventListener('click', (event) => {
        const partElement = event.target.closest('.part');
        if (!(partElement && checkCCInputs(partElement.id))) { 
            // alert('Калькулятор работает только для СС от 2 до 16.');
        }
    });
});

document.querySelectorAll('.operation').forEach(operation => {
    operation.addEventListener('click', (event) => {
        const operationElement = event.target.closest('.operation');
        if (operationElement) {
            const currentOperation = operationElement.innerText.trim();
            operationElement.innerText = currentOperation === '+' ? '-' : '+';
        }
    });
});

document.querySelectorAll('.input-field').forEach(inputField => {
    inputField.addEventListener('input', () => {
        isValid = false;
        const invalidChars = /[^0-9a-fA-F]/g;
        if (invalidChars.test(inputField.value)) {
            isValid = false;
            inputField.style.border = '2px solid red';
            inputField.style.backgroundColor = '#ffcccc'; 
        } else {
            inputField.style.border = 'none';
            inputField.style.backgroundColor = '';
        }
    });
});

document.getElementById('convert').addEventListener('click', () => {
    const partElement = document.getElementById('converter'); 
    const inputField = partElement.querySelector('.input-field'); 
    const fromCC = partElement.querySelector('#fromCC'); 
    const toCC = partElement.querySelector('#toCC'); 

    const inputValue = inputField.value.trim(); 
    const fromBase = parseInt(fromCC.value || fromCC.placeholder, 10);
    const toBase = parseInt(toCC.value || toCC.placeholder, 10);

    if (fromBase < 2 || fromBase > 16 || toBase < 2 || toBase > 16) {
        alert('Системы счисления должны быть в диапазоне от 2 до 16.');
        return;
    }

    try {
        const decimalValue = parseInt(inputValue, fromBase);
        if (isNaN(decimalValue)) {
            alert('Некорректное число для указанной системы счисления.');
            return;
        }
        const result = decimalValue.toString(toBase);

        alert(`Результат: ${result}`);
    } catch (error) {
        alert('Произошла ошибка при конвертации числа.');
        console.error(error);
    }
});

document.getElementById('calculate').addEventListener('click', () => {
    const partElement = document.getElementById('calculator');
    const inputField1 = partElement.querySelector('#calcInput1');
    const inputField2 = partElement.querySelector('#calcInput2');
    const operationField = partElement.querySelector('#calcOp');
    const calcCC = partElement.querySelector('#calcCC');

    const inputValue1 = inputField1.value.trim();
    const inputValue2 = inputField2.value.trim();
    const operation = operationField.innerText;
    const base = parseInt(calcCC.value || calcCC.placeholder, 10);

    if (base < 2 || base > 16) {
        alert('Система счисления должна быть в диапазоне от 2 до 16.');
        return;
    }

    try {
        const decimalValue1 = parseInt(inputValue1, base);
        const decimalValue2 = parseInt(inputValue2, base);

        if (isNaN(decimalValue1) || isNaN(decimalValue2)) {
            alert('Некорректное число для указанной системы счисления.');
            return;
        }

        let resultDecimal;
        if (operation === '+') {
            resultDecimal = decimalValue1 + decimalValue2;
        } else if (operation === '-') {
            resultDecimal = decimalValue1 - decimalValue2;
        } else {
            alert('Некорректная операция. Используйте + или -.');
            return;
        }

        const result = resultDecimal.toString(base).toUpperCase();

        alert(`Результат: ${result}`);
    } catch (error) {
        alert('Произошла ошибка при выполнении операции.');
        console.error(error);
    }
});

document.getElementById('multicalculate').addEventListener('click', () => {
    const partElement = document.getElementById('multicalculator');
    const inputField1 = partElement.querySelector('#multicalcInput1');
    const inputField2 = partElement.querySelector('#multicalcInput2'); 
    const operationField = partElement.querySelector('#multicalcOp');
    const calcCC1 = partElement.querySelector('#multicalcCC1'); 
    const calcCC2 = partElement.querySelector('#multicalcCC2'); 
    const calcCCOut = partElement.querySelector('#multicalcCCOut'); 

    const inputValue1 = inputField1.value.trim();
    const inputValue2 = inputField2.value.trim();
    const operation = operationField.innerText;
    const base1 = parseInt(calcCC1.value || calcCC1.placeholder, 10)
    const base2 = parseInt(calcCC2.value || calcCC2.placeholder, 10); 
    const baseOut = parseInt(calcCCOut.value || calcCCOut.placeholder, 10); 

    if (base1 < 2 || base1 > 16 || base2 < 2 || base2 > 16 || baseOut < 2 || baseOut > 16) {
        alert('Системы счисления должны быть в диапазоне от 2 до 16.');
        return;
    }

    try {
        const decimalValue1 = parseInt(inputValue1, base1);
        const decimalValue2 = parseInt(inputValue2, base2);

        if (isNaN(decimalValue1) || isNaN(decimalValue2)) {
            alert('Некорректное число для указанной системы счисления.');
            return;
        }

        let resultDecimal;
        if (operation === '+') {
            resultDecimal = decimalValue1 + decimalValue2;
        } else if (operation === '-') {
            resultDecimal = decimalValue1 - decimalValue2;
        } else {
            alert('Некорректная операция. Используйте + или -.');
            return;
        }

        const result = resultDecimal.toString(baseOut).toUpperCase();

        alert(`Результат: ${result}`);
    } catch (error) {
        alert('Произошла ошибка при выполнении операции.');
        console.error(error);
    }
});