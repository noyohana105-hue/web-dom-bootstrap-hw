console.log("canculator.js loaded");

// Simple numeric check
function isNumeric(value) {
    if (typeof value !== "string") return false;
    var trimmed = value.trim();
    if (trimmed === "") return false;
    var num = Number(trimmed);
    return !isNaN(num) && isFinite(num);
}

// Add / remove Bootstrap validation classes
function setValidationState(inputElement, valid) {
    inputElement.classList.remove("is-valid", "is-invalid");
    if (valid === null) {
        return; // no validation when empty
    }
    if (valid) {
        inputElement.classList.add("is-valid");
    } else {
        inputElement.classList.add("is-invalid");
    }
}

window.onload = function () {
    console.log("DOM ready");

    var form = document.getElementById("calc-form");
    var num1Input = document.getElementById("num1");
    var num2Input = document.getElementById("num2");
    var operationSelect = document.getElementById("operation");
    var resultInput = document.getElementById("result");
    var logsTextarea = document.getElementById("logs");

    // Live validation
    [num1Input, num2Input].forEach(function (input) {
        input.addEventListener("input", function () {
            var value = input.value;
            if (value.trim() === "") {
                setValidationState(input, null); // empty -> no color
            } else if (isNumeric(value)) {
                setValidationState(input, true); // green
            } else {
                setValidationState(input, false); // red
            }
        });
    });

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // stop page reload

        var raw1 = num1Input.value.trim();
        var raw2 = num2Input.value.trim();

        var valid1 = isNumeric(raw1);
        var valid2 = isNumeric(raw2);

        setValidationState(num1Input, valid1 ? true : false);
        setValidationState(num2Input, valid2 ? true : false);

        if (!valid1 || !valid2) {
            resultInput.value = "";
            logsTextarea.value += "Invalid input: please enter numeric values.\n";
            logsTextarea.scrollTop = logsTextarea.scrollHeight;
            return;
        }

        var a = Number(raw1);
        var b = Number(raw2);
        var op = operationSelect.value;

        var result;
        var symbol;

        if (op === "add") {
            result = a + b;
            symbol = "+";
        } else if (op === "sub") {
            result = a - b;
            symbol = "-";
        } else if (op === "mul") {
            result = a * b;
            symbol = "×";
        } else if (op === "div") {
            symbol = "÷";
            if (b === 0) {
                resultInput.value = "Error: division by zero";
                logsTextarea.value += a + " " + symbol + " " + b +
                    " = Error (division by zero)\n";
                logsTextarea.scrollTop = logsTextarea.scrollHeight;
                return;
            }
            result = a / b;
        } else if (op === "pow") {
            result = Math.pow(a, b);
            symbol = "^";
        } else {
            logsTextarea.value += "Unknown operation\n";
            logsTextarea.scrollTop = logsTextarea.scrollHeight;
            return;
        }

        resultInput.value = result;
        logsTextarea.value += a + " " + symbol + " " + b + " = " + result + "\n";
        logsTextarea.scrollTop = logsTextarea.scrollHeight;
    });
};
