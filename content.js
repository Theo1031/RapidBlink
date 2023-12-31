

function spritzText(text, speed) {
    const words = text.split(/\s+/);
    let currentIndex = 0;
    let wordSpeed = speed;
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

 
    const speedControl = document.createElement('input');
    speedControl.type = 'range';
    speedControl.max = '1000';
    speedControl.min = '100';
    speedControl.value = '860'; 
    speedControl.style.position = 'absolute';
    speedControl.style.top = '20px';
    speedControl.style.left = '50%';
    speedControl.style.transform = 'translateX(-50%)';
    speedControl.style.zIndex = '1001';

    // Initial wordSpeed calculation
    wordSpeed = 1100 - speedControl.value; 

    speedControl.addEventListener('input', function() {
        wordSpeed = 1100 - speedControl.value; 
    });

    backdrop.appendChild(speedControl);



    const spritzContainer = document.createElement('div');
    spritzContainer.style.fontSize = '40px';
    spritzContainer.style.color = 'black';

    backdrop.appendChild(spritzContainer);
    document.body.appendChild(backdrop);

    /*
    const patreonButton = document.createElement('button');
    patreonButton.textContent = 'Patreon';
    patreonButton.style.position = 'absolute';
    patreonButton.style.top = '20px';
    patreonButton.style.left = '20px';
    patreonButton.style.padding = '10px';
    patreonButton.style.fontSize = '20px';
    patreonButton.style.cursor = 'pointer';


    patreonButton.addEventListener('click', function() {
        window.open('https://www.patreon.com/Tiggum274', '_blank');
    });

    backdrop.appendChild(patreonButton);
    */


    const quitButton = document.createElement('button');
    quitButton.textContent = 'Quit';
    quitButton.style.position = 'absolute';
    quitButton.style.top = '20px';
    quitButton.style.right = '20px';
    quitButton.style.padding = '10px';
    quitButton.style.fontSize = '20px';
    quitButton.style.cursor = 'pointer';

    quitButton.addEventListener('click', function() {
        document.body.removeChild(backdrop);
        clearTimeout(updateTimeout); 
    });

    backdrop.appendChild(quitButton);

    let updateTimeout; n
    const optionsButton = document.createElement('button');
    optionsButton.textContent = 'Options';
    optionsButton.style.position = 'absolute';
    optionsButton.style.bottom = '20px';
    optionsButton.style.right = '20px';
    optionsButton.style.padding = '10px';
    optionsButton.style.fontSize = '20px';
    optionsButton.style.cursor = 'pointer';

    
    patreonButton.style.display = 'none';
    speedControl.style.display = 'none';

    
    optionsButton.addEventListener('click', function() {
       
        if (patreonButton.style.display === 'none') {
            patreonButton.style.display = 'block';
            speedControl.style.display = 'block';
        } else {
            patreonButton.style.display = 'none';
            speedControl.style.display = 'none';
        }
    });

    backdrop.appendChild(optionsButton);

    // Function to update the displayed word
    function updateWord() {
        if (currentIndex < words.length) {
            spritzContainer.textContent = words[currentIndex];
            currentIndex++;
            updateTimeout = setTimeout(updateWord, wordSpeed);
        } else {
            document.body.removeChild(backdrop); 
        }
    }

    updateWord();
}


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