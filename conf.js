exports.config = {
  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['phoneInputTest.js','notificationMessagesTest.js','formAuthenticationTest.js','dynamicControlsTest.js','addRemoveTest.js'],
  capabilities: {
    browserName: 'chrome'
  },
  onPrepare: function (){
    browser.driver.manage().window().maximize();
  }
}
