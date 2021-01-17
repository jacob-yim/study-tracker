const DEFAULT_STUDYLENGTH = 6
const DEFAULT_BREAKLENGTH = 1

var favicon = []
var pages = []
var startTime = {}
var storedTime = {}
var instances = {}
var idToUrl = {}

var studyLength = DEFAULT_STUDYLENGTH
var breakLength = DEFAULT_BREAKLENGTH
var studyTimer = new CountDownTimer(studyLength)
var breakTimer = new CountDownTimer(breakLength)


//CountDownTimer
function CountDownTimer(duration, granularity) {
    this.duration = duration;
    this.granularity = granularity || 1000;
    this.tickFtns = [];
    this.running = false;
  }
  
CountDownTimer.prototype.start = function() {
    if (this.running) {
        return;
    }
    this.running = true;
    var start = Date.now(),
        that = this,
        diff, obj;
  
    (function timer() {
        diff = that.duration - (((Date.now() - start) / 1000) | 0);
        if (diff > 0) {
            setTimeout(timer, that.granularity);
        } else {
            diff = 0;
            that.running = false;
        }
        obj = CountDownTimer.parse(diff);
        that.tickFtns.forEach(function(ftn) {
            ftn.call(this, obj.minutes, obj.seconds);
        }, that);
    }());
};
  
CountDownTimer.prototype.onTick = function(ftn) {
    if (typeof ftn === 'function') {
        this.tickFtns.push(ftn);
    }
    return this;
};
  
CountDownTimer.prototype.expired = function() {
    return !this.running;
};
  
CountDownTimer.parse = function(seconds) {
    return {
        'minutes': (seconds / 60) | 0,
        'seconds': (seconds % 60) | 0
    };
};

//website monitor
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.url != undefined) {
        if (tabId in idToUrl) {
            closePage(idToUrl[tabId])
        }
        let hn = new URL(changeInfo.url).hostname
        openPage(hn)
        idToUrl[tab.id] = hn
    }
})

chrome.tabs.onRemoved.addListener(function (tabId, removeInfo) {
    if (tabId in idToUrl) {
        closePage(idToUrl[tabId])
    }
})

function openPage(url) {
    if (!(pages.includes(url))) {
        favicon.push(`www.google.com/s2/favicons?domain=${url}`)
        pages.push(url)
        storedTime[url] = 0
        instances[url] = 0
        console.log(favicon)
    }
    if (!(url in startTime)) {
        startTime[url] = Date.now()
    }
    instances[url] += 1
}

function closePage(url) {
    if (!(url in instances) || (instances[url] == 0)) {
        return
    }
    if (instances[url] == 1) {
        storedTime[url] += Date.now() - startTime[url]
        delete startTime[url]
    }
    instances[url] -= 1
}

//study timer
studyTimer.onTick(function () {
    if (this.expired()) {
        alert('Take a study break!')
        breakTimer.start()
    }
})

breakTimer.onTick(function() {
    if (this.expired()) {
        alert('Break time is up!')
        studyTimer.start()
    }
})