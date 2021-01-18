document.addEventListener('DOMContentLoaded', function () {
    const bg = chrome.extension.getBackgroundPage()
    function input() {
        bg.studyLength = document.getElementById("studyLenInput").value
        bg.breakLength = document.getElementById("breakLenInput").value
        bg.studyTimer.start()
    }
})