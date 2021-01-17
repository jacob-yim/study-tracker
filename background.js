window.pages = []
window.startTime = {}
window.storedTime = {}
window.instances = {}
window.idToUrl = {}

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.url != undefined) {
        if (tabId in window.idToUrl) {
            closePage(window.idToUrl[tabId])
        }
        let hn = new URL(changeInfo.url).hostname
        openPage(hn)
        window.idToUrl[tab.id] = hn
    }
})

chrome.tabs.onRemoved.addListener(function (tabId, removeInfo) {
    if (tabId in window.idToUrl) {
        closePage(window.idToUrl[tabId])
    }
})

function openPage(url) {
    if (!(window.pages.includes(url))) {
        window.pages.push(url)
        window.storedTime[url] = 0
        window.instances[url] = 0
        console.log(window.pages.toString())
    }
    if (!(url in window.startTime)) {
        window.startTime[url] = Date.now()
    }
    window.instances[url] += 1
}

function closePage(url) {
    if (!(url in window.instances) || (window.instances[url] == 0)) {
        return
    }
    if (window.instances[url] == 1) {
        window.storedTime[url] += Date.now() - window.startTime[url]
        delete window.startTime[url]
    }
    window.instances[url] -= 1
}