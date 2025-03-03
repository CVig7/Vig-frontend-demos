const userInput = document.getElementById("user-input");
const checkBtn = document.getElementById("check-btn");
const clearBtn = document.getElementById("clear-btn");
const resultsDiv = document.getElementById("results-div");

clearBtn.addEventListener("click", () => resultsDiv.innerText = "");

checkBtn.addEventListener("click", () => {
    const regex = /^(1\s?)?(\(\d{3}\)|\d{3})([\s-]?)\d{3}([\s-]?)\d{4}$/;

    if (!userInput.value) {
        alert("Please provide a phone number");
    } else if (regex.test(userInput.value)) {
        resultsDiv.innerText= `Valid US number: ${userInput.value}`;
    } else {
        resultsDiv.innerText = `Invalid US number: ${userInput.value}`;
    }
});