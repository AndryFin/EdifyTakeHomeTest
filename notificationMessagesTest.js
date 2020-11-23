

describe('Notification Message Test', function () {

  browser.ignoreSynchronization = true;
  
  var mesgBtn = element(by.xpath('//a[@href="/notification_message"]'));
  var retryCount = 1;
  var passCount = 0;
  var failCount = 0;
  
  it('go to test page', function () {
    browser.get('http://the-internet.herokuapp.com/notification_message_rendered');
    return browser.wait(function () {
      return browser.executeScript('return document.readyState==="complete"').then(function (text) {
        return text === true;              //wait for page to download, should be moved to the helper
      });
    }, 6000);
  });
  
  it('clicking until the action is successful', function () {
    mesgBtn.click().then(function(){
      return browser.wait(function () {
          return element(by.cssContainingText('.flash.notice', 'Action successful')).isPresent().then(
            function (present) {
              if (present){
                console.log('action took '+retryCount+' retries to succeed');
                return present;
              }
              retryCount++;
              mesgBtn.click();
            },                  
            function (error) {
              return false
            });
        }, 8000);
     });
  });
  
  for (var i=0; i<20; i++){
   (function (j) {
     it('testing pass/fail rate on the action', function () {    
      mesgBtn.click().then(function(){
        element(by.cssContainingText('.flash.notice', 'Action successful')).isPresent().then(
        function (present) {
          if (present){
            passCount++;
          }
        });
        element(by.cssContainingText('.flash.notice', 'Action unsuccesful, please try again')).isPresent().then(
        function (present) {
          if (present){
            failCount++;
          }
        });            
      });       
     });
    })(i);
  }
  
  it('pass/fail rate output', function () {
    console.log('Number of times action passed = '+passCount, 'Number of times action failed = '+failCount);
  });
});
