

describe('Form Authentication Test', function () {

  browser.ignoreSynchronization = true;
  
  var userName = element(by.id('username'));
  var password = element(by.id('password'));
  var message = element(by.id('flash'));
  var loginBtn = element(by.xpath('//button[@type="submit"]'));
  var logoutBtn = element(by.xpath('//a[@href="/logout"]'));
  
  it('go to test page', function () {
    browser.get('http://the-internet.herokuapp.com/login');
    return browser.wait(function () {
      return browser.executeScript('return document.readyState==="complete"').then(function (text) {
        return text === true;              //wait for page to download, should be moved to the helper
      });
    }, 6000);
  });
  
   it('logging in with correct credentials', function () {
    userName.sendKeys('tomsmith');
    password.sendKeys('SuperSecretPassword!');
    loginBtn.click();
    expect(message.getText()).toContain('You logged into a secure area!');
    expect(logoutBtn.isPresent()).toBe(true);
    expect(loginBtn.isPresent()).toBe(false);
  });
  
   it('logging out', function () {
      logoutBtn.click();
      expect(message.getText()).toContain('You logged out of the secure area!');
      expect(loginBtn.isPresent()).toBe(true);
      expect(logoutBtn.isPresent()).toBe(false);
    });
    
   it('trying to log in with incorrect credentials', function () {
    userName.sendKeys('ksjdhfks');
    password.sendKeys('wefwefwef!');
    loginBtn.click();
    expect(message.getText()).toContain('Your username is invalid!');
    expect(loginBtn.isPresent()).toBe(true);
    expect(logoutBtn.isPresent()).toBe(false);
  });
  
   it('trying to log in with no credentials', function () {
    userName.clear();
    password.clear();
    loginBtn.click();
    expect(message.getText()).toContain('Your username is invalid!');
    expect(loginBtn.isPresent()).toBe(true);
    expect(logoutBtn.isPresent()).toBe(false);
  });
  
  it('trying to log in without password', function () {
    userName.sendKeys('tomsmith');
    password.clear();
    loginBtn.click();
    expect(message.getText()).toContain('Your password is invalid!');
    expect(loginBtn.isPresent()).toBe(true);
    expect(logoutBtn.isPresent()).toBe(false);
  });
  
  it('trying to log in without usernme', function () {
    userName.clear();
    password.sendKeys('SuperSecretPassword!');
    loginBtn.click();
    expect(message.getText()).toContain('Your username is invalid!');
    expect(loginBtn.isPresent()).toBe(true);
    expect(logoutBtn.isPresent()).toBe(false);
  });
    
});
