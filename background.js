chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.executeScript(null, {
        code: `
            document.getElementsByClassName('cu-task-header__section')[0].getElementsByClassName('cu-user-group')[0].click();
            document.getElementsByClassName("user-list-item")[0].click();
        `
    });
});

var btn = `<button
style="
    width: 40px;
    height: 40px;
    background-color: #feb;"
onclick="document.getElementsByClassName('cu-task-header__section')[0].getElementsByClassName('cu-user-group')[0].click();document.getElementsByClassName('user-list-item')[0].click();"
>ME</button>`;

chrome.webNavigation.onHistoryStateUpdated.addListener(function() {
    chrome.tabs.executeScript(null, {
        code: `
        var template = document.createElement('template');
        var btn = \`${btn}\`.trim();
        template.innerHTML = btn;
        var el = template.content.firstChild;
        var n = document.getElementsByClassName('cu-task-header__section')[0];
        n.parentNode.insertBefore(el, n.nextSibling);
        `
    });
}, {url: [{urlMatches : 'https://app.clickup.com/t/*'}]});