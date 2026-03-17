
/* 
Test Case : Account Login TC_LF_006 : Validate 'Forgotten Password' link is available in the Login page and is working.

Tags: @master @regression

Steps:
1) Navigate to application URL
2) Go to 'My Account' on home page and click 'Login'
3) Click on Forgotten Password Link
4) Validate Forgot Password page is visible
 */

import { test, expect } from "@playwright/test";
import { TestConfig } from "../test.config";
import { HomePage } from "../pages/HomePage";
import {LoginPage} from "../pages/LoginPage";
import { ForgotPasswordPage } from "../pages/ForgotPasswordPage";

let config:TestConfig;
let homePage:HomePage;
let loginPage: LoginPage;
let forgotPasswordPage:ForgotPasswordPage;

test.beforeEach( async ({page}) => {

    config = new TestConfig();
    await page.goto(config.appUrl);

    homePage = new HomePage(page);
    loginPage = new LoginPage(page);
    //forgotPasswordPage = new ForgotPasswordPage(page);
})

test.afterEach( async ({page}) => {
    await page.close();
})

test('Forgotten Password Test @master @regression' , async () => {

    //Go to 'My Account' on home page and click 'Login'
    await homePage.clickMyAccount();
    await homePage.clickLogin();

    //Click on Forgotten Password Link
    forgotPasswordPage = await loginPage.clickOnForgetPasswordLink();

    //Validate Forgot Password page is visible
    expect (await forgotPasswordPage.isForgotPasswordPageVisible()).toBeTruthy();


})