/* 
Test Case : Account Registration TC_RF_004 : Validate proper notification messages are displayed when no mandatory fields are provided on 'Register Account' page.

Tags: @master @regression

Steps:
1) Navigate to application URL
2) Go to 'My Account' on home page and click 'Register'
3) Do not fill in any registration details and Click Continue
4) Validate below warning messages:
    First Name must be between 1 and 32 characters! should be displayed
    Last Name must be between 1 and 32 characters! should be displayed
    E-Mail Address does not appear to be valid! should be displayed
    Telephone must be between 3 and 32 characters! should be displayed
    Password must be between 4 and 20 characters! should be displayed
    Warning: You must agree to the Privacy Policy! should be displayed on top 
 */

import { test, expect } from "@playwright/test";
import { TestConfig } from "../test.config";
import { HomePage } from "../pages/HomePage";
import { RegistrationPage } from "../pages/RegistrationPage";

let config: TestConfig;
let homePage: HomePage;
let registrationPage: RegistrationPage;

test.beforeEach(async ({ page }) => {
    config = new TestConfig();
    await page.goto(config.appUrl);

    homePage = new HomePage(page);
    registrationPage = new RegistrationPage(page);

})

test.afterEach(async ({ page }) => {
    await page.close();
})

test('Account Registration TC_RF_004 @master @regression', async () => {

    await homePage.clickMyAccount();
    await homePage.clickRegister();

    await registrationPage.clickContinue();

    expect(await registrationPage.getFirstNameErrorMessage()).toBe('First Name must be between 1 and 32 characters!');
    //console.log("First Name Error Message:",await registrationPage.getFirstNameErrorMessage());

    expect(await registrationPage.getLastNameErrorMessage()).toBe('Last Name must be between 1 and 32 characters!');
    //console.log("Last Name Error Message:",await registrationPage.getLastNameErrorMessage());
    
    expect(await registrationPage.getEmailErrorMessage()).toBe('E-Mail Address does not appear to be valid!');
    //console.log("Email Error Message:",await registrationPage.getEmailErrorMessage());

    expect(await registrationPage.getTelephoneErrorMessage()).toBe('Telephone must be between 3 and 32 characters!');
    //console.log("Telephone Error Message:",await registrationPage.getTelephoneErrorMessage());

    expect(await registrationPage.getPasswordErrorMessage()).toBe('Password must be between 4 and 20 characters!');
    //console.log("Password Error Message:",await registrationPage.getPasswordErrorMessage());

    expect(await registrationPage.getPrivacyPolicyErrorMessage()).toBe(' Warning: You must agree to the Privacy Policy!');
    //console.log("Privacy Policy Error Message:",await registrationPage.getPrivacyPolicyErrorMessage());

})