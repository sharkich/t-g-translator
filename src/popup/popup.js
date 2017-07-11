/* globals chrome */


function renderStatus (statusText) {
    document.getElementById('status').textContent = statusText;
}

function getCurrentTabUrl (callback) {
    const QUERY_INFO = {
        active: true,
        currentWindow: true
    };

    chrome.tabs.query(QUERY_INFO, (tabs) => {
        const TAB = tabs[0];
        const URL = TAB.url;
        if (typeof URL !== 'string') {
            renderStatus('Error on check URL');
            return;
        }
        callback(URL);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    getCurrentTabUrl((URL) => {
        renderStatus('GO: ' + URL);
        document.getElementById('source').text = URL;
        // chrome.tabs.executeScript(null,
        //     {
        //         code: "document.body.style.backgroundColor='red'"
        //     });
        // window.close();
        var btn = document.createElement("BUTTON");
        var t = document.createTextNode("CLICK ME");
        btn.appendChild(t);
        //Appending to DOM
        document.body.appendChild(btn);
    });
});
