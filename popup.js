document.addEventListener('DOMContentLoaded', function () {
    const bg = chrome.extension.getBackgroundPage()
    bg.pages.forEach(function (url) {
        var diff = bg.storedTime[url]
        if (url in bg.startTime) {
            diff += Date.now() - bg.startTime[url]
        }
        let hrs = Math.floor(diff / 3600000)
        let mins = Math.floor((diff % 3600000) / 60000)
        const div = document.createElement('div')
        div.textContent = `${url}: ${hrs} hours, ${mins} minutes`
        document.body.appendChild(div)
    })

}, false)