// options.js

document.addEventListener('DOMContentLoaded', function() {
    // Load the saved reading speed
    chrome.storage.sync.get('readingSpeed', function(data) {
        document.getElementById('readingSpeed').value = data.readingSpeed || 5;
    });

    // Save the reading speed setting
    document.getElementById('saveSettings').addEventListener('click', function() {
        var speed = document.getElementById('readingSpeed').value;
        chrome.storage.sync.set({'readingSpeed': speed}, function() {
            console.log('Reading speed saved as ' + speed);
        });
    });
});
