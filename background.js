function checkForValidUrl(tabId, changeInfo, tab) {
  if (tab.url.indexOf('gartner.com') > -1) {
    chrome.pageAction.show(tabId);
  }
};

chrome.tabs.onUpdated.addListener(checkForValidUrl);

/*
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log('message handler in background received message.');
    console.log(sender.tab ?
                "BKG from a content script:" + sender.tab.url :
                "BKG from the extension");
    console.log(request);
    if (request.action == "getWeeklyPicksLinks"){
      sendResponse({links: ['4', '5', '6']});
    }else{
      sendResponse({links: 'Dont knwo'});

    }
  }
);
*/
