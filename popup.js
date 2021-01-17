document.addEventListener('DOMContentLoaded', function () {
    const bg = chrome.extension.getBackgroundPage()
    Object.keys(bg.startTime).forEach(function (url) {
        let diff = Date.now() - startTime[url]
        let hrs = Math.floor(diff / 3600000)
        let mins = Math.floor((diff % 3600000) / 60000)
        const div = document.createElement('div')
        div.textContent = `${url}: ${hrs} hours, ${mins} minutes`
        document.body.appendChild(div)
    })
}, false)