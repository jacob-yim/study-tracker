
document.addEventListener('DOMContentLoaded', function () {
    const bg = chrome.extension.getBackgroundPage()
    document.querySelector('button').addEventListener('click', function () {
        bg.studyTimer.start()
    }, false)
}, false)