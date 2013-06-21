//console.log('jQuery 1 !!!');
//console.log(jQuery);

//jQuery("a:contains('My Profile')")

function getWeeklyPicksLinks(){
  var links = [];
  jQuery('div[id^="weeklyPicksCollapse"] a[href*="WEEKLY_PICKS"]').each(function(i, ele){
    console.log(ele.href);
    links.push({url: ele.href, title: jQuery(ele).text()});
  });
  return links;
}

/*

chrome.runtime.sendMessage({action: "getWeeklyPicksLinks1" }, function(response) {
  console.log('message sent');
  console.log(response);
});
*/


chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    //console.log('message handler in crowl.js received message.');
    if (request.action == "getWeeklyPicksLinks"){
      sendResponse({links: getWeeklyPicksLinks()});
    }
  }
);

