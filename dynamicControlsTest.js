

describe('Dynamic Controls test', function () {

  browser.ignoreSynchronization = true;
  
  var addRemoveBtn = element(by.xpath('//button[@onclick="swapCheckbox()"]'));
  var enableDisableBtn = element(by.xpath('//button[@onclick="swapInput()"]'));
  var checkbox = element(by.xpath('//input[@type="checkbox"]'));
  var inputTextField = element(by.xpath('//input[@type="text"]'));

  it('go to test page', function () {
    browser.get('http://the-internet.herokuapp.com/dynamic_controls');
    return browser.wait(function () {
      return browser.executeScript('return document.readyState==="complete"').then(function (text) {
        return text === true;              //wait for page to download, should be moved to the helper
      });
    }, 6000);
  });
  
   it('checking that checkbox is present and select it', function () {
    expect(checkbox.isPresent()).toBe(true);
    checkbox.click().then(function(){
      expect(checkbox.isSelected()).toBe(true);
     });
  });
  
   it('removing checkbox element and waiting for it to be removed from the DOM', function () {
    addRemoveBtn.click().then(function(){
      return browser.wait(function () {
          return checkbox.isPresent().then(
            function (present) {
              return !present;
            },                  // "wait" function should be moved to the separate helper in real project
            function (error) {
              return false
            });
        }, 7000);
     });
   });
   
   it('adding checkbox element back and waiting for it to be present', function () {
    addRemoveBtn.click().then(function(){
      return browser.wait(function () {
          return checkbox.isPresent().then(
            function (present) {
              return present;
            },                  // "wait" function should be moved to the separate helper in real project
            function (error) {
              return false
            });
        }, 7000);
     });
   });
   
   it('expecting checkbox not to be selected', function () {
     expect(checkbox.isSelected()).toBe(false);
   });
   
   it('expecting input field to be disabled', function () {
     expect(inputTextField.isEnabled()).toBe(false);
   });
   
   it('enabling input text field', function () {
    enableDisableBtn.click().then(function(){
      return browser.wait(function () {
          return inputTextField.isEnabled().then(
            function (enabled) {
              return enabled;
            },                  // "wait" function should be moved to the separate helper in real project
            function (error) {
              return false
            });
        }, 7000);
     });
   });
   
   it('entering some text', function () {
     inputTextField.sendKeys("test input text");
   });
   
   it('disabling input text field', function () {
    enableDisableBtn.click().then(function(){
      return browser.wait(function () {
          return inputTextField.isEnabled().then(
            function (enabled) {
              return !enabled;
            },                  // "wait" function should be moved to the separate helper in real project
            function (error) {
              return false
            });
        }, 7000);
     });
   });
   
   it('expecting input field to be disabled and to have entered text', function () {
     expect(inputTextField.isEnabled()).toBe(false);
     expect(inputTextField.getAttribute('value')).toEqual('test input text');
   });
   
});
