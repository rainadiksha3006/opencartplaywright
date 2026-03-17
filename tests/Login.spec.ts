/*
Test Case : Login with valid credentials

Tags : @master @sanity @regression

Steps:
1) Navigate to application URL
2) Go to 'My Account' on home page and click 'Login'
3) Enter valid credentials and login
4) Verify successful login by checking the "My Account" page presence

*/


import { test, expect } from "@playwright/test"
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { MyAccountPage } from "../pages/MyAccountPage";
import { TestConfig } from "../test.config";

let homePage: HomePage;
let myAccountPage: MyAccountPage;
let loginPage: LoginPage;
let config: TestConfig;

//This hook runs before each test
test.beforeEach(async ({ page }) => {
    config = new TestConfig(); //Load config (URL credentials)
    await page.goto(config.appUrl); //navigate to base URL

    //Initialize page objects
    homePage = new HomePage(page);
    myAccountPage = new MyAccountPage(page);
    loginPage = new LoginPage(page);
});

//Optional cleanup after each test
test.afterEach(async ({ page }) => {
    await page.close();  //Close browser tab ( good practice in local/dev run)
})

test('User Login test @master @sanity @regression', async () => {

    //Go to 'My Account' on home page and click 'Login'  
    await homePage.clickMyAccount();
    await homePage.clickLogin();

    //Enter valid credentials and login
    await loginPage.login(config.email, config.password);

    //Verify successful login by checking the "My Account" page presence
    const isLoggedIn = await myAccountPage.isMyAccountPageDisplayed();
    expect(isLoggedIn).toBe(true);


})