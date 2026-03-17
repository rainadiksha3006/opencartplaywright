/* 
Test Case : Account Registration

Tags: @master @sanity @regression

Steps:
1) Navigate to application URL
2) Go to 'My Account' on home page and click 'Register'
3) Fill in registration details with random data
4) Agree to privacy policy and submit the form
5) validate the confirmation message

 */


import {test,expect} from "@playwright/test"
import {HomePage} from "../pages/HomePage";
import {RegistrationPage} from "../pages/RegistrationPage";
import {RandomDataUtil} from "../utils/randomDataGenerator";
import {TestConfig} from "../test.config";

let homePage:HomePage;
let registrationPage:RegistrationPage;
let config:TestConfig;

test.beforeEach( async ({page}) =>{

   //Navigate to application URL
    config = new TestConfig(); //created instance for test config
    await page.goto(config.appUrl);

    homePage = new HomePage(page);
    registrationPage =new RegistrationPage(page);

})
 
test.afterEach( async ({page}) =>{
    await page.waitForTimeout(3000);
    await page.close();
})

test('Account Registration test @master @sanity @regression', async () => {

    //Go to 'My Account' on home page and click 'Register'  
    await homePage.clickMyAccount();
    await homePage.clickRegister();

    //Fill in registration details with random data
    await registrationPage.setFirstName(RandomDataUtil.getFirstName());
    await registrationPage.setLastName(RandomDataUtil.getLastName());
    await registrationPage.setEmail(RandomDataUtil.getEmail());
    await registrationPage.setTelephone(RandomDataUtil.getPhoneNumber());
    
    const password = RandomDataUtil.getPassword();
    await registrationPage.setPassword(password);
    await registrationPage.setConfirmPassword(password);

    //Agree to privacy policy and submit the form
    await registrationPage.setPrivacyPolicy();
    await registrationPage.clickContinue();

    //validate the confirmation message
    const confirmationMessage = await registrationPage.getConfirmationMessage();
    expect(confirmationMessage).toContain('Your Account Has Been Created!');

    
})



