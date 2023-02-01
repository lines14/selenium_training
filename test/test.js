// to run the test you may execute console command "npm test" if preinstalled "mocha" and "chai" modules

const chai = require('chai');
const homepage = require('../Page/homepage');
const loginpage = require('../Page/loginpage');

before(function() {
    const configureData = require('../Page/configureData.json');
    path = JSON.parse(JSON.stringify(configureData));
    const testData = require('./testData.json');
    data = JSON.parse(JSON.stringify(testData));
});

describe('Test scenario: Invalid login', function(){
    // this.timeout(50000);
   
    // beforeEach(function(){

    // });

    it('Navigate to main page', async function(){
        await homepage.enter_url(data.baseurl);
        let returnedMainPageText = await homepage.verifyHomePageByCustomText(path.textSteam);
        
        chai.assert.equal(returnedMainPageText.slice(returnedMainPageText.length -5, returnedMainPageText.length), 'Steam', 'Main page is not displayed');
    });

    it('Click login button', async function(){
        await homepage.clickLoginButton(path.loginButton);
        let returnedLoginPageElement = await loginpage.verifyLoginPageByDisplayedElement(path.CssClassLogin);

        chai.assert.equal(returnedLoginPageElement, true, 'Login page is not open');
      });

    it('Input random strings as credentials. Click sign in button', async function(){
        await loginpage.verifyLoginFormIsDisplayed(path.inputLoginForm);
        await loginpage.inputForm(path.inputPasswordForm, data.password);
        await loginpage.inputForm(path.inputLoginForm, data.login);
        await loginpage.clickSubmitButton(path.submitButton);
        let returnedAnimationInfo = await loginpage.verifyLoadingAnimation(path.submitButton);

        chai.assert.equal(returnedAnimationInfo, false, 'Loading element is not displayed');

        await loginpage.waitUntilErrorMessageExpects(path.submitButton);
        let returnedErrorMessage = await loginpage.verifyErrorMessageShowed(path.errorMessage);

        chai.assert.notEqual(returnedErrorMessage, '', 'Error text is not displayed (after loading element disappearing)');
    });

    // afterEach(async function(){
        
    // });
    
});

after(async function() {
    await loginpage.finishTest();
    
});