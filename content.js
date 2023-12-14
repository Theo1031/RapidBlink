// content.js

function spritzText(text, speed) {
    const words = text.split(/\s+/);
    let currentIndex = 0;

    // Create the backdrop for text display
    const backdrop = document.createElement('div');
    backdrop.style.position = 'fixed';
    backdrop.style.top = '0';
    backdrop.style.left = '0';
    backdrop.style.width = '100%';
    backdrop.style.height = '100%';
    backdrop.style.backgroundColor = 'white';
    backdrop.style.zIndex = '1000';
    backdrop.style.display = 'flex';
    backdrop.style.justifyContent = 'center';
    backdrop.style.alignItems = 'center';

    // Create the container for displaying words
    const spritzContainer = document.createElement('div');
    spritzContainer.style.fontSize = '40px';
    spritzContainer.style.color = 'black';

    backdrop.appendChild(spritzContainer);
    document.body.appendChild(backdrop);

    // Create the quit button
    const quitButton = document.createElement('button');
    quitButton.textContent = 'Quit';
    quitButton.style.position = 'absolute';
    quitButton.style.top = '20px';
    quitButton.style.right = '20px';
    quitButton.style.padding = '10px';
    quitButton.style.fontSize = '20px';
    quitButton.style.cursor = 'pointer';

    // Add the event listener for the quit button
    quitButton.addEventListener('click', function() {
        document.body.removeChild(backdrop);
        clearTimeout(updateTimeout); // Clear the timeout to stop updating words
    });

    backdrop.appendChild(quitButton);

    let updateTimeout; // To keep reference of the timeout

    // Function to update the displayed word
    function updateWord() {
        if (currentIndex < words.length) {
            spritzContainer.textContent = words[currentIndex];
            currentIndex++;
            updateTimeout = setTimeout(updateWord, speed);
        } else {
            document.body.removeChild(backdrop); // Remove the backdrop after displaying all words
        }
    }

    updateWord();
}

// Listen for messages from the background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'startSpritz') {
        spritzText(message.text, 200);
    }
});
/*chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'startSpritz') {
        chrome.storage.sync.get('readingSpeed', function(data) {
            // Use the stored reading speed, or default to 200 if not set
            var speed = parseInt(data.readingSpeed) || 5;
            var adjustedSpeed = 60000 / (200 * speed); // Adjust speed calculation as necessary
            spritzText(message.text, adjustedSpeed);
        });
    }
});*/