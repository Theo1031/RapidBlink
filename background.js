
chrome.runtime.onInstalled.addListener(() => {

    chrome.contextMenus.create({
        id: "spritzText",
        title: "Spritz Selected Text",
        contexts: ["selection"]
    });
});


chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "spritzText") {

        chrome.tabs.sendMessage(tab.id, { action: "startSpritz", text: info.selectionText });
    }
});

