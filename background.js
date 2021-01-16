chrome.tabs.query({active: true}, 
    function (tabs) {
        let url = tabs[0].url;
});