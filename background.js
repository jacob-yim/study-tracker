window.startTime = {}
window.prevTime = {}
window.instances = {}
window.idToUrl = {}

chrome.tabs.onCreated.addListener(function (tab) {
    openPage(tab.url)
    window.idToUrl[tab.id] = tab.url
})

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    openPage(changeInfo.url)
    closePage(tab.url)
    window.idToUrl[tab.id] = changeInfo.url
})

chrome.tabs.onRemoved.addListener(function (tabId, removeInfo) {
    closePage()
})

function openPage(url) {
    if (!window.startTime.has(url)) {
        if (window.prevTime.has(url)) {
            window.startTime[url] = Date.now() + window.prevTime[url]
        } else {
            window.startTime[url] = Date.now()
        }
    }
    if (window.instances.has(url)) {
        window.instances[url] += 1
    } else {
        window.instances[url] = 1
    }
}

function closePage(url) {
    if (!window.instances.has(url)) {
        throw `No pages with url ${url} open`
    }
    if (window.instances[url] == 1) {
        let diff = Date.now() - window.startTime[url]
        if (window.prevTime.has(url)) {
            window.prevTime[url] += diff
        } else {
            window.prevTime[url] = diff
        }
        window.startTime.delete(url)
        window.instances.delete(url)
    } else {
        window.instances[url] -= 1
    }
}