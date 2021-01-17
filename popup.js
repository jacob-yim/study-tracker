document.addEventListener('DOMContentLoaded', function () {
    const bg = chrome.extension.getBackgroundPage()
    const totalTimes = {}
    bg.pages.forEach(function (hn) {
        let diff = bg.storedTime[hn]
        if (hn in bg.startTime) {
            diff += Date.now() - bg.startTime[hn]
        }
        totalTimes[hn] = diff
    })
    let topPages = [...bg.pages]
    topPages.sort(function(hn1, hn2) {
        return totalTimes[hn2] - totalTimes[hn1]
    })
    topPages.slice(0, 5).forEach(function (hn) {
        let diff = totalTimes[hn]
        let hrs = Math.floor(diff / 3600000)
        let mins = Math.floor((diff % 3600000) / 60000)
        let secs = Math.floor(((diff % 3600000) / 60000) / 60000)
        const div = document.createElement('div')
        div.textContent = `${hn}: ${hrs} hours, ${mins} minutes, ${diff} seconds`
        document.body.appendChild(div)
    })
}, false)