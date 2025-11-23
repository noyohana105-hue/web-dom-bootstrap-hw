console.log("calculator.js loaded");

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("calc-form");
    const num1Input = document.getElementById("num1");
    const num2Input = document.getElementById("num2");
    const operationSelect = document.getElementById("operation");
    const resultInput = document.getElementById("result");
    const logsTextarea = document.getElementById("logs");

    form.addEventListener("submit", (event) => {
        // stop page reload
        event.preventDefault();

        const a = parseFloat(num1Input.value.trim());
        const b = parseFloat(num2Input.value.trim());

        if (Number.isNaN(a) || Number.isNaN(b)) {
            resultInput.value = "";
            logsTextarea.value += "Invalid input\n";
            return;
        }

        let result;
        let symbol;

        switch (operationSelect.value) {
            case "add":
                result = a + b;
                symbol = "+";
                break;
            case "sub":
                result = a - b;
                symbol = "-";
                break;
            case "mul":
                result = a * b;
                symbol = "×";
                break;
            case "div":
                symbol = "÷";
                if (b === 0) {
                    resultInput.value = "Error: division by zero";
                    logsTextarea.value += `${a} ${symbol} ${b} = Error (division by zero)\n`;
                    return;
                }
                result = a / b;
                break;
            case "pow":
                result = Math.pow(a, b);
                symbol = "^";
                break;
            default:
                logsTextarea.value += "Unknown operation\n";
                return;
        }

        resultInput.value = result;
        logsTextarea.value += `${a} ${symbol} ${b} = ${result}\n`;
        logsTextarea.scrollTop = logsTextarea.scrollHeight;
    });
});
