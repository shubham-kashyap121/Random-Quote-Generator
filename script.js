let quote = document.getElementById("quote-text");
let author = document.getElementById("quote-author");
let btn = document.getElementById("generate-Btn");
let copyBtn = document.getElementById("copy-Btn");
let quoteContainer = document.getElementById("quote");

let URL = "quotes.json";
let usedIndices = new Set();

function updateQuote(newQuote, newAuthor) {
    // Fade out
    quoteContainer.style.opacity = 0;
    setTimeout(() => {
        quote.innerHTML = newQuote;
        author.innerHTML = `--${newAuthor}`;
        // Fade in
        quoteContainer.style.opacity = 1;
    }, 500); // Matches CSS transition
}

function randomQuote() {
    fetch(URL)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            let quotesArray = data.quotes;
            if (usedIndices.size === quotesArray.length) {
                // Reset if all quotes have been used
                usedIndices.clear();
            }
            let randIndex;
            do {
                randIndex = Math.floor(Math.random() * quotesArray.length);
            } while (usedIndices.has(randIndex));
            usedIndices.add(randIndex);
            let randomQuote = quotesArray[randIndex];
            updateQuote(randomQuote.quote, randomQuote.author);
            console.log("Random quote fetched successfully.");
        })
        .catch((error) => {
            updateQuote("Failed to load quote, Please try again later.", "Error");
        });
}

// Bind events
btn.addEventListener("click", randomQuote);
window.addEventListener("load", randomQuote);

// Copy functionality
copyBtn.addEventListener('click', async () => {
    const textToCopy = quoteContainer.innerText;
    try {
        await navigator.clipboard.writeText(textToCopy);
        alert('Quote copied!');
    } catch (error) {
        alert('Failed to copy: ' + error);
    }
});
