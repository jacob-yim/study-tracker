
document.addEventListener('DOMContentLoaded', function () {
    const bg = chrome.extension.getBackgroundPage()
    document.querySelector('button').addEventListener('click', function () {
        chrome.alarm.create("breakStart", {delayInMinutes : bg.studyLength, periodInMinutes : bg.studyLength + bg.breakLength})
        chrome.alarm.create("breakEnd", {delayInMinutes : bg.studyLength + bg.breakLength, periodInMinutes : bg.studyLength + bg.breakLength})
    }, false)
}, false)