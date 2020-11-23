

describe('Phone Input Test', function () {

  browser.ignoreSynchronization = true;
  
  var phoneInputs = element.all(by.xpath('//h1[@id="without-country-select"]/parent::section//input[@type="tel"]')); 
  
  it('go to test page', function () {
    browser.get('https://catamphetamine.gitlab.io/react-phone-number-input/#without-country-select');
    return browser.wait(function () {
      return browser.executeScript('return document.readyState==="complete"').then(function (text) {
        return text === true;              //wait for page to download, should be moved to the helper
      });
    }, 6000);
  });
  
   it('entering phone number in EACH field and checking the format', function () {
    phoneInputs.each(function(input, index) {
      switch (index) {
        case 0:
        input.sendKeys('16505671243');
        expect(input.getAttribute('value')).toEqual('+1 650 567 1243');
        break;
        
        case 1:
        input.sendKeys('6505671243');
        expect(input.getAttribute('value')).toEqual('(650) 567-1243');
        break;
        
        case 2:
        input.sendKeys('6505671243');
        expect(input.getAttribute('value')).toEqual('650 567 1243');
        break;
        
        case 3:
        input.sendKeys('6505671243');
        expect(input.getAttribute('value')).toEqual('+1 650 567 1243');
        break;
        
        case 4:
        input.sendKeys('6505671243');
        expect(input.getAttribute('value')).toEqual('(650) 567-1243');
        input.clear();
        input.sendKeys('+380679218202');
        expect(input.getAttribute('value')).toEqual('+380 67 921 8202');
        break;
        
        case 5:
        input.sendKeys('+16505671243');
        expect(input.getAttribute('value')).toEqual('+1 650 567 1243');
        break;
      }     
    })
  });
  
  it('entering invalid characters in EACH field and check if they are accepted', function () {
    phoneInputs.each(function(input, index) {
      input.clear();
      input.sendKeys('sdfsdfsdf$$!');
      if (index == 3){
         expect(input.getAttribute('value')).toEqual('+1');
      }
      else{
         expect(input.getAttribute('value')).toEqual('');
      }
    })
  });
  
});
