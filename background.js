
chrome.browserAction.onClicked.addListener(function(tab) { });
chrome.contextMenus.create({
    id: "send-to-api",
    title: "Send to API",
    contexts: ["selection"]
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
    if (info.menuItemId === "send-to-api") {
        chrome.storage.local.get(["apiKey", "title", "notebook"], function(items) {
            let text = info.selectionText;
            let apiKey = items.apiKey;
            let title = encodeURIComponent(items.title);
            let notebook = items.notebook;
            let url = tab.url;
            let date = new Date();
            text = text + " Clipped from: " + url + " On: " + date;
            text = encodeURIComponent(text);
            fetch("http://hcbille.se:3000/create_note?apiKey=" + apiKey + "&title=" + title + "&text=" + text + "&notebook=" + notebook, {
            })
            .then(response => response.json())
            .then(data => {
                if (data.message === "Success") {
                    alert("Text sent to API successfully!");
                } else {
                    alert("Error sending text to API: " + data.message);
                }
            })
        });
    }
});
