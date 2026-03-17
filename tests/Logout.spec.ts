/**
 * Test case  : User Logout
 * Tags: @master @regression
 * 
 * Steps
 * 1) Navigate to app URL
 * 2) Go to Login page from Home Page
 * 3) Login with valid credentials
 * 4) Verify 'My Account' page
 * 5) Click on Logout link
 * 6) Click on Continue button
 * 7) verify user is redirected to Home Page
 * 
 */

import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { MyAccountPage } from '../pages/MyAccountPage';
import { LogoutPage } from '../pages/LogoutPage';
import { TestConfig } from '../test.config'

//Declare shared variables
let config: TestConfig;
let homePage: HomePage;
let loginPage: LoginPage;
let myAccountpage: MyAccountPage;
let logoutPage: LogoutPage;


//Setup before each test
test.beforeEach(async ({ page }) => {
    config = new TestConfig();
    await page.goto(config.appUrl); //1) Navigate to app URL

    //Initialize page objects
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);
    myAccountpage = new MyAccountPage(page);
    //logoutPage = new LogoutPage(page);    

})

test.afterEach(async ({ page }) => {
    await page.close();
})

test('User Logout test @master @regression', async () => {

    // 2) Go to Login page from Home Page
    await homePage.clickMyAccount();
    await homePage.clickLogin();

    // 3) Perform Login with valid credentials
    await loginPage.login(config.email, config.password);

    // 4) Verify 'My Account' page after successful login
    const displayFlag = await myAccountpage.isMyAccountPageDisplayed();
    expect(displayFlag).toBeTruthy();

    // 5) Click on Logout which returns LogoutPgae instance
    logoutPage = await myAccountpage.clickOnLogout();

    // 6) verify Continue button is visible before clicking
    expect(await logoutPage.isContinueButtonVisible()).toBe(true);

    // 7) Click Continue & verify user is redirected to Home Page
    homePage = await logoutPage.clickContinue();
    const flag = await homePage.isHomePageExists();
    expect(flag).toBe(true);

})