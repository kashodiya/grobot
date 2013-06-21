
function doInCurrentTab(tabCallback) {
  chrome.tabs.query(
    { currentWindow: true, active: true },
    function (tabArray) { tabCallback(tabArray[0]); }
  );
}

function openInHiddenIFrame(link){
  //console.log('Loading url ... - ' + link.url);
  //console.log('Title ... - ' + link.title);
  jQuery('#mainTitle').show();

  var iFrames = jQuery('#iFrames')[0];
  //var iframe = document.body.appendChild(document.createElement('iframe'));
  var iframe = iFrames.appendChild(document.createElement('iframe'));
  iframe.style = "display: none;";
  iframe.src = link.url;


  $('#weeklyPicksList').append(
      $('<li>').append(
          $('<a>').attr('href', link.url).append(
              $('<span>').attr('class', 'tab').append(link.title)
  )));   


  iframe.onload = function() {
    //console.log('Title = ' + link.title);
    //console.log('Url is loaded - ' + link.url);
    jQuery('#weeklyPicksList li a[href="' + link.url + '"]').parent().addClass('bulletNotDone');
    var totalLinks = jQuery('#weeklyPicksList li').length;
    var doneLinks = jQuery('#weeklyPicksList li.bulletNotDone').length;
    jQuery('#progressCtr').html('[' + doneLinks + '/' + totalLinks + ']');
    if(totalLinks == doneLinks){
      jQuery('#progressMsg').html('Visited All. Done!');
      jQuery('#doneSound')[0].play();
    }else{
      jQuery('#doneAllSound')[0].play();
    }

    //console.log(iframe.contentDocument.title);
  };
}

jQuery(function(){
  //console.log('pop page loaded');
  jQuery('#getWeeklyPicksBtn').click(function(){
    //console.log('getWeeklyPicksBtn clicked, sending message...');
    doInCurrentTab(function(tab){
      //console.log(tab);
      //console.log('sending message to the current tab');
      chrome.tabs.sendMessage(tab.id, {action: "getWeeklyPicksLinks" }, function(response) {
        //console.log('response received for - getWeeklyPicksLinks');
        //console.log(response);
        jQuery.each(response.links, function(i, ele){
          openInHiddenIFrame(ele);
        });
      });
    });
  });
});



