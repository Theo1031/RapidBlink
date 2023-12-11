// content.js

// Function to implement Spritz-like functionality
function spritzText(text, speed) {
    // Split the text into words
    const words = text.split(/\s+/);
  
    // Index to keep track of the current word
    let currentIndex = 0;
  
    // Function to update the displayed word
    function updateWord() {
      if (currentIndex < words.length) {
        // Get the current word
        const currentWord = words[currentIndex];
  
        // Display the current word on the page (adjust this based on your specific implementation)
        document.body.innerHTML = `<div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 24px;">${currentWord}</div>`;
  
        // Increment the index for the next word
        currentIndex++;
  
        // Use setTimeout to create the effect of displaying words at a specific speed
        setTimeout(updateWord, speed);
      } else {
        // All words have been displayed, reset the index for future use
        currentIndex = 0;
      }
    }
  
    // Start the Spritz display
    updateWord();
  }
  
  // Function to receive messages from the background script
  chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action === 'startSpritz') {
      const textToSpritz = message.text;
      const spritzSpeed = message.speed || 500; // Default speed: 500 milliseconds per word
      spritzText(textToSpritz, spritzSpeed);
    }
  });
  