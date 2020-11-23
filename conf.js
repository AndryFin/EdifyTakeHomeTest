exports.config = {
  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['phoneInputTest.js','notificationMessagesTest.js','formAuthenticationTest.js','dynamicControlsTest.js','addRemoveTest.js'],
  capabilities: {
    browserName: 'chrome'
  },
  onPrepare: function (){
    global.product = browser.params.productName;
    browser.driver.manage().window().maximize();
  }
}