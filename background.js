// class: pulse-component-wrapper board-id-1864591278
// id: pulse-2137866214, class: pulse-component single-item-height grid-pulse with-menu can-edit open

//document.getElementsByClassName('pulse-component single-item-height') 

const code = `
console.log('code excuted');
function mondayExtensionTick() {
    for (const item of document.getElementsByClassName('pulse-component single-item-height')) {
        const pulseId = item.id.split('-')[1];
        const boardElem = item.parentElement.parentElement;
        const boardId = boardElem.classList[1].split('-')[2];
    
        item.style['backgroundColor'] = 'var(--primary-selected-color)';
        item.addEventListener('click', e => {
            if (window.location.href.includes('monday.com/my_work')) {
                item.outerHTML = item.outerHTML;
                const url = \`https://5ml.monday.com/boards/\${boardId}/pulses/\${pulseId}\`;
                window.open(url, '_blank').focus();
                e.stopPropagation();
            }
        });
    }
}

if (window.mondayExtensionTickInterval == undefined) {
    console.log('set tick interval');
    window.mondayExtensionTickInterval = setInterval(mondayExtensionTick, 100);
}
`

chrome.browserAction.onClicked.addListener(function (tab) {
    chrome.tabs.executeScript(null, {
        code,
    });
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    console.log(changeInfo)
    if (changeInfo.url && changeInfo.url.includes('monday.com/my_work')) {
        chrome.tabs.executeScript(null, {
            code,
        });
    }
})

/*
chrome.webNavigation.onCompleted.addListener(function () {
    chrome.tabs.executeScript(null, {
        code,
    });
}, { url: [{ urlMatches: 'https://5ml.monday.com/my_work*' }] });

chrome.webNavigation.onDOMContentLoaded.addListener(function () {
    chrome.tabs.executeScript(null, {
        code,
    });
}, { url: [{ urlMatches: 'https://5ml.monday.com/my_work*' }] });

chrome.webNavigation.onHistoryStateUpdated.addListener(function () {
    chrome.tabs.executeScript(null, {
        code,
    });
}, { url: [{ urlMatches: 'https://5ml.monday.com/my_work*' }] });
*/