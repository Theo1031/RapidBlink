

document.addEventListener('DOMContentLoaded', function() {

    chrome.storage.sync.get('readingSpeed', function(data) {
        document.getElementById('readingSpeed').value = data.readingSpeed || 5;
    });

    document.getElementById('saveSettings').addEventListener('click', function() {
        var speed = document.getElementById('readingSpeed').value;
        chrome.storage.sync.set({'readingSpeed': speed}, function() {
            console.log('Reading speed saved as ' + speed);
        });
    });
});
