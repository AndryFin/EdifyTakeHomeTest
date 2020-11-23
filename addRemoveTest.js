

describe('Add/remove test', function () {

  browser.ignoreSynchronization = true;
  
  var addButton =  element(by.buttonText('Add Element'));
  var addedElements = element.all(by.xpath('//*[@id="elements"]/*[@class="added-manually"]'));

  it('go to test page', function () {
    browser.get('http://the-internet.herokuapp.com/add_remove_elements/');
    return browser.wait(function () {
      return browser.executeScript('return document.readyState==="complete"').then(function (text) {
        return text === true;              //wait for page to download, could be moved to the helper
      });
    }, 6000);
  });
  
  for (var i=1; i<20; i++){
   (function (j) {
     it('adding elements and checking the total count', function () {
      addButton.click().then(function(){
        expect(addedElements.count()).toBe(j);
       });
      });
   })(i);
  }
  
  for (var i=1; i<15; i++){
   (function (j) {
     it('deleting random elements and checking the number of elemnts left', function () {
      addedElements.count().then(function(rangeMax){
        var elementToDelete = Math.floor(Math.random() * (rangeMax - 2) + 1);
        addedElements.get(elementToDelete-1).click().then(function(){
           expect(addedElements.count()).toBe(rangeMax-1);
        });
       });
     });
    })(i);
  }

});
