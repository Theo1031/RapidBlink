// background.js

// Listener for when the extension is installed or updated
chrome.runtime.onInstalled.addListener(() => {
    // Create a context menu item
    chrome.contextMenus.create({
        id: "spritzText",
        title: "Spritz Selected Text",
        contexts: ["selection"]
    });
});

// Listener for clicks on the context menu
chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "spritzText") {
        // Send message to content script
        chrome.tabs.sendMessage(tab.id, { action: "startSpritz", text: info.selectionText });
    }
});


// If you need to send messages or perform actions on tab change or some other events,
// include those in separate event listeners or functions.
