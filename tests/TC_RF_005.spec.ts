/* 
Test Case : Account Registration TC_RF_004 : Validate proper notification messages are displayed when no mandatory fields are provided on 'Register Account' page.

Tags: @master @regression

Steps:
1) Navigate to application URL
2) Go to 'My Account' on home page and click 'Register'
3) Fill in registration details with random data
4) Select the Yes radio button for newsletter
5) Agree to privacy policy and Click on continue button.
6) Click on the Newsletter 
7) Validate that the Yes option should be displayed as selected by default in the NewsLetter page

*/

import { test, expect } from "@playwright/test";
import { TestConfig } from "../test.config";
import { HomePage } from "../pages/HomePage";
import { RegistrationPage } from "../pages/RegistrationPage";
import { MyAccountPage } from "../pages/MyAccountPage";
import { NewsletterPage } from "../pages/NewsletterPage";
import { RandomDataUtil } from "../utils/randomDataGenerator";

let config: TestConfig;
let homePage: HomePage;
let registrationPage: RegistrationPage;
let myAccountPage: MyAccountPage;
let newsletterPage: NewsletterPage;

test.beforeEach(async ({ page }) => {
    config = new TestConfig();
    await page.goto(config.appUrl); //Navigate to application URL

    homePage = new HomePage(page);
    registrationPage = new RegistrationPage(page);
    myAccountPage = new MyAccountPage(page);
    //newsletterPage = new NewsletterPage(page);

})

test.afterEach(async ({ page }) => {
    await page.close();
})

test('Validate regsitering an account when yes is opted for newsletter fields @master @regression', async () => {

    //Go to 'My Account' on home page and click 'Register'
    await homePage.clickMyAccount();
    await homePage.clickRegister();

    //Fill in registration details with random data
    await registrationPage.setFirstName(RandomDataUtil.getFirstName());
    await registrationPage.setLastName(RandomDataUtil.getLastName());
    await registrationPage.setEmail(RandomDataUtil.getEmail());
    await registrationPage.setTelephone(RandomDataUtil.getPhoneNumber());

    const password = RandomDataUtil.getPassword()
    await registrationPage.setPassword(password);
    await registrationPage.setConfirmPassword(password);

    await registrationPage.subscribeNewsletter(); //Select the Yes radio button for newsletter

    await registrationPage.setPrivacyPolicy();
    await registrationPage.clickContinue();

    //Validate the confirmation message
    const confirmationMessage = await registrationPage.getConfirmationMessage();
    expect(confirmationMessage).toContain('Your Account Has Been Created!');

    //Validate MyAccountPage is displayed
    expect(await myAccountPage.isMyAccountPageDisplayed()).toBeTruthy;

    //Click on the Newsletter link on MyAccountPage
    newsletterPage = await myAccountPage.clickOnNewsletter();

    //Validate NewsLetter page is displayed
    expect(await newsletterPage.isNewsletterPageDisplayed()).toBeTruthy;

    //Validate that the Yes option should be displayed as selected by default in the NewsLetter page
    expect (await newsletterPage.isYesRadioBtnSelected()).toBeTruthy();

})