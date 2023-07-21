const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');



let apiQuotes = [];

// Show loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide loading
function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

// Show New Quote
function newQuote(){
    loading();
    // Pick a random quote from apiQuotes Array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

    // Check if Author Field is blank, and replace it with "Unkwnown"
    if(quote.author == null) {
        authorText.textContent = 'Unknown Author';
    } else {
        authorText.textContent = quote.author;
    }

    // Check quote length to determine styling
    if(quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    // Set quote, hide loader
    quoteText.textContent = quote.text;
    complete();


}

// Get Quotes from API
async function getQuotes(){
    loading();
    const apiURL = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try{
        const response = await fetch(apiURL);
        apiQuotes = await response.json();
        newQuote();
    } catch(error){
        // Catch Error here
    }
}

// Tweet Quote
function tweetQuote() {
    const twitterURL = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterURL, '_blank'); 
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuotes();
