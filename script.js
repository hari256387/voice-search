// List of extracted headings
const headings = [
    //... (the extracted headings from the document go here)
];

// Function to search headings based on voice input
function searchHeadings(query) {
    return headings.filter(heading => heading.toLowerCase().includes(query.toLowerCase()));
}

// Function to handle voice recognition
function startVoiceSearch() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();

    recognition.onresult = function(event) {
        const speechResult = event.results[0][0].transcript;
        console.log('Voice input:', speechResult);
        const matchedHeadings = searchHeadings(speechResult);

        displayResults(matchedHeadings);
    };

    recognition.onerror = function(event) {
        console.error('Error occurred:', event.error);
    };
}

// Function to display the search results
function displayResults(matches) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';

    matches.forEach(heading => {
        const listItem = document.createElement('li');
        listItem.textContent = heading;
        resultsContainer.appendChild(listItem);
    });
}

// Attach event listener to the button
document.getElementById('startBtn').addEventListener('click', startVoiceSearch);
