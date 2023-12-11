// background.js

// ...

// Using the chrome.contextMenus API to add a context menu item
chrome.contextMenus.create({
    id: 'spritzContextMenu',
    title: 'Spritz This!',
    contexts: ['selection']
  });
  
  // Add a listener for the context menu click event
  chrome.contextMenus.onClicked.addListener(function(info, tab) {
    if (info.menuItemId === 'spritzContextMenu') {
      // Get the selected text
      const textToSpritz = info.selectionText;
      // Inject the content script into the current tab
      chrome.tabs.executeScript(tab.id, { file: 'content.js' }, function() {
        // Send a message to the content script with the text to spritz
        chrome.tabs.sendMessage(tab.id, {
          action: 'startSpritz',
          text: textToSpritz,
          speed: 300 // Set the speed in milliseconds per word
        });
      });
    }
  });
  
  // ...