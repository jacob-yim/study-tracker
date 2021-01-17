window.startTime = {}
window.prevTime = {}

chrome.tabs.onCreated.addListener(function (tab) {
    window.startTime[tab.url] = Date.now()
})

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    window.startTime[tab.url] = Date.now()
})