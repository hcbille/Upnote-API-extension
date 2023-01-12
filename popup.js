// popup.js
chrome.storage.local.get(["apiKey", "title", "notebook"], function(items) {
    document.getElementById("apiKey").value = items.apiKey ? items.apiKey.replace(/./g, '*') : '';
    document.getElementById("title").value = items.title || '';
    document.getElementById("notebook").value = items.notebook || '';
});

document.getElementById("saveBtn").addEventListener("click", function(){
    // get values from inputs
    let apiKey = document.getElementById("apiKey").value;
    let title = document.getElementById("title").value;
    let notebook = document.getElementById("notebook").value;
    // save the values to chrome.storage
    chrome.storage.local.set({apiKey, title, notebook}, function() {
        if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError.message);
        } else {
            alert("Values saved successfully!");
        }
    });
});
