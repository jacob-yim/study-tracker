const WEBSITES_DISPLAYED = 5

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
    topPages.slice(0, WEBSITES_DISPLAYED).forEach(function (hn) {
        let diff = totalTimes[hn]
        let hrs = Math.floor(diff / 3.6e+6)
        let mins = Math.floor((diff % 3.6e+6) / 60000)
        const div = document.createElement('div')
        if (hrs > 0) {
            div.textContent = `${hn}: ${hrs}h ${mins}min`
        } else {
            let secs = Math.floor((diff % 60000) / 1000)
            div.textContent = `${hn}: ${mins}min ${secs}s`
        }
        document.body.appendChild(div)
    })
}, false)