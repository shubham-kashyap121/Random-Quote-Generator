let quote = document.getElementById("quote-text");
let author = document.getElementById("quote-author");
let btn = document.getElementById("generate-Btn");
let URL = "quotes.json";

let usedIndices = new Set();

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
      quote.innerHTML = `${randomQuote.quote}`;
      author.innerHTML = `--${randomQuote.author}`;
      console.log("Random quote fetched successfully.");
    })
    .catch((error) => {
      console.error("Error fetching quotes:", error);
      quote.innerHTML = `Failed to load quote, Please try again later.`;
      author.innerHTML = `Error`;
    });
}

btn.addEventListener("click", randomQuote);
window.addEventListener("load", randomQuote);

